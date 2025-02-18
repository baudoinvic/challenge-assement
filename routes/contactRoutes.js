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
require("dotenv").config(); // Ensure you have dotenv installed to manage sensitive credentials

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other email services
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email app password
  },
});

// Send message (POST)
router.post("/contact", async (req, res) => {
  try {
    const { firstname, lastname, email, message } = req.body;

    // Save the message to the database
    const newMessage = new Contact({ firstname, lastname, email, message });
    await newMessage.save();

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER, // Your email
      to: process.env.RECEIVER_EMAIL, // Admin email where messages will be received
      subject: "New Contact Form Submission",
      text: `You have a new message from:
      
      Name: ${firstname} ${lastname}
      Email: ${email}
      Message: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({
        message: "Message sent successfully and email notification sent",
      });
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
