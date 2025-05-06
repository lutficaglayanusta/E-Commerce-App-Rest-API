import pool from "../helpers/database/connectDatabase.js";
import asyncErrorWrapper from "express-async-handler";

export const createOrder = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.user;
  const { total_amount, status, items } = req.body;

  const orderResult = await pool.query(
    "INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING *",
    [id, total_amount, status]
  );

  const orderId = orderResult.rows[0].order_id;

  // 2. Siparişe ait ürünleri kaydet
  for (const item of items) {
    await pool.query(
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)",
      [orderId, item.product_id, item.quantity, item.price]
    );
  }
  res.status(200).json({
    message: "Sipariş başarıyla eklendi",
  });
});
export const getOrder = asyncErrorWrapper(async (req, res, next) => {
    const {id} = req.user
    const oneOrder = await pool.query("SELECT * FROM orders INNER JOIN order_items ON order_items.order_id = orders.order_id WHERE orders.user_id = $1",[id])
    res.status(200).json({
       data: oneOrder.rows
    })
})
