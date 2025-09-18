// File: backend/src/services/student.service.js
// ----------------------------------------------

import prisma from '../config/prisma.js';

export const getStudentReport = async (studentId) => {
    const totalRecords = await prisma.attendance.count({
        where: { studentId }
    });

    const presentRecords = await prisma.attendance.count({
        where: { studentId, status: 'PRESENT' }
    });

    const attendanceBySubject = await prisma.attendance.groupBy({
        by: ['subjectId'],
        where: { studentId },
        _count: {
            status: true,
        },
    });

    const overallPercentage = totalRecords > 0 ? (presentRecords / totalRecords) * 100 : 0;
    
    return {
        overallPercentage: parseFloat(overallPercentage.toFixed(2)),
        totalClasses: totalRecords,
        presentClasses: presentRecords,
        absentClasses: totalRecords - presentRecords,
        // you would further process attendanceBySubject to get subject names
        // for now, returning the raw data
        subjectBreakdown: attendanceBySubject,
    };
};
