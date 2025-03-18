
//----------------------------
// Next Question
//----------------------------
router.get('/next-question', (req, res) => {
  const { requiredQuestions, currentQuestionIndex } = conversationState;
  if (currentQuestionIndex < requiredQuestions.length) {
    return res.json({ question: requiredQuestions[currentQuestionIndex] });
  } else {
    return res.json({ message: "Onboarding complete", answers: conversationState.answers });
  }
});

//----------------------------
// Submit Answer
//----------------------------
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

//----------------------------
// Adaptive Question
//----------------------------
router.post('/adaptive-question', async (req, res) => {
  try {
    const { userId, riskScore } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "userId is required to update the database with adaptive questions." });
    }

    // Find the user in DB
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Strong instruction to produce single question
    const systemInstruction = `
      You are an AI assistant for bank onboarding with a focus on fraud detection.
      Respond with ONLY a single, concise question ending with a '?'.
      Do not include any extra commentary or bullet points.
    `;

    // Build the final prompt
    const prompt = `
      ${systemInstruction}
      
      Conversation history:
      ${conversationState.conversationHistory}

      Previous answers:
      ${JSON.stringify(conversationState.answers, null, 2)}

      Current risk score: ${riskScore}

          You are asking direct questions to the user about potential fraudulent behavior in their account. 
    - If the risk score is greater than 0.3, you should ask a short, friendly but probing question 
      to clarify inconsistencies or suspicious details in the user's transactions or profile. 
    - If the risk score is 0.3 or below, you should ask a short, neutral follow-up question. 

    The question must:
    1. Be a single sentence ending with a question mark (no extra commentary).
    2. Directly relate to the user's financial behavior, suspicious deposits/withdrawals, 
      or inconsistencies that might indicate fraud. 
    3. Not be generic like "Are there any other questions I can help you with?" 
    4. End your answer with a question mark and nothing else.

    Context:
    (You have access to conversation history, previous answers, and a 'risk score' that indicates 
    the likelihood of fraudulent activity.)
    `;

    // Prepare request for Hugging Face Inference
    const requestBody = {
      inputs: prompt,
      parameters: {
        max_new_tokens: 60,
        temperature: 0.3
      }
    };

    // Call Hugging Face Inference API
    const hfResponse = await fetch(HF_MODEL_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!hfResponse.ok) {
      const errText = await hfResponse.text();
      console.error("HuggingFace API error:", errText);
      return res.status(hfResponse.status).json({ error: errText });
    }

    const hfData = await hfResponse.json();

    // The model output typically comes back in an array with "generated_text"
    let generatedText = "";
    if (Array.isArray(hfData) && hfData[0]?.generated_text) {
      generatedText = hfData[0].generated_text;
    } else {
      generatedText = JSON.stringify(hfData);
    }

    // -- POST-PROCESSING: Extract the first line that ends with '?' --
    const lines = generatedText.trim().split("\n");
    let finalQuestion = "";
    for (let line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.endsWith("?")) {
        finalQuestion = trimmedLine;
        break;
      }
    }
    // Fallback if no line with '?' found
    if (!finalQuestion) {
      finalQuestion = generatedText.trim();
    }

    // Update user in DB
    user.adaptiveQuestions.push({
      question: finalQuestion,
      askedAt: new Date()
    });
    await user.save();

    return res.json({ adaptiveQuestion: finalQuestion });
  } catch (error) {
    console.error("Error generating/updating adaptive question via HF:", error);
    return res.status(500).json({ error: error.message });
  }
});