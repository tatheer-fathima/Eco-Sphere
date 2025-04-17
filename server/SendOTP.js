import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import User from './models/User.js'; // Import the Mongoose User model

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();

const wrapAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      next(err);
    });
  };
};

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 587, false for other ports
  requireTLS: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Accept self-signed certificates
  },
});

export function generateSixDigitOTP() {
  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
  }
  return otp;
}

const getHtmlTemplate = (otp) => {
  const templatePath = path.resolve(__dirname, 'EmailTemplets', 'SendOtp.html');
  let template = fs.readFileSync(templatePath, 'utf8');
  return template.replace('{{otp}}', otp);
};

export const sendOTP = wrapAsync(async (email, otp, subject) => {
  try {
    const htmlContent = getHtmlTemplate(otp);

    const mailOptions = {
      from: process.env.MAIL,
      to: email,
      subject: subject,
      text: `Your OTP for pritwe is: ${otp}`,
      html: htmlContent,
    };
    
    // Send the email
    await transporter.sendMail(mailOptions);

    const timestamp = Date.now(); // Get the current timestamp

    // Update the OTP and timestamp in MongoDB
    const result = await User.findOneAndUpdate(
      { email }, 
      { otp, otp_timestamp: timestamp },
      { new: true } // Return the updated user document
    );

    if (!result) {
      throw new Error('User not found');
    }

    return result;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to send OTP');
  }
});
