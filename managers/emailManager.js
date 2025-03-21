const nodemailer = require("nodemailer");

const emailSender = (to, subject, text) => {
  let transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "562c1ed4e43f43",
      pass: "3090c63e86118e",
    },
  });

  transport.sendMail({
    from: "trial@expensemanager.com",
    to,
    subject,
    text,
    html: `<h2>${text}</h2>`,
  });
};

module.exports = emailSender;
