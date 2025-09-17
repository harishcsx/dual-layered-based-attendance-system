import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';
import { BarChart, PieChart, Users, Percent } from 'lucide-react';
import { MOCK_TEACHER_DATA } from '../../constants/mockData.js'; // Using mock data for demo

const AnalysisPage = () => {
    const navigate = useNavigate();
    const [selectedClass, setSelectedClass] = useState(MOCK_TEACHER_DATA.classes[0]?.name || '');
    const [rollNo, setRollNo] = useState('');

    // Dummy data for charts - replace with API data
    const classAnalytics = {
        averageAttendance: 82,
        totalStudents: 60,
        topAbsentees: ['S-105', 'S-112', 'S-121']
    };

    const studentAnalytics = {
        attendancePercentage: 75,
        presentDays: 45,
        absentDays: 15,
    };

    const handleSearch = () => {
        // In a real app, this would trigger an API call with the filters
        console.log(`Fetching analytics for Class: ${selectedClass}, Roll No: ${rollNo}`);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Attendance Analytics</h2>
                {/* A generic back button could be useful */}
                <Button onClick={() => navigate(-1)} variant="secondary">Back</Button>
            </div>

            {/* Filter Section */}
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Filter by Class</label>
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        >
                            {MOCK_TEACHER_DATA.classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Filter by Student Roll No.</label>
                        <Input
                            type="text"
                            placeholder="e.g., S-101"
                            value={rollNo}
                            onChange={(e) => setRollNo(e.target.value)}
                        />
                    </div>
                    <div className="lg:col-start-4">
                        <Button onClick={handleSearch}>Search</Button>
                    </div>
                </div>
            </Card>

            {/* Analytics Display Section */}
            <div className="mt-8">
                {rollNo ? (
                    // Student-specific view
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Report for Roll No: {rollNo}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card>
                                <div className="flex items-center">
                                    <Percent className="w-8 h-8 text-blue-500 mr-4" />
                                    <div>
                                        <p className="text-gray-500">Overall Attendance</p>
                                        <p className="text-2xl font-bold">{studentAnalytics.attendancePercentage}%</p>
                                    </div>
                                </div>
                            </Card>
                             <Card>
                                <div className="flex items-center">
                                    <Users className="w-8 h-8 text-green-500 mr-4" />
                                    <div>
                                        <p className="text-gray-500">Days Present</p>
                                        <p className="text-2xl font-bold">{studentAnalytics.presentDays}</p>
                                    </div>
                                </div>
                            </Card>
                             <Card>
                                <div className="flex items-center">
                                    <Users className="w-8 h-8 text-red-500 mr-4" />
                                    <div>
                                        <p className="text-gray-500">Days Absent</p>
                                        <p className="text-2xl font-bold">{studentAnalytics.absentDays}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                         <Card extraClasses="mt-6">
                             <h4 className="font-bold mb-2">Attendance Breakdown</h4>
                             <p className="text-center text-gray-500">(Pie chart visualization would be here)</p>
                             <PieChart className="w-32 h-32 mx-auto text-gray-300 mt-4"/>
                        </Card>
                    </div>
                ) : (
                    // Class-level view
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Report for {selectedClass}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           <Card>
                                <div className="flex items-center">
                                    <Percent className="w-8 h-8 text-blue-500 mr-4" />
                                    <div>
                                        <p className="text-gray-500">Average Attendance</p>
                                        <p className="text-2xl font-bold">{classAnalytics.averageAttendance}%</p>
                                    </div>
                                </div>
                            </Card>
                            <Card>
                                <div className="flex items-center">
                                    <Users className="w-8 h-8 text-gray-500 mr-4" />
                                    <div>
                                        <p className="text-gray-500">Total Students</p>
                                        <p className="text-2xl font-bold">{classAnalytics.totalStudents}</p>
                                    </div>
                                </div>
                            </Card>
                            <Card>
                                 <h4 className="font-bold text-gray-700">Top Absentees</h4>
                                 <ul className="list-disc list-inside mt-2 text-red-600">
                                     {classAnalytics.topAbsentees.map(r => <li key={r}>{r}</li>)}
                                 </ul>
                            </Card>
                        </div>
                        <Card extraClasses="mt-6">
                            <h4 className="font-bold mb-2">Overall Class Performance</h4>
                            <p className="text-center text-gray-500">(Bar chart visualization would be here)</p>
                            <BarChart className="w-full h-48 mx-auto text-gray-300 mt-4"/>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalysisPage;

