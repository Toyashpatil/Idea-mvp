import React from 'react';
import {
    HiOutlineBell,
    HiOutlineBars3, // replaced HiOutlineMenu
    HiArrowLongRight,
    HiOutlineBanknotes,
    HiOutlineCreditCard,
    HiOutlineMapPin,
    HiOutlineHome,
    HiOutlineBellAlert,
    HiOutlineUser
} from 'react-icons/hi2';
import BottomNavigation from '../components/BottomNavigation';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Top Bar & Header */}
            <div className="relative bg-gradient-to-r from-purple-700 to-purple-800 text-white px-4 pb-8 pt-6 rounded-b-3xl">
                {/* Top Bar */}
                <div className="flex justify-between items-center mb-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 bg-yellow-300 text-gray-800 rounded-full flex items-center justify-center font-bold">
                        T
                    </div>
                    <div className="flex space-x-4">
                        {/* Notification Icon */}
                        <button className="text-white">
                            <HiOutlineBell className="w-6 h-6" />
                        </button>
                        {/* Menu Icon */}
                        <button className="text-white">
                            <HiOutlineBars3 className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Heading & CTA */}
                <div className="flex">
                    <div className="flex-1">
                        <h1 className="text-xl font-semibold">
                            Book All Things Travel Easily
                        </h1>
                        <p className="text-sm text-gray-100 mt-1">
                            Flights, Buses, Trains
                        </p>
                        <button className="mt-3 flex items-center bg-white text-purple-800 font-medium py-1.5 px-4 rounded-full hover:bg-gray-50 transition">
                            Explore Now
                            <HiArrowLongRight className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                    {/* Illustration / Image Placeholder */}
                    <div className="relative w-24 h-24 ml-2">
                        <img
                            src="https://via.placeholder.com/80x80.png?text=Travel"
                            alt="Travel Illustration"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 px-4 py-4">
                {/* Money Transfers Section */}
                <h2 className="text-base font-semibold text-gray-800 mb-3">
                    Money transfers
                </h2>
                <div className="grid grid-cols-3 gap-3">
                    {/* 1: To mobile number */}
                    <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                        <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mb-2">
                            <HiOutlineBanknotes className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 text-center">
                            To mobile number
                        </p>
                    </div>

                    {/* 2: To bank & self account */}
                    <Link to='/payone' >
                        <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                            <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mb-2">
                                <HiOutlineCreditCard className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-medium text-gray-700 text-center">
                                To bank & self account
                            </p>
                        </div>
                    </Link>

                    {/* 3: Check balance */}
                    <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                        <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mb-2">
                            <HiOutlineMapPin className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 text-center">
                            Check balance
                        </p>
                    </div>
                </div>

                {/* Other Services */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                    {/* 1: Recharge & bills */}
                    <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                        <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mb-2">
                            <HiOutlineBanknotes className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 text-center">
                            Recharge & bills
                        </p>
                    </div>
                    {/* 2: Travel & stays */}
                    <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                        <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mb-2">
                            <HiOutlineMapPin className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 text-center">
                            Travel & stays
                        </p>
                    </div>
                    {/* 3: Commute */}
                    <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                        <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mb-2">
                            <HiOutlineBanknotes className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 text-center">
                            Commute
                        </p>
                    </div>
                    {/* 4: Loans */}
                    <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                        <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mb-2">
                            <HiOutlineCreditCard className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 text-center">
                            Loans
                        </p>
                    </div>
                    {/* 5: Insurance */}
                    <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm col-span-2">
                        <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mb-2">
                            <HiOutlineBanknotes className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 text-center">
                            Insurance
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation (Optional) */}
            <BottomNavigation />
        </div>
    );
};

export default Home;
