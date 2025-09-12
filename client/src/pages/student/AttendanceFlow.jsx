import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import VerificationSpinner from '../../components/VerificationSpinner';
import { ScanFace, CheckCircle, XCircle } from 'lucide-react';

const AttendanceFlow = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: IP, 2: Face, 3: Result
    const [status, setStatus] = useState('verifying'); // verifying, success, failure

    useEffect(() => {
        let timer;
        if (step === 1 && status === 'verifying') {
            timer = setTimeout(() => {
                const isSuccess = Math.random() > 0.2; // 80% success rate
                if (isSuccess) {
                    setStatus('success');
                    setTimeout(() => {
                        setStep(2);
                        setStatus('verifying');
                    }, 2000);
                } else {
                    setStatus('failure');
                }
            }, 3000);
        } else if (step === 2 && status === 'verifying') {
             timer = setTimeout(() => {
                const isSuccess = Math.random() > 0.2;
                setStatus(isSuccess ? 'success' : 'failure');
                setStep(3);
            }, 4000);
        }
        return () => clearTimeout(timer);
    }, [step, status]);

    const renderStepContent = () => {
        switch (step) {
            case 1: // IP Verification
                if (status === 'verifying') return <VerificationSpinner text="Connecting to Class Network..." />;
                if (status === 'success') return <div className="text-center text-green-600"><CheckCircle size={64} className="mx-auto mb-4" /><h3 className="text-2xl font-bold">Network Verified!</h3><p>Proceeding to face verification...</p></div>;
                if (status === 'failure') return <div className="text-center text-red-600"><XCircle size={64} className="mx-auto mb-4" /><h3 className="text-2xl font-bold">Connection Failed!</h3><p className="mb-4">Please connect to the correct class Wi-Fi.</p><Button onClick={() => setStatus('verifying')}>Retry</Button></div>;
                return null;
            case 2: // Face Verification
                if (status === 'verifying') return (
                    <div className="text-center">
                        <ScanFace size={64} className="mx-auto mb-4 text-blue-500 animate-pulse" />
                        <h3 className="text-2xl font-bold mb-2">Face Verification</h3>
                        <p className="text-gray-600 mb-4">Please position your face within the frame.</p>
                        <div className="w-full max-w-xs mx-auto bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">[Camera Feed Placeholder]</p>
                        </div>
                         <VerificationSpinner text="Scanning..." />
                    </div>
                );
                return null;
            case 3: // Result
                 if (status === 'success') return <div className="text-center text-green-600"><CheckCircle size={64} className="mx-auto mb-4" /><h3 className="text-2xl font-bold">Attendance Marked! ✅</h3><p className="mb-4">You have been marked present.</p><Button onClick={() => navigate('/student-dashboard')}>Back to Dashboard</Button></div>;
                 if (status === 'failure') return <div className="text-center text-red-600"><XCircle size={64} className="mx-auto mb-4" /><h3 className="text-2xl font-bold">Verification Failed ❌</h3><p className="mb-4">Please try again with good lighting.</p><Button onClick={() => { setStep(2); setStatus('verifying'); }}>Retry Face Scan</Button></div>;
                return null;
            default: return null;
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Attendance Verification</h2>
            <Card>
                <div className="min-h-[400px] flex items-center justify-center">
                    {renderStepContent()}
                </div>
            </Card>
        </div>
    );
};

export default AttendanceFlow;

