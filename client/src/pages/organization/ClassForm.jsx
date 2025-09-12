import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '@/components/common/Card.jsx';
import Input from '@/components/common/Input.jsx';
import Button from '@/components/common/Button.jsx';

const ClassForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { editingClass } = location.state || {}; // Safely get class data for editing

    const [formData, setFormData] = useState({
        name: '',
        teachers: '',
        students: '',
        subjects: '',
        ipAddress: ''
    });

    useEffect(() => {
        // If we are editing, populate the form with existing class data
        if (editingClass) {
            setFormData({
                name: editingClass.name || '',
                teachers: editingClass.teachers || '',
                students: `Total: ${editingClass.students}` || '', // This would be a list in a real app
                subjects: 'Data Structures, Algorithms', // Mock data
                ipAddress: '192.168.1.1' // Mock data
            });
        }
    }, [editingClass]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would call your API to save or update the class
        console.log("Form data submitted:", formData);
        navigate('/organization-dashboard'); // Go back to the dashboard after submission
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {editingClass ? `Edit Class: ${editingClass.name}` : 'Create New Class'}
            </h2>
            <Card>
                <form onSubmit={handleSubmit}>
                    <Input id="name" label="Class Name" value={formData.name} onChange={handleChange} />
                    <Input id="teachers" label="Assigned Teacher IDs (comma-separated)" value={formData.teachers} onChange={handleChange} />
                    <div>
                         <label htmlFor="students" className="block text-sm font-medium text-gray-700 mb-1">Student Roll Numbers (comma-separated)</label>
                         <textarea id="students" rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" value={formData.students} onChange={handleChange}></textarea>
                    </div>
                     <Input id="subjects" label="Subjects (comma-separated)" value={formData.subjects} onChange={handleChange} />
                     <Input id="ipAddress" label="Class Wi-Fi IP Address" value={formData.ipAddress} onChange={handleChange} />

                    <div className="mt-6 flex gap-4">
                        <Button type="submit">
                            {editingClass ? 'Update Class' : 'Save Class'}
                        </Button>
                        <Button type="button" onClick={() => navigate('/organization-dashboard')} variant="secondary">
                            Cancel
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default ClassForm;

