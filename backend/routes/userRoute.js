import express from "express"
import { allUser, changePassword, forgotPassword, getUserById, login, logout, register, reVerify, updateUser, verifyOTP } from "../controllers/userController.js"
import { verify } from "../controllers/userController.js"
import { isAdmin,isAuthenticated } from "../middleware/isAuthenticated.js"
import { get } from "mongoose"
import { SingleUpload } from "../middleware/multer.js"

const router = express.Router()

router.post('/register',register)
router.post('/verify',verify)
router.post('/reVerify',reVerify)
router.post('/login',login)
router.post('/logout', logout)
router.post('/forgot-password',forgotPassword)
router.post('/verify-otp/:email',verifyOTP)
router.post('/change-password/:email' , changePassword)
router.get('/all-user',isAuthenticated,isAdmin,allUser)
router.get('/get-user/:userId',getUserById)
router.put('/update/:userId',isAuthenticated,SingleUpload,updateUser)


export default router