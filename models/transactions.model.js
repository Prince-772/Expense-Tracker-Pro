const mongoose = require("mongoose");
const transactionsSchema = new mongoose.Schema(
  {
    user_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"users",
      required: [true, "userID is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"]
    },
    transaction_type: {
      type: String,
      required: [true, "transaction type is required"],
      enum:["income","expense"]
    },
    remarks: {
      type: String,
      required: [true, "remarks is required"],
    },
  },
  {
    timestamps: true,
  }
);
const transactionsModel = mongoose.model("transactions", transactionsSchema);

module.exports = transactionsModel;
