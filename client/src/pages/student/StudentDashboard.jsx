import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import { Calendar, BarChart2, ScanFace } from 'lucide-react'; // Added ScanFace icon

const StudentDashboard = () => {
    const navigate = useNavigate();
    // In a real app, this would be from logged in user context
    const studentName = "John Doe";

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {studentName}!</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Mark Attendance Card */}
                <Card extraClasses="flex flex-col justify-between">
                    <div>
                        <div className="flex items-center text-blue-600 mb-3">
                            <Calendar className="w-6 h-6 mr-2" />
                            <h3 className="text-xl font-bold">Mark Today's Attendance</h3>
                        </div>
                        <p className="text-gray-600 mb-4">Proceed to the verification process to mark yourself present for today's class.</p>
                    </div>
                    <Button onClick={() => navigate('/student/attendance')}>Proceed to Verification</Button>
                </Card>

                {/* (New) Face Registration Card */}
                <Card extraClasses="flex flex-col justify-between bg-blue-50 border-blue-200">
                    <div>
                        <div className="flex items-center text-indigo-600 mb-3">
                            <ScanFace className="w-6 h-6 mr-2" />
                            <h3 className="text-xl font-bold">Register Your Face</h3>
                        </div>
                        <p className="text-gray-600 mb-4">Complete the one-time face registration to enable secure biometric attendance.</p>
                    </div>
                    <Button onClick={() => navigate('/student/register-face')} variant="secondary">Start Registration</Button>
                </Card>

                {/* View Report Card */}
                <Card extraClasses="flex flex-col justify-between">
                     <div>
                        <div className="flex items-center text-green-600 mb-3">
                            <BarChart2 className="w-6 h-6 mr-2" />
                            <h3 className="text-xl font-bold">View My Report</h3>
                        </div>
                        <p className="text-gray-600 mb-4">Check your overall attendance percentage and detailed subject-wise reports.</p>
                    </div>
                    <Button onClick={() => navigate('/student/report')} variant="secondary">View Report</Button>
                </Card>

            </div>
        </div>
    );
};

export default StudentDashboard;

