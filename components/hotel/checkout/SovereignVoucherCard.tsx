import React from 'react';
import Image from 'next/image';

export interface VoucherStayDates {
    suiteTitle: string;
    suiteUnitBadge: string;
    viewOrientation: string;
    squareMeters: number;
    checkInDate: string;
    checkInDetails: string;
    checkOutDate: string;
    checkOutDetails: string;
    nightsCount: number;
    guestsCount: number;
}

export interface VoucherInclusion {
    id: string;
    title: string;
    description: string;
}

export interface VoucherFolioAccounting {
    currencySymbol: string;
    currencyCode: string;
    suiteTariffTotal: number;
    rivaTenderTransferLabel: string;
    cityTaxAndResortDues: number;
    hospitalityVatPercentage: number;
    hospitalityVatAmount: number;
    grandTotal: number;
    paymentStatusBadge: string;
    vatInvoiceNumber: string;
}

export interface ResidenceHostLiaison {
    name: string;
    title: string;
    avatarUrl?: string;
}

export interface SovereignVoucherCardData {
    folioHeaderEyebrow: string;
    voucherTitle: string;
    settlementBadgeText: string;
    cardLastFour: string;
    cardIssuer: string;
    stay: VoucherStayDates;
    inclusionsHeadline: string;
    inclusions: VoucherInclusion[];
    assignedHost: ResidenceHostLiaison;
    accounting: VoucherFolioAccounting;
}

export const sovereignVoucherDefaultData: SovereignVoucherCardData = {
    folioHeaderEyebrow: 'OFFICIAL GUEST FOLIO',
    voucherTitle: 'The Sovereign Residence Voucher',
    settlementBadgeText: 'PAYMENT SETTLEMENT • Fully Guaranteed',
    cardLastFour: '4092',
    cardIssuer: 'Sovereign Titanium',
    stay: {
        suiteTitle: 'The Azure Master Ocean Suite',
        suiteUnitBadge: 'Suite 402',
        viewOrientation: 'Cliffside Panorama',
        squareMeters: 165,
        checkInDate: 'Tue Oct 14, 2025',
        checkInDetails: 'Guaranteed early entry from 15:00',
        checkOutDate: 'Sun Oct 19, 2025',
        checkOutDetails: 'Leisure departure until 14:00',
        nightsCount: 5,
        guestsCount: 2,
    },
    inclusionsHeadline: 'SOVEREIGN TIER PRIVILEGES',
    inclusions: [
        {
            id: 'riva-transfer',
            title: 'Private Riva Yacht Harbor Transfer',
            description: 'Direct maritime tender from Naples Mergellina Harbor to private Aurelia slipway.',
        },
        {
            id: 'thermal-circuit',
            title: 'Subterranean Roman Bath Circuit',
            description: 'Unlimited access to the volcanic stone caldarium and hydrotherapy pools.',
        },
        {
            id: 'orchard-breakfast',
            title: 'Artisanal Mediterranean Breakfast',
            description: 'Fresh citrus pressings and orchard delicacies served daily in-suite or loggia.',
        },
        {
            id: 'majordomo-service',
            title: '24-Hour Residential Majordomo',
            description: 'Continuous private butler attention, unpacking ceremony, and sommelier consultations.',
        },
    ],
    assignedHost: {
        name: 'Elena Vance',
        title: 'Head of Hospitality & Residential Concierge',
        avatarUrl: '/images/hosts/elena-vance.jpg',
    },
    accounting: {
        currencySymbol: '€',
        currencyCode: 'EUR',
        suiteTariffTotal: 4450.00,
        rivaTenderTransferLabel: 'Complimentary',
        cityTaxAndResortDues: 392.50,
        hospitalityVatPercentage: 10,
        hospitalityVatAmount: 485.00,
        grandTotal: 5327.50,
        paymentStatusBadge: 'PAID IN FULL',
        vatInvoiceNumber: 'INV-AUR-89240',
    },
};

export interface SovereignVoucherCardProps {
    data?: SovereignVoucherCardData;
    onViewInvoice?: () => void;
    className?: string;
}

export function SovereignVoucherCard({
    data = sovereignVoucherDefaultData,
    onViewInvoice,
    className = '',
}: SovereignVoucherCardProps) {
    const {
        folioHeaderEyebrow,
        voucherTitle,
        settlementBadgeText,
        cardLastFour,
        cardIssuer,
        stay,
        inclusionsHeadline,
        inclusions,
        assignedHost,
        accounting,
    } = data;

    return (
        <article
            className={`w-full max-w-280 mx-auto bg-[#fcf9f4] border border-[#e8e4dc] rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_rgba(31,30,29,0.04)] overflow-hidden ${className}`}
        >
            {/* Top Folio Header Bar */}
            <div className="px-6 sm:px-10 py-5 bg-[#f6f2ea] border-b border-[#ded9ce] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8e763b]" />
                    <div>
                        <span className="block text-[9px] font-sans font-semibold uppercase tracking-[0.24em] text-[#8e8a82]">
                            {folioHeaderEyebrow}
                        </span>
                        <h2 className="font-serif text-lg sm:text-xl font-normal text-[#1f1e1d] tracking-tight">
                            {voucherTitle}
                        </h2>
                    </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <div className="px-3 py-1.5 rounded-lg bg-white border border-[#ded9ce] text-[10px] font-sans text-[#5c5952] flex items-center gap-2 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="font-medium text-[#1f1e1d] uppercase tracking-wider">
                            {settlementBadgeText}
                        </span>
                        <span className="text-[#a4a098]">•</span>
                        <span className="font-mono text-[#8e763b]">
                            {cardIssuer} •••• {cardLastFour}
                        </span>
                    </div>
                </div>
            </div>

            {/* 3-Column Itemized Monograph Grid */}
            <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                {/* COLUMN 1: Sanctuary & Horizon Details (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div>
                        <span className="block text-[9px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e763b] mb-1.5">
                            SANCTUARY & CHAMBER
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1f1e1d] tracking-tight">
                            {stay.suiteTitle}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="px-2.5 py-0.5 rounded bg-[#f6f2ea] border border-[#ded9ce] text-[10px] font-sans font-semibold text-[#8e763b] uppercase tracking-wider">
                                {stay.suiteUnitBadge}
                            </span>
                            <span className="text-xs text-[#78756d] font-sans font-light">
                                {stay.viewOrientation} • {stay.squareMeters} m²
                            </span>
                        </div>
                    </div>

                    {/* Stay Dates Box */}
                    <div className="space-y-3 pt-4 border-t border-[#eeeae2]">
                        <span className="block text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e8a82]">
                            STAY HORIZON
                        </span>

                        <div className="p-3.5 rounded-xl bg-white border border-[#ded9ce] shadow-2xs space-y-1">
                            <span className="text-[9px] font-sans uppercase tracking-wider text-[#8e8a82] block">
                                ARRIVAL CHECK-IN
                            </span>
                            <span className="font-serif text-sm font-semibold text-[#1f1e1d] block">
                                {stay.checkInDate}
                            </span>
                            <span className="text-[11px] font-sans text-[#78756d] font-light block">
                                {stay.checkInDetails}
                            </span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white border border-[#ded9ce] shadow-2xs space-y-1">
                            <span className="text-[9px] font-sans uppercase tracking-wider text-[#8e8a82] block">
                                DEPARTURE CHECK-OUT
                            </span>
                            <span className="font-serif text-sm font-semibold text-[#1f1e1d] block">
                                {stay.checkOutDate}
                            </span>
                            <span className="text-[11px] font-sans text-[#78756d] font-light block">
                                {stay.checkOutDetails}
                            </span>
                        </div>

                        <div className="pt-2 flex items-center justify-between text-xs font-sans text-[#5c5952] px-1">
                            <span>Duration: <strong>{stay.nightsCount} Nights</strong></span>
                            <span>•</span>
                            <span>Party: <strong>{stay.guestsCount} Discerning Patrons</strong></span>
                        </div>
                    </div>
                </div>

                {/* COLUMN 2: Curated Privileges & Assigned Liaison (4 Cols) */}
                <div className="lg:col-span-4 space-y-6 lg:border-l lg:border-r border-[#eeeae2] lg:px-8">
                    <div>
                        <span className="block text-[9px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e763b] mb-1.5">
                            INCLUDED RESIDENTIAL PRIVILEGES
                        </span>
                        <h4 className="font-serif text-lg font-normal text-[#1f1e1d] tracking-tight">
                            {inclusionsHeadline}
                        </h4>
                    </div>

                    <div className="space-y-3.5 text-xs font-sans">
                        {inclusions.map(function (item) {
                            return (
                                <div key={item.id} className="flex items-start gap-2.5">
                                    <svg
                                        className="w-4 h-4 text-[#8e763b] shrink-0 mt-0.5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <div>
                                        <span className="font-medium text-[#1f1e1d] block">
                                            {item.title}
                                        </span>
                                        <span className="text-[11px] text-[#6e6b64] font-light leading-snug block mt-0.5">
                                            {item.description}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Assigned Majordomo Liaison Badge */}
                    <div className="pt-4 border-t border-[#eeeae2] flex items-center gap-3 p-3.5 rounded-xl bg-white border shadow-2xs">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#eeeae2] border border-[#dcdad5] shrink-0">
                            {assignedHost.avatarUrl ? (
                                <Image
                                    src={assignedHost.avatarUrl}
                                    alt={assignedHost.name}
                                    fill
                                    sizes="40px"
                                    className="object-cover object-center"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center font-serif text-xs font-bold text-[#1f1e1d]">
                                    EV
                                </div>
                            )}
                        </div>
                        <div className="min-w-0">
                            <span className="text-[9px] font-sans uppercase tracking-[0.18em] text-[#8e763b] block">
                                ASSIGNED RESIDENCE HOST
                            </span>
                            <span className="font-serif text-sm font-semibold text-[#1f1e1d] truncate block">
                                {assignedHost.name}
                            </span>
                            <span className="text-[10px] text-[#78756d] font-sans font-light truncate block">
                                {assignedHost.title}
                            </span>
                        </div>
                    </div>
                </div>

                {/* COLUMN 3: Itemized Folio Investment & Settlement (4 Cols) */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                    <div>
                        <span className="block text-[9px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e763b] mb-1.5">
                            SETTLED FINANCIAL FOLIO
                        </span>
                        <h4 className="font-serif text-lg font-normal text-[#1f1e1d] tracking-tight">
                            Investment Breakdown
                        </h4>

                        <div className="mt-4 space-y-3 text-xs font-sans">
                            {/* Suite Tariff */}
                            <div className="flex items-center justify-between text-[#5f5c56]">
                                <span>Suite Tariff ({stay.nightsCount} Nights)</span>
                                <span className="font-medium text-[#1f1e1d]">
                                    {accounting.currencySymbol}
                                    {accounting.suiteTariffTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>

                            {/* Riva Harbor Transit */}
                            <div className="flex items-center justify-between text-[#5f5c56]">
                                <span>Riva Tender Transfer</span>
                                <span className="font-medium text-[#24633b] uppercase text-[10px] tracking-wider">
                                    {accounting.rivaTenderTransferLabel}
                                </span>
                            </div>

                            {/* City Tax & Dues */}
                            <div className="flex items-center justify-between text-[#5f5c56]">
                                <span>Positano City Tax & Resort Dues</span>
                                <span className="font-medium text-[#1f1e1d]">
                                    {accounting.currencySymbol}
                                    {accounting.cityTaxAndResortDues.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>

                            {/* VAT */}
                            <div className="flex items-center justify-between text-[#5f5c56]">
                                <span>Italian Hospitality VAT ({accounting.hospitalityVatPercentage}%)</span>
                                <span className="font-medium text-[#1f1e1d]">
                                    {accounting.currencySymbol}
                                    {accounting.hospitalityVatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>

                            {/* Grand Total */}
                            <div className="pt-4 border-t border-[#ded9ce] flex items-baseline justify-between">
                                <div>
                                    <span className="font-serif text-sm font-semibold text-[#1f1e1d] block">
                                        Total Settled Folio
                                    </span>
                                    <span className="text-[10px] text-[#78756d] font-sans font-light">
                                        All taxes & statutory dues included
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="font-serif text-2xl font-bold text-[#1f1e1d] block leading-none">
                                        {accounting.currencySymbol}
                                        {accounting.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#8e763b] mt-1 block">
                                        {accounting.currencyCode} SETTLED
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Settlement Badges Strip */}
                    <div className="pt-4 border-t border-[#eeeae2] flex items-center justify-between">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#e9f5ee] border border-[#badfca] text-[#24633b] font-sans text-[10px] font-semibold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#24633b]" />
                            <span>{accounting.paymentStatusBadge}</span>
                        </div>

                        <button
                            type="button"
                            onClick={onViewInvoice}
                            className="font-mono text-[10px] text-[#78756d] hover:text-[#1f1e1d] uppercase tracking-wider underline cursor-pointer transition-colors"
                        >
                            {accounting.vatInvoiceNumber}
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
