import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import { MOCK_TEACHER_DATA } from '../../constants/mockData.js';
import { BarChart3 } from 'lucide-react'; // Added icon

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const { classes } = MOCK_TEACHER_DATA;

    const handleManageClick = (cls) => {
        navigate('/class-management', { state: { selectedClass: cls } });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                 <h2 className="text-3xl font-bold text-gray-800">My Classes</h2>
                 {/* (New) Analytics Button */}
                 <Button onClick={() => navigate('/analysis')} variant="primary">
                     <BarChart3 className="w-5 h-5 mr-2" />
                     View Analytics
                 </Button>
            </div>
            
            {classes.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map(cls => (
                        <Card key={cls.id} extraClasses="flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{cls.name}</h3>
                                <p className="text-gray-600 mb-4">Subjects: {cls.subjects.join(', ')}</p>
                            </div>
                            <Button onClick={() => handleManageClick(cls)}>Manage Attendance</Button>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <p className="text-center text-gray-600">You have not been assigned to any classes yet.</p>
                </Card>
            )}
        </div>
    );
};

export default TeacherDashboard;

