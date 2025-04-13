import express from "express"
import { createCart,getCart } from "../controller/cartController.js"

const router = express.Router()

router.post("/", createCart)
router.get("/",getCart)



export default router