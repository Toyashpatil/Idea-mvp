const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enables CORS
app.use(express.json()); // Parses incoming JSON requests

// Employee API Routes
app.use("/api/employees", employeeRoutes);

// Root Route (for testing)
app.get("/", (req, res) => {
  res.send("GenGuard Employee API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
