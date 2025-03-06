import { jwtGenerator } from "../../utils/jwtGenerator.js";
import dotenv from "dotenv";

dotenv.config();


export const sendJwtClient = (user, res) => {
  const token = jwtGenerator(user.user_id, user.name);

  return res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE) * 1000 * 60),
      secure: false,
    })
    .json({
      success: true,
      access_token: token,
      data: {
        id: user.user_id,
        name: user.name,
        email: user.email,
      },
    });
};
export const isTokenIncluded = (req) => {
  return req.headers.authorization && req.headers.authorization.startsWith("Bearer:");
}
export const getAccessTokenFromHeader = (req) => {
  const authorization = req.headers.authorization;
  const access_token = authorization.split(" ")[1];
  return access_token;
}
