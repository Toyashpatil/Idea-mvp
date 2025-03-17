// userRoutes.js
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { Configuration, OpenAIApi } = require('openai');
const User = require('../models/User'); // Adjust the path as needed

const router = express.Router();

// --- ENV variables ---
const JWT_SECRET = process.env.JWT_SECRET || 'Idea123#';


// --- OpenAI Setup ---
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);


const conversationState = {
  currentQuestionIndex: 0,
  answers: {},
  conversationHistory: "",
  requiredQuestions: [
    "Please provide your full legal name.",
    "What is your primary phone number?",
    "What is your email address?",
    "Do you anticipate frequent international transactions?"
  ]
};

/**
 * Health-check route for the user service.
 */
router.get('/health', (req, res) => {
  res.send('User route is working!');
});

/**
 * POST /register
 * Registers a new user during onboarding.
 * Only non-fraudulent users are allowed to register.
 */
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

    // Check for required fields.
    if (!legalName || !mobileNumber || !email) {
      return res.status(400).json({ message: 'Legal name, mobile number, and email are required.' });
    }

    // Prevent account creation if the user is flagged as fraudulent.
    if (fraudulent === true) {
      return res.status(400).json({ message: 'Cannot create account: User flagged as fraudulent.' });
    }

    // Check if a user with the same email already exists.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with that email.' });
    }

    // Create a new user with the provided fields.
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
      fraudulent: false, // Always set fraudulent to false at onboarding
      accountNumber,
      bankName,
      ifscCode,
      accountType,
      balance: balance || 0,
    });

    await newUser.save();

    // Optionally generate a JWT token for further authentication.
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({ 
      message: 'User registered successfully', 
      success: true, 
      token 
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/**
 * POST /rephrase
 * Rephrase a static onboarding question using GPT-3.5.
 * Expects: { question, conversationHistory }
 */
router.post('/rephrase', async (req, res) => {
  try {
    const { question, conversationHistory } = req.body;
    const instruction = `Rephrase exactly this question in a friendly manner: "${question}"`;

    const messages = [
      { role: "system", content: conversationHistory || "" },
      { role: "user", content: instruction }
    ];

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.3,
      max_tokens: 150,
      top_p: 0.9,
    });

    const rephrased = response.data.choices[0].message.content.trim();
    return res.json({ rephrased });
  } catch (error) {
    console.error("Error rephrasing:", error);
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /next-question
 * Returns the next static onboarding question from the in-memory conversation state.
 */
router.get('/next-question', (req, res) => {
  const { requiredQuestions, currentQuestionIndex } = conversationState;
  if (currentQuestionIndex < requiredQuestions.length) {
    return res.json({ question: requiredQuestions[currentQuestionIndex] });
  } else {
    return res.json({ message: "Onboarding complete", answers: conversationState.answers });
  }
});

/**
 * POST /submit-answer
 * Submits an answer to the current question and advances the conversation state.
 * Expects: { answer: "some answer" }
 */
router.post('/submit-answer', (req, res) => {
  const { answer } = req.body;
  const currentIndex = conversationState.currentQuestionIndex;

  if (currentIndex < conversationState.requiredQuestions.length) {
    const question = conversationState.requiredQuestions[currentIndex];
    conversationState.answers[question] = answer;
    conversationState.conversationHistory += `\nUser: ${answer}`;
    conversationState.currentQuestionIndex++;

    return res.json({ 
      message: "Answer recorded", 
      nextQuestionIndex: conversationState.currentQuestionIndex 
    });
  } else {
    return res.json({ 
      message: "All questions answered", 
      answers: conversationState.answers 
    });
  }
});

/**
 * POST /adaptive-question
 * Generates an adaptive follow-up question based on a provided risk score.
 * Expects: { riskScore: 0.8 } (for example)
 */
router.post('/adaptive-question', async (req, res) => {
    try {
      // 1. Extract userId (to find which user to update) and riskScore from the request body
      const { userId, riskScore } = req.body;
      
      // 2. Validate that userId is provided
      if (!userId) {
        return res.status(400).json({ error: "userId is required to update the database with adaptive questions." });
      }
  
      // 3. Find the user in the database
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      // 4. Build a prompt using conversation history and previous answers (from your in-memory object).
      //    In a real system, you might store conversation state in the DB. For now, we'll assume it's in memory.
      const prompt = `
        Conversation history:
        ${conversationState.conversationHistory}
  
        Previous answers:
        ${JSON.stringify(conversationState.answers, null, 2)}
  
        Current risk score: ${riskScore}
  
        If the risk score is high, generate a friendly yet probing follow-up question to clarify any inconsistencies 
        or suspicious details that might indicate fraudulent behavior. Otherwise, generate a neutral follow-up question.
  
        Make sure the question is clear, direct, and in a conversational tone.
      `;
  
      const messages = [
        {
          role: "system",
          content: "You are an AI assistant for bank onboarding with a focus on fraud detection. Your goal is to probe for inconsistencies in a friendly manner."
        },
        {
          role: "user",
          content: prompt
        }
      ];
  
      // 5. Call OpenAI to generate the adaptive question
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.4,
        max_tokens: 150,
        top_p: 0.9,
      });
  
      const adaptiveQuestion = response.data.choices[0].message.content.trim();
  
      // 6. Store the generated adaptive question in the user's record
      user.adaptiveQuestions.push({
        question: adaptiveQuestion,
        // We'll leave answer empty until the user responds
        askedAt: new Date()
      });
  
      // 7. Save the updated user document
      await user.save();
  
      // 8. Return the generated question
      return res.json({ adaptiveQuestion });
    } catch (error) {
      console.error("Error generating/updating adaptive question:", error);
      return res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
