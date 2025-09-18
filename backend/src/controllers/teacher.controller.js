// File: backend/src/controllers/teacher.controller.js
// ----------------------------------------------------

import * as TeacherService from '../services/teacher.service.js';

export const getMyClasses = async (req, res, next) => {
    try {
        const teacherId = req.user.id;
        const classes = await TeacherService.getTeacherClasses(teacherId);
        res.status(200).json({
            status: 'success',
            results: classes.length,
            data: {
                classes,
            }
        });
    } catch(error) {
        next(error);
    }
};
