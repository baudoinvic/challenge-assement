const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel");


// Send message (POST)
router.post("/contact", async (req, res) => {
  try {
    const { firstname, lastname, email, message } = req.body;
    const newMessage = new Contact({ firstname, lastname, email, message });
    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully" });
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
