import { Home, CreditCard, Wallet, Globe, AlertTriangle, Activity, User } from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: <Home size={18} />, active: true },
  { label: "Transactions", icon: <CreditCard size={18} /> },
  { label: "Cross-Border", icon: <Globe size={18} /> },
  { label: "Simulate", icon: <Activity size={18} /> },
  { label: "Network Graph", icon: <AlertTriangle size={18} /> },
  { label: "Insider Threats", icon: <AlertTriangle size={18} /> },
  { label: "AI Insights", icon: <Activity size={18} /> },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#062743] h-screen text-white flex flex-col justify-between p-4">
      {/* Logo */}
      <div>
        <h1 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <span className="text-teal-300">🛡️</span> SecureBank AI
        </h1>

        {/* Menu Items */}
        <nav>
          {menuItems.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 cursor-pointer transition 
              ${item.active ? "bg-teal-700/40 text-white" : "text-gray-300 hover:bg-teal-600/20"}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* User Footer */}
      <div className="flex items-center gap-3 p-3 bg-teal-900/20 rounded-lg">
        <div className="w-10 h-10 rounded-full bg-teal-400 flex items-center justify-center text-black font-bold">
          3
        </div>
        <div>
          <p className="text-white text-sm">User #3</p>
          <p className="text-gray-300 text-xs">View Profile</p>
        </div>
      </div>
    </aside>
  );
}
