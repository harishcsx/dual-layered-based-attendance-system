// File: backend/src/routes/analytics.routes.js
// ---------------------------------------------

import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { restrictTo } from '../middlewares/role.middleware.js';
import { getAnalytics } from '../controllers/analytics.controller.js';

const router = express.Router();

// Analytics can be accessed by teachers and organisations
router.use(protect, restrictTo('teacher', 'organisation'));

router.get('/', getAnalytics);

// This line is the fix. It makes the router available for other files to import.
export default router;

