// File: backend/src/controllers/attendance.controller.js
// -------------------------------------------------------

import prisma from '../config/prisma.js';
import { AppError } from '../utils/AppError.js';
import axios from 'axios';
import FormData from 'form-data';

export const markAttendance = async (req, res, next) => {
    try {
        const { subjectId, classId } = req.body;
        const studentId = req.user.id;

        if (!subjectId || !classId || !req.file) {
            return next(new AppError('Subject ID, Class ID, and a live image are required.', 400));
        }

        // --- Layer 1: IP Address Verification ---
        const student = await prisma.student.findUnique({
            where: { id: studentId },
            include: { class: true },
        });

        if (!student) return next(new AppError('Student not found.', 404));

        const expectedIp = student.class.ipAddress;
        const userIp = req.ip; 

        if (expectedIp && userIp !== expectedIp) {
            return next(new AppError(`IP address mismatch. Expected ${expectedIp}, got ${userIp}.`, 403));
        }
        
        // --- Layer 2: Facial Recognition Verification ---
        // ... rest of the function
    } catch (error) {
         if (error.response) {
            return next(new AppError(`Facial recognition service error: ${error.response.data.error}`, 400));
        }
        next(error);
    }
};

