import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Contact from './models/contact.js'; // Import MongoDB model

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();

// Error handling wrapper
const wrapAsync = (fn) => {
  return (...args) => {
    fn(...args).catch((err) => {
      console.error("Error occurred:", err); // Enhanced error logging
    });
  };
};

// Nodemailer transporter configuration
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  requireTLS: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.APP_PASSWORD,
  },
});

// Function to get the contact form data HTML template
const getFormDataHtmlTemplate = (name, email, message) => {
  const templatePath = path.resolve(__dirname, "EmailTemplets", "FormData.html");
  let template = fs.readFileSync(templatePath, "utf8");
  template = template.replace("{{name}}", name);
  template = template.replace("{{email}}", email);
  template = template.replace("{{message}}", message);
  return template;
};

// Function to receive contact data and send an email to admin
export const ReceviceContactData = wrapAsync(async (name, email, message, subject) => {
  const htmlContent = getFormDataHtmlTemplate(name, email, message);
  try {
    const mailOptions = {
      from: email,
      to: process.env.MAIL,
      subject: subject,
      html: htmlContent,
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent to admin successfully.");

    // After sending the email, save contact data to MongoDB
    const newContact = new Contact({
      name,
      email,
      message,
    });
    await newContact.save();
    console.log("Contact data saved to MongoDB successfully.");
  } catch (error) {
    console.error("Error sending email or saving contact data:", error);
  }
});

// Function to get the thank-you HTML template
const getThankYouHtmlTemplate = (name) => {
  const templatePath = path.resolve(__dirname, "EmailTemplets", "ThankYou.html");
  let template = fs.readFileSync(templatePath, "utf8");
  return template.replace("{{name}}", name);
};

// Function to send a thank-you email to the user
export const sendContactEmail = wrapAsync(async (name, email, subject) => {
  const htmlContent = getThankYouHtmlTemplate(name);
  try {
    const mailOptions = {
      from: process.env.MAIL,
      to: email,
      subject: subject,
      html: htmlContent,
    };
    await transporter.sendMail(mailOptions);
    console.log("Thank-you email sent to user successfully.");
  } catch (error) {
    console.error("Error sending thank-you email:", error);
  }
});
