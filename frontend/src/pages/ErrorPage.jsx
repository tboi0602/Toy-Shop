import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate=useNavigate();
    return (
        <div className="flex items-center justify-center h-screen bg-red-50 px-4">
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg text-center w-full max-w-md">
                <p className="text-red-600 text-xl md:text-2xl font-semibold mb-6">
                    You cannot enter this page!
                </p>
                <button
                    onClick={() => navigate("/dashboard-customer")}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded transition duration-300 w-full"
                >
                    Go home
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
