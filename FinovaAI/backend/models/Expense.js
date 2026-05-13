const mongoose = require("mongoose");

module.exports = mongoose.model("Expense", new mongoose.Schema({
  userId: String,
  
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now }
}));