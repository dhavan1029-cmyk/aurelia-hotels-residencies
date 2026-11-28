'use client';

import React, { useState, useRef, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import DateRangeCalendar, { toISODate } from './DateRangeCalendar';
import { SANCTUARIES_CATALOG, SanctuaryEnclaveSpec } from '@/lib/data/sanctuariesCatalog';

// ============================================================================
// 1. TYPE CONTRACTS & DOMAIN MODELS
// ============================================================================

export interface SanctuaryOption {
    id: string;
    slug: string;
    code: string;
    name: string;
    regionTag: string;
    country: string;
    elevation: string;
    coordinates: string;
    badge: string;
}

export interface BookingBarProps {
    preselectedSanctuary?: string;
    defaultCheckIn?: string;
    defaultCheckOut?: string;
    defaultGuests?: number;
    defaultSuites?: number;
    className?: string;
    onSearchSubmit?: (query: {
        sanctuary: string;
        checkIn: string;
        checkOut: string;
        guests: number;
        suites: number;
        memberCode: string;
    }) => void;
}

// Convert canonical catalog into booking options
const CANONICAL_SANCTUARIES: SanctuaryOption[] = SANCTUARIES_CATALOG.map(function (s: SanctuaryEnclaveSpec) {
    return {
        id: s.id,
        slug: s.slug,
        code: s.code,
        name: s.name,
        regionTag: s.regionTag,
        country: s.country,
        elevation: s.elevation,
        coordinates: s.coordinatesDisplay,
        badge: s.code === 'POS-01' ? 'FLAGSHIP CLIFFSIDE' : s.code === 'ENG-02' ? 'ALPINE GLACIAL' : 'COASTAL ENCLAVE',
    };
});

// ============================================================================
// 2. HELPER UTILITIES
// ============================================================================

function computeDaysDifference(startStr?: string, endStr?: string): number {
    try {
        if (!startStr || !endStr) return 5;
        const start = new Date(startStr);
        const end = new Date(endStr);
        const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 1;
    } catch {
        return 5;
    }
}

function formatEditorialDate(dateStr?: string, fallback = 'Select Date'): string {
    try {
        if (!dateStr || dateStr.includes('Check') || !dateStr.includes('-')) {
            return fallback;
        }
        const [y, m, d] = dateStr.split('-');
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ];
        const monthIndex = parseInt(m, 10) - 1;
        const dayNumber = parseInt(d, 10);
        return `${monthNames[monthIndex]} ${dayNumber}, ${y}`;
    } catch {
        return dateStr || fallback;
    }
}

// ============================================================================
// 3. MASTER BOOKING CONSOLE COMPONENT
// ============================================================================

export function BookingBar({
    preselectedSanctuary = 'positano',
    defaultCheckIn,
    defaultCheckOut,
    defaultGuests = 2,
    defaultSuites = 1,
    className = '',
    onSearchSubmit,
}: BookingBarProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    // Default dates: 14 days out, 5 nights stay
    const now = Date.now();
    const initialCheckIn = defaultCheckIn || toISODate(new Date(now + 14 * 86400000));
    const initialCheckOut = defaultCheckOut || toISODate(new Date(now + 19 * 86400000));

    // 1. Active Selection States
    const [selectedSlug, setSelectedSlug] = useState<string>(function () {
        const match = CANONICAL_SANCTUARIES.find(function (s) {
            return s.slug.toLowerCase() === preselectedSanctuary.toLowerCase() ||
                s.id.toLowerCase() === preselectedSanctuary.toLowerCase();
        });
        return match ? match.slug : CANONICAL_SANCTUARIES[0].slug;
    });

    const [checkInDate, setCheckInDate] = useState<string>(initialCheckIn);
    const [checkOutDate, setCheckOutDate] = useState<string>(initialCheckOut);
    const [adultsCount, setAdultsCount] = useState<number>(defaultGuests);
    const [suitesCount, setSuitesCount] = useState<number>(defaultSuites);
    const [privilegeCode, setPrivilegeCode] = useState<string>('SOVEREIGN');
    const [isPrivilegeApplied, setIsPrivilegeApplied] = useState<boolean>(true);

    // 2. Popover & Modal Overlay States
    const [activePopover, setActivePopover] = useState<'sanctuary' | 'party' | 'privilege' | null>(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

    // 3. Refs for Outside-Click Containment
    const containerRef = useRef<HTMLDivElement>(null);
    const calendarAnchorRef = useRef<HTMLDivElement>(null);

    // Synchronize if preselectedSanctuary changes from upstream
    useEffect(function () {
        if (preselectedSanctuary) {
            const found = CANONICAL_SANCTUARIES.find(function (s) {
                return s.slug.toLowerCase() === preselectedSanctuary.toLowerCase();
            });
            if (found) {
                setSelectedSlug(found.slug);
            }
        }
    }, [preselectedSanctuary]);

    // Close open popovers on outside interaction
    useEffect(function () {
        function handleDocumentMouseDown(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setActivePopover(null);
                setIsCalendarOpen(false);
            }
        }
        document.addEventListener('mousedown', handleDocumentMouseDown);
        return function () {
            document.removeEventListener('mousedown', handleDocumentMouseDown);
        };
    }, []);

    // Resolve active sanctuary object
    const activeSanctuary =
        CANONICAL_SANCTUARIES.find(function (s) {
            return s.slug === selectedSlug;
        }) || CANONICAL_SANCTUARIES[0];

    const nightsCount = computeDaysDifference(checkInDate, checkOutDate);

    // Form Submission Handler
    function handleDispatchSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Close any lingering popover
        setActivePopover(null);
        setIsCalendarOpen(false);

        if (onSearchSubmit) {
            onSearchSubmit({
                sanctuary: selectedSlug,
                checkIn: checkInDate,
                checkOut: checkOutDate,
                guests: adultsCount,
                suites: suitesCount,
                memberCode: isPrivilegeApplied ? privilegeCode : '',
            });
        }

        startTransition(function () {
            const params = new URLSearchParams({
                sanctuary: selectedSlug,
                checkIn: checkInDate,
                checkOut: checkOutDate,
                guests: String(adultsCount),
                suites: String(suitesCount),
            });

            if (isPrivilegeApplied && privilegeCode.trim()) {
                params.set('code', privilegeCode.trim());
            }

            router.push(`/accommodations?${params.toString()}`);
        });
    }

    return (
        <div
            ref={containerRef}
            className={`w-full mx-auto bg-white/95 backdrop-blur-2xl border border-[#ded9ce] shadow-[0_20px_54px_rgba(26,24,22,0.14)] p-4 sm:p-5 lg:p-6 transition-all duration-300 ${className}`}
        >
            <form onSubmit={handleDispatchSearch} className="space-y-4">
                {/* Master Console Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-3.5 items-stretch">
                    {/* ========================================================================= */}
                    {/* 1. SANCTUARY ENCLAVE SELECTOR (4 COLS)                                    */}
                    {/* ========================================================================= */}
                    <div className="relative lg:col-span-4">
                        <button
                            type="button"
                            onClick={function () {
                                setIsCalendarOpen(false);
                                setActivePopover(activePopover === 'sanctuary' ? null : 'sanctuary');
                            }}
                            className={`w-full h-full text-left p-4 sm:p-4.5 border transition-all duration-200 flex flex-col justify-between group focus:outline-hidden ${
                                activePopover === 'sanctuary'
                                    ? 'bg-[#f7f2e7] border-[#8e763b] ring-1 ring-[#8e763b]/30'
                                    : 'bg-[#fcfaf7] hover:bg-[#f6f2ea] border-[#e8e4dc]'
                            }`}
                        >
                            <div className="flex items-center justify-between w-full mb-1.5">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b]" />
                                    <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-[#8e763b]">
                                        SANCTUARY ENCLAVE
                                    </span>
                                </div>
                                <span className="px-2 py-0.5 rounded-xs bg-white border border-[#e2dcd2] text-[8.5px] font-mono tracking-wider uppercase text-[#8e763b] font-medium">
                                    {activeSanctuary.code}
                                </span>
                            </div>

                            <div>
                                <span className="font-serif text-[17px] sm:text-[18px] font-normal text-[#1f1e1d] block tracking-tight leading-snug truncate">
                                    {activeSanctuary.name}
                                </span>
                                <span className="block text-[11px] font-sans text-[#78756d] font-light mt-0.5 truncate">
                                    {activeSanctuary.regionTag} • {activeSanctuary.country} ({activeSanctuary.elevation})
                                </span>
                            </div>
                        </button>

                        {/* Sanctuary Selector Popover */}
                        {activePopover === 'sanctuary' && (
                            <div className="absolute top-[calc(100%+8px)] left-0 w-full sm:w-95 bg-white border border-[#ded9ce] shadow-[0_16px_40px_rgba(0,0,0,0.18)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                                <div className="px-3 py-2 border-b border-[#f0ece3] flex items-center justify-between">
                                    <span className="text-[9px] font-mono font-semibold uppercase tracking-[0.2em] text-[#8e763b]">
                                        GLOBAL RESIDENTIAL ESTATES
                                    </span>
                                    <span className="text-[9px] font-mono text-[#a4a098]">
                                        {CANONICAL_SANCTUARIES.length} SANCTUARIES
                                    </span>
                                </div>

                                <div className="space-y-1 mt-1.5 max-h-80 overflow-y-auto divide-y divide-[#f7f4ee]">
                                    {CANONICAL_SANCTUARIES.map(function (sanc) {
                                        const isSelected = sanc.slug === selectedSlug;
                                        return (
                                            <div
                                                key={sanc.id}
                                                role="button"
                                                tabIndex={0}
                                                onClick={function () {
                                                    setSelectedSlug(sanc.slug);
                                                    setActivePopover(null);
                                                }}
                                                onKeyDown={function (e) {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        setSelectedSlug(sanc.slug);
                                                        setActivePopover(null);
                                                    }
                                                }}
                                                className={`p-3.5 cursor-pointer transition-colors flex items-start justify-between gap-3 ${
                                                    isSelected
                                                        ? 'bg-[#f7f2e7] text-[#1f1e1d]'
                                                        : 'hover:bg-[#fcfaf7] text-[#4a4742]'
                                                }`}
                                            >
                                                <div className="space-y-0.5 text-left">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-serif text-[14.5px] font-medium text-[#1f1e1d]">
                                                            {sanc.name}
                                                        </span>
                                                        {isSelected && (
                                                            <span className="text-[#8e763b] text-xs font-semibold">
                                                                ✓
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-[11px] font-sans text-[#78756d] font-light">
                                                        {sanc.regionTag}, {sanc.country}
                                                    </p>
                                                    <span className="block text-[9px] font-mono text-[#a8a196] tracking-wider">
                                                        {sanc.coordinates}
                                                    </span>
                                                </div>

                                                <div className="text-right shrink-0">
                                                    <span className="px-1.5 py-0.5 text-[8.5px] font-mono font-medium text-[#8e763b] bg-white border border-[#ded9ce] rounded-xs">
                                                        {sanc.code}
                                                    </span>
                                                    <span className="block text-[8.5px] font-mono text-[#78756d] mt-1">
                                                        {sanc.elevation}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ========================================================================= */}
                    {/* 2. STAY HORIZON / CALENDAR POPUP TRIGGER (3 COLS)                         */}
                    {/* ========================================================================= */}
                    <div ref={calendarAnchorRef} className="relative lg:col-span-3">
                        <button
                            type="button"
                            onClick={function () {
                                setActivePopover(null);
                                setIsCalendarOpen(function (prev) {
                                    return !prev;
                                });
                            }}
                            className={`w-full h-full text-left p-4 sm:p-4.5 border transition-all duration-200 flex flex-col justify-between group focus:outline-hidden ${
                                isCalendarOpen
                                    ? 'bg-[#f7f2e7] border-[#8e763b] ring-1 ring-[#8e763b]/30'
                                    : 'bg-[#fcfaf7] hover:bg-[#f6f2ea] border-[#e8e4dc]'
                            }`}
                        >
                            <div className="flex items-center justify-between w-full mb-1.5">
                                <div className="flex items-center gap-2">
                                    <svg
                                        className="w-3.5 h-3.5 text-[#8e763b]"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <rect x="3" y="4" width="18" height="18" rx="1" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                    <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-[#8e763b]">
                                        STAY HORIZON
                                    </span>
                                </div>
                                <span className="px-2 py-0.5 rounded-xs bg-white border border-[#e2dcd2] text-[8.5px] font-mono tracking-wider uppercase text-[#8e763b] font-medium">
                                    {nightsCount} {nightsCount === 1 ? 'NIGHT' : 'NIGHTS'}
                                </span>
                            </div>

                            <div>
                                <span className="font-serif text-[16px] sm:text-[17px] font-normal text-[#1f1e1d] block tracking-tight truncate">
                                    {formatEditorialDate(checkInDate)}
                                </span>
                                <span className="block text-[11px] font-sans text-[#78756d] font-light mt-0.5 truncate">
                                    Until {formatEditorialDate(checkOutDate)}
                                </span>
                            </div>
                        </button>

                        {/* Calendar Popover Overlay */}
                        {isCalendarOpen && (
                            <div className="absolute top-[calc(100%+8px)] left-0 sm:-left-12 lg:-left-24 z-50 animate-in fade-in zoom-in-95 duration-150">
                                <DateRangeCalendar
                                    isOpen={isCalendarOpen}
                                    onClose={function () {
                                        setIsCalendarOpen(false);
                                    }}
                                    checkIn={checkInDate}
                                    checkOut={checkOutDate}
                                    onApplyDates={function (range) {
                                        setCheckInDate(range.checkIn);
                                        setCheckOutDate(range.checkOut);
                                        setIsCalendarOpen(false);
                                    }}
                                    onClearDates={function () {
                                        setCheckInDate('');
                                        setCheckOutDate('');
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* ========================================================================= */}
                    {/* 3. PATRONS & SUITE COMPOSITION (3 COLS)                                   */}
                    {/* ========================================================================= */}
                    <div className="relative lg:col-span-3">
                        <button
                            type="button"
                            onClick={function () {
                                setIsCalendarOpen(false);
                                setActivePopover(activePopover === 'party' ? null : 'party');
                            }}
                            className={`w-full h-full text-left p-4 sm:p-4.5 border transition-all duration-200 flex flex-col justify-between group focus:outline-hidden ${
                                activePopover === 'party'
                                    ? 'bg-[#f7f2e7] border-[#8e763b] ring-1 ring-[#8e763b]/30'
                                    : 'bg-[#fcfaf7] hover:bg-[#f6f2ea] border-[#e8e4dc]'
                            }`}
                        >
                            <div className="flex items-center justify-between w-full mb-1.5">
                                <div className="flex items-center gap-2">
                                    <svg
                                        className="w-3.5 h-3.5 text-[#8e763b]"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                    </svg>
                                    <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-[#8e763b]">
                                        PATRONS &amp; SUITES
                                    </span>
                                </div>
                                <span className="px-2 py-0.5 rounded-xs bg-white border border-[#e2dcd2] text-[8.5px] font-mono tracking-wider uppercase text-[#8e763b] font-medium">
                                    {suitesCount} {suitesCount === 1 ? 'SUITE' : 'SUITES'}
                                </span>
                            </div>

                            <div>
                                <span className="font-serif text-[16px] sm:text-[17px] font-normal text-[#1f1e1d] block tracking-tight truncate">
                                    {adultsCount} {adultsCount === 1 ? 'Adult Patron' : 'Adult Patrons'}
                                </span>
                                <span className="block text-[11px] font-sans text-[#78756d] font-light mt-0.5 truncate">
                                    Master Residential Allocation
                                </span>
                            </div>
                        </button>

                        {/* Party Stepper Popover */}
                        {activePopover === 'party' && (
                            <div className="absolute top-[calc(100%+8px)] left-0 w-full sm:w-[320px] bg-white border border-[#ded9ce] shadow-[0_16px_40px_rgba(0,0,0,0.18)] p-5 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-5">
                                <div className="border-b border-[#f0ece3] pb-3 flex items-center justify-between">
                                    <span className="text-[9.5px] font-mono font-semibold uppercase tracking-[0.22em] text-[#8e763b]">
                                        PATRON PARTY ALLOCATION
                                    </span>
                                    <span className="text-[9px] font-mono text-[#a4a098]">MAX 8</span>
                                </div>

                                <div className="space-y-4">
                                    {/* Adults Stepper */}
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <span className="font-serif text-[14px] text-[#1f1e1d] block">
                                                Adult Patrons
                                            </span>
                                            <span className="text-[10px] font-sans text-[#8e8a82]">
                                                Ages 16 and above
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-[#fcfaf7] border border-[#ded9ce] px-2 py-1 rounded-xs">
                                            <button
                                                type="button"
                                                onClick={function () {
                                                    setAdultsCount(Math.max(1, adultsCount - 1));
                                                }}
                                                className="w-7 h-7 flex items-center justify-center text-sm font-semibold hover:bg-[#eeeae2] transition-colors rounded-xs text-[#1f1e1d]"
                                                aria-label="Decrease adult patrons"
                                            >
                                                −
                                            </button>
                                            <span className="font-mono text-sm w-6 text-center font-semibold text-[#1f1e1d]">
                                                {adultsCount}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={function () {
                                                    setAdultsCount(Math.min(8, adultsCount + 1));
                                                }}
                                                className="w-7 h-7 flex items-center justify-center text-sm font-semibold hover:bg-[#eeeae2] transition-colors rounded-xs text-[#1f1e1d]"
                                                aria-label="Increase adult patrons"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Suites Count Stepper */}
                                    <div className="flex items-center justify-between pt-3 border-t border-[#f4f0e8]">
                                        <div className="space-y-0.5">
                                            <span className="font-serif text-[14px] text-[#1f1e1d] block">
                                                Residential Suites
                                            </span>
                                            <span className="text-[10px] font-sans text-[#8e8a82]">
                                                Individual floorplans
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-[#fcfaf7] border border-[#ded9ce] px-2 py-1 rounded-xs">
                                            <button
                                                type="button"
                                                onClick={function () {
                                                    setSuitesCount(Math.max(1, suitesCount - 1));
                                                }}
                                                className="w-7 h-7 flex items-center justify-center text-sm font-semibold hover:bg-[#eeeae2] transition-colors rounded-xs text-[#1f1e1d]"
                                                aria-label="Decrease suites count"
                                            >
                                                −
                                            </button>
                                            <span className="font-mono text-sm w-6 text-center font-semibold text-[#1f1e1d]">
                                                {suitesCount}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={function () {
                                                    setSuitesCount(Math.min(4, suitesCount + 1));
                                                }}
                                                className="w-7 h-7 flex items-center justify-center text-sm font-semibold hover:bg-[#eeeae2] transition-colors rounded-xs text-[#1f1e1d]"
                                                aria-label="Increase suites count"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-[#f0ece3] flex justify-end">
                                    <button
                                        type="button"
                                        onClick={function () {
                                            setActivePopover(null);
                                        }}
                                        className="px-5 py-2.5 bg-[#1f1e1d] hover:bg-[#343230] text-white text-[9.5px] font-mono font-semibold uppercase tracking-[0.2em] transition-all rounded-xs shadow-xs"
                                    >
                                        CONFIRM ALLOCATION
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ========================================================================= */}
                    {/* 4. PRIMARY DISPATCH CTA (2 COLS)                                          */}
                    {/* ========================================================================= */}
                    <div className="sm:col-span-2 lg:col-span-2 flex items-stretch">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full min-h-14.5 sm:min-h-16 bg-[rgb(44,40,22)] hover:bg-[#aa935e] active:bg-[#978250] text-white font-mono text-[11px] font-semibold uppercase tracking-[0.22em] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex flex-col items-center justify-center gap-1 group text-center cursor-pointer disabled:opacity-75"
                        >
                            <span className="flex items-center gap-2">
                                <span>{isPending ? 'CHECKING...' : 'RESERVE SUITE'}</span>
                                <span className="transform transition-transform duration-300 group-hover:translate-x-1 hover:bg-[#bfa76f]">
                                    →
                                </span>
                            </span>
                            <span className="text-[8.5px] font-mono font-light tracking-[0.16em] text-white/80 lowercase">
                                sovereign protocol
                            </span>
                        </button>
                    </div>
                </div>

                {/* ========================================================================= */}
                {/* 5. PRIVILEGE PROTOCOL & CODE SUB-BAR                                      */}
                {/* ========================================================================= */}
                <div className="pt-3 border-t border-[#f0ece3] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-sans text-[#6e6b64]">
                    {/* Left: Privilege Code & Verification Status */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className="p-1 rounded-full bg-[#f6f2ea] text-[#8e763b] shrink-0">
                                <svg
                                    className="w-3.5 h-3.5"
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
                            </span>
                            <span className="font-semibold text-[#1f1e1d] font-mono text-[10.5px] tracking-wider uppercase">
                                DIRECT SOVEREIGN PROTOCOL:
                            </span>
                        </div>

                        {/* Inline Code Input Pill */}
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#fcfaf7] border border-[#ded9ce] rounded-xs">
                            <span className="text-[9.5px] font-mono uppercase text-[#8e763b] font-semibold">
                                CODE:
                            </span>
                            <input
                                type="text"
                                value={privilegeCode}
                                onChange={function (e) {
                                    setPrivilegeCode(e.target.value.toUpperCase());
                                    setIsPrivilegeApplied(Boolean(e.target.value.trim()));
                                }}
                                placeholder="PROMO / KEY"
                                className="bg-transparent font-mono text-[10.5px] font-semibold text-[#1f1e1d] outline-hidden uppercase tracking-wider w-24"
                            />
                            {isPrivilegeApplied && (
                                <span className="text-[9px] font-mono font-semibold text-[#8e763b] bg-[#f7f2e7] px-1.5 py-0.5 border border-[#e8e4dc]">
                                    -15% COURTESY
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Right: Institutional Privileges */}
                    <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 text-[9.5px] font-mono uppercase tracking-wider text-[#8e8a82]">
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b]" />
                            <span>GUARANTEED LOWEST DIRECT TARIFF</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b]" />
                            <span>DEDICATED MAJORDOMO HOST</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b]" />
                            <span>CITRUS ORCHARD BREAKFAST</span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default BookingBar;
