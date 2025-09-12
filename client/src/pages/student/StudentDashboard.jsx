import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Calendar, BarChart2 } from 'lucide-react';

const StudentDashboard = () => {
    // alert("hello")
    const navigate = useNavigate();

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Student Dashboard</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="flex flex-col items-center justify-center text-center p-8 hover:shadow-lg transition-shadow">
                     <Calendar size={48} className="text-blue-500 mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">Mark Today's Attendance</h3>
                    <p className="text-gray-600 mb-6">Proceed to network and face verification.</p>
                    <div className="w-full max-w-xs">
                        <Button onClick={() => navigate('/attendance-flow')}>Proceed to Verification</Button>
                    </div>
                </Card>
                 <Card className="flex flex-col items-center justify-center text-center p-8 hover:shadow-lg transition-shadow">
                    <BarChart2 size={48} className="text-green-500 mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">View My Attendance Report</h3>
                    <p className="text-gray-600 mb-6">Check your overall and subject-wise analytics.</p>
                     <div className="w-full max-w-xs">
                        <Button onClick={() => navigate('/student-report')} variant="secondary">View Report</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default StudentDashboard;

