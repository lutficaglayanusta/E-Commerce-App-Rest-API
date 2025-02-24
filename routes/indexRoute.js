import express from "express"
import productRoute from "./productRoute.js"
import authRoute from "./authRoute.js"

const router = express.Router()

router.use("/products",productRoute)
router.use("/auth",authRoute)

export default router