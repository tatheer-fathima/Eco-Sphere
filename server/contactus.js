import express from "express";
import cors from "cors";
import env from "dotenv";
import bodyParser from "body-parser";  
import Contact from "./models/contact.js";  // Import the Contact model
import { ReceviceContactData, sendContactEmail } from './SendContactEmail.js';  // Import email functions
import './db.js'; // Assuming db.js is handling your MongoDB connection

env.config();

const contactUsRouter = express.Router();  // Create a new router

// POST route for /submit-contact (updated route name)
contactUsRouter.post('/submit-contact', async (req, res) => {
    try {
        const { name, email, message, subject1, subject2 } = req.body;

        if (!name || !email || !message) {
            return res.status(400).send("Name, email, and message are required.");
        }

        // Step 1: Save the contact data to MongoDB
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // Step 2: Send emails after saving the contact
        await ReceviceContactData(name, email, message, subject1);  // Send email to the admin
        await sendContactEmail(name, email, subject2);  // Send a thank-you email to the user

        // Response to the client
        res.status(201).send("Message sent successfully");
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).send("Error sending message");
    }
});

export { contactUsRouter };  // Export the router
