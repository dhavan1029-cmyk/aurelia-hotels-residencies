'use client';

import Image from 'next/image';
import Link from 'next/link';


export interface HeritageHeroAction {
    label: string;
    href: string;
    isPrimary?: boolean;
}

export interface ManifestoParagraph {
    paragraph: string;
}

export interface HeritageHeroAndManifestoData {
    // 1. Cinematic Hero Monograph
    editionBadge: string;
    sanctuaryRefPill: string;
    title: string;
    subheadline: string;
    heroNarrative: string;
    heroImageUrl: string;
    heroImageAlt: string;
    actions: HeritageHeroAction[];

    // 2. Manifesto Statement ("The Geometry of Solitude")
    manifestoEyebrow: string;
    manifestoHeading: string;
    manifestoQuote: string;
    manifestoAuthorName: string;
    manifestoAuthorRole: string;
    columnOneParagraphs: string[];
    columnTwoParagraphs: string[];
    architecturalSpecs: Array<{
        metric: string;
        label: string;
    }>;
}

export const heritageHeroDefaultData: HeritageHeroAndManifestoData = {
    editionBadge: 'ARCHITECTURAL MONOGRAPH • VOL. IV',
    sanctuaryRefPill: 'SANCTUARY POSITANO • AMALFI COASTLINE',
    title: 'Monolithic Limestone, Eternal Horizon',
    subheadline:
        'A meditation on vernacular permanence, hand-dressed Roman travertine, and the unhurried craft of coastal architectural stillness.',
    heroNarrative:
        'Conceived not as an intrusion upon the Tyrrhenian cliffs, but as an extraction of sanctuary from within living bedrock. Every chamber, colonnade, and thermal spring is aligned with celestial light and Mediterranean tides.',
    heroImageUrl: '/limestone-villa.png',
    heroImageAlt: 'Monolithic limestone cliffside architecture of Aurelia Sanctuary Positano overlooking the Tyrrhenian Sea at sunset',
    actions: [
        {
            label: 'EXPLORE THE CRAFT',
            href: '#craftsmanship-pillars',
            isPrimary: true,
        },
        {
            label: 'READ THE CHARTER (PDF)',
            href: '#charter-dossier',
            isPrimary: false,
        },
    ],

    manifestoEyebrow: 'THE ARCHITECTURAL MANIFESTO',
    manifestoHeading: 'The Geometry of Solitude & Living Rock',
    manifestoQuote:
        '“We did not build atop the cliffs to conquer them. We extracted monolithic chambers from within living limestone so that the sea, wind, and salt breeze become the only enduring ornament.”',
    manifestoAuthorName: 'Matteo Castiglione',
    manifestoAuthorRole: 'Lead Architect & Historic Conservator • Studio Aurelia',
    columnOneParagraphs: [
        'The architecture of Aurelia was born from an unyielding refusal of the temporary. In an era dominated by synthetic materials and accelerated hospitality, we turned to the ancient quarries of Tivoli and the sheer volcanic cliffs of the Campanian coastline.',
        'Here, walls are not partitions—they are geological masses up to one meter thick, brushed with hydrated lime and sea mineral sand. This thermal density guarantees an unbroken acoustic silence, where the only cadence heard within a patron suite is the rhythmic respiration of the Mediterranean swells 200 meters below.',
    ],
    columnTwoParagraphs: [
        'Each sanctuary is chiseled to capture the diurnal choreography of sunlight. At dawn, eastern apertures filter cool cerulean daylight across unbleached flax linens; by twilight, deep western loggias frame the golden flares of the Tyrrhenian sunset.',
        'By integrating subterranean hydrothermal conduits directly through volcanic stone veins, natural mineral waters circulate through our Caldarium and suite plunge pools without mechanical hum. Architecture here dissolves into landscape, creating a permanent refuge for unhurried presence.',
    ],
    architecturalSpecs: [
        { metric: '100%', label: 'Extracted Tivoli Travertine' },
        { metric: '1.2 M', label: 'Maximum Stone Wall Thickness' },
        { metric: '0 dB', label: 'Acoustic Baseline Isolation' },
        { metric: '2021', label: 'First Monolith Inscribed' },
    ],
};

export interface HeritageHeroAndManifestoSectionProps {
    data?: HeritageHeroAndManifestoData;
    className?: string;
}

export function HeritageHeroAndManifestoSection({
    data = heritageHeroDefaultData,
    className = '',
}: HeritageHeroAndManifestoSectionProps) {
    const {
        editionBadge,
        sanctuaryRefPill,
        title,
        subheadline,
        heroNarrative,
        heroImageUrl,
        heroImageAlt,
        actions,
        manifestoEyebrow,
        manifestoHeading,
        manifestoQuote,
        manifestoAuthorName,
        manifestoAuthorRole,
        columnOneParagraphs,
        columnTwoParagraphs,
        architecturalSpecs,
    } = data;

    const handleExploreCraft = () => {
		const target = document.getElementById('craftsmanship-pillars');

		if (target) {
			target.scrollIntoView({ behavior: 'smooth' });
		}
	};

    const handleDownloadCharter = () => {
		console.log('Downloading Aurelia Monolithic Architectural Charter (PDF)');
	};

    return (
        <section className={`w-full bg-[#fcf9f4] text-[#1f1e1d] ${className}`}>
            {/* 1. Full-Bleed Cinematic Hero Monograph with Deep Vignette */}
            <div className="relative w-full min-h-[82vh] lg:min-h-[88vh] flex flex-col justify-between overflow-hidden bg-[#191817]">
                {/* Background Photographic Asset */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={heroImageUrl}
                        alt={heroImageAlt}
                        fill
                        priority
                        quality={95}
                        sizes="100vw"
                        className="object-cover object-center transform scale-[1.01] transition-transform duration-1000 ease-out"
                    />

                    {/* Editorial Vignette & Atmospheric Contrast Gradients */}
                    <div className="absolute inset-0 bg-black/45" />
                    <div className="absolute inset-0 bg-linear-to-t from-[#191817] via-black/35 to-black/30" />
                    <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/25 to-transparent" />
                </div>

                {/* Top Spacer for Global Fixed Navigation */}
                <div className="relative z-10 h-20 sm:h-24 w-full" aria-hidden="true" />

                {/* Central Editorial Narrative Monograph */}
                <div className="relative z-10 w-full max-w-340 mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 flex-1 flex flex-col justify-center">
                    <div className="max-w-3xl space-y-6">
                        {/* Architectural Monograph Edition Badges */}
                        <div className="flex flex-wrap items-center gap-2.5">
                            <span className="inline-flex items-center gap-2 px-3.5 py-1 -full bg-black/50 backdrop-blur-md border border-white/20 text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.28em] text-[#bfa76f] shadow-sm">
                                <span className="w-1.5 h-1.5 -full bg-[#bfa76f] animate-pulse" />
                                <span>{editionBadge}</span>
                            </span>

                            <span className="px-3 py-1 -full bg-white/10 backdrop-blur-md border border-white/15 text-[9px] sm:text-[10px] font-sans font-medium uppercase tracking-[0.22em] text-[#dcdad5]">
                                {sanctuaryRefPill}
                            </span>
                        </div>

                        {/* Master Serif Headline */}
                        <h1 className="font-serif text-4xl sm:text-6xl lg:text-[72px] font-normal text-white tracking-tight leading-[1.05] drop-shadow-md">
                            {title}
                        </h1>

                        {/* Monograph Subheadline */}
                        <p className="text-sm sm:text-base lg:text-[17px] text-[#f4f0e6]/95 font-sans font-light leading-relaxed max-w-2xl drop-shadow">
                            {subheadline}
                        </p>

                        <p className="text-xs sm:text-[13px] text-[#c4c0b6] font-sans font-light leading-relaxed max-w-xl hidden sm:block">
                            {heroNarrative}
                        </p>

                        {/* Action Callouts */}
                        <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
                            {actions.map(function (action, idx) {
                                if (action.isPrimary) {
                                    return (
                                        <Link
                                            key={idx}
                                            href={action.href}
                                            onClick={handleExploreCraft}
                                            className="inline-flex items-center gap-2 px-7 py-4 -xl bg-[#bfa76f] hover:bg-[#aa935e] text-[#191817] font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all shadow-lg active:translate-y-0.5 text-center group"
                                        >
                                            <span>{action.label}</span>
                                            <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                                                ↓
                                            </span>
                                        </Link>
                                    );
                                }

                                return (
                                    <Link
                                        key={idx}
                                        href={action.href}
                                        onClick={handleDownloadCharter}
                                        className="inline-flex items-center gap-2 px-6 py-4 -xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] transition-all backdrop-blur-md active:translate-y-0.5 text-center"
                                    >
                                        <span>{action.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom Decorative Transition Edge */}
                <div className="relative z-10 w-full h-8 bg-linear-to-b from-transparent to-[#fcf9f4]" />
            </div>

            {/* 2. Architectural Manifesto ("The Geometry of Solitude") Section */}
            <div className="max-w-340 mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24 space-y-12 sm:space-y-16">
                {/* Section Header Monograph & Pull Quote */}
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <span className="block text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.3em] text-[#8e763b]">
                        {manifestoEyebrow}
                    </span>

                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-[48px] font-normal text-[#1f1e1d] tracking-tight leading-[1.12]">
                        {manifestoHeading}
                    </h2>

                    {/* Editorial Large Italicized Pull-Quote */}
                    <div className="pt-4 pb-2">
                        <blockquote className="font-serif italic text-lg sm:text-xl lg:text-[23px] text-[#423f3a] font-light leading-relaxed max-w-3xl mx-auto">
                            {manifestoQuote}
                        </blockquote>

                        <div className="mt-4 flex flex-col items-center justify-center text-xs font-sans">
                            <span className="font-semibold uppercase tracking-[0.2em] text-[#1f1e1d]">
                                {manifestoAuthorName}
                            </span>
                            <span className="text-[11px] text-[#78756d] font-light mt-0.5">
                                {manifestoAuthorRole}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Two-Column Editorial Essay Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 pt-8 border-t border-[#e8e4dc] text-xs sm:text-[13px] md:text-sm text-[#5f5c56] font-sans font-light leading-relaxed">
                    {/* Left Column */}
                    <div className="space-y-4">
                        {columnOneParagraphs.map(function (p, idx) {
                            return <p key={idx}>{p}</p>;
                        })}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        {columnTwoParagraphs.map(function (p, idx) {
                            return <p key={idx}>{p}</p>;
                        })}
                    </div>
                </div>

                {/* 4 Stone Material & Acoustic Specifications Bar */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4">
                    {architecturalSpecs.map(function (spec, idx) {
                        return (
                            <div
                                key={idx}
                                className="bg-[#f6f2ea] border border-[#e8e4dc] -2xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow"
                            >
                                <span className="font-serif text-2xl sm:text-3xl font-normal text-[#1f1e1d] tracking-tight">
                                    {spec.metric}
                                </span>
                                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#8e763b] mt-2 block leading-snug">
                                    {spec.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}