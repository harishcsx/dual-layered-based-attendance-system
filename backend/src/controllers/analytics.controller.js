// File: backend/src/controllers/analytics.controller.js
// ------------------------------------------------------

import * as AnalyticsService from '../services/analytics.service.js';

export const getAnalytics = async (req, res, next) => {
    try {
        const { classId, rollNo } = req.query;
        let analyticsData;

        if (rollNo) {
            // Get student-specific analytics
            analyticsData = await AnalyticsService.getStudentAnalytics(rollNo, classId);
        } else if (classId) {
            // Get class-level analytics
            analyticsData = await AnalyticsService.getClassAnalytics(classId);
        } else {
             return res.status(400).json({ status: 'fail', message: 'Please provide a classId or rollNo.'});
        }
        
        res.status(200).json({
            status: 'success',
            data: analyticsData,
        });

    } catch (error) {
        next(error);
    }
};
