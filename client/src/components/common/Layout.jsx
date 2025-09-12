import React from 'react';
import Button from './Button.jsx';

const Layout = ({ children, loggedInUser, handleLogout }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold text-gray-800">TuringX</h1>
                        </div>
                        {loggedInUser && (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-600 hidden sm:block">Welcome, {loggedInUser.name}!</span>
                                <div className="w-24">
                                     <Button onClick={handleLogout} variant="secondary" fullWidth={false}>Logout</Button>
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

