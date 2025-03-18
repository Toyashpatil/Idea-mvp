import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GenQue = () => {
    const navigate = useNavigate()
  // The list of questions
  const questions = [
    "Please provide your full legal name.",
    "What is your primary phone number?",
    "What is your email address?",
    "Do you anticipate frequent international transactions?"
  ];

  // Track which question is currently shown
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Track the user’s answers; one answer slot per question
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  // Move to next question or finish if on the last question
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Construct JSON data from answers
      const data = {
        fullLegalName: answers[0],
        primaryPhoneNumber: answers[1],
        emailAddress: answers[2],
        frequentInternationalTransactions: answers[3],
      };
      // Log the final JSON (replace with your desired handling)
      console.log("Final Answers JSON:", data);
      alert("Answers have been stored in JSON (check console).");
      navigate("/adapt")
    }
  };

  // Update the user’s answer for the current question
  const handleInputChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(newAnswers);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          General Questionnaire
        </h2>

        {/* Question Prompt */}
        <p className="text-gray-700 mb-6">
          {questions[currentQuestionIndex]}
        </p>

        {/* Answer Input */}
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={answers[currentQuestionIndex]}
          onChange={handleInputChange}
          placeholder="Type your answer here..."
        />

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700"
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  );
};

export default GenQue;
