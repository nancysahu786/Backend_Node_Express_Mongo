import express from "express";
import {
  createUser,
  deleteUser,
  getUserDetails,
  loginUser,
  updateUser,
} from "../controllers/user-controller.js";

const router = express.Router();

router.post("/login", loginUser);

// router.get("/:userId", getUserById);
router.get("/", getUserDetails);

router.post("/", createUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
