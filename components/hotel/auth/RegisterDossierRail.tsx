import Image from 'next/image';
import { RegisterDossierData, SovereignPrivilegeItem } from '../types/auth';

export const registerDossierDefaultData: RegisterDossierData = {
    dossierBadge: 'SANCTUARY DOSSIER • VOL. I',
    enclaveLocation: 'Cliffside Villa Enclave • Positano',
    coordinatesDisplay: '40°37\'42"N • 14°29\'12"E',
    manifestoQuote:
        '“An initiation into unhurried time, discreet recognition, and bespoke sanctuaries worldwide.”',
    heroImageUrl: '/limestone-villa.png',
    heroImageAlt:
        'Luxury Mediterranean cliffside stand-alone villa exterior, private infinity pool carved into sheer stone cliffs overlooking the sea at sunset',
    privilegesHeading: 'The Sovereign Folio Privileges',
    privilegesSubheading: 'INALIENABLE RIGHTS OF ACTIVE PATRON MEMBERSHIP',
    privileges: [
        {
            id: 'keyless',
            label: 'Discreet Keyless Folio',
            description:
                'Guaranteed late afternoon departure and private sea-gate entry bypass across all sovereign enclaves.',
            iconType: 'keyless',
        },
        {
            id: 'cellar',
            label: 'Rare Cru Cellar Allocation',
            description:
                'Pre-arrival access to subterranean volcanic cellars and reserved allocations of rare Tuscan and Piedmontese crus.',
            iconType: 'cellar',
        },
        {
            id: 'majordomo',
            label: 'Allocated Personal Majordomo',
            description:
                'Dedicated 24/7 private concierge and majordomo direct line (+39 089 875 111) from coordinates dispatch through departure.',
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

export interface RegisterDossierRailProps {
    data?: RegisterDossierData;
    className?: string;
}

export function RegisterDossierRail({
    data = registerDossierDefaultData,
    className = '',
}: RegisterDossierRailProps) {
    const {
        dossierBadge,
        enclaveLocation,
        coordinatesDisplay,
        manifestoQuote,
        heroImageUrl,
        heroImageAlt,
        privilegesHeading,
        privilegesSubheading,
        privileges,
        endorsement,
        protocolNotice,
    } = data;

    function renderPrivilegeIcon(type: SovereignPrivilegeItem['iconType']) {
        switch (type) {
            case 'keyless':
                return (
                    <svg
                        className="w-3.5 h-3.5 text-[#8e763b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        <circle cx="12" cy="16" r="1" />
                    </svg>
                );
            case 'cellar':
                return (
                    <svg
                        className="w-3.5 h-3.5 text-[#8e763b]"
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
            case 'majordomo':
                return (
                    <svg
                        className="w-3.5 h-3.5 text-[#8e763b]"
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
            default:
                return null;
        }
    }

    return (
        <aside
            className={`w-full h-full max-h-dvh flex flex-col align-center justify-between text-[#1f1e1d] overflow-hidden ${className}`}
        >
            {/* 1. SANCTUARY PHOTOGRAPHIC DOSSIER CARD */}
            <article className="relative w-full overflow-hidden bg-[#191817] shadow-lg shrink-0 group">
                <div className="relative h-55 w-full overflow-hidden">
                    <Image
                        src={heroImageUrl}
                        alt={heroImageAlt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 38vw"
                        className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Atmospheric Vignette & Contrast Gradients */}
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/20 pointer-events-none" />

                    {/* Top Monograph & Coordinates Badges */}
                    <div className="hidden lg:flex absolute top-2.5 left-3 right-3 z-10 items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded-xs bg-black/60 backdrop-blur-md text-white font-sans text-[8px] font-semibold uppercase tracking-[0.2em] shadow-xs">
                            {dossierBadge}
                        </span>

                        <span className="px-2 py-0.5 rounded-xs bg-[#8e763b] text-white font-mono text-[8px] font-medium tracking-wider shadow-xs">
                            {coordinatesDisplay}
                        </span>
                    </div>

                    {/* Bottom Floating Monograph Narrative */}
                    <div className="absolute bottom-2.5 left-3 right-3 z-10 text-white space-y-0.5">
                        <span className="text-[8.5px] font-sans uppercase tracking-[0.2em] text-[#dcdad5] block leading-none">
                            {enclaveLocation}
                        </span>

                        <blockquote className="font-serif italic font-light text-white/95 leading-snug tracking-tight line-clamp-2">
                            {manifestoQuote}
                        </blockquote>
                    </div>
                </div>
            </article>

            {/* 2. THE SOVEREIGN FOLIO PRIVILEGES CARD */}
            <article className="bg-[#fcf9f4] rounded-2xl p-3.5 sm:p-4 space-y-2.5 shrink-0 hidden lg:block">
                <div className="pb-2">
                    <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b]" />
                        <span className="text-[8px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e763b]">
                            {privilegesSubheading}
                        </span>
                    </div>
                    <h3 className="font-serif text-sm sm:text-base font-normal text-[#1f1e1d] tracking-tight leading-tight">
                        {privilegesHeading}
                    </h3>
                </div>

                {/* 3 Privileges Compact Stack */}
                <div className="space-y-2">
                    {privileges.map(function (priv) {
                        return (
                            <div
                                key={priv.id}
                                className="p-2 rounded-xl bg-white border border-[#ded9ce] shadow-2xs hover:border-[#8e763b]/60 transition-colors flex items-start gap-2.5"
                            >
                                <div className="p-1.5 rounded-lg bg-[#f6f2ea] border border-[#e8e4dc] shadow-2xs shrink-0 mt-0.5">
                                    {renderPrivilegeIcon(priv.iconType)}
                                </div>

                                <div className="min-w-0 space-y-0.5">
                                    <h4 className="font-serif text-xs font-semibold text-[#1f1e1d] tracking-tight leading-none truncate">
                                        {priv.label}
                                    </h4>
                                    <p className="text-[9.5px] text-[#6e6b64] font-sans font-light leading-snug line-clamp-2">
                                        {priv.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </article>

            {/* 3. PATRON ENDORSEMENT QUOTE PILL CARD */}
            <article className="p-3 space-y-2 shrink-0 hidden lg:block">
                <div className="flex items-center gap-1 text-[#8e763b]">
                    {Array.from({ length: 5 }).map(function (_, starIdx) {
                        return (
                            <svg
                                key={starIdx}
                                className="w-2.5 h-2.5 fill-current"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2l2.4 7.4h7.6l-6 4.5 2.3 7.1-6.3-4.6-6.3 4.6 2.3-7.1-6-4.5h7.6z" />
                            </svg>
                        );
                    })}
                </div>

                <blockquote className="font-serif italic text-[11px] text-[#2d2b27] font-light leading-snug line-clamp-2">
                    {endorsement.quote}
                </blockquote>

                <div className="hidden lg:flex pt-2 border-t border-[#ded9ce] items-center gap-2.5">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#bfa76f] bg-[#eeeae2] shrink-0">
                        <Image
                            src={endorsement.avatarUrl}
                            alt={endorsement.avatarAlt}
                            fill
                            sizes="28px"
                            className="object-cover object-center"
                        />
                    </div>

                    <div className="min-w-0">
                        <span className="font-serif text-[11px] font-semibold text-[#1f1e1d] block tracking-tight leading-tight truncate">
                            {endorsement.authorName}
                        </span>
                        <span className="text-[8px] font-mono text-[#8e8a82] uppercase tracking-wider block leading-tight truncate">
                            {endorsement.folioCode}
                        </span>
                    </div>
                </div>
            </article>

            {/* 4. MICRO PROTOCOL NOTIFICATION STRIP */}
            <div className="hidden lg:flex px-1 pt-1 items-center justify-between text-[8px] font-mono uppercase tracking-widest text-[#8e8a82] shrink-0 leading-none">
                <span className="truncate pr-2">{protocolNotice}</span>
                <span className="text-[#8e763b] shrink-0">✦ SEALED</span>
            </div>
        </aside>
    );
}