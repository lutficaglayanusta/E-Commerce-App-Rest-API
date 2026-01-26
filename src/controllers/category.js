import {
  addCategoryService,
  deleteCategoryService,
  fetchCategoryService,
  updateCategoryService,
} from "../services/category.js";

export const addCategoryController = async (req, res) => {
  const category = await addCategoryService(req.body);

  res.status(201).json({
    message: "Successfully created category",
    data: category[0],
  });
};
export const fetchCategoryController = async (req, res) => {
  const categories = await fetchCategoryService();

  res.status(200).json({
    message: "Successfully fetched categories",
    data: categories,
  });
};
export const deleteCategoryController = async (req, res) => {
  const { categoryId } = req.params;

  await deleteCategoryService(categoryId);

  res.status(204).send();
};
export const updateCategoryController = async (req, res) => {
  const { categoryId } = req.params;

  const category = await updateCategoryService(req.body, categoryId);

  res.status(200).json({
    message: "Successfully updated category",
    data: category,
  });
};
