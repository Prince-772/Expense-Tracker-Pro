const nodemailer = require("nodemailer");

const emailSender = async (to, subject, text) => {
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  try {
    await transport.sendMail({
      from: `"Expense Tracker PRO" <${process.env.EMAIL_ID}>`,
      to,
      subject,
      text,
      html: `<h2>${text}</h2>`,
    });
  } catch (err) {
    throw (err.message || err || "Something went wrong")
  }
};

module.exports = emailSender;
