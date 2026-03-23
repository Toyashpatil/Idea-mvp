import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

const PYTHON_API = "http://localhost:8000/score";   // ← your python scoring API
const API_KEY = ""; // add if you use x-api-key

// in-memory history
let history = [];

// compute account_agg for each transaction
function computeAccountAgg(history) {
  const now = new Date();

  const last24 = history.filter(
    (h) => now - new Date(h.timestamp) < 24 * 60 * 60 * 1000
  );

  const outflows24 = last24.filter((t) => t.amount < 0);
  const lastInflow = history.filter((t) => t.amount > 0).slice(-1)[0] || { amount: 0 };

  return {
    unique_recipients: new Set(history.map((t) => t.recipient)).size,
    outbound_transfer_count: history.filter((t) => t.amount < 0).length,
    total_txn_count: history.length,
    avg_amount_cust:
      history.reduce((a, b) => a + Math.abs(b.amount), 0) / (history.length || 1),

    base_risk: 0.2,
    account_age_days: 300,
    balance: history.reduce((sum, t) => sum + t.amount, 0),

    txns_24h: last24.length,
    txns_7d: history.length,

    last_inflow_amount: lastInflow.amount,
    time_since_last_inflow_hours:
      lastInflow.timestamp
        ? (now - new Date(lastInflow.timestamp)) / (1000 * 3600)
        : 999,

    sum_outflow_24h: outflows24.reduce((s, t) => s + Math.abs(t.amount), 0),
    count_outflow_24h: outflows24.length,

    median_outflow_24h:
      outflows24.length === 0
        ? 0
        : outflows24
            .map((t) => Math.abs(t.amount))
            .sort((a, b) => a - b)[Math.floor(outflows24.length / 2)],

    max_outflow_24h:
      outflows24.length === 0
        ? 0
        : Math.max(...outflows24.map((t) => Math.abs(t.amount))),

    inflow_to_outflow_ratio_24h:
      lastInflow.amount /
        (outflows24.reduce((s, t) => s + Math.abs(t.amount), 0) || 1),

    is_large_inflow_recent: lastInflow.amount > 50000 ? 1 : 0,

    num_transfers_above_20k_24h:
      outflows24.filter((t) => Math.abs(t.amount) > 20000).length
  };
}

// ------------------------
// SIMULATE ROUTE (MAIN FIX)
// ------------------------
app.post("/simulate", async (req, res) => {
  try {
    const txn = req.body;

    // add timestamp ALWAYS
    txn.timestamp = new Date().toISOString();

    // add to history
    history.push(txn);

    // compute aggregates
    const account_agg = computeAccountAgg(history);

    // call python API (CORRECT BODY FORMAT)
    const pythonRes = await axios.post(
      PYTHON_API,
      {
        txn,
        account_agg,
        alpha: 0.7
      },
      {
        headers: {
          "Content-Type": "application/json",
          ...(API_KEY && { "x-api-key": API_KEY })
        }
      }
    );

    res.json({
      success: true,
      score_result: pythonRes.data,
      account_agg
    });

  } catch (err) {
    console.log("PY BACKEND ERROR:", err.response?.data || err);
    res.status(500).json({ error: err.toString() });
  }
});

// reset scenario
app.post("/reset", (req, res) => {
  history = [];
  res.json({ success: true, message: "Simulation history cleared." });
});

app.listen(5000, () =>
  console.log("Node Simulation backend running on http://localhost:5000")
);
