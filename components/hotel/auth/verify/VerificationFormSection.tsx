
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CipherOtpInput } from './CipherOtpInput';
import { BiometricPasskeyButton } from './BiometricPasskeyButton';
import { ResendCountdownTimer } from './ResendCountdownTimer';
import { VerificationPageData } from './VerificationHeader';

export interface VerificationFormSectionProps {
    data: VerificationPageData['verificationForm'];
    className?: string;
}

export function VerificationFormSection({
    data,
    className = '',
}: VerificationFormSectionProps) {
    const router = useRouter();

    const {
        phaseEyebrow,
        title,
        descriptionPrefix,
        maskedEmail,
        maskedMobile,
        initialCode,
        resendTimeoutSeconds,
        passkeyButtonLabel,
        passkeySubLabel,
        submitButtonLabel,
        returnLinkText,
        returnLinkHref,
        lostKeyText,
        lostKeyHref,
        conciergeHotlineDisplay,
        conciergeHotlineTel,
        compliancePills,
    } = data;

    const [cipherCode, setCipherCode] = useState<string>(
        initialCode.join('')
    );
    const [isVerifying, setIsVerifying] = useState<boolean>(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (cipherCode.length < 6) return;

        setIsVerifying(true);

        setTimeout(() => {
            router.push('/profile?verified=true');
        }, 500);
    }

    const isComplete = cipherCode.length === 6;

    return (
        <section
            aria-label="Two-Step Verification Form"
            className={`w-full max-w-xl flex flex-col justify-between space-y-7 ${className}`}
        >
            {/* 1. Master Editorial Heading */}
            <div className="space-y-3">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.24em] text-[#8e763b] block">
                    {phaseEyebrow}
                </span>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#1f1e1d] tracking-tight leading-[1.12]">
                    {title}
                </h1>

                <p className="text-xs sm:text-[13px] text-[#55524d] font-sans font-light leading-relaxed max-w-lg">
                    {descriptionPrefix}{' '}
                    <strong className="font-mono text-[#1f1e1d] font-semibold">
                        {maskedEmail}
                    </strong>{' '}
                    and terminal mobile{' '}
                    <strong className="font-mono text-[#1f1e1d] font-semibold">
                        {maskedMobile}
                    </strong>
                    .
                </p>
            </div>

            {/* 2. Form With Leaf Client Inputs */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Micro Leaf: 6-Digit Ceramic OTP Grid */}
                <CipherOtpInput
                    initialDigits={initialCode}
                    onCodeChange={(code) => setCipherCode(code)}
                />

                {/* Micro Leaf: Biometric WebAuthn / Face ID Trigger */}
                <BiometricPasskeyButton
                    label={passkeyButtonLabel}
                    subLabel={passkeySubLabel}
                    onSuccess={() =>
                        router.push(
                            '/profile?verified=true&biometric=fido2'
                        )
                    }
                />

                {/* Micro Leaf: Isolated 41-Second Resend Countdown */}
                <ResendCountdownTimer
                    initialSeconds={resendTimeoutSeconds}
                    conciergeHotlineDisplay={conciergeHotlineDisplay}
                    conciergeHotlineTel={conciergeHotlineTel}
                    onResend={() => {
                        console.log(
                            'Dispatching fresh cryptographic token...'
                        );
                    }}
                />

                {/* Primary Submission CTA */}
                <button
                    type="submit"
                    disabled={isVerifying || !isComplete}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-xs font-semibold uppercase tracking-[0.24em] transition-all shadow-md active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    <span>
                        {isVerifying
                            ? 'VERIFYING SIGNATURE...'
                            : submitButtonLabel}
                    </span>

                    <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </button>
            </form>

            {/* 3. Navigation Recovery & Return Links */}
            <div className="flex items-center justify-between text-xs font-sans text-[#78756d] pt-2 border-t border-[#eeeae2]">
                <Link
                    href={returnLinkHref}
                    className="inline-flex items-center gap-1 text-[#1f1e1d] hover:text-[#8e763b] transition-colors uppercase tracking-[0.16em] text-[11px] font-semibold"
                >
                    <span>←</span>
                    <span>{returnLinkText}</span>
                </Link>

                <Link
                    href={lostKeyHref}
                    className="text-[#8e763b] hover:text-[#1f1e1d] transition-colors underline text-[11px]"
                >
                    {lostKeyText}
                </Link>
            </div>

            {/* 4. Compliance & FINMA Clearance Pills */}
            <div className="bg-[#f6f2ea] border border-[#ded9ce] rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px] font-mono text-[#6e6b64]">
                <div className="flex items-center gap-2">
                    <svg
                        className="w-3.5 h-3.5 text-[#8e763b] shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                        />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>

                    <span>{compliancePills[0].label}</span>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto text-[#1f1e1d]">
                    <span className="font-semibold">
                        {compliancePills[0].value}
                    </span>

                    <span className="text-[#ded9ce]">•</span>

                    <span>FINMA {compliancePills[1].value}</span>
                </div>
            </div>
        </section>
    );
}
