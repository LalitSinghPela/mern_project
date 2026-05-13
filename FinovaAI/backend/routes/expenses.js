const router = require("express").Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const exp = await Expense.create({ ...req.body, userId: req.user.id });
  res.json(exp);
});

router.get("/", auth, async (req, res) => {
  const data = await Expense.find({ userId: req.user.id });
  res.json(data);
});

router.delete("/:id", auth, async (req, res) => {
  await Expense.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id
  });

  res.json({ message: "Deleted" });
});

module.exports = router;