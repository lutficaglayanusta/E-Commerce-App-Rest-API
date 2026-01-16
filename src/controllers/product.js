import {
  addProductService,
  deleteProductService,
  fetchProductService,
  updateProductService,
} from "../services/product.js";

export const addProductController = async (req, res) => {
  const product = await addProductService(req.body);

  res.status(201).json({
    message: "Successfully added product",
    data: product[0],
  });
};
export const fetchProductController = async (req, res) => {
  const products = await fetchProductService();

  res.status(200).json({
    message: "Successfully fetched products",
    data: products,
  });
};
export const deleteProductController = async (req, res) => {
  const { productId } = req.params;

  await deleteProductService(productId);

  res.status(204).send();
};
export const updateProductController = async (req, res) => {
  const { productId } = req.params;

  const product = await updateProductService(req.body, productId);

  res.status(200).json({
    message: "Successfully updated product",
    data: product,
  });
};
