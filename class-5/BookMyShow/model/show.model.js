import mongoose, { model } from "mongoose";

const showSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movies",
    required: true,
  },
  theatre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "theatres",
    required: true,
  },
  totalSeats: {
    type: Number,
    required: true,
  },
  bookedSeats: {
    type: [string],
    default: [],
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
});

const Show = model("shows", showSchema);
export default Show;
