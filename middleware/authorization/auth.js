import CustomError from "../../helpers/error/CustomError.js";
import asyncErrorWrapper from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  isTokenIncluded,
  getAccessTokenFromHeader,
} from "../../helpers/authorization/tokenHelpers.js";
import pool from "../../helpers/database/connectDatabase.js";

dotenv.config();

export const getAccessToRoute = (req, res, next) => {
  if (!isTokenIncluded(req)) {
    return next(
      new CustomError("You are not authorized to access this route", 401)
    );
  }
  const access_token = getAccessTokenFromHeader(req);

  jwt.verify(access_token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(
        new CustomError("You are not authorized to access this route", 401)
      );
    }
    req.user = {
      id: decoded.id,
      name: decoded.name,
    };
    next();
  });
};

export const getAdminAccess = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.user;

  const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);

  if (user.rows[0].role !== "admin") {
    return next(new CustomError("Only admin can access this router", 403));
  }
  next();
});
