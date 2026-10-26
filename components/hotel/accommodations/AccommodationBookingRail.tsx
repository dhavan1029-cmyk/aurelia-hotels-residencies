'use client'

import { useState } from 'react';
import Link from 'next/link';

import { AccommodationRateBreakdown } from '../types/accommodations';

function formatDateDisplay(isoString: string | null): string {
    if (
        !isoString ||
        (new Set(['check in', 'check out'])).has(isoString.toLowerCase())
    ) return 'Add date';

    const [year, month, day] = isoString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export interface AccommodationBookingRailProps {
    data: AccommodationRateBreakdown;
    onReserveDirect?: (bookingSummary: {
        checkIn: string;
        checkOut: string;
        nights: number;
        guests: number;
        total: number;
    }) => void;
    onDatesClick?: () => void;
    onPartyClick?: () => void;
    className?: string;
}

export function AccommodationBookingRail({
    data,
    onReserveDirect,
    onDatesClick,
    onPartyClick,
    className = '',
}: AccommodationBookingRailProps) {
    const {
        baseRateNightly,
        currencySymbol,
        checkInDate,
        checkOutDate,
        nightsCount: initialNights,
        guestsCount: initialGuests,
        maxGuests,
        vatRatePercentage,
        cityTaxPerGuestNight,
        bestRateGuaranteeText,
        complimentaryTransferHeadline,
        complimentaryTransferDetails,
    } = data;


    const [nights, setNights] = useState<number>(initialNights);
    const [guests, setGuests] = useState<number>(initialGuests);
    const [checkIn, setCheckIn] = useState<string>(checkInDate);
    const [checkOut, setCheckOut] = useState<string>(checkOutDate);

    // Dynamic mathematical folio calculation mapped to RateRule schema
    const roomSubtotal = baseRateNightly * nights;
    const vatAmount = Math.round(roomSubtotal * (vatRatePercentage / 100));
    const cityTaxTotal = cityTaxPerGuestNight * guests * nights;
    const grandTotal = roomSubtotal + vatAmount + cityTaxTotal;

    const handleReserveClick = () => {
        if (onReserveDirect) {
            onReserveDirect({
                checkIn,
                checkOut,
                nights,
                guests,
                total: grandTotal,
            });
        }
    };

    return (
        <aside
            className={`w-full bg-white border border-[#e8e4dc] rounded-lg p-6 sm:p-7 lg:p-8 shadow-[0_8px_32px_rgba(31,30,29,0.04)] text-[#1f1e1d] ${className}`}
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
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f2ede4] border border-[#ded9ce] text-[9px] font-sans font-semibold uppercase tracking-[0.16em] text-[#8e763b]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b] animate-pulse" />
                        AVAILABLE
                    </span>
                </div>
            </div>

            {/* 2. Interactive Date & Party Composition Selectors Box */}
            <div className="space-y-3 mb-6">
                {/* Stay Horizon Date Picker Box */}
                <div
                    onClick={onDatesClick}
                    className="p-3.5 bg-white border border-[#ded9ce] rounded-xl hover:border-[#8e763b] transition-all cursor-pointer shadow-2xs group"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e8a82] group-hover:text-[#8e763b] transition-colors">
                            STAY HORIZON
                        </span>
                        <span className="text-[10px] font-sans font-medium text-[#8e763b]">
                            {nights} Nights
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
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            <span>{formatDateDisplay(checkInDate)}</span>
                        </div>
                        <span className="text-[#a4a098]">→</span>
                        <div className="flex items-center gap-1.5">
                            <span>{formatDateDisplay(checkOutDate)}</span>
                        </div>
                    </div>
                </div>

                {/* Patrons & Suite Composition Box */}
                <div
                    onClick={onPartyClick}
                    className="p-3.5 bg-white border border-[#ded9ce] rounded-xl hover:border-[#8e763b] transition-all cursor-pointer shadow-2xs group"
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
                            <span>{guests} Discerning Guests</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-[#8e8a82]">
                            1 Master Suite
                        </span>
                    </div>
                </div>
            </div>

            {/* 3. Itemized Folio Breakdown Table */}
            <div className="space-y-3 pt-4 pb-5 border-t border-[#eeeae2] text-xs font-sans">
                <div className="flex items-center justify-between text-[#5f5c56]">
                    <span>
                        {currencySymbol}{baseRateNightly.toLocaleString()} × {nights} Nights
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
                        <span className="text-[10px] text-[#8e8a82]">(€5/night)</span>
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
                            All municipal dues & concierge services included
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
                    href={`/checkout?suite=azure-master-ocean-suite&nights=${nights}&guests=${guests}`}
                    onClick={handleReserveClick}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.22em] transition-all duration-300 shadow-md active:translate-y-0.5 text-center group"
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
            <div className="mt-6 pt-5 border-t border-[#eeeae2] flex items-start gap-3.5 p-4 rounded-xl bg-[#f6f2ea]/80 border">
                <div className="p-2 rounded-lg bg-white border border-[#ded9ce] shadow-2xs shrink-0 text-[#8e763b]">
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