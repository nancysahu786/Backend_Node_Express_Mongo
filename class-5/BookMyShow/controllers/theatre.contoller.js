import Theatre from "../model/theatre.model.js";

export const addTheatre = async (req, res) => {
  try {
    const theatreData = req.body;
    theatreData.owner = req.user.id;
    const theatreDetails = await Theatre.create(theatreData);
    res.status(200).send({
      success: true,
      message: "Theatre created successfully",
      data: theatreDetails,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const getTheatreById = async (req, res) => {
  try {
    const theatreDetails = await Theatre.findById(req.params.theatreId);
    res.status(200).send(theatreDetails);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// get all theatres and all theatres by owner
export const getAllTheatre = async (req, res) => {
  try {
    const ownerId = req.query.ownerId;
    const filter = {};
    if (ownerId) {
      filter.owner = ownerId;
    }
    const theatreDetails = await Theatre.find(filter);
    res.status(200).send(theatreDetails);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const updateTheatre = async (req, res) => {
  try {
    const updateTheatreDetails = await Theatre.updateOne(
      { _id: req.params.theatreId },
      { $set: req.body }
    );
    res.status(200).send({
      success: true,
      message: "Theatre updated successfully",
      data: updateTheatreDetails,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTheatre = async (req, res) => {
  try {
    const deleteData = await Theatre.findByIdAndDelete(req.params.theatreId);
    res.status(200).send({
      success: true,
      message: "Theatre deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
