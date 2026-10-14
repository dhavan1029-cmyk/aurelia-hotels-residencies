'use client'

import React, { useEffect } from 'react';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = 'md',
} : ModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const widthClass = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    }[maxWidth];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div
                className={`relative w-full ${widthClass} bg-[#fcf9f4] border border-[#dcdad5] shadow-2xl z-10 overflow-hidden`}
            >
                {title && (
                    <div className="flex items-center justify-between px-6 py-5 border-b border-[#e8e4dc]">
                        <h3 className="font-serif text-xl tracking-tight text-[#1f1e1d]">
                            {title}
                        </h3>

                        <button
                            onClick={onClose}
                            className="text-[#6d6a64] hover:text-[#1f1e1d] p-1 text-sm uppercase tracking-wider"
                        >
                            ✕
                        </button>
                    </div>
                )}

                <div className="p-6 md:p-8 max-h-[85vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};
