import React from 'react';

const Card = ({ children, className = '' }) => (
    <div className={`bg-white p-6 md:p-8 rounded-xl shadow-md ${className}`}>
        {children}
    </div>
);

export default Card;

