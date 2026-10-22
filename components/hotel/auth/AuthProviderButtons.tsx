
'use client';

import { useRouter } from 'next/navigation';

interface AuthProviderButtonsProps {
    appleLabel: string;
    conciergeLabel: string;
}

export function AuthProviderButtons({
    appleLabel,
    conciergeLabel,
}: AuthProviderButtonsProps) {
    const router = useRouter();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3
                        text-xs font-sans">
            <button
                type="button"
                onClick={() => {
                    // Replace with your real Apple authentication flow.
                    console.info('Start Apple authentication');
                }}
                className="p-3.5 rounded-xl bg-white hover:bg-[#f6f2ea]
                           border border-[#ded9ce] flex items-center
                           justify-center gap-2.5 transition-colors
                           shadow-2xs"
            >
                <span className="font-semibold uppercase tracking-wider
                                 text-[11px]">
                    {appleLabel}
                </span>
            </button>

            <button
                type="button"
                onClick={() => {
                    // Replace with the concierge verification flow.
                    router.push('/concierge');
                }}
                className="p-3.5 rounded-xl bg-white hover:bg-[#f6f2ea]
                           border border-[#ded9ce] flex items-center
                           justify-center gap-2 transition-colors
                           shadow-2xs"
            >
                <span className="text-[#8e763b] text-base">☆</span>
                <span className="font-semibold uppercase tracking-wider
                                 text-[11px] text-[#2c2a26]">
                    {conciergeLabel}
                </span>
            </button>
        </div>
    );
}
