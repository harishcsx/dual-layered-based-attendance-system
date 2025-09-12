import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';

// Import Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import StudentDashboard from './pages/student/StudentDashboard';
import AttendanceFlow from './pages/student/AttendanceFlow';
import StudentReport from './pages/student/StudentReport';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import ClassManagementPage from './pages/teacher/ClassManagementPage';
import OrganizationDashboard from './pages/organization/OrganizationDashboard';
import ClassForm from './pages/organization/ClassForm';

// Import Common Components
import Layout from './components/common/Layout';

function App() {
    const [userRole, setUserRole] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);

    // This component acts as a wrapper for all protected routes
    const LayoutWrapper = () => {
        const navigate = useNavigate();

        const handleLogout = () => {
            setLoggedInUser(null);
            setUserRole(null);
            navigate('/'); // Redirect to landing page on logout
        };

        // If a user is not logged in, redirect them to the authentication page
        if (!loggedInUser) {
            return <Navigate to="/auth" />;
        }

        // If logged in, render the main layout which includes a header and a space for the page content
        return (
            <Layout loggedInUser={loggedInUser} handleLogout={handleLogout}>
                <Outlet /> {/* Renders the active nested route's component */}
            </Layout>
        );
    };

    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes that are accessible without logging in */}
                <Route path="/" element={loggedInUser ? <Navigate to={`/${userRole}-dashboard`} /> : <LandingPage />} />
                <Route path="/auth" element={loggedInUser ? <Navigate to={`/${userRole}-dashboard`} /> : <AuthPage setUserRole={setUserRole} setLoggedInUser={setLoggedInUser} />} />

                {/* Protected routes that require a user to be logged in */}
                {/* These routes are wrapped by the LayoutWrapper */}
                <Route element={<LayoutWrapper />}>
                    <Route path="/student-dashboard" element={<StudentDashboard />} />
                    <Route path="/attendance-flow" element={<AttendanceFlow />} />
                    <Route path="/student-report" element={<StudentReport />} />
                    <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                    <Route path="/class-management" element={<ClassManagementPage />} />
                    <Route path="/organization-dashboard" element={<OrganizationDashboard />} />
                    <Route path="/class-form" element={<ClassForm />} />
                </Route>

                {/* A fallback route to redirect any unknown paths to the landing page */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

