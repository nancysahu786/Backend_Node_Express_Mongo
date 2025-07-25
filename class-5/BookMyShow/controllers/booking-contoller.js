import Booking from "../model/booking.model.js";

export const MakePayment = async (req, res) => {
  try {
    //Make payment using stripe
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const createBooking = async (req, res) => {
  try {
    // UserId -> req.user(jwt token)
    //Transaction Id-> req.transactionId (get transaction details from makePayment api)
    //Seats -> req.seats( verify if seats are available, if available update seats in show model)
    //showId -> req.showId

    const bookingDetails = req.body;
    bookingDetails.user = req.user.id;
    const bookDetails = await Booking.create(bookingDetails);

    // TODO: verify if seats are available, if available update seats in show model
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const getBookingDetails = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const bookingDetails = await Booking.findById(bookingId)
      .populate("user")
      .populate({
        path: "showId",
        model: "shows",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "showId",
        model: "shows",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });
    res.status(200).send({
      success: true,
      bookingDetails: bookingDetails,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
