import { Router } from "express";
import { loginController, registerController } from "../controllers/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.post("/register", ctrlWrapper(registerController));
router.post("/login", ctrlWrapper(loginController));

export default router;
