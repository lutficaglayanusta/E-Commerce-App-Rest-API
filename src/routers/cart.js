import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  addCartController,
  deleteCartController,
  fetchCartController,
} from "../controllers/cart.js";
import { addCartSchema } from "../validation/cart.js";

const router = Router();

router.use(authenticate);

router.post("/", validateBody(addCartSchema), ctrlWrapper(addCartController));
router.get("/", ctrlWrapper(fetchCartController));
router.delete("/:cartId", ctrlWrapper(deleteCartController));

export default router;
