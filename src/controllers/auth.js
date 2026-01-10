import { ONE_DAY } from "../constants/index.js";
import { loginService, registerService } from "../services/auth.js";

export const registerController = async (req, res) => {
  const { user, session } = await registerService(req.body);

  console.log(session);

  res.cookie("sessionId", session[0].id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie("refreshToken", session[0].refreshtoken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.status(201).json({
    message: "Successfully register",
    user,
    token: session[0].accesstoken,
  });
};
export const loginController = async (req, res) => {
  const { user, session } = await loginService(req.body);

  res.cookie("sessionId", session[0].id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie("refreshToken", session[0].refreshtoken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.status(201).json({
    message: "Successfully logged in",
    user,
    token: session[0].accesstoken,
  });
};
