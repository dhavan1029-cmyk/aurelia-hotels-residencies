'use client';

import { useState } from 'react';
import Image from 'next/image';

export interface PillowConfiguration {
    id: string;
    position: 'LEFT' | 'RIGHT' | 'ACCENT';
    name: string;
    loft: string;
    fillingDescription: string;
    casingMaterial: string;
}

export interface CircadianAutomationToggle {
    id: string;
    title: string;
    subtitle: string;
    enabled: boolean;
    specNote: string;
}

export interface EpicureanProvisionsItem {
    id: string;
    categoryTag: string;
    title: string;
    provenance: string;
    serviceProtocol: string;
    temperatureOrTimingDisplay: string;
    iconType: 'cellar' | 'water' | 'coffee';
    isCustomizable?: boolean;
}

export interface ProfileSleepAndEpicureanData {
    // Section 02
    section2Number: string;
    section2Eyebrow: string;
    section2StatusBadge: string;
    section2Heading: string;
    section2Description: string;
    heroBedroomImageUrl: string;
    heroBedroomImageAlt: string;
    acousticIsolationNotice: string;
    initialTargetTemperatureCelsius: number;
    pillows: PillowConfiguration[];
    circadianAutomations: CircadianAutomationToggle[];

    // Section 03
    section3Number: string;
    section3Eyebrow: string;
    section3StatusBadge: string;
    section3Heading: string;
    section3Description: string;
    epicureanItems: EpicureanProvisionsItem[];
    cellarConciergeNotice: string;
}

export const profileSleepDefaultData: ProfileSleepAndEpicureanData = {
    section2Number: '02',
    section2Eyebrow: 'NOCTURNAL MICROCLIMATE & BIO-RHYTHMS',
    section2StatusBadge: 'CIRCADIAN AUTOMATION ACTIVE',
    section2Heading: 'Circadian Sleep Architecture',
    section2Description:
        'Aurelia sleeping chambers are acoustically decoupled from marine vibrations and engineered with silent geothermal cooling to cultivate profound restorative delta-wave sleep.',
    heroBedroomImageUrl: '/suite-402.png',
    heroBedroomImageAlt:
        'Luxury Mediterranean hotel suite bedroom, soft morning light filtering through sheer linen curtains, unbleached linen bed, calm minimalist travertine aesthetics',
    acousticIsolationNotice:
        'Acoustically dampened at under 14dB ambient noise. French washed organic flax dressed over hypoallergenic Siberian goose down core.',
    initialTargetTemperatureCelsius: 19.5,
    pillows: [
        {
            id: 'pillow-left',
            position: 'LEFT',
            name: 'Siberian White Goose Down',
            loft: 'Ultra-Soft 850 Fill Power',
            fillingDescription: '100% ethically sourced Arctic goose down, dual-chamber baffle.',
            casingMaterial: '400TC Egyptian Giza Cotton Batiste',
        },
        {
            id: 'pillow-right',
            position: 'RIGHT',
            name: 'Organic Buckwheat & Silk Hull',
            loft: 'Anatomical Cervical Contour',
            fillingDescription: 'Organic roasted buckwheat hulls offering rigid cervical alignment.',
            casingMaterial: 'Raw Mulberry Silk & Unbleached Flax',
        },
    ],
    circadianAutomations: [
        {
            id: 'full-blackout',
            title: 'Automated Travertine Louver Blackout',
            subtitle: '100% optical seal at 22:30 CET',
            enabled: true,
            specNote: 'Silent motorized stone embrasures decouple moonlight & marine glow',
        },
        {
            id: 'dawn-awakening',
            title: 'Diurnal Amber Dawn Awaken Sequence',
            subtitle: '30-minute progressive spectrum starting 07:15 CET',
            enabled: true,
            specNote: 'Gradually shifts from 1800K candlelight to 3200K morning sunshine',
        },
    ],

    section3Number: '03',
    section3Eyebrow: 'CELLAR & BOTANICAL PROVISIONS',
    section3StatusBadge: 'CHEF SOMMELIER STAGING',
    section3Heading: 'In-Suite Epicurean Staging',
    section3Description:
        'Pre-arrival sommelier allocations and morning awakening rituals prepared by your personal majordomo prior to entering your sanctuary.',
    epicureanItems: [
        {
            id: 'arrival-vintage-ornellaia',
            categoryTag: 'ARRIVAL CELLAR ALLOCATION',
            title: '2016 Tenuta dell\'Ornellaia Bolgheri Superiore',
            provenance: 'Tuscan Coast • Cellar Vault Reserve #AUR-2016-ORN',
            serviceProtocol:
                'Decanted into mouth-blown Riedel Amadeo decanter precisely 90 minutes prior to coordinates arrival. Served at cellar equilibrium.',
            temperatureOrTimingDisplay: '16.5°C • DECANTED 90M PRIOR',
            iconType: 'cellar',
            isCustomizable: true,
        },
        {
            id: 'hydration-library',
            categoryTag: 'PURIFIED MINERAL WATER RESERVE',
            title: 'Suntory Minami-Alps Glacial & Lurisia Stille',
            provenance: 'Japanese Alps Snowmelt & Maritime Piedmont Springs',
            serviceProtocol:
                'Chilled in suite sub-zero stone credenza alongside organic Calabrian bergamot slices and sea-mineral electrolyte infusions.',
            temperatureOrTimingDisplay: '7.0°C • GLACIAL SERVE',
            iconType: 'water',
            isCustomizable: false,
        },
        {
            id: 'awakening-barista',
            categoryTag: 'MAJORDOMO MORNING BARISTA',
            title: 'Panama Geisha Natural Lot #04',
            provenance: 'Hacienda La Esmeralda • Micro-Lot Single Origin',
            serviceProtocol:
                'Manual V60 ceramic pour-over served quietly on your clifftop oceanfront loggia with warm organic oat emulsion.',
            temperatureOrTimingDisplay: '08:30 CET • PRIVATE LOGGIA',
            iconType: 'coffee',
            isCustomizable: true,
        },
    ],
    cellarConciergeNotice:
        'Subterranean volcanic cellar containing 1,850 cataloged crus is available for private patron allocation through Senior Sommelier Matteo Bellini.',
};

export interface ProfileSleepAndEpicureanSectionProps {
    data?: ProfileSleepAndEpicureanData;
    className?: string;
    onUpdateSleepTemperature?: (tempCelsius: number) => void;
    onToggleCircadianAutomation?: (automationId: string, enabled: boolean) => void;
    onCustomizeEpicureanItem?: (itemId: string) => void;
}

export function ProfileSleepAndEpicureanSection({
    data = profileSleepDefaultData,
    className = '',
    onUpdateSleepTemperature,
    onToggleCircadianAutomation,
    onCustomizeEpicureanItem,
}: ProfileSleepAndEpicureanSectionProps) {
    const {
        section2Number,
        section2Eyebrow,
        section2StatusBadge,
        section2Heading,
        section2Description,
        heroBedroomImageUrl,
        heroBedroomImageAlt,
        acousticIsolationNotice,
        initialTargetTemperatureCelsius,
        pillows,
        circadianAutomations,
        section3Number,
        section3Eyebrow,
        section3StatusBadge,
        section3Heading,
        section3Description,
        epicureanItems,
        cellarConciergeNotice,
    } = data;

    // Local State
    const [sleepTemp, setSleepTemp] = useState<number>(initialTargetTemperatureCelsius);
    const [automations, setAutomations] = useState(circadianAutomations);

    function handleTempChange(delta: number) {
        const nextTemp = Math.round((sleepTemp + delta) * 10) / 10;
        if (nextTemp >= 16.0 && nextTemp <= 23.0) {
            setSleepTemp(nextTemp);
            if (onUpdateSleepTemperature) {
                onUpdateSleepTemperature(nextTemp);
            }
        }
    }

    function handleToggleAutomation(id: string) {
        const nextAutomations = automations.map(function (item) {
            if (item.id === id) {
                const nextState = !item.enabled;
                if (onToggleCircadianAutomation) {
                    onToggleCircadianAutomation(id, nextState);
                }
                return { ...item, enabled: nextState };
            }
            return item;
        });
        setAutomations(nextAutomations);
    }

    function renderEpicureanIcon(type: EpicureanProvisionsItem['iconType']) {
        switch (type) {
            case 'cellar':
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
                        <path d="M8 22h8" />
                        <path d="M12 11v11" />
                        <path d="M19 3l-7 8-7-8h14z" />
                    </svg>
                );
            case 'water':
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
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                );
            case 'coffee':
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
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                        <line x1="6" y1="1" x2="6" y2="4" />
                        <line x1="10" y1="1" x2="10" y2="4" />
                        <line x1="14" y1="1" x2="14" y2="4" />
                    </svg>
                );
            default:
                return null;
        }
    }

    return (
        <div className={`space-y-10 lg:space-y-12 ${className}`}>
            {/* ============================================================= */}
            {/* SECTION 02: CIRCADIAN SLEEP ARCHITECTURE                      */}
            {/* ============================================================= */}
            <section
                id="sleep-architecture"
                className="w-full bg-[#fcf9f4] border border-[#e8e4dc] rounded-3xl p-6 sm:p-9 lg:p-11 shadow-[0_4px_24px_rgba(31,30,29,0.03)] space-y-8 lg:space-y-10"
            >
                {/* 1. Header & Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#eeeae2]">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#1f1e1d] text-white flex items-center justify-center font-mono text-[10px] font-semibold">
                                {section2Number}
                            </span>
                            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.24em] text-[#8e763b]">
                                {section2Eyebrow}
                            </span>
                        </div>

                        <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#1f1e1d] tracking-tight leading-[1.12]">
                            {section2Heading}
                        </h2>

                        <p className="text-xs sm:text-[13px] text-[#636058] font-sans font-light leading-relaxed max-w-2xl">
                            {section2Description}
                        </p>
                    </div>

                    <div className="self-start sm:self-auto shrink-0">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f6f2ea] border border-[#ded9ce] text-[9px] font-mono uppercase tracking-[0.2em] text-[#24633b] shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>{section2StatusBadge}</span>
                        </span>
                    </div>
                </div>

                {/* 2. Photographic Bedroom Showcase & Acoustic Monograph */}
                <article className="relative w-full rounded-2xl overflow-hidden border border-[#ded9ce] bg-[#191817] shadow-lg group">
                    <div className="relative aspect-video sm:aspect-21/9 w-full overflow-hidden">
                        <Image
                            src={heroBedroomImageUrl}
                            alt={heroBedroomImageAlt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 65vw"
                            className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
                            <span className="px-3 py-1 rounded-sm bg-black/60 backdrop-blur-md text-white text-[9px] font-mono uppercase tracking-[0.2em]">
                                ACOUSTIC DECOUPLING: &lt; 14 dB
                            </span>
                            <span className="px-2.5 py-1 rounded-sm bg-[#8e763b] text-white text-[9px] font-sans font-semibold uppercase tracking-[0.18em]">
                                GEOTHERMAL RADIANT CHILL
                            </span>
                        </div>

                        {/* Bottom Overlay Narrative */}
                        <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-1">
                            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#bfa76f] block">
                                NOCTURNAL ENVIRONMENT CALIBRATION
                            </span>
                            <p className="font-serif italic text-xs sm:text-sm font-light text-white/95 leading-relaxed max-w-2xl">
                                {acousticIsolationNotice}
                            </p>
                        </div>
                    </div>
                </article>

                {/* 3. Microclimate Temperature Stepper & Pillow Architecture */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Temperature Stepper (5 cols) */}
                    <div className="lg:col-span-5 bg-[#f6f2ea] border border-[#ded9ce] rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-2xs">
                        <div className="space-y-1">
                            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e763b] block">
                                TARGET SLEEP AMBIENT
                            </span>
                            <h4 className="font-serif text-lg font-normal text-[#1f1e1d] tracking-tight">
                                Geothermal Radiant Sleep Climate
                            </h4>
                            <p className="text-[11px] text-[#6e6b64] font-sans font-light leading-snug">
                                Subterranean water coils maintain steady temperature without acoustic air hum.
                            </p>
                        </div>

                        <div className="bg-white border border-[#ded9ce] rounded-xl p-4 flex items-center justify-between shadow-2xs">
                            <div className="flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-[#f6f2ea] border border-[#ded9ce] text-[#8e763b]">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
                                    </svg>
                                </span>
                                <div>
                                    <span className="font-serif text-2xl font-bold text-[#1f1e1d] block leading-none">
                                        {sleepTemp.toFixed(1)}°C
                                    </span>
                                    <span className="text-[9px] font-mono text-[#8e8a82] uppercase tracking-wider block mt-1">
                                        {(sleepTemp * 1.8 + 32).toFixed(1)}°F EQUIVALENT
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={function () {
                                        handleTempChange(-0.5);
                                    }}
                                    className="w-8 h-8 rounded-lg bg-[#f6f2ea] hover:bg-[#eeeae2] border border-[#ded9ce] text-[#1f1e1d] flex items-center justify-center font-mono text-base font-semibold transition-colors"
                                    aria-label="Decrease Sleep Temperature"
                                >
                                    −
                                </button>
                                <button
                                    type="button"
                                    onClick={function () {
                                        handleTempChange(0.5);
                                    }}
                                    className="w-8 h-8 rounded-lg bg-[#f6f2ea] hover:bg-[#eeeae2] border border-[#ded9ce] text-[#1f1e1d] flex items-center justify-center font-mono text-base font-semibold transition-colors"
                                    aria-label="Increase Sleep Temperature"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Pillow Architecture Dual Ensemble (7 cols) */}
                    <div className="lg:col-span-7 bg-white border border-[#ded9ce] rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs">
                        <div className="flex items-center justify-between pb-2 border-b border-[#eeeae2]">
                            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e763b] block">
                                BESPOKE PILLOW ENSEMBLE
                            </span>
                            <span className="text-[10px] font-mono text-[#8e8a82] uppercase">
                                MATTRESS: NATURAL LATEX & COIR
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {pillows.map(function (pillow) {
                                return (
                                    <div
                                        key={pillow.id}
                                        className="p-3.5 rounded-xl bg-[#faf8f5] border border-[#ded9ce] space-y-1.5 shadow-2xs"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="px-2 py-0.5 rounded-xs bg-[#1f1e1d] text-white text-[8px] font-mono uppercase tracking-wider">
                                                {pillow.position} CHAMBER
                                            </span>
                                            <span className="text-[9px] font-sans text-[#8e763b] font-semibold">
                                                {pillow.loft}
                                            </span>
                                        </div>

                                        <h5 className="font-serif text-sm font-semibold text-[#1f1e1d] tracking-tight">
                                            {pillow.name}
                                        </h5>

                                        <p className="text-[10.5px] font-sans text-[#6e6b64] font-light leading-snug">
                                            {pillow.fillingDescription}
                                        </p>

                                        <div className="pt-1.5 border-t border-[#ded9ce] text-[9px] font-mono text-[#8e8a82]">
                                            CASING: {pillow.casingMaterial}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 4. Diurnal Light Automations Toggles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {automations.map(function (auto) {
                        return (
                            <div
                                key={auto.id}
                                onClick={function () {
                                    handleToggleAutomation(auto.id);
                                }}
                                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                                    auto.enabled
                                        ? 'bg-[#f7f2e7] border-[#8e763b] shadow-xs'
                                        : 'bg-white border-[#ded9ce] hover:bg-[#faf8f5]'
                                }`}
                            >
                                <div className="space-y-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`w-2 h-2 rounded-full ${
                                                auto.enabled ? 'bg-emerald-500 animate-pulse' : 'bg-[#ded9ce]'
                                            }`}
                                        />
                                        <h5 className="font-serif text-sm font-semibold text-[#1f1e1d] tracking-tight truncate">
                                            {auto.title}
                                        </h5>
                                    </div>

                                    <p className="text-xs text-[#6e6b64] font-sans font-medium">
                                        {auto.subtitle}
                                    </p>

                                    <p className="text-[10px] text-[#8e8a82] font-sans font-light leading-snug">
                                        {auto.specNote}
                                    </p>
                                </div>

                                <div className="shrink-0 pt-0.5">
                                    <div
                                        className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                                            auto.enabled ? 'bg-[#8e763b]' : 'bg-[#ded9ce]'
                                        }`}
                                    >
                                        <div
                                            className={`w-4 h-4 rounded-full bg-white transition-transform ${
                                                auto.enabled ? 'translate-x-4' : 'translate-x-0'
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ============================================================= */}
            {/* SECTION 03: IN-SUITE EPICUREAN PROVISIONS                     */}
            {/* ============================================================= */}
            <section
                id="epicurean-provisions"
                className="w-full bg-[#fcf9f4] border border-[#e8e4dc] rounded-3xl p-6 sm:p-9 lg:p-11 shadow-[0_4px_24px_rgba(31,30,29,0.03)] space-y-8"
            >
                {/* 1. Header & Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#eeeae2]">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#1f1e1d] text-white flex items-center justify-center font-mono text-[10px] font-semibold">
                                {section3Number}
                            </span>
                            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.24em] text-[#8e763b]">
                                {section3Eyebrow}
                            </span>
                        </div>

                        <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#1f1e1d] tracking-tight leading-[1.12]">
                            {section3Heading}
                        </h2>

                        <p className="text-xs sm:text-[13px] text-[#636058] font-sans font-light leading-relaxed max-w-2xl">
                            {section3Description}
                        </p>
                    </div>

                    <div className="self-start sm:self-auto shrink-0">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f6f2ea] border border-[#ded9ce] text-[9px] font-mono uppercase tracking-[0.2em] text-[#8e763b] shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b]" />
                            <span>{section3StatusBadge}</span>
                        </span>
                    </div>
                </div>

                {/* 2. 3 Epicurean Staging Cards */}
                <div className="space-y-4">
                    {epicureanItems.map(function (item) {
                        return (
                            <article
                                key={item.id}
                                className="bg-white border border-[#ded9ce] rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:border-[#8e763b]/60 transition-colors"
                            >
                                <div className="flex items-start gap-4 min-w-0">
                                    <div className="p-3 rounded-xl bg-[#f6f2ea] border border-[#ded9ce] text-[#8e763b] shadow-2xs shrink-0 mt-0.5">
                                        {renderEpicureanIcon(item.iconType)}
                                    </div>

                                    <div className="space-y-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8e763b] font-semibold">
                                                {item.categoryTag}
                                            </span>
                                            <span className="text-[#ded9ce]">•</span>
                                            <span className="text-[10px] font-sans text-[#78756d] truncate">
                                                {item.provenance}
                                            </span>
                                        </div>

                                        <h4 className="font-serif text-lg sm:text-xl font-normal text-[#1f1e1d] tracking-tight">
                                            {item.title}
                                        </h4>

                                        <p className="text-xs text-[#55524b] font-sans font-light leading-relaxed max-w-2xl">
                                            {item.serviceProtocol}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#eeeae2]">
                                    <span className="px-3 py-1 rounded-sm bg-[#f6f2ea] border border-[#ded9ce] text-[9px] font-mono uppercase tracking-wider text-[#1f1e1d] font-semibold">
                                        {item.temperatureOrTimingDisplay}
                                    </span>

                                    {item.isCustomizable && (
                                        <button
                                            type="button"
                                            onClick={function () {
                                                if (onCustomizeEpicureanItem) {
                                                    onCustomizeEpicureanItem(item.id);
                                                }
                                            }}
                                            className="text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#8e763b] hover:text-[#1f1e1d] transition-colors underline"
                                        >
                                            MODIFY INSTRUCTION
                                        </button>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* 3. Subterranean Cellar Concierge Footnote */}
                <div className="p-4 rounded-2xl bg-[#f6f2ea] border border-[#ded9ce] flex items-center justify-between text-xs font-sans text-[#6e6b64]">
                    <div className="flex items-center gap-2.5">
                        <span className="text-base leading-none text-[#8e763b]">☆</span>
                        <p className="text-[11px] font-light leading-snug">
                            {cellarConciergeNotice}
                        </p>
                    </div>

                    <a
                        href="tel:+39089875111"
                        className="text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#8e763b] hover:text-[#1f1e1d] transition-colors shrink-0 pl-3"
                    >
                        CALL SOMMELIER DESK →
                    </a>
                </div>
            </section>
        </div>
    );
}