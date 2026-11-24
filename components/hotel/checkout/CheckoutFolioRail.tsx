'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import DateRangeCalendar from '../DateRangeCalendar';
import { CurrencyCode, getCurrencySymbol, formatTariff } from '@/lib/data/currencyCatalog';

export interface FolioStayDetails {
    suiteId?: string;
    suiteName: string;
    suiteSlug: string;
    sanctuaryName: string;
    sanctuaryLocation: string;
    checkInDate: string;   // 'YYYY-MM-DD'
    checkOutDate: string;  // 'YYYY-MM-DD'
    nightsCount: number;
    guestsCount: number;
    baseRateNightly: number;
    currencyCode?: CurrencyCode | string;
    currencySymbol?: string;
    maxGuests?: number;
}

export interface FolioAddOnItem {
    id: string;
    title: string;
    cost: number;
    categoryTag?: string;
}

export interface PatronHostOnDuty {
    name: string;
    roleTag: string;
    statusText: string;
    directPhone: string;
    directEmail: string;
    avatarUrl?: string;
}

export interface CheckoutFolioRailData {
    stay: FolioStayDetails;
    currencySymbol?: string;
    currencyCode?: CurrencyCode | string;
    nightlyRate?: number;
    sovereignDiscountPercentage?: number;
    sovereignDiscountAmount?: number;
    environmentalAndHeritageTax?: number;
    host?: PatronHostOnDuty;
}

export interface CheckoutFolioRailProps {
    stayDetails: FolioStayDetails;
    selectedAddOns?: FolioAddOnItem[];
    sovereignCourtesyDiscountPercent?: number; // e.g. 15 for Sovereign Fellow
    returnHref?: string;
    vatRatePercentage?: number;
    cityTaxPerGuestNight?: number;
    isSubmitting?: boolean;
    onDatesChange?: (dates: { checkInDate: string; checkOutDate: string; nightsCount: number }) => void;
    onPartyChange?: (guestsCount: number) => void;
    className?: string;
}

function formatDateDisplay(isoString?: string | null): string {
    if (!isoString || (new Set(['check in', 'check out', 'add date'])).has(isoString.toLowerCase())) {
        return 'Add date';
    }
    const [year, month, day] = isoString.split('-').map(Number);
    if (!year || !month || !day) return isoString;
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export function CheckoutFolioRail({
    stayDetails,
    selectedAddOns = [],
    sovereignCourtesyDiscountPercent = 0,
    returnHref = '/accommodations',
    vatRatePercentage = 10,
    cityTaxPerGuestNight = 5,
    isSubmitting = false,
    onDatesChange,
    onPartyChange,
    className = '',
}: CheckoutFolioRailProps) {
    const {
        suiteName,
        sanctuaryName,
        sanctuaryLocation,
        checkInDate: initialCheckIn,
        checkOutDate: initialCheckOut,
        nightsCount: initialNights,
        guestsCount: initialGuests,
        baseRateNightly,
        currencyCode: rawCurrencyCode,
        maxGuests = 4,
    } = stayDetails;

    // Currency normalization via currencyCatalog
    const currencyCode = (rawCurrencyCode) as CurrencyCode;

    // Local reactive state for live in-rail modifications
    const [checkIn, setCheckIn] = useState<string>(initialCheckIn || '');
    const [checkOut, setCheckOut] = useState<string>(initialCheckOut || '');
    const [nights, setNights] = useState<number>(initialNights || 5);
    const [guests, setGuests] = useState<number>(initialGuests || 2);

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isPartyPopoverOpen, setIsPartyPopoverOpen] = useState(false);

    const dateContainerRef = useRef<HTMLDivElement>(null);
    const partyContainerRef = useRef<HTMLDivElement>(null);

    // Sync state if external stayDetails props change
    useEffect(function () {
        if (initialCheckIn) setCheckIn(initialCheckIn);
        if (initialCheckOut) setCheckOut(initialCheckOut);
        if (initialNights) setNights(initialNights);
        if (initialGuests) setGuests(initialGuests);
    }, [initialCheckIn, initialCheckOut, initialNights, initialGuests]);

    // Outside-click listener for calendar and party popovers
    useEffect(function () {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            if (dateContainerRef.current && !dateContainerRef.current.contains(target)) {
                setIsCalendarOpen(false);
            }
            if (partyContainerRef.current && !partyContainerRef.current.contains(target)) {
                setIsPartyPopoverOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Calendar Apply handler
    function handleApplyCalendar(range: { checkIn: string; checkOut: string; nights: number }) {
        setCheckIn(range.checkIn);
        setCheckOut(range.checkOut);
        setNights(range.nights);
        setIsCalendarOpen(false);
        if (onDatesChange) {
            onDatesChange({
                checkInDate: range.checkIn,
                checkOutDate: range.checkOut,
                nightsCount: range.nights,
            });
        }
    }

    function handleClearCalendar() {
        setCheckIn('');
        setCheckOut('');
        setNights(1);
    }

    function handleGuestsChange(newGuests: number) {
        setGuests(newGuests);
        if (onPartyChange) {
            onPartyChange(newGuests);
        }
    }

    // Mathematical Folio Computations
    const roomSubtotal = useMemo(function () {
        return baseRateNightly * nights;
    }, [baseRateNightly, nights]);

    const addOnsSubtotal = useMemo(function () {
        return selectedAddOns.reduce(function (sum, item) {
            return sum + item.cost;
        }, 0);
    }, [selectedAddOns]);

    const courtesyDiscountAmount = useMemo(function () {
        if (sovereignCourtesyDiscountPercent <= 0) return 0;
        return Math.round((roomSubtotal + addOnsSubtotal) * (sovereignCourtesyDiscountPercent / 100));
    }, [roomSubtotal, addOnsSubtotal, sovereignCourtesyDiscountPercent]);

    const taxableSubtotal = Math.max(0, roomSubtotal + addOnsSubtotal - courtesyDiscountAmount);
    const vatAmount = Math.round(taxableSubtotal * (vatRatePercentage / 100));
    const cityTaxTotal = cityTaxPerGuestNight * guests * nights;
    const grandFolioTotal = taxableSubtotal + vatAmount + cityTaxTotal;

    return (
        <aside
            aria-label="Guaranteed Stay Folio Ledger"
            className={`w-full bg-[#fcf9f4] border border-[#e8e4dc] p-5 sm:p-6 lg:p-7 shadow-[0_4px_24px_rgba(31,30,29,0.04)] text-[#1f1e1d] space-y-6 ${className}`}
        >
            {/* 1. Header: Sovereign Ledger Seal */}
            <div className="flex items-center justify-between border-b border-[#eeeae2] pb-4">
                <div>
                    <span className="text-[8.5px] font-mono font-semibold uppercase tracking-[0.24em] text-[#8e763b] block">
                        CONFIDENTIAL FOLIO • {currencyCode}
                    </span>
                    <h3 className="font-serif text-lg font-normal text-[#1f1e1d] tracking-tight">
                        Sanctuary Ledger
                    </h3>
                </div>
                <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#f2ede4] border border-[#ded9ce] text-[8.5px] font-mono uppercase tracking-[0.16em] text-[#8e763b]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b] animate-pulse" />
                        DIRECT SEAL
                    </span>
                </div>
            </div>

            {/* 2. Suite Summary & Sanctuary Identity */}
            <div className="space-y-1.5 pb-4 border-b border-[#eeeae2]">
                <div className="flex items-baseline justify-between">
                    <span className="font-serif text-base font-medium text-[#1f1e1d]">
                        {suiteName}
                    </span>
                    <Link
                        href={returnHref}
                        className="text-[10px] font-sans font-medium uppercase tracking-wider text-[#8e763b] hover:underline"
                    >
                        Change
                    </Link>
                </div>
                <p className="text-xs font-sans text-[#78756d]">
                    {sanctuaryName} • {sanctuaryLocation}
                </p>
                <div className="flex items-baseline gap-1.5 pt-1">
                    <span className="font-serif text-xl font-normal text-[#1f1e1d]">
                        {formatTariff(baseRateNightly, currencyCode)}
                    </span>
                    <span className="text-[11px] font-sans text-[#78756d]">/ night baseline</span>
                </div>
            </div>

            {/* 3. Interactive Stay Horizon & Patron Allocation Selectors */}
            <div className="space-y-3 pb-4 border-b border-[#eeeae2]">
                {/* 3A. Date Horizon Box with In-Rail Popover */}
                <div ref={dateContainerRef} className="relative">
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#8e8a82]">
                            STAY HORIZON
                        </span>
                        <button
                            type="button"
                            onClick={function () {
                                setIsCalendarOpen(function (prev) {
                                    return !prev;
                                });
                                setIsPartyPopoverOpen(false);
                            }}
                            className="text-[10px] font-sans font-medium text-[#8e763b] hover:text-[#1f1e1d] underline transition-colors cursor-pointer"
                        >
                            {isCalendarOpen ? 'Close Calendar' : 'Modify Dates'}
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={function () {
                            setIsCalendarOpen(function (prev) {
                                return !prev;
                            });
                            setIsPartyPopoverOpen(false);
                        }}
                        className={`w-full text-left p-3 bg-white border transition-all cursor-pointer shadow-2xs group ${
                            isCalendarOpen
                                ? 'border-[#8e763b] ring-1 ring-[#8e763b]/30 bg-[#faf8f5]'
                                : 'border-[#ded9ce] hover:border-[#8e763b]'
                        }`}
                    >
                        <div className="flex items-center justify-between text-xs font-sans font-medium text-[#1f1e1d]">
                            <div className="flex items-center gap-2 min-w-0">
                                <svg
                                    className="w-3.5 h-3.5 text-[#8e763b] shrink-0"
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
                                <span className="truncate">{formatDateDisplay(checkIn)}</span>
                            </div>

                            <span className="text-[#a4a098] px-1 shrink-0">→</span>

                            <div className="flex items-center gap-1.5 min-w-0 justify-end">
                                <span className="truncate">{formatDateDisplay(checkOut)}</span>
                            </div>
                        </div>

                        <div className="mt-1.5 flex items-center justify-between text-[10px] font-sans text-[#78756d]">
                            <span>Duration</span>
                            <span className="font-mono font-medium text-[#8e763b]">
                                {nights} {nights === 1 ? 'Night' : 'Nights'}
                            </span>
                        </div>
                    </button>

                    {/* Integrated DateRangeCalendar Popover */}
                    {isCalendarOpen && (
                        <div className="absolute top-[calc(100%+6px)] left-0 right-0 sm:left-auto sm:right-0 sm:w-85 z-50">
                            <DateRangeCalendar
                                isOpen={isCalendarOpen}
                                onClose={function () {
                                    setIsCalendarOpen(false);
                                }}
                                checkIn={checkIn}
                                checkOut={checkOut}
                                compact={true}
                                onApplyDates={handleApplyCalendar}
                                onClearDates={handleClearCalendar}
                            />
                        </div>
                    )}
                </div>

                {/* 3B. Patron Count Box with Stepper Popover */}
                <div ref={partyContainerRef} className="relative">
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#8e8a82]">
                            PATRONS ALLOCATION
                        </span>
                        <button
                            type="button"
                            onClick={function () {
                                setIsPartyPopoverOpen(function (prev) {
                                    return !prev;
                                });
                                setIsCalendarOpen(false);
                            }}
                            className="text-[10px] font-sans font-medium text-[#8e763b] hover:text-[#1f1e1d] underline transition-colors cursor-pointer"
                        >
                            {isPartyPopoverOpen ? 'Close' : 'Adjust Party'}
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={function () {
                            setIsPartyPopoverOpen(function (prev) {
                                return !prev;
                            });
                            setIsCalendarOpen(false);
                        }}
                        className={`w-full text-left p-3 bg-white border transition-all cursor-pointer shadow-2xs group ${
                            isPartyPopoverOpen
                                ? 'border-[#8e763b] ring-1 ring-[#8e763b]/30 bg-[#faf8f5]'
                                : 'border-[#ded9ce] hover:border-[#8e763b]'
                        }`}
                    >
                        <div className="flex items-center justify-between text-xs font-sans font-medium text-[#1f1e1d]">
                            <div className="flex items-center gap-2">
                                <svg
                                    className="w-3.5 h-3.5 text-[#8e763b] shrink-0"
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
                                <span>{guests} {guests === 1 ? 'Discerning Guest' : 'Discerning Guests'}</span>
                            </div>
                            <span className="text-[9.5px] uppercase tracking-wider text-[#8e8a82]">
                                Max {maxGuests}
                            </span>
                        </div>
                    </button>

                    {/* Integrated Party Stepper Popover */}
                    {isPartyPopoverOpen && (
                        <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-white border border-[#ded9ce] p-4 shadow-xl space-y-3 animate-in fade-in zoom-in-95">
                            <div className="flex items-center justify-between pb-2 border-b border-[#eeeae2]">
                                <span className="text-[8.5px] font-mono uppercase tracking-[0.2em] text-[#8e763b] font-semibold">
                                    PARTY COMPOSITION
                                </span>
                                <button
                                    type="button"
                                    onClick={function () {
                                        setIsPartyPopoverOpen(false);
                                    }}
                                    className="text-xs text-[#8e8a82] hover:text-[#1f1e1d] cursor-pointer"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="p-3 bg-[#fcf9f4] border border-[#ded9ce] flex items-center justify-between">
                                <div>
                                    <span className="font-serif text-sm font-semibold text-[#1f1e1d] block">
                                        Discerning Patrons
                                    </span>
                                    <span className="text-[10px] text-[#78756d] font-sans font-light">
                                        Suite occupancy limit: {maxGuests}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        disabled={guests <= 1}
                                        onClick={function () {
                                            handleGuestsChange(Math.max(1, guests - 1));
                                        }}
                                        className="w-7 h-7 bg-white border border-[#ded9ce] text-[#1f1e1d] flex items-center justify-center font-mono text-sm hover:bg-[#f6f2ea] disabled:opacity-30 cursor-pointer"
                                    >
                                        −
                                    </button>
                                    <span className="font-serif text-base font-bold min-w-5 text-center text-[#1f1e1d]">
                                        {guests}
                                    </span>
                                    <button
                                        type="button"
                                        disabled={guests >= maxGuests}
                                        onClick={function () {
                                            handleGuestsChange(Math.min(maxGuests, guests + 1));
                                        }}
                                        className="w-7 h-7 bg-white border border-[#ded9ce] text-[#1f1e1d] flex items-center justify-center font-mono text-sm hover:bg-[#f6f2ea] disabled:opacity-30 cursor-pointer"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end pt-1">
                                <button
                                    type="button"
                                    onClick={function () {
                                        setIsPartyPopoverOpen(false);
                                    }}
                                    className="px-3.5 py-1.5 bg-[#1f1e1d] hover:bg-[#343230] text-white text-[10px] font-sans font-semibold uppercase tracking-[0.16em] cursor-pointer"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 4. Itemized Folio Calculation Breakdown */}
            <div className="space-y-2.5 text-xs font-sans pb-4 border-b border-[#eeeae2]">
                <div className="flex items-center justify-between text-[#5f5c56]">
                    <span>
                        {formatTariff(baseRateNightly, currencyCode)} × {nights} {nights === 1 ? 'Night' : 'Nights'}
                    </span>
                    <span className="font-medium text-[#1f1e1d]">
                        {formatTariff(roomSubtotal, currencyCode)}
                    </span>
                </div>

                {/* Selected Bespoke Add-Ons */}
                {selectedAddOns.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                        <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-[#8e763b] block">
                            BESPOKE EXPERIENCES ({selectedAddOns.length})
                        </span>
                        {selectedAddOns.map(function (addOn) {
                            return (
                                <div key={addOn.id} className="flex items-center justify-between text-[#5f5c56] pl-2 text-[11.5px]">
                                    <span className="truncate pr-2">• {addOn.title}</span>
                                    <span className="font-medium text-[#1f1e1d] shrink-0">
                                        {formatTariff(addOn.cost, currencyCode)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Sovereign Courtesy Privilege Discount */}
                {courtesyDiscountAmount > 0 && (
                    <div className="flex items-center justify-between text-[#8e763b] pt-1">
                        <div className="flex items-center gap-1">
                            <span>Sovereign Courtesy Privilege</span>
                            <span className="text-[10px]">({sovereignCourtesyDiscountPercent}%)</span>
                        </div>
                        <span className="font-mono font-medium">
                            −{formatTariff(courtesyDiscountAmount, currencyCode)}
                        </span>
                    </div>
                )}

                {/* VAT Tax */}
                <div className="flex items-center justify-between text-[#5f5c56]">
                    <div className="flex items-center gap-1">
                        <span>Hospitality VAT</span>
                        <span className="text-[10px] text-[#8e8a82]">({vatRatePercentage}%)</span>
                    </div>
                    <span className="font-medium text-[#1f1e1d]">
                        {formatTariff(vatAmount, currencyCode)}
                    </span>
                </div>

                {/* Municipal Tourism Tax */}
                <div className="flex items-center justify-between text-[#5f5c56]">
                    <div className="flex items-center gap-1">
                        <span>Municipal Tourism Dues</span>
                        <span className="text-[10px] text-[#8e8a82]">({formatTariff(cityTaxPerGuestNight, currencyCode)}/guest/night)</span>
                    </div>
                    <span className="font-medium text-[#1f1e1d]">
                        {formatTariff(cityTaxTotal, currencyCode)}
                    </span>
                </div>
            </div>

            {/* 5. Total Guaranteed Folio Amount */}
            <div className="flex items-baseline justify-between pt-1 pb-1">
                <div>
                    <span className="block font-serif text-base font-semibold text-[#1f1e1d]">
                        Total Guaranteed Folio
                    </span>
                    <span className="text-[10px] font-sans text-[#78756d]">
                        All municipal taxes &amp; concierge dues sealed
                    </span>
                </div>
                <div className="text-right">
                    <span className="font-serif text-2xl font-normal text-[#1f1e1d] tracking-tight">
                        {formatTariff(grandFolioTotal, currencyCode)}
                    </span>
                </div>
            </div>

            {/* 6. Guarantee & Institutional Disclosures */}
            <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 p-3 bg-white border border-[#ded9ce] text-[11px] font-sans text-[#6e6b64]">
                    <svg
                        className="w-4 h-4 text-[#8e763b] shrink-0 mt-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <polyline points="9 12 11 14 15 10" />
                    </svg>
                    <div className="leading-snug">
                        <span className="font-semibold text-[#1f1e1d] block">
                            Direct Sanctuary Guarantee
                        </span>
                        Complimentary Riva tender transfer &amp; private majordomo greeting confirmed upon arrival.
                    </div>
                </div>

                <div className="text-center text-[10px] font-sans text-[#8e8a82]">
                    Need bespoke adjustments?{' '}
                    <a
                        href="tel:+39089875000"
                        className="text-[#1f1e1d] underline hover:text-[#8e763b] transition-colors"
                    >
                        Contact Head Majordomo Desk
                    </a>
                </div>
            </div>
        </aside>
    );
}

export default CheckoutFolioRail;
