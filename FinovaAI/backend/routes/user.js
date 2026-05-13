

// module.exports = router;
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.put("/update-profile", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // ✅ find user using email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ✅ update name if provided
    if (name) {
      user.name = name;
    }

    // ✅ update password
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Update failed",
    });
  }
});

// ✅ Get User Info
router.get("/profile/:email", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
});

module.exports = router;