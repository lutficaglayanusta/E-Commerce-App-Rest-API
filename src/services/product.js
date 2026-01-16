import { sql } from "../db/connectPostreSQL.js";

export const addProductService = async (paylaod) => {
  console.log(paylaod);

  const product =
    await sql`INSERT INTO products(title,price) VALUES(${paylaod.title},${paylaod.price}) RETURNING *`;

  return product;
};
export const fetchProductService = async () => {
  const products = await sql`SELECT * FROM products`;

  return products;
};
export const deleteProductService = async (id) => {
  await sql`DELETE FROM products WHERE id=${id}`;
};
export const updateProductService = async (paylaod, id) => {
  const product =
    await sql`UPDATE products SET image=${paylaod.image}, title=${paylaod.title}, price=${paylaod.price} WHERE id=${id} RETURNING * `;

  return product;
};
