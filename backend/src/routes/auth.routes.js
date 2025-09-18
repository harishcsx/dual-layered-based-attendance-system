// File: backend/src/routes/auth.routes.js
// ----------------------------------------

import express from 'express';
import { registerStudent, login, logout, registerFace } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.post('/register/student', registerStudent);
router.post('/login', login);
router.get('/logout', logout);

router.post('/register-face', protect, upload.single('faceImage'), registerFace);

export default router;

