import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';

const ClassManagementPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedClass } = location.state || {}; // Safely access state

    const [sessionActive, setSessionActive] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [presentStudents, setPresentStudents] = useState([]);

    // If no class data was passed, redirect back to the dashboard
    if (!selectedClass) {
        return <Navigate to="/teacher-dashboard" />;
    }

    const handleSessionToggle = () => {
        if (!sessionActive) {
            // Simulate students appearing after a short delay
            setTimeout(() => {
                setPresentStudents([
                    { name: 'Alice Johnson', rollNo: '102' },
                    { name: 'Bob Williams', rollNo: '105' },
                    { name: 'Charlie Brown', rollNo: '108' },
                ]);
            }, 1500);
        } else {
            setPresentStudents([]);
        }
        setSessionActive(!sessionActive);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">{selectedClass.name} - Attendance</h2>
                 <div className="w-40">
                    <Button onClick={() => navigate('/teacher-dashboard')} variant="secondary">Back to Classes</Button>
                </div>
            </div>
            <Card>
                <div className="flex flex-col md:flex-row items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                     <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={sessionActive}
                    >
                        <option value="">-- Select Subject --</option>
                        {selectedClass.subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                    </select>
                    <div className="w-full md:w-auto">
                        <Button onClick={handleSessionToggle} disabled={!selectedSubject} variant={sessionActive ? 'danger' : 'primary'}>
                            {sessionActive ? 'Stop Attendance Session' : 'Start Attendance Session'}
                        </Button>
                    </div>
                     {sessionActive && <p className="font-semibold text-green-600 animate-pulse">Live: {presentStudents.length} Students Present</p>}
                </div>
                <h3 className="text-xl font-semibold mb-4">Present Students</h3>
                 <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll Number</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {presentStudents.length > 0 ? (
                                presentStudents.map((student, index) => (
                                    <tr key={student.rollNo} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{student.rollNo}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                        {sessionActive ? "Waiting for students..." : "Start a session to see live attendance."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ClassManagementPage;

