'use client';

import React from 'react';
import Image from 'next/image';

export interface FolioStayDetails {
    suiteTitle: string;
    suiteCategoryBadge: string;
    villaLocation: string;
    heroImageUrl: string;
    checkInDateDisplay: string;
    checkInTimeDisplay: string;
    checkOutDateDisplay: string;
    checkOutTimeDisplay: string;
    nightsCount: number;
    guestsCount: number;
    roomTypeLabel: string;
}

export interface FolioRateLineItem {
    id: string;
    label: string;
    amount: number;
    isDiscount?: boolean;
    isComplimentary?: boolean;
    annotation?: string;
}

export interface FolioTrustGuarantee {
    cancellationHeadline: string;
    cancellationPolicy: string;
    privacyHeadline: string;
    privacyNote: string;
    liaisonHeadline: string;
    liaisonNote: string;
    compliancePill: string;
}

export interface PatronHostOnDuty {
    name: string;
    roleTag: string;
    statusText: string;
    directPhone: string;
    directEmail: string;
    avatarUrl: string;
}

export interface CheckoutFolioRailData {
    stay: FolioStayDetails;
    currencySymbol: string;
    currencyCode: string;
    nightlyRate: number;
    sovereignDiscountPercentage: number;
    sovereignDiscountAmount: number;
    environmentalAndHeritageTax: number;
    guarantees: FolioTrustGuarantee;
    host: PatronHostOnDuty;
}

export const checkoutFolioDefaultData: CheckoutFolioRailData = {
    stay: {
        suiteTitle: 'Azure Master Ocean Suite',
        suiteCategoryBadge: 'LEVEL IV OCEANFRONT RESIDENCE',
        villaLocation: 'Villa Aurelia • Amalfi Coastline',
        heroImageUrl: '/limestone-villa.png',
        checkInDateDisplay: 'Oct 14, 2025',
        checkInTimeDisplay: 'Tuesday, from 14:00',
        checkOutDateDisplay: 'Oct 19, 2025',
        checkOutTimeDisplay: 'Sunday, until 12:00',
        nightsCount: 5,
        guestsCount: 2,
        roomTypeLabel: '1 King Master Suite',
    },
    currencySymbol: '€',
    currencyCode: 'EUR',
    nightlyRate: 980,
    sovereignDiscountPercentage: 15,
    sovereignDiscountAmount: 735,
    environmentalAndHeritageTax: 442.5,
    guarantees: {
        cancellationHeadline: 'Flexible Cancellation Courtesy',
        cancellationPolicy:
            '100% refundable if amended or released prior to 23:59 CET, Oct 1, 2025.',
        privacyHeadline: 'Patron Privacy & Vault Clearance',
        privacyNote:
            'Encrypted booking records with zero third-party disclosure. Highest protocol adherence.',
        liaisonHeadline: 'Dedicated On-Property Majordomo',
        liaisonNote:
            'Continuous residential host allocation from harbor arrival through departure.',
        compliancePill: 'PCI-DSS Compliant • Sovereign Tier Secured',
    },
    host: {
        name: 'Matteo de Luca',
        roleTag: 'PATRON HOST ON DUTY',
        statusText: 'Direct Line • Standing by',
        directPhone: '+39089875000',
        directEmail: 'm.deluca@aureliahotels.com',
        avatarUrl: '/garden-pavillion.png',
    },
};

export interface ActiveAddOnItem {
    id: string;
    title: string;
    price: number;
}

export interface CheckoutFolioRailProps {
    data?: CheckoutFolioRailData;
    selectedAddOns?: ActiveAddOnItem[];
    onCallHost?: () => void;
    onMessageHost?: () => void;
    className?: string;
}

export function CheckoutFolioRail({
    data = checkoutFolioDefaultData,
    selectedAddOns = [
        {
            id: 'riva-harbor-transfer',
            title: 'Private Riva Yacht Harbor Transfer',
            price: 480,
        },
        {
            id: 'roman-thermal-grotto',
            title: 'Subterranean Roman Grotto Ritual',
            price: 240,
        },
    ],
    onCallHost,
    onMessageHost,
    className = '',
}: CheckoutFolioRailProps) {
    const {
        stay,
        currencySymbol,
        currencyCode,
        nightlyRate,
        sovereignDiscountPercentage,
        sovereignDiscountAmount,
        environmentalAndHeritageTax,
        guarantees,
        host,
    } = data;

    // Mathematical Financial Totals
    const roomSubtotal = nightlyRate * stay.nightsCount;
    const addOnsSubtotal = selectedAddOns.reduce(function (sum, item) {
        return sum + item.price;
    }, 0);
    const taxableSubtotal = roomSubtotal - sovereignDiscountAmount + addOnsSubtotal;
    const grandTotal = taxableSubtotal + environmentalAndHeritageTax;

    return (
        <aside className={`w-full space-y-6 ${className}`}>
            {/* 1. Main Sticky Folio Card */}
            <article className="bg-white border border-[#e8e4dc] -2xl overflow-hidden shadow-[0_8px_32px_rgba(31,30,29,0.04)]">
                {/* Suite Photographic Preview Header */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-[#eeeae2]">
                    <Image
                        src={stay.heroImageUrl}
                        alt={stay.suiteTitle}
                        fill
                        sizes="(max-width: 1024px) 100vw, 380px"
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

                    {/* Top Location Badge */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                        <span className="px-2.5 py-1 -sm bg-black/60 backdrop-blur-md text-white font-sans text-[9px] font-semibold uppercase tracking-[0.18em]">
                            {stay.suiteCategoryBadge}
                        </span>
                    </div>

                    {/* Bottom Title & Estate Location */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 text-white">
                        <h3 className="font-serif text-lg sm:text-xl font-normal tracking-tight text-white/95">
                            {stay.suiteTitle}
                        </h3>
                        <p className="text-[10px] font-sans text-[#dedad2] tracking-wider mt-0.5">
                            {stay.villaLocation}
                        </p>
                    </div>
                </div>

                {/* Stay Horizon & Calendar Timeline */}
                <div className="p-5 sm:p-6 border-b border-[#eeeae2] bg-[#f9f5ed]/50">
                    <div className="flex items-center justify-between text-[10px] font-sans uppercase tracking-[0.2em] text-[#8e763b] mb-3">
                        <span>STAY HORIZON</span>
                        <span className="text-[#8e8a82]">
                            {stay.nightsCount} NIGHTS STAY
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                        <div className="p-3 -xl bg-white border border-[#ded9ce] shadow-2xs">
                            <span className="text-[9px] uppercase tracking-wider text-[#8e8a82] block">
                                CHECK-IN
                            </span>
                            <span className="font-serif text-sm font-semibold text-[#1f1e1d] block mt-0.5">
                                {stay.checkInDateDisplay}
                            </span>
                            <span className="text-[10px] text-[#78756d] font-light mt-0.5 block">
                                {stay.checkInTimeDisplay}
                            </span>
                        </div>

                        <div className="p-3 -xl bg-white border border-[#ded9ce] shadow-2xs">
                            <span className="text-[9px] uppercase tracking-wider text-[#8e8a82] block">
                                CHECK-OUT
                            </span>
                            <span className="font-serif text-sm font-semibold text-[#1f1e1d] block mt-0.5">
                                {stay.checkOutDateDisplay}
                            </span>
                            <span className="text-[10px] text-[#78756d] font-light mt-0.5 block">
                                {stay.checkOutTimeDisplay}
                            </span>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] font-sans text-[#6e6b64] px-1">
                        <span>{stay.guestsCount} Adults</span>
                        <span>•</span>
                        <span>{stay.roomTypeLabel}</span>
                        <span>•</span>
                        <span className="text-[#8e763b] font-medium">Guaranteed Direct</span>
                    </div>
                </div>

                {/* Itemized Financial Folio Ledger */}
                <div className="p-5 sm:p-6 space-y-3.5 text-xs font-sans">
                    <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.24em] text-[#8e8a82] block mb-2">
                        ITEMIZED RESIDENTIAL FOLIO
                    </span>

                    {/* Suite Rate Row */}
                    <div className="flex items-start justify-between text-[#5f5c56] gap-2">
                        <div>
                            <span className="text-[#1f1e1d] font-medium">
                                {stay.suiteTitle}
                            </span>
                            <span className="block text-[10px] text-[#8e8a82]">
                                {currencySymbol}{nightlyRate.toLocaleString()} × {stay.nightsCount} nights
                            </span>
                        </div>
                        <span className="font-medium text-[#1f1e1d] shrink-0">
                            {currencySymbol}
                            {roomSubtotal.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </span>
                    </div>

                    {/* Sovereign Direct Privilege (15% discount) */}
                    <div className="flex items-start justify-between text-[#8e763b] gap-2 bg-[#f7f2e7]/70 -mx-2 px-2 py-1.5 -lg border border-[#e8dfcb]">
                        <div>
                            <span className="font-medium">
                                ☆ Sovereign Direct Privilege (-{sovereignDiscountPercentage}%)
                            </span>
                            <span className="block text-[9px] text-[#8e763b]/80">
                                Direct booking protocol applied
                            </span>
                        </div>
                        <span className="font-semibold shrink-0">
                            -{currencySymbol}
                            {sovereignDiscountAmount.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </span>
                    </div>

                    {/* Dynamic Add-Ons Rows */}
                    {selectedAddOns.map(function (addOn) {
                        return (
                            <div
                                key={addOn.id}
                                className="flex items-start justify-between text-[#5f5c56] gap-2"
                            >
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[#8e763b] text-xs">+</span>
                                    <span>{addOn.title}</span>
                                </div>
                                <span className="font-medium text-[#1f1e1d] shrink-0">
                                    {currencySymbol}
                                    {addOn.price.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </span>
                            </div>
                        );
                    })}

                    {/* Complimentary Resort & Concierge */}
                    <div className="flex items-center justify-between text-[#5f5c56] gap-2">
                        <span>Resort &amp; Dedicated 24/7 Concierge</span>
                        <span className="font-sans text-[10px] uppercase font-semibold text-[#24633b] tracking-wider">
                            COMPLIMENTARY
                        </span>
                    </div>

                    {/* Environmental & UNESCO Heritage Surcharge */}
                    <div className="flex items-center justify-between text-[#5f5c56] gap-2">
                        <div className="flex items-center gap-1">
                            <span>Regional Environmental &amp; UNESCO Heritage</span>
                            <span className="text-[10px] text-[#8e8a82]">(Tax)</span>
                        </div>
                        <span className="font-medium text-[#1f1e1d] shrink-0">
                            {currencySymbol}
                            {environmentalAndHeritageTax.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </span>
                    </div>

                    {/* Grand Total Bar */}
                    <div className="pt-4 border-t border-[#eeeae2] flex items-baseline justify-between gap-2">
                        <div>
                            <span className="font-serif text-base font-semibold text-[#1f1e1d] block">
                                Total Sovereign Investment
                            </span>
                            <span className="text-[10px] text-[#78756d] font-light block">
                                All VAT, port taxes, &amp; service charges included
                            </span>
                        </div>

                        <div className="text-right">
                            <span className="font-serif text-2xl sm:text-[28px] font-normal text-[#1f1e1d] tracking-tight block">
                                {currencySymbol}
                                {grandTotal.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                            <span className="text-[9px] font-mono text-[#8e763b] uppercase tracking-wider block">
                                {currencyCode} CURRENCY
                            </span>
                        </div>
                    </div>
                </div>

                {/* Trust & Guarantee Policies Strip */}
                <div className="p-5 sm:p-6 bg-[#f6f2ea] border-t border-[#ded9ce] space-y-3">
                    <div className="flex items-start gap-2.5">
                        <svg
                            className="w-4 h-4 text-[#8e763b] shrink-0 mt-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <div>
                            <span className="font-sans text-[11px] font-semibold text-[#1f1e1d] block">
                                {guarantees.cancellationHeadline}
                            </span>
                            <p className="text-[10px] text-[#6e6b64] font-sans font-light leading-relaxed">
                                {guarantees.cancellationPolicy}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                        <svg
                            className="w-4 h-4 text-[#8e763b] shrink-0 mt-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <div>
                            <span className="font-sans text-[11px] font-semibold text-[#1f1e1d] block">
                                {guarantees.privacyHeadline}
                            </span>
                            <p className="text-[10px] text-[#6e6b64] font-sans font-light leading-relaxed">
                                {guarantees.privacyNote}
                            </p>
                        </div>
                    </div>

                    <div className="pt-2 border-t border-[#ded9ce]/80 text-center">
                        <span className="inline-block text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b]">
                            {guarantees.compliancePill}
                        </span>
                    </div>
                </div>
            </article>

            {/* 2. Patron Host On Duty Card */}
            <div className="bg-[#1f1e1d] text-[#fcf9f4] border border-[#383530] -2xl p-4 sm:p-5 shadow-lg flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                    <div className="relative w-11 h-11 -full overflow-hidden border border-[#bfa76f] bg-[#2a2826] shrink-0">
                        <Image
                            src={host.avatarUrl}
                            alt={host.name}
                            fill
                            sizes="44px"
                            className="object-cover object-center"
                        />
                    </div>

                    <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="w-1.5 h-1.5 -full bg-emerald-400 animate-pulse" />
                            <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#bfa76f]">
                                {host.roleTag}
                            </span>
                        </div>
                        <h4 className="font-serif text-base font-normal text-white tracking-tight">
                            {host.name}
                        </h4>
                        <span className="text-[10px] text-[#a4a098] font-sans font-light">
                            {host.statusText}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <a
                        href={`tel:${host.directPhone}`}
                        onClick={onCallHost}
                        className="p-2.5 -xl bg-[#2a2826] hover:bg-[#383530] border border-[#44403a] text-[#bfa76f] transition-colors"
                        aria-label="Call Host on Duty"
                    >
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                    </a>

                    <a
                        href={`mailto:${host.directEmail}`}
                        onClick={onMessageHost}
                        className="p-2.5 -xl bg-[#2a2826] hover:bg-[#383530] border border-[#44403a] text-[#bfa76f] transition-colors"
                        aria-label="Email Host on Duty"
                    >
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </a>
                </div>
            </div>
        </aside>
    );
}