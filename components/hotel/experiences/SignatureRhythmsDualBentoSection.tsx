'use client';

import Image from 'next/image';
import Link from 'next/link';

export interface RhythmFeatureSpec {
    iconType: 'clock' | 'patrons' | 'curation' | 'sommelier';
    label: string;
}

export interface RhythmExperienceCardData {
    id: string;
    slug: string;
    categoryBadge: string;
    title: string;
    tagline: string;
    narrative: string;
    tariffAmount: number;
    tariffUnit: string;
    currencySymbol: string;
    currencyCode: string;
    specs: RhythmFeatureSpec[];
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    heroImageUrl: string;
    heroImageAlt: string;
    isMichelin?: boolean;
    michelinStars?: number;
}

export interface ExperiencesRhythmsSectionData {
    eyebrow: string;
    heading: string;
    description: string;
    advisoryPill: string;
    experiences: [RhythmExperienceCardData, RhythmExperienceCardData];
}

export const experiencesRhythmsDefaultData: ExperiencesRhythmsSectionData = {
    eyebrow: 'SIGNATURE RHYTHMS',
    heading: 'Intimate Sanctuary Encounters',
    description:
        'Carved directly into coastal bedrock or suspended over the surf, these signature rituals pair subterranean mineral stillness with Campania\'s highest culinary artistry.',
    advisoryPill: 'PRIORITY RESERVATIONS FOR SOVEREIGN KEY PATRONS',
    experiences: [
        {
            id: 'exp-roman-caldarium-circuit',
            slug: 'subterranean-roman-thermal-grotto',
            categoryBadge: 'THERMAL WELLNESS & RECOVERY',
            title: 'Subterranean Roman Thermal Grotto Circuit & Caldarium Ritual',
            tagline: 'Chiseled Volcanic Rock & Warm Neroli Apothecary',
            narrative:
                'Descend into natural volcanic limestone caverns naturally heated by subterranean mineral veins. Experience an unhurried 90-minute circuit through the ancient Caldarium, Tepidarium, and Frigidarium, followed by an invigorating warm neroli and volcanic basalt fascia release.',
            tariffAmount: 240,
            tariffUnit: 'per patron ritual',
            currencySymbol: '€',
            currencyCode: 'EUR',
            specs: [
                { iconType: 'clock', label: '90 Minutes' },
                { iconType: 'patrons', label: 'Max 2 Patrons' },
                { iconType: 'curation', label: 'Volcanic Mineral Soak' },
                { iconType: 'sommelier', label: 'Botanical Herbal Infusion' },
            ],
            primaryCtaLabel: 'RESERVE RITUAL',
            secondaryCtaLabel: 'RITUAL PROTOCOL →',
            heroImageUrl: '/limestone-villa.png',
            heroImageAlt: 'Subterranean Roman thermal bath and caldarium cavern with warm steaming mineral water and amber candlelight',
        },
        {
            id: 'exp-belvedere-michelin-evening',
            slug: 'michelin-evening-ristorante-il-belvedere',
            categoryBadge: 'GASTRONOMY & WINE CELLAR',
            title: 'Michelin Evening at Il Belvedere Overlooking the Gulf',
            tagline: 'Seven-Course Degustation & Rare Cellar Vintages',
            narrative:
                'Perched 200 meters above the Mediterranean surf on an open-air travertine terrace. Executive Chef Matteo Moretti presents an unhurried seven-course tasting journey of deep coastal catch and century-old lemon grove harvest, accompanied by rare reserve cru pours from our subterranean vaults.',
            tariffAmount: 320,
            tariffUnit: 'per patron tasting',
            currencySymbol: '€',
            currencyCode: 'EUR',
            specs: [
                { iconType: 'clock', label: '19:30 or 21:00 Seating' },
                { iconType: 'patrons', label: '2 to 6 Patrons' },
                { iconType: 'curation', label: '7-Course Coastal Journey' },
                { iconType: 'sommelier', label: 'Sommelier Reserve Pairing' },
            ],
            primaryCtaLabel: 'REQUEST DINING TABLE',
            secondaryCtaLabel: 'TASTING MENU →',
            heroImageUrl: '/limestone-villa.png',
            heroImageAlt: 'Fine dining Michelin star culinary presentation with edible flowers and artisan Campanian ceramics',
            isMichelin: true,
            michelinStars: 3,
        },
    ],
};

export interface SignatureRhythmsDualBentoSectionProps {
    data?: ExperiencesRhythmsSectionData;
    onReserveExperience?: (experienceId: string) => void;
    onViewDossier?: (slug: string) => void;
    className?: string;
}

export function SignatureRhythmsDualBentoSection({
    data = experiencesRhythmsDefaultData,
    onReserveExperience,
    onViewDossier,
    className = '',
}: SignatureRhythmsDualBentoSectionProps) {
    const { eyebrow, heading, description, advisoryPill, experiences } = data;

    const renderSpecIcon = (type: RhythmFeatureSpec['iconType']) => {
        switch (type) {
            case 'clock':
                return (
                    <svg className="w-3.5 h-3.5 text-[#8e763b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                );
            case 'patrons':
                return (
                    <svg className="w-3.5 h-3.5 text-[#8e763b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                );
            case 'curation':
                return (
                    <svg className="w-3.5 h-3.5 text-[#8e763b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                );
            case 'sommelier':
                return (
                    <svg className="w-3.5 h-3.5 text-[#8e763b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M8 22h8" />
                        <path d="M12 11v11" />
                        <path d="M19 3l-7 8-7-8h14z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <section className={`w-full max-w-340 mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14 ${className}`}>
            {/* Section Header Monograph */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-8 sm:pb-10 border-b border-[#e8e4dc] mb-8 sm:mb-10">
                <div className="max-w-2xl">
                    <span className="block text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8e763b] mb-2.5">
                        {eyebrow}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#1f1e1d] tracking-tight leading-[1.12]">
                        {heading}
                    </h2>
                    <p className="mt-3 text-xs sm:text-[13px] md:text-sm text-[#5f5c56] font-sans font-light leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="shrink-0 self-start lg:self-auto">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f6f2ea] border border-[#ded9ce] text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b] shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b]" />
                        <span>{advisoryPill}</span>
                    </span>
                </div>
            </div>

            {/* Dual Medium Bento Cards Grid (6 cols + 6 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
                {experiences.map(function (card) {
                    return (
                        <article
                            key={card.id}
                            className="bg-white border border-[#e8e4dc] rounded-lg overflow-hidden shadow-[0_4px_24px_rgba(31,30,29,0.03)] hover:shadow-[0_16px_40px_rgba(31,30,29,0.08)] hover:border-[#8e763b]/40 transition-all duration-500 flex flex-col justify-between group"
                        >
                            {/* Card Media Container */}
                            <div>
                                <div className="relative aspect-16/10 w-full overflow-hidden bg-[#eeeae2]">
                                    <Image
                                        src={card.heroImageUrl}
                                        alt={card.heroImageAlt}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                                    {/* Top Left Badges */}
                                    <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
                                        <span className="px-3 py-1 rounded-sm bg-black/60 backdrop-blur-md text-white font-sans text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] shadow-sm">
                                            {card.categoryBadge}
                                        </span>

                                        {card.isMichelin && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#8e763b] text-white font-sans text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] shadow-sm">
                                                <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 24 24">
                                                    <path d="M12 2l2.4 7.4h7.6l-6 4.5 2.3 7.1-6.3-4.6-6.3 4.6 2.3-7.1-6-4.5h7.6z" />
                                                </svg>
                                                <span>3 MICHELIN STARS</span>
                                            </span>
                                        )}
                                    </div>

                                    {/* Floating Bottom Right Tariff Badge */}
                                    <div className="absolute bottom-4 right-4 z-10 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-md border border-[#e8e4dc] text-right">
                                        <div className="flex items-baseline gap-1">
                                            <span className="font-serif text-xl sm:text-2xl font-bold text-[#1f1e1d] leading-none">
                                                {card.currencySymbol}{card.tariffAmount.toLocaleString()}
                                            </span>
                                            <span className="text-[10px] font-sans text-[#78756d]">
                                                {card.tariffUnit}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Details Container */}
                                <div className="p-6 sm:p-8">
                                    <span className="block text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b] mb-1.5">
                                        {card.tagline}
                                    </span>

                                    <h3 className="font-serif text-2xl sm:text-[26px] font-normal text-[#1f1e1d] tracking-tight leading-[1.2] group-hover:text-[#8e763b] transition-colors duration-300">
                                        {card.title}
                                    </h3>

                                    <p className="mt-3 text-xs sm:text-[13px] text-[#5f5c56] font-sans font-light leading-relaxed">
                                        {card.narrative}
                                    </p>

                                    {/* 4 Feature Specification Pills Grid */}
                                    <div className="grid grid-cols-2 gap-2.5 mt-6 pt-6 border-t border-[#f0ece3]">
                                        {card.specs.map(function (spec, idx) {
                                            return (
                                                <div
                                                    key={idx}
                                                    className="p-2.5 rounded-xl bg-[#fcf9f4] border border-[#ded9ce] flex items-center gap-2 shadow-2xs"
                                                >
                                                    <span className="p-1 rounded-md bg-white border border-[#e8e4dc] shrink-0">
                                                        {renderSpecIcon(spec.iconType)}
                                                    </span>
                                                    <span className="text-[11px] font-sans font-medium text-[#2c2a26] truncate">
                                                        {spec.label}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Card Action Buttons Footer */}
                            <div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#f0ece3] mt-2">
                                <Link
                                    href={`/checkout?experience=${card.slug}`}
                                    onClick={function () {
                                        if (onReserveExperience) {
                                            onReserveExperience(card.id);
                                        }
                                    }}
                                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all shadow-md active:translate-y-0.5 text-center group/btn"
                                >
                                    <span>{card.primaryCtaLabel}</span>
                                    <span className="transform transition-transform duration-300 group-hover/btn:translate-x-1">
                                        →
                                    </span>
                                </Link>

                                <Link
                                    href={`/experiences/${card.slug}`}
                                    onClick={function () {
                                        if (onViewDossier) {
                                            onViewDossier(card.slug);
                                        }
                                    }}
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3.5 rounded-xl bg-white hover:bg-[#f6f2ea] border border-[#ded9ce] text-[#1f1e1d] font-sans text-[11px] font-semibold uppercase tracking-[0.18em] transition-all text-center shadow-2xs"
                                >
                                    <span>{card.secondaryCtaLabel}</span>
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}