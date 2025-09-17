import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/common/Card.jsx';
import Button from '@/components/common/Button.jsx';
import { MOCK_ORGANIZATION_DATA } from '@/constants/mockData.js';
import { Edit, Trash2, Plus, BarChart3 } from 'lucide-react';

const OrganizationDashboard = () => {
    const navigate = useNavigate();
    
    // FIX: Provide a default empty array to prevent the '.map' error.
    // The optional chaining (?.) also protects against MOCK_ORGANIZATION_DATA itself being undefined.
    const classes = MOCK_ORGANIZATION_DATA?.classes || [];

    const handleEdit = (cls) => {
        // Navigate to the form with the class data for editing
        navigate('/organization/class-form', { state: { editingClass: cls } });
    };
    
    const handleCreate = () => {
        // Navigate to the form without any data to create a new class
        navigate('/organization/class-form');
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
                <div className="flex space-x-4">
                    <Button onClick={() => navigate('/analysis')} variant="secondary">
                         <BarChart3 className="w-5 h-5 mr-2" />
                        View Analytics
                    </Button>
                    <Button onClick={handleCreate}>
                        <Plus className="w-5 h-5 mr-2" />
                        Create New Class
                    </Button>
                </div>
            </div>
            
            <Card>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Manage Classes</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned Teachers</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Students</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {classes.length > 0 ? (
                                classes.map(cls => (
                                    <tr key={cls.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{cls.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{cls.teacherCount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{cls.studentCount}</td>
                                        <td className="px-6 py-4 flex items-center space-x-4">
                                            <button onClick={() => handleEdit(cls)} className="text-blue-600 hover:text-blue-800">
                                                <Edit size={20} />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800">
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-10 text-gray-500">
                                        No classes have been created yet.
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

export default OrganizationDashboard;

