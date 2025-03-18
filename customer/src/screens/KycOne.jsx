import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const KycOne = () => {
  const reasons = [
    'Spend or save daily',
    'Spend while travelling',
    'Send and manage money',
    'Gain exposure to financial assets',
    'Others',
  ];

  const [selectedReasons, setSelectedReasons] = useState([]);

  // Toggle checkbox selection
  const handleToggle = (index) => {
    if (selectedReasons.includes(index)) {
      // If already selected, deselect it
      setSelectedReasons(selectedReasons.filter((i) => i !== index));
    } else {
      // Otherwise, select it
      setSelectedReasons([...selectedReasons, index]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto px-4 py-6 bg-white">
      {/* Top Bar with Back Arrow */}
      <div className="flex items-center mb-6">
        <button className="text-gray-700">
          {/* Simple left arrow icon (Heroicons style) */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Title and Subheading */}
      <h1 className="text-2xl font-semibold text-gray-900">Get started</h1>
      <p className="text-gray-600 mt-2">
        Tell us the main reason for using the FintechX application please.
      </p>

      {/* List of checkboxes */}
      <div className="mt-6 space-y-3">
        {reasons.map((reason, index) => {
          const isSelected = selectedReasons.includes(index);

          return (
            <div
              key={reason}
              onClick={() => handleToggle(index)}
              className={`flex items-center px-4 py-3 border rounded-lg cursor-pointer
                ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 bg-white'
                }`}
            >
              {/* Custom checkbox */}
              <div
                className={`flex items-center justify-center w-5 h-5 rounded-md border 
                  ${
                    isSelected
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300 bg-white'
                  }`}
              >
                {isSelected && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              {/* Reason label */}
              <span className="ml-3 text-gray-800">{reason}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between items-center mt-auto pt-6">
        <button className="text-gray-500 font-medium">SKIP</button>
        <Link to="/kyctwo" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium">
          CONTINUE
        </Link>
      </div>
    </div>
  );
};

export default KycOne;
