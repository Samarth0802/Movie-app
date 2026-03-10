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

    const response = await tmdb.get("/search/movie", {
      params: {
        query,
        page
      }
    });

    res.status(200).json({
      success: true,
      page: response.data.page,
      results: response.data.results
    });

  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
}

export {getAllMovies,getMovie}