import pool from "../helpers/database/connectDatabase.js";
import asyncErrorWrapper from "express-async-handler";

export const getAllUser = asyncErrorWrapper(async (req, res, next) => {
    const users = await pool.query("SELECT * FROM users")

    res.status(200).json({
        success: true,
        data:users.rows
    })
})
export const getUser = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params
    
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [id])
    
    res.status(200).json({
        success: true,
        data:user.rows
    })
})
export const deleteUser = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params
    
    await pool.query("DELETE FROM users WHERE user_id = $1", [id])
    
    res.status(200).json({
        success: true,
        message:"Kullanıcı başarılı bir şekilde silindi."
    })
})
export const updateUser = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.user
    const {name,email} = req.body
    
    const updateUser = await pool.query("UPDATE users SET name = $1, email = $2 WHERE user_id = $3 RETURNING *", [name, email, id])
    
    res.status(200).json({
        success: true,
        data: updateUser.rows
    })
})