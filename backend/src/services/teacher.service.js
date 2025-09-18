// File: backend/src/services/teacher.service.js
// ----------------------------------------------

import prisma from '../config/prisma.js';

export const getTeacherClasses = async (teacherId) => {
    return prisma.class.findMany({
        where: {
            teachers: {
                some: {
                    id: teacherId,
                },
            },
        },
        include: {
            subjects: { select: { name: true }},
            _count: { select: { students: true }}
        }
    });
};
