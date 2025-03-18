import React from 'react';
import {
    HiOutlineArrowLeft,
    HiOutlineEllipsisVertical
} from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const BankPay = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Top Bar */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                {/* Back Arrow */}
                <button className="text-gray-700">
                    <HiOutlineArrowLeft className="w-6 h-6" />
                </button>

                {/* Title */}
                <h1 className="text-base font-semibold text-gray-800">
                    Enter recipient details
                </h1>

                {/* Three-dot Menu */}
                <button className="text-gray-700">
                    <HiOutlineEllipsisVertical className="w-6 h-6" />
                </button>
            </div>

            {/* Form Fields */}
            <div className="px-4 py-4 space-y-4">
                {/* Bank Account Number */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Bank account number
                    </label>
                    <input
                        type="text"
                        placeholder="Bank account number"
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                </div>

                {/* IFSC Code */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        IFSC code
                    </label>
                    <div className="flex space-x-2 mt-1">
                        <input
                            type="text"
                            placeholder="IFSC code"
                            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                        <button className="text-sm text-purple-600 font-medium hover:underline">
                            Search for IFSC
                        </button>
                    </div>
                </div>

                {/* Enter Amount */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Enter amount
                    </label>
                    <input
                        type="number"
                        placeholder="₹0"
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                </div>

                {/* Continue Button (disabled by default) */}
                <Link to="/success" >
                    <button
                        
                        className="w-full bg-red-200 text-gray-500 text-sm font-medium py-2 rounded-md cursor-not-allowed"
                    >
                        Continue
                    </button>
                </Link>

                {/* Disclaimer */}
                <p className="text-xs text-gray-500">
                    This information will be securely saved as per Google Pay Terms of Service
                    and Privacy Policy
                </p>
            </div>

            {/* Recent Bank Transfers */}
            <div className="px-4 mt-auto">
                <h2 className="text-sm font-medium text-gray-800 mb-2">
                    Recent bank transfers
                </h2>

                <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50">
                    <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-700">N</span>
                    </div>
                    <p className="text-sm text-gray-800">nbss</p>
                </div>
            </div>

            {/* Bottom Branding / Logo */}
            <div className="flex items-center justify-center py-4">
                <img
                    src="https://via.placeholder.com/80x20.png?text=UPI"
                    alt="UPI Logo"
                    className="h-5 object-contain"
                />
            </div>
        </div>
    );
};

export default BankPay;
