import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Footer } from '@/components/layout/Footer';
import { BookingBar } from '@/components/hotel/BookingBar';
import { SuiteCard } from '@/components/hotel/SuiteCard';
import { SANCTUARIES_CATALOG, getSanctuaryBySlug, SanctuaryEnclaveSpec } from '@/lib/data/sanctuariesCatalog';
import { prisma } from '@/lib/config/prisma';
import { mapAccommodationCategoriesToSuiteCards } from '@/lib/hotel/mappers/accommodationsMapper';
import type { AccommodationWithSanctuary } from '@/lib/hotel/mappers/accommodationsMapper';
import type { AccommodationBookingContext } from '@/lib/hotel/mappers/AccommodationDetailsMapper';

// ============================================================================
// 1. TYPE DEFINITIONS & CONTRACTS
// ============================================================================

import { Prisma } from '@/app/generated/prisma/client';

export type AccommodationWithDetails = Prisma.AccommodationCategoryGetPayload<{
    include: {
        sanctuary: {
            select: {
                id: true;
                name: true;
                slug: true;
                code: true;
                currency: true;
            };
        };
        roomUnits: true;
    };
}>;

export interface TestimonialItem {
    quote: string;
    authorName: string;
    authorRole: string;
    avatarUrl?: string;
    rating?: number;
    propertyTag?: string;
}

export interface DiningHighlightItem {
    name: string;
    starsBadge?: string;
    cuisineSubtitle: string;
    description: string;
    heroImage: string;
    heroAlt: string;
    secondaryImage?: string;
    seatingTimes: string;
    cellarReserveCount: string;
    pricingLabel: string;
    primaryCtaHref: string;
}

export interface HomePageProps {
    searchParams?: Promise<{
        sanctuary?: string;
        checkIn?: string;
        checkOut?: string;
        guests?: string;
    }>;
}

// ============================================================================
// 2. TERROIR & DINING METADATA DICTIONARY BY SANCTUARY
// ============================================================================

const SANCTUARY_DINING_DATA: Record<string, DiningHighlightItem> = {
    'sanctuary-positano': {
        name: 'Ristorante Il Belvedere',
        starsBadge: 'THREE MICHELIN STARS • CHEF MATTEO VARRESE',
        cuisineSubtitle: 'CUISINE MARINE • TYRRHENIAN TIDES',
        description: 'Perched 180 meters above the surf on natural travertine terraces, an unhurried seven-course odyssey translating Mediterranean tides into sensory edible art paired with volcanic cellar reserves.',
        heroImage: '/images/dining/il-belvedere-cliffside.jpg',
        heroAlt: 'Candlelit cliffside terrace dining at Ristorante Il Belvedere overlooking the sea at twilight',
        secondaryImage: '/images/sanctuaries/positano-cliffside.jpg',
        seatingTimes: '19:30 & 21:30 Daily',
        cellarReserveCount: '4,200 Curated Bottles',
        pricingLabel: '€210 Per Guest • Reserve Pairing €135',
        primaryCtaHref: '/experiences?sanctuary=sanctuary-positano#dining',
    },
    'sanctuary-engadin': {
        name: 'Chesa Arpiglia Hearth',
        starsBadge: 'TWO MICHELIN STARS • CHEF URS VETSCH',
        cuisineSubtitle: 'HIGH ALPINE TERROIR • WOODFIRE HEARTH',
        description: 'Centuries-old stone pine timber beams frame an open granite woodfire hearth where dry-aged Engadin venison, juniper-smoked glacier trout, and high-altitude cheeses simmer over glowing embers.',
        heroImage: '/images/dining/chesa-arpiglia-alpine.jpg',
        heroAlt: 'Open granite hearth and candlelit timber dining room at Chesa Arpiglia in St. Moritz',
        secondaryImage: '/images/sanctuaries/engadin-alpine.jpg',
        seatingTimes: '18:30 & 20:45 (Tue–Sun)',
        cellarReserveCount: '3,800 Bündner & Burgundy Vintages',
        pricingLabel: 'CHF 245 Per Guest • Alpine Cru Pairing CHF 150',
        primaryCtaHref: '/experiences?sanctuary=sanctuary-engadin#dining',
    },
    'aurelia-enclave-antibes': {
        name: "Le Pavillon d'Azur",
        starsBadge: 'TWO MICHELIN STARS • CHEF JEAN-LUC MOREAU',
        cuisineSubtitle: 'COASTAL PROVENÇAL • BOTANICAL SOLARIUM',
        description: 'Set amidst ancient coastal umbrella pines and fragrant jasmine groves on Cap d\'Antibes, celebrating day-boat Mediterranean catches, wild lavender honey glazes, and Grand Cru Provence rosés.',
        heroImage: '/images/sanctuaries/antibes-villa.jpg',
        heroAlt: 'Limestone dining pavilion and sea-facing gardens at Le Pavillon d\'Azur Cap d\'Antibes',
        secondaryImage: '/images/sanctuaries/antibes-terrace.jpg',
        seatingTimes: '12:30 & 19:30 Daily',
        cellarReserveCount: '3,100 Côte d\'Azur & Rhône Reserves',
        pricingLabel: '€195 Per Guest • Provence Cru Flight €110',
        primaryCtaHref: '/experiences?sanctuary=aurelia-enclave-antibes#dining',
    },
};

const DEFAULT_GLOBAL_TESTIMONIALS: TestimonialItem[] = [
    {
        quote: '“Aurelia redefined our concept of hospitality. The sheer quiet, the aroma of cypress and salt, and the limestone plunge pool made time stand completely still.”',
        authorName: 'ELEANOR VANCE',
        authorRole: 'Sovereign Fellow • 4 Stays Recorded',
        propertyTag: 'SANCTUARY POSITANO',
        rating: 5,
    },
    {
        quote: '“A cathedral of Valser quartzite and silence. Arriving by private helicopter onto the Morteratsch glacier and returning to the open granite hearth was unforgettable.”',
        authorName: 'DR. CHRISTIAN VON BERG',
        authorRole: 'Imperial Honorary Patron • St. Moritz',
        propertyTag: 'SANCTUARY ENGADIN',
        rating: 5,
    },
    {
        quote: '“Discreet, impeccable, and unhurried. The Riva tender access directly from the cliff pontoon sets a timeless standard in Mediterranean arrival experiences.”',
        authorName: 'JULIAN & CLAIRE STERLING',
        authorRole: 'Private Residence Members • London',
        propertyTag: 'CAP D’ANTIBES',
        rating: 5,
    },
];

// ============================================================================
// 3. MASTER HOMEPAGE SERVER COMPONENT
// ============================================================================

export async function HomePage({ searchParams }: HomePageProps = {}) {
    // 1. Resolve search parameters defensively (Supports Next.js 15+ promise searchParams)
    const resolvedParams = searchParams ? await searchParams : {};
    const rawSanctuaryParam = resolvedParams.sanctuary?.toLowerCase() || '';

    // Match catalog specification by slug or ID
    const activeSanctuarySpec: SanctuaryEnclaveSpec = getSanctuaryBySlug(rawSanctuaryParam);
    const activeSlug = activeSanctuarySpec.slug;

    // 2. Fetch accommodations for the selected sanctuary (with defensive fallback to all)
    let accommodations: AccommodationWithDetails[] = [];
    try {
        accommodations = await prisma.accommodationCategory.findMany({
            where: {
                sanctuary: {
                    OR: [
                        { slug: activeSlug },
                        { code: activeSanctuarySpec.code },
                    ],
                },
            },
            include: {
                sanctuary: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        code: true,
                        currency: true,
                    },
                },
                roomUnits: true,
            },
            orderBy: {
                basePriceNightly: 'desc',
            },
        });

        // Fallback: If no suites linked to this sanctuary yet, query all categories
        if (!accommodations || accommodations.length === 0) {
            accommodations = await prisma.accommodationCategory.findMany({
                include: {
                    sanctuary: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                            code: true,
                            currency: true,
                        },
                    },
                    roomUnits: true,
                },
                orderBy: {
                    basePriceNightly: 'desc',
                },
                take: 6,
            });
        }
    } catch {
        accommodations = [];
    }

    // 3. Map Database Entities to Master & Coastal Suite ViewModels
    const targetMasterSlug = accommodations[0]?.slug || 'azure-master-ocean-suite';
    const { masterSuite, coastalSuites } = mapAccommodationCategoriesToSuiteCards(
        accommodations,
        targetMasterSlug,
    );

    // 4. Compute Standard Initial Booking Window
    const now = Date.now();
    const defaultCheckInDate = resolvedParams.checkIn || new Date(now + 14 * 86400000).toISOString().split('T')[0];
    const defaultCheckOutDate = resolvedParams.checkOut || new Date(now + 19 * 86400000).toISOString().split('T')[0];
    const defaultNightsCount = 5;
    const defaultGuestsCount = resolvedParams.guests ? parseInt(resolvedParams.guests, 10) : 2;

    // 5. Construct Typed Master Suite Booking Context
    const masterBookingParams: AccommodationBookingContext = {
        sanctuaryId: masterSuite?.sanctuaryId || activeSanctuarySpec.id,
        sanctuarySlug: masterSuite?.sanctuarySlug || activeSanctuarySpec.slug,
        sanctuaryName: masterSuite?.sanctuaryName || activeSanctuarySpec.name,
        accommodationId: masterSuite?.id || 'suite-master',
        suiteSlug: masterSuite?.slug || targetMasterSlug,
        suiteName: masterSuite?.name || 'The Master Sovereign Suite',
        checkInDate: defaultCheckInDate,
        checkOutDate: defaultCheckOutDate,
        nightsCount: defaultNightsCount,
        guestsCount: defaultGuestsCount,
        baseRateNightly: masterSuite?.pricePerNight || 3450,
        currency: activeSanctuarySpec.country === 'Switzerland' ? 'CHF' : 'EUR',
        currencySymbol: activeSanctuarySpec.country === 'Switzerland' ? 'CHF ' : '€',
    };

    // 6. Terroir Dining Resolution
    const diningHighlight: DiningHighlightItem =
        SANCTUARY_DINING_DATA[activeSlug] || SANCTUARY_DINING_DATA['sanctuary-positano'];

    return (
        <div className="min-h-screen bg-[#fcf9f4] text-[#1f1e1d] flex flex-col font-sans selection:bg-[#bfa76f] selection:text-white">
            {/* ========================================================================= */}
            {/* 1. MULTI-SANCTUARY SELECTOR STRIP                                          */}
            {/* ========================================================================= */}
            <nav
                aria-label="Global Sanctuary Selector"
                className="w-full bg-[#181716] border-b border-[#2d2b27] text-[#fcf9f4] sticky top-0 z-40 shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-stretch justify-start md:justify-between overflow-x-auto scrollbar-none divide-x divide-[#2b2925]">
                        {SANCTUARIES_CATALOG.map(function (sanctuary: SanctuaryEnclaveSpec) {
                            const isCurrent = sanctuary.slug.toLowerCase() === activeSlug.toLowerCase();

                            return (
                                <Link
                                    key={sanctuary.id}
                                    href={`/?sanctuary=${encodeURIComponent(sanctuary.slug)}`}
                                    scroll={false}
                                    className={`group relative flex-1 min-w-60 md:min-w-0 py-3.5 px-4 sm:px-5 transition-all duration-300 flex items-center justify-between gap-3 ${
                                        isCurrent
                                            ? 'bg-[#211f1c]'
                                            : 'hover:bg-[#1c1b18] opacity-70 hover:opacity-100'
                                    }`}
                                >
                                    <div className="space-y-0.5 text-left">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] font-mono tracking-[0.25em] text-[#8e763b] font-semibold uppercase">
                                                {sanctuary.code}
                                            </span>
                                            <span className="text-[9px] font-mono tracking-[0.14em] text-[#9c9489] uppercase">
                                                • {sanctuary.regionTag}
                                            </span>
                                        </div>
                                        <p className="text-[13px] font-serif tracking-[0.02em] text-[#fcf9f4] group-hover:text-[#c5a86a] transition-colors font-medium">
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

                                    {/* Active Monolithic Gold Line */}
                                    {isCurrent && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#bfa76f] to-transparent" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* ========================================================================= */}
            {/* 2. DYNAMIC EDITORIAL HERO SECTION                                         */}
            {/* ========================================================================= */}
            <header className="relative w-full min-h-[90vh] lg:min-h-[94vh] flex flex-col justify-between overflow-hidden bg-[#181716]">
                {/* Hero Editorial Photography */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={activeSanctuarySpec.heroImage}
                        alt={activeSanctuarySpec.heroAlt}
                        fill
                        priority
                        quality={95}
                        sizes="100vw"
                        className="object-cover object-center transform scale-[1.01] transition-transform duration-1000 ease-out"
                    />

                    {/* Architectural Vignette & Editorial Grain Layers */}
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-linear-to-t from-[#181716] via-black/40 to-black/25" />
                    <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent" />
                </div>

                {/* Spatial Top Padding for Global Navigation */}
                <div className="relative z-10 h-12 lg:h-16 w-full" aria-hidden="true" />

                {/* Central Editorial Monograph Container */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex flex-col justify-center">
                    <div className="max-w-3xl space-y-6">
                        {/* Enclave Metadata Pill */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[#fcf9f4] shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#bfa76f] animate-pulse" />
                            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-mono font-medium text-white/90">
                                {activeSanctuarySpec.code} • {activeSanctuarySpec.name} • {activeSanctuarySpec.coordinatesDisplay}
                            </span>
                        </div>

                        {/* Master Serif Headline */}
                        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[70px] leading-[1.06] text-white font-normal tracking-tight drop-shadow-md">
                            {activeSanctuarySpec.tagline}
                        </h1>

                        {/* Monograph Narrative Excerpt */}
                        <p className="text-sm sm:text-base md:text-[17px] leading-relaxed text-[#fcf9f4]/90 font-sans max-w-2xl font-light drop-shadow">
                            {activeSanctuarySpec.monographShort}
                        </p>

                        {/* Action Callouts Strip */}
                        <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
                            <Link
                                href={`/accommodations?sanctuary=${encodeURIComponent(activeSlug)}`}
                                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#bfa76f] hover:bg-[#a99159] text-white font-mono text-[11px] font-semibold uppercase tracking-[0.2em] rounded-xs transition-all duration-300 shadow-xl hover:-translate-y-0.5"
                            >
                                <span>RESERVE SANCTUARY SUITE</span>
                                <span className="text-sm font-normal">→</span>
                            </Link>

                            <Link
                                href={`/experiences?sanctuary=${encodeURIComponent(activeSlug)}`}
                                className="group inline-flex items-center gap-2 text-white hover:text-[#bfa76f] font-mono text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors py-2"
                            >
                                <span>SIGNATURE ENCOUNTERS</span>
                                <span className="text-sm font-normal transform transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Telemetry Footnote Bar */}
                <div className="relative z-10 w-full border-t border-white/10 bg-black/40 backdrop-blur-xs py-3 px-4 sm:px-8">
                    <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[9.5px] font-mono tracking-[0.2em] text-white/70 uppercase">
                        <span>SEASONALITY: {activeSanctuarySpec.seasonalityTag}</span>
                        <span>MICHELIN DINING: {activeSanctuarySpec.michelinDining}</span>
                        <span>MAJORDOMO DIRECT: {activeSanctuarySpec.majordomoDirectPhone}</span>
                    </div>
                </div>
            </header>

            {/* ========================================================================= */}
            {/* 3. RESPONSIVE FLOATING BOOKING BAR CONSOLE                                */}
            {/* ========================================================================= */}
            <div className="relative -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
                <BookingBar
                    defaultCheckIn={defaultCheckInDate}
                    defaultCheckOut={defaultCheckOutDate}
                    defaultGuests={defaultGuestsCount}
                />
            </div>

            {/* ========================================================================= */}
            {/* 4. THE AURELIA MANIFESTO & TERROIR STATEMENT                              */}
            {/* ========================================================================= */}
            <section className="max-w-5xl mx-auto px-6 py-20 sm:py-28 text-center">
                <div className="space-y-6">
                    <span className="block text-[10.5px] sm:text-[11.5px] font-mono font-semibold uppercase tracking-[0.35em] text-[#8e763b]">
                        THE AURELIA MANIFESTO • TERROIR {activeSanctuarySpec.code}
                    </span>

                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1f1e1d] tracking-tight leading-[1.12]">
                        An Architecture of Quiet Unhurried Grace
                    </h2>

                    <blockquote className="mt-8 font-serif italic text-base sm:text-lg md:text-[19px] text-[#55524d] font-light leading-9 max-w-3xl mx-auto">
                        “True luxury is neither rushed nor ostentatious. Chiseled into living cliffside limestone and glacial stone shelves, Aurelia celebrates natural stone, the restorative quiet of solitude, and intuitive hospitality that anticipates every desire without ceremony.”
                    </blockquote>

                    <div className="pt-4 flex items-center justify-center gap-6 text-[10px] font-mono tracking-[0.2em] text-[#8e763b] uppercase">
                        <span>CLIMATE: {activeSanctuarySpec.climateNote}</span>
                        <span>•</span>
                        <span>ELEVATION: {activeSanctuarySpec.elevation}</span>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 5. CURATED SUITES & ASYMMETRIC BENTO GRID                                 */}
            {/* ========================================================================= */}
            <section className="w-full bg-[#fcf9f4] py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-[#e8e4dc]">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Section Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div className="space-y-2">
                            <span className="block text-[10.5px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.3em] text-[#8e763b]">
                                {activeSanctuarySpec.name.toUpperCase()} • RESIDENTIAL COLLECTION
                            </span>
                            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#1f1e1d] tracking-tight leading-[1.15]">
                                Curated Suites &amp; Enclave Pavilions
                            </h2>
                        </div>

                        <Link
                            href={`/accommodations?sanctuary=${encodeURIComponent(activeSlug)}`}
                            className="group inline-flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-[0.25em] text-[#8e763b] hover:text-[#1f1e1d] transition-colors py-1 self-start sm:self-auto"
                        >
                            <span>VIEW ALL {activeSanctuarySpec.curatedSuitesCount} ACCOMMODATIONS</span>
                            <span className="text-sm font-normal transform transition-transform duration-300 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>

                    {/* Asymmetric Bento Showcase Grid */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* LEFT COLUMN: Large Featured Master Suite Card (8 Columns) */}
                        {masterSuite && (
                            <div className="order-1 lg:col-span-8 lg:row-start-1">
                                <SuiteCard
                                    {...masterSuite}
                                    variant="master-featured"
                                    bookingParams={masterBookingParams}
                                />
                            </div>
                        )}

                        {/* RIGHT COLUMN: Stacked Coastal Suites (4 Columns) */}
                        {coastalSuites && coastalSuites.length > 0 && (
                            <div className="order-2 lg:col-span-4 lg:row-span-2 flex flex-col gap-6">
                                {coastalSuites.map(function (suite) {
                                    const suiteBookingParams: AccommodationBookingContext = {
                                        sanctuaryId: suite.sanctuaryId || masterBookingParams.sanctuaryId,
                                        sanctuarySlug: suite.sanctuarySlug || masterBookingParams.sanctuarySlug,
                                        sanctuaryName: suite.sanctuaryName || masterBookingParams.sanctuaryName,
                                        accommodationId: suite.id,
                                        suiteSlug: suite.slug,
                                        suiteName: suite.name,
                                        checkInDate: defaultCheckInDate,
                                        checkOutDate: defaultCheckOutDate,
                                        nightsCount: defaultNightsCount,
                                        guestsCount: defaultGuestsCount,
                                        baseRateNightly: suite.pricePerNight,
                                        currency: masterBookingParams.currency,
                                        currencySymbol: masterBookingParams.currencySymbol,
                                    };

                                    return (
                                        <SuiteCard
                                            key={suite.id}
                                            {...suite}
                                            variant="coastal-grid"
                                            bookingParams={suiteBookingParams}
                                        />
                                    );
                                })}
                            </div>
                        )}

                        {/* Dark Bespoke Inquiries Banner Card */}
                        <div className="order-3 lg:col-span-8 lg:col-start-1 lg:row-start-2 bg-[#181716] text-[#fcf9f4] border border-[#322f2b] rounded-xs p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
                            <div className="space-y-1">
                                <span className="text-[9.5px] font-mono tracking-[0.25em] text-[#8e763b] uppercase">
                                    SOVEREIGN PRIVATIZATION • {activeSanctuarySpec.code}
                                </span>
                                <h4 className="font-serif text-xl sm:text-2xl font-normal text-white tracking-tight">
                                    Bespoke Multi-Week &amp; Entire Estate Buyouts
                                </h4>
                                <p className="text-xs text-[#a4a098] font-sans font-light max-w-md leading-relaxed">
                                    Direct diplomatic confidentiality clearances, private pontoon/helipad transfers, and personal sommelier allocations.
                                </p>
                            </div>

                            <a
                                href={`tel:${activeSanctuarySpec.majordomoDirectPhone.replace(/\s+/g, '')}`}
                                className="px-6 py-3.5 rounded-xs bg-[#bfa76f] hover:bg-[#aa935e] text-white font-mono text-[11px] font-semibold uppercase tracking-[0.2em] whitespace-nowrap transition-all shadow-md self-stretch sm:self-auto text-center"
                            >
                                CALL MAJORDOMO DESK
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 6. GASTRONOMY & MICHELIN CELLAR SHOWCASE                                  */}
            {/* ========================================================================= */}
            <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-[#f6f3ee] border-b border-[#e8e4dc]">
                <article className="max-w-7xl mx-auto bg-white border border-[#e8e4dc] p-8 sm:p-10 lg:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left Content Column */}
                        <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
                            <div>
                                {/* Michelin Star Eyebrow Pill */}
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f6f2ea] border border-[#ebe5d8] text-[#8e763b] text-[10px] sm:text-[10.5px] font-mono font-medium uppercase tracking-[0.22em] mb-4">
                                    <svg
                                        className="w-3.5 h-3.5 text-[#bfa76f] shrink-0"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12 2l2.4 7.4h7.6l-6 4.5 2.3 7.1-6.3-4.6-6.3 4.6 2.3-7.1-6-4.5h7.6z" />
                                    </svg>
                                    <span>{diningHighlight.starsBadge}</span>
                                </div>

                                {/* Master Serif Restaurant Title */}
                                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#1f1e1d] tracking-tight leading-[1.12]">
                                    {diningHighlight.name}
                                </h2>

                                {/* Cuisine Subtitle */}
                                <p className="text-[10px] font-mono tracking-[0.2em] text-[#8e763b] uppercase mt-2">
                                    {diningHighlight.cuisineSubtitle}
                                </p>

                                {/* Narrative Description */}
                                <p className="mt-4 text-xs sm:text-[13px] md:text-sm text-[#5f5c56] font-sans font-light leading-relaxed max-w-xl">
                                    {diningHighlight.description}
                                </p>

                                {/* Operational & Cellar Metrics */}
                                <div className="mt-8 pt-6 border-t border-[#f0ece3] space-y-3.5 max-w-lg">
                                    <div className="flex items-baseline justify-between text-xs sm:text-sm font-sans">
                                        <span className="text-[#64615a] font-normal font-mono text-[11px] uppercase tracking-wider">
                                            SEATINGS
                                        </span>
                                        <span className="font-sans font-semibold text-[#1f1e1d] tracking-tight">
                                            {diningHighlight.seatingTimes}
                                        </span>
                                    </div>
                                    <div className="flex items-baseline justify-between text-xs sm:text-sm font-sans">
                                        <span className="text-[#64615a] font-normal font-mono text-[11px] uppercase tracking-wider">
                                            CELLAR ARCHIVE
                                        </span>
                                        <span className="font-sans font-semibold text-[#1f1e1d] tracking-tight">
                                            {diningHighlight.cellarReserveCount}
                                        </span>
                                    </div>
                                    <div className="flex items-baseline justify-between text-xs sm:text-sm font-sans">
                                        <span className="text-[#64615a] font-normal font-mono text-[11px] uppercase tracking-wider">
                                            TARIFF
                                        </span>
                                        <span className="font-sans font-semibold text-[#1f1e1d] tracking-tight">
                                            {diningHighlight.pricingLabel}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom CTA & Notice Area */}
                            <div className="pt-4 border-t border-[#f0ece3] flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                                <Link
                                    href={diningHighlight.primaryCtaHref}
                                    className="inline-flex items-center justify-center px-7 py-3.5 bg-[#bfa76f] hover:bg-[#aa935e] text-white font-mono text-[11px] font-semibold uppercase tracking-[0.2em] rounded-xs transition-all duration-300 shadow-sm text-center"
                                >
                                    REQUEST DINING TABLE
                                </Link>
                                <span className="text-xs text-[#8c8880] font-sans font-light">
                                    Direct patron reservations recommended
                                </span>
                            </div>
                        </div>

                        {/* Right Dual Photography Column */}
                        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full">
                            <div className="relative aspect-4/5 sm:aspect-3/4 w-full rounded-xs overflow-hidden bg-[#eeeae2] shadow-sm">
                                <Image
                                    src={diningHighlight.heroImage}
                                    alt={diningHighlight.heroAlt}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                                    className="object-cover object-center transform transition-transform duration-700 hover:scale-105"
                                />
                            </div>

                            <div className="relative aspect-4/5 sm:aspect-3/4 w-full rounded-xs overflow-hidden bg-[#eeeae2] shadow-sm">
                                <Image
                                    src={diningHighlight.secondaryImage || activeSanctuarySpec.heroImage}
                                    alt={`${activeSanctuarySpec.name} architecture and views`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                                    className="object-cover object-center transform transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </article>
            </section>

            {/* ========================================================================= */}
            {/* 7. WORDS OF REFLECTION & GUEST REPUTATION                                  */}
            {/* ========================================================================= */}
            <section className="w-full bg-[#fcf9f4] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#e8e4dc]">
                <div className="max-w-7xl mx-auto space-y-16">
                    {/* Section Header */}
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <span className="block text-[10.5px] font-mono font-semibold uppercase tracking-[0.3em] text-[#8e763b]">
                            CRITICAL ACCLAIM &amp; SOVEREIGN PATRONS
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#1f1e1d] tracking-tight leading-[1.15]">
                            Words of Reflection
                        </h2>
                    </div>

                    {/* 3 Testimonials Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                        {DEFAULT_GLOBAL_TESTIMONIALS.map(function (item, idx) {
                            return (
                                <div
                                    key={idx}
                                    className="bg-white border border-[#e8e4dc] rounded-xs p-7 sm:p-8 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(31,30,29,0.05)] transition-all duration-300"
                                >
                                    <div className="space-y-5">
                                        <div className="flex items-center justify-between">
                                            {/* 5-Star Rating Row */}
                                            <div
                                                className="flex items-center gap-1 text-[#bfa76f]"
                                                aria-label={`${item.rating || 5} out of 5 stars`}
                                            >
                                                {Array.from({ length: item.rating || 5 }).map(function (_, starIdx) {
                                                    return (
                                                        <svg
                                                            key={starIdx}
                                                            className="w-3 h-3 fill-current"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M12 2l2.4 7.4h7.6l-6 4.5 2.3 7.1-6.3-4.6-6.3 4.6 2.3-7.1-6-4.5h7.6z" />
                                                        </svg>
                                                    );
                                                })}
                                            </div>

                                            {item.propertyTag && (
                                                <span className="text-[9px] font-mono tracking-widest text-[#8e763b] uppercase">
                                                    {item.propertyTag}
                                                </span>
                                            )}
                                        </div>

                                        {/* Editorial Quote */}
                                        <p className="font-serif italic text-sm sm:text-[15px] text-[#2d2b27] font-light leading-relaxed">
                                            {item.quote}
                                        </p>
                                    </div>

                                    {/* Author Metadata Footer */}
                                    <div className="mt-8 pt-5 border-t border-[#f4f0e6] flex flex-col">
                                        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1f1e1d]">
                                            {item.authorName}
                                        </span>
                                        <span className="font-sans text-[10px] text-[#78756d] font-light mt-0.5">
                                            {item.authorRole}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Dark Monolithic Callout Banner Card */}
                    <div className="mt-16 sm:mt-20 bg-[#181716] text-[#fcf9f4] border border-[#2d2b27] rounded-xs p-8 sm:p-12 lg:p-14 shadow-2xl">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
                            {/* Left Content Area */}
                            <div className="max-w-2xl space-y-3">
                                <span className="block text-[10px] font-mono font-semibold uppercase tracking-[0.3em] text-[#bfa76f]">
                                    YOUR ESCAPE AWAITS • {activeSanctuarySpec.code}
                                </span>
                                <h3 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-white tracking-tight leading-[1.12]">
                                    Begin Your {activeSanctuarySpec.name} Retreat
                                </h3>
                                <p className="text-sm font-sans text-white/60 leading-relaxed max-w-xl font-light">
                                    Reserve directly with our private concierge team for bespoke itinerary curation, private pontoon or helipad arrival, and preferred suite placement.
                                </p>
                            </div>

                            {/* Right Dual Action Buttons */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 shrink-0">
                                <Link
                                    href={`/accommodations?sanctuary=${encodeURIComponent(activeSlug)}`}
                                    className="inline-flex items-center justify-center px-10 py-4 bg-[#bfa76f] hover:bg-[#aa935e] text-white font-mono text-[11px] font-semibold uppercase tracking-[0.22em] rounded-xs transition-all duration-300 shadow-sm text-center whitespace-nowrap"
                                >
                                    CHECK AVAILABILITY
                                </Link>

                                <a
                                    href={`tel:${activeSanctuarySpec.majordomoDirectPhone.replace(/\s+/g, '')}`}
                                    className="inline-flex items-center justify-center px-10 py-4 bg-transparent hover:bg-white/5 border border-white/20 hover:border-white/40 text-white font-mono text-[11px] font-medium uppercase tracking-[0.22em] rounded-xs transition-all duration-300 text-center whitespace-nowrap"
                                >
                                    INQUIRE MAJORDOMO
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Footer */}
            <Footer />
        </div>
    );
}

export default HomePage;