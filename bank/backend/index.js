const express = require("express");
const app = express();
const session = require('express-session');
require('dotenv').config();
const cors = require("cors");

const connectTOMongo = require('./db');

app.use(express.json());

connectTOMongo();
app.use(cors()); 
app.get("/", (req, res) => {
    res.send("GenGuard Employee API is running...");
  });

const PORT = 5000;
app.listen(PORT,()=>{
    console.log("Server started PORT : " + PORT);
})