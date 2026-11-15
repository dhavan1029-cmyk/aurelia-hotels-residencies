'use client';

import { useState, useEffect, useCallback } from 'react';
import { resendRegisterOtpAction } from '@/lib/hotel/actions/register';

export interface ResendCountdownTimerProps {
    isExpired?: boolean;
    expiresAt: string;
    conciergeHotlineDisplay?: string;
    conciergeHotlineTel?: string;
    /** Optional callback executed when resend succeeds, passing the new expiry date string */
    onResendSuccess?: (newExpiresAt: string) => void;
    /** Optional custom resend action override */
    onResend?: () => Promise<{ success: boolean; message?: string; newExpiresAt?: string } | void>;
    className?: string;
}

function getRemainingSeconds(targetTime: string | number): number {
    const expirationTime = typeof targetTime === 'number' ? targetTime : new Date(targetTime).getTime();

    if (!Number.isFinite(expirationTime)) {
        return 0;
    }

    return Math.max(0, Math.ceil((expirationTime - Date.now()) / 1000));
}

export function ResendCountdownTimer({
    isExpired = false,
    expiresAt,
    conciergeHotlineDisplay = 'Dispatch verbal code via Concierge',
    conciergeHotlineTel = '+39089875000',
    onResendSuccess,
    onResend,
    className = '',
}: ResendCountdownTimerProps) {
    // Current target expiration timestamp in milliseconds
    const [currentExpiresAtMs, setCurrentExpiresAtMs] = useState<number>(() => {
        const parsed = new Date(expiresAt).getTime();
        return Number.isFinite(parsed) ? parsed : Date.now() + 5 * 60 * 1000;
    });

    const [secondsLeft, setSecondsLeft] = useState<number>(() =>
        getRemainingSeconds(currentExpiresAtMs)
    );

    const [isResending, setIsResending] = useState(false);
    const [statusFeedback, setStatusFeedback] = useState<string | null>(null);

    // Keep internal target in sync if parent changes `expiresAt` prop
    useEffect(() => {
        const parsed = new Date(expiresAt).getTime();
        if (Number.isFinite(parsed)) {
            setCurrentExpiresAtMs(parsed);
            setSecondsLeft(getRemainingSeconds(parsed));
        }
    }, [expiresAt]);

    // Active countdown loop
    useEffect(() => {
        const updateTimer = () => {
            const rem = getRemainingSeconds(currentExpiresAtMs);
            setSecondsLeft(rem);
        };

        updateTimer();

        const timer = window.setInterval(updateTimer, 1000);
        window.addEventListener('focus', updateTimer);
        document.addEventListener('visibilitychange', updateTimer);

        return () => {
            window.clearInterval(timer);
            window.removeEventListener('focus', updateTimer);
            document.removeEventListener('visibilitychange', updateTimer);
        };
    }, [currentExpiresAtMs]);

    // Triggered when patron requests a fresh cipher
    const handleManualResend = useCallback(async () => {
        if (isResending) return;

        setIsResending(true);
        setStatusFeedback(null);

        try {
            if (onResend) {
                // If custom handler provided by parent
                await onResend();
            } else {
                // Execute server action directly
                const result = await resendRegisterOtpAction();

                if (result.success) {
                    // Reset timer to a fresh 10-minute (600s) window starting now
                    const newExpiryMs = Date.now() + 5 * 60 * 1000;
                    setCurrentExpiresAtMs(newExpiryMs);
                    setSecondsLeft(600);
                    setStatusFeedback('Fresh cipher dispatched');

                    const newExpiryIso = new Date(newExpiryMs).toISOString();
                    onResendSuccess?.(newExpiryIso);

                    // Clear feedback after 4 seconds
                    setTimeout(() => setStatusFeedback(null), 4000);
                } else {
                    setStatusFeedback(result.message || 'Unable to regenerate cipher');
                }
            }
        } catch (error) {
            console.error('Failed to resend registration cipher:', error);
            setStatusFeedback('Cipher transmission failed. Please retry.');
        } finally {
            setIsResending(false);
        }
    }, [isResending, onResend, onResendSuccess]);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const isTimerActive = secondsLeft > 0 && !isExpired;

    return (
        <div
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[11px] font-sans text-[#78756d] ${className}`}
        >
            <div className="flex items-center gap-2 flex-wrap">
                <svg
                    className={`w-3.5 h-3.5 ${isTimerActive ? 'text-[#8e763b]' : 'text-[#ba1a1a]'} shrink-0`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>

                {isTimerActive ? (
                    <div className="flex items-center gap-2">
                        <span>
                            Cipher expires in{' '}
                            <strong className="font-mono text-[#1f1e1d] font-semibold tracking-wider">
                                {formattedTime}
                            </strong>
                        </span>
                        <span className="text-[#dcdad5]">|</span>
                        <button
                            type="button"
                            onClick={handleManualResend}
                            disabled={isResending}
                            className="text-[#8e763b] hover:text-[#1f1e1d] transition-colors underline cursor-pointer disabled:opacity-50"
                        >
                            {isResending ? 'Dispatching...' : 'Resend now'}
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={handleManualResend}
                        disabled={isResending}
                        className="text-[#8e763b] hover:text-[#1f1e1d] font-semibold uppercase tracking-wider underline cursor-pointer transition-colors disabled:opacity-50"
                    >
                        {isResending ? 'Dispatching Fresh Cipher...' : 'Request Fresh Token Dispatch'}
                    </button>
                )}

                {statusFeedback && (
                    <span className="text-[10px] font-mono text-[#8e763b] animate-fade-in pl-1">
                        ✦ {statusFeedback}
                    </span>
                )}
            </div>

            <a
                href={`tel:${conciergeHotlineTel}`}
                className="text-[#8e763b] hover:text-[#1f1e1d] transition-colors underline flex items-center gap-1 self-start sm:self-auto shrink-0"
            >
                <span>{conciergeHotlineDisplay}</span>
                <span aria-hidden="true">☎</span>
            </a>
        </div>
    );
}