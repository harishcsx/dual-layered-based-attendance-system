import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { MOCK_STUDENT_DATA, MOCK_TEACHER_DATA, MOCK_ORGANIZATION_DATA } from '../constants/mockData';

const AuthPage = ({ setUserRole, setLoggedInUser }) => {
    const [mode, setMode] = useState('login'); // 'login' or 'signup'
    const [activeTab, setActiveTab] = useState('student'); // 'student', 'teacher', 'organization'
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        // In a real app, you would make an API call here.
        setTimeout(() => { // Simulate API call
            if (activeTab === 'student') setLoggedInUser(MOCK_STUDENT_DATA);
            if (activeTab === 'teacher') setLoggedInUser(MOCK_TEACHER_DATA);
            if (activeTab === 'organization') setLoggedInUser(MOCK_ORGANIZATION_DATA);
            
            setUserRole(activeTab);
            navigate(`/${activeTab}-dashboard`); // Navigate to the correct dashboard
            setLoading(false);
        }, 1000);
    };

    const TabButton = ({ role, label }) => (
        <button
            onClick={() => setActiveTab(role)}
            className={`w-full py-3 text-sm font-semibold border-b-4 transition-colors ${activeTab === role ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
            {label}
        </button>
    );

    const renderFormFields = () => {
        const isLogin = mode === 'login';
        switch (activeTab) {
            case 'student':
                return (
                    <>
                        {!isLogin && <Input id="studentName" label="Full Name" />}
                        <Input id="studentRoll" label="Roll Number" />
                        <Input id="password" label="Password" type="password" />
                        {!isLogin && <Input id="confirmPassword" label="Confirm Password" type="password" />}
                    </>
                );
            case 'teacher':
                return (
                    <>
                        {!isLogin && <Input id="teacherName" label="Full Name" />}
                        <Input id="teacherId" label="Teacher ID" />
                        <Input id="password" label="Password" type="password" />
                        {!isLogin && <Input id="confirmPassword" label="Confirm Password" type="password" />}
                    </>
                );
            case 'organization':
                 return (
                    <>
                        {!isLogin && <Input id="orgName" label="Organization Name" />}
                        <Input id="orgId" label="Organization ID" />
                        <Input id="password" label="Password" type="password" />
                        {!isLogin && <Input id="confirmPassword" label="Confirm Password" type="password" />}
                    </>
                );
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
                    {mode === 'login' ? 'Sign in to your account' : 'Create an account'}
                </h2>
                <Card>
                    <div className="flex border-b mb-4">
                        <TabButton role="student" label="Student" />
                        <TabButton role="teacher" label="Teacher" />
                        <TabButton role="organization" label="Organization" />
                    </div>
                    <form onSubmit={handleLogin}>
                        {renderFormFields()}
                        <div className="mt-6">
                            <Button disabled={loading}>
                                {loading ? 'Loading...' : (mode === 'login' ? 'Log In' : 'Sign Up')}
                            </Button>
                        </div>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="font-medium text-blue-600 hover:text-blue-500 ml-1">
                            {mode === 'login' ? 'Sign Up' : 'Log In'}
                        </button>
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default AuthPage;

