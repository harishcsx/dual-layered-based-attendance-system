// File: backend/src/routes/index.js
// ----------------------------------

import express from 'express';
import authRoutes from './auth.routes.js';
import attendanceRoutes from './attendance.routes.js';
import organisationRoutes from './organisation.routes.js';
import teacherRoutes from './teacher.routes.js';
import studentRoutes from './student.routes.js';
import analyticsRoutes from './analytics.routes.js';

const router = express.Router();

// Mounts all the individual routers on their respective paths
router.use('/auth', authRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/organisation', organisationRoutes);
router.use('/teacher', teacherRoutes);
router.use('/student', studentRoutes);
router.use('/analytics', analyticsRoutes);


export default router;

