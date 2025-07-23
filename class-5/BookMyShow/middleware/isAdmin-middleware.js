import dotenv from "dotenv";

import jwt from "jsonwebtoken";
dotenv.config();
const isAdminMiddleware = async (req, res, next) => {
  try {
    console.log("auth-->", req.user);

    const userData = req.user.isAdmin;
    if (userData) {
      next();
    } else {
      throw new Error("You not have permission");
    }
  } catch (error) {
    res.status(403).send({
      success: false,
      message: error.message,
    });
  }
};

export default isAdminMiddleware;
