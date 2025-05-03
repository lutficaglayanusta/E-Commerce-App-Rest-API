import pool from "../helpers/database/connectDatabase.js";

export const createCart = async (req, res) => {
  const {id} = req.user
  const {items } = req.body;

  for (const item of items) {
    await pool.query(
      "INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3)",
      [id, item.product_id, item.quantity]
    );
  }
  res.status(200).json({ message: "Ürünler sepete başarıyla eklendi!" });
};
export const getCart = async (req, res) => {
  const {id} = req.user

  const carts = await pool.query(
    "SELECT cart.cart_id,products.name AS product_name,products.price,cart.quantity,(products.price * cart.quantity) AS total_price FROM cart JOIN products ON cart.product_id = products.product_id WHERE cart.user_id = $1",[id]
  );
  res.status(200).json({
    data: carts.rows,
  });
};
