'use client';

import { useState, useEffect } from 'react';

export interface ResendCountdownTimerProps {
    initialSeconds?: number;
    conciergeHotlineDisplay?: string;
    conciergeHotlineTel?: string;
    onResend?: () => void;
    className?: string;
}

export function ResendCountdownTimer({
    initialSeconds = 41,
    conciergeHotlineDisplay = 'Dispatch verbal code via Concierge',
    conciergeHotlineTel = '+39089875000',
    onResend,
    className = '',
}: ResendCountdownTimerProps) {
    const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);

    useEffect(() => {
        if (secondsLeft <= 0) return;
        const timer = setInterval(() => {
            setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [secondsLeft]);

    function handleManualResend() {
        if (secondsLeft > 0) return;
        setSecondsLeft(initialSeconds);
        if (onResend) {
            onResend();
        }
    }

    return (
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-sans text-[#78756d] ${className}`}>
            <div className="flex items-center gap-1.5">
                <svg
                    className="w-3.5 h-3.5 text-[#8e763b]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>

                {secondsLeft > 0 ? (
                    <span>
                        Resend cryptographic code in{' '}
                        <strong className="font-mono text-[#1f1e1d]">
                            00:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
                        </strong>
                    </span>
                ) : (
                    <button
                        type="button"
                        onClick={handleManualResend}
                        className="text-[#8e763b] hover:text-[#1f1e1d] font-semibold uppercase tracking-wider underline cursor-pointer"
                    >
                        Request Fresh Token Dispatch
                    </button>
                )}
            </div>

            <a
                href={`tel:${conciergeHotlineTel}`}
                className="text-[#8e763b] hover:text-[#1f1e1d] transition-colors underline flex items-center gap-1 self-start sm:self-auto"
            >
                <span>{conciergeHotlineDisplay}</span>
                <span>☎</span>
            </a>
        </div>
    );
}
