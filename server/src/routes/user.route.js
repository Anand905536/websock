import { register, login } from "../controllers/auth.controller.js";
import { uploadProfilePicture, updateProfile } from '../controllers/user.controller.js'
import upload from '../middleware/upload.middleware.js';
import express from 'express'

const router = express.Router()

router.post('/auth/register', register)
router.post('/auth/login', login)
router.post('/upload-Profile-Picture', upload.single("profilePicture"), uploadProfilePicture)
router.post('/update-Profile', updateProfile)

export default router