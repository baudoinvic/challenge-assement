


require("dotenv").config(); 

const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Subscription = require("../models/subscriptionModel");

// Create a transporter (for sending emails)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Subscribe (POST)
router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email already exists
    const existingSubscription = await Subscription.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const newSubscription = new Subscription({ email });
    await newSubscription.save();

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email
      to: email, // Recipient email
      subject: "Thank You for Subscribing to Our Newsletter",
      text: `Dear ${email},\n\nThank you for subscribing to my newsletter.\n\nBest regards,\nBaudoin Lab`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ message: "Subscription successful and confirmation sent" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Get all subscriptions (GET)
router.get("/subscriptions", async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Unsubscribe (DELETE)
router.delete("/unsubscribe/:email", async (req, res) => {
  try {
    const { email } = req.params;
    await Subscription.findOneAndDelete({ email });
    res.status(200).json({ message: "Unsubscribed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
