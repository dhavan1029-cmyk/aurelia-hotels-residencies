
'use client';

import { useState } from 'react';

export interface WalletDownloadActionsProps {
    folioCode: string;
    onAddToAppleWallet?: () => void;
    onAddToGoogleWallet?: () => void;
    className?: string;
}

export function WalletDownloadActions({
    folioCode,
    onAddToAppleWallet,
    onAddToGoogleWallet,
    className = '',
}: WalletDownloadActionsProps) {
    const [copied, setCopied] = useState<boolean>(false);

    function handleCopyProtocol() {
        if (
            typeof navigator !== 'undefined' &&
            navigator.clipboard
        ) {
            navigator.clipboard.writeText(
                `AURELIA://${folioCode}/SOVEREIGN-KEY`
            );

            setCopied(true);
            setTimeout(() => setCopied(false), 2400);
        }
    }

    return (
        <div
            className={`w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10 ${className}`}
        >
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
                {/* 1. Add to Apple Wallet */}
                <button
                    type="button"
                    onClick={onAddToAppleWallet}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-[11px] font-sans font-medium uppercase tracking-[0.16em] transition-colors shadow-2xs group cursor-pointer"
                >
                    <svg
                        className="w-3.5 h-3.5 fill-current text-white"
                        viewBox="0 0 170 170"
                    >
                        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.7-7.94-12.04-14.58-6.19-9.49-11.03-20.25-14.52-32.27-3.48-12.02-5.23-23.47-5.23-34.34 0-14.15 3.53-26.02 10.59-35.61 7.06-9.59 16.03-14.48 26.92-14.67 4.93 0 10.42 1.34 16.48 4.02 6.06 2.68 10.1 4.09 12.12 4.23 1.83-.14 6.08-1.63 12.74-4.48 6.67-2.85 12.35-4.08 17.06-3.7 12.63.66 22.75 5.06 30.36 13.2-11.01 6.66-16.39 15.75-16.14 27.27.24 8.98 3.73 16.59 10.47 22.83 6.74 6.24 14.88 9.77 24.42 10.59-2.07 6.42-4.55 12.69-7.44 18.8zM119.22 33.15c0-7.23 2.66-14.11 7.98-20.64 5.32-6.53 11.89-10.7 19.71-12.51.55 1.5.83 3.03.83 4.59 0 7.23-2.73 14.22-8.19 20.97-5.46 6.75-12.06 10.87-19.8 12.36-.18-1.57-.27-3.13-.27-4.77z" />
                    </svg>

                    <span>Add to Apple Wallet</span>
                </button>

                {/* 2. Add to Google Wallet */}
                <button
                    type="button"
                    onClick={onAddToGoogleWallet}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-[11px] font-sans font-medium uppercase tracking-[0.16em] transition-colors shadow-2xs group cursor-pointer"
                >
                    <svg
                        className="w-3.5 h-3.5 fill-current text-[#bfa76f]"
                        viewBox="0 0 24 24"
                    >
                        <path d="M21.35 11.1H12v3.8h5.38c-.23 1.25-.94 2.31-2 3.03v2.52h3.24c1.9-1.75 2.73-4.32 2.73-7.35 0-.67-.06-1.33-.17-2z" />
                        <path d="M12 21c2.7 0 4.97-.9 6.63-2.45l-3.24-2.52c-.9.6-2.05.95-3.39.95-2.6 0-4.81-1.76-5.6-4.12H3.06v2.6C4.73 18.73 8.08 21 12 21z" />
                        <path d="M6.4 12.86c-.2-.6-.31-1.24-.31-1.86s.11-1.26.31-1.86V6.54H3.06C2.38 7.89 2 9.4 2 11s.38 3.11 1.06 4.46l3.34-2.6z" />
                        <path d="M12 5.02c1.47 0 2.79.51 3.83 1.5l2.87-2.87C16.96 2.06 14.7 1 12 1 8.08 1 4.73 3.27 3.06 6.54l3.34 2.6c.79-2.36 3-4.12 5.6-4.12z" />
                    </svg>

                    <span>Google Wallet</span>
                </button>
            </div>

            {/* 3. Copy Cryptographic Folio Protocol */}
            <button
                type="button"
                onClick={handleCopyProtocol}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#a4a098] hover:text-[#bfa76f] transition-colors py-1 cursor-pointer"
            >
                <span>
                    {copied
                        ? '✓ COPIED PROTOCOL PAYLOAD'
                        : 'COPY NFC PROTOCOL'}
                </span>
            </button>
        </div>
    );
}
