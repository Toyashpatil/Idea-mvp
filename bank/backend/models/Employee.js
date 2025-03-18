// models/Employee.js

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    // Primary employee identifier
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Personal details
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },

   password:{
    type:String,
    required:true,
   },

    // Role/Privileges
    role: {
      type: String,
      enum: ["Admin", "Manager", "Analyst", "Clerk", "Intern"],
      default: "Clerk",
    },
    privilegeLevel: {
      type: Number,
      min: 1,
      max: 5,
      default: 3, 
      // 1 = highest privilege (superuser), 5 = lowest 
      // (Adjust logic based on your organization's structure)
    },

    // Employment data
    department: {
      type: String,
      enum: ["IT", "Finance", "Operations", "HR", "Legal", "Other"],
      default: "Operations",
    },
    dateOfJoining: {
      type: Date,
      default: Date.now,
    },
    salary: {
      type: Number,
      default: 0,
    },

    // Current branch or location
    location: {
      type: String,
      trim: true,
      default: "Unknown", 
      // e.g. "Mumbai", "Delhi", "Bangalore", ...
    },

    // Transfer tracking
    transfersCount: {
      type: Number,
      default: 0, 
      // how many branch transfers the employee has undergone
    },

    // Suspicious activity flags
    flaggedForReview: {
      type: Boolean,
      default: false,
    },
    flaggedReason: {
      type: String,
      trim: true,
      // a brief note on why they were flagged 
      // (e.g., "Unusual transaction patterns", "High location risk", etc.)
    },

    // Activity logs or references to another collection
    // e.g., storing references to login events or transaction records
    // logs: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "ActivityLog",
    //   },
    // ],

    // Additional metadata, e.g., last login time, device info, etc.
    lastLogin: {
      type: Date,
    },
    deviceIP: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt, updatedAt fields automatically
  }
);

module.exports = mongoose.model("Employee", employeeSchema);
