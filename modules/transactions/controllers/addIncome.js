const mongoose = require("mongoose");

const addIncome = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionsModel = mongoose.model("transactions");

  const { amount, remarks } = req.body;
  if (!amount) throw "Amount is required";
  if (!remarks) throw "Remarks is required";
  if (typeof amount !== "number") throw "Amount must be a Number";
  if (amount <= 0 ) throw "Amount must be a Greater than zero";
  await transactionsModel.create({
    user_ID: req.user._id,
    amount,
    remarks,
    transaction_type: "income",
  });

  await usersModel.updateOne(
    { _id: req.user._id },
    { $inc: { balance: amount } },
    {
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "Success",
    message: "Income added successfully",
  });
};

module.exports = addIncome;
