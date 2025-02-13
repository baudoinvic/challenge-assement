const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, "your_jwt_secret");
    req.user = verified; // Attach user details to request
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// Restrict access to admins only
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied" });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
