import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';
import { AppError } from '../utils/AppError.js';

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return next(new AppError('You are not logged in. Please log in to get access.', 401));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user still exists
        // This is a generic check; you might want more specific checks per role
        const user = await prisma.student.findUnique({ where: { id: decoded.id } }) ||
                     await prisma.teacher.findUnique({ where: { id: decoded.id } }) ||
                     await prisma.organisation.findUnique({ where: { id: decoded.id } });
        
        if (!user) {
            return next(new AppError('The user belonging to this token does no longer exist.', 401));
        }
        
        req.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (error) {
        return next(new AppError('Invalid token or session has expired.', 401));
    }
};
