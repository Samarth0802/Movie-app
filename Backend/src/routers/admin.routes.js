import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import { getAllUsers,deleteUser,banUser, addMovie, editMovie, deleteMovie } from "../controllers/admin.controller.js";
import upload from '../middleware/upload.middleware.js'
import uploadImage from "../services/image.service.js";
const adminRouter = express.Router();

adminRouter.get("/users",authMiddleware,adminMiddleware,getAllUsers);
adminRouter.delete("/deleteUser/:id",authMiddleware,adminMiddleware,deleteUser);
adminRouter.post("/banUser/:id",authMiddleware,adminMiddleware,banUser);
adminRouter.post("/movie", authMiddleware, adminMiddleware,upload.single("posterImage"),addMovie);
adminRouter.put("/movie/:id", authMiddleware, adminMiddleware,upload.single("posterImage"),editMovie);
adminRouter.delete("/movie/:id", authMiddleware, adminMiddleware, deleteMovie);

export default adminRouter;