const express = require("express");
const router = express.Router();
const {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");
// GET all customers
router.get("/customers", getCustomers);

// GET customer by ID
router.get("/customers/:id", getCustomerById);

// POST to create a new customer
router.post("/customers", createCustomer);

// PUT to update a customer
router.put("/customers/:id", updateCustomer);
// DELETE to remove a customer
router.delete("/customers/:id", deleteCustomer);


module.exports = router;
