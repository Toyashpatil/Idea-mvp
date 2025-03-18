import React, { useState } from "react";

const Home = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSet = () => {
    console.log({ date, time });
  };

  return (
    <div className="min-h-screen flex bg-[#78c4ff]">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col space-y-4">
        <h2 className="text-xl font-bold mb-4">Navigation</h2>

        <a href="/dashboard" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-center transition duration-300">
          Dashboard
        </a>

        <a href="/alerts" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-center transition duration-300">
          Alerts
        </a>

        <a href="/smurfing" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-center transition duration-300">
          Smurfing
        </a>

        <a href="/settings" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-center transition duration-300">
          Settings
        </a>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-4">
          {/* Date Picker */}
          <div className="relative max-w-sm mb-4">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          {/* Time Picker */}
          <div className="relative max-w-sm mb-4">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          {/* Set Button */}
          <button
            onClick={handleSet}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Set
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
