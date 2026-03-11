import authModel from "../models/auth.model.js";
import adminMovieModel from "../models/adminMovie.model.js";
import uploadImage from "../services/image.service.js";

async function getAllUsers(req, res, next) {
  try {
    const users = await authModel
      .find({ role: "user" })   // only normal users
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
}


async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;

    const user = await authModel.findOneAndDelete({
      _id: id,
      role: "user",
    });

    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
}

async function banUser(req, res, next) {
  try {
    const { id } = req.params;

    const user = await authModel.findOneAndUpdate(
      { _id: id, role: "user" },
      { $set: { banned: true } },
      { returnDocument: "after" } // update and return the document
    ).select("-password");

    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "User banned successfully",
      user,
    });
  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
}




async function addMovie(req, res, next) {
  try {
    const {
      title,
      description,
      movieId,
      releaseDate,
      trailerUrl,
      genre,
      category
    } = req.body;

    const imageBuffer = req.file.buffer

    const file = await uploadImage(imageBuffer)

    const movie = await adminMovieModel.create({
      title,
      posterUrl:file.url,
      description,
      movieId,
      releaseDate,
      trailerUrl,
      genre,
      category,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      movie
    });

  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
}

async function editMovie(req, res, next) {
  try {
    const { id } = req.params;

    const updateData = { ...req.body };
    //console.log(req.file,updateData)
    const imageBuffer = req.file.buffer
    // agar new poster upload hua
    if (imageBuffer) {
      const file = await uploadImage(imageBuffer);
      updateData.posterUrl = file.url;
    }

    const movie = await adminMovieModel.findByIdAndUpdate(
      id,
      updateData,
      { returnDocument: "after" }
    );

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found"
      });
    }

    res.status(200).json({
      success: true,
      movie
    });

  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
}

async function deleteMovie(req, res, next) {
  try {
    const { id } = req.params;

    const movie = await adminMovieModel.findByIdAndDelete(id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully"
    });

  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
}


export { getAllUsers, deleteUser, banUser, addMovie, editMovie, deleteMovie};