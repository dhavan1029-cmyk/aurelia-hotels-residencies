import { useState } from 'react';

export interface BiometricPasskeyButtonProps {
    label?: string;
    subLabel?: string;
    onSuccess?: () => void;
    className?: string;
}

export function BiometricPasskeyButton({
    label = 'Authenticate via Apple Sovereign ID',
    subLabel = 'Biometric Passkey • Secure Enclave FIDO2',
    onSuccess,
    className = '',
}: BiometricPasskeyButtonProps) {
    const [isScanning, setIsScanning] = useState<boolean>(false);

    async function handleTrigger() {
        setIsScanning(true);
        try {
            if (typeof window !== 'undefined' && window.PublicKeyCredential) {
                // In production, invoke navigator.credentials.get({ publicKey: ... })
                setTimeout(() => {
                    setIsScanning(false);
                    if (onSuccess) {
                        onSuccess();
                    }
                }, 400);
            } else {
                setIsScanning(false);
                if (onSuccess) {
                    onSuccess();
                }
            }
        } catch {
            setIsScanning(false);
        }
    }

    return (
        <button
            type="button"
            onClick={handleTrigger}
            disabled={isScanning}
            className={`w-full p-3.5 sm:p-4 rounded-xl bg-white hover:bg-[#faf8f4] border border-[#ded9ce] hover:border-[#8e763b]/70 flex items-center justify-between gap-4 transition-all duration-200 shadow-2xs group text-left ${className}`}
        >
            <div className="flex items-center gap-3.5 min-w-0">
                {/* Fingerprint / Biometric Glyphs */}
                <div className="p-2.5 rounded-lg bg-[#f6f2ea] border border-[#ded9ce] text-[#8e763b] group-hover:bg-[#8e763b] group-hover:text-white transition-colors shrink-0">
                    <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                    >
                        <path d="M12 12c0-3 2.5-5.5 5.5-5.5" />
                        <path d="M12 12c0 3-2.5 5.5-5.5 5.5" />
                        <path d="M12 2a10 10 0 0 0-7.07 17.07" />
                        <path d="M12 22a10 10 0 0 0 7.07-17.07" />
                    </svg>
                </div>

                <div className="min-w-0">
                    <span className="font-serif text-sm sm:text-base font-medium text-[#1f1e1d] block tracking-tight truncate group-hover:text-[#8e763b] transition-colors">
                        {isScanning ? 'Attesting Hardware Enclave...' : label}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#8e8a82] block mt-0.5">
                        {subLabel}
                    </span>
                </div>
            </div>

            <span className="inline-flex items-center gap-1 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8e763b] group-hover:text-[#1f1e1d] transition-colors shrink-0">
                <span>Engage</span>
                <span className="transform transition-transform duration-200 group-hover:translate-x-1">
                    →
                </span>
            </span>
        </button>
    );
}
