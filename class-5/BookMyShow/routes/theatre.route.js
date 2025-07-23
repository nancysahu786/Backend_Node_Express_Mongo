import express from "express";
import {
  addTheatre,
  deleteTheatre,
  getAllTheatre,
  getTheatreById,
  updateTheatre,
} from "../controllers/theatre.contoller.js";
import AuthMiddleware from "../middleware/auth-middleware.js";

const router = express.Router();

// add theatre
//here adding auth middleware to get the token and validate user and set user id then add user
router.post("/", AuthMiddleware, addTheatre);

// get theatre by id

router.get("/:theatreId", getTheatreById);

//get all theatres
router.get("/", getAllTheatre);

//update theatre
router.put("/:theatreId", updateTheatre);

//delete theatre
router.delete("/:theatreId", deleteTheatre);

export default router;
