const mongoose = require("mongoose");

module.exports = mongoose.model("Income", new mongoose.Schema({
  userId: String,
  // user: mongoose.Schema.Types.ObjectId,
  amount: Number,
  source: String,
  date: { type: Date, default: Date.now }
}));