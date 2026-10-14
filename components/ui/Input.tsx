import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export function Input({
    label,
    error,
    helperText,
    className = '',
    id,
    ...props
}: InputProps) {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-[11px] font-sans tracking-widest uppercase text-[#5f5d59]"
                >
                    {label}
                </label>
            )}

            <input
                id={inputId}
                className={`w-full px-4 py-3 bg-[#fdfbf7] border text-[#1f1e1d] font-sans text-sm outline-none transition-colors duration-200 placeholder-[#9f9c96] ${
                    error
                        ? 'border-red-400 focus:border-red-600'
                        : 'border-[#dcdad5] focus:border-[#1f1e1d]'
                } ${className}`}
                {...props}
            />

            {error && (
                <span className="text-[11px] text-red-600 font-sans">
                    {error}
                </span>
            )}

            {helperText && !error && (
                <span className="text-[11px] text-[#7d7a74] font-sans">
                    {helperText}
                </span>
            )}
        </div>
    );
}
