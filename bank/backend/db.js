const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.NODE_MONGO_URI;

const connectTOMongo = async () => {
    await mongoose.connect("mongodb+srv://toyashpatil17:xqmQOJuQwQ7Ida02@cluster0.2d2ds.mongodb.net/");
    console.log("Connected to Mongodb")

}

module.exports = connectTOMongo;