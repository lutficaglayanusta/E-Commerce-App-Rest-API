import { sql } from "../db/connectPostreSQL.js";

export const addCartService = async (paylaod, id) => {
  const oldCart = await sql`SELECT * FROM carts WHERE title=${paylaod.title}`;

  if (oldCart.length > 0) {
    oldCart[0].quantity += 1;
    await sql`UPDATE carts SET quantity=${oldCart[0].quantity} WHERE id=${oldCart[0].id} `;
    return oldCart;
  }

  const newCart =
    await sql`INSERT INTO carts(title,quantity,price,user_id) VALUES(${paylaod.title},${paylaod.quantity},${paylaod.price},${id}) RETURNING * `;


  return newCart;
};
export const fetchCartService = async (id) => {
  const cart = await sql`SELECT * FROM carts WHERE user_id = ${id}`;

  return cart;
};
export const deleteCartService = async (cartId,id) => {
  await sql`DELETE FROM carts WHERE id=${cartId} AND user_id=${id}`;
};
