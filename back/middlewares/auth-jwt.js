const jwt = require("jsonwebtoken");
require("dotenv").config();
const dbConnector = require("../models/dbc").get();

exports.verifytoken = (req, res, next) => {
  try {
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
  } catch (err) {
    res.json({ message: err.errors });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    dbConnector.User.findByPk(req.userID).then((user) => {
      user.getRole().then((role) => {
        if (role.role === "admin") {
          next();
          return;
        }
        res.status(403).send({
          message: "Require Admin Role!",
        });
        return;
      });
    });
  } catch (err) {
    res.json({ message: err.errors });
  }
};

exports.isHim = async (req, res, next) => {
  try {
    const user = await dbConnector.User.findByPk(req.userID);
    if (user.id == req.params.userId || user.RoleId == 1) {
      next();
      return;
    } else {
      res.status(403).send({
        message: "Unauthorized not him",
      });
      return;
    }
  } catch (err) {
    res.json({ message: err.errors });
  }
};
