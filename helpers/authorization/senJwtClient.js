import { data } from "react-router-dom";
import { jwtGenerator } from "../../utils/jwtGenerator.js";
import dotenv from "dotenv";

dotenv.config();


export const sendJwtClient = (user, res) => {
  const token = jwtGenerator(user.id, user.name);

  return res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE) * 1000),
      secure: false,
    })
    .json({
      success: true,
      access_token: token,
      data: {
        name: user.name,
        email: user.email,
      },
    });
};
