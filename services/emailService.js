const { createTransport } = require("nodemailer");

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: "shoppingonline2109@gmail.com",
    pass: "vkkiglyxnlnstson",
  },
});

module.exports = transporter;
