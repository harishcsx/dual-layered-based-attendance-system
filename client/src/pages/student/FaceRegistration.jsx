import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/common/Card.jsx';
import Button from '@/components/common/Button.jsx';
import { Camera, CheckCircle, AlertTriangle, Loader } from 'lucide-react';

const FaceRegistration = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [capturedImage, setCapturedImage] = useState(null);
    const [stream, setStream] = useState(null); // State to hold the camera stream
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startCamera = async () => {
        console.log("Step 1: Attempting to get camera stream...");
        try {
            const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
            console.log("Step 2: Stream obtained successfully.");
            setStream(cameraStream); // Store the stream in state
            setStep(2); // Move to the camera view
        } catch (err) {
            console.error("CRITICAL ERROR accessing camera:", err.name, err.message);
            alert(`Could not access camera. Error: ${err.name}.`);
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            console.log("Camera stream stopped.");
            setStream(null);
        }
    };

    // FIX: Use useEffect to attach the stream only after the video element is rendered.
    useEffect(() => {
        if (step === 2 && stream && videoRef.current) {
            console.log("Step 3: Attaching stream to video element.");
            videoRef.current.srcObject = stream;
        }
    }, [step, stream]);


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
    
    const handleCanPlay = async () => {
        console.log("Step 4: Video metadata loaded. Attempting to play...");
        if (videoRef.current) {
            try {
                await videoRef.current.play();
                console.log("Step 5: Video playback started successfully!");
            } catch (e) {
                console.error("CRITICAL ERROR: Failed to play video.", e);
            }
        }
    };

    const handleConfirm = async () => {
        setStep(4);
        console.log("Uploading image for processing...");
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log("Processing complete!");
        setStep(5);
    };


    useEffect(() => {
        // Cleanup function to ensure camera stops if we navigate away
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
                            <video 
                                ref={videoRef} 
                                onLoadedMetadata={handleCanPlay}
                                autoPlay 
                                playsInline 
                                muted 
                                className="w-full h-full"
                            ></video>
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
                            <Button onClick={startCamera} variant="secondary">Retake</Button>
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
                        <Button onClick={() => navigate('/student-dashboard')}>Back to Dashboard</Button>
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

