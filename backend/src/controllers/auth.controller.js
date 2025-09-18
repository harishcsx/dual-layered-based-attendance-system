// File: backend/src/controllers/auth.controller.js
// -------------------------------------------------
import prisma from '../config/prisma.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { sendTokenResponse } from '../utils/jwt.js';
import { AppError } from '../utils/AppError.js';
import axios from 'axios';
import FormData from 'form-data';

// --- GENERIC REGISTRATION ---
const registerUser = async (role, data, res, next) => {
    try {
        const { password } = data;
        const hashedPassword = await hashPassword(password);
        
        const user = await prisma[role].create({
            data: { ...data, password: hashedPassword },
        });
        
        user.role = role;
        sendTokenResponse(user, 201, res);
    } catch (error) {
        if (error.code === 'P2002') {
            const field = error.meta.target[0];
            return next(new AppError(`An account with this ${field} already exists.`, 409));
        }
        next(error);
    }
};

export const registerStudent = (req, res, next) => {
    const { name, rollNo, password, classId } = req.body;
    if (!name || !rollNo || !password || !classId) {
        return next(new AppError('Please provide name, roll number, password, and classId', 400));
    }
    registerUser('student', { name, rollNo, password, classId }, res, next);
};

export const registerTeacher = (req, res, next) => {
    const { name, teacherId, password } = req.body;
     if (!name || !teacherId || !password) {
        return next(new AppError('Please provide name, teacher ID, and password', 400));
    }
    registerUser('teacher', { name, teacherId, password }, res, next);
};

export const registerOrganisation = (req, res, next) => {
    const { name, orgId, password } = req.body;
    if (!name || !orgId || !password) {
        return next(new AppError('Please provide name, organisation ID, and password', 400));
    }
    registerUser('organisation', { name, orgId, password }, res, next);
};


// --- LOGIN & LOGOUT ---
export const login = async (req, res, next) => {
    try {
        const { id, password, role } = req.body;
        if (!id || !password || !role) {
            return next(new AppError('Please provide an ID, password, and role', 400));
        }

        const queryField = {
            student: { rollNo: id },
            teacher: { teacherId: id },
            organisation: { orgId: id },
        }[role];

        if (!queryField) {
            return next(new AppError('Invalid user role specified', 400));
        }
        
        const user = await prisma[role].findUnique({ where: queryField });

        if (!user || !(await comparePassword(password, user.password))) {
            return next(new AppError('Incorrect ID or password', 401));
        }
        
        user.role = role;
        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }
};

export const logout = (req, res) => {
    res.cookie('token', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: 'success' });
};


// --- FACE REGISTRATION ---
export const registerFace = async (req, res, next) => {
    try {
        if (!req.file) {
            return next(new AppError('No image file uploaded.', 400));
        }

        const studentId = req.user.id;
        
        const formData = new FormData();
        formData.append('file', req.file.buffer, req.file.originalname);

        const response = await axios.post(
            `${process.env.FACIAL_RECOGNITION_SERVICE_URL}/encode`, 
            formData,
            { headers: formData.getHeaders() }
        );

        const { encoding } = response.data;
        if (!encoding) {
            return next(new AppError('Could not generate face encoding from the image.', 400));
        }
        
        const student = await prisma.student.update({
            where: { id: studentId },
            data: {
                profileImageUrl: req.file.path,
                faceEncoding: JSON.stringify(encoding),
            },
        });

        res.status(200).json({
            status: 'success',
            message: 'Face registered successfully!',
            data: { profileImageUrl: student.profileImageUrl }
        });
    } catch (error) {
        if (error.response) {
            return next(new AppError(`Facial recognition service error: ${error.response.data.error}`, 400));
        }
        next(error);
    }
};

