// File: backend/src/controllers/student.controller.js
// ----------------------------------------------------

import * as StudentService from '../services/student.service.js';

export const getMyReport = async (req, res, next) => {
    try {
        const studentId = req.user.id;
        const report = await StudentService.getStudentReport(studentId);
        res.status(200).json({
            status: 'success',
            data: {
                report,
            }
        });
    } catch (error) {
        next(error);
    }
};
