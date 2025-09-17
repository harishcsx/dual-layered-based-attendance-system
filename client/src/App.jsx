import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Page Imports
import LandingPage from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import StudentDashboard from './pages/student/StudentDashboard.jsx';
import AttendanceFlow from './pages/student/AttendanceFlow.jsx';
import StudentReport from './pages/student/StudentReport.jsx';
import TeacherDashboard from './pages/teacher/TeacherDashboard.jsx';
import ClassManagementPage from './pages/teacher/ClassManagementPage.jsx';
import OrganizationDashboard from './pages/organization/OrganizationDashboard.jsx';
import ClassForm from './pages/organization/ClassForm.jsx';
import AnalysisPage from './pages/common/AnalysisPage.jsx';
import FaceRegistration from './pages/student/FaceRegistration.jsx';

// Common Component Imports
import Layout from './components/common/Layout.jsx';

function App() {
    // In a real app, this would come from a context or auth service
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const handleLogout = () => {
        setLoggedInUser(null);
        setUserRole(null);
    };

    return (
        <Router>
            <Layout loggedInUser={loggedInUser} handleLogout={handleLogout}>
                <Routes>
                    {/* Public Routes */}
                                   <Route path="/" element={loggedInUser ? <Navigate to={`/${userRole}-dashboard`} /> : <LandingPage />} />
                <Route path="/auth" element={loggedInUser ? <Navigate to={`/${userRole}-dashboard`} /> : <AuthPage setUserRole={setUserRole} setLoggedInUser={setLoggedInUser} />} />


                    {/* Student Routes */}
                    <Route path="/student-dashboard" element={<StudentDashboard />} />
                    <Route path="/attendance-flow" element={<AttendanceFlow />} />
                    <Route path="/student/report" element={<StudentReport />} />
                    <Route path="/student/register-face" element={<FaceRegistration />} />

                    {/* Teacher Routes */}
                    <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                    <Route path="/class-management" element={<ClassManagementPage />} />

                    {/* Organization Routes */}
                    <Route path="/organization-dashboard" element={<OrganizationDashboard />} />
                    <Route path="/organization/class-form" element={<ClassForm />} />
                    
                    {/* Common Routes for Teacher/Org */}
                    <Route path="/analysis" element={<AnalysisPage />} />

                    {/* Redirect any unknown paths */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;

