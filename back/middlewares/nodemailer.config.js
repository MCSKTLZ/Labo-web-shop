const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
  host: "ssl0.ovh.net",
  port: 587,
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD,
  },
});

//Ethereal config
// host: 'smtp.ethereal.email',
// port: 587,
// auth: {
//     user: 'lew.lebsack39@ethereal.email',
//     pass: 'gw89p8rGVTRFykVWME'
// }

exports.getPasswordResetURL = (user, token) =>
  `http://localhost:4200/password/reset/${user.id}/${token}`;

exports.resetPasswordTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN;
  const to = user.email;
  const subject = "Web shop Password Reset";
  const html = `
  <p>Hey ${user.email},</p>
  <p>We heard that you lost your web shop password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>Do something outside today! </p>
  <p>Your support team</p>
  `;

  return { from, to, subject, html };
};
