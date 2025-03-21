const wrongMethod = ((req, res) => {
  res.status(405).json({ status: "Failed", message: "Method Not Allowed" });
});

module.exports = wrongMethod