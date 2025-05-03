import pool from "../helpers/database/connectDatabase.js";
import asyncErrorWrapper from "express-async-handler";
import bcrypt from "bcrypt"
import CustomError from "../helpers/error/CustomError.js";
import { sendJwtClient } from "../helpers/authorization/tokenHelpers.js";

export const userRegister = asyncErrorWrapper(async (req, res,next) => {
  const { name, email, password } = req.body;

  const checkResult = await pool.query("SELECT * FROM users WHERE email =$1", [
    email,
  ]);

  if (checkResult.rows.length > 0) {
    return next(new CustomError("User already exists", 400));
  } else {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        next(err);
      } else {
        let users = await pool.query(
          "INSERT INTO users (name,email,password) VALUES($1,$2,$3) RETURNING * ",
          [name, email, hash]
        );

        sendJwtClient(users.rows[0], res);
      }
    });
  }
});
export const logIn = asyncErrorWrapper(async (req, res, next) => { 
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CustomError("Please check your inputs", 400));
  }
  const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

  if (user.rows.length === 0) {
    return next(new CustomError("There is no exits user", 400));
  }
  const passwordControl = bcrypt.compareSync(password, user.rows[0].password);
  
  if (!passwordControl) {
    return next(new CustomError("Your password is not correct", 400));
  }
  sendJwtClient(user.rows[0], res);
})

export const logOut = asyncErrorWrapper(async (req, res, next) => { 
  return res.status(200).cookie("access_token"," ", {
    expires: new Date(Date.now()),
    httpOnly: true,
  }).json({
    success: true,
    message: "Logout Successfull",
  });
})


export const getUser = asyncErrorWrapper(async (req, res, next) => { 
  const {id} = req.user

  const user = await pool.query("SELECT * FROM users WHERE user_id = $1",[id])

  res.json({
    success: true,
    data: {
     user: user.rows[0]
    },
  });
})