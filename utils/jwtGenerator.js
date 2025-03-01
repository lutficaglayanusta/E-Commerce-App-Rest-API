import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const jwtGenerator = (user_id,name) => {
    const payload = {
        id: user_id,
        name
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return token;
}