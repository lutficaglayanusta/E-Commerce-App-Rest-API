import Joi from "joi";

export const addProductSchema = Joi.object({
  image: Joi.string().optional(),
  title: Joi.string().required(),
  price: Joi.number().required(),
});

export const updateProductSchema = Joi.object({
  image: Joi.string().optional(),
  title: Joi.string().optional(),
  price: Joi.number().optional(),
});
