// File: backend/src/routes/teacher.routes.js
// -------------------------------------------

import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { restrictTo } from '../middlewares/role.middleware.js';
import { getMyClasses } from '../controllers/teacher.controller.js';

const router = express.Router();

router.use(protect, restrictTo('teacher'));

router.get('/my-classes', getMyClasses);

// This line is the fix. It makes the router available for other files to import.
export default router;

