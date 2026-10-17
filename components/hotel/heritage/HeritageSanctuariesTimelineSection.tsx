'use client';

import { useState } from 'react';
import Image from 'next/image';

export interface SanctuaryChronologyMilestone {
    id: string;
    sequenceNumber: string;
    year: string;
    statusBadge: string;
    enclaveName: string;
    locationSub: string;
    materialsHighlight: string;
    description: string;
    unitsCountLabel: string;
    elevation: string;
    coordinatesDisplay: string;
    imageUrl: string;
    imageAlt: string;
    isPrimaryFlagship?: boolean;
}

export interface FlagshipCartographyData {
    badge: string;
    headline: string;
    geographicCoordinates: string;
    elevationAboveSeaLevel: string;
    nauticalAccessNotice: string;
    heliportClearanceNotice: string;
    territorialProvenance: string[];
    technicalSpecifications: Array<{
        label: string;
        value: string;
    }>;
}

export interface HeritageTimelineSectionData {
    eyebrow: string;
    heading: string;
    description: string;
    archiveLedgerNotice: string;
    milestones: SanctuaryChronologyMilestone[];
    cartography: FlagshipCartographyData;
}

export const heritageTimelineDefaultData: HeritageTimelineSectionData = {
    eyebrow: 'GEOLOGICAL CARTOGRAPHY & CHRONOLOGY',
    heading: 'The Sovereign Sanctuaries Timeline',
    description:
        'From our inaugural cliffside extraction in Positano to alpine granite sanctuaries in Engadin and cedar onsen pavillons in Kyoto, each enclave represents an unbroken dialogue with ancient terroir.',
    archiveLedgerNotice: 'CONFIDENTIAL ARCHIVES • REGISTERED UNDER MONOLITHIC CHARTER PROTOCOL',
    milestones: [
        {
            id: 'positano-flagship',
            sequenceNumber: '01',
            year: '2021',
            statusBadge: 'FLAGSHIP MONOLITH • ACTIVE',
            enclaveName: 'Sanctuary Positano',
            locationSub: 'Amalfi Coastline • Tyrrhenian Sea • Italy',
            materialsHighlight: 'TIVOLI TRAVERTINE • RECLAIMED CEDAR • BASALT GROTTOS',
            description:
                'Eighteen sovereign patron chambers carved directly into living sea-cliffs 200 meters above the Mediterranean surf. Features subterranean hydrothermal convection and zero acoustic friction.',
            unitsCountLabel: '18 SUITES & SEA PAVILION',
            elevation: '+214 M LEVEL IV',
            coordinatesDisplay: '40°37\'40.2"N • 14°29\'05.4"E',
            imageUrl: '/garden-pavillion.png',
            imageAlt: 'Monolithic limestone architecture of Aurelia Sanctuary Positano overlooking the Tyrrhenian Sea at sunset',
            isPrimaryFlagship: true,
        },
        {
            id: 'kyoto-higashiyama',
            sequenceNumber: '02',
            year: '2023',
            statusBadge: 'ACTIVE SANCTUARY',
            enclaveName: 'Higashiyama Pavilions',
            locationSub: 'Kyoto Foothills • Historic Higashiyama • Japan',
            materialsHighlight: 'YOSHINO CEDAR • TAMBA STONE • MINERAL ONSEN VEINS',
            description:
                'Twelve secluded timber and Tamba river-stone residences nestled within private bamboo groves, centered around an ancient volcanic geothermal hot spring circuit.',
            unitsCountLabel: '12 ONSEN PAVILIONS',
            elevation: '+142 M FOOTHILL RIDGE',
            coordinatesDisplay: '34°59\'52.1"N • 135°46\'44.8"E',
            imageUrl: '/garden-pavillion.png',
            imageAlt: 'Minimalist Japanese-Mediterranean wooden cedar pavilion and serene mineral onsen grotto',
        },
        {
            id: 'engadin-alpine',
            sequenceNumber: '03',
            year: '2024',
            statusBadge: 'ACTIVE SANCTUARY',
            enclaveName: 'Engadin Alpine Refuge',
            locationSub: 'Upper Engadin Valley • St. Moritz • Switzerland',
            materialsHighlight: 'AROLLA PINE • ANDEER GRANITE • THERMAL STEAM CAVES',
            description:
                'Fourteen monolithic granite and larch lodges suspended over pristine alpine glacier moraines, featuring hand-carved stone caldariums and sub-zero cryogenic plunge grottos.',
            unitsCountLabel: '14 ALPINE SUITES',
            elevation: '+1,822 M GLACIER SUMMIT',
            coordinatesDisplay: '46°29\'50.3"N • 09°50\'18.7"E',
            imageUrl: '/garden-pavillion.png',
            imageAlt: 'Ultra-luxury monolithic mountain suite interior with floor-to-ceiling glass framing majestic snowy peaks',
        },
        {
            id: 'menorca-finca',
            sequenceNumber: '04',
            year: '2025',
            statusBadge: 'INSCRIPTION OPEN • AUTUMN 2025',
            enclaveName: 'Menorca Maritime Finca',
            locationSub: 'Camí de Cavalls • Balearic Archipelago • Spain',
            materialsHighlight: 'MARÉS LIMESTONE • WILD OLIVE TIMBER • BIO-RESERVE CISTERNS',
            description:
                'Sixteen sea-cave suites and private harbor moorings integrated into a protected UNESCO Biosphere Reserve. Inscription for inaugural patron residencies currently open.',
            unitsCountLabel: '16 SEA-CAVE RESIDENCES',
            elevation: '+48 M COASTAL CLIFF',
            coordinatesDisplay: '39°58\'12.6"N • 04°05\'22.1"E',
            imageUrl: '/garden-pavillion.png',
            imageAlt: 'Mediterranean coastal stone estate with private infinity plunge pool and limestone sun deck overlooking the sea',
        },
    ],
    cartography: {
        badge: 'FLAGSHIP GEOGRAPHICAL MONOGRAPH',
        headline: 'Positano Coastal Topography & Maritime Access',
        geographicCoordinates: '40°37\'40.2"N • 14°29\'05.4"E',
        elevationAboveSeaLevel: '214.5 METERS • SHEER LIMESTONE PRECIPICE',
        nauticalAccessNotice: 'Direct private wooden Riva tender slipway berth with 4.5m draft clearance.',
        heliportClearanceNotice: 'Coordinated sovereign helicopter rendezvous via private Amalfi coastal pad.',
        territorialProvenance: [
            'Extracted from continuous stratum of Apennine Mesozoic dolomitic limestone',
            'Subterranean conduit connection to volcanic hydrothermal veins at 34.2°C',
            'Naturally sheltered from northern winds by Monte San Michele mountain wall',
            'Direct maritime maritime corridor to Capri Faraglioni (11.2 nautical miles)',
        ],
        technicalSpecifications: [
            { label: 'Latitude / Longitude', value: '40°37\'40.2"N • 14°29\'05.4"E' },
            { label: 'Bedrock Density', value: '2.68 g/cm³ Tivoli Limestone' },
            { label: 'Acoustic Barrier', value: '0 dB Ambient Decoupling' },
            { label: 'Maritime Distance', value: '11.2 NM to Capri Sea Stacks' },
        ],
    },
};

export interface HeritageSanctuariesTimelineSectionProps {
    data?: HeritageTimelineSectionData;
    onSelectSanctuary?: (sanctuaryId: string) => void;
    className?: string;
}

export function HeritageSanctuariesTimelineSection({
    data = heritageTimelineDefaultData,
    onSelectSanctuary,
    className = '',
}: HeritageSanctuariesTimelineSectionProps) {
    const {
        eyebrow,
        heading,
        description,
        archiveLedgerNotice,
        milestones,
        cartography,
    } = data;

    const [activeSanctuaryId, setActiveSanctuaryId] = useState<string>(
        milestones[0]?.id || 'positano-flagship'
    );

    const handleSanctuaryClick = (sanctuaryId: string) => {
        setActiveSanctuaryId(sanctuaryId);
        if (onSelectSanctuary) {
            onSelectSanctuary(sanctuaryId);
        }
    };

    const activeMilestone =
        milestones.find((m) => m.id === activeSanctuaryId) || milestones[0];

    return (
        <section
            id="sanctuaries-timeline"
            className={`w-full max-w-340 mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24 text-[#1f1e1d] space-y-16 sm:space-y-20 ${className}`}
        >
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
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b] animate-pulse" />
                        <span>{archiveLedgerNotice}</span>
                    </span>
                </div>
            </div>

            {/* 2. CHRONOLOGICAL MILESTONES SELECTOR RAIL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {milestones.map(function (milestone) {
                    const isSelected = activeSanctuaryId === milestone.id;

                    return (
                        <div
                            key={milestone.id}
                            onClick={function () {
                                handleSanctuaryClick(milestone.id);
                            }}
                            className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 ${
                                isSelected
                                    ? 'bg-[#191817] text-[#fcf9f4] border-[#383530] shadow-xl scale-[1.01]'
                                    : 'bg-white border-[#e8e4dc] text-[#1f1e1d] hover:border-[#8e763b]/60 shadow-2xs'
                            }`}
                        >
                            <div className="space-y-3">
                                <div className="flex items-center justify-between pb-3 border-b border-current/15">
                                    <span
                                        className={`font-mono text-xs font-semibold ${
                                            isSelected ? 'text-[#bfa76f]' : 'text-[#8e763b]'
                                        }`}
                                    >
                                        SEQ. {milestone.sequenceNumber}
                                    </span>
                                    <span
                                        className={`text-[9px] font-sans font-bold uppercase tracking-[0.2em] ${
                                            isSelected ? 'text-white/80' : 'text-[#78756d]'
                                        }`}
                                    >
                                        ANNO {milestone.year}
                                    </span>
                                </div>

                                <h3 className="font-serif text-xl sm:text-2xl font-normal tracking-tight">
                                    {milestone.enclaveName}
                                </h3>

                                <p
                                    className={`text-[11px] font-sans font-light leading-relaxed ${
                                        isSelected ? 'text-[#dcdad5]' : 'text-[#6e6b64]'
                                    }`}
                                >
                                    {milestone.locationSub}
                                </p>
                            </div>

                            <div className="pt-3 border-t border-current/15 flex items-center justify-between text-[10px] font-sans uppercase tracking-wider">
                                <span
                                    className={
                                        isSelected ? 'text-[#bfa76f]' : 'text-[#8e763b]'
                                    }
                                >
                                    {milestone.unitsCountLabel}
                                </span>
                                <span
                                    className={
                                        isSelected ? 'text-white/60' : 'text-[#a4a098]'
                                    }
                                >
                                    {milestone.elevation}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 3. ACTIVE SANCTUARY ARCHITECTURAL DOSSIER SPOTLIGHT */}
            <article className="bg-white border border-[#e8e4dc] rounded-lg overflow-hidden shadow-[0_4px_24px_rgba(31,30,29,0.03)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    {/* Visual Photographic Column (7 cols) */}
                    <div className="lg:col-span-7 relative min-h-95 sm:min-h-115 lg:min-h-full overflow-hidden bg-[#eeeae2] group">
                        <Image
                            src={activeMilestone.imageUrl}
                            alt={activeMilestone.imageAlt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 58vw"
                            className="object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
                            <span className="px-3 py-1 rounded-sm bg-black/60 backdrop-blur-md text-white font-sans text-[10px] font-semibold uppercase tracking-[0.22em] shadow-sm">
                                {activeMilestone.year} ARCHIVE
                            </span>
                            <span className="px-2.5 py-1 rounded-sm bg-[#8e763b] text-white font-sans text-[9px] font-semibold uppercase tracking-[0.18em] shadow-sm">
                                {activeMilestone.statusBadge}
                            </span>
                        </div>

                        {/* Bottom Image Overlay Caption */}
                        <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                            <span className="text-[10px] font-mono tracking-widest text-[#dcdad5] uppercase block mb-1">
                                {activeMilestone.coordinatesDisplay}
                            </span>
                            <h4 className="font-serif text-xl sm:text-2xl font-light text-white/95 tracking-tight">
                                {activeMilestone.enclaveName} • {activeMilestone.elevation}
                            </h4>
                        </div>
                    </div>

                    {/* Detailed Monograph Narrative Column (5 cols) */}
                    <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8 bg-[#fcf9f4]">
                        <div>
                            {/* Materials Eyebrow */}
                            <div className="inline-flex items-center gap-2 pb-3 mb-4 border-b border-[#eeeae2] w-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b]" />
                                <span className="text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e763b]">
                                    {activeMilestone.materialsHighlight}
                                </span>
                            </div>

                            {/* Headline */}
                            <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#1f1e1d] tracking-tight leading-[1.14]">
                                {activeMilestone.enclaveName}
                            </h3>

                            <p className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#78756d] mt-1 mb-4">
                                {activeMilestone.locationSub}
                            </p>

                            {/* Essay Body */}
                            <p className="text-xs sm:text-[13px] text-[#5f5c56] font-sans font-light leading-relaxed">
                                {activeMilestone.description}
                            </p>

                            {/* Spatial Specifications Strip */}
                            <div className="grid grid-cols-2 gap-3.5 mt-8 pt-6 border-t border-[#eeeae2]">
                                <div className="p-3.5 rounded-xl bg-white border border-[#ded9ce] shadow-2xs">
                                    <span className="text-[9px] uppercase tracking-wider text-[#8e8a82] block">
                                        CAPACITY & ALLOCATION
                                    </span>
                                    <span className="font-serif text-sm font-semibold text-[#1f1e1d] block mt-0.5">
                                        {activeMilestone.unitsCountLabel}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-white border border-[#ded9ce] shadow-2xs">
                                    <span className="text-[9px] uppercase tracking-wider text-[#8e8a82] block">
                                        GEOLOGICAL ELEVATION
                                    </span>
                                    <span className="font-serif text-sm font-semibold text-[#1f1e1d] block mt-0.5">
                                        {activeMilestone.elevation}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Monograph Inspection Action */}
                        <div className="pt-6 border-t border-[#eeeae2] flex items-center justify-between">
                            <span className="text-[10px] font-mono tracking-wider text-[#a4a098] uppercase">
                                ARCHIVE DOSSIER REF: AUR-{activeMilestone.year}
                            </span>

                            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b]">
                                <span>INSCRIBED IN CHARTER</span>
                                <span>✓</span>
                            </span>
                        </div>
                    </div>
                </div>
            </article>

            {/* 4. POSITANO TOPOGRAPHIC CARTOGRAPHY CARD */}
            <div className="bg-[#191817] text-[#fcf9f4] border border-[#34322e] rounded-lg p-8 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
                {/* Subtle Coordinate Grid Texture */}
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, #bfa76f 1px, transparent 1px), linear-gradient(to bottom, #bfa76f 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Monograph Column (7 cols) */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.24em] text-[#bfa76f]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#bfa76f] animate-pulse" />
                            <span>{cartography.badge}</span>
                        </div>

                        <h3 className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-normal text-white tracking-tight leading-[1.14]">
                            {cartography.headline}
                        </h3>

                        {/* 4 Provenance Geo Notes Checklist */}
                        <div className="space-y-3 pt-2">
                            {cartography.territorialProvenance.map(function (note, idx) {
                                return (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-3 text-xs font-sans text-[#dcdad5]"
                                    >
                                        <svg
                                            className="w-4 h-4 text-[#bfa76f] shrink-0 mt-0.5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span className="font-light leading-relaxed">
                                            {note}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Maritime & Helipad Advisory Notes */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 border-t border-white/10 text-[11px] font-sans text-[#a4a098]">
                            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                                <span className="text-[9px] uppercase tracking-wider text-[#bfa76f] font-semibold block mb-1">
                                    NAUTICAL SLIPWAY BERTH
                                </span>
                                <p className="leading-relaxed font-light">
                                    {cartography.nauticalAccessNotice}
                                </p>
                            </div>

                            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                                <span className="text-[9px] uppercase tracking-wider text-[#bfa76f] font-semibold block mb-1">
                                    AMALFI COAST HELIPAD
                                </span>
                                <p className="leading-relaxed font-light">
                                    {cartography.heliportClearanceNotice}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Cartographic Matrix Data Card (5 cols) */}
                    <div className="lg:col-span-5 bg-[#22201e] border border-[#3e3a35] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                        <div className="border-b border-white/10 pb-4">
                            <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.22em] text-[#bfa76f] block mb-1">
                                GEODETIC SPECIFICATION
                            </span>
                            <span className="font-mono text-xl sm:text-2xl text-white block">
                                {cartography.geographicCoordinates}
                            </span>
                            <span className="text-[10px] text-[#8e8a82] font-sans mt-0.5 block">
                                {cartography.elevationAboveSeaLevel}
                            </span>
                        </div>

                        {/* 4 Technical Specifications Rows */}
                        <div className="space-y-3.5 text-xs font-sans">
                            {cartography.technicalSpecifications.map(function (spec, idx) {
                                return (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between pb-2 border-b border-white/5"
                                    >
                                        <span className="text-[#a4a098] font-light">
                                            {spec.label}
                                        </span>
                                        <span className="font-mono text-[#fcf9f4] font-medium">
                                            {spec.value}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="pt-2 text-center">
                            <span className="inline-block text-[9px] font-sans font-semibold uppercase tracking-[0.24em] text-[#bfa76f]">
                                RATIFIED BY STUDIO AURELIA CONSERVATION GUILD
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}