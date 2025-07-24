import Show from "../model/show.model.js";
import Theatre from "../model/theatre.model.js";

export const addShow = async (req, res) => {
  try {
    const showDetails = await Show.create(req.body);
    res.status(200).send({
      success: true,
      message: "Show Created Successfully",
      showDetails: showDetails,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
export const updateShow = async (req, res) => {
  try {
    const updateShowDetails = await Show.updateOne(
      { _id: req.params.showId },
      { $set: req.body }
    );
    res.status(200).send({
      success: true,
      message: "Show updated successfully",
      updateShowDetails: updateShowDetails,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const deleteShow = async (req, res) => {
  try {
    const deleteShow = await Show.findByIdAndDelete(req.params.showId);
    res.status(200).send({
      success: true,
      message: "Show Deleted Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const getShowById = async (req, res) => {
  try {
    const showDetails = await Show.find({ _id: req.params.showId }).populate([
      "movie",
      "theatre",
    ]);

    res.status(200).send({
      success: true,
      showDetails: showDetails,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const getAllShowsByFilter = async (req, res) => {
  try {
    const { movie, theatre, date } = req.query;
    let filter = {};
    if (movie) {
      filter.movie = movie;
    }
    if (theatre) {
      filter.theatre = theatre;
    }
    if (date) {
      filter.date = date;
    }
    const showFilterDetails = await Show.find(filter);
    res.status(200).send({
      success: true,
      filterDetails: showFilterDetails,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
