import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import { Edit, Trash2 } from 'lucide-react';

const OrganizationDashboard = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([
        { id: 1, name: 'B.Tech CSE - Section A', teachers: 'T01, T02', students: 60 },
        { id: 2, name: 'B.Tech IT - Section B', teachers: 'T03', students: 55 },
    ]);

    const handleEdit = (cls) => {
        navigate('/class-form', { state: { editingClass: cls } });
    };

    const handleCreate = () => {
        navigate('/class-form'); // Navigate without any state for creation
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
                <div className="w-48">
                    <Button onClick={handleCreate}>+ Create New Class</Button>
                </div>
            </div>
            <Card>
                 <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned Teachers</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Students</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                         <tbody className="divide-y divide-gray-200">
                            {classes.map(cls => (
                                <tr key={cls.id}>
                                    <td className="px-6 py-4 font-medium">{cls.name}</td>
                                    <td className="px-6 py-4">{cls.teachers}</td>
                                    <td className="px-6 py-4">{cls.students}</td>
                                    <td className="px-6 py-4 flex items-center space-x-4">
                                        <button onClick={() => handleEdit(cls)} className="text-blue-600 hover:text-blue-800"><Edit size={20} /></button>
                                        <button className="text-red-600 hover:text-red-800"><Trash2 size={20} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default OrganizationDashboard;



