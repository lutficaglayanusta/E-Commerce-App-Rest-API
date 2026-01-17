import createHttpError from "http-errors";
import { sql } from "../db/connectPostreSQL.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    throw createHttpError(401, "Please provide Authorization Header");
  }
  const bearer = authHeader.split(" ")[0];
  const token = authHeader.split(" ")[1];

  if (bearer !== "Bearer" || !token) {
    throw createHttpError(401, "Please provide Bearer or token");
  }
  const session =
    await sql`SELECT * FROM sessions WHERE accessToken = ${token} `;

  if (session.length === 0) {
    throw createHttpError(401, "Session not found");
  }
  const isExpired = new Date() > new Date(session[0].accessTokenValidUntil);

  if (isExpired) {
    throw createHttpError(401, "Access token  expired");
  }
  const user = await sql`SELECT * FROM users WHERE id=${session[0].user_id}`;

  if (user.length === 0) {
    throw createHttpError(401, "User not found");
  }
  req.user = user[0];

  next();
};
