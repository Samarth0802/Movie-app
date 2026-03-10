import express from 'express'

const favoriteRouter = express.Router()
import {authMiddleware} from '../middleware/auth.middleware.js'
import {addFavorite,getFavorites,removeFavorite} from '../controllers/favorites.controller.js'


favoriteRouter.post(
  "/:movieId",
  authMiddleware,
  addFavorite
)

favoriteRouter.get(
  "/",
  authMiddleware,
  getFavorites
)

favoriteRouter.delete(
  "/:movieId",
  authMiddleware,
  removeFavorite
)

export default favoriteRouter