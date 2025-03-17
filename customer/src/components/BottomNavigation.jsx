import React from 'react';
import { HiOutlineHome, HiOutlineBellAlert, HiOutlineUser } from 'react-icons/hi2';

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-inner flex items-center justify-around">
      <button className="flex flex-col items-center text-gray-600">
        <HiOutlineHome className="w-6 h-6" />
        <span className="text-xs">Home</span>
      </button>
      <button className="flex flex-col items-center text-gray-600">
        <HiOutlineBellAlert className="w-6 h-6" />
        <span className="text-xs">Alerts</span>
      </button>
      <button className="flex flex-col items-center text-gray-600">
        <HiOutlineUser className="w-6 h-6" />
        <span className="text-xs">Profile</span>
      </button>
    </div>
  );
};

export default BottomNavigation;
