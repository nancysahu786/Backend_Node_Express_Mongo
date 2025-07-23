import dotenv from "dotenv";

import jwt from "jsonwebtoken";
dotenv.config();
const AuthMiddleware = async (req, res, next) => {
  try {
    const getToken = req.header("jwtToken");
    const userData = jwt.verify(getToken, process.env.JWT_SECRET_KEY);
    if (userData) {
      req.user = userData;
      next();
    } else {
      throw new Error("user token is invalid");
    }
  } catch (error) {
    res.status(401).send({
      success: false,
      message: error.message,
    });
  }
};

export default AuthMiddleware;
