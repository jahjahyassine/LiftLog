import React from "react";

export default function Modal({
    isOpen,
    onClose,
    children,
    title = "Modal",
}) {
    if (!isOpen) return null;

    return (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-2xl">
            <div className="w-[90%] max-w-md rounded-xl bg-white p-6 shadow-xl text-bg-primary/70 flex flex-col">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{title}</h2>

                    <button
                        onClick={onClose}
                        className="text-2xl font-bold text-gray-500 hover:text-black"
                    >
                        ×
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}