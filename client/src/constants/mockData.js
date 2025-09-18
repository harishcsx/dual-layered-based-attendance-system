// File: src/constants/mockData.js
// --------------------------------

export const MOCK_STUDENT_DATA = {
    id: 's1',
    name: 'Puppala Harish',
    rollNo: 'S-101',
    class: 'B.Tech CSE - Section A',
    attendance: {
        overall: 85,
        subjects: [
            { name: 'Data Structures', percentage: 90 },
            { name: 'Algorithms', percentage: 80 },
            { name: 'Operating Systems', percentage: 75 },
            { name: 'Database Management', percentage: 95 },
        ]
    }
};

export const MOCK_TEACHER_DATA = {
    id: 't1',
    name: 'Dr. Bidush Kumar Sahoo',
    classes: [
        { 
            id: 'c1', 
            name: 'B.Tech CSE - Section A', 
            subjects: ['Data Structures', 'Algorithms'], 
            studentCount: 60,
            students: [
                { id: 's101', name: 'Lagnesh', rollNo: '24CSEAIML124' },
                { id: 's102', name: 'Sujit', rollNo: '24CSEAIML157' },
                { id: 's103', name: 'Preetam', rollNo: '24CSEAIML104' },
                { id: 's104', name: 'Harish', rollNo: '24CSEAIML169' },
                { id: 's105', name: 'Anjali Sharma', rollNo: '24CSEAIML101' },
                { id: 's106', name: 'Rohan Gupta', rollNo: '24CSEAIML102' },
            ]
        },
        { 
            id: 'c2', 
            name: 'B.Tech ECE - Section B', 
            subjects: ['Circuit Theory', 'Digital Electronics'], 
            studentCount: 55,
            students: [
                { id: 's201', name: 'Priya Singh', rollNo: '24ECEB201' },
                { id: 's202', name: 'Vikram Patel', rollNo: '24ECEB202' },
            ]
        },
    ]
};

export const MOCK_ORGANIZATION_DATA = {
    id: 'org1',
    name: 'GIET University',
    classes: [
        { id: 'c1', name: 'B.Tech CSE - Section A', teacherCount: 4, studentCount: 60 },
        { id: 'c2', name: 'B.Tech ECE - Section B', teacherCount: 3, studentCount: 55 },
        { id: 'c3', name: 'M.Tech AI - Section A', teacherCount: 5, studentCount: 30 },
    ]
};

