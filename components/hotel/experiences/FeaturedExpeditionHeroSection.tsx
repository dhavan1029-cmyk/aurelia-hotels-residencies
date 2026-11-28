
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ============================================================================
// 1. DATA CONTRACTS & VIEWMODELS
// ============================================================================

export interface ExpeditionSpecItem {
    id: string;
    label: string;
    value: string;
    iconType: 'duration' | 'party' | 'crew' | 'culinary';
}

export interface FeaturedExpeditionData {
    id: string;
    slug: string;
    badgePrimary: string;
    badgeSecondary: string;
    imageUrl: string;
    imageAlt: string;
    circuitLabel: string;
    imageHeadline: string;
    categoryEyebrow: string;
    title: string;
    tariffLabel: string;
    priceFormatted: string;
    description: string;
    specs: ExpeditionSpecItem[];
    inclusions: string[];
    dossierPdfUrl?: string;
}

export interface FeaturedExpeditionHeroSectionProps {
    data?: Partial<FeaturedExpeditionData>;
}

// ============================================================================
// 2. DEFAULT FALLBACK DATA (Matches Screen Design)
// ============================================================================

const DEFAULT_FEATURED_EXPEDITION: FeaturedExpeditionData = {
    id: 'exp-riva-odyssey',
    slug: 'riva-heritage-coastal-odyssey',
    badgePrimary: 'FLAGSHIP EXPEDITION',
    badgeSecondary: 'RESTORED 1968 RIVA AQUARAMA SPECIAL',
    imageUrl: '/images/experiences/riva-aquarama-capri.jpg',
    imageAlt: 'Restored 1968 Riva Aquarama cruising past the Faraglioni of Capri',
    circuitLabel: 'AMALFI • FARAGLIONI OF CAPRI CIRCUIT',
    imageHeadline: 'Capri Sea Grottoes & Faraglioni Private Cruise',
    categoryEyebrow: 'MARINE CHARTER • EXPEDITION NO. 01',
    title: 'Riva Heritage Coastal Odyssey',
    tariffLabel: 'TARIFF / GUEST',
    priceFormatted: '€1,850',
    description:
        "Embark from the private Sanctuary sea dock at dawn aboard our hand-varnished Riva Aquarama. Glide silently into the emerald caves of Nerano, drop anchor beneath Capri's iconic Faraglioni monoliths, and savor a chilled cellar collation accompanied by estate-bottled vintage reserves.",
    specs: [
        {
            id: 'duration',
            label: 'DURATION',
            value: '480 Min (8.0 Hours)',
            iconType: 'duration',
        },
        {
            id: 'party',
            label: 'PARTY ALLOTMENT',
            value: 'Up to 6 Patrons',
            iconType: 'party',
        },
        {
            id: 'crew',
            label: 'MASTER CREW',
            value: 'Skipper & Sommelier',
            iconType: 'crew',
        },
        {
            id: 'culinary',
            label: 'CULINARY PROVISIONS',
            value: 'In-Cove Crudo Feast',
            iconType: 'culinary',
        },
    ],
    inclusions: [
        'Private tender transfers directly from Sanctuary Cliffside Pontoon',
        'Dom Pérignon 2013 allocation & wild Mediterranean sea urchin crudo',
        'Sub-surface motorized Seabob exploration units & customized bath linens',
    ],
    dossierPdfUrl: '/dossiers/riva-heritage-coastal-odyssey.pdf',
};

// ============================================================================
// 3. HELPER: SPEC ICON RENDERER
// ============================================================================

function SpecIcon({ type }: { type: ExpeditionSpecItem['iconType'] }) {
    switch (type) {
        case 'duration':
            return (
                <svg className="w-3.5 h-3.5 text-[#8e763b] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        case 'party':
            return (
                <svg className="w-3.5 h-3.5 text-[#8e763b] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            );
        case 'crew':
            return (
                <svg className="w-3.5 h-3.5 text-[#8e763b] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            );
        case 'culinary':
            return (
                <svg className="w-3.5 h-3.5 text-[#8e763b] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            );
    }
}

// ============================================================================
// 4. MAIN COMPONENT: FeaturedExpeditionHeroSection
// ============================================================================

export function FeaturedExpeditionHeroSection({ data }: FeaturedExpeditionHeroSectionProps) {
    const expedition: FeaturedExpeditionData = {
        ...DEFAULT_FEATURED_EXPEDITION,
        ...data,
        specs: data?.specs && data.specs.length > 0 ? data.specs : DEFAULT_FEATURED_EXPEDITION.specs,
        inclusions:
            data?.inclusions && data.inclusions.length > 0
                ? data.inclusions
                : DEFAULT_FEATURED_EXPEDITION.inclusions,
    };

    return (
        <section
            aria-label={expedition.title}
            className="w-full max-w-7xl mx-auto px-4 sm:px-8 pb-14"
        >
            <article className="bg-white border border-[#e8e4dc] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-[0_8px_32px_rgba(31,30,29,0.04)]">
                {/* Left Column (7 cols): Full-Bleed Maritime Photography */}
                <div className="lg:col-span-7 relative min-h-95 sm:min-h-120 lg:min-h-135 bg-[#1f1e1d]">
                    <Image
                        src={expedition.imageUrl}
                        alt={expedition.imageAlt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover"
                    />

                    {/* Subtle Dark Bottom Scrim */}
                    <div
                        className="absolute inset-0 bg-linear-to-t from-[#1f1e1d]/85 via-[#1f1e1d]/20 to-transparent"
                        aria-hidden="true"
                    />

                    {/* Top-Left Badges */}
                    <div className="absolute top-5 left-5 right-5 flex flex-wrap items-center gap-2">
                        <span className="bg-[#1f1e1d] text-[#fcf9f4] text-[9.5px] font-mono tracking-[0.2em] uppercase px-2.5 py-1">
                            {expedition.badgePrimary}
                        </span>
                        <span className="bg-[#fcf9f4]/95 text-[#1f1e1d] text-[9.5px] font-mono tracking-[0.16em] uppercase px-2.5 py-1">
                            {expedition.badgeSecondary}
                        </span>
                    </div>

                    {/* Bottom-Left Overlay Title */}
                    <div className="absolute bottom-6 left-6 right-6 space-y-1.5">
                        <p className="text-[10px] font-mono tracking-[0.22em] text-[#bfa76f] uppercase">
                            {expedition.circuitLabel}
                        </p>
                        <h2 className="text-2xl sm:text-[28px] font-serif text-[#fcf9f4] leading-tight">
                            {expedition.imageHeadline}
                        </h2>
                    </div>
                </div>

                {/* Right Column (5 cols): Technical Specs & Reservation Dossier */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
                    <div>
                        {/* Header Row: Title & Tariff */}
                        <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#e8e4dc]">
                            <div className="space-y-1">
                                <p className="text-[10px] font-mono tracking-[0.2em] text-[#8e763b] uppercase">
                                    {expedition.categoryEyebrow}
                                </p>
                                <h3 className="text-2xl sm:text-[26px] font-serif text-[#1f1e1d] leading-snug">
                                    {expedition.title}
                                </h3>
                            </div>

                            <div className="text-right shrink-0">
                                <p className="text-[9px] font-mono tracking-[0.18em] text-[#7c756c] uppercase">
                                    {expedition.tariffLabel}
                                </p>
                                <p className="text-xl sm:text-2xl font-serif text-[#1f1e1d] mt-0.5">
                                    {expedition.priceFormatted}
                                </p>
                            </div>
                        </div>

                        {/* Narrative Description */}
                        <p className="text-[13px] leading-[1.68] text-[#5c564f] mt-5">
                            {expedition.description}
                        </p>

                        {/* 2x2 Technical Specification Grid */}
                        <div className="grid grid-cols-2 gap-3 my-6">
                            {expedition.specs.map(function (spec) {
                                return (
                                    <div
                                        key={spec.id}
                                        className="bg-[#f6f3ee] border border-[#e8e4dc]/70 p-3 space-y-1"
                                    >
                                        <div className="flex items-center gap-1.5">
                                            <SpecIcon type={spec.iconType} />
                                            <span className="text-[9.5px] font-mono tracking-[0.16em] text-[#7c756c] uppercase">
                                                {spec.label}
                                            </span>
                                        </div>
                                        <p className="text-[12.5px] font-semibold text-[#1f1e1d]">
                                            {spec.value}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Inclusions Checklist */}
                        <ul className="space-y-2 mb-7">
                            {expedition.inclusions.map(function (item, idx) {
                                return (
                                    <li key={idx} className="flex items-start gap-2.5 text-[12px] text-[#5c564f]">
                                        <svg
                                            className="w-3.5 h-3.5 text-[#8e763b] shrink-0 mt-0.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.75}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span>{item}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Link
                            href={`/checkout?experience=${encodeURIComponent(expedition.slug)}`}
                            className="flex-1 bg-[#1f1e1d] text-[#fcf9f4] hover:bg-[#33312f] transition-colors px-5 py-3.5 text-[10.5px] font-mono tracking-[0.16em] uppercase flex items-center justify-between gap-3"
                        >
                            <span>RESERVE CHARTER RENDEZVOUS</span>
                            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>

                        {expedition.dossierPdfUrl && (
                            <a
                                href={expedition.dossierPdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-[#e8e4dc] bg-[#fcf9f4] text-[#1f1e1d] hover:border-[#8e763b] transition-colors px-4 py-3.5 text-[10.5px] font-mono tracking-[0.16em] uppercase flex items-center justify-center gap-2 shrink-0"
                            >
                                <svg className="w-3.5 h-3.5 text-[#8e763b]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span>DOSSIER PDF</span>
                            </a>
                        )}
                    </div>
                </div>
            </article>
        </section>
    );
}

export default FeaturedExpeditionHeroSection;
