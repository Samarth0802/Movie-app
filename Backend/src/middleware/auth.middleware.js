import jwt from "jsonwebtoken";
import redis from "../config/cache.js";
import authModel from "../models/auth.model.js";

async function authMiddleware(req, res, next) {
  try {
    const token = req?.cookies?.token;

    if (!token) {
      const err = new Error("User not logged in");
      err.status = 401;
      throw err;
    }

    const isBlacklisted = await redis.get(token);

    if (isBlacklisted) {
      const err = new Error("Token expired. Please login again");
      err.status = 401;
      throw err;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await authModel.findById(decoded.id);

    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    if (user.banned) {
      const err = new Error("User is banned");
      err.status = 403;
      throw err;
    }

    req.user = {
      id: user._id,
      username: user.username,
      role: user.role
    };

    next();
  } catch (err) {
    err.status = err.status || 401;
    next(err);
  }
}

export { authMiddleware };