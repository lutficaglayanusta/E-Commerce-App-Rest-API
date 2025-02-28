import express from "express"
import productRoute from "./productRoute.js"
import authRoute from "./authRoute.js"
import categoryRoute from "./categoryRoute.js"

const router = express.Router()

router.use("/products",productRoute)
router.use("/auth", authRoute)
router.use("/categories",categoryRoute)

export default router