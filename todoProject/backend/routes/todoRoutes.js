const express = require("express");
const Todo = require("../models/Todo");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.json(todos);
});

router.post("/", auth, async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
      user: req.user.id,   
    });

    await todo.save();

    res.json(todo);

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {

    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json("Todo not found");

    if (todo.user.toString() !== req.user.id)
      return res.status(401).json("Not authorized");

    todo.completed = !todo.completed;

    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {

    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json("Todo not found");

    if (todo.user.toString() !== req.user.id)
      return res.status(401).json("Not authorized");

    await todo.deleteOne();

    res.json("Todo deleted");

  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
