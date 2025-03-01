import express from "express";

import { createCategory,getAllCategories,deleteCategory,updateCategory } from "../controller/categoryController.js";

const router = express.Router();

router.post("/", createCategory)
router.get("/", getAllCategories)
router.delete("/:id", deleteCategory)
router.put("/:id", updateCategory)

export default router;