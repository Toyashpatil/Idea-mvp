// middleware to fetch user
var jwt = require('jsonwebtoken');
require("dotenv").config();
require('dotenv').config();

const JWT_token = "Idea#123";

const fetchUser = (req, res, next) => {

    try {
        
        const authToken = req.header('auth-token')
        if (!authToken) {
            res.status(401).json({ Error: "Please enter correct auth token" });
        }
        const authtokenData = jwt.verify(authToken, JWT_token);
        
        req.user = authtokenData;
       


        next();
    } catch (error) {
        console.error(error);
    }

}

module.exports = fetchUser;
