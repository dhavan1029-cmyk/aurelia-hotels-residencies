'use client'

import { useState } from 'react';
import { PartyCompositionDropdown, DateRangeDropdown } from './FilterDropdowns';

export type SanctuaryCategory = 'all' | 'oceanfront' | 'villas' | 'garden';
export type ViewMode = 'grid' | 'list';

export interface FilterBarProps {
    selectedDatesText?: string;
    partyText?: string;
    totalAvailableCount?: number;
    initialCategory?: SanctuaryCategory;
    initialSort?: string;
    initialViewMode?: ViewMode;
    onCategoryChange?: (category: SanctuaryCategory) => void;
    onDatesClick?: () => void;
    onPartyClick?: () => void;
    onSortChange?: (sort: string) => void;
    onViewModeChange?: (mode: ViewMode) => void;
    className?: string;
}

export function FilterBar({
    selectedDatesText = 'Oct 14 – 19, 2025 • 5 Nights',
    partyText = '2 Guests • 1 Suite',
    totalAvailableCount = 3,
    initialCategory = 'all',
    initialSort = 'curated',
    initialViewMode = 'grid',
    onCategoryChange,
    onDatesClick,
    onPartyClick,
    onSortChange,
    onViewModeChange,
    className = '',
}: FilterBarProps) {
    const [activeCategory, setActiveCategory] = useState<SanctuaryCategory>(initialCategory);
    const [currentSort, setCurrentSort] = useState<string>(initialSort);
    const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [isPartyCompositionDropdownOpen, setIsPartyCompositionDropdownOpen] = useState(false);
    const [isDateRangeDropdownOpen, setIsDateRangeDropdownOpen] = useState(false);

    const categories: Array<{ id: SanctuaryCategory; label: string; count: number }> = [
        { id: 'all', label: 'ALL ACCOMMODATIONS', count: 18 },
        { id: 'oceanfront', label: 'OCEANFRONT SUITES', count: 8 },
        { id: 'villas', label: 'CLIFFSIDE VILLAS', count: 4 },
        { id: 'garden', label: 'GARDEN ACCOMMODATIONS', count: 6 },
    ];

    const sortOptions = [
        { id: 'curated', label: 'Curated by Aurelia' },
        { id: 'price-asc', label: 'Tariff: Low to High' },
        { id: 'price-desc', label: 'Tariff: High to Low' },
        { id: 'area-desc', label: 'Spatial Area: Largest' },
    ];

    const handleCategorySelect = (id: SanctuaryCategory) => {
        setActiveCategory(id);
        if (onCategoryChange) {
            onCategoryChange(id);
        }
    };

    const handleSortSelect = (id: string) => {
        setCurrentSort(id);
        setIsSortDropdownOpen(false);
        if (onSortChange) {
            onSortChange(id);
        }
    };

    const handleViewModeToggle = (mode: ViewMode) => {
        setViewMode(mode);
        if (onViewModeChange) {
            onViewModeChange(mode);
        }
    };

    return (
        <section
            className={`w-full bg-[#fcf9f4] px-4 sm:px-8 lg:px-12 text-[#1f1e1d] ${className}`}
        >
            <div className="max-w-340 mx-auto">

                {/*Stone-Toned Filter & Sort Control Strip Box */}
                <div className="w-full bg-[#eee9e0] border border-[#e2ddd3] rounded-2xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                    {/* Top Row: Date/Party Selectors, Category Tabs & Sort/Layout */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Left Group: Dates & Party Composition Inputs */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                            {/* Selected Dates Pill */}
                            <div className='relative flex flex-col'>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setIsDateRangeDropdownOpen(prev => !prev)
                                        // onDatesClick()
                                    }}
                                    className="group bg-white hover:bg-[#faf8f4] border border-[#ded9ce] rounded-xl px-4 py-2.5 text-left transition-all duration-200 flex items-center justify-between mr-3 shadow-xs active:scale-[0.99]"
                                >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <svg
                                            className="w-4 h-4 text-[#8e763b] shrink-0"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e8a82]">
                                                SELECTED DATES
                                            </span>
                                            <span className="text-xs sm:text-[12px] font-sans font-medium text-[#1f1e1d] truncate">
                                                {selectedDatesText}
                                            </span>
                                        </div>
                                    </div>
                                    <svg
                                        className="w-3.5 h-3.5 text-[#8e8a82] group-hover:text-[#1f1e1d] transition-colors shrink-0"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>

                                <DateRangeDropdown isOpen={isDateRangeDropdownOpen} onClose={() => setIsDateRangeDropdownOpen(false)} onApplyDates={() => {}}></DateRangeDropdown>

                            </div>

                            {/* Party Composition Pill */}
                            <div className='relative flex flex-col'>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setIsPartyCompositionDropdownOpen(prev => !prev)
                                        // onDatesClick()
                                    }}
                                    className="group bg-white hover:bg-[#faf8f4] border border-[#ded9ce] rounded-xl px-4 py-2.5 text-left transition-all duration-200 flex items-center justify-between mr-3 shadow-xs active:scale-[0.99]"
                                >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <svg
                                            className="w-4 h-4 text-[#8e763b] shrink-0"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e8a82]">
                                                PARTY COMPOSITION
                                            </span>
                                            <span className="text-xs sm:text-[12px] font-sans font-medium text-[#1f1e1d] truncate">
                                                {partyText}
                                            </span>
                                        </div>
                                    </div>
                                    <svg
                                        className="w-3.5 h-3.5 text-[#8e8a82] group-hover:text-[#1f1e1d] transition-colors shrink-0"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>

                                <PartyCompositionDropdown isOpen={isPartyCompositionDropdownOpen} onApplyParty={() => {}} onClose={() => setIsPartyCompositionDropdownOpen(false)}></PartyCompositionDropdown>
                            </div>
                        </div>

                        {/* Center: Category Filter Segmented Tabs */}
                        <div className="flex flex-wrap items-center gap-2 overflow-x-auto py-1">
                            {categories.map(function (cat) {
                                const isActive = activeCategory === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={function () {
                                            handleCategorySelect(cat.id);
                                        }}
                                        className={`px-4 sm:px-4.5 py-2.5 rounded-xl font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-200 whitespace-nowrap shadow-xs ${
                                            isActive
                                                ? 'bg-[#1f1e1d] text-white shadow-sm'
                                                : 'bg-white hover:bg-[#faf8f4] text-[#2c2a26] border border-[#ded9ce]'
                                        }`}
                                    >
                                        {cat.label} ({cat.count})
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right Group: Sort Dropdown & Layout Grid/List Switcher */}
                        <div className="flex items-center gap-2.5 self-end lg:self-auto shrink-0">
                            {/* Sort Selector Dropdown */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={function () {
                                        setIsSortDropdownOpen(!isSortDropdownOpen);
                                    }}
                                    className="bg-white hover:bg-[#faf8f4] border border-[#ded9ce] rounded-xl px-3.5 py-2.5 text-left transition-all duration-200 flex items-center gap-3 shadow-xs"
                                >
                                    <div className="flex items-center gap-2 text-left">
                                        <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e8a82] block leading-tight">
                                            SORT<br />BY:
                                        </span>
                                        <span className="text-xs sm:text-[12px] font-sans font-medium text-[#1f1e1d]">
                                            {sortOptions.find(function (s) {
                                                return s.id === currentSort;
                                            })?.label || 'Curated by Aurelia'}
                                        </span>
                                    </div>
                                    <svg
                                        className="w-3.5 h-3.5 text-[#8e8a82] shrink-0"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                {isSortDropdownOpen && (
                                    <div className="absolute right-0 mt-1.5 w-52 bg-white border border-[#ded9ce] rounded-xl shadow-xl py-1.5 z-30">
                                        {sortOptions.map(function (option) {
                                            return (
                                                <button
                                                    key={option.id}
                                                    type="button"
                                                    onClick={function () {
                                                        handleSortSelect(option.id);
                                                    }}
                                                    className={`w-full text-left px-4 py-2 text-xs font-sans transition-colors ${
                                                        currentSort === option.id
                                                            ? 'bg-[#f6f2ea] text-[#8e763b] font-semibold'
                                                            : 'text-[#2c2a26] hover:bg-[#fcfaf7]'
                                                    }`}
                                                >
                                                    {option.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Grid / List View Toggle Button */}
                            <div className="bg-white border border-[#ded9ce] rounded-xl p-1 flex items-center gap-1 shadow-xs">
                                {/* Grid Icon Button */}
                                <button
                                    type="button"
                                    aria-label="Grid View"
                                    onClick={function () {
                                        handleViewModeToggle('grid');
                                    }}
                                    className={`p-1.5 rounded-lg transition-colors ${
                                        viewMode === 'grid'
                                            ? 'bg-[#1f1e1d] text-white'
                                            : 'text-[#8e8a82] hover:text-[#1f1e1d]'
                                    }`}
                                >
                                    <svg
                                        className="w-4 h-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="3" y="3" width="7" height="7" />
                                        <rect x="14" y="3" width="7" height="7" />
                                        <rect x="14" y="14" width="7" height="7" />
                                        <rect x="3" y="14" width="7" height="7" />
                                    </svg>
                                </button>

                                {/* List Icon Button */}
                                <button
                                    type="button"
                                    aria-label="List View"
                                    onClick={function () {
                                        handleViewModeToggle('list');
                                    }}
                                    className={`p-1.5 rounded-lg transition-colors ${
                                        viewMode === 'list'
                                            ? 'bg-[#1f1e1d] text-white'
                                            : 'text-[#8e8a82] hover:text-[#1f1e1d]'
                                    }`}
                                >
                                    <svg
                                        className="w-4 h-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="8" y1="6" x2="21" y2="6" />
                                        <line x1="8" y1="12" x2="21" y2="12" />
                                        <line x1="8" y1="18" x2="21" y2="18" />
                                        <line x1="3" y1="6" x2="3.01" y2="6" />
                                        <line x1="3" y1="12" x2="3.01" y2="12" />
                                        <line x1="3" y1="18" x2="3.01" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Status Micro-Bar */}
                    <div className="mt-4 pt-3.5 border-t border-[#ded9ce] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-sans text-[#78756d]">
                        {/* Live Results Counter */}
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b] animate-pulse" />
                            <span>
                                Showing{' '}
                                <strong className="font-semibold text-[#1f1e1d]">
                                    {totalAvailableCount} Available Sanctuaries
                                </strong>{' '}
                                for your selected dates
                            </span>
                        </div>

                        {/* Direct Guarantee Badge */}
                        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#8e763b] font-medium">
                            <svg
                                className="w-3.5 h-3.5 text-[#8e763b] shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                <polyline points="9 12 11 14 15 10" />
                            </svg>
                            <span>GUARANTEED BEST SOVEREIGN RATE DIRECT</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}