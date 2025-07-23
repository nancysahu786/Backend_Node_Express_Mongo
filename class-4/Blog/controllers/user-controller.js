import user from "../model/user.model.js";

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userDetails = await user.findById(userId);
    res.status(200).send(userDetails);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const userCreated = await user.create(userData);
    res.status(200).send(userCreated);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userDataToUpdate = req.body;
    const updateData = await user.updateOne(
      {
        _id: userId,
      },
      { $set: userDataToUpdate }
    );
    res.status(200).send(updateData);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await user.findByIdAndDelete(userId);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};
