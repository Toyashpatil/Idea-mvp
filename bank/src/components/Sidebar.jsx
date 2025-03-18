import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="w-64 bg-blue-600 text-white flex flex-col">
      <nav className="mt-4 flex-1">
        <ul>
          <li>
            <NavLink 
              to="/" 
              end
              className={({ isActive }) =>
                isActive ? "block px-4 py-2 bg-blue-700" : "block px-4 py-2 hover:bg-blue-700"
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

      {/* Placeholder for logout */}
      <div className="mt-auto mb-4">
        <button className="block w-full text-left px-4 py-2 hover:bg-blue-700">
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
