import express from "express";
import cors from "cors";
import env from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Contact from "./models/contact.js";
import { ReceviceContactData, sendContactEmail } from './SendContactEmail.js';

env.config();

const app = express();
const port = 3004;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// POST route for /contact
app.post('/contact', async (req, res) => {
    try {
        const { name, email, message, subject1, subject2 } = req.body;

        // Send emails
        await ReceviceContactData(name, email, message, subject1);
        await sendContactEmail(name, email, subject2);

        // Save contact data to MongoDB
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        res.status(201).send("Message sent successfully");
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).send("Error sending message");
    }
});

app.listen(port, () => {
    console.log(`Contact server running on port ${port}`);
});
