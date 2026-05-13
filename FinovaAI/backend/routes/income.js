const router = require("express").Router();
const Income = require("../models/Income");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const inc = await Income.create({ ...req.body, userId: req.user.id });
  res.json(inc);
});

router.get("/", auth, async (req, res) => {
  const data = await Income.find({ userId: req.user.id });
  res.json(data);
});

// DELETE income
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Income.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!deleted) return res.status(404).send("Not found");

    res.json({
      message: "Deleted successfully",
      deletedAt: new Date()
    });

  } catch (err) {
    res.status(500).send("Error");
  }
});

module.exports = router;