import React from 'react';
import { Link } from 'react-router-dom';

const KycTwo = () => {
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

      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-900">
        Let’s verify your identity
      </h1>
      {/* Subheading */}
      <p className="text-gray-600 mt-3">
        We are required to verify your identity before you can use the application. 
        Your information will be encrypted and stored securely.
      </p>

      {/* Image (placeholder for ID illustration) */}
      <div className="flex justify-center my-8">
        {/* Replace src with your preferred ID illustration */}
        <img 
          src="https://via.placeholder.com/150?text=ID+Card" 
          alt="ID Card" 
          className="w-40 h-auto" 
        />
      </div>

      {/* Bottom Button */}
      <div className="mt-auto">
        <Link to='/genque' className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg">
          VERIFY IDENTITY
        </Link>
      </div>
    </div>
  );
};

export default KycTwo;
