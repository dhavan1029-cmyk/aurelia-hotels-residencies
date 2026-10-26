import { PrivilegesAndPoliciesData } from '../types/accommodations';

export const suite402PrivilegesData: PrivilegesAndPoliciesData = {
    privilegesEyebrow: 'EXCLUSIVE SANCTUARY INCLUSIONS',
    privilegesHeading: 'Curated Privileges of Suite 402',
    privilegesDescription:
        'Every reservation within the Azure Master Ocean Suite includes dedicated bespoke accommodations, restorative wellness access, and direct concierge privileges.',
    privilegesList: [
        {
            id: 'majordomo',
            title: 'Dedicated 24-Hour Majordomo',
            description:
                'Discreet, personalized butler service attending to wardrobe unpacking, evening turndown calibrations, and private in-suite dining.',
            badge: 'BESPOKE SERVICE',
            icon: (
                <svg
                    className="w-5 h-5 text-[#8e763b]"
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
            ),
        },
        {
            id: 'thermal-pass',
            title: 'Subterranean Thermal Circuit Pass',
            description:
                'Daily private access to the volcanic stone Caldarium and mineral hydrotherapy pools, chiseled directly into coastal bedrock.',
            badge: 'UNLIMITED ACCESS',
            icon: (
                <svg
                    className="w-5 h-5 text-[#8e763b]"
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
            ),
        },
        {
            id: 'orchard-breakfast',
            title: 'Artisan Orchard Breakfast',
            description:
                'Served privately on your oceanfront loggia or within the olive grove terrace, featuring fresh Campanian citrus, baked brioche, and farm honey.',
            badge: 'IN-SUITE SERVED',
            icon: (
                <svg
                    className="w-5 h-5 text-[#8e763b]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M18 2l-4 4-2-2 4-4 2 2z" />
                    <path d="M14 6l-9 9a2 2 0 0 0 0 2.83l.17.17a2 2 0 0 0 2.83 0l9-9" />
                    <path d="M6 18l-3 3" />
                    <path d="M2 14l2-2" />
                    <path d="M12 2l8 8" />
                </svg>
            ),
        },
        {
            id: 'sommelier-hour',
            title: 'Sunset Sommelier Aperitivo',
            description:
                'Curated reserve vintage pours and regional cicchetti served at twilight overlooking the Tyrrhenian horizon.',
            badge: 'DAILY TWILIGHT',
            icon: (
                <svg
                    className="w-5 h-5 text-[#8e763b]"
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
            ),
        },
    ],
    policiesEyebrow: 'SANCTUARY PROTOCOLS & COURTESY',
    policiesHeading: 'Arrival, Stay Horizon & Sanctuary Etiquette',
    policies: [
        {
            label: 'Check-In Protocol',
            value: 'From 15:00',
            details: 'Early arrival honored with private luggage reception and garden salon welcome.',
        },
        {
            label: 'Departure Protocol',
            value: 'Until 12:00',
            details: 'Late checkout subject to seasonal availability upon majordomo request.',
        },
        {
            label: 'Guaranteed Cancellation',
            value: 'Flexible 14-Day Courtesy',
            details: 'Full folio return when notified at least 14 days prior to confirmed arrival date.',
        },
        {
            label: 'Patron Composition',
            value: 'Max 3 Patrons (Adults & Teens)',
            details: 'Accommodates up to 3 guests with tailored linen daybed arrangements.',
        },
    ],
    conciergeNotice:
        'All arrivals via Riva yacht or private helicopter must provide coordinate notice 48 hours in advance to guarantee slip and helipad clearance.',
};

export interface PrivilegesAndPoliciesProps {
    data?: PrivilegesAndPoliciesData;
    className?: string;
}

export function PrivilegesAndPoliciesSection({
    data = suite402PrivilegesData,
    className = '',
}: PrivilegesAndPoliciesProps) {
    const {
        privilegesEyebrow,
        privilegesHeading,
        privilegesDescription,
        privilegesList,
        policiesEyebrow,
        policiesHeading,
        policies,
        conciergeNotice,
    } = data;

    return (
        <div className={`space-y-10 sm:space-y-12 ${className}`}>
            {/* 1. Curated Privileges Bento Grid Card */}
            <article className="bg-white border border-[#e8e4dc] rounded-lg p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                <div>
                    <span className="block text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#8e763b] mb-2.5">
                        {privilegesEyebrow}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#1f1e1d] tracking-tight leading-[1.2]">
                        {privilegesHeading}
                    </h2>
                    <p className="mt-3 text-xs sm:text-[13px] md:text-sm text-[#5f5c56] font-sans font-light leading-relaxed max-w-2xl">
                        {privilegesDescription}
                    </p>
                </div>

                {/* 4 Inclusions 2x2 Grid */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                    {privilegesList.map(function (item) {
                        return (
                            <div
                                key={item.id}
                                className="group bg-white border border-[#ded9ce] rounded-xl p-5 sm:p-6 transition-all duration-300 hover:border-[#8e763b] hover:shadow-xs flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-4">
                                        <div className="p-2.5 rounded-lg bg-[#f6f2ea] border border-[#e8e4dc] shadow-2xs shrink-0 group-hover:bg-white group-hover:border-[#ded9ce] transition-colors">
                                            {item.icon}
                                        </div>

                                        {item.badge && (
                                            <span className="px-2.5 py-0.5 rounded-sm bg-[#f2ede4] border border-[#ded9ce] text-[9px] font-sans font-semibold uppercase tracking-[0.16em] text-[#8e763b]">
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1f1e1d] tracking-tight group-hover:text-[#8e763b] transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-xs sm:text-[13px] text-[#6e6b64] font-sans font-light leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </article>

            {/* 2. Sanctuary Policies & Courtesy Protocol Card */}
            <article className="bg-white border border-[#e8e4dc] rounded-lg p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                <div className="border-b border-[#eeeae2] pb-5 mb-6">
                    <span className="block text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#8e763b] mb-1">
                        {policiesEyebrow}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-[28px] font-normal text-[#1f1e1d] tracking-tight">
                        {policiesHeading}
                    </h3>
                </div>

                {/* 4 Policies Columns / Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                    {policies.map(function (pol, idx) {
                        return (
                            <div
                                key={idx}
                                className="p-4 sm:p-5 rounded-xl bg-[#f6f2ea]/70 border border-[#e8e4dc] flex flex-col justify-between"
                            >
                                <div>
                                    <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e8a82]">
                                        {pol.label}
                                    </span>
                                    <span className="font-serif text-base sm:text-lg font-normal text-[#1f1e1d] block mt-1 tracking-tight">
                                        {pol.value}
                                    </span>
                                </div>
                                {pol.details && (
                                    <p className="text-[11px] text-[#716e67] font-sans font-light mt-3 leading-relaxed border-t border-[#ded9ce] pt-2.5">
                                        {pol.details}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Concierge Maritime / Helipad Advisory Footer */}
                <div className="mt-6 pt-5 border-t border-[#eeeae2] flex items-center gap-3 p-4 rounded-xl bg-white border text-xs font-sans text-[#5c5952]">
                    <svg
                        className="w-4 h-4 text-[#8e763b] shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    <p className="font-light leading-relaxed">
                        <strong className="font-semibold text-[#1f1e1d]">Arrival Advisory: </strong>
                        {conciergeNotice}
                    </p>
                </div>
            </article>
        </div>
    );
}