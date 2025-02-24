import pool from "../helpers/database/connectDatabase.js";

export const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let users = await pool.query("INSERT INTO users (name,email,password) VALUES($1,$2,$3) RETURNING * ",[name,email,password])

        users = users.rows[0]

        res.status(200).json({
            success: "true",
            users
        })
    } catch (err) {
        res.status(400).json({
            success: "fail",
            err
        })
    }
}