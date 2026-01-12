import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { randomBytes } from "crypto";
import { sql } from "../db/connectPostreSQL.js";
import { FIFTEEN_MINUTES, ONE_DAY } from "../constants/index.js";

export const registerService = async (payload) => {
  const isUser = await sql`SELECT * FROM users WHERE email = ${payload.email}`;

  if (isUser.length > 0) {
    throw createHttpError(401, "This email is already in exits");
  }
  const hashPassword = await bcrypt.hash(payload.password, 10);

  const user =
    await sql`INSERT INTO users(name,email,password) VALUES(${payload.name},${payload.email},${hashPassword}) RETURNING *`;

  const accessToken = randomBytes(30).toString("base64");
  const refreshToken = randomBytes(30).toString("base64");

  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + ONE_DAY);

  const session =
    await sql`INSERT INTO sessions(user_id,accessToken,refreshToken,accessTokenValidUntil,refreshTokenValidUntil) 
    VALUES(${user[0].id},${accessToken},${refreshToken},${accessTokenValidUntil},${refreshTokenValidUntil}) RETURNING *`;

  return { user, session };
};
export const loginService = async (payload) => {
  const user = await sql`SELECT * FROM users WHERE email = ${payload.email}`;

  if (user.length === 0) {
    throw createHttpError(401, "No one uses this email address.");
  }
  const compare = await bcrypt.compare(payload.password, user[0].password);

  if (!compare) {
    throw createHttpError(401, "Password is incorrect");
  }

  await sql`DELETE FROM sessions WHERE user_id = ${user[0].id} `;

  const accessToken = randomBytes(30).toString("base64");
  const refreshToken = randomBytes(30).toString("base64");

  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + ONE_DAY);

  const session =
    await sql`INSERT INTO sessions(user_id,accessToken,refreshToken,accessTokenValidUntil,refreshTokenValidUntil) 
    VALUES(${user[0].id},${accessToken},${refreshToken},${accessTokenValidUntil},${refreshTokenValidUntil}) RETURNING *`;

  return { user, session };
};
export const logoutService = async (id) => {
  await sql`DELETE FROM sessions WHERE id = ${id}`;
};

export const refreshService = async ({ sessionId, refreshToken }) => {
  const session =
    await sql`SELECT * FROM sessions WHERE id=${sessionId} AND refreshtoken = ${refreshToken}`;

  console.log(session);

  if (session.length === 0) {
    throw createHttpError(401, "Session Not Found");
  }
  const isExpired = new Date() > new Date(session[0].refreshtokenvaliduntil);

  if (isExpired) {
    throw createHttpError(401, "Refresh token is expired");
  }
  await sql`DELETE FROM sessions WHERE id=${session[0].id} AND refreshtoken=${session[0].refreshtoken}`;

  const accessToken = randomBytes(30).toString("base64");
  const newRefreshToken = randomBytes(30).toString("base64");

  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + ONE_DAY);

  const user = await sql`SELECT * FROM users WHERE id=${session[0].user_id}`;

  const newSession =
    await sql`INSERT INTO sessions(user_id,accessToken,refreshToken,accessTokenValidUntil,refreshTokenValidUntil) 
    VALUES(${user[0].id},${accessToken},${newRefreshToken},${accessTokenValidUntil},${refreshTokenValidUntil}) RETURNING *`;

  return { user, newSession };
};
