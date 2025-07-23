import user from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// export const getUserById = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const userDetails = await user.findById(userId);
//     res.status(200).send(userDetails);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

export const getUserDetails = async (req, res) => {
  try {
    const getToken = req.header("jwtToken");
    console.log(getToken);

    const userData = jwt.verify(getToken, process.env.JWT_SECRET_KEY);
    if (userData) {
      const userInfo = await user.findOne({ email: userData.email });
      res.status(200).send({
        status: true,
        userInfo,
      });
    } else {
      return res.status(401).send({
        status: false,
        message: "Please loggin again",
      });
    }

    // const userDetails = await user.findOne({ email: req.body.email });
    // res.status(200).send(userDetails);
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

export const loginUser = async (req, res) => {
  try {
    const userDetails = req.body;

    // here i am validating that email and password should pass in req.body
    if (!userDetails.email || !userDetails.password) {
      return res.status(400).send({
        status: false,
        message: "Email and Password is required",
      });
    }

    //finding the user details using email in users collection
    const userData = await user
      .findOne({ email: userDetails.email })
      .select("password email isAdmin");

    if (userData) {
      // if i get details then comparing password with the user password stored in collection with the password coming in req.body
      const validPassword = await bcrypt.compare(
        userDetails.password,
        userData.password
      );

      if (validPassword) {
        // creating jwt token or first time login user and setting it email,giving auth id and expires in 1 day
        const jwttoken = jwt.sign(
          {
            email: userData.email,
            id: userData._id,
            isAdmin: userData.isAdmin,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
        );

        // here setting the token in the header
        res.setHeader("jwtToken", jwttoken);
        // if compare return true the loggedin user successfully
        return res.status(200).send({
          status: true,
          message: "You are loggedIn",
        });
      } else {
        return res.status(401).send({
          status: false,
          message: "Email or Password is Incorrect",
        });
      }
    } else {
      return res.status(401).send({
        status: false,
        message: "Email or Password is Incorrect",
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
