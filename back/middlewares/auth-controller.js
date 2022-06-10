const dbConnector = require("../models/dbc").get();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signIn = async (req, res, next) => {
  const user = await dbConnector.User.findOne({
    where: { email: req.body.email },
  });
  if (user) {
    const passwordIsValid = bcrypt.compareSync(
      req.body.password.trim(),
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 86400, // 24 hours
    });
    const role = await user.getRole();
    res.status(200).send({
      id: user.id,
      email: user.email,
      lastname: user.lastname,
      firstname: user.firstname,
      accessToken: token,
      role: role.role,
    });
    res.end();
  } else {
    res.status(401).send({
      message: "User not found",
    });
  }
};
