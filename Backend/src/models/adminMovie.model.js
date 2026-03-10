import mongoose from "mongoose";

const adminMovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Movie title is required"],
      trim: true
    },

    posterUrl: {
      type: String,
      required: [true, "Poster image URL is required"]
    },

    description: {
      type: String,
      default: "Description not available"
    },

    movieId: {
      type: String,
      required: [true, "Movie ID is required"],
      unique: true
    },

    releaseDate: {
      type: Date
    },

    trailerUrl: {
      type: String,
      required: [true, "Trailer YouTube link is required"]
    },

    genre: {
      type: String,
      required: [true, "Genre is required"]
    },

    category: {
      type: String,
      enum: ["movie", "tv"],
      required: [true, "Category is required"]
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth"
    }
  },
  {
    timestamps: true
  }
);

const adminMovieModel = mongoose.model("Admin_Movies", adminMovieSchema);

export default adminMovieModel;