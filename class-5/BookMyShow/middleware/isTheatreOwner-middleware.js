import Theatre from "../model/theatre.model.js";

const isTheatreOwnerMiddleware = async (req, res, next) => {
  try {
    const theatreDetails = await Theatre.findById(req.body.theatre);

    if (theatreDetails.owner.toString() !== req.user.id) {
      throw new Error(
        `You are not the owner of ${theatreDetails.name} theatre`
      );
    }
    next();
  } catch (error) {
    res.status(403).send({
      success: false,
      message: error.message,
    });
  }
};

export default isTheatreOwnerMiddleware;
