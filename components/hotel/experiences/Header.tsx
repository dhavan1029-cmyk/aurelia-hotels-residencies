'use client';

import { useState } from 'react';


export type ExperienceCategoryFilterId = 'all' | 'marine-charters' | 'subterranean-wellness' | 'gastronomy-enology';

export interface ExperienceCategoryTab {
    id: ExperienceCategoryFilterId;
    label: string;
    count: number;
}

export interface ExperiencesHeaderData {
    editionEyebrow: string;
    heading: string;
    narrative: string;
    sanctuaryLocationPill: string;
    curatorDeskNotice: string;
    categories: ExperienceCategoryTab[];
    defaultCategoryId: ExperienceCategoryFilterId;
}

export const experiencesHeaderDefaultData: ExperiencesHeaderData = {
    editionEyebrow: '• AURELIA SEASONAL GAZETTE • 2025 •',
    heading: 'Curated Escapes & Sensory Gastronomy',
    narrative:
        'Beyond the stillness of our monolithic travertine suites lies the living culture of the Campanian coastline. From private wooden Riva excursions navigating the sheer limestone bluffs of Capri to subterranean volcanic caldarium immersions and cellar tastings of historic reserve vintages, each experience is tailored for unhurried presence.',
    sanctuaryLocationPill: 'SANCTUARY POSITANO • AMALFI COASTLINE',
    curatorDeskNotice: 'Bespoke privatizations coordinated directly via Head Majordomo Matteo de Luca.',
    categories: [
        {
            id: 'all',
            label: 'All Curations',
            count: 12,
        },
        {
            id: 'marine-charters',
            label: 'Private Marine Charters',
            count: 4,
        },
        {
            id: 'subterranean-wellness',
            label: 'Subterranean Spa & Wellness',
            count: 3,
        },
        {
            id: 'gastronomy-enology',
            label: 'Gastronomy & Enology',
            count: 5,
        },
    ],
    defaultCategoryId: 'all',
};

export interface ExperiencesHeaderAndFilterSectionProps {
    data?: ExperiencesHeaderData;
    activeCategory?: ExperienceCategoryFilterId;
    onCategoryChange?: (categoryId: ExperienceCategoryFilterId) => void;
    onInquireCurator?: () => void;
    className?: string;
}

export function ExperiencesHeaderAndFilterSection({
    data = experiencesHeaderDefaultData,
    activeCategory,
    onCategoryChange,
    onInquireCurator,
    className = '',
}: ExperiencesHeaderAndFilterSectionProps) {
    const {
        editionEyebrow,
        heading,
        narrative,
        sanctuaryLocationPill,
        curatorDeskNotice,
        categories,
        defaultCategoryId,
    } = data;

    const [selectedCategory, setSelectedCategory] = useState<ExperienceCategoryFilterId>(
        activeCategory || defaultCategoryId
    );

    const handleSelectCategory = (categoryId: ExperienceCategoryFilterId) => {
        setSelectedCategory(categoryId);
        if (onCategoryChange) {
            onCategoryChange(categoryId);
        }
    };

    const currentActive = activeCategory || selectedCategory;

    return (
        <section
            className={`w-full bg-[#fcf9f4] pt-12 sm:pt-16 pb-8 px-4 sm:px-8 lg:px-12 border-b border-[#e8e4dc] text-[#1f1e1d] ${className}`}
        >
            <div className="max-w-340 mx-auto space-y-10 sm:space-y-12">
                {/* 1. Gazette Monograph Header Block */}
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    {/* Top Architectural Gazette Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f6f2ea] border border-[#ded9ce] text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8e763b] mb-5 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b] animate-pulse" />
                        <span>{editionEyebrow}</span>
                    </div>

                    {/* Master Serif Headline */}
                    <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-normal text-[#1f1e1d] tracking-tight leading-[1.08]">
                        {heading}
                    </h1>

                    {/* Subtitle / Narrative Monograph */}
                    <p className="mt-4 sm:mt-5 text-xs sm:text-[14px] text-[#5f5c56] font-sans font-light leading-relaxed max-w-3xl">
                        {narrative}
                    </p>

                    {/* Meta Status Sub-strip */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-[11px] font-sans text-[#78756d]">
                        <span className="uppercase tracking-[0.22em] text-[#8e763b] font-medium">
                            {sanctuaryLocationPill}
                        </span>
                        <span className="hidden sm:inline text-[#ded9ce]">•</span>
                        <span className="font-light italic text-[#78756d]">
                            {curatorDeskNotice}
                        </span>
                    </div>
                </div>

                {/* 2. Stone-Toned Segmented Category Filter Bar */}
                <div className="w-full bg-[#eee9e0] border border-[#e2ddd3] rounded-2xl p-2.5 sm:p-3 shadow-[0_2px_12px_rgba(31,30,29,0.02)]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        {/* Scrollable Filter Tabs Group */}
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 w-full sm:w-auto">
                            {categories.map(function (cat) {
                                const isActive = currentActive === cat.id;

                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={function () {
                                            handleSelectCategory(cat.id);
                                        }}
                                        className={`px-4 sm:px-5 py-2.5 rounded-xl font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 whitespace-nowrap shrink-0 shadow-2xs ${
                                            isActive
                                                ? 'bg-[#1f1e1d] text-white shadow-sm'
                                                : 'bg-white hover:bg-[#faf8f5] text-[#2c2a26] border border-[#ded9ce] hover:border-[#8e763b]/50'
                                        }`}
                                    >
                                        <span>{cat.label}</span>
                                        <span
                                            className={`ml-1.5 font-normal ${
                                                isActive ? 'text-white/70' : 'text-[#8e8a82]'
                                            }`}
                                        >
                                            ({cat.count})
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right Quick Action: Direct Private Concierge Inscription */}
                        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#ded9ce]">
                            <span className="hidden lg:inline text-[10px] font-sans text-[#8e8a82] uppercase tracking-wider">
                                PRIVATE CONCIERGE DESK:
                            </span>

                            <button
                                type="button"
                                onClick={onInquireCurator}
                                className="group inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#faf8f5] border border-[#ded9ce] text-[10px] font-sans font-semibold uppercase tracking-[0.16em] text-[#8e763b] hover:text-[#1f1e1d] transition-all shadow-2xs"
                            >
                                <svg
                                    className="w-3.5 h-3.5 text-[#8e763b]"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <span>INQUIRE CURATOR</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}