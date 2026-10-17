'use client';

import Image from 'next/image';


export interface ArchitecturalExcerptFigure {
    figureNumber: string;
    captionTitle: string;
    locationAnnotation: string;
    imageUrl: string;
    imageAlt: string;
    aspectRatioClass?: string;
    specBadge: string;
}

export interface EcologicalCustodianshipMetric {
    metricNumber: string;
    headline: string;
    badge: string;
    narrative: string;
    iconType: 'geothermal' | 'terroir' | 'circularity';
}

export interface HeritageArchitecturalExcerptsData {
    // 1. Photographic Excerpts Header
    eyebrow: string;
    heading: string;
    description: string;
    figures: [ArchitecturalExcerptFigure, ArchitecturalExcerptFigure];

    // 2. Conservator Quote Block
    architectQuote: string;
    architectName: string;
    architectRole: string;
    architectStudio: string;
    conservatorStamp: string;

    // 3. Environmental Stewardship Strip
    stewardshipEyebrow: string;
    stewardshipHeading: string;
    stewardshipStatement: string;
    stewardshipNotice: string;
    metrics: [
        EcologicalCustodianshipMetric,
        EcologicalCustodianshipMetric,
        EcologicalCustodianshipMetric
    ];
}

export const heritageExcerptsDefaultData: HeritageArchitecturalExcerptsData = {
    eyebrow: 'ARCHITECTURAL EXCERPTS • POSITANO & CAPRI',
    heading: 'Precision in Stone, Sunlight & Horizon',
    description:
        'Every aperture is chiseled with millimetric rigor to balance diurnal thermal comfort, acoustic stillness, and the unbroken drama of the Tyrrhenian horizon.',
    figures: [
        {
            figureNumber: 'FIG. 01',
            captionTitle: 'Honed Tivoli Travertine Bath Chamber',
            locationAnnotation: 'SANCTUARY 402 • LEVEL IV ELEVATION',
            imageUrl: '/limestone-villa.png',
            imageAlt: 'Architectural detail of travertine and limestone master bathroom in luxury coastal hotel, large sunlit window framing the sea, freestanding stone soaking tub',
            specBadge: 'SINGLE-BLOCK TIVOLI ASHLAR',
        },
        {
            figureNumber: 'FIG. 02',
            captionTitle: 'Sunken Cedar Solarium & Tyrrhenian Embrasure',
            locationAnnotation: 'CLIFF EDGE RESIDENCE • WEST WING',
            imageUrl: '/limestone-villa.png',
            imageAlt: 'Luxury Mediterranean cliffside stand-alone villa exterior, private infinity pool carved into sheer stone cliffs overlooking the sea at sunset',
            specBadge: 'GEOTHERMAL HYDRO-CIRCUIT',
        },
    ],
    architectQuote:
        '“We did not treat stone as an ornament or decorative shell. We extracted volumetric chambers from living coastal rock, so that temperature, acoustic silence, and shadows become structural realities of the sanctuary.”',
    architectName: 'Matteo Castiglione',
    architectRole: 'Lead Architect & Historic Conservator',
    architectStudio: 'STUDIO AURELIA CONSERVATION ARCHIVES • ROMA',
    conservatorStamp: 'SEALED & RATIFIED UNDER THE MONOLITHIC PRESERVATION CHARTER',
    stewardshipEyebrow: 'ECOLOGICAL & GEOLOGICAL CUSTODIANSHIP',
    stewardshipHeading: 'Harmony with Living Bedrock & Maritime Winds',
    stewardshipStatement:
        'Our presence upon the Amalfi coastlines is governed by an unyielding commitment to environmental symbiosis and regenerative engineering.',
    stewardshipNotice: 'INDEPENDENTLY AUDITED BY THE ITALIAN HISTORIC MONUMENTS GUILD • ZERO SYNTHETIC POLYMERS',
    metrics: [
        {
            metricNumber: '01',
            headline: '100% Subterranean Geothermal Cooling',
            badge: '0 dB MECHANICAL EMISSIONS',
            narrative:
                'Silent hydrothermal convection circuits carved through living basalt beds regulate all suite chambers at an invariant 20.5°C without forced-air noise.',
            iconType: 'geothermal',
        },
        {
            metricNumber: '02',
            headline: '0 km Estate Terroir & Rainwater Harvest',
            badge: 'CENTURY CITRUS CISTERNS',
            narrative:
                'Chiseled micro-relief rainwater grooves channel all seasonal runoff into subterranean cisterns to nourish two-century-old olive and lemon groves.',
            iconType: 'terroir',
        },
        {
            metricNumber: '03',
            headline: 'Zero Landfill & Sovereign Glass Circularity',
            badge: '100% CIRCULAR CHARTER',
            narrative:
                'Zero single-use plastics across our entire supply chain. Bespoke hand-blown Murano decanters, compostable flax linens, and pure natural lime wash.',
            iconType: 'circularity',
        },
    ],
};

export interface HeritageArchitecturalExcerptsSectionProps {
    data?: HeritageArchitecturalExcerptsData;
    onFigureClick?: (figIndex: number) => void;
    className?: string;
}

export function HeritageArchitecturalExcerptsSection({
    data = heritageExcerptsDefaultData,
    onFigureClick,
    className = '',
}: HeritageArchitecturalExcerptsSectionProps) {
    const {
        eyebrow,
        heading,
        description,
        figures,
        architectQuote,
        architectName,
        architectRole,
        architectStudio,
        conservatorStamp,
        stewardshipEyebrow,
        stewardshipHeading,
        stewardshipStatement,
        stewardshipNotice,
        metrics,
    } = data;

    const renderStewardshipIcon = (type: EcologicalCustodianshipMetric['iconType']) => {
        switch (type) {
            case 'geothermal':
                return (
                    <svg
                        className="w-4 h-4 text-[#8e763b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                );
            case 'terroir':
                return (
                    <svg
                        className="w-4 h-4 text-[#8e763b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M12 8v4M12 16h.01" />
                    </svg>
                );
            case 'circularity':
                return (
                    <svg
                        className="w-4 h-4 text-[#8e763b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="23 4 23 10 17 10" />
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <section className={`w-full max-w-340 mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24 space-y-16 sm:space-y-20 ${className}`}>
            {/* 1. SECTION EDITORIAL HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 sm:pb-10 border-b border-[#e8e4dc]">
                <div className="max-w-2xl">
                    <span className="block text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8e763b] mb-2.5">
                        {eyebrow}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#1f1e1d] tracking-tight leading-[1.12]">
                        {heading}
                    </h2>
                    <p className="mt-3.5 text-xs sm:text-[13px] md:text-sm text-[#5f5c56] font-sans font-light leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="shrink-0 self-start lg:self-auto">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f6f2ea] border border-[#ded9ce] text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b] shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b]" />
                        <span>ARCHITECTURAL VOLUMETRICS</span>
                    </span>
                </div>
            </div>

            {/* 2. DUAL PHOTOGRAPHIC EXCERPTS GRID (FIG 01 & FIG 02) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                {figures.map(function (fig, idx) {
                    return (
                        <figure
                            key={idx}
                            onClick={function () {
                                if (onFigureClick) {
                                    onFigureClick(idx);
                                }
                            }}
                            className="group bg-white border border-[#e8e4dc] rounded-lg overflow-hidden shadow-[0_4px_24px_rgba(31,30,29,0.03)] hover:shadow-[0_16px_40px_rgba(31,30,29,0.08)] hover:border-[#8e763b]/40 transition-all duration-500 cursor-pointer flex flex-col justify-between"
                        >
                            {/* Photographic Image Frame */}
                            <div className="relative aspect-16/11 sm:aspect-16/10 w-full overflow-hidden bg-[#eeeae2]">
                                <Image
                                    src={fig.imageUrl}
                                    alt={fig.imageAlt}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                                {/* Top Left Badges */}
                                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                                    <span className="px-3 py-1 rounded-sm bg-black/60 backdrop-blur-md text-white font-sans text-[10px] font-semibold uppercase tracking-[0.22em] shadow-sm">
                                        {fig.figureNumber}
                                    </span>
                                    <span className="px-2.5 py-1 rounded-sm bg-[#8e763b] text-white font-sans text-[9px] font-semibold uppercase tracking-[0.18em] shadow-sm">
                                        {fig.specBadge}
                                    </span>
                                </div>

                                {/* Bottom Image Overlay Caption */}
                                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                                    <span className="text-[9px] font-mono tracking-widest text-[#dcdad5] uppercase block mb-1">
                                        {fig.locationAnnotation}
                                    </span>
                                    <h4 className="font-serif text-lg sm:text-xl font-light text-white/95 tracking-tight">
                                        {fig.captionTitle}
                                    </h4>
                                </div>
                            </div>

                            {/* Caption Footer Monograph */}
                            <div className="p-5 sm:p-6 bg-[#fcf9f4] border-t border-[#eeeae2] flex items-center justify-between text-xs font-sans">
                                <span className="text-[#78756d] font-light">
                                    Extracted archival study plate • Positano Monolith
                                </span>

                                <span className="inline-flex items-center gap-1 font-semibold uppercase tracking-[0.18em] text-[#8e763b] group-hover:text-[#1f1e1d] transition-colors text-[10px]">
                                    <span>INSPECT VOLUMETRICS</span>
                                    <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </span>
                            </div>
                        </figure>
                    );
                })}
            </div>

            {/* 3. CONSERVATOR EDITORIAL PULL-QUOTE CARD (STUDIO AURELIA ARCHIVES) */}
            <div className="bg-[#191817] text-[#fcf9f4] border border-[#34322e] rounded-lg p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
                {/* Subtle Geometric Dot Texture */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#bfa76f 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />

                <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.26em] text-[#bfa76f]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#bfa76f] animate-pulse" />
                        <span>{conservatorStamp}</span>
                    </div>

                    <blockquote className="font-serif italic text-xl sm:text-2xl lg:text-[27px] font-light text-white/95 leading-relaxed tracking-tight">
                        {architectQuote}
                    </blockquote>

                    <div className="pt-2 flex flex-col items-center justify-center space-y-1">
                        <span className="font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-[0.22em] text-[#bfa76f]">
                            {architectName}
                        </span>
                        <span className="text-[11px] text-[#a4a098] font-sans font-light tracking-wider">
                            {architectRole}
                        </span>
                        <span className="text-[9px] font-mono text-[#78756d] uppercase tracking-widest pt-1">
                            {architectStudio}
                        </span>
                    </div>
                </div>
            </div>

            {/* 4. ECOLOGICAL & GEOLOGICAL CUSTODIANSHIP TRI-FOLD STRIP */}
            <div className="bg-[#f6f2ea] border border-[#e2ddd3] rounded-lg p-8 sm:p-10 lg:p-12 space-y-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-[#ded9ce]">
                    <div className="max-w-2xl">
                        <span className="block text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8e763b] mb-1.5">
                            {stewardshipEyebrow}
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#1f1e1d] tracking-tight leading-[1.14]">
                            {stewardshipHeading}
                        </h3>
                        <p className="mt-2 text-xs sm:text-[13px] text-[#5f5c56] font-sans font-light leading-relaxed">
                            {stewardshipStatement}
                        </p>
                    </div>

                    <div className="shrink-0 self-start lg:self-auto">
                        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#78756d]">
                            {stewardshipNotice}
                        </span>
                    </div>
                </div>

                {/* 3 Metrics Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {metrics.map(function (metric) {
                        return (
                            <div
                                key={metric.metricNumber}
                                className="bg-white border border-[#ded9ce] rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-2xs hover:border-[#8e763b]/60 transition-colors"
                            >
                                <div>
                                    <div className="flex items-center justify-between pb-4 border-b border-[#f0ece3] mb-4">
                                        <div className="p-2 rounded-lg bg-[#f6f2ea] border border-[#ded9ce] text-[#8e763b]">
                                            {renderStewardshipIcon(metric.iconType)}
                                        </div>
                                        <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.18em] text-[#8e763b]">
                                            {metric.badge}
                                        </span>
                                    </div>

                                    <h4 className="font-serif text-lg sm:text-xl font-normal text-[#1f1e1d] tracking-tight leading-tight">
                                        {metric.headline}
                                    </h4>

                                    <p className="mt-2.5 text-xs text-[#6e6b64] font-sans font-light leading-relaxed">
                                        {metric.narrative}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-[#f0ece3] text-[9px] font-mono tracking-widest text-[#a4a098] uppercase">
                                    CHARTER SPECIFICATION {metric.metricNumber} / 03
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}