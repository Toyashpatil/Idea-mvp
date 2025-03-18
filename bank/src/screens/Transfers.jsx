// src/pages/TransfersPage.jsx

import React, { useState } from "react";

function TransfersPage() {
  // Employee JSON Data (Mocked)
  const [employees, setEmployees] = useState([
    { id: "EMP001", name: "John Doe", transfers: 2, location: "Mumbai" },
    { id: "EMP002", name: "Jane Smith", transfers: 5, location: "Delhi" },
    { id: "EMP003", name: "Raj Patel", transfers: 3, location: "Bangalore" },
    { id: "EMP004", name: "Maria Garcia", transfers: 1, location: "Kolkata" },
  ]);

  // List of available branches
  const branchList = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "London",
    "New York",
    "Singapore",
    "Dubai",
  ];

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchBranch, setSearchBranch] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  // Open the modal with selected employee details
  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setSearchBranch("");
    setSelectedBranch(employee.location);
    setModalOpen(true);
  };

  // Handle transfer submission
  const handleTransfer = () => {
    if (!selectedBranch) {
      alert("Please select a branch.");
      return;
    }

    // Update employee location and transfer count
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === selectedEmployee.id
          ? {
              ...emp,
              location: selectedBranch,
              transfers: emp.transfers + 1,
            }
          : emp
      )
    );

    // Close modal
    setModalOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">Employee Transfers</h2>
      <p className="text-gray-600 mb-8">
        Below is a list of employees, their current location, and the total
        number of transfers made. You can initiate a transfer to a new branch
        using the button in the Actions column.
      </p>

      {/* Employee Table */}
      <div className="overflow-x-auto shadow rounded">
        <table className="w-full table-auto bg-white border border-gray-200 rounded">
          <thead>
            <tr className="bg-gray-100 border-b text-gray-700">
              <th className="px-4 py-3 text-left font-semibold">Employee ID</th>
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">
                Number of Transfers
              </th>
              <th className="px-4 py-3 text-left font-semibold">Current Location</th>
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700 font-medium">
                  {employee.id}
                </td>
                <td className="px-4 py-3 text-gray-700">{employee.name}</td>
                <td className="px-4 py-3 text-gray-700">{employee.transfers}</td>
                <td className="px-4 py-3 text-gray-700">{employee.location}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => openModal(employee)}
                    className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Transfer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transfer Modal */}
      {modalOpen && (
        // BACKDROP with BLUR
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          {/* Modal Container */}
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Transfer Employee
            </h3>

            <p className="mb-1 text-gray-700">
              <span className="font-medium">Employee:</span> {selectedEmployee.name}
            </p>
            <p className="mb-4 text-gray-700">
              <span className="font-medium">Current Location:</span> {selectedEmployee.location}
            </p>

            {/* Search Branch Input */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1 font-medium">Search Branch</label>
              <input
                type="text"
                placeholder="Type to filter branches..."
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                value={searchBranch}
                onChange={(e) => setSearchBranch(e.target.value)}
              />
            </div>

            {/* Filtered Branch List */}
            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded">
              {branchList
                .filter((branch) =>
                  branch.toLowerCase().includes(searchBranch.toLowerCase())
                )
                .map((branch) => (
                  <div
                    key={branch}
                    className={`px-3 py-2 cursor-pointer ${
                      selectedBranch === branch
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedBranch(branch)}
                  >
                    {branch}
                  </div>
                ))}
            </div>

            {/* Selected Branch */}
            <p className="mt-4 text-gray-700">
              <span className="font-medium">Selected Branch:</span> {selectedBranch}
            </p>

            {/* Modal Actions */}
            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-400 text-white py-1 px-3 rounded hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleTransfer}
                className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Confirm Transfer
              </button>
            </div>

            {/* Close Icon */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setModalOpen(false)}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 
                    10l4.95 4.95a1 1 0 01-1.414 1.414L10 
                    11.414l-4.95 4.95a1 1 0 01-1.414-1.414l4.95-4.95-4.95-4.95A1 
                    1 0 015.05 3.636L10 8.586z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransfersPage;
