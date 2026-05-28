const mongoose = require("mongoose");
const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
 module.exports = mongoose.model("Todo", TodoSchema);
