import express from 'express' 
import { authMiddleware } from '../middleware/auth.middleware.js';

import {getAllMovies,getMovie, getTrendingMovie,getPopularMovies, 
    getMovieDetails,getMovieVideo,getUpcomingMovie,getTvShows,getPerson,
    searchTvShows} from '../controllers/tmdb.controller.js'

const movieRouter = express.Router()


movieRouter.get('/getAll',authMiddleware,getAllMovies);
movieRouter.get('/getmovie',authMiddleware,getMovie);
movieRouter.get('/trending',authMiddleware,getTrendingMovie);
movieRouter.get('/popular',authMiddleware,getPopularMovies)
movieRouter.get('/upcoming',authMiddleware,getUpcomingMovie)
movieRouter.get('/tvShows',authMiddleware,getTvShows)
movieRouter.get('/popular/person',authMiddleware,getPerson)
movieRouter.get('/:id',authMiddleware,getMovieDetails)
movieRouter.get('/:id/video',authMiddleware,getMovieVideo)
movieRouter.get('/search/tvShows',authMiddleware,searchTvShows)



export default movieRouter