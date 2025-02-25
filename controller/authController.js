import pool from "../helpers/database/connectDatabase.js";
import asyncErrorWrapper from "express-async-handler";
import bcrypt from "bcrypt"
import CustomError from "../helpers/error/CustomError.js";

export const userRegister = asyncErrorWrapper(async (req, res,next) => {
  const { name, email, password } = req.body;

  const checkResult = await pool.query("SELECT * FROM users WHERE email =$1", [
    email,
  ]);

  if (checkResult.rows.length > 0) {
    return next(new CustomError("User already exit", 400));
  } else {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        next(err);
      } else {
        let users = await pool.query(
          "INSERT INTO users (name,email,password) VALUES($1,$2,$3) RETURNING * ",
          [name, email, hash]
        );

        users = users.rows[0];

        res.status(200).json({
          success: "true",
          users,
        });
      }
    });
  }
});
