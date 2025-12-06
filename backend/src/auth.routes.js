import express from "express";
import User from "./user.model.js";
import jwt from "jsonwebtoken";
import { protect } from "./auth.middleware.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const router = express.Router();

// helper to generate cookie options based on environment
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);

    // send secure cookie based on env
    res.cookie("token", token, cookieOptions);

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await user.matchPassword(password);
    if (!match) return res.status(400).json({ message: "Incorrect password" });

    const token = generateToken(user._id);

    res.cookie("token", token, cookieOptions);

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  // must use same secure + sameSite settings to clear cookie correctly
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.json({ success: true, message: "Logged out" });
});

router.get("/me", protect, async (req, res) => {
  res.json({ user: req.user });
});

export default router;
