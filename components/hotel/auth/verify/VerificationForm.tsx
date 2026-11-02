'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BiometricPasskeyButton } from './BiometricPasskeyButton';
import { CipherOtpInput } from './CipherOtpInput';
import { ResendCountdownTimer } from './ResendCountdownTimer';
import { VerificationPageData } from './VerificationHeader';
import { verifyOtp } from '@/lib/hotel/actions/auth';

export interface VerificationFormProps {
    data: VerificationPageData['verificationForm'];
    attempts: number;
    className?: string;
}

export function VerificationForm({
    data,
    className = '',
}: VerificationFormProps) {
    const {
        initialCode,
        resendTimeoutSeconds,
        passkeyButtonLabel,
        passkeySubLabel,
        submitButtonLabel,
        conciergeHotlineDisplay,
        conciergeHotlineTel,
    } = data;

    const router = useRouter();

    const [cipherCode, setCipherCode] = useState<string>(
        Array.isArray(initialCode) ? initialCode.join('') : ''
    );
    const [isVerifying, setIsVerifying] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isExpired, setIsExpired] = useState(false)

    async function executeVerification(codeToVerify: string) {
        if (codeToVerify.length < 6 || isVerifying) return;

        setIsVerifying(true);
        setError('');

        try {
            const res = await verifyOtp(codeToVerify);

            if (res.success) {
                router.push('/profile');
            } else {
                if(res.expired){
                    setIsExpired(true)
                    setCipherCode('')
                }
                setError(
                    res.message ||
                    'Cryptographic token rejected. Please verify the 6-digit cipher or contact your Majordomo.'
                );
            }
        } catch (err: unknown) {
            console.error('Error during OTP verification:', err);
            setError('A transmission error occurred. Please verify your connection or request a fresh token.');
        } finally {
            setIsVerifying(false);
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        executeVerification(cipherCode);
    }

    function handleCodeChange(code: string) {
        setCipherCode(code);
        if (error) {
            setError('');
        }
        // Ergonomic auto-submit when all 6 digits are filled
        if (code.length === 6) {
            executeVerification(code);
        }
    }

    const isComplete = cipherCode.length === 6;

    return (
        <form
            onSubmit={handleSubmit}
            className={`w-full max-w-lg mx-auto space-y-6 select-none ${className}`}
        >
            {/* 1. EDITORIAL LUXURY ERROR / ADVISORY NOTIFICATION */}
            {error && (
                <div
                    role="alert"
                    aria-live="polite"
                    className="p-4 rounded-2xl bg-[#faf3f0] border border-[#ecd5cf] text-[#8c3126] shadow-2xs space-y-1.5 transition-all duration-300 animate-in fade-in slide-in-from-top-2"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8c3126] animate-pulse" />
                            <span className="text-[9px] font-mono font-semibold uppercase tracking-[0.24em] text-[#8c3126]">
                                SECURITY PROTOCOL ADVISORY
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setError('')}
                            className="text-[11px] font-mono text-[#8c3126]/60 hover:text-[#8c3126] transition-colors p-0.5"
                            aria-label="Dismiss error"
                        >
                            ✕
                        </button>
                    </div>

                    <p className="text-xs font-sans font-light leading-relaxed text-[#68241b]">
                        {error}
                    </p>
                </div>
            )}

            {/* 2. 6-DIGIT CERAMIC OTP INPUT GRID */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[#78756d]">
                    <span>CONFIDENTIAL 6-DIGIT CIPHER</span>
                    <span className="text-[#8e763b]">SWISS FADP RATIFIED</span>
                </div>

                <CipherOtpInput
                    onCodeChange={handleCodeChange}
                />
            </div>

            {/* 3. BIOMETRIC WEBAUTHN / FACE ID PASSKEY BUTTON */}
            <BiometricPasskeyButton
                label={passkeyButtonLabel}
                subLabel={passkeySubLabel}
                onSuccess={() =>
                    router.push('/profile?verified=true&biometric=fido2')
                }
            />

            {/* 4. RESEND COUNTDOWN & TELEPHONE DESK */}
            <ResendCountdownTimer
                isExpired={isExpired}
                initialSeconds={resendTimeoutSeconds}
                conciergeHotlineDisplay={conciergeHotlineDisplay}
                conciergeHotlineTel={conciergeHotlineTel}
                onResend={() => {
                    setError('');
                    console.log('Dispatching fresh cryptographic token...');
                }}
            />

            {/* 5. PRIMARY SUBMISSION CTA BUTTON */}
            <button
                type="submit"
                disabled={isVerifying || !isComplete}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-xs font-semibold uppercase tracking-[0.24em] transition-all shadow-md active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed group"
            >
                {isVerifying ? (
                    <>
                        <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>VALIDATING CIPHER SIGNATURE...</span>
                    </>
                ) : (
                    <>
                        <span>{submitButtonLabel || 'AUTHENTICATE & ENTER SANCTUARY'}</span>
                        <span className="transform transition-transform duration-300 group-hover:translate-x-1 font-normal">
                            →
                        </span>
                    </>
                )}
            </button>

            {/* Sub-strip Security Clearance Pill */}
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
                <span>LEVEL IV CONFIDENTIALITY • 256-BIT ATTESTATION</span>
            </div>
        </form>
    );
}

