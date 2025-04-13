import pool from "../helpers/database/connectDatabase.js";

export const createCart = async (req, res) => {
  const { user_id, items } = req.body;

  for (const item of items) {
    await pool.query(
      "INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3)",
      [user_id, item.product_id, item.quantity]
    );
  }
  res.status(200).json({ message: "Ürünler sepete başarıyla eklendi!" });
};
export const getCart = async (req, res) => {

  const carts = await pool.query(
    "SELECT c.cart_id,p.name AS product_name,p.price,c.quantity,(p.price * c.quantity) AS total_price FROM cart c JOIN products p ON c.product_id = p.product_id"
  );
  res.status(200).json({
    data: carts.rows,
  });
};
