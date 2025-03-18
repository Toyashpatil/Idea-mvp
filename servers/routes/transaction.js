// transactionRoutes.js

const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction'); // Adjust path as needed
const fetchUser = require('../middleware/fetchUser');

//---------------------------------------------------
// 1. Create a transaction (transfer)
//---------------------------------------------------
router.post('/transfer', fetchUser, async (req, res) => {
  try {
    // The authenticated user (sender) is available via fetchUser middleware.
    const senderId = req.user.id;
    const { receiverUser, senderAccountNumber, receiverAccountNumber, amount, note } = req.body;

    // Basic validations can be added as needed.
    if (!senderAccountNumber || !receiverAccountNumber || !amount) {
      return res.status(400).json({ message: 'Please provide sender and receiver account numbers and the amount.' });
    }

    // Create new transaction
    const transaction = await Transaction.create({
      senderUser: senderId,
      receiverUser, // Optional: may be null/undefined if the receiver is external
      senderAccountNumber,
      receiverAccountNumber,
      amount,
      note,
    });

    res.status(201).json({ message: 'Transaction successful', transaction });
  } catch (error) {
    console.error('Transfer error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

//---------------------------------------------------
// 2. Get one month transactions for the user
//---------------------------------------------------
router.get('/month', fetchUser, async (req, res) => {
  try {
    const senderId = req.user.id;
    // Calculate the date one month ago
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Find transactions where the logged-in user is the sender and created within the last month.
    const transactions = await Transaction.find({
      senderUser: senderId,
      createdAt: { $gte: oneMonthAgo }
    }).sort({ createdAt: -1 });

    res.json({ transactions });
  } catch (error) {
    console.error('Error fetching month transactions:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

//---------------------------------------------------
// 3. Insert dummy transactions for one year for the user
//---------------------------------------------------
router.post('/dummy', fetchUser, async (req, res) => {
  try {
    const senderId = req.user.id;
    const dummyTransactions = [];
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);

    // Create 12 dummy transactions (one for each month)
    for (let i = 0; i < 12; i++) {
      // Create a dummy transaction date by adding months
      const dummyDate = new Date(startDate);
      dummyDate.setMonth(dummyDate.getMonth() + i);

      // Random dummy amount between 100 and 1000
      const dummyAmount = Math.floor(Math.random() * 900) + 100;

      dummyTransactions.push({
        senderUser: senderId,
        senderAccountNumber: "1234567890",    // Use dummy/fixed data as appropriate
        receiverAccountNumber: "0987654321",  // Use dummy/fixed data as appropriate
        amount: dummyAmount,
        transactionDate: dummyDate,
        note: `Dummy transaction for month ${i + 1}`
      });
    }

    const createdTransactions = await Transaction.insertMany(dummyTransactions);
    res.status(201).json({ message: 'Dummy transactions created successfully', transactions: createdTransactions });
  } catch (error) {
    console.error('Error creating dummy transactions:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
