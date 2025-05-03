import express from "express"
import productRoute from "./productRoute.js"
import authRoute from "./authRoute.js"
import categoryRoute from "./categoryRoute.js"
import cartRoute from "./cartRoute.js"
import { getAccessToRoute } from "../middleware/authorization/auth.js"


const router = express.Router()

router.use("/products",productRoute)
router.use("/auth", authRoute)
router.use("/categories", categoryRoute)
router.use("/cart",getAccessToRoute,cartRoute)

export default router