import express from "express"
import { deleteUser, getAllUser, getUser, updateUser } from "../controller/userController.js"
import { getAccessToRoute, getAdminAccess } from "../middleware/authorization/auth.js"


const router = express.Router()



router.get("/", getAllUser)
router.get("/:id",getUser)
router.delete("/:id",getAccessToRoute,getAdminAccess,deleteUser)
router.put("/",getAccessToRoute,updateUser)




export default router