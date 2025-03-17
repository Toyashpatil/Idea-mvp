// userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  legalName: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNumber: {
    type: String, // Stored as a string to handle formatting and international numbers
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  foreignTransactions: {
    type: Boolean,
    required: true,
    default: false,
  },
  adaptiveQuestions: [
    {
      question: { type: String },
      answer: { type: String },
      askedAt: { type: Date, default: Date.now },
    }
  ],
  documentsSubmitted: {
    type: Boolean,
    required: true,
    default: false,
  },
  institution: {
    type: Boolean,
    required: true,
    default: false,
  },
  riskScore: {
    type: Number,
    default: 0,
  },
  onboardingCompleted: {
    type: Boolean,
    default: false,
  },
  fraudulent: {
    type: Boolean,
    default: false,
  },
  // New fields for account information
  accountNumber: {
    type: String,
    unique: true,
    sparse: true, // Use sparse if not all users will have an account immediately
  },
  bankName: {
    type: String,
    trim: true,
  },
  ifscCode: {
    type: String,
    trim: true,
  },
  accountType: {
    type: String,
    enum: ["savings", "current", "other"],
    default: "savings",
  },
  balance: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('User', userSchema);
