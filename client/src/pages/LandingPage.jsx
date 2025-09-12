import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button.jsx';
import { ShieldCheck, ScanFace, BarChart3 } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <ShieldCheck size={40} className="text-indigo-500" />,
            title: "Proxy-Proof Security",
            description: "Combines IP address verification with facial recognition to eliminate proxy attendance."
        },
        {
            icon: <ScanFace size={40} className="text-indigo-500" />,
            title: "Biometric Verification",
            description: "Ensures the right student is marking their attendance every single time with secure face scanning."
        },
        {
            icon: <BarChart3 size={40} className="text-indigo-500" />,
            title: "Real-time Analytics",
            description: "Provides instant attendance reports and graphical insights for students and teachers."
        }
    ];

    // CSS for blob animation.
    const animationStyle = `
        @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
        }
    `;

    return (
        <>
            <style>{animationStyle}</style>
            <div className="w-full bg-white">
                {/* Hero Section */}
                <div className="relative bg-gray-50 overflow-hidden">
                    {/* New Data Visualization Background */}
                    <div 
                        className="absolute inset-0" 
                        style={{
                            backgroundImage: 'url(\'data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23bfdbfe" fill-opacity="0.4"%3E%3Crect x="10" y="60" width="10" height="40" /%3E%3Crect x="30" y="40" width="10" height="60" /%3E%3Crect x="50" y="20" width="10" height="80" /%3E%3Crect x="70" y="50" width="10" height="50" /%3E%3Ccircle cx="90" cy="10" r="3" /%3E%3Ccircle cx="85" cy="30" r="2" /%3E%3Ccircle cx="95" cy="45" r="2" /%3E%3Ccircle cx="15" cy="15" r="2" /%3E%3Ccircle cx="5" cy="45" r="1" /%3E%3Ccircle cx="35" cy="90" r="1" /%3E%3C/g%3E%3C/svg%3E\')',
                            backgroundSize: '300px'
                        }}>
                    </div>
                    
                    {/* Softer Animated Blobs */}
                    <div className="absolute top-0 -left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-[blob_7s_infinite]"></div>
                    <div className="absolute top-0 -right-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-[blob_7s_infinite_2s]"></div>

                    <div className="container mx-auto px-6 text-center py-20 lg:py-32 relative z-10">
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
                            The Future of Attendance is Here.
                        </h1>
                        <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
                            Secure, seamless, and smart. Our dual-layered system ensures academic integrity by making proxy attendance a thing of the past.
                        </p>
                        <div className="w-48 mx-auto">
                             <Button onClick={() => navigate('/auth')} size="large">Get Started</Button>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-20 lg:py-24">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                             <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">Why Choose TuringX?</h2>
                             <p className="text-gray-500 mt-3 text-lg">The ultimate solution for modern academic institutions.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {features.map((feature, index) => (
                                <div key={index} className="text-center p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex items-center justify-center h-16 w-16 bg-indigo-100 rounded-full mx-auto mb-6">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-100 border-t border-gray-200">
                    <div className="container mx-auto px-6 py-6 text-center text-gray-500">
                        &copy; {new Date().getFullYear()} TuringX. All Rights Reserved.
                    </div>
                </footer>
            </div>
        </>
    );
};

export default LandingPage;

