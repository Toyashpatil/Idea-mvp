// userRoutes.js

require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust path as needed

const router = express.Router();
const  JWT_SECRET  = "Idea#123"

//----------------------------
// Health Check
//----------------------------
router.get('/health', (req, res) => {
  res.send('User route is working (Hugging Face version)!');
});

//----------------------------
// Register
//----------------------------
router.post('/register', async (req, res) => {
  try {
    const {
      legalName,
      mobileNumber,
      email,
      foreignTransactions,
      adaptiveQuestions,
      documentsSubmitted,
      institution,
      riskScore,
      onboardingCompleted,
      accountNumber,
      bankName,
      ifscCode,
      accountType,
      balance,
      fraudulent
    } = req.body;

    // Basic validations
    if (!legalName || !mobileNumber || !email) {
      return res.status(400).json({ message: 'Legal name, mobile number, and email are required.' });
    }
    if (fraudulent === true) {
      return res.status(400).json({ message: 'Cannot create account: User flagged as fraudulent.' });
    }

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with that email.' });
    }

    // Create new user
    const newUser = new User({
      legalName,
      mobileNumber,
      email,
      foreignTransactions: foreignTransactions || false,
      adaptiveQuestions: adaptiveQuestions || [],
      documentsSubmitted: documentsSubmitted || false,
      institution: institution || false,
      riskScore: riskScore || 0,
      onboardingCompleted: onboardingCompleted || false,
      fraudulent: false,
      accountNumber,
      bankName,
      ifscCode,
      accountType,
      balance: balance || 0,
    });

    await newUser.save();

    // Generate JWT for the new user
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(201).json({ message: 'User registered successfully', success: true, token });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

//----------------------------
// Login
//----------------------------
router.post('/login', async (req, res) => {
  try {
    const { email, mobileNumber } = req.body;

    // Basic check: at least one identifier
    if (!email && !mobileNumber) {
      return res.status(400).json({
        message: 'Please provide either an email or mobile number to login.'
      });
    }

    // Find user by email or mobileNumber
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else {
      user = await User.findOne({ mobileNumber });
    }

    // If no user found
    if (!user) {
      return res.status(400).json({ message: 'User not found. Please register first.' });
    }

    // Check if user is flagged as fraudulent
    if (user.fraudulent) {
      return res.status(403).json({ message: 'User is flagged as fraudulent.' });
    }

    // (No password check here, as your schema does not have a password field)
    // In production, consider OTP-based or password-based verification.

    // Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({
      message: 'Login successful',
      success: true,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
