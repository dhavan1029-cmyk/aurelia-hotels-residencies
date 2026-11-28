import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/config/prisma';
import { getSanctuaryBySlug } from '@/lib/data/sanctuariesCatalog';
import { SanctuarySelectorStrip } from '@/components/hotel/SanctuarySelectorStrip';

// Experiences Sections
import {
    ExperiencesHeaderComposite,
    ExperienceCategoryId,
} from '@/components/hotel/experiences/ExperiencesHeader';
import { FeaturedExpeditionHeroSection } from '@/components/hotel/experiences/FeaturedExpeditionHeroSection';
import { GastronomicSanctuariesSection } from '@/components/hotel/experiences/GastronomicSanctuariesSection';
import { CuratedEncountersSection } from '@/components/hotel/experiences/CuratedEncountersSection';
import { SovereignPrivatizationSection } from '@/components/hotel/experiences/SovereignPrivatizationSection';
import { Footer } from '@/components/layout/Footer';

// Mappers
import {
    mapSanctuaryToTelemetry,
    mapSanctuaryToEditorialHeader,
    mapCategoryFilterOptions,
    mapToFeaturedExpeditionData,
    mapDiningVenueToViewModel,
    mapExperienceToSignatureEncounter,
    buildDefaultSanctuaryCredentials,
    mapSanctuaryToPrivatizationData,
} from '@/lib/hotel/mappers/experiencesMapper';

export interface ExperiencesPageProps {
    searchParams?: Promise<{
        sanctuary?: string;
        category?: string;
    }>;
}

// ============================================================================
// 1. HELPER: Category Normalization Utility
// ============================================================================

/**
 * Normalizes category strings from database enums, slugs, or UI values
 * into canonical ExperienceCategoryId identifiers.
 */
function normalizeCategory(cat?: string | null): ExperienceCategoryId {
    if (!cat) return 'all';
    const clean = cat.toLowerCase().replace(/_/g, '-').trim();

    if (clean.includes('marine') || clean.includes('charter') || clean.includes('maritime')) {
        return 'marine-charters';
    }
    if (clean.includes('thermal') || clean.includes('wellness') || clean.includes('spa') || clean.includes('bath')) {
        return 'thermal-wellness';
    }
    if (clean.includes('gastronomy') || clean.includes('dining') || clean.includes('culinary') || clean.includes('restaurant')) {
        return 'gastronomy-dining';
    }
    if (clean.includes('terroir') || clean.includes('masterclass') || clean.includes('enology') || clean.includes('wine') || clean.includes('olive')) {
        return 'terroir-masterclasses';
    }

    return (clean as ExperienceCategoryId) || 'all';
}

// ============================================================================
// 2. SUB-COMPONENT: Editorial Sanctuary Empty / Offline Notice
// ============================================================================

interface SanctuaryNoticeProps {
    sanctuaryName: string;
    sanctuaryCode: string;
    majordomoDirectPhone?: string;
}

function SanctuaryCuratingNotice({
    sanctuaryName,
    sanctuaryCode,
    majordomoDirectPhone = '+39 089 875 111',
}: SanctuaryNoticeProps) {
    return (
        <section
            aria-labelledby="sanctuary-curation-notice"
            className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10"
        >
            <div className="bg-white border border-[#ded9ce] p-8 sm:p-12 lg:p-16 text-center space-y-6 shadow-[0_4px_30px_rgba(31,30,29,0.03)]">
                {/* Monogram Seal Pin */}
                <div className="w-12 h-12 mx-auto rounded-full bg-[#f6f2ea] border border-[#ded9ce] flex items-center justify-center text-[#8e763b]">
                    <span className="font-serif text-lg font-semibold leading-none">✦</span>
                </div>

                {/* Editorial Typography */}
                <div className="space-y-2 max-w-2xl mx-auto">
                    <span className="text-[10px] font-mono font-semibold tracking-[0.28em] text-[#8e763b] uppercase block">
                        TERROIR CALIBRATION • {sanctuaryCode}
                    </span>
                    <h2
                        id="sanctuary-curation-notice"
                        className="text-2xl sm:text-3xl lg:text-[34px] font-serif text-[#1f1e1d] font-normal tracking-tight"
                    >
                        Expeditions &amp; Terroir Tastings Under Seasonal Curation
                    </h2>
                    <p className="text-xs sm:text-[13px] leading-relaxed text-[#6e685f] font-sans font-light pt-1">
                        Private marine charters, glacial helicopter excursions, and Michelin cellar tastings for{' '}
                        <strong className="font-medium text-[#1f1e1d]">{sanctuaryName}</strong> are being individually curated for upcoming reservations or reserved exclusively for full-enclave buyouts.
                    </p>
                </div>

                {/* Telemetry Indicator Strip */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fcfaf7] border border-[#e8e4dc] text-[9.5px] font-mono tracking-[0.18em] text-[#8e763b] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b] animate-pulse" />
                    <span>DIRECT INQUIRIES ROUTED TO ENCLAVE MAJORDOMO</span>
                </div>

                {/* Primary Contact CTAs */}
                <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href={`/contact?sanctuary=${encodeURIComponent(sanctuaryCode)}&subject=bespoke-encounters`}
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1f1e1d] hover:bg-[#343230] text-[#fcf9f4] text-[10.5px] font-mono font-semibold tracking-[0.2em] uppercase transition-all shadow-sm"
                    >
                        <span>Consult Majordomo Desk</span>
                        <span className="text-xs">→</span>
                    </Link>

                    <a
                        href={`tel:${majordomoDirectPhone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#fcfaf7] hover:bg-[#f6f2ea] text-[#1f1e1d] border border-[#ded9ce] text-[10.5px] font-mono tracking-[0.18em] uppercase transition-colors"
                    >
                        <span>Telephone Direct</span>
                        <span className="text-xs text-[#8e763b]">({majordomoDirectPhone})</span>
                    </a>
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// 3. MASTER PAGE COMPONENT
// ============================================================================

export default async function ExperiencesPage({ searchParams }: ExperiencesPageProps) {
    const resolvedParams = searchParams ? await searchParams : {};
    const requestedSanctuarySlug = resolvedParams.sanctuary || 'sanctuary-positano';
    const rawCategory = resolvedParams.category || 'all';
    const activeCategory = normalizeCategory(rawCategory);

    // 1. Resolve sanctuary specification from catalog
    const sanctuarySpec = getSanctuaryBySlug(requestedSanctuarySlug);

    // 2. Query relational database with defensive error trapping
    let sanctuaryDb = null;
    let allExperiences: Array<any> = [];
    let diningVenues: Array<any> = [];

    try {
        const [sanctuaryRes, experiencesRes, diningRes] = await Promise.all([
            prisma.sanctuary.findFirst({
                where: {
                    OR: [
                        { slug: requestedSanctuarySlug },
                        { code: sanctuarySpec.code },
                    ],
                },
            }),
            prisma.experience.findMany({
                where: {
                    sanctuary: {
                        OR: [
                            { slug: requestedSanctuarySlug },
                            { code: sanctuarySpec.code },
                        ],
                    },
                },
                // orderBy: { displayOrder: 'asc' },
            }),
            prisma.diningVenue.findMany({
                where: {
                    sanctuary: {
                        OR: [
                            { slug: requestedSanctuarySlug },
                            { code: sanctuarySpec.code },
                        ],
                    },
                },
                orderBy: { michelinStars: 'desc' },
            }),
        ]);

        sanctuaryDb = sanctuaryRes;
        allExperiences = experiencesRes || [];
        diningVenues = diningRes || [];
    } catch (err) {
        sanctuaryDb = null;
        allExperiences = [];
        diningVenues = [];
    }

    // 3. Compute category counts for filter tabs with normalized category keys
    const categoryCounts: Record<string, number> = {};
    for (let i = 0; i < allExperiences.length; i++) {
        const normalizedCat = normalizeCategory(allExperiences[i].category);
        categoryCounts[normalizedCat] = (categoryCounts[normalizedCat] || 0) + 1;
    }
    // Also include dining venues in gastronomy count if dining venues exist
    if (diningVenues.length > 0) {
        categoryCounts['gastronomy-dining'] =
            (categoryCounts['gastronomy-dining'] || 0) + diningVenues.length;
    }

    const categoryOptions = mapCategoryFilterOptions(categoryCounts, allExperiences.length);

    // 4. Filter experiences by activeCategory
    const filteredExperiences =
        activeCategory === 'all'
            ? allExperiences
            : allExperiences.filter(function (e) {
                  return normalizeCategory(e.category) === activeCategory;
              });

    // 5. Category-aware display decisions:
    // - Featured expedition hero: Shown when 'all' or when category is 'marine-charters'
    //   (or if the flagship belongs to the filtered category).
    const flagshipExperience =
        filteredExperiences.find(function (e) {
            return e.isFlagship;
        }) || (activeCategory === 'all' ? allExperiences.find(function (e) { return e.isFlagship; }) || allExperiences[0] : filteredExperiences[0]);

    const shouldShowFlagshipHero =
        Boolean(flagshipExperience) &&
        (activeCategory === 'all' || activeCategory === 'marine-charters');

    // - Gastronomic venues: Shown when viewing 'all' or specifically 'gastronomy-dining'
    const shouldShowDiningSection =
        diningVenues.length > 0 &&
        (activeCategory === 'all' || activeCategory === 'gastronomy-dining');

    // 6. Map data into ViewModels
    const telemetryData = mapSanctuaryToTelemetry(sanctuaryDb || null);
    const editorialData = mapSanctuaryToEditorialHeader(sanctuaryDb || null);

    const featuredExpeditionData = flagshipExperience
        ? mapToFeaturedExpeditionData(flagshipExperience, sanctuaryDb)
        : undefined;

    const gastronomicVenuesData = diningVenues.map(function (v) {
        return mapDiningVenueToViewModel(v);
    });

    const signatureEncounters = filteredExperiences.map(function (e) {
        return mapExperienceToSignatureEncounter(e);
    });

    const sanctuaryCredentials = buildDefaultSanctuaryCredentials();
    const privatizationData = mapSanctuaryToPrivatizationData(sanctuaryDb || null);

    // 7. Check if sanctuary has any active catalog content
    const hasAnyContent =
        allExperiences.length > 0 || diningVenues.length > 0;

    return (
        <main className="min-h-screen bg-[#fcf9f4] text-[#1f1e1d] flex flex-col font-sans">
            {/* 1. Global Multi-Sanctuary Navigation Strip */}
            <SanctuarySelectorStrip
                activeSanctuarySlug={requestedSanctuarySlug}
                targetRoute="/experiences"
            />

            {/* 2. Institutional Monograph & Category Filter Bar */}
            <ExperiencesHeaderComposite
                telemetry={telemetryData}
                editorial={editorialData}
                categories={categoryOptions}
                activeCategory={activeCategory}
            />

            {/* If Content Exists: Render full luxury bento modules */}
            {hasAnyContent ? (
                <>
                    {/* 3. Flagship Expedition Hero Bento Card */}
                    {shouldShowFlagshipHero && featuredExpeditionData && (
                        <FeaturedExpeditionHeroSection data={featuredExpeditionData} />
                    )}

                    {/* 4. Gastronomic Sanctuaries & Michelin Showcase */}
                    {shouldShowDiningSection && (
                        <GastronomicSanctuariesSection data={{ venues: gastronomicVenuesData }} />
                    )}

                    {/* 5. Curated Signature Encounters & Institutional Credentials */}
                    <CuratedEncountersSection
                        data={{
                            sectionEyebrow:
                                activeCategory === 'all'
                                    ? 'PRIVATE RITES • SENSORY CATALOG'
                                    : `${activeCategory.toUpperCase().replace(/-/g, ' ')} • CURATION`,
                            sectionTitle:
                                activeCategory === 'all'
                                    ? 'Curated Signature Encounters'
                                    : `${categoryOptions.find(function (c) { return c.id === activeCategory; })?.label || 'Signature'} Encounters`,
                            encounters: signatureEncounters,
                            credentials: sanctuaryCredentials,
                        }}
                    />
                </>
            ) : (
                /* Empty / Curation Notice when this Sanctuary has no entries in DB */
                <SanctuaryCuratingNotice
                    sanctuaryName={sanctuarySpec.name}
                    sanctuaryCode={sanctuarySpec.code}
                    majordomoDirectPhone={sanctuarySpec.majordomoDirectPhone}
                />
            )}

            {/* 6. Sovereign Privatization & Seasonal Dispatch Strip */}
            <SovereignPrivatizationSection data={privatizationData} />

            {/* 7. Institutional Footer */}
            <Footer />
        </main>
    );
}