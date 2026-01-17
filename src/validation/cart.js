import Joi from "joi";

export const addCartSchema = Joi.object({
  image: Joi.string().optional(),
  title: Joi.string().required(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
});
