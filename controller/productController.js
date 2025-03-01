import pool from "../helpers/database/connectDatabase.js";

export const createProduct = async (req, res) => {
  const { name, description, stock_quantity, category_id, price, category } = req.body;

  const product = await pool.query(
    "INSERT INTO products (name,description,stock_quantity,category_id,price) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [name, description, stock_quantity, category_id, price]
    );
    res.status(200).json({
        status: "success",
        product: product.rows[0],
        
    });
};
export const getProducts = async (req, res) => { 
    const products = await pool.query("SELECT * FROM products");
    res.status(200).json({
        status: "success",
        products: products.rows,
    });
}
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await pool.query("DELETE FROM products WHERE product_id = $1", [id]);
    res.status(200).json({
        status: "success",
        message: "Product deleted successfully",
    });
}
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description,price, stock_quantity, category_id } = req.body;
    const product = await pool.query(
        "UPDATE products SET name = $1, description = $2, stock_quantity = $3, category_id = $4, price = $5 WHERE product_id = $6 RETURNING *",
        [name, description, stock_quantity, category_id, price, id]
    );
    res.status(200).json({
        status: "success",
        product: product.rows[0],
    });
}