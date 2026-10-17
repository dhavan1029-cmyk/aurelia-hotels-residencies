'use client'

import React, { useState } from 'react';
import Link from 'next/link';


export interface PillowOption {
    id: 'bespoke-goose-down' | 'organic-latex-wool' | 'mulberry-silk-fill';
    title: string;
    description: string;
    badge?: string;
    loftTag: string;
}

export interface AddOnItem {
    id: string;
    itemType: 'BESPOKE_TRANSFER' | 'SPA_TREATMENT' | 'CUSTOM_ADD_ON';
    badge: string;
    title: string;
    description: string;
    price: number;
    currencySymbol: string;
    pricingUnit: string; // e.g. "per direction", "couples ritual", "sanctuary welcome"
    defaultSelected: boolean;
}

export interface SovereignVoucherData {
    badge: string;
    benefitTag: string;
    headline: string;
    discountAmount: number;
    currencySymbol: string;
    promoCode: string;
    termsNote: string;
}

export interface ComfortAndAddOnsData {
    // Section 3: Sanctuary Comfort & Pillow Architecture
    comfortSectionNumber: string;
    comfortHeading: string;
    comfortSubtitle: string;
    pillowOptions: PillowOption[];
    defaultPillowId: PillowOption['id'];
    initialTemperatureCelsius: number;
    minTemperatureCelsius: number;
    maxTemperatureCelsius: number;
    temperatureStep: number;
    climateNotice: string;

    // Section 4: Curated Sanctuary Add-Ons
    addOnsSectionNumber: string;
    addOnsHeading: string;
    addOnsBadge: string;
    addOnsSubtitle: string;
    addOns: AddOnItem[];

    // Sovereign Voucher Benefit Banner
    voucher: SovereignVoucherData;

    // Bottom Navigation
    returnHref: string;
    returnLabel: string;
    submitLabel: string;
}

export const checkoutComfortAndAddOnsDefaultData: ComfortAndAddOnsData = {
    comfortSectionNumber: '3',
    comfortHeading: 'Sanctuary Comfort & Pillow Architecture',
    comfortSubtitle: 'Tailored bedroom ergonomics crafted for deep Mediterranean rest.',
    pillowOptions: [
        {
            id: 'bespoke-goose-down',
            title: 'Bespoke Goose Down',
            description: 'Dual-chamber Hungarian goose down, 800-fill power cloud loft.',
            badge: 'SIGNATURE AURELIA',
            loftTag: 'PLUSH • 800 FP',
        },
        {
            id: 'organic-latex-wool',
            title: 'Organic Latex & Wool',
            description: 'Ergonomic cervical contour with temperature-neutral breathability.',
            badge: 'ANATOMICAL CONTOUR',
            loftTag: 'MEDIUM • BOTANICAL',
        },
        {
            id: 'mulberry-silk-fill',
            title: 'Mulberry Silk Fill',
            description: 'Naturally hypoallergenic, ultra-soft support with pure silk casing.',
            badge: 'HYPOALLERGENIC',
            loftTag: 'FEATHERWEIGHT',
        },
    ],
    defaultPillowId: 'bespoke-goose-down',
    initialTemperatureCelsius: 21.0,
    minTemperatureCelsius: 18.0,
    maxTemperatureCelsius: 24.5,
    temperatureStep: 0.5,
    climateNotice: 'Pre-cooled using silent geothermal radiant cooling coils before your entry.',

    addOnsSectionNumber: '4',
    addOnsHeading: 'Curated Sanctuary Add-Ons',
    addOnsBadge: 'AURELIA RESERVE',
    addOnsSubtitle: 'Bespoke marine transits, subterranean grottos, and cellar reserves.',
    addOns: [
        {
            id: 'riva-harbor-transfer',
            itemType: 'BESPOKE_TRANSFER',
            badge: 'VIP MARINE ENTRY',
            title: 'Private Riva Aquarama Harbor Transfer',
            description: 'Direct maritime tender from Naples or Capri to the Aurelia private dock.',
            price: 480,
            currencySymbol: '€',
            pricingUnit: 'per direction',
            defaultSelected: true,
        },
        {
            id: 'roman-thermal-grotto',
            itemType: 'SPA_TREATMENT',
            badge: 'PRIVATE GROTTO',
            title: 'Subterranean Roman Thermal Bath Ritual for Two',
            description: 'Private 90-minute volcanic stone caldarium soak, steam cave, & neroli massage.',
            price: 240,
            currencySymbol: '€',
            pricingUnit: 'couples ritual',
            defaultSelected: true,
        },
        {
            id: 'sommelier-reserve-champagne',
            itemType: 'CUSTOM_ADD_ON',
            badge: 'CELLAR SELECT',
            title: 'Sommelier Reserve Champagne on Arrival',
            description: 'Chilled bottle of Dom Pérignon 2012 Vintage with artisan Campanian cicchetti.',
            price: 190,
            currencySymbol: '€',
            pricingUnit: 'sanctuary welcome',
            defaultSelected: false,
        },
    ],

    voucher: {
        badge: 'SOVEREIGN PRIVILEGE VERIFIED',
        benefitTag: '15% PATRON BENEFIT',
        headline: 'APPLIED: -€735.00',
        discountAmount: 735,
        currencySymbol: '€',
        promoCode: 'AURELIA-PRIVILEGE',
        termsNote: 'Promo code AURELIA-PRIVILEGE credited against residential folio. Sovereign key guarantee honored.',
    },

    returnHref: '/accommodations/azure-master-ocean-suite',
    returnLabel: 'Return to Sanctuary Selection',
    submitLabel: 'Continue to Bespoke Enhancements & Guarantee',
};

export interface ComfortAndAddOnsValues {
    selectedPillowId: PillowOption['id'];
    temperatureCelsius: number;
    selectedAddOnIds: string[];
}

export interface ComfortAndAddOnsProps {
    data?: ComfortAndAddOnsData;
    onChange?: (values: ComfortAndAddOnsValues) => void;
    onSubmit?: (values: ComfortAndAddOnsValues) => void;
    className?: string;
}

export function ComfortAndAddOnsSection({
    data = checkoutComfortAndAddOnsDefaultData,
    onChange,
    onSubmit,
    className = '',
}: ComfortAndAddOnsProps) {
    const {
        comfortSectionNumber,
        comfortHeading,
        comfortSubtitle,
        pillowOptions,
        defaultPillowId,
        initialTemperatureCelsius,
        minTemperatureCelsius,
        maxTemperatureCelsius,
        temperatureStep,
        climateNotice,
        addOnsSectionNumber,
        addOnsHeading,
        addOnsBadge,
        addOnsSubtitle,
        addOns,
        voucher,
        returnHref,
        returnLabel,
        submitLabel,
    } = data;

    // Local Component State
    const [selectedPillowId, setSelectedPillowId] = useState<PillowOption['id']>(defaultPillowId);
    const [temperatureCelsius, setTemperatureCelsius] = useState<number>(initialTemperatureCelsius);
    const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>(function () {
        return addOns.filter((a) => a.defaultSelected).map((a) => a.id);
    });

    const notifyChange = (updated: Partial<ComfortAndAddOnsValues>) => {
        if (onChange) {
            onChange({
                selectedPillowId,
                temperatureCelsius,
                selectedAddOnIds,
                ...updated,
            });
        }
    };

    const handlePillowSelect = (pillowId: PillowOption['id']) => {
        setSelectedPillowId(pillowId);
        notifyChange({ selectedPillowId: pillowId });
    };

    const handleTemperatureDecrease = () => {
        if (temperatureCelsius > minTemperatureCelsius) {
            const nextTemp = Math.round((temperatureCelsius - temperatureStep) * 10) / 10;
            setTemperatureCelsius(nextTemp);
            notifyChange({ temperatureCelsius: nextTemp });
        }
    };

    const handleTemperatureIncrease = () => {
        if (temperatureCelsius < maxTemperatureCelsius) {
            const nextTemp = Math.round((temperatureCelsius + temperatureStep) * 10) / 10;
            setTemperatureCelsius(nextTemp);
            notifyChange({ temperatureCelsius: nextTemp });
        }
    };

    const handleAddOnToggle = (addOnId: string) => {
        const nextSelected = selectedAddOnIds.includes(addOnId)
            ? selectedAddOnIds.filter((id) => id !== addOnId)
            : [...selectedAddOnIds, addOnId];

        setSelectedAddOnIds(nextSelected);
        notifyChange({ selectedAddOnIds: nextSelected });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit({
                selectedPillowId,
                temperatureCelsius,
                selectedAddOnIds,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`space-y-8 ${className}`}>
            {/* SECTION 3: Sanctuary Comfort & Pillow Architecture */}
            <article className="bg-white border border-[#e8e4dc] rounded-lg p-6 sm:p-8 lg:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                {/* Form Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#eeeae2] pb-5 mb-6">
                    <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#1f1e1d] text-white flex items-center justify-center font-sans text-xs font-semibold">
                            {comfortSectionNumber}
                        </span>
                        <div>
                            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1f1e1d] tracking-tight">
                                {comfortHeading}
                            </h2>
                            <p className="text-xs text-[#78756d] font-sans font-light mt-0.5">
                                {comfortSubtitle}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3 Pillow Architecture Choice Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {pillowOptions.map((pillow) => {
                        const isSelected = selectedPillowId === pillow.id;

                        return (
                            <div
                                key={pillow.id}
                                onClick={() => handlePillowSelect(pillow.id)}
                                className={`p-4 rounded-sm border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                                    isSelected
                                        ? 'bg-[#f7f2e7] border-[#8e763b] shadow-xs'
                                        : 'bg-white border-[#ded9ce] hover:border-[#8e763b]/60'
                                }`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.16em] text-[#8e763b]">
                                            {pillow.badge || pillow.loftTag}
                                        </span>
                                        <span
                                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                                isSelected
                                                    ? 'border-[#8e763b] bg-[#8e763b]'
                                                    : 'border-[#ded9ce] bg-white'
                                            }`}
                                        >
                                            {isSelected && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                            )}
                                        </span>
                                    </div>

                                    <h3 className="font-serif text-base sm:text-lg font-medium text-[#1f1e1d] tracking-tight">
                                        {pillow.title}
                                    </h3>
                                    <p className="mt-1 text-xs text-[#6e6b64] font-sans font-light leading-relaxed">
                                        {pillow.description}
                                    </p>
                                </div>

                                <div className="mt-4 pt-3 border-t border-[#f0ece3] text-[9px] font-sans font-semibold uppercase tracking-[0.18em] text-[#8e8a82]">
                                    {pillow.loftTag}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Suite Staging Ambient Climate Bar */}
                <div className="pt-5 border-t border-[#eeeae2] flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-sm bg-[#f6f2ea]/70 border">
                    <div className="flex items-start sm:items-center gap-3">
                        <div className="p-2 rounded-lg bg-white border border-[#ded9ce] shadow-2xs text-[#8e763b] shrink-0">
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
                            </svg>
                        </div>
                        <div>
                            <span className="font-sans text-xs font-semibold text-[#1f1e1d] tracking-tight block">
                                Pre-Set Staging Temperature
                            </span>
                            <span className="text-[11px] text-[#6e6b64] font-sans font-light leading-relaxed">
                                {climateNotice}
                            </span>
                        </div>
                    </div>

                    {/* Interactive Temperature Stepper Widget */}
                    <div className="flex items-center gap-2 self-start sm:self-auto bg-white border border-[#ded9ce] rounded-sm px-2.5 py-1.5 shadow-2xs">
                        <button
                            type="button"
                            onClick={handleTemperatureDecrease}
                            disabled={temperatureCelsius <= minTemperatureCelsius}
                            className="w-7 h-7 rounded-lg bg-[#f6f2ea] hover:bg-[#eeeae2] text-[#1f1e1d] flex items-center justify-center font-mono text-base font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label="Decrease temperature"
                        >
                            −
                        </button>
                        <span className="font-serif text-base font-medium text-[#1f1e1d] min-w-14.5 text-center">
                            {temperatureCelsius.toFixed(1)}°C
                        </span>
                        <button
                            type="button"
                            onClick={handleTemperatureIncrease}
                            disabled={temperatureCelsius >= maxTemperatureCelsius}
                            className="w-7 h-7 rounded-lg bg-[#f6f2ea] hover:bg-[#eeeae2] text-[#1f1e1d] flex items-center justify-center font-mono text-base font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label="Increase temperature"
                        >
                            +
                        </button>
                    </div>
                </div>
            </article>

            {/* SECTION 4: Curated Sanctuary Add-Ons */}
            <article className="bg-white border border-[#e8e4dc] rounded-lg p-6 sm:p-8 lg:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                {/* Form Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#eeeae2] pb-5 mb-6">
                    <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#1f1e1d] text-white flex items-center justify-center font-sans text-xs font-semibold">
                            {addOnsSectionNumber}
                        </span>
                        <div>
                            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1f1e1d] tracking-tight">
                                {addOnsHeading}
                            </h2>
                            <p className="text-xs text-[#78756d] font-sans font-light mt-0.5">
                                {addOnsSubtitle}
                            </p>
                        </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-sm bg-[#f2ede4] border border-[#ded9ce] text-[9px] font-sans font-semibold uppercase tracking-[0.16em] text-[#8e763b] self-start sm:self-auto">
                        {addOnsBadge}
                    </span>
                </div>

                {/* Interactive Upgrade Add-On Rows */}
                <div className="space-y-3.5">
                    {addOns.map((addOn) => {
                        const isChecked = selectedAddOnIds.includes(addOn.id);

                        return (
                            <div
                                key={addOn.id}
                                onClick={() => handleAddOnToggle(addOn.id)}
                                className={`p-4 sm:p-5 rounded-sm border transition-all duration-300 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                                    isChecked
                                        ? 'bg-[#f7f2e7]/80 border-[#8e763b] shadow-xs'
                                        : 'bg-white border-[#ded9ce] hover:border-[#8e763b]/50'
                                }`}
                            >
                                <div className="flex items-start gap-3.5">
                                    {/* Custom Stylized Checkbox Pill */}
                                    <div
                                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                            isChecked
                                                ? 'bg-[#8e763b] border-[#8e763b] text-white'
                                                : 'bg-white border-[#ded9ce]'
                                        }`}
                                    >
                                        {isChecked && (
                                            <svg
                                                className="w-3.5 h-3.5"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        )}
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.16em] text-[#8e763b]">
                                                {addOn.badge}
                                            </span>
                                        </div>
                                        <h3 className="font-serif text-base font-medium text-[#1f1e1d] tracking-tight">
                                            {addOn.title}
                                        </h3>
                                        <p className="mt-0.5 text-xs text-[#6e6b64] font-sans font-light leading-relaxed">
                                            {addOn.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Price Column */}
                                <div className="sm:text-right shrink-0 pl-8 sm:pl-0">
                                    <span className="font-serif text-lg font-bold text-[#1f1e1d]">
                                        +{addOn.currencySymbol}
                                        {addOn.price.toLocaleString()}
                                    </span>
                                    <span className="block text-[10px] font-sans text-[#78756d] uppercase tracking-wider">
                                        {addOn.pricingUnit}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </article>

            {/* Sovereign Privilege Verified Banner */}
            <div className="bg-[#1f1e1d] text-[#fcf9f4] border border-[#383530] rounded-lg p-5 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-sm bg-[#2a2826] border border-[#44403a] text-[#bfa76f] shrink-0">
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="8" r="7" />
                            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                        </svg>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#bfa76f]">
                                {voucher.badge}
                            </span>
                            <span className="px-2 py-0.5 rounded-sm bg-white/10 text-[9px] font-sans font-medium uppercase tracking-wider text-white/90">
                                {voucher.benefitTag}
                            </span>
                        </div>
                        <h4 className="font-serif text-base sm:text-lg font-normal text-white tracking-tight">
                            {voucher.headline}
                        </h4>
                        <p className="mt-1 text-xs text-[#a4a098] font-sans font-light leading-relaxed max-w-xl">
                            {voucher.termsNote}
                        </p>
                    </div>
                </div>

                <div className="sm:text-right shrink-0">
                    <span className="inline-block px-3 py-1.5 rounded-md bg-[#2a2826] border border-[#44403a] font-mono text-xs text-[#bfa76f] tracking-wider uppercase">
                        {voucher.promoCode}
                    </span>
                </div>
            </div>

            {/* Bottom Actions Strip */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Link
                    href={returnHref}
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-medium uppercase tracking-[0.18em] text-[#78756d] hover:text-[#1f1e1d] transition-colors py-2"
                >
                    <span>←</span>
                    <span>{returnLabel}</span>
                </Link>

                <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-sm bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 shadow-md active:translate-y-0.5"
                >
                    <span>{submitLabel}</span>
                    <span className="text-sm font-normal transform transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </button>
            </div>
        </form>
    );
}