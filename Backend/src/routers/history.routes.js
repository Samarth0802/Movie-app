import express from 'express'
import { getHistory, addHistory } from '../controllers/history.controller.js'
import { authMiddleware } from "../middleware/auth.middleware.js";

const historyRouter = express.Router()

historyRouter.post("/",authMiddleware,addHistory)
historyRouter.get("/",authMiddleware,getHistory)

export default historyRouter