import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '@/components/common/Card.jsx';
import Button from '@/components/common/Button.jsx';
import Input from '@/components/common/Input.jsx'; // Import Input for the modal form

const ClassManagementPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get the selectedClass from the navigation state
    const selectedClass = location.state?.selectedClass;

    const [sessionActive, setSessionActive] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [presentStudents, setPresentStudents] = useState([]);
    
    // State for managing the manual entry modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [manualRollNo, setManualRollNo] = useState('');
    const [manualReason, setManualReason] = useState('Technical Issue');

    // If no class was selected (e.g., user navigates directly), redirect back to the dashboard
    useEffect(() => {
        if (!selectedClass) {
            navigate('/teacher/dashboard');
        }
    }, [selectedClass, navigate]);

    const handleSessionToggle = () => {
        if (!selectedSubject) {
            alert("Please select a subject first.");
            return;
        }
        setSessionActive(!sessionActive);
        if (sessionActive) {
            // Logic to stop session and finalize attendance
            console.log("Attendance session stopped.");
        } else {
            // Logic to start session
            console.log(`Attendance session started for ${selectedSubject}`);
            // Clear previous session data
            setPresentStudents([]);
        }
    };

    const handleManualSubmit = (e) => {
        e.preventDefault();
        if (!manualRollNo.trim()) {
            alert("Please enter a student roll number.");
            return;
        }
        
        // Simulate adding a student manually
        const newStudent = {
            id: `manual-${Date.now()}`,
            name: `Student (Roll: ${manualRollNo})`,
            rollNo: manualRollNo,
            time: new Date().toLocaleTimeString(),
            markedBy: 'MANUAL_TEACHER' // Flag for manual entry
        };

        setPresentStudents(prev => [...prev, newStudent]);
        
        // Reset form and close modal
        setManualRollNo('');
        setManualReason('Technical Issue');
        setIsModalOpen(false);
    };

    if (!selectedClass) return null; // Render nothing while redirecting

    return (
        <>
            <Card>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{selectedClass.name}</h2>
                        <p className="text-gray-500">Manage live attendance session.</p>
                    </div>
                    <Button onClick={() => navigate('/teacher/dashboard')} variant="secondary">Back to Classes</Button>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        {/* Subject Selector */}
                        <div className="md:col-span-1">
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Select Subject</label>
                            <select
                                id="subject"
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                disabled={sessionActive}
                            >
                                <option value="" disabled>-- Choose a subject --</option>
                                {selectedClass.subjects.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="md:col-span-2 flex items-center space-x-4">
                            <div className="flex-grow">
                                <Button onClick={handleSessionToggle} variant={sessionActive ? 'danger' : 'primary'} fullWidth={true}>
                                    {sessionActive ? 'Stop Attendance Session' : 'Start Attendance Session'}
                                </Button>
                            </div>
                            {/* ADD MANUAL ENTRY BUTTON - Only visible when session is active */}
                            {sessionActive && (
                                <div className="flex-grow">
                                    <Button onClick={() => setIsModalOpen(true)} variant="secondary" fullWidth={true}>
                                        + Add Manual Entry
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Live Attendance Table */}
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-700">Live Attendance</h3>
                        <span className="text-lg font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                            {presentStudents.length} / {selectedClass.studentCount} Present
                        </span>
                    </div>
                    <div className="overflow-x-auto border rounded-lg">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No.</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll Number</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Marked</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry Type</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {presentStudents.length > 0 ? (
                                    presentStudents.map((student, index) => (
                                        <tr key={student.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{student.rollNo}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{student.time}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {student.markedBy === 'MANUAL_TEACHER' ? (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                        Manual
                                                    </span>
                                                ) : (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Automated
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-10 text-gray-500">
                                            {sessionActive ? "Waiting for students to mark attendance..." : "Start a session to see live data."}
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
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700">Student Roll Number</label>
                                    <Input
                                        id="rollNo"
                                        type="text"
                                        value={manualRollNo}
                                        onChange={(e) => setManualRollNo(e.target.value)}
                                        placeholder="Enter roll number"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason</label>
                                    <select
                                        id="reason"
                                        value={manualReason}
                                        onChange={(e) => setManualReason(e.target.value)}
                                        className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option>Technical Issue</option>
                                        <option>Device Unavailable</option>
                                        <option>Special Permission</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-4">
                                <Button type="button" onClick={() => setIsModalOpen(false)} variant="secondary">
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary">
                                    Mark Present
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ClassManagementPage;

