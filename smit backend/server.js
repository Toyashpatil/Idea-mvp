import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ----- CONNECT TO MONGO -----
const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
console.log("✅ MongoDB Connected");

const db = client.db(process.env.DB_NAME);
const collection = db.collection("Recommendations");

// ----- API ENDPOINT -----
// Get record by account number
app.get("/recommendation/:accountNumber", async (req, res) => {
  try {
    const accountNumber = Number(req.params.accountNumber);

    const data = await collection.findOne({
      "Account Number": accountNumber
    });

    if (!data) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ----- START SERVER -----
app.listen(5050, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
