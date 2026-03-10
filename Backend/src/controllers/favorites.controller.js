import favoriteModel from "../models/favorites.model.js";

async function addFavorite(req,res,next){
    try {
        const {movieId,title,posterUrl} = req.body;

        const favorite = await favoriteModel.create({
            userId:req.user.id,
            movieId,
            title,
            posterUrl
        })

        res.status(201).json({
            success:true,
            favorite
        })

    } catch (err) {
        err.status = err.status || 500;
        next(err)
    }
}

async function getFavorites(req, res, next) {
  try {
    const favorites = await favoriteModel
      .find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: favorites.length,
      favorites
    });

  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
}

async function removeFavorite(req, res, next) {
  try {
    const { movieId } = req.params;

    const favorite = await favoriteModel.findOneAndDelete({
      userId: req.user.id,
      movieId: movieId
    });

    if (!favorite) {
      return res.status(404).json({
        message: "Favorite movie not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie removed from favorites"
    });

  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
}

export {addFavorite,getFavorites,removeFavorite}