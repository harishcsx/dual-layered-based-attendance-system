import React from 'react';

const VerificationSpinner = ({ text }) => (
    <div className="flex flex-col items-center justify-center text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="text-lg font-semibold text-gray-700">{text}</p>
    </div>
);

export default VerificationSpinner;

 