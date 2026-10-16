import React from 'react';

export interface ArchitecturalFeature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export interface FloorplanZone {
    id: string;
    label: string;
    sublabel?: string;
    areaTag?: string;
    styleClass: string;
}

export interface SpatialMetric {
    label: string;
    sublabel: string;
    icon: React.ReactNode;
}

export interface AccommodationNarrativeAndFloorplanData {
    // 4 Spatial Specifications (maps to specs & sensoryCapabilities in AccommodationCategory)
    spatialMetrics: SpatialMetric[];

    // Narrative Section
    sectionEyebrow: string;
    headline: string;
    paragraphs: string[];
    features: ArchitecturalFeature[];

    // Spatial Floorplan Section
    floorplanEyebrow: string;
    floorplanTitle: string;
    grossFootprint: string;
    deckArea: string;
    legendItems: Array<{
        colorClass: string;
        label: string;
    }>;

}

const suite402NarrativeData: AccommodationNarrativeAndFloorplanData = {
    sectionEyebrow: 'ATMOSPHERIC RESONANCE & NARRATIVE',
    headline: 'Warm travertine, cedar grain, and unhurried coastal stillness.',
    paragraphs: [
        'Perched atop the southern cliffline, Suite 402 is an acoustic retreat calibrated for restorative peace. Honed ivory travertine remains soothingly cool beneath bare feet, while artisan cedar cabinetry fills the morning air with grounding woodland resin.',
        'Designed in collaboration with coastal master craftsmen, the floor-to-ceiling retractable glass merges the sanctuary living salon with the boundless horizon. Here, light shifts continuously across chalky lime-washed walls, inviting contemplation at any hour.',
    ],
    features: [
        {
            title: 'South Exposure',
            description: 'Optimal diurnal warmth & sun',
            icon: (
                <svg
                    className="w-4 h-4 text-[#8e763b]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
            ),
        },
        {
            title: 'Triple Glazing',
            description: 'Calm whisper sound isolation',
            icon: (
                <svg
                    className="w-4 h-4 text-[#8e763b]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                    <line x1="15" y1="3" x2="15" y2="21" />
                </svg>
            ),
        },
        {
            title: 'Sommelier Vault',
            description: 'Controlled micro-cellar in suite',
            icon: (
                <svg
                    className="w-4 h-4 text-[#8e763b]"
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
    floorplanEyebrow: 'ARCHITECTURAL COMPOSITION',
    floorplanTitle: '1:50 Spatial Floorplan',
    grossFootprint: 'GROSS FOOTPRINT: 132 M²',
    deckArea: 'DECK: 44 M²',
    legendItems: [
        {
            colorClass: 'bg-[#bfa76f]',
            label: 'Basalt Mineral Pool',
        },
        {
            colorClass: 'bg-[#ded9ce]',
            label: 'Freestanding Bath En-suite',
        },
        {
            colorClass: 'bg-[#e5e0d4]',
            label: 'Artisan Oak Living Salon',
        },
    ],
    spatialMetrics: [
        {
            label: '132 m²',
            sublabel: 'INTERIOR & DECK AREA',
            icon: (
                <svg
                    className="w-5 h-5 text-[#8e763b]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M3 21h18M3 7v14M21 7v14M3 7l9-4 9 4M9 21V12h6v9" />
                </svg>
            ),
        },
        {
            label: 'King Bed',
            sublabel: 'CUSTOM RAW SILK MAT',
            icon: (
                <svg
                    className="w-5 h-5 text-[#8e763b]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M2 19h20M4 19V9a2 2 0 012-2h12a2 2 0 012 2v10M2 14h20" />
                </svg>
            ),
        },
        {
            label: '32°C Water',
            sublabel: 'HEATED BASALT PLUNGE',
            icon: (
                <svg
                    className="w-5 h-5 text-[#8e763b]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M2 12h20M2 17h20M2 7h20" />
                </svg>
            ),
        },
        {
            label: '180° Open',
            sublabel: 'COASTAL PANORAMA',
            icon: (
                <svg
                    className="w-5 h-5 text-[#8e763b]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
                </svg>
            ),
        },
    ],
};


export interface AccommodationNarrativeAndFloorplanProps {
    data?: AccommodationNarrativeAndFloorplanData;
    onExploreFloorplanModal?: () => void;
    className?: string;
}

export function AccommodationNarrativeAndFloorplanSection({
    data = suite402NarrativeData,
    onExploreFloorplanModal,
    className = '',
}: AccommodationNarrativeAndFloorplanProps) {
    const {
        sectionEyebrow,
        headline,
        paragraphs,
        features,
        floorplanEyebrow,
        floorplanTitle,
        grossFootprint,
        deckArea,
        legendItems,
        spatialMetrics
    } = data;

    return (
        <div className={`space-y-10 sm:space-y-12 ${className}`}>

            {/* Stone-Toned 4-Metric Spatial Specs Strip */}
            <div className="col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
                {spatialMetrics.map(function (metric, idx) {
                    return (
                        <div
                            key={idx}
                            className="bg-white border border-[#e8e4dc] p-4 sm:p-5 rounded-lg flex items-start gap-3.5 transition-all duration-300 hover:shadow-xs"
                        >
                            <div className="flex flex-col gap-2.5">
                                <span className="bg-white shrink-0">
                                    {metric.icon}
                                </span>
                                <span className="font-serif text-xl sm:text-2xl font-normal text-[#1f1e1d] leading-none">
                                    {metric.label}
                                </span>
                                <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-[#78756e] font-medium mt-1.5 leading-snug">
                                    {metric.sublabel}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 1. Atmospheric Resonance & Architectural Monograph Card */}
            <article className="bg-white border border-[#e8e4dc] rounded-lg p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                <div>
                    <span className="block text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#8e763b] mb-2.5">
                        {sectionEyebrow}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#1f1e1d] tracking-tight leading-[1.2]">
                        {headline}
                    </h2>
                </div>

                {/* Narrative Paragraphs */}
                <div className="mt-5 space-y-4 text-xs sm:text-[13px] md:text-sm text-[#5f5c56] font-sans font-light leading-relaxed max-w-3xl">
                    {paragraphs.map(function (p, idx) {
                        return <p key={idx}>{p}</p>;
                    })}
                </div>

                {/* 3 Stone Architectural Specifications Bar */}
                <div className="mt-8 pt-6 border-t border-[#eeeae2] grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                    {features.map(function (feat, idx) {
                        return (
                            <div
                                key={idx}
                                className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f6f2ea]/70 border border-[#e8e4dc] transition-all hover:bg-[#f6f2ea]"
                            >
                                <div className="p-2 rounded-lg bg-white border border-[#ded9ce] shadow-2xs shrink-0">
                                    {feat.icon}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-sans text-xs font-semibold text-[#1f1e1d] tracking-tight">
                                        {feat.title}
                                    </span>
                                    <span className="text-[10px] text-[#7a7770] font-sans mt-0.5 leading-snug">
                                        {feat.description}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </article>

            {/* 2. Architectural Composition & 1:50 Spatial Floorplan Blueprint */}
            <article className="bg-white border border-[#e8e4dc] rounded-lg p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#eeeae2] pb-5 mb-6">
                    <div>
                        <span className="block text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#8e763b] mb-1">
                            {floorplanEyebrow}
                        </span>
                        <h3 className="font-serif text-2xl sm:text-[28px] font-normal text-[#1f1e1d] tracking-tight">
                            {floorplanTitle}
                        </h3>
                    </div>

                    <div className="flex items-center gap-2.5 text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-[#8e8a82]">
                        <span>{grossFootprint}</span>
                        <span>/</span>
                        <span className="text-[#8e763b]">{deckArea}</span>
                    </div>
                </div>

                {/* 1:50 Spatial CAD Floorplan Diagram Frame */}
                <div
                    className="relative w-full rounded-lg bg-[#f6f2ea] border border-[#ded9ce] p-5 sm:p-7 overflow-hidden cursor-crosshair group"
                    onClick={onExploreFloorplanModal}
                >
                    {/* Architectural Grid Texture Background */}
                    <div
                        className="absolute inset-0 opacity-[0.35] pointer-events-none"
                        style={{
                            backgroundImage:
                                'radial-gradient(#8e763b 0.75px, transparent 0.75px)',
                            backgroundSize: '16px 16px',
                        }}
                    />

                    {/* Blueprint Architectural Assembly (Interior Suite + Exterior Plunge Deck) */}
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch min-h-72.5">
                        {/* Interior Suite Wing (8 cols) */}
                        <div className="md:col-span-8 bg-white/90 border border-[#ded9ce] rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
                            <div className="flex items-center justify-between pb-3 border-b border-[#f0ece3] text-[9px] font-sans uppercase tracking-[0.2em] text-[#8e8a82]">
                                <span>INTERIOR CHAMBER • 88 M²</span>
                                <span>LEVEL IV SOUTH WING</span>
                            </div>

                            {/* Interior Zones Layout */}
                            <div className="grid grid-cols-2 gap-4 my-4">
                                {/* Custom Silk King Bed Chamber */}
                                <div
                                    className={`p-4 rounded-xl border border-dashed transition-all duration-200 flex flex-col justify-center items-center text-center bg-[#faf8f5] border-[#ded9ce]`}
                                >
                                    <div className="w-10 h-7 border border-[#ded9ce] rounded-sm bg-white mb-2 flex items-center justify-center">
                                        <span className="w-8 h-2 bg-[#eeeae2] rounded-xs" />
                                    </div>
                                    <span className="font-serif text-xs font-semibold text-[#1f1e1d]">
                                        Custom Silk King
                                    </span>
                                    <span className="text-[9px] font-sans text-[#7a7770] uppercase tracking-wider mt-0.5">
                                        Primary Chamber
                                    </span>
                                </div>

                                {/* Oak Living Salon */}
                                <div
                                    className={`p-4 rounded-xl border border-dashed transition-all duration-200 flex flex-col justify-center items-center text-center bg-[#faf8f5] border-[#ded9ce]`}
                                >
                                    <div className="w-9 h-7 border border-[#ded9ce] rounded-md bg-white mb-2 flex items-center justify-center">
                                        <span className="text-[9px] text-[#8e763b]">□</span>
                                    </div>
                                    <span className="font-serif text-xs font-semibold text-[#1f1e1d]">
                                        Oak Living Salon
                                    </span>
                                    <span className="text-[9px] font-sans text-[#7a7770] uppercase tracking-wider mt-0.5">
                                        Panoramic Lounge
                                    </span>
                                </div>
                            </div>

                            {/* Bath & Vanity Row */}
                            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#f0ece3] text-[10px] font-sans">
                                <div className="p-2.5 rounded-lg bg-[#fcfaf7] border border-[#ded9ce] flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#ded9ce]" />
                                    <span className="text-[#3b3935] font-medium">
                                        Freestanding Bath
                                    </span>
                                </div>
                                <div className="p-2.5 rounded-lg bg-[#fcfaf7] border border-[#ded9ce] flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#ded9ce]" />
                                    <span className="text-[#3b3935] font-medium">
                                        Rain Shower & Double Vanity
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Exterior Clifftop Deck Wing (4 cols) */}
                        <div className="md:col-span-4 bg-[#f2ede4]/90 border border-[#ded9ce] rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
                            <div className="flex items-center justify-between pb-3 border-b border-[#ded9ce] text-[9px] font-sans uppercase tracking-[0.2em] text-[#8e763b]">
                                <span>CLIFF DECK • 44 M²</span>
                                <span>180° HORIZON</span>
                            </div>

                            {/* Heated Basalt Geothermal Plunge Pool Box */}
                            <div
                                className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-center items-center text-center my-3 'bg-[#bfa76f]/10 border-[#ded9ce]'`}
                            >
                                <span className="font-serif text-xs font-semibold text-[#1f1e1d]">
                                    Basalt Plunge Pool
                                </span>
                                <span className="inline-block mt-1 px-2 py-0.5 rounded bg-white/80 border border-[#ded9ce] text-[8px] font-sans font-bold text-[#8e763b] uppercase tracking-wider">
                                    32°C GEOTHERMAL
                                </span>
                            </div>

                            {/* Teak Solarium Deck Area */}
                            <div className="p-2.5 rounded-lg bg-white/70 border border-[#ded9ce] text-center text-[10px] font-sans text-[#5c5952]">
                                <span className="font-medium">Teak Solarium Deck</span>
                                <span className="block text-[8px] uppercase tracking-wider text-[#8e8a82] mt-0.5">
                                    2 Sunken Daybeds
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Blueprint Legend Bar */}
                <div className="mt-5 pt-4 border-t border-[#eeeae2] flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-[#6e6b64]">
                    <div className="flex flex-wrap items-center gap-5 sm:gap-6">
                        {legendItems.map(function (item, idx) {
                            return (
                                <div key={idx} className="flex items-center gap-2">
                                    <span
                                        className={`w-2.5 h-2.5 rounded-sm ${item.colorClass} border border-black/10`}
                                    />
                                    <span className="text-[11px] font-medium text-[#3b3935]">
                                        {item.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        onClick={onExploreFloorplanModal}
                        className="inline-flex items-center gap-1.5 text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b] hover:text-[#1f1e1d] transition-colors"
                    >
                        <span>EXPAND BLUEPRINT CAD</span>
                        <span>→</span>
                    </button>
                </div>
            </article>
        </div>
    );
}


