import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Blacklist from "../models/blacklist.model.js";

export const register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (!email.trim() || !password.trim() || !role.trim())
      return res.status(400).json({ error: "all fields required" });

    const exisitingUser = await User.findOne({ email });
    if (exisitingUser)
      return res.status(409).json({ error: "user with this email exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashedPassword, role });

    return res.status(200).json({ message: "user registered successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email.trim() || !password.trim())
      return res.status(400).json({ error: "all fields required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "user not found" });

    const userId = user._id;

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "internal server error" });
  }
};

export const logout = async (req, res) => {
  const authHeader = req.header("Authorization");

  try {
    const token = authHeader.split(" ")[1];
    const existingToken = await Blacklist.findOne({ token });

    if (existingToken)
      return res.status(409).json({ error: "token already blacklisted" });

    const userId = req.userId;

    await Blacklist.create({ user: userId, token });
    return res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "internal server error" });
  }
};
