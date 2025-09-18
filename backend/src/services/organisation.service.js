// File: backend/src/services/organisation.service.js
// ---------------------------------------------------

import prisma from '../config/prisma.js';

export const createClass = async (organisationId, classData) => {
    const { name, ipAddress, studentRollNos = [], teacherIds = [], subjectNames = [] } = classData;

    // This is a complex transaction to ensure all or nothing is created.
    return prisma.class.create({
        data: {
            name,
            ipAddress,
            organisationId,
            // Connect to existing students by their unique roll numbers
            students: {
                connect: studentRollNos.map(rollNo => ({ rollNo }))
            },
            // Connect to existing teachers by their unique teacher IDs
            teachers: {
                connect: teacherIds.map(teacherId => ({ teacherId }))
            },
            // Connect to existing subjects or create them if they don't exist
            subjects: {
                connectOrCreate: subjectNames.map(name => ({
                    where: { name },
                    create: { name },
                }))
            }
        },
        include: {
            students: true,
            teachers: true,
            subjects: true,
        }
    });
};

export const getOrganisationClasses = async (organisationId) => {
    return prisma.class.findMany({
        where: { organisationId },
        include: {
            _count: {
                select: { students: true, teachers: true }
            }
        }
    });
};

export const getClassDetails = async (classId, organisationId) => {
    return prisma.class.findFirst({
        where: {
            id: classId,
            organisationId, // Ensure the class belongs to the requesting organisation
        },
        include: {
            students: { select: { id: true, name: true, rollNo: true }},
            teachers: { select: { id: true, name: true, teacherId: true }},
            subjects: { select: { id: true, name: true }},
        }
    });
};
