import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from '../assets/logo.png'

const MainLayout = () => {
  // For continuously displaying system time
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleString());
      // or setCurrentTime(now.toLocaleTimeString()) if you only want time
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-row bg-white text-gray-800">
      {/* SIDEBAR */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col">
        <nav className="mt-4 flex-1">
          <ul>
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? "block font-bold  px-4 py-2 bg-blue-700" : " font-bold block px-4 py-2 hover:bg-blue-700"
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/transfers"
                className={({ isActive }) =>
                  isActive ? "block px-4 py-2 bg-blue-700" : "block px-4 py-2 hover:bg-blue-700"
                }
              >
                Transfers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/account-info"
                className={({ isActive }) =>
                  isActive ? "block px-4 py-2 bg-blue-700" : "block px-4 py-2 hover:bg-blue-700"
                }
              >
                Account Info
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/alerts"
                className={({ isActive }) =>
                  isActive ? "block px-4 py-2 bg-blue-700" : "block px-4 py-2 hover:bg-blue-700"
                }
              >
                Alerts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive ? "block px-4 py-2 bg-blue-700" : "block px-4 py-2 hover:bg-blue-700"
                }
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="mt-auto mb-4">
          <button className="block w-full text-left px-4 py-2 hover:bg-blue-700">
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="flex items-center justify-between px-6 py-4 border-b">
          <img className="h-22" src={logo}></img>
          <div className="text-gray-700">
            System Time: {currentTime}
          </div>
        </header>

        {/* This is where the child routes (pages) will render */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
