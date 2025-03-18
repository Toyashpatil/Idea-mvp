const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    // Find employee by ID
    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(401).json({ message: "Invalid Employee ID or Password" });
    }

    // Simple password check (Replace this with bcrypt comparison in production)
    if (password !== "password123") {
      return res.status(401).json({ message: "Invalid Employee ID or Password" });
    }

    // Store user session
    req.session.employee = {
      employeeId: employee.employeeId,
      role: employee.role,
    };

    res.status(200).json({ message: "Login successful", employee: req.session.employee });
  } catch (error) {
    res.status(500).json({ error: "Login failed. Please try again." });
  }
});

// Logout Route
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("connect.sid"); // Remove session cookie
    res.status(200).json({ message: "Logged out successfully" });
  });
});

// Check if user is logged in
router.get("/session", (req, res) => {
  if (req.session.employee) {
    res.status(200).json({ employee: req.session.employee });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

module.exports = router;
