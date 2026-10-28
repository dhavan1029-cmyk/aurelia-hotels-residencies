import Image from 'next/image';
import Link from 'next/link';
import { AuthMastheadData, SovereignPrivilegePill } from '../../types/auth';


export const authMastheadDefaultData: AuthMastheadData = {
    brandName: 'Aurelia',
    brandSub: 'HOTELS & RESIDENCES',
    enclavesPillText: 'POSITANO • CAP D\'ANTIBES • ST. MORITZ • KYOTO',
    quoteBadgeText: 'SOVEREIGN ARCHITECTURAL MANIFESTO',
    editorialQuote: '“Sanctuary is not merely a place of arrival, but a curated state of stillness.”',
    editorialNarrative:
        'A private digital vestibule for verified patrons of Aurelia. Access your bespoke arrival coordinates, sensory suite staging calibrations, and confidential cellar allocations across all global enclaves.',
    bgImageUrl: '/limestone-villa.png',
    bgImageAlt: 'Ultra-luxury monolithic Mediterranean boutique hotel terrace and infinity pool overlooking the sea at twilight',
    patronPrivilegesHeader: 'SOVEREIGN PATRON PRIVILEGES ACTIVE',
    patronPrivilegesSub: 'AUTHENTICATED UNDER SWISS ENCRYPTION PROTOCOL',
    privileges: [
        {
            id: 'majordomo',
            label: 'Bespoke Majordomo',
            sublabel: 'Dedicated 24/7 attendance',
            iconType: 'majordomo',
        },
        {
            id: 'sensory',
            label: 'Sensory Suite Memory',
            sublabel: 'Pre-set temperature & aroma',
            iconType: 'sensory',
        },
        {
            id: 'cellar',
            label: 'Sovereign Cellar Access',
            sublabel: 'Rare reserve cru allocations',
            iconType: 'cellar',
        },
        {
            id: 'hotline',
            label: 'Confidential Direct Line',
            sublabel: 'Harbor & helipad coordination',
            iconType: 'hotline',
        },
    ],
    sovereignKeyRefNotice: 'SECURITY CLEARANCE: PCI-DSS TIER 1 • 256-BIT ENCRYPTION',
};

export interface AuthEditorialMastheadProps {
    data?: AuthMastheadData;
    className?: string;
    onExploreBrand?: () => void;
}

export function AuthEditorialMasthead({
    data = authMastheadDefaultData,
    className = '',
}: AuthEditorialMastheadProps) {
    const {
        enclavesPillText,
        quoteBadgeText,
        editorialQuote,
        editorialNarrative,
        bgImageUrl,
        bgImageAlt,
        patronPrivilegesHeader,
        patronPrivilegesSub,
        privileges,
        sovereignKeyRefNotice,
    } = data;

    function renderPrivilegeIcon(type: SovereignPrivilegePill['iconType']) {
        switch (type) {
            case 'majordomo':
                return (
                    <svg
                        className="w-4 h-4 text-[#bfa76f] shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                );
            case 'sensory':
                return (
                    <svg
                        className="w-4 h-4 text-[#bfa76f] shrink-0"
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
            case 'cellar':
                return (
                    <svg
                        className="w-4 h-4 text-[#bfa76f] shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M8 22h8" />
                        <path d="M12 11v11" />
                        <path d="M19 3l-7 8-7-8h14z" />
                    </svg>
                );
            case 'hotline':
                return (
                    <svg
                        className="w-4 h-4 text-[#bfa76f] shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                );
            default:
                return null;
        }
    }

    return (
        <aside
            className={`relative w-full h-fit lg:min-h-screen flex flex-col justify-between overflow-hidden bg-[#181716] text-[#fcf9f4] p-6 sm:p-10 lg:p-14 ${className}`}
        >
            {/* 1. PHOTOGRAPHIC BACKGROUND WITH DEEP EDITORIAL VIGNETTES */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={bgImageUrl}
                    alt={bgImageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center transform scale-[1.02] transition-transform duration-1000 ease-out"
                />

                {/* Atmospheric Darkening Overlays */}
                <div className="absolute inset-0 bg-[#141312]/60 mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-0 bg-linear-to-t from-[#141312] via-[#141312]/70 to-[#141312]/40 pointer-events-none" />
                <div className="absolute inset-0 bg-linear-to-r from-[#141312]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Subtle Architectural Grid Texture */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none z-1"
                style={{
                    backgroundImage: 'radial-gradient(#bfa76f 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />

            {/* 2. TOP MASTHEAD: BRAND WORDMARK & GLOBAL ENCLAVES PILL */}
            <div className="w-screen relative z-10 flex flex-row items-center justify-between gap-4">
                <Link
                    href="/"
                    className="flex flex-col group self-start"
                >
                    <Image
                        src="/aurelia-logo-dark.png"
                        alt="Aurelia Hotels & Residences Logo"
                        width={300} height={150}
                    />                
                </Link>

                <div className="w-fit inline-flex items-center gap-2 px-3 py-1 -full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase tracking-[0.18em] text-[#dcdad5]">
                    <span className="w-1.5 h-1.5 -full bg-[#bfa76f] animate-pulse" />
                    <span>{enclavesPillText}</span>
                </div>
            </div>

            {/* 3. CENTER MONOGRAPH: ACCENT BAR, MANIFESTO QUOTE & NARRATIVE */}
            <div className="relative z-10 max-w-xl space-y-2 my-4">
                <div className="flex items-center gap-2.5">
                    <span className="h-px w-8 bg-[#bfa76f]" />
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.28em] text-[#bfa76f]">
                        {quoteBadgeText}
                    </span>
                </div>

                <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-[34px] font-light text-white leading-[1.2] tracking-tight">
                    {editorialQuote}
                </blockquote>

                <p className="text-xs sm:text-[13px] text-[#c7c3ba] font-sans font-light leading-relaxed max-w-lg">
                    {editorialNarrative}
                </p>
            </div>

            {/* 4. BOTTOM FLOATING PRIVILEGES CARD & ENCRYPTION PROTOCOL STRIP */}
            <div className="lg:block hidden relative z-10 w-full space-y-3.5">
                <div className="bg-black/50 backdrop-blur-xl border border-white/15 -2xl p-4 sm:p-5 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3.5">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 -full bg-[#bfa76f]" />
                            <span className="text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#bfa76f]">
                                {patronPrivilegesHeader}
                            </span>
                        </div>
                        <span className="text-[8px] sm:text-[9px] font-mono text-[#a4a098] tracking-wider uppercase">
                            {patronPrivilegesSub}
                        </span>
                    </div>

                    {/* 2x2 Privileges Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                        {privileges.map(function (priv) {
                            return (
                                <div
                                    key={priv.id}
                                    className="p-2.5 -xl bg-white/5 border border-white/10 flex items-start gap-2.5 transition-colors hover:bg-white/10"
                                >
                                    <div className="p-1.5 -lg bg-black/40 border border-white/10 text-[#bfa76f] shrink-0">
                                        {renderPrivilegeIcon(priv.iconType)}
                                    </div>
                                    <div className="min-w-0">
                                        <span className="font-serif text-[13px] text-white font-normal block tracking-tight truncate">
                                            {priv.label}
                                        </span>
                                        <span className="text-[10px] text-[#a4a098] font-light block leading-tight mt-0.5">
                                            {priv.sublabel}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Micro Security Notice */}
                <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-[#8e8a82] px-1">
                    <span>{sovereignKeyRefNotice}</span>
                    <span className="text-[#bfa76f]">✦ PROTOCOL ACTIVE</span>
                </div>
            </div>
        </aside>
    );
}