import React from "react";

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
    );
};

export default Loading;