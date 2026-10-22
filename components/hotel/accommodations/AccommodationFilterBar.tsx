'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import DateRangeCalendar from '../DateRangeCalendar';
import { calculateNights } from '../DateRangeCalendar';

export type SanctuaryCategory = 'all' | 'oceanfront' | 'villas' | 'garden';

export interface FilterBarValues {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    suites?: number;
    category?: SanctuaryCategory;
    sortBy?: string;
}

export interface FilterBarProps {
    totalAvailableCount?: number;
    className?: string;
}

export function FilterBar({
    totalAvailableCount = 3,
    className = '',
}: FilterBarProps) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    const initCheckIn = searchParams.get('checkIn') || '';
    const initCheckOut = searchParams.get('checkOut') || '';
    const guests = Number(searchParams.get('guests')) || 0;
    const initSuites = Number(searchParams.get('suites')) || 0;
    const initSortBy = searchParams.get('sortBy')
    // -------------------------------------------------------------
    // 1. Filter State Management
    // -------------------------------------------------------------

    const [checkIn, setCheckIn] = useState<string>(initCheckIn);
    const [checkOut, setCheckOut] = useState<string>(initCheckOut);
    const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;    
    const [adults, setAdults] = useState<number>(guests || 2);
    const [suites, setSuites] = useState<number>(initSuites || 1);
    const [category, setCategory] = useState<SanctuaryCategory>('all');
    const [sortBy, setSortBy] = useState<string>(initSortBy || 'curated');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isPartyPopoverOpen, setIsPartyPopoverOpen] = useState(false);
    const [isSortPopoverOpen, setIsSortPopoverOpen] = useState(false);
    const dateRef = useRef<HTMLDivElement>(null);
    const partyRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);

    // Dismiss popovers when clicking outside
    useEffect(function () {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            if (dateRef.current && !dateRef.current.contains(target)) {
                setIsCalendarOpen(false);
            }
            if (partyRef.current && !partyRef.current.contains(target)) {
                setIsPartyPopoverOpen(false);
            }
            if (sortRef.current && !sortRef.current.contains(target)) {
                setIsSortPopoverOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    

    function formatDate(isoDate: string): string {
        const [year, month, day] = isoDate.split('-').map(Number);

        return new Date(year, month - 1, day).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    }

    // Category Selector
    function handleCategorySelect(catId: SanctuaryCategory) {
        setCategory(catId);
    }

    // Sort Selector
    function handleSortSelect(sortId: string) {
        setSortBy(sortId);
        setIsSortPopoverOpen(false);
        applyFilter({sortBy: sortId})
    }

    function applyFilter(options: FilterBarValues) {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(options).forEach(([key, value]) => {
            if (value === undefined || value === '') {
                params.delete(key);
            } else {
                params.set(key, String(value));
                console.log(key, value)
            }
        });
    
        const query = params.toString();
        router.replace(`${pathname}?${query}`);
    }

    const categories: Array<{ id: SanctuaryCategory; label: string; count: number }> = [
        { id: 'all', label: 'All Sanctuaries', count: 18 },
        { id: 'oceanfront', label: 'Oceanfront Suites', count: 8 },
        { id: 'villas', label: 'Cliffside Villas', count: 4 },
        { id: 'garden', label: 'Garden Sanctuaries', count: 6 },
    ];

    const sortOptions = [
        { id: 'curated', label: 'Curated by Aurelia' },
        { id: 'price-asc', label: 'Tariff: Low to High' },
        { id: 'price-desc', label: 'Tariff: High to Low' },
        { id: 'area-desc', label: 'Spatial Area: Largest' },
    ];

    return (
        <section
            className={`w-full py-6 px-4 sm:px-8 lg:px-12 text-[#1f1e1d] ${className}`}
        >
            <div className="max-w-340 mx-auto space-y-4">
                {/* ========================================================= */}
                {/* MASTER FILTER CONSOLE CARD                                */}
                {/* ========================================================= */}
                <div className="border border-[#e4ded2] rounded-3xl p-5 sm:p-7 space-y-6">
                    {/* ----------------------------------------------------- */}
                    {/* ROW 1: PRIMARY STAY HORIZON & PATRON SELECTION (2 COL) */}
                    {/* ----------------------------------------------------- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* 1A. Stay Horizon Trigger & Embedded Popover */}
                        <div ref={dateRef} className="relative">
                            <label className="block text-[9px] font-mono font-semibold uppercase tracking-[0.24em] text-[#8e763b] mb-1.5 pl-1">
                                01 • STAY HORIZON &amp; CALENDAR
                            </label>

                            <button
                                type="button"
                                onClick={function () {
                                    setIsCalendarOpen(function (prev) {
                                        return !prev;
                                    });
                                    setIsSortPopoverOpen(false);
                                }}
                                className={`w-full group bg-white hover:bg-[#faf7f0] border rounded-2xl p-4 text-left transition-all duration-200 flex items-center justify-between gap-4 shadow-2xs ${
                                    isCalendarOpen
                                        ? 'border-[#8e763b] ring-2 ring-[#8e763b]/20 bg-[#faf7f0]'
                                        : 'border-[#ded9ce] hover:border-[#8e763b]/60'
                                }`}
                            >
                                <div className="flex items-center gap-3.5 min-w-0">
                                    <div className="w-10 h-10 rounded-xl bg-[#f6f2ea] border border-[#e5dfd3] text-[#8e763b] flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                                        <svg
                                            className="w-4 h-4"
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
                                    </div>

                                    <div className="min-w-0">
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-serif text-base sm:text-lg font-medium text-[#1f1e1d] truncate">
                                                {checkIn && checkOut
                                                    ? `${formatDate(checkIn)} – ${formatDate(checkOut)}`
                                                    : 'Select your stay dates'}
                                            </span>
                                            <span className={`${nights ? '' : 'hidden'} px-2 py-0.5 rounded-full bg-[#f6f2ea] border border-[#ded9ce] text-[9px] font-mono text-[#8e763b] font-medium shrink-0`}>
                                                {nights} Nights
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="shrink-0 flex items-center gap-1 text-[#8e763b] text-xs font-mono font-medium">
                                    <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-[#8e8a82]">
                                        MODIFY
                                    </span>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-200 ${
                                            isCalendarOpen ? 'rotate-180 text-[#8e763b]' : 'text-[#8e8a82]'
                                        }`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </div>
                            </button>

                            {/* Calendar Popover */}
                            {isCalendarOpen && (
                                <div className="absolute top-[calc(100%+8px)] left-0 lg:left-0 sm:-left-75 md:-left-100 z-50">
                                    <DateRangeCalendar
                                        isOpen={isCalendarOpen}
                                        onClose={() => setIsCalendarOpen(false)}
                                        checkIn={checkIn}
                                        checkOut={checkOut}
                                        onApplyDates={(range) => {
                                            setCheckIn(range.checkIn);
                                            setCheckOut(range.checkOut);
                                            applyFilter({checkIn: range.checkIn, checkOut: range.checkOut})
                                        }}
                                        onClearDates={() => {
                                            setCheckIn('');
                                            setCheckOut('');
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* 1B. Party & Suite Composition Trigger & Embedded Popover */}
                        <div ref={partyRef} className="relative">
                            <label className="block text-[9px] font-mono font-semibold uppercase tracking-[0.24em] text-[#8e763b] mb-1.5 pl-1">
                                02 • PATRON PARTY &amp; SUITE ALLOCATION
                            </label>

                            <button
                                type="button"
                                onClick={function () {
                                    setIsPartyPopoverOpen(function (prev) {
                                        return !prev;
                                    });
                                    setIsCalendarOpen(false);
                                    setIsSortPopoverOpen(false);
                                }}
                                className={`w-full group bg-white hover:bg-[#faf7f0] border rounded-2xl p-4 text-left transition-all duration-200 flex items-center justify-between gap-4 shadow-2xs ${
                                    isPartyPopoverOpen
                                        ? 'border-[#8e763b] ring-2 ring-[#8e763b]/20 bg-[#faf7f0]'
                                        : 'border-[#ded9ce] hover:border-[#8e763b]/60'
                                }`}
                            >
                                <div className="flex items-center gap-3.5 min-w-0">
                                    <div className="w-10 h-10 rounded-xl bg-[#f6f2ea] border border-[#e5dfd3] text-[#8e763b] flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                                        <svg
                                            className="w-4 h-4"
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
                                    </div>

                                    <div className="min-w-0">
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-serif text-base sm:text-lg font-medium text-[#1f1e1d] truncate">
                                                {adults} Patrons • {suites} {suites === 1 ? 'Master Suite' : 'Suites'}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-[#78756d] font-sans font-light mt-0.5 truncate">
                                            Bespoke linens &amp; private majordomo allocation included
                                        </p>
                                    </div>
                                </div>

                                <div className="shrink-0 flex items-center gap-1 text-[#8e763b] text-xs font-mono font-medium">
                                    <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-[#8e8a82]">
                                        CALIBRATE
                                    </span>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-200 ${
                                            isPartyPopoverOpen ? 'rotate-180 text-[#8e763b]' : 'text-[#8e8a82]'
                                        }`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </div>
                            </button>

                            {/* Self-Contained Party Stepper Popover */}
                            {isPartyPopoverOpen && (
                                <div className="absolute left-0 right-0 top-full mt-2 z-40 bg-white border border-[#ded9ce] rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 animate-in fade-in-50 zoom-in-95">
                                    <div className="flex items-center justify-between pb-3 border-b border-[#eeeae2]">
                                        <div>
                                            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8e763b] font-semibold block">
                                                PATRON COMPOSITION
                                            </span>
                                            <h4 className="font-serif text-base text-[#1f1e1d] mt-0.5">
                                                Guests &amp; Chambers
                                            </h4>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={function () {
                                                setIsPartyPopoverOpen(false);
                                            }}
                                            className="p-1 rounded-lg hover:bg-[#f6f2ea] text-[#8e8a82] hover:text-[#1f1e1d] text-xs"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {/* Adults Stepper */}
                                    <div className="p-3.5 rounded-2xl bg-[#fcf9f4] border border-[#ded9ce] flex items-center justify-between">
                                        <div>
                                            <span className="font-serif text-sm font-semibold text-[#1f1e1d] block">
                                                Adult Patrons
                                            </span>
                                            <span className="text-[10px] text-[#78756d] font-sans font-light">
                                                Age 16 and above
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                disabled={adults <= 1}
                                                onClick={function () {
                                                    const nextVal = Math.max(1, adults - 1);
                                                    setAdults(nextVal);
                                                }}
                                                className="w-8 h-8 rounded-xl bg-white border border-[#ded9ce] text-[#1f1e1d] flex items-center justify-center font-mono text-sm hover:bg-[#f6f2ea] disabled:opacity-40 transition-colors shadow-2xs"
                                            >
                                                −
                                            </button>
                                            <span className="font-serif text-base font-bold min-w-5 text-center text-[#1f1e1d]">
                                                {adults}
                                            </span>
                                            <button
                                                type="button"
                                                disabled={adults >= 8}
                                                onClick={function () {
                                                    const nextVal = Math.min(8, adults + 1);
                                                    setAdults(nextVal);
                                                }}
                                                className="w-8 h-8 rounded-xl bg-white border border-[#ded9ce] text-[#1f1e1d] flex items-center justify-center font-mono text-sm hover:bg-[#f6f2ea] disabled:opacity-40 transition-colors shadow-2xs"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Suites Stepper */}
                                    <div className="p-3.5 rounded-2xl bg-[#fcf9f4] border border-[#ded9ce] flex items-center justify-between">
                                        <div>
                                            <span className="font-serif text-sm font-semibold text-[#1f1e1d] block">
                                                Master Suites / Villas
                                            </span>
                                            <span className="text-[10px] text-[#78756d] font-sans font-light">
                                                Private residential units
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                disabled={suites <= 1}
                                                onClick={function () {
                                                    const nextVal = Math.max(1, suites - 1);
                                                    setSuites(nextVal);
                                                }}
                                                className="w-8 h-8 rounded-xl bg-white border border-[#ded9ce] text-[#1f1e1d] flex items-center justify-center font-mono text-sm hover:bg-[#f6f2ea] disabled:opacity-40 transition-colors shadow-2xs"
                                            >
                                                −
                                            </button>
                                            <span className="font-serif text-base font-bold min-w-5 text-center text-[#1f1e1d]">
                                                {suites}
                                            </span>
                                            <button
                                                type="button"
                                                disabled={suites >= 4}
                                                onClick={function () {
                                                    const nextVal = Math.min(4, suites + 1);
                                                    setSuites(nextVal);
                                                }}
                                                className="w-8 h-8 rounded-xl bg-white border border-[#ded9ce] text-[#1f1e1d] flex items-center justify-center font-mono text-sm hover:bg-[#f6f2ea] disabled:opacity-40 transition-colors shadow-2xs"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="pt-2 flex items-center justify-end">
                                        <button
                                            type="button"
                                            onClick={function () {
                                                setIsPartyPopoverOpen(false);
                                                applyFilter({guests: adults, suites})
                                            }}
                                            className="px-5 py-2.5 rounded-xl bg-[#1f1e1d] hover:bg-[#343230] text-white text-[10px] font-sans font-semibold uppercase tracking-[0.18em] transition-colors"
                                        >
                                            Apply Party Composition
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ----------------------------------------------------- */}
                    {/* ROW 2: CATEGORY SEGMENTS & VIEW CONTROLS (WRAPPING)    */}
                    {/* ----------------------------------------------------- */}
                    <div className="pt-4 border-t border-[#e4ded2] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* 2A. Category Filter Tabs (Clean Flex-Wrap — NO horizontal scrollbars) */}
                        <div className="space-y-1.5">
                            <span className="text-[9px] font-mono font-semibold uppercase tracking-[0.22em] text-[#8e8a82] block pl-1">
                                SANCTUARY TYPOLOGY
                            </span>
                            <div className="flex flex-wrap items-center gap-2">
                                {categories.map(function (cat) {
                                    const isActive = category === cat.id;
                                    return (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={function () {
                                                handleCategorySelect(cat.id);
                                            }}
                                            className={`px-4 py-2.5 rounded-xl font-sans text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-200 flex items-center gap-2 shadow-2xs ${
                                                isActive
                                                    ? 'bg-[#1f1e1d] text-white shadow-sm'
                                                    : 'bg-white hover:bg-[#faf7f0] text-[#3e3b37] border border-[#ded9ce]'
                                            }`}
                                        >
                                            <span>{cat.label}</span>
                                            <span
                                                className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md ${
                                                    isActive
                                                        ? 'bg-white/20 text-white'
                                                        : 'bg-[#f6f2ea] text-[#8e763b]'
                                                }`}
                                            >
                                                {cat.count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 2B. Sort Ranking Menu & Grid / List View Toggle */}
                        <div className="flex flex-wrap sm:flex-nowrap items-end sm:items-center gap-3 pt-2 lg:pt-0 self-start lg:self-end">
                            {/* Sort Popover */}
                            <div ref={sortRef} className="relative">
                                <span className="text-[9px] font-mono font-semibold uppercase tracking-[0.22em] text-[#8e8a82] block mb-1 pl-1">
                                    CURATORIAL ORDER
                                </span>
                                <button
                                    type="button"
                                    onClick={function () {
                                        setIsSortPopoverOpen(function (prev) {
                                            return !prev;
                                        });
                                        setIsCalendarOpen(false);
                                        setIsPartyPopoverOpen(false);
                                    }}
                                    className={`bg-white hover:bg-[#faf8f4] border rounded-xl px-4 py-2 text-left transition-all duration-200 flex items-center gap-3 shadow-2xs ${
                                        isSortPopoverOpen
                                            ? 'border-[#8e763b] ring-1 ring-[#8e763b]/30'
                                            : 'border-[#ded9ce] hover:border-[#8e763b]/60'
                                    }`}
                                >
                                    <div className="flex items-baseline gap-1.5 text-xs font-sans">
                                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#8e8a82]">
                                            SORT:
                                        </span>
                                        <span className="font-serif font-medium text-[#1f1e1d]">
                                            {sortOptions.find(function (s) {
                                                return s.id === sortBy;
                                            })?.label || 'Curated by Aurelia'}
                                        </span>
                                    </div>
                                    <svg
                                        className={`w-3.5 h-3.5 text-[#8e8a82] transition-transform duration-200 ${
                                            isSortPopoverOpen ? 'rotate-180 text-[#8e763b]' : ''
                                        }`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                {isSortPopoverOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white border border-[#ded9ce] rounded-2xl shadow-xl py-2 z-40 animate-in fade-in-50 zoom-in-95">
                                        <div className="px-3.5 py-1.5 border-b border-[#f0ece3] text-[9px] font-mono uppercase tracking-widest text-[#8e8a82]">
                                            Ranking Doctrine
                                        </div>
                                        {sortOptions.map(function (option) {
                                            const isSelected = sortBy === option.id;
                                            return (
                                                <button
                                                    key={option.id}
                                                    type="button"
                                                    onClick={function () {
                                                        handleSortSelect(option.id);
                                                    }}
                                                    className={`w-full text-left px-3.5 py-2.5 text-xs font-sans transition-colors flex items-center justify-between ${
                                                        isSelected
                                                            ? 'bg-[#f7f2e7] text-[#8e763b] font-semibold'
                                                            : 'text-[#2c2a26] hover:bg-[#faf8f5]'
                                                    }`}
                                                >
                                                    <span>{option.label}</span>
                                                    {isSelected && (
                                                        <span className="text-[#8e763b] text-xs">✓</span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ----------------------------------------------------- */}
                    {/* ROW 3: MICRO STATUS & SOVEREIGN DIRECT GUARANTEE STRIP */}
                    {/* ----------------------------------------------------- */}
                    <div className="pt-3.5 border-t border-[#e4ded2] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-sans text-[#78756d]">
                        {/* Live Results Counter */}
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b] animate-pulse" />
                            <span>
                                Showing{' '}
                                <strong className="font-serif font-semibold text-[#1f1e1d]">
                                    {totalAvailableCount} Available Sanctuaries
                                </strong>{' '}
                                for your selected stay horizon
                            </span>
                        </div>

                        {/* Direct Guarantee Badge */}
                        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-[#8e763b] font-medium">
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

export default FilterBar;
