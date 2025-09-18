// File: src/pages/teacher/ClassManagementPage.jsx
// -----------------------------------------------
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';

const ClassManagementPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedClass = location.state?.selectedClass;

    const [sessionActive, setSessionActive] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [attendanceList, setAttendanceList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [manualRollNo, setManualRollNo] = useState('');
    const [manualReason, setManualReason] = useState('Technical Issue');
    
    // Using useRef to hold the interval ID to avoid re-renders
    const attendanceIntervalRef = useRef(null);

    useEffect(() => {
        if (!selectedClass) {
            navigate('/teacher-dashboard');
        }
    }, [selectedClass, navigate]);

    // This useEffect handles the real-time attendance simulation
    useEffect(() => {
        if (sessionActive) {
            // Start simulating students marking attendance
            attendanceIntervalRef.current = setInterval(() => {
                setAttendanceList(prevList => {
                    const absentStudents = prevList.filter(s => s.status === 'ABSENT');
                    if (absentStudents.length === 0) {
                        clearInterval(attendanceIntervalRef.current);
                        return prevList;
                    }
                    
                    // Pick a random absent student to mark as present
                    const randomIndex = Math.floor(Math.random() * absentStudents.length);
                    const randomStudentId = absentStudents[randomIndex].id;
                    
                    return prevList.map(student => 
                        student.id === randomStudentId
                            ? { ...student, status: 'PRESENT', time: new Date().toLocaleTimeString(), markedBy: 'AUTOMATED' }
                            : student
                    );
                });
            }, 3000); // A new student marks attendance every 3 seconds
        } else {
            // If session is stopped, clear the interval
            clearInterval(attendanceIntervalRef.current);
        }

        // Cleanup function to clear interval when component unmounts or session stops
        return () => clearInterval(attendanceIntervalRef.current);
    }, [sessionActive]);

    const handleSessionToggle = () => {
        if (!selectedSubject) {
            alert("Please select a subject first.");
            return;
        }

        const isStarting = !sessionActive;
        setSessionActive(isStarting);

        if (isStarting) {
            // Initialize the full class list with "ABSENT" status
            const initialList = selectedClass.students.map(student => ({
                ...student,
                status: 'ABSENT',
                time: null,
                markedBy: null,
            }));
            setAttendanceList(initialList);
        } else {
            // Clear the list when session stops
            setAttendanceList([]);
        }
    };

    const handleManualSubmit = (e) => {
        e.preventDefault();
        if (!manualRollNo.trim()) {
            alert("Please enter a student roll number.");
            return;
        }

        setAttendanceList(prevList => {
            const studentExists = prevList.some(s => s.rollNo === manualRollNo);
            if (!studentExists) {
                alert("No student found with this roll number in the class.");
                return prevList;
            }

            return prevList.map(student => 
                student.rollNo === manualRollNo 
                ? { ...student, status: 'PRESENT', time: new Date().toLocaleTimeString(), markedBy: 'MANUAL_TEACHER' }
                : student
            );
        });
        
        setManualRollNo('');
        setManualReason('Technical Issue');
        setIsModalOpen(false);
    };
    
    const presentCount = attendanceList.filter(s => s.status === 'PRESENT').length;

    if (!selectedClass) return null;

    return (
        <>
            <Card>
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{selectedClass.name}</h2>
                        <p className="text-gray-500">Manage live attendance session.</p>
                    </div>
                    <Button onClick={() => navigate('/teacher-dashboard')} variant="secondary">Back to Classes</Button>
                </div>

                {/* Controls */}
                <div className="bg-gray-50 p-6 rounded-lg border">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Subject</label>
                            <select
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                disabled={sessionActive}
                            >
                                <option value="" disabled>-- Choose a subject --</option>
                                {selectedClass.subjects.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="md:col-span-2 flex items-center space-x-4">
                            <Button onClick={handleSessionToggle} variant={sessionActive ? 'danger' : 'primary'} fullWidth={true}>
                                {sessionActive ? 'Stop Attendance Session' : 'Start Attendance Session'}
                            </Button>
                            {sessionActive && (
                                <Button onClick={() => setIsModalOpen(true)} variant="secondary" fullWidth={true}>
                                    + Add Manual Entry
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Live Attendance Table */}
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-700">Live Class Roster</h3>
                        <span className="text-lg font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                            {presentCount} / {attendanceList.length} Present
                        </span>
                    </div>
                    <div className="overflow-x-auto border rounded-lg max-h-[50vh]">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roll No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time Marked</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {attendanceList.length > 0 ? (
                                    attendanceList.map((student) => (
                                        <tr key={student.id} className={student.status === 'ABSENT' ? 'bg-red-50' : 'bg-green-50'}>
                                            <td className="px-6 py-4">{student.name}</td>
                                            <td className="px-6 py-4">{student.rollNo}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.status === 'PRESENT' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {student.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">{student.time || 'N/A'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-10 text-gray-500">
                                            Start a session to view the class roster.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Card>

            {/* Manual Entry Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4">Add Manual Attendance</h3>
                        <form onSubmit={handleManualSubmit}>
                           {/* ... (Modal form remains the same) */}
                           <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Student Roll Number</label>
                                    <Input
                                        type="text"
                                        value={manualRollNo}
                                        onChange={(e) => setManualRollNo(e.target.value)}
                                        placeholder="Enter roll number"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Reason</label>
                                    <select
                                        value={manualReason}
                                        onChange={(e) => setManualReason(e.target.value)}
                                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                    >
                                        <option>Technical Issue</option>
                                        <option>Device Unavailable</option>
                                        <option>Special Permission</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-4">
                                <Button type="button" onClick={() => setIsModalOpen(false)} variant="secondary">Cancel</Button>
                                <Button type="submit">Mark Present</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ClassManagementPage;

