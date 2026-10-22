
'use client';

import { useState } from 'react';

interface PasswordInputProps {
    id: string;
    name: string;
    placeholder?: string;
}

export function PasswordInput({
    id,
    name,
    placeholder,
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <input
                id={id}
                name={name}
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                placeholder={placeholder}
                className="w-full pl-10 pr-14 py-3.5 rounded-xl
                           bg-white border border-[#ded9ce]
                           text-xs font-sans text-[#1f1e1d]
                           outline-none focus:border-[#8e763b]
                           transition-colors shadow-2xs
                           placeholder-[#a4a098]"
            />

            <svg
                aria-hidden="true"
                className="w-4 h-4 text-[#8e763b] absolute left-3.5
                           top-1/2 -translate-y-1/2 pointer-events-none"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                <path d="M12 12L2.5 7.5" />
                <path d="M12 12v9.5" />
            </svg>

            <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3.5 top-1/2 -translate-y-1/2
                           text-[#a4a098] hover:text-[#1f1e1d]
                           text-[10px] font-sans uppercase tracking-wider"
            >
                {showPassword ? 'HIDE' : 'SHOW'}
            </button>
        </div>
    );
}
