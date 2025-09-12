// This file contains mock data to simulate what an API would return.
// This helps in developing the UI without a live backend.

export const MOCK_STUDENT_DATA = {
    id: 'S001',
    name: 'John Doe',
    rollNo: '101',
    attendance: [
        { subject: 'Data Structures', percentage: 85 },
        { subject: 'Algorithms', percentage: 92 },
        { subject: 'Database Systems', percentage: 78 },
        { subject: 'Operating Systems', percentage: 95 },
    ],
    history: [
        // Green for present, red for absent
        { date: '2023-10-01', status: 'present' },
        { date: '2023-10-02', status: 'present' },
        { date: '2023-10-03', status: 'absent' },
        { date: '2023-10-04', status: 'present' },
    ]
};

export const MOCK_TEACHER_DATA = {
    id: 'T01',
    name: 'Dr. Jane Smith',
    classes: [
        { id: 'C01', name: 'B.Tech CSE - Section A', subjects: ['Data Structures', 'Algorithms'] },
        { id: 'C02', name: 'B.Tech IT - Section B', subjects: ['Database Systems'] },
    ]
};

export const MOCK_ORGANIZATION_DATA = {
    id: 'ORG01',
    name: 'Tech University',
};

