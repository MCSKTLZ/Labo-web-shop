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

  exports.isAdmin = (req, res, next) => {
    try {
      dbConnector.User.findByPk(req.userID).then(user => {
        user.getRole().then(role => {
            if (role.role === "admin") {
              next();
              return;
            }
          res.status(403).send({
            message: "Require Admin Role!"
          });
          return;
        });
      });
    }
    catch (err) {
      res.json({ message : err.errors})
    }
  };

  exports.isHim = (req, res, next) => {
    try {
      dbConnector.User.findByPk(req.userID).then(user => {
        if(user.id == req.params.id) {
            next();
            return;
        }
        res.status(403).send({
            message: "Unauthorized"
          });
          return;
      })
    }
    catch (err) {
      res.json({ message : err.errors})
    }
  }