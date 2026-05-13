const mongoose = require("mongoose");

module.exports = mongoose.model("Income", new mongoose.Schema({
  userId: String,
  
  amount: Number,
  source: String,
  date: { type: Date, default: Date.now }
}));