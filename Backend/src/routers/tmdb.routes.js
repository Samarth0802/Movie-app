import express from 'express' 
import { authMiddleware } from '../middleware/auth.middleware.js';

import {getAllMovies,getMovie} from '../controllers/tmdb.controller.js'

const movieRouter = express.Router()


movieRouter.get('/getAll',authMiddleware,getAllMovies);
movieRouter.get('/getmovie',authMiddleware,getMovie);

export default movieRouter