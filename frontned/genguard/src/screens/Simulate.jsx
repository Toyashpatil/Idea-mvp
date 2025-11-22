import React from "react";
import Sidebar from "../components/Sidebar";
import { Play, Globe, Info } from "lucide-react";

export default function Simulate() {
  return (
  <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

  {/* Main Content */}
  <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6">Simulate Transaction</h1>

        <div className="max-w-4xl space-y-8">

          {/* Quick Replay Box */}
          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-purple-500 text-lg">⚡</span>
              </div>
              <div className="flex-1">
                <h2 className="font-semibold">Quick Replay: Smurfing Scenario</h2>
                <p className="text-sm text-gray-500">
                  Automatically generate 12 small deposits followed by a large outbound transfer to demonstrate smurfing detection.
                </p>
              </div>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">
                Replay Scenario
              </button>
            </div>
          </div>

          {/* Manual Transaction Section */}
          <div className="p-6 bg-white rounded-xl shadow-sm border space-y-6">
            <h2 className="font-semibold">Manual Transaction Entry</h2>

            {/* Amount */}
            <div>
              <label className="text-sm font-medium">Amount (USD)</label>
              <input
                type="number"
                placeholder="200.00"
                className="mt-1 w-full border p-2 rounded-lg"
              />
              <p className="text-xs text-gray-400">
                Use negative for outbound transfers (e.g., -2400)
              </p>
            </div>

            {/* Counterparty */}
            <div>
              <label className="text-sm font-medium">Counterparty Name</label>
              <input
                type="text"
                placeholder="Account-1234 or Company Name"
                className="mt-1 w-full border p-2 rounded-lg"
              />
            </div>

            {/* Country */}
            <div>
              <label className="text-sm font-medium">Country</label>
              <select className="mt-1 w-full border p-2 rounded-lg">
                <option>United States</option>
                <option>Canada</option>
                <option>UK</option>
              </select>
            </div>

            {/* Purpose */}
            <div>
              <label className="text-sm font-medium">Purpose</label>
              <input
                type="text"
                placeholder="e.g., Transfer, Investment, Payment for Services"
                className="mt-1 w-full border p-2 rounded-lg"
              />
            </div>

            {/* Batch Mode */}
            <div className="p-4 border rounded-lg bg-orange-50">
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span className="text-sm font-medium">Batch Mode (Smurfing Simulation)</span>
              </label>
              <p className="text-xs text-gray-600 ml-6">
                Create multiple small deposits with the same amount to simulate smurfing behavior.
              </p>
            </div>

            {/* Execute Button */}
            <button className="w-full py-3 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700 flex items-center justify-center space-x-2">
              <Play className="h-4 w-4" />
              <span>Execute Transaction</span>
            </button>
          </div>

          {/* Info Box */}
          <div className="p-6 bg-blue-50 border rounded-xl shadow-sm">
            <h3 className="font-semibold mb-2">How Smurfing Detection Works:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• AI monitors patterns of multiple small deposits followed by large withdrawals</li>
              <li>• Velocity analysis detects unusual transaction frequency</li>
              <li>• Cross-border transfers to high-risk jurisdictions trigger additional scrutiny</li>
              <li>• Network graph analysis reveals connections between accounts</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
