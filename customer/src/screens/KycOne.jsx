import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KycOne = () => {
  // List of required documents for account creation
  const documents = [
    'Aadhar Card',
    'PAN Card',
    'Passport',
    'Driving License',
    'Voter ID',
  ];

  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const navigate = useNavigate();

  // Toggle selection of a document
  const handleToggle = (index) => {
    if (selectedDocuments.includes(index)) {
      setSelectedDocuments(selectedDocuments.filter((i) => i !== index));
    } else {
      setSelectedDocuments([...selectedDocuments, index]);
    }
  };

  // Handle continue button: compute risk score and navigate
  const handleContinue = () => {
    const total = documents.length;
    const selected = selectedDocuments.length;
    // Lower risk score if more documents are selected.
    const riskScore = (total - selected) * 10;
    console.log("Computed risk score:", riskScore);
    // Store risk score (for example, in localStorage or via context) if needed.
    localStorage.setItem("riskScore", riskScore);
    // Navigate to the next step (e.g., KycTwo screen)
    navigate("/kyctwo");
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto px-4 py-6 bg-white">
      {/* Top Bar with Back Arrow */}
      <div className="flex items-center mb-6">
        <button className="text-gray-700">
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
      <h1 className="text-2xl font-semibold text-gray-900">Account Documents</h1>
      <p className="text-gray-600 mt-2">
        Please select the documents you are providing for account creation.
      </p>

      {/* List of Document Checkboxes */}
      <div className="mt-6 space-y-3">
        {documents.map((doc, index) => {
          const isSelected = selectedDocuments.includes(index);
          return (
            <div
              key={doc}
              onClick={() => handleToggle(index)}
              className={`flex items-center px-4 py-3 border rounded-lg cursor-pointer
                ${isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-white'}`}
            >
              {/* Custom Checkbox */}
              <div
                className={`flex items-center justify-center w-5 h-5 rounded-md border 
                  ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'}`}
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
              <span className="ml-3 text-gray-800">{doc}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between items-center mt-auto pt-6">
        <button className="text-gray-500 font-medium">SKIP</button>
        <button
          onClick={handleContinue}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
};

export default KycOne;
