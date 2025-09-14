import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../model/userModel.js";
//...................................................................................................

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "no token provide" });
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).json({ message: "user not found" });
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

//...................................................................................................

export const verifyAdmin = async (req, res, next) => {
  console.log("verifyAdmin");

  if (req.user.role !== "admin")
    return res.status(400).json({ message: "Access denied" });

  next();
};
