import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import { MOCK_STUDENT_DATA } from '../../constants/mockData.js';

const StudentReport = () => {
    const navigate = useNavigate();
    const { name, attendance } = MOCK_STUDENT_DATA;
    const overallPercentage = attendance.reduce((acc, subject) => acc + subject.percentage, 0) / attendance.length;

    const ProgressBar = ({ percentage, subject }) => {
        const bgColor = percentage >= 75 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500';
        return (
            <div>
                <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-gray-700">{subject}</span>
                    <span className={`text-sm font-medium ${bgColor.replace('bg-', 'text-')}`}>{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className={`${bgColor} h-4 rounded-full`} style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
        );
    };

    return (
        <div>
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Attendance Report for {name}</h2>
                <div className="w-40">
                    <Button onClick={() => navigate('/student-dashboard')} variant="secondary">Back to Dashboard</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <Card className="text-center">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Overall Attendance</h3>
                        <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full w-40 h-40 bg-gray-200">
                             <div className={`absolute top-0 left-0 w-full h-full bg-green-500`} style={{clipPath: `inset(0 ${100 - overallPercentage}% 0 0)`}}></div>
                             <div className="relative z-10 text-4xl font-bold text-gray-800">{Math.round(overallPercentage)}%</div>
                        </div>
                    </Card>
                </div>
                <div className="md:col-span-2">
                    <Card>
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Subject-wise Breakdown</h3>
                        <div className="space-y-4">
                            {attendance.map(item => (
                                <ProgressBar key={item.subject} subject={item.subject} percentage={item.percentage} />
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default StudentReport;

