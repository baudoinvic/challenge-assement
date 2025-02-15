const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize multer
const upload = multer({ storage: storage });

// API to upload a single file
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload an image" });
  }
  res
    .status(200)
    .json({ message: "File uploaded successfully", file: req.file });
});

module.exports = router;
