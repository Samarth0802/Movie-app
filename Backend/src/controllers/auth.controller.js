import authModel from "../models/auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


import dotenv from 'dotenv'
import redis from "../config/cache.js";
dotenv.config()

async function registerUser(req, res, next) {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      const error = new Error("All fields are required");
      error.status = 400;
      throw error;
    }

    const existingUser = await authModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      const error = new Error("Username or Email already exists");
      error.status = 409;
      throw error;
    }

    const hash = await bcrypt.hash(password, 10);

    const userRole = role === "admin" ? "admin" : "user";

    const newUser = await authModel.create({
      username,
      email,
      password: hash,
      role: userRole,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
}

async function loginUser(req, res, next) {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      const err = new Error("Username/Email and password are required");
      err.status = 400;
      throw err;
    }

    const user = await authModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select("+password");

    if (!user) {
      const err = new Error("Invalid credentials");
      err.status = 401;
      throw err;
    }

    if(user.banned){
      const err = new Error("User is banned");
      err.status = 403;
      throw err;
    }
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const err = new Error("Invalid credentials");
      err.status = 401;
      throw err;
    }

    const token = jwt.sign(
      {
        id: user._id,
        user: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        user: user.username,
        email: user.email,
        role:user.role
      },
    });
  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
}

async function logoutUser(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(200).json({
        message: "Already logged out",
      });
    }

    await redis.set(token, Date.now().toString());

    res.clearCookie("token");

    res.status(200).json({
      message: "Logged Out Successfully",
    });
  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const id = req.user.id;

    const user = await authModel.findById(id);

    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
}

export { registerUser, loginUser, logoutUser,getUser };