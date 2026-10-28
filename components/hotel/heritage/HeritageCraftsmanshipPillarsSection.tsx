'use client';

import Image from 'next/image';
import Link from 'next/link';


export interface PillarPeculiarity {
    label: string;
    description: string;
}

export interface CraftsmanshipPillarItem {
    pillarNumber: string;
    romanNumeral: string;
    tagline: string;
    title: string;
    provenanceEssay: string;
    materialsBadge: string;
    peculiarities: PillarPeculiarity[];
    heroImageUrl: string;
    heroImageAlt: string;
    actionLabel: string;
    actionHref: string;
    architecturalAnnotation: string;
}

export interface HeritageCraftsmanshipPillarsData {
    eyebrow: string;
    heading: string;
    description: string;
    charterNotice: string;
    pillars: [CraftsmanshipPillarItem, CraftsmanshipPillarItem, CraftsmanshipPillarItem];
}

export const heritagePillarsDefaultData: HeritageCraftsmanshipPillarsData = {
    eyebrow: 'THE ARCHITECTURAL DOCTRINE',
    heading: 'Three Pillars of Monolithic Craftsmanship',
    description:
        'Aurelia sanctuaries are engineered not as transient hospitality destinations, but as geological monuments designed to age gracefully alongside the coastal cliffs for centuries to come.',
    charterNotice: 'EXTRACTED FROM THE STUDIO AURELIA CONSERVATION ARCHIVES • ROME & POSITANO',
    pillars: [
        {
            pillarNumber: '01',
            romanNumeral: 'PILLAR I',
            tagline: 'GEOLOGICAL INTEGRATION',
            title: 'Vernacular Materiality & Living Quarry Stone',
            provenanceEssay:
                'Every ashlar block is sourced directly from historic travertine quarries in Tivoli and volcanic tuff deposits in Campania. Instead of synthetic lacquers or industrial resins, we dress stone exclusively with brushed sea-water and hydrated slaked lime, enabling the surfaces to breathe with maritime mist and develop a rich amber patina over decades.',
            materialsBadge: 'TIVOLI TRAVERTINE • SLAKED LIME • BRUSHED CEDAR',
            peculiarities: [
                {
                    label: 'Unsealed Stone Pores',
                    description: 'Naturally regulates humidity and remains cool beneath bare feet even during noon sun.',
                },
                {
                    label: 'Salvaged Tuscan Cedar',
                    description: 'Reclaimed timber cured in coastal salt air, imparting a grounding woodland resin aroma.',
                },
                {
                    label: 'Hand-Chiseled Grooves',
                    description: 'Micro-relief grooves channel gentle rainwater runoff directly into olive cisterns.',
                },
            ],
            heroImageUrl: '/garden-pavillion.png',
            heroImageAlt: 'Minimalist architectural detail of carved Roman travertine stone and monolithic limestone wall in luxury seaside resort, sunlight casting geometric shadows',
            actionLabel: 'EXPLORE STONE PROVENANCE',
            actionHref: '#quarry-provenance',
            architecturalAnnotation: 'FIG 1.1 — HONED ROMAN TRAVERTINE MASONRY BED',
        },
        {
            pillarNumber: '02',
            romanNumeral: 'PILLAR II',
            tagline: 'SENSORY PURITY',
            title: 'Acoustic Seclusion & Diurnal Microclimate',
            provenanceEssay:
                'Silence is treated not as the absence of noise, but as a deliberate architectural envelope. Walls varying between 80cm and 120cm in mass create an impenetrable acoustic baseline. Silent geothermal convection coils carved through bedrock regulate internal suite temperatures at an ideal 20.5°C without the auditory friction of forced air ventilation.',
            materialsBadge: '1.2M MONOLITHIC MASS • GEOTHERMAL COILS • 0 dB AMBIENT',
            peculiarities: [
                {
                    label: 'Natural Hydrothermal Veins',
                    description: 'Geothermal waters circulate silently through subterranean caldarium circuits.',
                },
                {
                    label: 'Circadian Light Alignment',
                    description: 'Deep loggia embrasures shield harsh solar glare while harvesting warm twilight flares.',
                },
                {
                    label: 'Absolute Acoustic Stillness',
                    description: 'Acoustic decoupling isolates patron chambers from all external marine vibrations.',
                },
            ],
            heroImageUrl: '/garden-pavillion.png',
            heroImageAlt: 'Ultra-luxury cliffside hotel private sanctuary interior with floor-to-ceiling glass doors opening onto an expansive infinity terrace overlooking the Mediterranean sea and Positano cliffs',
            actionLabel: 'INSPECT CLIMATE BLUEPRINT',
            actionHref: '#sensory-blueprints',
            architecturalAnnotation: 'FIG 1.2 — SUBTERRANEAN THERMAL & ACOUSTIC BARRIER',
        },
        {
            pillarNumber: '03',
            romanNumeral: 'PILLAR III',
            tagline: 'PERMANENT CONCORD',
            title: 'The Sovereign Patron Charter & Discretion',
            provenanceEssay:
                'Our spaces reject the ephemeral clutter of modern commercial hospitality. Within Aurelia, you will discover zero brand signage, zero plastic or synthetic textiles, and zero transactional check-in desks. Patron residence is orchestrated with diplomatic grace by a dedicated personal majordomo who oversees private dock rendezvous and unhurried suite staging.',
            materialsBadge: 'DIPLOMATIC IMMUNITY • ZERO INVASIVE SIGNAGE • BESPOKE PROTOCOL',
            peculiarities: [
                {
                    label: 'Harbor Gate Reception',
                    description: 'Boarding and disembarkation via private wooden Riva tender slipways directly into the enclave.',
                },
                {
                    label: '24/7 Dedicated Majordomo',
                    description: 'Trained in private state service, managing in-suite culinary service and cellar releases.',
                },
                {
                    label: 'Discreet Sovereign Ledger',
                    description: 'Cryptographically secured patron records with absolute third-party non-disclosure.',
                },
            ],
            heroImageUrl: '/garden-pavillion.png',
            heroImageAlt: 'Editorial portrait of an Italian personal majordomo and concierge manager in a bespoke charcoal tailored suit, warm Mediterranean courtyard background, poised, welcoming, discreet luxury hospitality',
            actionLabel: 'READ THE SOVEREIGN CHARTER',
            actionHref: '#sovereign-charter',
            architecturalAnnotation: 'FIG 1.3 — DISCREET RESIDENTIAL PROTOCOL & MAJORDOMO DESK',
        },
    ],
};

export interface HeritageCraftsmanshipPillarsSectionProps {
    data?: HeritageCraftsmanshipPillarsData;
    onSelectPillarAction?: (pillarNumber: string) => void;
    className?: string;
}

export function HeritageCraftsmanshipPillarsSection({
    data = heritagePillarsDefaultData,
    onSelectPillarAction,
    className = '',
}: HeritageCraftsmanshipPillarsSectionProps) {
    const { eyebrow, heading, description, charterNotice, pillars } = data;

    return (
        <section
            id="craftsmanship-pillars"
            className={`w-full max-w-340 mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24 text-[#1f1e1d] ${className}`}
        >
            {/* 1. Section Editorial Monograph Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 sm:pb-12 border-b border-[#e8e4dc] mb-12 sm:mb-16">
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
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 -full bg-[#f6f2ea] border border-[#ded9ce] text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b] shadow-2xs">
                        <span className="w-1.5 h-1.5 -full bg-[#8e763b] animate-pulse" />
                        <span>{charterNotice}</span>
                    </span>
                </div>
            </div>

            {/* 2. Three Pillars Detailed Alternating Bento Grid */}
            <div className="space-y-12 sm:space-y-16">
                {pillars.map(function (pillar, idx) {
                    const isEven = idx % 2 === 1;

                    return (
                        <article
                            key={pillar.pillarNumber}
                            className="bg-white border border-[#e8e4dc] -lg overflow-hidden shadow-[0_4px_24px_rgba(31,30,29,0.03)] hover:shadow-[0_16px_40px_rgba(31,30,29,0.07)] hover:border-[#8e763b]/40 transition-all duration-500"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                                {/* Photographic Visual Column (5 Columns on Desktop) */}
                                <div
                                    className={`relative min-h-85 sm:min-h-105 lg:min-h-full overflow-hidden bg-[#eeeae2] group lg:col-span-5 ${
                                        isEven ? 'lg:order-2' : 'lg:order-1'
                                    }`}
                                >
                                    <Image
                                        src={pillar.heroImageUrl}
                                        alt={pillar.heroImageAlt}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 42vw"
                                        className="object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                                    {/* Top Left Pillar Number Badge */}
                                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                                        <span className="px-3 py-1 -sm bg-black/60 backdrop-blur-md text-white font-sans text-[10px] font-semibold uppercase tracking-[0.22em] shadow-sm">
                                            {pillar.romanNumeral}
                                        </span>
                                        <span className="px-2.5 py-1 -sm bg-[#8e763b] text-white font-sans text-[9px] font-semibold uppercase tracking-[0.18em] shadow-sm">
                                            {pillar.tagline}
                                        </span>
                                    </div>

                                    {/* Bottom Blueprint Figure Annotation */}
                                    <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                                        <span className="text-[9px] font-mono tracking-widest text-[#dcdad5] uppercase block drop-shadow-sm">
                                            {pillar.architecturalAnnotation}
                                        </span>
                                    </div>
                                </div>

                                {/* Narrative & Craftsmanship Metrics Column (7 Columns on Desktop) */}
                                <div
                                    className={`p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8 bg-[#fcf9f4] lg:col-span-7 ${
                                        isEven ? 'lg:order-1' : 'lg:order-2'
                                    }`}
                                >
                                    <div>
                                        {/* Material Badge */}
                                        <div className="inline-flex items-center gap-2 pb-3 mb-4 border-b border-[#eeeae2] w-full">
                                            <span className="w-1.5 h-1.5 -full bg-[#8e763b]" />
                                            <span className="text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e763b]">
                                                {pillar.materialsBadge}
                                            </span>
                                        </div>

                                        {/* Master Serif Headline */}
                                        <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#1f1e1d] tracking-tight leading-[1.14]">
                                            {pillar.title}
                                        </h3>

                                        {/* Editorial Provenance Essay */}
                                        <p className="mt-4 text-xs sm:text-[13px] md:text-sm text-[#5f5c56] font-sans font-light leading-relaxed">
                                            {pillar.provenanceEssay}
                                        </p>

                                        {/* 3 Material & Sensory Peculiarities Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-8 pt-6 border-t border-[#eeeae2]">
                                            {pillar.peculiarities.map(function (pec, idx) {
                                                return (
                                                    <div
                                                        key={idx}
                                                        className="p-3.5 sm:p-4 -2xl bg-white border border-[#ded9ce] shadow-2xs flex flex-col justify-between space-y-2 hover:border-[#8e763b]/60 transition-colors"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-1 h-1 -full bg-[#8e763b]" />
                                                            <span className="font-serif text-xs font-semibold text-[#1f1e1d] tracking-tight">
                                                                {pec.label}
                                                            </span>
                                                        </div>
                                                        <p className="text-[10px] text-[#78756d] font-sans font-light leading-snug">
                                                            {pec.description}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Action Link Footer */}
                                    <div className="pt-6 border-t border-[#eeeae2] flex items-center justify-between">
                                        <Link
                                            href={pillar.actionHref}
                                            onClick={function () {
                                                if (onSelectPillarAction) {
                                                    onSelectPillarAction(pillar.pillarNumber);
                                                }
                                            }}
                                            className="group inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e763b] hover:text-[#1f1e1d] transition-colors py-1"
                                        >
                                            <span>{pillar.actionLabel}</span>
                                            <span className="text-sm font-normal transform transition-transform duration-300 group-hover:translate-x-1.5">
                                                →
                                            </span>
                                        </Link>

                                        <span className="text-[9px] font-mono tracking-wider text-[#a4a098] uppercase">
                                            SEC. {pillar.pillarNumber} / 03
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}