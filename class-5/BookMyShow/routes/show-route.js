import express from "express";

import AuthMiddleware from "../middleware/auth-middleware.js";
import {
  addShow,
  deleteShow,
  getAllShowsByFilter,
  getShowById,
  updateShow,
} from "../controllers/show.controller.js";
import isTheatreOwnerMiddleware from "../middleware/isTheatreOwner-middleware.js";

const router = express.Router();

//Add show
router.post("/", AuthMiddleware, isTheatreOwnerMiddleware, addShow);

//update show
router.put("/:showId", AuthMiddleware, isTheatreOwnerMiddleware, updateShow);

//delete show
router.delete("/:showId", AuthMiddleware, isTheatreOwnerMiddleware, deleteShow);
//get shows by id
router.get("/:showId", getShowById);

//get all shows by movie

//get all show by theatre
router.get("/", getAllShowsByFilter);

export default router;
