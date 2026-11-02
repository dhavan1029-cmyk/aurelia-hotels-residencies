'use client';

import { useState, useEffect, useCallback } from 'react';

export interface ResendCountdownTimerProps {
    isExpired: boolean,
    initialSeconds?: number;
    conciergeHotlineDisplay?: string;
    conciergeHotlineTel?: string;
    onResend?: () => void | Promise<void>;
    className?: string;
}

export function ResendCountdownTimer({
    isExpired,
    initialSeconds = 60 * 5,
    conciergeHotlineDisplay = 'Dispatch verbal code via Concierge',
    conciergeHotlineTel = '+39089875000',
    onResend,
    className = '',
}: ResendCountdownTimerProps) {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        if (secondsLeft <= 0 || isExpired) return;

        const timer = setInterval(() => {
            setSecondsLeft((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [secondsLeft, isExpired]);

    const handleManualResend = useCallback(async () => {
        if (secondsLeft > 0 || isResending || !onResend) return;

        setIsResending(true);

        try {
            await onResend();
            setSecondsLeft(initialSeconds);
        } catch (error) {
            console.error('Failed to resend OTP:', error);
        } finally {
            setIsResending(false);
        }
    }, [secondsLeft, isResending, initialSeconds, onResend]);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (
        <div
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-sans text-[#78756d] ${className}`}
        >
            <div className="flex items-center gap-1.5">
                <svg
                    className="w-3.5 h-3.5 text-[#8e763b]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>

                {secondsLeft > 0 && !isExpired ? (
                    <span>
                        Resend cryptographic code in{' '}
                        <strong className="font-mono text-[#1f1e1d]">
                            {formattedTime}
                        </strong>
                    </span>
                ) : (
                    <button
                        type="button"
                        onClick={handleManualResend}
                        disabled={isResending || !onResend}
                        className="text-[#8e763b] hover:text-[#1f1e1d] font-semibold uppercase tracking-wider underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isResending
                            ? 'Dispatching Fresh Token...'
                            : 'Request Fresh Token Dispatch'}
                    </button>
                )}
            </div>

            <a
                href={`tel:${conciergeHotlineTel}`}
                className="text-[#8e763b] hover:text-[#1f1e1d] transition-colors underline flex items-center gap-1 self-start sm:self-auto"
            >
                <span>{conciergeHotlineDisplay}</span>
                <span aria-hidden="true">☎</span>
            </a>
        </div>
    );
}