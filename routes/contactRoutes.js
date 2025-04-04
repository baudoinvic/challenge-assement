
const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send message (POST)
router.post("/contact", async (req, res) => {
  try {
    const { firstname, lastname, email, address, message } = req.body;

    const newMessage = new Contact({ firstname, lastname, email, address, message });
    await newMessage.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, 
      subject: "Thank you for contacting us!",
      text: `Hello ${firstname},\n\nThank you for reaching out. We have received your message:\n\n"${message}"\n\nWe'll get back to you soon.\n\nBest regards,\nBaudoin Labs`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Message sent successfully and confirmation email sent" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Get all messages (GET - For admin)
router.get("/messages", async (req, res) => {
  try {
    const messages = await Contact.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
