import express from "express";

import AuthMiddleware from "../middleware/auth-middleware.js";
import {
  addMovie,
  deleteMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
} from "../controllers/movie.controller.js";
import isAdminMiddleware from "../middleware/isAdmin-middleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // or your custom storage

// add movie
router.post(
  "/",
  upload.single("poster"),

  AuthMiddleware,
  isAdminMiddleware,
  addMovie
);

// get Movie by id

router.get("/:movieId", getMovieById);

//get all Movie
router.get("/", getAllMovies);

//update Movie
router.put("/:movieId", AuthMiddleware, isAdminMiddleware, updateMovie);

//delete Movie
router.delete("/:movieId", AuthMiddleware, isAdminMiddleware, deleteMovie);

export default router;
