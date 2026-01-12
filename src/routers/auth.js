import { Router } from "express";
import {
  loginController,
  logoutController,
  refreshController,
  registerController,
} from "../controllers/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { loginSchema, registerSchema } from "../validation/auth.js";

import { validateBody } from "../middlewares/validateBody.js";

const router = Router();

router.post(
  "/register",
  validateBody(registerSchema),
  ctrlWrapper(registerController)
);
router.post("/login", validateBody(loginSchema), ctrlWrapper(loginController));
router.get("/logout", ctrlWrapper(logoutController));
router.get("/refresh", ctrlWrapper(refreshController));

export default router;
