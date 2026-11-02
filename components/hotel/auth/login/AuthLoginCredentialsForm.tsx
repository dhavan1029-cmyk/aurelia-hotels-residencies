'use client';

// import { createClient } from '';
import React, { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthSubmitButton } from './AuthSubmitButton';
import { AuthLoginFormData } from '../../types/auth';
import { sendOtp } from '@/lib/hotel/actions/auth';

export interface AuthLoginCredentialsFormProps {
    data: AuthLoginFormData;
    className?: string;
}

export interface SendOtpState {
    success: boolean;
    message: string;
}

const initialState: SendOtpState = {
    success: false,
    message: '',
};

export function AuthLoginCredentialsForm({
    data,
    className = '',
}: AuthLoginCredentialsFormProps) {
    const router = useRouter();

    const [state, formAction] = useActionState(
        async (prevState: SendOtpState, formData: FormData) => {
            const result = await sendOtp(prevState, formData);

            if (result.success) {
                router.push('/login/verify');
            }

            return result;
        },
        initialState
    );

    const [identifier, setIdentifier] = useState<string>('');
    const [dismissedServerMessage, setDismissedServerMessage] = useState<boolean>(false);

    function handleIdentifierChange(e: React.ChangeEvent<HTMLInputElement>) {
        setIdentifier(e.target.value);
        if (!dismissedServerMessage && state.message) {
            setDismissedServerMessage(true);
        }
    }

    const hasServerError = Boolean(state.message && !state.success && !dismissedServerMessage);

    return (
        <form action={formAction} className={`space-y-6 select-none ${className}`}>
            {/* 1. EDITORIAL LUXURY STATUS / ADVISORY FEEDBACK BANNER */}
            {state.message && !dismissedServerMessage && (
                <div
                    role={state.success ? 'status' : 'alert'}
                    aria-live="polite"
                    className={`p-4 rounded-2xl border shadow-2xs space-y-1.5 transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${
                        state.success
                            ? 'bg-[#f1f7f3] border-[#cbe2d3] text-[#24633b]'
                            : 'bg-[#faf3f0] border-[#ecd5cf] text-[#8c3126]'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                    state.success
                                        ? 'bg-emerald-600 animate-pulse'
                                        : 'bg-[#8c3126] animate-pulse'
                                }`}
                            />
                            <span className="text-[9px] font-mono font-semibold uppercase tracking-[0.24em]">
                                {state.success
                                    ? 'CIPHER DISPATCH RATIFIED'
                                    : 'SECURITY PROTOCOL ADVISORY'}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() => setDismissedServerMessage(true)}
                            className="text-[11px] font-mono opacity-60 hover:opacity-100 transition-opacity p-0.5"
                            aria-label="Dismiss feedback"
                        >
                            ✕
                        </button>
                    </div>

                    <p className="text-xs font-sans font-light leading-relaxed">
                        {state.message}
                    </p>
                </div>
            )}

            {/* 2. PRIMARY SOVEREIGN IDENTIFIER INPUT */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label
                        htmlFor="identifier"
                        className="block text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#6d6961]"
                    >
                        {data.identifierLabel}
                    </label>

                    <span className="text-[9px] font-mono text-[#8e8a82] uppercase tracking-wider">
                        EMAIL OR FOLIO ID
                    </span>
                </div>

                <div className="relative">
                    <input
                        id="identifier"
                        name="identifier"
                        type="text"
                        required
                        autoComplete="username"
                        placeholder={data.identifierPlaceholder}
                        minLength={3}
                        value={identifier}
                        onChange={handleIdentifierChange}
                        className={`w-full pl-10 pr-4 py-3.5 rounded-xl bg-white border text-xs font-sans text-[#1f1e1d] outline-none transition-colors shadow-2xs placeholder-[#a4a098] ${
                            hasServerError
                                ? 'border-[#ecd5cf] focus:border-[#8c3126]'
                                : 'border-[#ded9ce] focus:border-[#8e763b]'
                        }`}
                    />

                    {/* Architectural Vault Key Insignia */}
                    <svg
                        aria-hidden="true"
                        className="w-4 h-4 text-[#8e763b] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                </div>

                <p className="text-[10px] font-sans text-[#8e8a82] leading-snug">
                    {data.identifierHelpText}
                </p>
            </div>

            {/* 3. CONFIDENTIAL TERMINAL REMEMBER CHECKBOX */}
            <div className="pt-1">
                <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        name="remember"
                        value="true"
                        defaultChecked
                        className="w-4 h-4 rounded border-[#ded9ce] text-[#8e763b] focus:ring-0 focus:ring-offset-0 transition-colors"
                    />

                    <span className="text-[11px] text-[#5c5952] font-sans font-light">
                        {data.rememberDeviceLabel}
                    </span>
                </label>
            </div>

            {/* 4. SUBMIT ACTION BUTTON */}
            <AuthSubmitButton label={data.submitButtonLabel || 'AUTHENTICATE & ENTER SANCTUARY'} />

            {/* 5. SWISS DATA SECURITY PROTOCOL FOOTNOTE */}
            <div className="pt-2 flex items-center justify-center gap-2 text-[9.5px] font-mono uppercase tracking-[0.2em] text-[#8e8a82]">
                <svg
                    className="w-3.5 h-3.5 text-[#8e763b] shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>SWISS FADP RATIFIED • 256-BIT CRYPTOGRAPHIC DISPATCH</span>
            </div>
        </form>
    );
}

