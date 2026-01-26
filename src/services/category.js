import { sql } from "../db/connectPostreSQL.js";

export const addCategoryService = async (payload) => {
  const category =
    await sql`INSERT INTO category(title) VALUES(${payload.title}) RETURNING * `;

  return category;
};
export const fetchCategoryService = async () => {
  const categories = await sql`SELECT * FROM category`;

  return categories;
};
export const deleteCategoryService = async (id) => {
  await sql`DELETE FROM category WHERE id=${id}`;
};
export const updateCategoryService = async (payload, id) => {
  const category =
    await sql`UPDATE category SET image=${payload.image}, title=${payload.title} WHERE id=${id} RETURNING * `;

  return category;
};
