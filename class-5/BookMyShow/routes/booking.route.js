import express from "express";

import AuthMiddleware from "../middleware/auth-middleware.js";
import {
  createBooking,
  getBookingDetails,
  MakePayment,
} from "../controllers/booking-contoller.js";

const router = express.Router();
//Make payment
router.post("/payment", AuthMiddleware, MakePayment);

//creating bookings
router.post("/", AuthMiddleware, createBooking);

//get booking details
router.get("/:bookingId", AuthMiddleware, getBookingDetails);

export default router;
