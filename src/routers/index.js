import { Router } from "express";
import authRoute from "./auth.js";
import productRoute from "./product.js";
import cartRoute from "./cart.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/product", productRoute);
router.use("/cart", cartRoute);

export default router;
