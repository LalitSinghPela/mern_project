const router = require("express").Router();
const Expense = require("../models/Expense");
const Income = require("../models/Income");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.id });
  const income = await Income.find({ userId: req.user.id });

  const totalExp = expenses.reduce((a, b) => a + b.amount, 0);
  const totalInc = income.reduce((a, b) => a + b.amount, 0);

  res.json({
    balance: totalInc - totalExp,
    savings: totalInc ? ((totalInc - totalExp) / totalInc) * 100 : 0,
    insight: "Try reducing food expenses"
  });
});

module.exports = router;