'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import DateRangeCalendar, { calculateNights } from '../DateRangeCalendar';
import type { AccommodationRateBreakdown } from '../types/accommodations';

function formatDateDisplay(isoString: string | null): string {
    if (
        !isoString ||
        (new Set(['check in', 'check out', 'add date'])).has(isoString.toLowerCase())
    ) return 'Add date';

    const [year, month, day] = isoString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function buildQueryString(params: Record<string, string | number | undefined | null>): string {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null && value !== '') {
            search.set(key, String(value));
        }
    }
    const query = search.toString();
    return query ? `?${query}` : '';
}

export interface AccommodationBookingRailProps {
    data: AccommodationRateBreakdown;
    suiteSlug: string;
    sanctuarySlug: string;
    onReserveDirect?: (bookingSummary: {
        checkIn: string;
        checkOut: string;
        nights: number;
        guests: number;
        total: number;
    }) => void;
    onDatesChange?: (range: { checkIn: string; checkOut: string; nights: number }) => void;
    onPartyChange?: (guests: number) => void;
    className?: string;
}

export function AccommodationBookingRail({
    data,
    suiteSlug,
    sanctuarySlug,
    onReserveDirect,
    onDatesChange,
    onPartyChange,
    className = '',
}: AccommodationBookingRailProps) {
    const {
        baseRateNightly,
        currencySymbol,
        checkInDate,
        checkOutDate,
        nightsCount: initialNights,
        guestsCount: initialGuests,
        maxGuests = 3,
        vatRatePercentage = 10,
        cityTaxPerGuestNight = 5,
        bestRateGuaranteeText = 'Guaranteed Best Sovereign Rate Direct',
        complimentaryTransferHeadline = 'Complimentary Helipad / Riva Tender Arrival',
        complimentaryTransferDetails = 'Included for reservations of 5 consecutive nights or greater.',
    } = data;

    const [nights, setNights] = useState<number>(initialNights || 5);
    const [guests, setGuests] = useState<number>(initialGuests || 2);
    const [checkIn, setCheckIn] = useState<string>(checkInDate || '');
    const [checkOut, setCheckOut] = useState<string>(checkOutDate || '');

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isPartyPopoverOpen, setIsPartyPopoverOpen] = useState(false);

    const dateContainerRef = useRef<HTMLDivElement>(null);
    const partyContainerRef = useRef<HTMLDivElement>(null);

    // Sync external props if data changes
    useEffect(function () {
        if (checkInDate) setCheckIn(checkInDate);
        if (checkOutDate) setCheckOut(checkOutDate);
        if (initialNights) setNights(initialNights);
        if (initialGuests) setGuests(initialGuests);
    }, [checkInDate, checkOutDate, initialNights, initialGuests]);

    // Handle outside clicks to close interactive popovers
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

    // Dynamic mathematical folio calculation mapped to RateRule schema
    const roomSubtotal = baseRateNightly * nights;
    const vatAmount = Math.round(roomSubtotal * (vatRatePercentage / 100));
    const cityTaxTotal = cityTaxPerGuestNight * guests * nights;
    const grandTotal = roomSubtotal + vatAmount + cityTaxTotal;

    function handleApplyCalendar(range: { checkIn: string; checkOut: string; nights: number }) {
        setCheckIn(range.checkIn);
        setCheckOut(range.checkOut);
        setNights(range.nights);
        setIsCalendarOpen(false);
        if (onDatesChange) {
            onDatesChange(range);
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

    const checkoutQuery = buildQueryString({
        accommodation: suiteSlug,
        sanctuary: sanctuarySlug,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        nightsCount: nights,
        guestsCount: guests,
    });

    const checkoutHref = `/checkout${checkoutQuery}`;

    function handleReserveClick() {
        if (onReserveDirect) {
            onReserveDirect({
                checkIn,
                checkOut,
                nights,
                guests,
                total: grandTotal,
            });
        }
    }

    return (
        <aside
            className={`w-full bg-white border border-[#e8e4dc] p-6 sm:p-7 lg:p-8 shadow-[0_8px_32px_rgba(31,30,29,0.04)] text-[#1f1e1d] ${className}`}
        >
            {/* 1. Header: Sovereign Nightly Tariff Headline */}
            <div className="flex items-baseline justify-between border-b border-[#eeeae2] pb-5 mb-6">
                <div>
                    <span className="block text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.24em] text-[#8e763b] mb-1">
                        SOVEREIGN TARIFF
                    </span>
                    <div className="flex items-baseline gap-1.5">
                        <span className="font-serif text-3xl sm:text-4xl font-normal text-[#1f1e1d] tracking-tight">
                            {currencySymbol}{baseRateNightly.toLocaleString()}
                        </span>
                        <span className="text-xs font-sans text-[#78756d] font-light">
                            / night
                        </span>
                    </div>
                </div>

                <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f2ede4] border border-[#ded9ce] text-[9px] font-sans font-semibold uppercase tracking-[0.16em] text-[#8e763b]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b] animate-pulse" />
                        AVAILABLE DIRECT
                    </span>
                </div>
            </div>

            {/* 2. Interactive Date & Party Composition Selectors Box */}
            <div className="space-y-3 mb-6">
                {/* 2A. Stay Horizon Date Picker Box with Embedded DateRangeCalendar Popover */}
                <div ref={dateContainerRef} className="relative">
                    <button
                        type="button"
                        onClick={function () {
                            setIsCalendarOpen(function (prev) {
                                return !prev;
                            });
                            setIsPartyPopoverOpen(false);
                        }}
                        className={`w-full relative text-left p-3.5 bg-white border transition-all cursor-pointer shadow-2xs group ${
                            isCalendarOpen
                                ? 'border-[#8e763b] ring-1 ring-[#8e763b]/30 bg-[#faf8f5]'
                                : 'border-[#ded9ce] hover:border-[#8e763b]'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e8a82] group-hover:text-[#8e763b] transition-colors">
                                STAY HORIZON • CALENDAR
                            </span>
                            <span className="text-[10px] font-mono font-medium text-[#8e763b]">
                                {nights} {nights === 1 ? 'Night' : 'Nights'}
                            </span>
                        </div>

                        <div className="mt-1.5 flex items-center justify-between text-xs sm:text-[13px] font-sans font-medium text-[#1f1e1d]">
                            <div className="flex items-center gap-2 min-w-0">
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
                                <span className="truncate">
                                    {formatDateDisplay(checkIn)}
                                </span>
                            </div>

                            <span className="text-[#a4a098] px-2 shrink-0">→</span>

                            <div className="flex items-center gap-1.5 min-w-0 justify-end">
                                <span className="truncate">
                                    {formatDateDisplay(checkOut)}
                                </span>
                            </div>
                        </div>
                    </button>

                    {/* Integrated DateRangeCalendar Popover */}
                    {isCalendarOpen && (
                        <div className="absolute top-[calc(100%+6px)] sm:w-85 z-50">
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

                {/* 2B. Patrons & Suite Composition Box with In-Rail Stepper */}
                <div ref={partyContainerRef} className="relative">
                    <button
                        type="button"
                        onClick={function () {
                            setIsPartyPopoverOpen(function (prev) {
                                return !prev;
                            });
                            setIsCalendarOpen(false);
                        }}
                        className={`w-full text-left p-3.5 bg-white border transition-all cursor-pointer shadow-2xs group ${
                            isPartyPopoverOpen
                                ? 'border-[#8e763b] ring-1 ring-[#8e763b]/30 bg-[#faf8f5]'
                                : 'border-[#ded9ce] hover:border-[#8e763b]'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e8a82] group-hover:text-[#8e763b] transition-colors">
                                PATRON PARTY
                            </span>
                            <span className="text-[10px] font-sans text-[#78756d]">
                                Max {maxGuests} Guests
                            </span>
                        </div>

                        <div className="mt-1.5 flex items-center justify-between text-xs sm:text-[13px] font-sans font-medium text-[#1f1e1d]">
                            <div className="flex items-center gap-2">
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
                                <span>{guests} {guests === 1 ? 'Discerning Guest' : 'Discerning Guests'}</span>
                            </div>
                            <span className="text-[10px] uppercase tracking-wider text-[#8e8a82]">
                                1 Master Suite
                            </span>
                        </div>
                    </button>

                    {/* Integrated Party Allocation Popover */}
                    {isPartyPopoverOpen && (
                        <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 bg-white border border-[#ded9ce] p-4 shadow-xl space-y-3 animate-in fade-in zoom-in-95">
                            <div className="flex items-center justify-between pb-2 border-b border-[#eeeae2]">
                                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8e763b] font-semibold">
                                    PATRONS ALLOCATION
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
                                        Adult Patrons
                                    </span>
                                    <span className="text-[10px] text-[#78756d] font-sans font-light">
                                        Max occupancy: {maxGuests}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2.5">
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
                                    className="px-4 py-2 bg-[#1f1e1d] hover:bg-[#343230] text-white text-[10px] font-sans font-semibold uppercase tracking-[0.18em] cursor-pointer"
                                >
                                    Confirm Patrons
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 3. Itemized Folio Breakdown Table */}
            <div className="space-y-3 pt-4 pb-5 border-t border-[#eeeae2] text-xs font-sans">
                <div className="flex items-center justify-between text-[#5f5c56]">
                    <span>
                        {currencySymbol}{baseRateNightly.toLocaleString()} × {nights} {nights === 1 ? 'Night' : 'Nights'}
                    </span>
                    <span className="font-medium text-[#1f1e1d]">
                        {currencySymbol}{roomSubtotal.toLocaleString()}
                    </span>
                </div>

                <div className="flex items-center justify-between text-[#5f5c56]">
                    <div className="flex items-center gap-1.5">
                        <span>Italian Hospitality VAT</span>
                        <span className="text-[10px] text-[#8e8a82]">({vatRatePercentage}%)</span>
                    </div>
                    <span className="font-medium text-[#1f1e1d]">
                        {currencySymbol}{vatAmount.toLocaleString()}
                    </span>
                </div>

                <div className="flex items-center justify-between text-[#5f5c56]">
                    <div className="flex items-center gap-1.5">
                        <span>Municipal Tourism Enclave Surcharge</span>
                        <span className="text-[10px] text-[#8e8a82]">(€{cityTaxPerGuestNight}/guest/night)</span>
                    </div>
                    <span className="font-medium text-[#1f1e1d]">
                        {currencySymbol}{cityTaxTotal.toLocaleString()}
                    </span>
                </div>

                <div className="pt-4 border-t border-[#eeeae2] flex items-baseline justify-between">
                    <div>
                        <span className="block font-serif text-base font-semibold text-[#1f1e1d]">
                            Total Guaranteed Folio
                        </span>
                        <span className="text-[10px] font-sans text-[#78756d]">
                            All municipal dues &amp; concierge services included
                        </span>
                    </div>
                    <span className="font-serif text-2xl sm:text-[26px] font-normal text-[#1f1e1d] tracking-tight">
                        {currencySymbol}{grandTotal.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* 4. Sovereign Direct Reserve CTA & Guarantee Badge */}
            <div className="mt-5 space-y-3.5">
                <Link
                    href={checkoutHref}
                    onClick={handleReserveClick}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.22em] transition-all duration-300 shadow-md active:translate-y-0.5 text-center group cursor-pointer"
                >
                    <span>RESERVE SANCTUARY DIRECT</span>
                    <span className="text-sm font-normal transform transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </Link>

                <div className="flex items-center justify-center gap-2 text-center">
                    <svg
                        className="w-3.5 h-3.5 text-[#8e763b] shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <polyline points="9 12 11 14 15 10" />
                    </svg>
                    <span className="text-[9px] font-sans font-medium uppercase tracking-[0.18em] text-[#8e763b]">
                        {bestRateGuaranteeText}
                    </span>
                </div>
            </div>

            {/* 5. Complimentary Helipad / Riva Tender Arrival Card */}
            <div className="mt-6 pt-5 border-t border-[#eeeae2] flex items-start gap-3.5 p-4 bg-[#f6f2ea]/80 border">
                <div className="p-2 bg-white border border-[#ded9ce] shadow-2xs shrink-0 text-[#8e763b]">
                    <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 15h18M3 9h18M5 19l2-4M19 19l-2-4M5 5l2 4M19 5l-2 4" />
                    </svg>
                </div>
                <div className="flex flex-col">
                    <span className="font-sans text-xs font-semibold text-[#1f1e1d] tracking-tight">
                        {complimentaryTransferHeadline}
                    </span>
                    <p className="text-[11px] text-[#6e6b64] font-sans font-light mt-0.5 leading-relaxed">
                        {complimentaryTransferDetails}
                    </p>
                </div>
            </div>

            {/* 6. Contact Dedicated Majordomo Desk */}
            <div className="mt-4 text-center">
                <span className="text-[11px] font-sans text-[#78756d]">
                    Custom stay requirements?{' '}
                    <a
                        href="tel:+39089875000"
                        className="underline text-[#1f1e1d] hover:text-[#8e763b] transition-colors"
                    >
                        Speak with our Head Majordomo
                    </a>
                </span>
            </div>
        </aside>
    );
}

export default AccommodationBookingRail;
