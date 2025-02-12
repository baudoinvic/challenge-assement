
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const app = express();

// Import routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const contactRoutes = require("./routes/contactRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

// MongoDB connection string
const dbURI =
  "mongodb+srv://demo:12345@cluster0.5ukx8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB Atlas
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));

app.use(express.json());

app.use(cors());

// Use routes
app.use("/api", customerRoutes);
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", contactRoutes );
app.use("/api", subscriptionRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
