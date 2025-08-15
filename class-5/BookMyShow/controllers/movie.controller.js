import Movie from "../model/movie.model.js";

export const addMovie = async (req, res, next) => {
  try {
    const movieData = req.body;
    if (!movieData.title) {
      return next(new Error("Movie data is required"));
    }
    const movieDetails = await Movie.create(movieData);
    res.status(200).send({
      success: true,
      message: "Movie created successfully",
      data: movieDetails,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movieDetails = await Movie.findById(req.params.movieId);
    res.status(200).send(movieDetails);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// get all Movies
export const getAllMovies = async (req, res) => {
  try {
    const filter = {};
    const movieDetails = await Movie.find(filter);
    res.status(200).send(movieDetails);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const updateMovieDetails = await Movie.updateOne(
      { _id: req.params.movieId },
      { $set: req.body }
    );
    res.status(200).send({
      success: true,
      message: "Movie updated successfully",
      data: updateMovieDetails,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const deleteData = await Movie.findByIdAndDelete(req.params.movieId);
    res.status(200).send({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
