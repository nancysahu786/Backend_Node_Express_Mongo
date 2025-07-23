import mongoose, { model } from "mongoose";

// schema is used to define the structure of collection
const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [10, "Minimum 10 characters are required"],
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    genre: {
      type: [String],
      enum: ["Thriller", "Action", "Fantasy"],
      required: true,
    },
    language: {
      type: [String],
      enum: ["English", "Hindi"],
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// blog is a collection
// using model we get crud operations
const Movie = model("movies", movieSchema);

export default Movie;
