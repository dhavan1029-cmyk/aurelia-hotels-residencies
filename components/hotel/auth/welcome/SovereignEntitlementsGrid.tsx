import React from 'react';
import Image from 'next/image';
import { AssignedMajordomoLiaison, ConferredEntitlementItem } from './InscriptionWelcomeHeader';


export interface SovereignEntitlementsGridProps {
    eyebrow: string;
    heading: string;
    description: string;
    entitlements: ConferredEntitlementItem[];
    majordomo: AssignedMajordomoLiaison;
    className?: string;
}

export function SovereignEntitlementsGrid({
    eyebrow,
    heading,
    description,
    entitlements,
    majordomo,
    className = '',
}: SovereignEntitlementsGridProps) {
    function renderEntitlementIcon(type: ConferredEntitlementItem['iconType']) {
        switch (type) {
            case 'discount':
                return (
                    <svg
                        className="w-4 h-4 text-[#8e763b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="19" y1="5" x2="5" y2="19" />
                        <circle cx="9" cy="9" r="1.5" fill="currentColor" />
                        <circle cx="15" cy="15" r="1.5" fill="currentColor" />
                    </svg>
                );
            case 'majordomo':
                return (
                    <svg
                        className="w-4 h-4 text-[#8e763b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                        <path d="M16 11l2 2 4-4" />
                    </svg>
                );
            case 'sensory':
                return (
                    <svg
                        className="w-4 h-4 text-[#8e763b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 22c4-4 8-7.5 8-12a8 8 0 0 0-16 0c0 4.5 4 8 8 12z" />
                        <path d="M12 22V10" />
                        <path d="M8 14c2-1 4-1 4-1s2 0 4 1" />
                    </svg>
                );
            default:
                return null;
        }
    }

    return (
        <section
            aria-label="Conferred Sovereign Prerogatives & Assigned Majordomo"
            className={`w-full max-w-5xl mx-auto space-y-8 select-none ${className}`}
        >
            {/* 1. SECTION EDITORIAL HEADER */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-[#8e763b] block">
                    {eyebrow}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#1f1e1d] tracking-tight leading-tight">
                    {heading}
                </h2>
                <p className="text-xs sm:text-[13px] text-[#636058] font-sans font-light leading-relaxed">
                    {description}
                </p>
            </div>

            {/* 2. THREE CONFERRED PREROGATIVE CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {entitlements.map(function (item) {
                    return (
                        <article
                            key={item.id}
                            className="bg-white border border-[#ded9ce] rounded-2xl p-6 flex flex-col justify-between space-y-5 shadow-2xs hover:border-[#8e763b]/60 transition-colors"
                        >
                            <div className="space-y-3.5">
                                {/* Top Badges */}
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8e763b] font-semibold">
                                        {item.romanNumeral}
                                    </span>
                                    <span className="px-2 py-0.5 rounded-xs bg-[#f6f2ea] text-[8.5px] font-sans font-medium uppercase tracking-wider text-[#6d6961]">
                                        {item.badge}
                                    </span>
                                </div>

                                {/* Icon + Title */}
                                <div className="space-y-2">
                                    <div className="w-8 h-8 rounded-xl bg-[#fcf9f4] border border-[#ded9ce] flex items-center justify-center shadow-2xs">
                                        {renderEntitlementIcon(item.iconType)}
                                    </div>
                                    <h3 className="font-serif text-base sm:text-lg font-normal text-[#1f1e1d] tracking-tight leading-snug">
                                        {item.title}
                                    </h3>
                                </div>

                                {/* Body Description */}
                                <p className="text-xs text-[#5f5c56] font-sans font-light leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            {/* Specification Footer Note */}
                            <div className="pt-3 border-t border-[#eeeae2] text-[9.5px] font-mono text-[#8e8a82] leading-tight">
                                {item.specificationNote}
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* 3. ASSIGNED PERSONAL MAJORDOMO HOST CARD */}
            <div className="w-full bg-[#f6f2ea] border border-[#ded9ce] rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                    {/* Majordomo Avatar */}
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-[#ded9ce] bg-white shadow-2xs shrink-0">
                        <Image
                            src={majordomo.avatarUrl}
                            alt={majordomo.name}
                            fill
                            sizes="56px"
                            className="object-cover object-center"
                        />
                    </div>

                    <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#24633b] font-semibold">
                                {majordomo.statusText}
                            </span>
                        </div>
                        <h4 className="font-serif text-lg font-normal text-[#1f1e1d] tracking-tight">
                            {majordomo.name}
                        </h4>
                        <p className="text-[11px] text-[#6e6b64] font-sans font-light">
                            {majordomo.roleTag} • {majordomo.estateLocation}
                        </p>
                    </div>
                </div>

                {/* Direct Telephone Action */}
                <div className="flex items-center gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#ded9ce]">
                    <a
                        href={`tel:${majordomo.directPhoneTel}`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-[#faf7f0] border border-[#ded9ce] text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-[#1f1e1d] transition-colors shadow-2xs"
                    >
                        <svg
                            className="w-3.5 h-3.5 text-[#8e763b]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span>CALL MAJORDOMO DESK ({majordomo.directPhoneDisplay})</span>
                    </a>
                </div>
            </div>
        </section>
    );
}