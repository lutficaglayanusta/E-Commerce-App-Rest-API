import express from "express"
import { userRegister,getUser,logIn,logOut } from "../controller/authController.js"
import { getAccessToRoute } from "../middleware/authorization/auth.js"

const router = express.Router()

router.post("/register", userRegister)
router.get("/profile", getAccessToRoute, getUser)
router.get("/login", logIn)
router.get("/logout",getAccessToRoute,logOut)

export default router