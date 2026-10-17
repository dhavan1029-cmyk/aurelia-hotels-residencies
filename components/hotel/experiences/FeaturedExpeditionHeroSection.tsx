'use client';

import Image from 'next/image';
import Link from 'next/link';


export interface ExpeditionSpecMetric {
    label: string;
    sublabel: string;
    iconType: 'duration' | 'party' | 'crew' | 'catering';
}

export interface FeaturedExpeditionData {
    experienceId: string;
    slug: string;
    heroBadge: string;
    heritageBadge: string;
    categoryTag: string;
    title: string;
    tariffAmount: number;
    tariffUnit: string;
    currencySymbol: string;
    currencyCode: string;
    narrative: string[];
    specMetrics: ExpeditionSpecMetric[];
    includedHighlights: string[];
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    heroImageUrl: string;
    heroImageAlt: string;
}

export const experiencesFeaturedDefaultData: FeaturedExpeditionData = {
    experienceId: 'exp-riva-aquarama-capri',
    slug: 'private-riva-aquarama-faraglioni-capri',
    heroBadge: 'FEATURED EXPEDITION',
    heritageBadge: 'RESTORED 1968 CLASSIC',
    categoryTag: 'PRIVATE MARINE CHARTER • FULL DAY OR SUNSET CRUISE',
    title: 'Private Riva Aquarama Faraglioni & Capri Expedition',
    tariffAmount: 1850,
    tariffUnit: 'per charter voyage',
    currencySymbol: '€',
    currencyCode: 'EUR',
    narrative: [
        'Embark directly from the Aurelia private limestone slipway aboard our master-restored 1968 Riva Aquarama Super. Glide across the sapphire expanse toward the sheer sea-stacks of the Faraglioni, anchoring in secluded turquoise grottos inaccessible by terrestrial path.',
        'Each voyage is attended by our licensed senior skipper and dedicated steward. Enjoy cellar-chilled Franciacorta Gran Cuvée paired with artisan Campanian cicchetti, followed by an optional tender disembarkation at the private cliffs of La Fontelina.',
    ],
    specMetrics: [
        {
            label: '8 Hours',
            sublabel: 'EXPEDITION HORIZON',
            iconType: 'duration',
        },
        {
            label: 'Up to 6 Patrons',
            sublabel: 'EXCLUSIVE CAPACITY',
            iconType: 'party',
        },
        {
            label: 'Master & Steward',
            sublabel: 'DEDICATED CREW',
            iconType: 'crew',
        },
        {
            label: 'In-Cove Artisan Lunch',
            sublabel: 'RESERVE SOMMELIER',
            iconType: 'catering',
        },
    ],
    includedHighlights: [
        'Private captain, marine fuel, and maritime permits included',
        'Dom Pérignon Vintage champagne & seasonal Campanian fruit collation',
        'Subsurface snorkel gear & underwater seabob immersion',
        'Seamless room-folio billing & complimentary helipad coordination',
    ],
    primaryCtaLabel: 'RESERVE CHARTER RENDEZVOUS',
    secondaryCtaLabel: 'VIEW ITINERARY DOSSIER',
    heroImageUrl: '/limestone-villa.png',
    heroImageAlt: 'Vintage wooden Riva speedboat cruising on azure blue Mediterranean sea along dramatic Amalfi limestone cliffs',
};

export interface FeaturedExpeditionHeroSectionProps {
    data?: FeaturedExpeditionData;
    onReserveCharter?: (experienceId: string) => void;
    onViewDossier?: (slug: string) => void;
    className?: string;
}

export function FeaturedExpeditionHeroSection({
    data = experiencesFeaturedDefaultData,
    onReserveCharter,
    onViewDossier,
    className = '',
}: FeaturedExpeditionHeroSectionProps) {
    const {
        experienceId,
        slug,
        heroBadge,
        heritageBadge,
        categoryTag,
        title,
        tariffAmount,
        tariffUnit,
        currencySymbol,
        currencyCode,
        narrative,
        specMetrics,
        includedHighlights,
        primaryCtaLabel,
        secondaryCtaLabel,
        heroImageUrl,
        heroImageAlt,
    } = data;

    const renderSpecIcon = (type: ExpeditionSpecMetric['iconType']) => {
        switch (type) {
            case 'duration':
                return (
                    <svg className="w-4 h-4 text-[#8e763b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                );
            case 'party':
                return (
                    <svg className="w-4 h-4 text-[#8e763b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                );
            case 'crew':
                return (
                    <svg className="w-4 h-4 text-[#8e763b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                );
            case 'catering':
                return (
                    <svg className="w-4 h-4 text-[#8e763b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M18 2l-4 4-2-2 4-4 2 2z" />
                        <path d="M14 6l-9 9a2 2 0 0 0 0 2.83l.17.17a2 2 0 0 0 2.83 0l9-9" />
                        <path d="M6 18l-3 3" />
                        <path d="M2 14l2-2" />
                        <path d="M12 2l8 8" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <section className={`w-full max-w-340 mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-12 ${className}`}>
            <article className="bg-white border border-[#e8e4dc] rounded-lg overflow-hidden shadow-[0_8px_32px_rgba(31,30,29,0.04)] hover:border-[#8e763b]/40 transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    {/* Left Photographic Showcase Column (7 Columns) */}
                    <div className="lg:col-span-7 relative min-h-90 sm:min-h-115 lg:min-h-full bg-[#eeeae2] overflow-hidden group">
                        <Image
                            src={heroImageUrl}
                            alt={heroImageAlt}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 58vw"
                            className="object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
                            <span className="px-3 py-1 rounded-sm bg-black/60 backdrop-blur-md text-white font-sans text-[10px] font-semibold uppercase tracking-[0.22em] shadow-sm">
                                {heroBadge}
                            </span>
                            <span className="px-3 py-1 rounded-sm bg-[#8e763b] text-white font-sans text-[10px] font-semibold uppercase tracking-[0.2em] shadow-sm">
                                {heritageBadge}
                            </span>
                        </div>

                        {/* Bottom Photographic Caption & Overlay */}
                        <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                            <span className="text-[10px] font-sans uppercase tracking-[0.24em] text-[#dcdad5] block mb-1">
                                TYRRHENIAN ARCHIPELAGO • CAPRI CRUISE
                            </span>
                            <p className="font-serif text-lg sm:text-xl font-light tracking-tight text-white/95">
                                Private dock boarding directly from the Aurelia sea gate.
                            </p>
                        </div>
                    </div>

                    {/* Right Detailed Narrative & Reservation Column (5 Columns) */}
                    <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-8 bg-[#fcf9f4]">
                        {/* Header & Tariff Block */}
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#eeeae2] pb-4 mb-4">
                                <span className="text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.24em] text-[#8e763b]">
                                    {categoryTag}
                                </span>

                                <div className="text-left sm:text-right shrink-0">
                                    <div className="flex items-baseline gap-1">
                                        <span className="font-serif text-2xl sm:text-3xl font-normal text-[#1f1e1d]">
                                            {currencySymbol}{tariffAmount.toLocaleString()}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-sans text-[#78756d] uppercase tracking-wider block">
                                        {tariffUnit}
                                    </span>
                                </div>
                            </div>

                            {/* Headline */}
                            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#1f1e1d] tracking-tight leading-[1.14]">
                                {title}
                            </h2>

                            {/* Editorial Narrative Paragraphs */}
                            <div className="mt-4 space-y-3 text-xs sm:text-[13px] text-[#5f5c56] font-sans font-light leading-relaxed">
                                {narrative.map(function (paragraph, idx) {
                                    return <p key={idx}>{paragraph}</p>;
                                })}
                            </div>

                            {/* 4 Stone Spatial & Service Metrics Grid */}
                            <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-[#eeeae2]">
                                {specMetrics.map(function (metric, idx) {
                                    return (
                                        <div
                                            key={idx}
                                            className="p-3 rounded-xl bg-white border border-[#ded9ce] shadow-2xs flex items-start gap-2.5"
                                        >
                                            <span className="p-1.5 rounded-lg bg-[#f6f2ea] border border-[#e8e4dc] shrink-0">
                                                {renderSpecIcon(metric.iconType)}
                                            </span>
                                            <div>
                                                <span className="font-serif text-xs sm:text-[13px] font-semibold text-[#1f1e1d] block leading-tight">
                                                    {metric.label}
                                                </span>
                                                <span className="text-[9px] font-sans uppercase tracking-[0.16em] text-[#8e8a82] block mt-0.5">
                                                    {metric.sublabel}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Included Curated Inclusions Checklist */}
                            <ul className="mt-5 space-y-1.5 pt-4 border-t border-[#eeeae2] text-[11px] font-sans text-[#6e6b64]">
                                {includedHighlights.map(function (highlight, idx) {
                                    return (
                                        <li key={idx} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b] shrink-0" />
                                            <span>{highlight}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Dual Action CTA Buttons */}
                        <div className="pt-6 border-t border-[#eeeae2] flex flex-col sm:flex-row items-center gap-3">
                            <Link
                                href={`/checkout?experience=${slug}`}
                                onClick={function () {
                                    if (onReserveCharter) {
                                        onReserveCharter(experienceId);
                                    }
                                }}
                                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all shadow-md active:translate-y-0.5 text-center group"
                            >
                                <span>{primaryCtaLabel}</span>
                                <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>

                            <Link
                                href={`/experiences/${slug}`}
                                onClick={function () {
                                    if (onViewDossier) {
                                        onViewDossier(slug);
                                    }
                                }}
                                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-4 rounded-xl bg-white hover:bg-[#f6f2ea] border border-[#ded9ce] text-[#1f1e1d] font-sans text-[11px] font-semibold uppercase tracking-[0.18em] transition-all text-center shadow-2xs"
                            >
                                <span>{secondaryCtaLabel}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
}