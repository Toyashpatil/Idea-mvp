// src/pages/DashboardPage.jsx

import React, { useState } from "react";

function DashboardPage() {
  // Sample local JSON array of user data 
  // (in a real app, you'd fetch this from your backend)
  const [customers] = useState([
    {
      legalName: "John Doe",
      mobileNumber: "+1-555-1010",
      email: "john.doe@example.com",
      foreignTransactions: false,
      riskScore: 10,
      accountNumber: "ACC123",
      bankName: "GenGuard Bank",
      accountType: "savings",
      balance: 1500,
    },
    {
      legalName: "Jane Smith",
      mobileNumber: "+44-123-4567",
      email: "jane.smith@example.co.uk",
      foreignTransactions: true,
      riskScore: 20,
      accountNumber: "ACC456",
      bankName: "GenGuard Bank",
      accountType: "current",
      balance: 3500,
    },
    {
      legalName: "Raj Patel",
      mobileNumber: "+91-99999-88888",
      email: "raj.patel@example.in",
      foreignTransactions: false,
      riskScore: 5,
      accountNumber: "ACC789",
      bankName: "GenGuard Bank",
      accountType: "savings",
      balance: 570,
    },
    {
      legalName: "Maria Garcia",
      mobileNumber: "+34-654-3210",
      email: "maria.garcia@example.es",
      foreignTransactions: true,
      riskScore: 15,
      accountNumber: "ACC987",
      bankName: "GenGuard Bank",
      accountType: "current",
      balance: 9250,
    },
  ]);

  // For search input
  const [searchTerm, setSearchTerm] = useState("");

  // Track which balances are visible
  // keys = accountNumber, value = boolean
  const [visibleBalances, setVisibleBalances] = useState({});

  // Filter customers based on searchTerm
  const filteredCustomers = customers.filter((cust) => {
    const term = searchTerm.toLowerCase();
    return (
      cust.legalName.toLowerCase().includes(term) ||
      cust.mobileNumber.toLowerCase().includes(term) ||
      cust.email.toLowerCase().includes(term)
    );
  });

  // Toggle balance visibility
  const handleToggleBalance = (accountNumber) => {
    setVisibleBalances((prevState) => ({
      ...prevState,
      [accountNumber]: !prevState[accountNumber],
    }));
  };

  // Simulate CSV download for "transaction history"
  // In a real app, you'd fetch actual transaction data from your backend
  const handleDownloadHistory = (cust) => {
    const transactionData = [
      { date: "2025-01-10", type: "deposit", amount: 500 },
      { date: "2025-01-15", type: "withdrawal", amount: 200 },
      { date: "2025-01-20", type: "transfer", amount: 100 },
    ];

    // Build a CSV string
    let csv = "Date,Type,Amount\n";
    transactionData.forEach((tx) => {
      csv += `${tx.date},${tx.type},${tx.amount}\n`;
    });

    // Create a Blob and download
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `${cust.legalName}_TransactionHistory.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Dashboard</h2>

      <div className="mb-4">
        <label htmlFor="search" className="block mb-1 font-medium text-gray-700">
          Search customers
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search by name, mobile, or email..."
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-gray-700">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Mobile</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Account #</th>
              <th className="px-4 py-2 text-left">Bank</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Balance</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
                  No customers found.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((cust) => (
                <tr key={cust.accountNumber} className="border-b border-gray-200">
                  <td className="px-4 py-2 text-gray-700">{cust.legalName}</td>
                  <td className="px-4 py-2 text-gray-700">{cust.mobileNumber}</td>
                  <td className="px-4 py-2 text-gray-700">{cust.email}</td>
                  <td className="px-4 py-2 text-gray-700">{cust.accountNumber}</td>
                  <td className="px-4 py-2 text-gray-700">{cust.bankName}</td>
                  <td className="px-4 py-2 text-gray-700 capitalize">{cust.accountType}</td>

                  {/* Balance or "View Balance" button */}
                  <td className="px-4 py-2 text-gray-700">
                    {visibleBalances[cust.accountNumber]
                      ? cust.balance
                      : (
                          <button
                            onClick={() => handleToggleBalance(cust.accountNumber)}
                            className="bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-700"
                          >
                            View Balance
                          </button>
                        )
                    }
                  </td>

                  {/* Actions (Download Transaction History) */}
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDownloadHistory(cust)}
                      className="bg-green-600 text-white py-1 px-2 rounded hover:bg-green-700"
                    >
                      Download History
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardPage;
