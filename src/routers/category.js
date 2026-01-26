import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import {
  categorySchema,
  updateCategorySchema,
} from "../validation/category.js";
import {
  addCategoryController,
  deleteCategoryController,
  fetchCategoryController,
  updateCategoryController,
} from "../controllers/category.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validateBody(categorySchema),
  addCategoryController,
);
router.get("/", fetchCategoryController);
router.delete("/:categoryId", authenticate, deleteCategoryController);
router.patch(
  "/:categoryId",
  authenticate,
  validateBody(updateCategorySchema),
  updateCategoryController,
);

export default router;
