import Sidebar from '../components/Sidebar'

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-semibold">Welcome back, 3</h2>
          <p className="text-gray-600 mt-2">Here’s your financial overview</p>
        </div>

        {/* Balance Card */}
        <div className="mt-8 bg-gradient-to-r from-cyan-900 to-teal-600 text-white rounded-xl p-8 shadow-lg">
          <p className="text-gray-200 text-sm">Total Balance</p>
          <h1 className="text-4xl font-bold mt-1">₹243,450</h1>

          {/* Buttons Row */}
          <div className="grid grid-cols-4 mt-8 gap-6">
            <button className="bg-white/10 p-5 rounded-xl text-center hover:bg-white/20">
              ✈️ <p className="mt-2">Send</p>
            </button>

            <button className="bg-white/10 p-5 rounded-xl text-center hover:bg-white/20">
              ⬇️ <p className="mt-2">Receive</p>
            </button>

            <button className="bg-white/10 p-5 rounded-xl text-center hover:bg-white/20">
              💳 <p className="mt-2">Cards</p>
            </button>

            <button className="bg-white/10 p-5 rounded-xl text-center hover:bg-white/20">
              🌍 <p className="mt-2">FX</p>
            </button>
          </div>
        </div>

        {/* Risk Score */}
        <div className="mt-8 bg-white shadow-md rounded-xl p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your Risk Score</h3>
            <div className="flex items-center gap-2 text-green-600">
              🛡️ <span className="text-sm">Safe</span>
            </div>
          </div>

          <div className="text-4xl font-bold mt-4">42 
            <span className="text-gray-400 text-lg"> / 100</span>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
            <div className="h-full bg-green-500 rounded-full" style={{ width: "42%" }} />
          </div>

          <p className="text-gray-600 mt-4 text-sm">
            Low risk profile. Your account shows normal behavioral patterns and compliant activity.
          </p>
        </div>

        {/* Insights */}
        <div className="mt-8 bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">GenAI Activity Insights</h3>

          <ul className="text-gray-700 space-y-4">
            <li>
              <strong>📊 Spending Pattern Normal</strong>
              <p className="text-sm text-gray-500">
                Your transaction velocity matches historical patterns. No anomalies detected.
              </p>
            </li>

            <li>
              <strong>🌍 Cross-Border Compliance</strong>
              <p className="text-sm text-gray-500">
                No cross-border AML concerns detected.
              </p>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
