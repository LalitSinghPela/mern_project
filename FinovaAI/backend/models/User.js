// const mongoose = require("mongoose");

// module.exports = mongoose.model("User", new mongoose.Schema({
//  name: {
//   type: String,
//   default: "",
// },
//   // email: String,
//   email: { type: String, unique: true },
//   password: String
// }));
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // ✅ IMPORTANT
  }
);

module.exports = mongoose.model("User", userSchema);