import pool from "../helpers/database/connectDatabase.js";

export const createCategory = async (req, res) => {
    const { name, description } = req.body;
    
    const category = await pool.query("INSERT INTO category (name,description) VALUES($1,$2) RETURNING *",[name,description]);
    
    res.status(200).json({
        success:true,
        data:category.rows[0]
    })
}

export const getAllCategories = async (req, res) => {
    const categories = await pool.query("SELECT * FROM category");
    
    res.status(200).json({
        success:true,
        data:categories.rows
    })
}
export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    
    await pool.query("DELETE FROM category WHERE category_id = $1",[id]);
    
    res.status(200).json({
        success:true,
        message:"Category deleted"
    })
}
export const updateCategory = async (req, res) => { 
    const { id } = req.params;
    const { name, description } = req.body;
    
    const category = await pool.query("UPDATE category SET name = $1, description = $2 WHERE category_id = $3 RETURNING *",[name,description,id]);
    
    res.status(200).json({
        success:true,
        data:category.rows[0]
    })
}