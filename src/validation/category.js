import Joi from "joi";

export const categorySchema = Joi.object({
  title: Joi.string().required(),
});
export const updateCategorySchema = Joi.object({
  image: Joi.string(),
  title: Joi.string(),
});
