// File: backend/src/routes/attendance.routes.js
// ----------------------------------------------

import express from 'express';
import { markAttendance } from '../controllers/attendance.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import multer from 'multer';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/mark', protect, upload.single('liveImage'), markAttendance);

export default router;

