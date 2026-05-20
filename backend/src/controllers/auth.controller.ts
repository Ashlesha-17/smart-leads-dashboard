import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "sales", 
    });

    const safeUser = await User.findById(user._id).select("-password");

    return res.status(201).json({
      message: "User registered successfully",
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// LOGIN
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id.toString());

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role, 
    };

    return res.status(200).json({
      message: "Login successful",
      token,
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};