'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { SANCTUARIES_CATALOG, SanctuaryEnclaveSpec } from '@/lib/data/sanctuariesCatalog';

export interface SanctuarySelectorStripProps {
    activeSanctuarySlug?: string;
    targetRoute?: string;
    className?: string;
}

export function SanctuarySelectorStrip({
    activeSanctuarySlug,
    targetRoute,
    className = '',
}: SanctuarySelectorStripProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    // Determine current sanctuary slug: prop override -> searchParam -> default Positano
    const currentSlug = (
        activeSanctuarySlug ||
        searchParams?.get('sanctuary') ||
        'sanctuary-positano'
    ).toLowerCase();

    // Default route to current pathname if not explicitly passed
    const baseRoute = targetRoute || pathname || '/';

    return (
        <nav
            aria-label="Global Sanctuary Selector"
            className={`w-full bg-[#181716] border-b border-[#2d2b27] text-[#fcf9f4] sticky top-0 z-40 shadow-[0_4px_24px_rgba(0,0,0,0.35)] ${className}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-stretch justify-start md:justify-between overflow-x-auto scrollbar-none divide-x divide-[#2b2925]">
                    {SANCTUARIES_CATALOG.map(function (sanctuary: SanctuaryEnclaveSpec) {
                        const isCurrent = sanctuary.slug.toLowerCase() === currentSlug;

                        // Preserve other query params while updating sanctuary
                        const nextParams = new URLSearchParams(searchParams?.toString() || '');
                        nextParams.set('sanctuary', sanctuary.slug);

                        return (
                            <Link
                                key={sanctuary.id}
                                href={`${baseRoute}?${nextParams.toString()}`}
                                scroll={false}
                                className={`group relative flex-1 min-w-60 md:min-w-0 py-3.5 px-4 sm:px-5 transition-all duration-300 flex items-center justify-between gap-3 ${
                                    isCurrent
                                        ? 'bg-[#211f1c]'
                                        : 'hover:bg-[#1c1b18] opacity-70 hover:opacity-100'
                                }`}
                            >
                                <div className="space-y-0.5 text-left">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[9px] font-mono tracking-[0.25em] font-semibold uppercase ${
                                            isCurrent ? 'text-[#bfa76f]' : 'text-[#8e763b]'
                                        }`}>
                                            {sanctuary.code}
                                        </span>
                                        <span className="text-[9px] font-mono tracking-[0.14em] text-[#9c9489] uppercase">
                                            • {sanctuary.regionTag}
                                        </span>
                                    </div>
                                    <p className={`text-[13px] font-serif tracking-[0.02em] font-medium transition-colors ${
                                        isCurrent ? 'text-[#fcf9f4]' : 'text-[#dcdad5] group-hover:text-[#c5a86a]'
                                    }`}>
                                        {sanctuary.name}
                                    </p>
                                </div>

                                <div className="hidden lg:flex flex-col items-end text-right space-y-0.5 shrink-0">
                                    <span className="text-[9px] font-mono tracking-[0.15em] text-[#bfa76f]">
                                        {sanctuary.elevation}
                                    </span>
                                    <span className="text-[8.5px] font-mono tracking-widest text-[#706a62]">
                                        {sanctuary.coordinatesDisplay}
                                    </span>
                                </div>

                                {/* Active Monolithic Gold Indicator Bar */}
                                {isCurrent && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#bfa76f] to-transparent shadow-[0_0_8px_rgba(191,167,111,0.6)]" />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}

export default SanctuarySelectorStrip;
