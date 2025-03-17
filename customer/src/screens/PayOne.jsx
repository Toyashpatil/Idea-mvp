import React from 'react';

// Optional icon placeholders from Heroicons v2 (react-icons/hi2)
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRightCircle,
  HiOutlineBuildingLibrary,
  HiOutlineUserGroup,
  HiOutlineDevicePhoneMobile
} from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const PayOne = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center p-4">
        {/* Back Arrow */}
        <button className="text-gray-700 mr-2">
          <HiOutlineArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-medium text-gray-800">Send money</h1>
      </div>

      {/* Heading and Subtitle */}
      <div className="px-4 mb-4 relative">
        <h2 className="text-xl font-semibold text-gray-800">Zero wait time • Zero fee</h2>
        <p className="text-sm text-gray-500 mt-1">
          Add recipient and pay up to 1 lakh per day instantly.
        </p>

        {/* Top-right Illustration (Placeholder) */}
        <div className="absolute top-4 right-4 w-16 h-16">
          <img
            src="https://via.placeholder.com/64?text=Bank"
            alt="Bank"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Transfer Options */}
      <div className="flex-1 px-4 space-y-3">
        {/* 1: To self bank account */}
        <button className="w-full bg-white p-4 rounded-md shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Icon */}
            <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
              <HiOutlineBuildingLibrary className="w-5 h-5" />
            </div>
            {/* Text */}
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">To self bank account</p>
              <p className="text-xs text-gray-500">3 saved accounts</p>
            </div>
          </div>
          {/* Right Arrow */}
          <HiOutlineArrowRightCircle className="w-5 h-5 text-gray-400" />
        </button>

        {/* 2: To other’s bank account */}
        <Link to='/bankpay' className="w-full bg-white p-4 rounded-md shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Icon */}
            <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
              <HiOutlineUserGroup className="w-5 h-5" />
            </div>
            {/* Text */}
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">To other’s bank account</p>
              <p className="text-xs text-gray-500">2 saved accounts</p>
            </div>
          </div>
          {/* Right Arrow */}
          <HiOutlineArrowRightCircle className="w-5 h-5 text-gray-400" />
        </Link>

        {/* 3: To any UPI app */}
        <button className="w-full bg-white p-4 rounded-md shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Icon */}
            <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
              <HiOutlineDevicePhoneMobile className="w-5 h-5" />
            </div>
            {/* Text */}
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">To any UPI app</p>
              <p className="text-xs text-gray-500">5 saved UPI IDs / numbers</p>
            </div>
          </div>
          {/* Right Arrow */}
          <HiOutlineArrowRightCircle className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Bottom Logo / Branding (Optional) */}
      <div className="flex items-center justify-center py-4">
        <img
          src="https://via.placeholder.com/80x20.png?text=Logo"
          alt="Brand Logo"
          className="h-5 object-contain"
        />
      </div>
    </div>
  );
};

export default PayOne;
