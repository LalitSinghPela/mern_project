const mongoose = require("mongoose");

module.exports = mongoose.model("Expense", new mongoose.Schema({
  userId: String,
  // user: mongoose.Schema.Types.ObjectId,
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now }
}));