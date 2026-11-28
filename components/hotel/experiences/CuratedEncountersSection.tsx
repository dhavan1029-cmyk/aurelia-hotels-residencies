import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ============================================================================
// 1. DATA CONTRACTS & VIEWMODELS
// ============================================================================

export interface EncounterMetricPill {
    primary: string;
    sublabel: string;
}

export interface SignatureEncounterItem {
    id: string;
    slug: string;
    badgeCategory: string;
    imageUrl: string;
    imageAlt: string;
    priceFormatted: string;
    priceUnit: string;
    metrics: EncounterMetricPill[];
    title: string;
    description: string;
    inclusionFootnote: string;
    ctaLabel: string;
    ctaHref: string;
}

export interface SanctuaryCredentialMetric {
    id: string;
    iconType: 'fleet' | 'cellar' | 'spring' | 'majordomo';
    eyebrow: string;
    value: string;
    description: string;
}

export interface CuratedEncountersSectionData {
    sectionEyebrow: string;
    sectionTitle: string;
    reservationsWindowNotice: string;
    encounters: SignatureEncounterItem[];
    credentials?: SanctuaryCredentialMetric[];
}

export interface CuratedEncountersSectionProps {
    data?: Partial<CuratedEncountersSectionData>;
    encounters?: SignatureEncounterItem[];
    credentials?: SanctuaryCredentialMetric[];
}

// ============================================================================
// 2. SUB-COMPONENT: Credentials Metric Icon
// ============================================================================

function CredentialIcon({ type }: { type: SanctuaryCredentialMetric['iconType'] }) {
    switch (type) {
        case 'fleet':
            return (
                <svg
                    className="w-4 h-4 text-[#8e763b] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 13.5l3-3m0 0l3 3m-3-3v9m15-9l-3-3m0 0l-3 3m3-3v9M4 20h16"
                    />
                </svg>
            );
        case 'cellar':
            return (
                <svg
                    className="w-4 h-4 text-[#8e763b] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                </svg>
            );
        case 'spring':
            return (
                <svg
                    className="w-4 h-4 text-[#8e763b] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                </svg>
            );
        case 'majordomo':
            return (
                <svg
                    className="w-4 h-4 text-[#8e763b] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                </svg>
            );
    }
}

// ============================================================================
// 3. SUB-COMPONENT: Serene Architectural Empty State
// ============================================================================

function EncountersEmptyState() {
    return (
        <div className="w-full bg-white border border-[#e8e4dc] p-10 sm:p-14 text-center space-y-5 shadow-[0_4px_24px_rgba(31,30,29,0.02)]">
            <div className="w-10 h-10 mx-auto rounded-full bg-[#f6f2ea] border border-[#ded9ce] flex items-center justify-center text-[#8e763b]">
                <span className="font-serif text-lg leading-none">✦</span>
            </div>

            <div className="space-y-2 max-w-md mx-auto">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#8e763b] uppercase block">
                    TERROIR SECLUSION • SEASONAL CURATION
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#1f1e1d] tracking-tight">
                    No Encounters Listed for this Season
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed text-[#6e685f] font-sans font-light">
                    Private expeditions and bespoke terroir tastings for this enclave are currently being curated or reserved for sovereign buyouts. Contact the Majordomo desk to arrange an individualized itinerary.
                </p>
            </div>

            <div className="pt-2">
                <Link
                    href="/contact?subject=bespoke-encounters"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1f1e1d] hover:bg-[#343230] text-[#fcf9f4] text-[10px] font-mono tracking-[0.2em] uppercase transition-colors"
                >
                    <span>Consult Majordomo Desk</span>
                    <span className="text-xs">→</span>
                </Link>
            </div>
        </div>
    );
}

// ============================================================================
// 4. SUB-COMPONENT: Individual Encounter Card
// ============================================================================

function EncounterCard({ item }: { item: SignatureEncounterItem }) {
    return (
        <article className="bg-white border border-[#e8e4dc] flex flex-col justify-between shadow-[0_4px_20px_rgba(31,30,29,0.03)] overflow-hidden">
            <div>
                {/* Upper Image Container with Scrim & Price Pill */}
                <div className="relative w-full h-55 sm:h-57.5 bg-[#1f1e1d]">
                    {item.imageUrl ? (
                        <Image
                            src={item.imageUrl}
                            alt={item.imageAlt || item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#242220] text-[#8e763b] font-mono text-[10px] tracking-widest uppercase">
                            Sanctuary Archive
                        </div>
                    )}

                    {/* Bottom Dark Gradient Scrim */}
                    <div
                        className="absolute inset-0 bg-linear-to-t from-[#1f1e1d]/85 via-[#1f1e1d]/20 to-transparent"
                        aria-hidden="true"
                    />

                    {/* Category Badge (Top Left) */}
                    {item.badgeCategory && (
                        <div className="absolute top-3.5 left-3.5">
                            <span className="bg-[#1f1e1d]/90 text-[#fcf9f4] px-2.5 py-1 text-[9px] font-mono tracking-[0.18em] uppercase">
                                {item.badgeCategory}
                            </span>
                        </div>
                    )}

                    {/* Tariff Label Overlay (Bottom Left & Right) */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between text-[#fcf9f4]">
                        <span className="text-xl sm:text-[22px] font-serif leading-none tracking-tight">
                            {item.priceFormatted}
                        </span>
                        <span className="text-[9px] font-mono tracking-[0.18em] text-[#dcdad5] uppercase">
                            {item.priceUnit}
                        </span>
                    </div>
                </div>

                {/* Metrics Header Strip */}
                {item.metrics && item.metrics.length > 0 && (
                    <div
                        className={`grid border-b border-[#e8e4dc] bg-[#fcf9f4] divide-x divide-[#e8e4dc] py-2 px-3 text-center ${
                            item.metrics.length === 1
                                ? 'grid-cols-1'
                                : item.metrics.length === 2
                                  ? 'grid-cols-2'
                                  : 'grid-cols-3'
                        }`}
                    >
                        {item.metrics.map(function (metric, mIdx) {
                            return (
                                <div key={mIdx} className="space-y-0.5">
                                    <span className="block text-[9px] font-mono font-semibold tracking-[0.14em] text-[#1f1e1d]">
                                        {metric.primary}
                                    </span>
                                    <span className="block text-[8px] font-mono tracking-[0.12em] text-[#7c756c] uppercase">
                                        {metric.sublabel}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Card Middle Narrative */}
                <div className="p-5 sm:p-6 space-y-3">
                    <h3 className="text-lg sm:text-[19px] font-serif text-[#1f1e1d] leading-snug">
                        {item.title}
                    </h3>
                    <p className="text-[12.5px] leading-[1.65] text-[#5c564f] font-sans font-light">
                        {item.description}
                    </p>
                </div>
            </div>

            {/* Bottom Footnote Strip & Inquire CTA */}
            <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#f6f3ee] flex items-center justify-between gap-3">
                <span className="text-[10px] font-mono tracking-[0.16em] text-[#8e763b] uppercase truncate">
                    {item.inclusionFootnote || 'DIRECT PROTOCOL'}
                </span>

                <Link
                    href={item.ctaHref || `/contact?experience=${encodeURIComponent(item.slug || item.id)}`}
                    className="bg-[#f6f3ee] hover:bg-[#1f1e1d] hover:text-[#fcf9f4] text-[#1f1e1d] border border-[#e8e4dc] transition-all px-4 py-2 text-[10px] font-mono tracking-[0.16em] uppercase text-center shrink-0"
                >
                    {item.ctaLabel || 'Inquire Session'}
                </Link>
            </div>
        </article>
    );
}

// ============================================================================
// 5. MASTER COMPONENT: CuratedEncountersSection
// ============================================================================

export function CuratedEncountersSection({
    data,
    encounters: propEncounters,
    credentials: propCredentials,
}: CuratedEncountersSectionProps) {
    const sectionEyebrow = data?.sectionEyebrow || 'PRIVATE RITES • SENSORY CATALOG';
    const sectionTitle = data?.sectionTitle || 'Curated Signature Encounters';
    const reservationsWindowNotice = data?.reservationsWindowNotice || 'RESERVATIONS GOVERNED BY MAJORDOMO DESK';

    // Support both `data.encounters` and top-level prop `encounters` with zero fake fallbacks
    const rawEncounters = propEncounters || data?.encounters;
    const encounters = Array.isArray(rawEncounters) ? rawEncounters : [];

    // Support both `data.credentials` and top-level prop `credentials`
    const rawCredentials = propCredentials || data?.credentials;
    const credentials = Array.isArray(rawCredentials) ? rawCredentials : [];

    const hasEncounters = encounters.length > 0;
    const hasCredentials = credentials.length > 0;

    return (
        <section
            aria-labelledby="signature-encounters-heading"
            className="w-full bg-[#fcf9f4] pt-4 pb-16"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 sm:space-y-14">
                {/* Section Header with Live Booking Status */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e8e4dc] pb-5">
                    <div className="space-y-1.5">
                        <p className="text-[10px] sm:text-[10.5px] font-mono tracking-[0.22em] text-[#8e763b] uppercase">
                            {sectionEyebrow}
                        </p>
                        <h2
                            id="signature-encounters-heading"
                            className="text-2xl sm:text-3xl lg:text-[34px] font-serif text-[#1f1e1d] leading-snug"
                        >
                            {sectionTitle}
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 text-[10.5px] font-mono tracking-[0.16em] text-[#7c756c] uppercase pb-1">
                        <span
                            className={`inline-block w-2 h-2 rounded-full ${
                                hasEncounters ? 'bg-[#8e763b]' : 'bg-[#a39c91]'
                            }`}
                            aria-hidden="true"
                        />
                        <span>{reservationsWindowNotice}</span>
                    </div>
                </div>

                {/* Encounters Display: 0, 1, 2, or 3+ */}
                {!hasEncounters ? (
                    <EncountersEmptyState />
                ) : encounters.length === 1 ? (
                    <div className="max-w-lg mx-auto">
                        <EncounterCard item={encounters[0]} />
                    </div>
                ) : encounters.length === 2 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 max-w-4xl mx-auto items-stretch">
                        {encounters.map(function (item) {
                            return <EncounterCard key={item.id} item={item} />;
                        })}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
                        {encounters.map(function (item) {
                            return <EncounterCard key={item.id} item={item} />;
                        })}
                    </div>
                )}

                {/* Institutional Credentials Bar (Rendered only when real credentials are provided) */}
                {hasCredentials && (
                    <div className="w-full bg-[#f6f3ee] border border-[#e8e4dc] p-6 sm:p-8">
                        <div
                            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#e8e4dc] ${
                                credentials.length >= 4 ? 'lg:grid-cols-4' : `lg:grid-cols-${credentials.length}`
                            }`}
                        >
                            {credentials.map(function (metric, idx) {
                                return (
                                    <div
                                        key={metric.id}
                                        className={`space-y-1.5 ${idx > 0 ? 'pt-5 sm:pt-0 sm:pl-6 lg:pl-8' : ''}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <CredentialIcon type={metric.iconType} />
                                            <span className="text-[9.5px] font-mono tracking-[0.2em] text-[#8e763b] uppercase">
                                                {metric.eyebrow}
                                            </span>
                                        </div>
                                        <p className="text-xl sm:text-2xl font-serif text-[#1f1e1d] tracking-tight">
                                            {metric.value}
                                        </p>
                                        <p className="text-[11.5px] leading-relaxed text-[#5c564f]">
                                            {metric.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default CuratedEncountersSection;
