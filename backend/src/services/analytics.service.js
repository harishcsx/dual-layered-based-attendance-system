// File: backend/src/services/analytics.service.js
// ------------------------------------------------

import prisma from '../config/prisma.js';

// Re-using the student service logic for individual analytics
import { getStudentReport } from './student.service.js'; 

export const getStudentAnalytics = async (rollNo, classId) => {
    const student = await prisma.student.findUnique({
        where: { rollNo },
        // Ensure student belongs to the queried class for security
        include: { class: true }
    });

    if (!student || (classId && student.classId !== classId)) {
        return { error: 'Student not found in this class.' };
    }

    return getStudentReport(student.id);
};


export const getClassAnalytics = async (classId) => {
    const totalStudents = await prisma.student.count({
        where: { classId }
    });

    const totalAttendanceRecords = await prisma.attendance.count({
        where: { classId }
    });
    
    const presentRecords = await prisma.attendance.count({
        where: { classId, status: 'PRESENT' }
    });

    const averageAttendance = totalAttendanceRecords > 0 ? (presentRecords / totalAttendanceRecords) * 100 : 0;

    // A more complex query to find top 5 students with the most 'ABSENT' records
    const topAbsentees = await prisma.attendance.groupBy({
        by: ['studentId'],
        where: { classId, status: 'ABSENT' },
        _count: {
            studentId: true,
        },
        orderBy: {
            _count: {
                studentId: 'desc',
            },
        },
        take: 5,
    });
    
    // Fetch student details for the top absentees
    const absenteeDetails = await prisma.student.findMany({
        where: {
            id: { in: topAbsentees.map(a => a.studentId) }
        },
        select: { rollNo: true, name: true }
    });

    return {
        totalStudents,
        averageAttendance: parseFloat(averageAttendance.toFixed(2)),
        topAbsentees: absenteeDetails,
    };
};
