import mongoose from "mongoose";

// Define the schema for the contact form
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensures name is required
  },
  email: {
    type: String,
    required: true, // Ensures email is required
    lowercase: true, // Ensures email is stored in lowercase
  },
  message: {
    type: String,
    required: true, // Ensures message is required
  },
}, {
  timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
});

// Create the Contact model based on the schema
const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
