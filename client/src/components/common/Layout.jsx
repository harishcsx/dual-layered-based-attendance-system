import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button.jsx';

const Layout = ({ children, loggedInUser, handleLogout }) => {
    const navigate = useNavigate();

    const onLogoutClick = () => {
        // First, call the function from App.jsx to clear the user state
        handleLogout();
        // Then, programmatically navigate the user to the landing page
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm sticky top-0 z-40">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => navigate('/')}>
                                TuringX
                            </h1>
                        </div>
                        {loggedInUser && (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-600 hidden sm:block">Welcome, {loggedInUser.name}!</span>
                                <div className="w-24">
                                     <Button onClick={onLogoutClick} variant="secondary" fullWidth={false}>Logout</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </header>
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;

