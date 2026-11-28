import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ============================================================================
// 1. DATA CONTRACTS & VIEWMODELS
// ============================================================================

export interface DiningVenueMetric {
    label: string;
    value: string;
}

export interface GastronomicVenueData {
    id: string;
    slug: string;
    badgeLabel?: string;
    michelinStars?: number;
    subBadgeLabel?: string;
    imageUrl: string;
    imageAlt: string;
    cuisineSubtitle: string;
    name: string;
    narrative: string;
    metrics: DiningVenueMetric[];
    footnoteLabel?: string;
    ctaLabel?: string;
    ctaHref?: string;
    isPrimaryCta?: boolean;
}

export interface GastronomicSanctuariesData {
    sectionEyebrow?: string;
    sectionTitle?: string;
    sectionIntroMonograph?: string;
    venues: GastronomicVenueData[];
}

export interface GastronomicSanctuariesSectionProps {
    data?: Partial<GastronomicSanctuariesData>;
    venues?: GastronomicVenueData[];
}

// ============================================================================
// 2. SUB-COMPONENT: Michelin Stars Display
// ============================================================================

function MichelinStarsBadge({ count }: { count: number }) {
    const starCount = Math.max(1, Math.min(count, 3));
    const stars = Array.from({ length: starCount });
    return (
        <div className="inline-flex items-center gap-1.5 bg-[#f6f3ee]/95 text-[#8e763b] px-3 py-1 text-[10px] font-mono tracking-[0.16em] uppercase shadow-xs">
            <span className="flex items-center gap-0.5 text-xs text-[#8e763b]" aria-hidden="true">
                {stars.map(function (_, i) {
                    return <span key={i}>★</span>;
                })}
            </span>
            <span className="font-semibold text-[#1f1e1d]">
                {starCount === 3
                    ? 'THREE MICHELIN STARS'
                    : starCount === 2
                      ? 'TWO MICHELIN STARS'
                      : 'ONE MICHELIN STAR'}
            </span>
        </div>
    );
}

// ============================================================================
// 3. SUB-COMPONENT: Empty Gastronomic Venues State
// ============================================================================

function GastronomicEmptyState() {
    return (
        <div className="w-full bg-white border border-[#e8e4dc] p-10 sm:p-14 text-center space-y-5 shadow-[0_4px_24px_rgba(31,30,29,0.02)]">
            <div className="w-10 h-10 mx-auto rounded-full bg-[#f6f2ea] border border-[#ded9ce] flex items-center justify-center text-[#8e763b]">
                <span className="font-serif text-lg leading-none">✦</span>
            </div>

            <div className="space-y-2 max-w-md mx-auto">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#8e763b] uppercase block">
                    TERROIR TABLE • SEASONAL CALIBRATION
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#1f1e1d] tracking-tight">
                    Dining Venues Reserved for Seasonal Buyouts
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed text-[#6e685f] font-sans font-light">
                    Michelin dining rooms and subterranean cru vaults for this property are reserved for in-residence patrons or scheduled by individual reservation. Contact the Sommelier desk to request private table arrangements.
                </p>
            </div>

            <div className="pt-2">
                <Link
                    href="/contact?subject=dining-inquiries"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1f1e1d] hover:bg-[#343230] text-[#fcf9f4] text-[10px] font-mono tracking-[0.2em] uppercase transition-colors"
                >
                    <span>Consult Sommelier Desk</span>
                    <span className="text-xs">→</span>
                </Link>
            </div>
        </div>
    );
}

// ============================================================================
// 4. SUB-COMPONENT: Individual Venue Card
// ============================================================================

interface VenueCardProps {
    venue: GastronomicVenueData;
    isPrimary?: boolean;
    className?: string;
}

function VenueCard({ venue, isPrimary = false, className = '' }: VenueCardProps) {
    const defaultCtaLabel = isPrimary ? 'REQUEST TABLE' : 'EXPLORE VAULT LIST';
    const defaultCtaHref = `/contact?subject=${encodeURIComponent(`dining-${venue.slug || venue.id}`)}`;
    const footnote = venue.footnoteLabel || (isPrimary ? 'Private Table Reservation Mandate' : 'Dress Code: Smart Casual');

    return (
        <article
            className={`bg-white border border-[#e8e4dc] flex flex-col justify-between shadow-[0_4px_24px_rgba(31,30,29,0.03)] overflow-hidden ${className}`}
        >
            <div>
                {/* Upper Image Card with Badges & Overlay */}
                <div className="relative w-full h-70 sm:h-85 bg-[#1f1e1d]">
                    {venue.imageUrl ? (
                        <Image
                            src={venue.imageUrl}
                            alt={venue.imageAlt || venue.name}
                            fill
                            sizes={isPrimary ? '(max-width: 1024px) 100vw, 58vw' : '(max-width: 1024px) 100vw, 42vw'}
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#242220] text-[#8e763b] font-mono text-[10px] tracking-widest uppercase">
                            Sanctuary Dining Room
                        </div>
                    )}

                    {/* Scrim Overlay */}
                    <div
                        className="absolute inset-0 bg-linear-to-t from-[#1f1e1d]/90 via-[#1f1e1d]/25 to-transparent"
                        aria-hidden="true"
                    />

                    {/* Top Left Badge */}
                    <div className="absolute top-4 left-4">
                        {venue.michelinStars && venue.michelinStars > 0 ? (
                            <MichelinStarsBadge count={venue.michelinStars} />
                        ) : venue.subBadgeLabel ? (
                            <span className="bg-[#1f1e1d] text-[#fcf9f4] px-3 py-1 text-[9.5px] font-mono tracking-[0.16em] uppercase">
                                {venue.subBadgeLabel}
                            </span>
                        ) : venue.badgeLabel ? (
                            <span className="bg-[#f6f3ee]/95 text-[#1f1e1d] px-3 py-1 text-[10px] font-mono tracking-[0.16em] uppercase">
                                {venue.badgeLabel}
                            </span>
                        ) : null}
                    </div>

                    {/* Bottom Title */}
                    <div className="absolute bottom-5 left-5 right-5 space-y-1">
                        {venue.cuisineSubtitle && (
                            <p className="text-[9.5px] font-mono tracking-[0.2em] text-[#bfa76f] uppercase">
                                {venue.cuisineSubtitle}
                            </p>
                        )}
                        <h3 className="text-2xl sm:text-[26px] font-serif text-[#fcf9f4] leading-tight">
                            {venue.name}
                        </h3>
                    </div>
                </div>

                {/* Middle Content Narrative */}
                <div className="p-6 sm:p-7 space-y-6">
                    <p className="text-[13px] leading-[1.7] text-[#5c564f] font-sans font-light">
                        {venue.narrative}
                    </p>

                    {/* Dynamic Metric Badges */}
                    {venue.metrics && venue.metrics.length > 0 && (
                        <div
                            className={`grid gap-2.5 sm:gap-3 ${
                                venue.metrics.length === 1
                                    ? 'grid-cols-1'
                                    : venue.metrics.length === 2
                                      ? 'grid-cols-2'
                                      : 'grid-cols-3'
                            }`}
                        >
                            {venue.metrics.map(function (metric, idx) {
                                return (
                                    <div
                                        key={idx}
                                        className="bg-[#f6f3ee] border border-[#e8e4dc]/70 p-3 text-center space-y-1"
                                    >
                                        <span className="block text-[9px] font-mono tracking-[0.16em] text-[#7c756c] uppercase">
                                            {metric.label}
                                        </span>
                                        <p className="text-[12px] font-semibold text-[#1f1e1d]">
                                            {metric.value}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Action Strip */}
            <div className="px-6 sm:px-7 pb-6 pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#f6f3ee]">
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#7c756c]">
                    <svg
                        className="w-3.5 h-3.5 text-[#8e763b] shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                    <span>{footnote}</span>
                </div>

                <Link
                    href={venue.ctaHref || defaultCtaHref}
                    className={`w-full sm:w-auto transition-colors px-6 py-2.5 text-[10.5px] font-mono tracking-[0.16em] uppercase text-center ${
                        isPrimary || venue.isPrimaryCta
                            ? 'bg-[#1f1e1d] text-[#fcf9f4] hover:bg-[#33312f]'
                            : 'bg-[#f6f3ee] hover:bg-[#e8e4dc] border border-[#e8e4dc] text-[#1f1e1d]'
                    }`}
                >
                    {venue.ctaLabel || defaultCtaLabel}
                </Link>
            </div>
        </article>
    );
}

// ============================================================================
// 5. MASTER COMPONENT: GastronomicSanctuariesSection
// ============================================================================

export function GastronomicSanctuariesSection({
    data,
    venues: propVenues,
}: GastronomicSanctuariesSectionProps) {
    const sectionEyebrow = data?.sectionEyebrow || 'CULINARY RESIDENCES • AURELIA EPICTETUS TABLE';
    const sectionTitle = data?.sectionTitle || 'Gastronomic Sanctuaries';
    const sectionIntroMonograph =
        data?.sectionIntroMonograph ||
        'Culinary encounters chiseled into cliffsides and subterranean vaults, celebrating authentic terroirs and Michelin-recognized seasonal preparations.';

    // Resolve venues strictly without mock fallback
    const rawVenues = propVenues || data?.venues;
    const venues = Array.isArray(rawVenues) ? rawVenues : [];
    const hasVenues = venues.length > 0;

    return (
        <section
            aria-labelledby="gastronomic-sanctuaries-title"
            className="w-full max-w-7xl mx-auto px-4 sm:px-8 pb-16"
        >
            {/* Section Header Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-end mb-8 sm:mb-10">
                <div className="lg:col-span-7 space-y-1.5">
                    <p className="text-[10px] sm:text-[10.5px] font-mono tracking-[0.22em] text-[#8e763b] uppercase">
                        {sectionEyebrow}
                    </p>
                    <h2
                        id="gastronomic-sanctuaries-title"
                        className="text-2xl sm:text-3xl lg:text-[34px] font-serif text-[#1f1e1d] leading-snug"
                    >
                        {sectionTitle}
                    </h2>
                </div>

                <div className="lg:col-span-5 lg:pb-1">
                    <p className="text-[12.5px] sm:text-[13px] leading-[1.65] font-serif text-[#5c564f] italic lg:border-l lg:border-[#e8e4dc] lg:pl-6">
                        {sectionIntroMonograph}
                    </p>
                </div>
            </div>

            {/* Content Display: 0, 1, 2, or 3+ Venues */}
            {!hasVenues ? (
                <GastronomicEmptyState />
            ) : venues.length === 1 ? (
                /* Single Venue: Expanded 10-Col Centered Feature */
                <div className="max-w-4xl mx-auto">
                    <VenueCard venue={venues[0]} isPrimary={true} />
                </div>
            ) : venues.length === 2 ? (
                /* Two Venues: Signature Asymmetric 7 / 5 Split */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <VenueCard venue={venues[0]} isPrimary={true} className="lg:col-span-7" />
                    <VenueCard venue={venues[1]} isPrimary={false} className="lg:col-span-5" />
                </div>
            ) : (
                /* Three or More Venues: Balanced Bento Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {venues.map(function (venue, idx) {
                        return (
                            <VenueCard
                                key={venue.id || idx}
                                venue={venue}
                                isPrimary={idx === 0}
                            />
                        );
                    })}
                </div>
            )}
        </section>
    );
}

export default GastronomicSanctuariesSection;
