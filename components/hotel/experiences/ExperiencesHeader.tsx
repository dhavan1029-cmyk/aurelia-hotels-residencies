import React from 'react';
import {
    ExperienceCategoryFilterBar,
    ExperienceCategoryId,
    ExperienceCategoryOption,
} from './ExperienceCategoryFilterBar';

export { DEFAULT_EXPERIENCE_CATEGORIES } from './ExperienceCategoryFilterBar';
export type { ExperienceCategoryId, ExperienceCategoryOption } from './ExperienceCategoryFilterBar';

// ============================================================================
// 1. DATA CONTRACTS & VIEWMODELS
// ============================================================================

export interface ExperiencesTelemetryData {
    sanctuaryName: string;
    regionSubtitle: string;
    coordinatesDisplay: string;
    majordomoPhoneDisplay: string;
    majordomoPhoneTel: string;
    dossierCode: string;
}

export interface ExperiencesEditorialData {
    folioLabel: string;
    headline: string;
    narrativeMonograph: string;
}

// ============================================================================
// 2. SUB-COMPONENT 1: ExperiencesTelemetryBar (Server Component - 0 KB JS)
// ============================================================================

export interface ExperiencesTelemetryBarProps {
    data?: Partial<ExperiencesTelemetryData>;
}

export function ExperiencesTelemetryBar({ data }: ExperiencesTelemetryBarProps) {
    const sanctuaryName = data?.sanctuaryName || 'SANCTUARY POSITANO';
    const regionSubtitle = data?.regionSubtitle || 'AMALFI COASTLINE, ITALY';
    const coordinates = data?.coordinatesDisplay || '40.6281°N, 14.4850°E';
    const phoneDisplay = data?.majordomoPhoneDisplay || '+39 089 875 111';
    const phoneTel = data?.majordomoPhoneTel || '+39089875111';
    const dossierCode = data?.dossierCode || 'MMXV-VII';

    return (
        <section
            aria-label="Sanctuary Telemetry & Majordomo Desk"
            className="w-full bg-[#f6f3ee] border-b border-[#e8e4dc] py-2 px-4 sm:px-8 text-[#5c564f]"
        >
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 text-[10.5px] font-mono tracking-[0.16em] uppercase">
                {/* Left: Sanctuary Coordinates & Geographical Seal */}
                <div className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8e763b]" aria-hidden="true" />
                    <span>
                        <strong className="text-[#1f1e1d] font-semibold">{sanctuaryName}</strong>
                        {' • '}
                        {regionSubtitle}
                        {' • '}
                        <span className="text-[#7c756c]">{coordinates}</span>
                    </span>
                </div>

                {/* Right: Majordomo Hotline & Folio Registry Token */}
                <div className="flex items-center gap-5 sm:gap-6">
                    <div className="flex items-center gap-1.5">
                        <svg
                            className="w-3.5 h-3.5 text-[#8e763b]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                        </svg>
                        <span className="text-[#7c756c]">MAJORDOMO DESK:</span>
                        <a
                            href={`tel:${phoneTel}`}
                            className="text-[#1f1e1d] font-medium hover:text-[#8e763b] transition-colors underline decoration-[#e8e4dc] underline-offset-4"
                        >
                            {phoneDisplay}
                        </a>
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 text-[#7c756c]">
                        <span className="inline-block w-1 h-1 rounded-full bg-[#8e763b]/70" />
                        <span>SANCTUARY DOSSIER:</span>
                        <span className="text-[#1f1e1d] font-medium">{dossierCode}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// 3. SUB-COMPONENT 2: ExperiencesEditorialHeader (Server Component - 0 KB JS)
// ============================================================================

export interface ExperiencesEditorialHeaderProps {
    data?: Partial<ExperiencesEditorialData>;
}

export function ExperiencesEditorialHeader({ data }: ExperiencesEditorialHeaderProps) {
    const folioLabel = data?.folioLabel || 'FOLIO NO. IV • CURATED ITINERARIES & CELLAR ARCHIVES';
    const headline = data?.headline || 'Curated Escapes & Sensory Gastronomy';
    const narrativeMonograph =
        data?.narrativeMonograph ||
        'Suspended between sheer limestone cliffs and the Tyrrhenian abyss, each encounter is an unhurried, private rite curated exclusively for the patrons of Sanctuary Positano.';

    return (
        <header className="w-full pt-10 sm:pt-14 pb-8 px-4 sm:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
                {/* Left Column (8 cols): Folio Tag & Serif Headline */}
                <div className="lg:col-span-8 space-y-3">
                    <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-[#8e763b] uppercase">
                        {folioLabel}
                    </p>
                    <h1 className="text-3xl sm:text-4xl lg:text-[42px] leading-[1.12] font-serif text-[#1f1e1d] tracking-tight">
                        {headline}
                    </h1>
                </div>

                {/* Right Column (4 cols): Editorial Narrative Monograph */}
                <div className="lg:col-span-4 lg:pb-1">
                    <p className="text-[12.5px] sm:text-[13px] leading-[1.65] font-serif text-[#5c564f] italic lg:border-l lg:border-[#e8e4dc] lg:pl-6">
                        {narrativeMonograph}
                    </p>
                </div>
            </div>
        </header>
    );
}

// ============================================================================
// 4. COMPOSITE SERVER SECTION (Assembles All 3 Components)
// ============================================================================

export interface ExperiencesHeaderCompositeProps {
    telemetry?: Partial<ExperiencesTelemetryData>;
    editorial?: Partial<ExperiencesEditorialData>;
    categories?: ExperienceCategoryOption[];
    activeCategory?: ExperienceCategoryId;
}

export function ExperiencesHeaderComposite({
    telemetry,
    editorial,
    categories,
    activeCategory,
}: ExperiencesHeaderCompositeProps) {
    return (
        <div className="w-full bg-[#fcf9f4]">
            {/* Top Telemetry & Majordomo Sub-bar */}
            <ExperiencesTelemetryBar data={telemetry} />

            {/* Editorial Headline & Narrative Monograph */}
            <ExperiencesEditorialHeader data={editorial} />

            {/* Interactive Leaf Client Category Filter Pills */}
            <ExperienceCategoryFilterBar
                categories={categories}
                selectedCategory={activeCategory}
            />
        </div>
    );
}

export default ExperiencesHeaderComposite;
