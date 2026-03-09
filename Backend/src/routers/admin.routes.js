import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import { getAllUsers,deleteUser,banUser } from "../controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

adminRouter.delete(
  "/deleteUser/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);

adminRouter.post(
  "/banUser/:id",
  authMiddleware,
  adminMiddleware,
  banUser
);

export default adminRouter;