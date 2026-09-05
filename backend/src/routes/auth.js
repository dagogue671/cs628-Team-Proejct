import bcrypt from "bcryptjs";
import { Router } from "express";
import User from "../models/User.js";

const router = Router();

router.post("/signup", async (request, response, next) => {
  try {
    const { name, email, password } = request.body ?? {};

    if (!name || !email || !password) {
      return response.status(400).json({ message: "Name, email, and password are required." });
    }
    if (password.length < 8) {
      return response.status(400).json({ message: "Password must be at least 8 characters." });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return response.status(409).json({ message: "An account with that email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });

    return response.status(201).json({ user });
  } catch (error) {
    return next(error);
  }
});

router.post("/signin", async (request, response, next) => {
  try {
    const { email, password } = request.body ?? {};

    if (!email || !password) {
      return response.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    const isValid = user ? await user.comparePassword(password) : false;

    if (!isValid) {
      return response.status(401).json({ message: "Invalid email or password." });
    }

    return response.json({ user });
  } catch (error) {
    return next(error);
  }
});

export default router;
