import React from 'react';
import photo from"../assets/travel-removebg-preview.png";
import {
    HiOutlineBell,
    HiOutlineBars3,
    HiArrowLongRight,
    HiOutlineBanknotes,
    HiOutlineCreditCard,
    HiOutlineMapPin
} from 'react-icons/hi2';
import BottomNavigation from '../components/BottomNavigation';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Top Bar & Header */}
            <div
                className="relative text-white px-4 pb-8 pt-6 rounded-b-3xl"
                style={{
                    background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(237,28,36,1) 0%, rgba(0,102,183,1) 100%)",
                }}
            >
                {/* Top Bar */}
                <div className="flex justify-between items-center mb-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 bg-white text-gray-800 rounded-full flex items-center justify-center font-bold">
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
                    <div className="relative w-35 h-35 ml-2">
                        <img
                            src={photo}
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
                    <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                        <div
                            className="w-12 h-12 text-purple-700 rounded-full flex items-center justify-center mb-2"
                            style={{ backgroundColor: '#006cb74d' }}
                        >
                            <HiOutlineBanknotes className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 text-center">
                            To mobile number
                        </p>
                    </div>

                    <Link to='/payone'>
                        <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                            <div
                                className="w-12 h-12 text-purple-700 rounded-full flex items-center justify-center mb-2"
                                style={{ backgroundColor: '#006cb74d' }}
                            >
                                <HiOutlineCreditCard className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-medium text-gray-700 text-center">
                                To bank & self account
                            </p>
                        </div>
                    </Link>

                    <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                        <div
                            className="w-12 h-12 text-purple-700 rounded-full flex items-center justify-center mb-2"
                            style={{ backgroundColor: '#006cb74d' }}
                        >
                            <HiOutlineMapPin className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 text-center">
                            Check balance
                        </p>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                        <div
                            className="w-12 h-12 text-purple-700 rounded-full flex items-center justify-center mb-2"
                            style={{ backgroundColor: '#006cb74d' }}
                        >
                            <HiOutlineBanknotes className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 text-center">
                            Recharge & bills
                        </p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                        <div
                            className="w-12 h-12 text-purple-700 rounded-full flex items-center justify-center mb-2"
                            style={{ backgroundColor: '#006cb74d' }}
                        >
                            <HiOutlineMapPin className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 text-center">
                            Travel & stays
                        </p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                        <div
                            className="w-12 h-12 text-purple-700 rounded-full flex items-center justify-center mb-2"
                            style={{ backgroundColor: '#006cb74d' }}
                        >
                            <HiOutlineBanknotes className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 text-center">
                            Commute
                        </p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                        <div
                            className="w-12 h-12 text-purple-700 rounded-full flex items-center justify-center mb-2"
                            style={{ backgroundColor: '#006cb74d' }}
                        >
                            <HiOutlineCreditCard className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 text-center">
                            Loans
                        </p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm col-span-2">
                        <div
                            className="w-12 h-12 text-purple-700 rounded-full flex items-center justify-center mb-2"
                            style={{ backgroundColor: '#006cb74d' }}
                        >
                            <HiOutlineBanknotes className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 text-center">
                            Insurance
                        </p>
                    </div>
                </div>
            </div>

            <BottomNavigation />
        </div>
    );
};

export default Home;