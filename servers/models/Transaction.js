// transactionModel.js

const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
  senderUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // The user initiating the transaction
  },
  receiverUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // not required if receiver is external or not in your database
  },
  senderAccountNumber: {
    type: String,
    required: true,
  },
  receiverAccountNumber: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionDate: {
    type: Date,
    default: Date.now, // Or use timestamps option
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed',
  },
  note: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model('Transaction', transactionSchema);
