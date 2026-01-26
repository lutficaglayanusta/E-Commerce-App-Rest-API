import {
  addCartService,
  deleteCartService,
  fetchCartService,
} from "../services/cart.js";

export const addCartController = async (req, res) => {
  const id = req.user.id;

  console.log(req.body, id);

  const cart = await addCartService(req.body, id);

  res.status(201).json({
    message: "Successfully created cart",
    data: cart[0],
  });
};
export const fetchCartController = async (req, res) => {
  const id = req.user.id;

  const cart = await fetchCartService(id);

  res.status(200).json({
    message: "Successfully fetched cart according to user",
    data: cart,
  });
};
export const deleteCartController = async (req, res) => {
    const { cartId } = req.params;
    
    const id = req.user.id;

  await deleteCartService(cartId,id);

  res.status(204).send();
};

