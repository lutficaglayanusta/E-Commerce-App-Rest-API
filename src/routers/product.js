import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  addProductController,
  deleteProductController,
  fetchProductController,
  updateProductController,
} from "../controllers/product.js";
import {
  addProductSchema,
  updateProductSchema,
} from "../validation/product.js";

const router = Router();

router.post(
  "/",
  validateBody(addProductSchema),
  ctrlWrapper(addProductController)
);
router.get("/", ctrlWrapper(fetchProductController));
router.delete("/:productId", ctrlWrapper(deleteProductController));
router.patch(
  "/:productId",
  validateBody(updateProductSchema),
  ctrlWrapper(updateProductController)
);

export default router;
