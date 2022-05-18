const jwt = require("jsonwebtoken");
require("dotenv").config()
const dbConnector = require("../models/dbc").get()


exports.verifytoken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: "Unauthorized!!" });
      }
      req.userID = decoded.id;
      next();
    });
  };