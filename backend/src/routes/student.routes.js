// File: backend/src/routes/student.routes.js
// -------------------------------------------

import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { restrictTo } from '../middlewares/role.middleware.js';
import { getMyReport } from '../controllers/student.controller.js';

const router = express.Router();

router.use(protect, restrictTo('student'));

router.get('/my-report', getMyReport);

export default router;
