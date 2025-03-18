import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Sample questions for high and low risk scores
const highRiskQuestions = [
  "What is your investment experience?",
  "Have you ever experienced a significant financial loss?",
  "Do you have a diversified investment portfolio?",
  "How do you react to market volatility?",
  "What is your understanding of high-risk investments?",
  // Add more questions as needed
];

const lowRiskQuestions = [
  "What is your primary source of income?",
  "Do you have an emergency fund?",
  "How often do you review your financial goals?",
  "What is your preferred investment strategy?",
  "How do you prioritize saving versus spending?",
  // Add more questions as needed
];

const AdaptQues = () => {
    const navigate = useNavigate();
  const riskScore = 7;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState([]);

  // Shuffle array function to randomize questions
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  // Initialize questions based on risk score
  useEffect(() => {
    if (riskScore > 5) {
      setQuestions(shuffleArray(highRiskQuestions));
    } else {
      setQuestions(shuffleArray(lowRiskQuestions).slice(0, 5)); // Get 5 random questions
    }
  }, [riskScore]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setResponses((prevResponses) => {
      const newResponses = [...prevResponses];
      newResponses[currentQuestionIndex] = value;
      return newResponses;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Final submission: log and process responses as needed
      console.log('Responses:', JSON.stringify(responses, null, 2));
      alert('Thank you for your responses! Check the console for the JSON output.');
      navigate('/accr')
    }
  };

  // Calculate progress percentage for the progress bar
  const progressPercentage = questions.length
    ? ((currentQuestionIndex + 1) / questions.length) * 100
    : 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Adaptive Questionnaire
        </h2>

        {questions.length > 0 ? (
          <>
            {/* Progress Indicator */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <p className="text-lg text-gray-700 mb-4">
              {questions[currentQuestionIndex]}
            </p>

            {/* Answer Input */}
            <input
              type="text"
              value={responses[currentQuestionIndex] || ''}
              onChange={handleInputChange}
              placeholder="Your answer..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            />

            {/* Next/Submit Button */}
            <button 
              onClick={handleNext} 
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md font-medium hover:from-blue-600 hover:to-blue-700 transition duration-200"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
            </button>
          </>
        ) : (
          <p className="text-center text-gray-500">Loading questions...</p>
        )}
      </div>
    </div>
  );
};

export default AdaptQues;
