// File: backend/src/routes/organisation.routes.js
// ------------------------------------------------

import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { restrictTo } from '../middlewares/role.middleware.js';
import { createClass, getAllClasses, getClassById } from '../controllers/organisation.controller.js';

const router = express.Router();

// All routes in this file are protected and restricted to organisations
router.use(protect, restrictTo('organisation'));

router.route('/classes')
    .post(createClass)
    .get(getAllClasses);

router.route('/classes/:id')
    .get(getClassById);
    // You can add PATCH and DELETE routes here later

export default router;
