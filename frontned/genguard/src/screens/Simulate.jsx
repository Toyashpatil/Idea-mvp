import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Play, Zap, Sparkles, Users, Globe, Repeat, ShieldAlert } from "lucide-react";

// Hardcoded threshold (0..1). Edit to change global behavior.
const RISK_THRESHOLD = 0.25;

export default function Simulate() {
  const API = "http://localhost:5000";

  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [country, setCountry] = useState("United States");
  const [purpose, setPurpose] = useState("General");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const quickAmounts = [500, 2000, 10000, 50000, 100000];
  const presetPurposes = [
    "Investment",
    "Salary",
    "Rent Payment",
    "Crypto Transfer",
    "Invoice Payment",
    "Gift",
    "General"
  ];
  const countries = ["United States", "Canada", "UK", "UAE", "Nigeria", "Singapore"];

  // 300 unique recipients
  const fakeRecipients = Array.from({ length: 300 }, (_, i) => {
    const prefixes = ["User", "Acc", "Client", "Wallet", "Vendor", "Trader", "Corp", "Payee"];
    return `${prefixes[i % prefixes.length]}_${1000 + i}`;
  });

  async function simulate(txn) {
    const res = await fetch(`${API}/simulate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(txn),
    });
    return await res.json();
  }

  async function handleManual() {
    setLoading(true);
    const txn = {
      amount: parseFloat(amount),
      recipient,
      country,
      purpose,
      txn_type: amount < 0 ? "withdrawal" : "deposit"
    };

    const data = await simulate(txn);
    setResult(data);
    setLoading(false);
  }

  // SCENARIOS
  async function runSmurfing() {
    setLoading(true);
    let last = null;
    for (let i = 0; i < 12; i++) {
      last = await simulate({
        amount: 2000,
        recipient: fakeRecipients[i],
        country: "United States",
        purpose: "Smurfing Deposit",
        txn_type: "deposit"
      });
    }
    last = await simulate({
      amount: -50000,
      recipient: "Master_Account",
      country: "United States",
      purpose: "Smurfing Payout",
      txn_type: "transfer"
    });
    setResult(last);
    setLoading(false);
  }

  async function runHighVelocity() {
    setLoading(true);
    let last = null;
    for (let i = 0; i < 20; i++) {
      last = await simulate({
        amount: -500,
        recipient: fakeRecipients[50 + i],
        country: "United States",
        purpose: "High Velocity",
        txn_type: "transfer"
      });
    }
    setResult(last);
    setLoading(false);
  }

  async function runLargeInflow() {
    setLoading(true);
    const last = await simulate({
      amount: 200000,
      recipient: "BigInvestor_01",
      country: "UAE",
      purpose: "Large Investment",
      txn_type: "deposit"
    });
    setResult(last);
    setLoading(false);
  }

  async function runMuleNetwork() {
    setLoading(true);
    let last = null;
    for (let i = 0; i < 15; i++) {
      last = await simulate({
        amount: -2000,
        recipient: fakeRecipients[100 + i],
        country: "Nigeria",
        purpose: "Possible Mule",
        txn_type: "transfer"
      });
    }
    setResult(last);
    setLoading(false);
  }

  async function runHighRiskCountry() {
    setLoading(true);
    const last = await simulate({
      amount: -10000,
      recipient: "ForeignAgency_77",
      country: "Nigeria",
      purpose: "Overseas Transfer",
      txn_type: "transfer"
    });
    setResult(last);
    setLoading(false);
  }

  async function runRoundTripping() {
    setLoading(true);
    await simulate({
      amount: 50000,
      recipient: "WalletA",
      country: "Singapore",
      purpose: "Deposit",
      txn_type: "deposit"
    });
    const last = await simulate({
      amount: -50000,
      recipient: "WalletB",
      country: "Singapore",
      purpose: "Withdrawal",
      txn_type: "transfer"
    });
    setResult(last);
    setLoading(false);
  }

  const fusedScore = result?.score_result?.fused_score ?? 0;
  const isAlert = fusedScore >= RISK_THRESHOLD;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto space-y-8">
        <h1 className="text-3xl font-bold">Advanced Fraud Simulation Demo</h1>

        {/* Scenario Buttons */}
        <div className="grid grid-cols-3 gap-4">
          <button type="button" onClick={runSmurfing} className="scenario-btn"><Sparkles /> Smurfing</button>
          <button type="button" onClick={runHighVelocity} className="scenario-btn"><Zap /> High Velocity</button>
          <button type="button" onClick={runLargeInflow} className="scenario-btn"><Play /> Large Inflow</button>
          <button type="button" onClick={runMuleNetwork} className="scenario-btn"><Users /> Mule Network</button>
          <button type="button" onClick={runHighRiskCountry} className="scenario-btn"><Globe /> High-Risk Country</button>
          <button type="button" onClick={runRoundTripping} className="scenario-btn"><Repeat /> Round Tripping</button>
        </div>

        {/* Manual Entry */}
        <div className="p-6 bg-white rounded-xl shadow border space-y-4">
          <h2 className="text-xl font-semibold">Manual Transaction</h2>

          {/* Quick Amount Chips */}
          <div className="flex space-x-2">
            {quickAmounts.map((amt) => (
              <button type="button" key={amt} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" onClick={() => setAmount(amt)}>
                {amt}
              </button>
            ))}
          </div>

          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="flex space-x-2 items-center">
            <input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Recipient"
            />
            <button
              type="button"
              className="px-3 py-2 bg-indigo-500 text-white rounded"
              onClick={() => setRecipient(fakeRecipients[Math.floor(Math.random() * fakeRecipients.length)])}
            >
              Random
            </button>
          </div>

          <select value={country} onChange={(e) => setCountry(e.target.value)} className="p-2 border rounded w-full">
            {countries.map((c) => <option key={c}>{c}</option>)}
          </select>

          <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className="p-2 border rounded w-full">
            {presetPurposes.map((p) => <option key={p}>{p}</option>)}
          </select>

          <button
            type="button"
            onClick={handleManual}
            className="w-full p-3 bg-teal-600 text-white rounded-lg"
          >
            {loading ? "Processing..." : "Execute Manual Transaction"}
          </button>
        </div>

        {/* ALERT BANNER (shown only when fused >= threshold) */}
        {isAlert && (
          <div className="p-4 bg-red-100 border border-red-300 text-red-700 rounded-xl flex items-center space-x-3 shadow">
            <ShieldAlert className="w-6 h-6" />
            <p className="font-semibold">🚨 ALERT: Suspicious activity detected! (Risk {(fusedScore * 100).toFixed(1)}%)</p>
          </div>
        )}

        {/* Result Panel */}
        <ResultPanel result={result} />
      </main>
    </div>
  );
}

/* ResultPanel */
function ResultPanel({ result }) {
  if (!result) return null;

  const fused = result.score_result.fused_score;
  const TH = RISK_THRESHOLD; // use global threshold

  let label = "";
  let riskBadge = "";

  if (fused < TH * 0.5) {
    label = "NORMAL";
    riskBadge = "bg-green-600";
  } else if (fused >= TH * 0.5 && fused < TH) {
    label = "MODERATE";
    riskBadge = "bg-yellow-500";
  } else {
    label = "RISKY";
    riskBadge = "bg-red-600";
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow border space-y-6">
      <h3 className="text-xl font-bold">Fraud Analysis Result</h3>

      {/* RISK SCORE */}
      <div className="p-5 rounded-xl border bg-gray-50 shadow flex items-center justify-between">
        <div>
          <p className="text-4xl font-bold text-teal-700">
            {(fused * 100).toFixed(1)}%
          </p>
          <p className="text-gray-600 text-sm">Fused AI Risk Score</p>
          <p className="text-xs text-gray-500 mt-1">Threshold: {(TH * 100).toFixed(0)}%</p>
        </div>

        <span className={`px-4 py-2 text-white rounded-lg font-medium ${riskBadge}`}>
          {label}
        </span>
      </div>

      {/* ACCOUNT SUMMARY */}
      <div className="p-5 rounded-xl border bg-white shadow-sm">
        <h4 className="text-lg font-semibold mb-3">Account Summary</h4>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <SummaryBox label="Unique Recipients" value={result.account_agg.unique_recipients} />
          <SummaryBox label="Txns (24h)" value={result.account_agg.txns_24h} />
          <SummaryBox label="Outbound Transfers" value={result.account_agg.outbound_transfer_count} />
          <SummaryBox label="Total Outflow (24h)" value={"$" + result.account_agg.sum_outflow_24h} />
          <SummaryBox label="Large Txns (24h)" value={result.account_agg.num_transfers_above_20k_24h} />
          <SummaryBox label="Balance" value={"$" + result.account_agg.balance} />
        </div>
      </div>

      {/* Key Insights */}
      <div className="p-5 rounded-xl border bg-white shadow-sm">
        <h4 className="text-lg font-semibold mb-3">Key Insights</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          {result.account_agg.unique_recipients > 20 && (
            <li>• High number of unique recipients ({result.account_agg.unique_recipients})</li>
          )}
          {result.account_agg.txns_24h > 30 && (
            <li>• High transaction velocity in last 24h ({result.account_agg.txns_24h} txns)</li>
          )}
          {result.account_agg.num_transfers_above_20k_24h > 0 && (
            <li>• Large outbound transfers detected ({result.account_agg.num_transfers_above_20k_24h})</li>
          )}
          {result.account_agg.inflow_to_outflow_ratio_24h < 0.1 && (
            <li>• Outflow exceeds inflow — possible smurfing/mule patterns</li>
          )}
        </ul>
      </div>

      {/* RAW JSON */}
      <details className="p-4 border rounded-lg bg-gray-100">
        <summary className="font-semibold cursor-pointer">Full Technical Details (JSON)</summary>
        <pre className="text-xs mt-3 bg-white p-3 rounded max-h-80 overflow-auto">
{JSON.stringify(result, null, 2)}
        </pre>
      </details>
    </div>
  );
}

function SummaryBox({ label, value }) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <p className="font-semibold">{label}</p>
      <p>{value}</p>
    </div>
  );
}
