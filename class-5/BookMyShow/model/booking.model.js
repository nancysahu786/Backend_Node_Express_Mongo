import mongoose, { model } from "mongoose";

const bookingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  seats: {
    type: [String],
    required: true,
  },
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shows",
    required: true,
  },
});

const Booking = model("bookings", bookingSchema);
export default Booking;
