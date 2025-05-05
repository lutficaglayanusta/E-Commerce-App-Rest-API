import express from "express"
import { createOrder, getOrder } from "../controller/orderController.js"

const router = express.Router()

router.post("/", createOrder)
router.get("/",getOrder)




export default router