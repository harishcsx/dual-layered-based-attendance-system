import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import { Camera, CheckCircle, AlertTriangle, Loader } from 'lucide-react';

const FaceRegistration = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Instructions, 2: Camera, 3: Confirm, 4: Loading, 5: Done
    const [capturedImage, setCapturedImage] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setStep(2);
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Could not access camera. Please check permissions and try again.");
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            const dataUrl = canvas.toDataURL('image/png');
            setCapturedImage(dataUrl);
            stopCamera();
            setStep(3);
        }
    };

    const handleConfirm = async () => {
        setStep(4); // Show loading spinner
        // --- API CALL SIMULATION ---
        // In a real app, you would convert the dataUrl to a Blob/File
        // and send it to your backend API for processing and storage.
        console.log("Uploading image for processing...");
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
        console.log("Processing complete!");
        // --- END SIMULATION ---
        setStep(5);
    };

    useEffect(() => {
        // Cleanup function to stop camera if component unmounts
        return () => stopCamera();
    }, []);

    const renderContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="text-center">
                        <Camera className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Face Registration</h2>
                        <p className="text-gray-600 mb-6">This is a one-time setup. Please ensure you are in a well-lit area and look directly into the camera.</p>
                        <Button onClick={startCamera} size="large">Start Camera</Button>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h3 className="text-xl font-semibold text-center mb-4">Position Your Face in the Frame</h3>
                        <div className="bg-black rounded-lg overflow-hidden aspect-video">
                            <video ref={videoRef} autoPlay playsInline className="w-full h-full"></video>
                        </div>
                        <canvas ref={canvasRef} className="hidden"></canvas>
                        <div className="mt-6">
                            <Button onClick={handleCapture} size="large">Capture Image</Button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-4">Confirm Your Image</h3>
                        <img src={capturedImage} alt="Captured face" className="rounded-lg mb-6 mx-auto" />
                        <div className="flex justify-center space-x-4">
                            <Button onClick={() => setStep(1)} variant="secondary">Retake</Button>
                            <Button onClick={handleConfirm}>Confirm & Upload</Button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="text-center py-12">
                        <Loader className="w-12 h-12 mx-auto text-blue-500 animate-spin mb-4" />
                        <p className="text-lg text-gray-600">Uploading and processing your data securely...</p>
                    </div>
                );
            case 5:
                return (
                    <div className="text-center py-12">
                        <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Registration Complete!</h2>
                        <p className="text-gray-600 mb-6">You can now use facial recognition to mark your attendance.</p>
                        <Button onClick={() => navigate('/student/dashboard')}>Back to Dashboard</Button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                {renderContent()}
            </Card>
        </div>
    );
};

export default FaceRegistration;

