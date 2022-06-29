const dbConnector = require("../models/dbc").get();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  transporter,
  getPasswordResetURL,
  resetPasswordTemplate,
} = require("../middlewares/nodemailer.config");

// exports.usePasswordHashToMakeToken = ({
//   password: passwordHash,
//   id: userId,
//   createdAt,
// }) => {
//   const secret = passwordHash + "-" + createdAt;
//   const token = jwt.sign({ userId }, secret, {
//     expiresIn: 3600, // 1 hour
//   });
//   return token;
// };

exports.sendPasswordResetEmail = async (req, res, next) => {
  const email = req.params.email;
  const user = await dbConnector.User.findOne({ where: { email: email } });
  if (!user) {
    res.status(400).json("An error occured please try again");
  } else {
    // console.log(user);
    const secret = user.password + "-" + user.createdAt.getTime();
    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 3600, // 1 hour
    });
    const url = getPasswordResetURL(user, token);
    // console.log(url);
    const emailTemplate = resetPasswordTemplate(user, url);
    transporter.sendMail(emailTemplate, (err, info) => {
      if (err) {
        res.status(500).json({ message: "Error sending email", error: err });
      } else {
        res.status(202).json({ message: info });
      }
    });
  }
};

exports.receiveNewPassword = async (req, res, next) => {
  const userId = req.params.id;
  const token = req.params.token;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const user = await dbConnector.User.findByPk(userId);
  let decodedToken = null;
  if (user) {
    const secret = user.password + "-" + user.createdAt.getTime();
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        // return res.status(403).json({ message: "Unauthorized!!" });
      } else {
        decodedToken = decoded;
      }
    });
    if (decodedToken != null && decodedToken.id === user.id) {
      if (password.trim() != confirmPassword.trim()) {
        res.status(400).json({ message: "New password must be the same !" });
      } else if (password.trim() == "") {
        res.status(400).json({ message: "Password cannot be empty ! " });
      } else {
        const newPassword = bcrypt.hashSync(req.body.password.trim(), 10);
        await user.update({ password: newPassword });
        res.status(201).json({
          message: "Password changed!",
        });
      }
    } else {
      res.status(403).json({ message: "You are not authorized !" });
    }
  }
};
