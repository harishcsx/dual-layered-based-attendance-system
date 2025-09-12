import React from 'react';

const Button = ({ children, onClick, disabled = false, fullWidth = true, variant = 'primary' }) => {
    const baseStyle = "text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform transform hover:scale-105";
    const widthStyle = fullWidth ? "w-full" : "";

    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
        secondary: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500",
        danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
    };

    const disabledStyle = "disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none";

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${widthStyle} ${variants[variant]} ${disabledStyle}`}
        >
            {children}
        </button>
    );
};

export default Button;

