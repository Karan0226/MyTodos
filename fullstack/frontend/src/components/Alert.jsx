import React from 'react';

const Alert = ({ type, message, onClose }) => {
  const alertClasses = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700'
  };

  return (
    <div className={`border px-4 py-3 rounded mb-4 ${alertClasses[type]}`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-xl leading-none hover:opacity-75"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Alert;