import React from 'react';
import { HiCheckCircle } from 'react-icons/hi2';

const Success = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 pt-8 pb-4">
      {/* Check Icon */}
      <HiCheckCircle className="text-blue-500 w-16 h-16 mb-6" />

      {/* Amount */}
      <p className="text-3xl font-semibold text-gray-800">₹1.00</p>

      {/* Payee Details */}
      <p className="text-sm text-gray-600 mt-2">Paid to TOYASH PATIL</p>
      <p className="text-sm text-gray-500">PhonePe • toyash.17@axl</p>

      {/* Date & Transaction ID */}
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>18 March 2025, 3:33 am</p>
        <p>UPI transaction ID: 101650807502</p>
      </div>

      {/* Buttons */}
      <div className="flex space-x-3 mt-6">
        {/* Share Screenshot */}
        <button
          className="px-4 py-2 border border-blue-600 text-blue-600 bg-white rounded-md font-medium 
                     hover:bg-blue-50 transition-colors"
        >
          Share screenshot
        </button>
        {/* Done */}
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium 
                     hover:bg-blue-700 transition-colors"
        >
          Done
        </button>
      </div>

      {/* Bottom UPI Logo */}
      <div className="mt-auto">
        <img
          src="https://via.placeholder.com/80x20.png?text=UPI"
          alt="UPI Logo"
          className="h-5 object-contain mt-6"
        />
      </div>
    </div>
  );
};

export default Success;
