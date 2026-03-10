import tmdb from "../services/tmdb.service.js";

async function getAllMovies(req, res, next) {
  try {
    const { page = 1 } = req.query;

    const response = await tmdb.get("/discover/movie", {
      params: {
        page
      }
    });

    res.status(200).json({
      success: true,
      page: response.data.page,
      total_pages: response.data.total_pages,
      results: response.data.results
    });

  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
}

async function getMovie(req, res, next) {
  try {
    const { page = 1, query } = req.query;


    if(!query){
    return res.status(400).json({
      message:"query parameter required"
    })

    }
    const response = await tmdb.get("/search/movie", {
      params: {
        query,
        page
      }
    });

    res.status(200).json({
      success: true,
      page: response.data.page,
      results: response.data.results,
      total_pages: response.data.total_pages,
    });

  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
}

async function getTrendingMovie(req,res,next) {
  try {
    const {page=1} = req.query
    const response = await tmdb.get('/trending/movie/day',{
      params:{
        page
      }
    });

    res.status(200).json({
      success: true,
      page: response.data.page,
      results: response.data.results,
      total_pages: response.data.total_pages,
    })

  } catch (err) {
    err.status = err.status || 500;
    next(err)
  }
}

async function  getPopularMovies(req,res,next){
  try {
    const { page = 1 } = req.query;
    const response = await tmdb.get('/movie/popular',{
      params:{
        page
      }
    })    

    res.status(200).json({
      success: true,
      page: response.data.page,
      results: response.data.results,
      total_pages: response.data.total_pages,
    })
  } catch (err) {
    err.status = err.status || 500;
    next(err)
  }
}

async function getMovieDetails(req,res,next){
  try{

    const {id} = req.params;

    const response = await tmdb.get(`/movie/${id}`);
    
    res.status(200).json({
      success: true,
      data:response.data,
    })

  }catch(err){
    err.status = err.status || 500
    next(err)
  }
}

async function getMovieVideo(req,res,next){
  try {
    const { id } = req.params;

    const response = await tmdb.get(`/movie/${id}/videos`);

    res.status(200).json({
      success:true,
      data:response.data
    })

  } catch (err) {
    err.status = err.status || 500;
    next(err)
  }
}

async function getUpcomingMovie(req,res,next){
  try {
    const response = await tmdb.get('/movie/upcoming')
    res.status(200).json({
      success: true,
      page: response.data.page,
      results: response.data.results,
      total_pages: response.data.total_pages,
    })
  } catch (err) {
    err.status = err.status || 500;
    next(err)
  }
}

async function getTvShows(req,res,next) {
  try {
    const { page = 1 } = req.query;
    const response = await tmdb.get('/discover/tv',{
      params:{page}
    });

    res.status(200).json({
      success: true,
      page: response.data.page,
      results: response.data.results,
      total_pages: response.data.total_pages,
    });

  } catch (err) {
    err.status = err.status || 500
    next(err)
  }
}

async function getPerson(req, res, next) {
  try {
    const { query, page = 1 } = req.query;

    const response = await tmdb.get("/search/person", {
      params: {
        query,
        page
      }
    });

    res.status(200).json({
      success: true,
      page: response.data.page,
      results: response.data.results,
      total_pages: response.data.total_pages,
    });

  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
}


async function searchTvShows(req, res, next) {
  try {
    const { query, page = 1 } = req.query;
    
    const response = await tmdb.get("/search/tv", {
      params: {
        query,
        page
      }
    });

    res.status(200).json({
      success: true,
      page: response.data.page,
      results: response.data.results,
      total_pages: response.data.total_pages
    });

  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
}



export {getAllMovies,getMovie,getTrendingMovie,getPopularMovies,getMovieDetails,getMovieVideo,getUpcomingMovie,getTvShows,getPerson,searchTvShows }