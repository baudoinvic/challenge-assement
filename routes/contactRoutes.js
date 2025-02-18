// const express = require("express");
// const router = express.Router();
// const Contact = require("../models/contactModel");

// // Send message (POST)
// router.post("/contact", async (req, res) => {
//   try {
//     const { firstname, lastname, email, message } = req.body;
//     const newMessage = new Contact({ firstname, lastname, email, message });
//     await newMessage.save();

//     res.status(201).json({ message: "Message sent successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// });

// // Get all messages (GET - For admin)
// router.get("/messages", async (req, res) => {
//   try {
//     const messages = await Contact.find();
//     res.status(200).json(messages);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// });

// module.exports = router;

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
    const { firstname, lastname, email, message } = req.body;

    // Save the message to the database
    const newMessage = new Contact({ firstname, lastname, email, message });
    await newMessage.save();

    // Email content (sent to the user who submitted the form)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // Send email to the user
      subject: "Thank you for contacting us!",
      text: `Hello ${firstname},\n\nThank you for reaching out. We have received your message:\n\n"${message}"\n\nWe'll get back to you soon.\n\nBest regards,\nYour Company`,
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
