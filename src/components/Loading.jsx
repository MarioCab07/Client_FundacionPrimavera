import React from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";


export const Loading = ({ fullscreen = false }) => {
    return (
        <div className={`flex flex-col items-center justify-center ${fullscreen ? "h-screen bg-gray-100" : ""}`}>
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
    );
};

export const Loader = ({ status }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4 w-1/3">
                {status === "loading" && (
                    <>
                        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        <p className="text-lg text-gray-600">Cargando...</p>
                    </>
                )}
                {status === "success" && (
                    <>
                        <AiOutlineCheckCircle size={50} className="text-green-500" />
                        <p className="text-lg text-green-600">¡Éxito!</p>
                    </>
                )}
                {status === "error" && (
                    <>
                        <AiOutlineCloseCircle size={50} className="text-red-500" />
                        <p className="text-lg text-red-600">Error al validar los campos</p>
                    </>
                )}
            </div>
        </div>
    );
};