import Image from 'next/image';
import Link from 'next/link';

// ============================================================================
// 1. SELF-CONTAINED TYPE CONTRACTS
// ============================================================================

export interface SovereignPrivilegeItem {
    id: string;
    label: string;
    description: string;
    iconType: 'keyless' | 'cellar' | 'majordomo';
}

export interface PatronEndorsementData {
    quote: string;
    authorName: string;
    folioCode: string;
    avatarUrl: string;
    avatarAlt: string;
}

export interface RegisterDossierData {
    brandName: string;
    brandSub: string;
    dossierBadge: string;
    enclaveLocation: string;
    coordinatesDisplay: string;
    manifestoQuote: string;
    manifestoSubtext: string;
    heroImageUrl: string;
    heroImageAlt: string;
    privilegesHeading: string;
    privilegesSubheading: string;
    privileges: SovereignPrivilegeItem[];
    endorsement: PatronEndorsementData;
    protocolNotice: string;
}

// ============================================================================
// 2. CANONICAL DEFAULT DOSSIER DATA
// ============================================================================

export const REGISTER_DOSSIER_DATA: RegisterDossierData = {
    brandName: 'Aurelia',
    brandSub: 'HOTELS & RESIDENCES',
    dossierBadge: 'SANCTUARY DOSSIER • VOL. I',
    enclaveLocation: 'CLIFFSIDE VILLA ENCLAVE • POSITANO',
    coordinatesDisplay: '40°37\'42"N • 14°29\'12"E',
    manifestoQuote: '“An initiation into unhurried time, discreet recognition, and bespoke sanctuaries worldwide.”',
    manifestoSubtext: 'A confidential patronage docket establishing priority allocations, private Riva tender slipways, and pre-arrival sensory suite calibrations across our global coastal and alpine enclaves.',
    heroImageUrl: '/limestone-villa.png',
    heroImageAlt: 'Luxury Mediterranean cliffside stand-alone villa exterior, private infinity pool carved into sheer stone cliffs overlooking the sea at sunset',
    privilegesHeading: 'Sovereign Patron Privileges Active',
    privilegesSubheading: 'INALIENABLE RIGHTS OF ACTIVE PATRON MEMBERSHIP',
    privileges: [
        {
            id: 'keyless',
            label: 'Discreet Keyless Folio',
            description: 'Guaranteed late afternoon departure & private sea-gate entry bypass.',
            iconType: 'keyless',
        },
        {
            id: 'cellar',
            label: 'Rare Cru Cellar Allocation',
            description: 'Subterranean volcanic vault allocations of rare Tuscan and Piedmontese crus.',
            iconType: 'cellar',
        },
        {
            id: 'majordomo',
            label: 'Allocated Personal Majordomo',
            description: 'Dedicated 24/7 private concierge and telephone line (+39 089 875 111).',
            iconType: 'majordomo',
        },
    ],
    endorsement: {
        quote: '“The sensory continuity from Positano to Kyoto feels utterly seamless. Aurelia is not a hotel group, but a quiet state of mind.”',
        authorName: 'Lady Katherine V.',
        folioCode: 'SOVEREIGN FOLIO #8911 • MEMBER SINCE 2021',
        avatarUrl: '/garden-pavillion.png',
        avatarAlt: 'Editorial portrait of verified sovereign patron Lady Katherine V.',
    },
    protocolNotice: 'AURELIA DIPLOMATIC IMMUNITY PROTOCOL • MONOLITHIC CHARTER EST. 1928',
};

// ============================================================================
// 3. PURE SERVER COMPONENT IMPLEMENTATION (0 KB Client Bundle)
// ============================================================================

export interface RegisterDossierRailProps {
    data?: Partial<RegisterDossierData>;
    className?: string;
}

export function RegisterDossierRail({
    data = {},
    className = '',
}: RegisterDossierRailProps) {
    const mergedData: RegisterDossierData = {
        ...REGISTER_DOSSIER_DATA,
        ...data,
    };

    const {
        dossierBadge,
        enclaveLocation,
        coordinatesDisplay,
        manifestoQuote,
        manifestoSubtext,
        heroImageUrl,
        heroImageAlt,
        privilegesHeading,
        privileges,
        endorsement,
        protocolNotice,
    } = mergedData;

    function renderPrivilegeIcon(type: SovereignPrivilegeItem['iconType']) {
        switch (type) {
            case 'keyless':
                return (
                    <svg
                        className="w-4 h-4 text-[#bfa76f] shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        <circle cx="12" cy="16" r="1.5" />
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
                        aria-hidden="true"
                    >
                        <path d="M8 22h8" />
                        <path d="M12 11v11" />
                        <path d="M19 3l-7 8-7-8h14z" />
                    </svg>
                );
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
                        aria-hidden="true"
                    >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                        <path d="M16 11l2 2 4-4" />
                    </svg>
                );
            default:
                return null;
        }
    }

    return (
        <div
            className={`relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#181716] text-[#fcf9f4] p-6 sm:p-8 lg:p-10 select-none ${className}`}
        >
            {/* 1. Full-Bleed Photographic Background & Vignettes */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={heroImageUrl}
                    alt={heroImageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center transform scale-[1.01]"
                />
                <div className="absolute inset-0 bg-[#141312]/65 mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-0 bg-linear-to-t from-[#141312] via-[#141312]/75 to-[#141312]/45 pointer-events-none" />
                <div className="absolute inset-0 bg-linear-to-r from-[#141312]/85 via-[#141312]/20 to-transparent pointer-events-none" />
            </div>

            {/* 2. Top Masthead: Brand Lockup & Coordinates */}
            <div className="relative z-10 w-full flex items-center justify-between gap-3 shrink-0">
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

                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-black/45 backdrop-blur-md border border-white/10 text-[8.5px] font-mono uppercase tracking-[0.18em] text-[#dcdad5] shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bfa76f] animate-pulse" />
                    <span>{coordinatesDisplay}</span>
                </div>
            </div>

            {/* 3. Center Monograph: Manifesto Pull-Quote & Endorsement Capsule */}
            <div className="relative z-10 my-auto py-4 sm:py-6 max-w-lg space-y-3.5">
                <div className="flex items-center gap-2">
                    <span className="h-px w-6 bg-[#bfa76f]" />
                    <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.24em] text-[#bfa76f]">
                        {dossierBadge}
                    </span>
                </div>

                <blockquote className="font-serif italic text-xl sm:text-2xl lg:text-[26px] font-light text-white leading-tight tracking-tight">
                    {manifestoQuote}
                </blockquote>

                <p className="text-[11px] sm:text-xs text-[#c7c3ba] font-sans font-light leading-relaxed line-clamp-2">
                    {manifestoSubtext}
                </p>

                {/* Verified Resident Endorsement Capsule Card */}
                <div className="p-3 bg-black/50 backdrop-blur-md border border-white/10 space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[#bfa76f]" aria-label="5 out of 5 stars">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <svg key={i} className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2l2.4 7.4h7.6l-6 4.5 2.3 7.1-6.3-4.6-6.3 4.6 2.3-7.1-6-4.5h7.6z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-[7.5px] font-mono uppercase tracking-widest text-white/50">
                            VERIFIED RESIDENT
                        </span>
                    </div>

                    <p className="font-serif italic text-[11px] text-[#dcdad5] font-light leading-snug line-clamp-2">
                        {endorsement.quote}
                    </p>

                    <div className="pt-1 border-t border-white/10 flex items-center gap-2">
                        <div className="relative w-5 h-5 rounded-full overflow-hidden border border-[#bfa76f]/60 bg-white/5 shrink-0">
                            <Image
                                src={endorsement.avatarUrl}
                                alt={endorsement.avatarAlt}
                                fill
                                sizes="20px"
                                className="object-cover object-center"
                            />
                        </div>
                        <div className="min-w-0">
                            <span className="font-serif text-[10px] font-medium text-white block tracking-tight truncate leading-tight">
                                {endorsement.authorName} • <span className="font-mono text-[#bfa76f] text-[7.5px]">{endorsement.folioCode}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Bottom Floating Privileges Card & Sealed Notice */}
            <div className="relative z-10 w-full space-y-2.5 shrink-0">
                <div className="bg-black/60 backdrop-blur-xl border border-white/15 p-3.5 sm:p-4 shadow-xl space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#bfa76f] animate-pulse" />
                            <span className="text-[8.5px] font-sans font-semibold uppercase tracking-[0.2em] text-[#bfa76f]">
                                {privilegesHeading}
                            </span>
                        </div>
                        <span className="text-[7.5px] font-mono text-white/40 uppercase tracking-widest">
                            CONFIDENTIAL
                        </span>
                    </div>

                    {/* 3 Privileges Compact Stack */}
                    <div className="space-y-1.5">
                        {privileges.map((priv) => (
                            <div
                                key={priv.id}
                                className="p-2 bg-white/4 border border-white/10 flex items-start gap-2.5"
                            >
                                <div className="p-1 bg-black/40 border border-white/10 text-[#bfa76f] shrink-0 mt-0.5">
                                    {renderPrivilegeIcon(priv.iconType)}
                                </div>
                                <div className="min-w-0 space-y-0.5">
                                    <h4 className="font-serif text-[11px] font-medium text-white/95 tracking-tight leading-snug truncate">
                                        {priv.label}
                                    </h4>
                                    <p className="text-[9.5px] text-[#a4a098] font-sans font-light leading-snug line-clamp-1">
                                        {priv.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Diplomatic Protocol Footnote */}
                <div className="flex items-center justify-between text-[7.5px] font-mono uppercase tracking-[0.18em] text-[#8e8a82] px-1">
                    <span className="truncate pr-2">{protocolNotice}</span>
                    <span className="inline-flex items-center gap-1 text-[#bfa76f] shrink-0 font-medium">
                        <span className="w-1 h-1 rounded-full bg-emerald-500" />
                        SEALED
                    </span>
                </div>
            </div>
        </div>
    );

}

export default RegisterDossierRail;