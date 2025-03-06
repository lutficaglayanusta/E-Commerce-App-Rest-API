import express from "express"
import { userRegister,getUser } from "../controller/authController.js"
import { getAccessToRoute } from "../middleware/authorization/auth.js"

const router = express.Router()

router.post("/register", userRegister)
router.get("/profile",getAccessToRoute,getUser)

export default router