'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface PillowOption {
    id: 'bespoke-goose-down' | 'organic-latex-wool' | 'mulberry-silk-fill';
    title: string;
    description: string;
    badge?: string;
    loftTag: string;
}

export type AddOnCategoryType =
    | 'NAUTICAL_CHARTER'
    | 'WELLNESS_SPA'
    | 'GASTRONOMY'
    | 'ENOLOGY'
    | 'TERROIR_CRAFT'
    | 'BESPOKE_TRANSFER'
    | 'CELLAR_PROVISION';

export interface AddOnItem {
    id: string;
    itemType: AddOnCategoryType;
    categoryGroup: 'SIGNATURE_EXPERIENCE' | 'ARRIVAL_LOGISTICS';
    badge: string;
    title: string;
    description: string;
    price: number;
    currencySymbol: string;
    pricingUnit: string;
    durationOrSchedule?: string;
    defaultSelected: boolean;
    isPriorityRecommendation?: boolean;
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
    addOnsSectionNumber: string;
    addOnsHeading: string;
    addOnsBadge: string;
    addOnsSubtitle: string;
    filterTabs: Array<{ id: string; label: string }>;
    addOns: AddOnItem[];
    voucher: SovereignVoucherData;
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
            title: 'Bespoke Hungarian Goose Down',
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
            description: 'Naturally hypoallergenic, ultra-soft support with pure mulberry silk casing.',
            badge: 'HYPOALLERGENIC',
            loftTag: 'FEATHERWEIGHT',
        },
    ],
    defaultPillowId: 'bespoke-goose-down',
    initialTemperatureCelsius: 20.5,
    minTemperatureCelsius: 18.0,
    maxTemperatureCelsius: 24.5,
    temperatureStep: 0.5,
    climateNotice: 'Pre-cooled using silent subterranean geothermal radiant cooling coils prior to arrival.',
    addOnsSectionNumber: '4',
    addOnsHeading: 'Curated Sanctuary Experiences & Add-Ons',
    addOnsBadge: 'AURELIA COMPLETE RESERVE',
    addOnsSubtitle:
        'Append private Riva charters, subterranean thermal caldariums, and sommelier vault masterclasses directly to your Sovereign Folio docket.',
    filterTabs: [
        { id: 'all', label: 'All Curations' },
        { id: 'experiences', label: 'Signature Experiences' },
        { id: 'transits-cellar', label: 'Transits & Cellar' },
    ],
    addOns: [
        {
            id: 'exp-riva-aquarama-capri',
            itemType: 'NAUTICAL_CHARTER',
            categoryGroup: 'SIGNATURE_EXPERIENCE',
            badge: 'FLAGSHIP EXPEDITION',
            title: 'Private Riva Aquarama Faraglioni & Capri Expedition',
            description:
                'Master-restored 1968 Riva Aquarama Super voyage along sheer limestone bluffs, secluded sea-caves, Dom Pérignon vintage collation, and La Fontelina tender access.',
            price: 1850,
            currencySymbol: '€',
            pricingUnit: 'per charter voyage',
            durationOrSchedule: '8 Hours • Up to 6 Patrons',
            defaultSelected: false,
            isPriorityRecommendation: true,
        },
        {
            id: 'exp-roman-caldarium-circuit',
            itemType: 'WELLNESS_SPA',
            categoryGroup: 'SIGNATURE_EXPERIENCE',
            badge: 'PRIVATE GROTTO',
            title: 'Subterranean Roman Thermal Grotto Circuit & Caldarium Ritual',
            description:
                '90-minute private hydrothermal immersion through natural volcanic limestone caverns, heated basalt soak, steam cave, and warm neroli oil fascia release for two.',
            price: 240,
            currencySymbol: '€',
            pricingUnit: 'couples ritual',
            durationOrSchedule: '90 Min • Max 2 Patrons',
            defaultSelected: true,
        },
        {
            id: 'exp-belvedere-michelin-evening',
            itemType: 'GASTRONOMY',
            categoryGroup: 'SIGNATURE_EXPERIENCE',
            badge: '3 MICHELIN STARS',
            title: 'Michelin Evening at Il Belvedere Overlooking the Gulf',
            description:
                'Executive Chef Matteo Moretti presents an unhurried seven-course tasting journey of deep coastal catch and century-old lemon harvests with rare reserve cru pairings.',
            price: 320,
            currencySymbol: '€',
            pricingUnit: 'per patron tasting',
            durationOrSchedule: '19:30 or 21:00 Seating',
            defaultSelected: false,
            isPriorityRecommendation: true,
        },
        {
            id: 'exp-barolo-vault-tasting',
            itemType: 'ENOLOGY',
            categoryGroup: 'SIGNATURE_EXPERIENCE',
            badge: 'CELLAR MASTERCLASS',
            title: 'Historic Subterranean Barolo & Super Tuscan Vault Tasting',
            description:
                'Sommelier-guided flight through monolithic 19th-century volcanic tuff cellars featuring library verticals of Sassicaia, Ornellaia, and aged Monfortino Barolos.',
            price: 180,
            currencySymbol: '€',
            pricingUnit: 'per patron flight',
            durationOrSchedule: '75 Min • Max 6 Patrons',
            defaultSelected: false,
        },
        {
            id: 'exp-cliffside-evoo-masterclass',
            itemType: 'TERROIR_CRAFT',
            categoryGroup: 'SIGNATURE_EXPERIENCE',
            badge: 'TERROIR HERITAGE',
            title: 'Centennial Cliffside Olive Grove EVOO Harvest Masterclass',
            description:
                'Private estate botanist-guided tasting of four micro-terroir monovarietal pressings amidst two-century-old terraced groves overlooking the Tyrrhenian.',
            price: 140,
            currencySymbol: '€',
            pricingUnit: 'per patron session',
            durationOrSchedule: '60 Min • Pergola Terrace',
            defaultSelected: false,
        },
        {
            id: 'riva-harbor-transfer',
            itemType: 'BESPOKE_TRANSFER',
            categoryGroup: 'ARRIVAL_LOGISTICS',
            badge: 'VIP MARINE ENTRY',
            title: 'Private Riva Aquarama Harbor Tender Transfer',
            description:
                'Direct maritime tender slipway arrival from Naples Marina Molo Beverello or Capri Marina Grande directly into the Aurelia sea gate.',
            price: 480,
            currencySymbol: '€',
            pricingUnit: 'per direction',
            durationOrSchedule: 'Direct Sea Gate Berth',
            defaultSelected: true,
        },
        {
            id: 'sommelier-reserve-champagne',
            itemType: 'CELLAR_PROVISION',
            categoryGroup: 'ARRIVAL_LOGISTICS',
            badge: 'CELLAR STAGING',
            title: 'Sommelier Reserve Vintage Champagne on Arrival',
            description:
                'Chilled bottle of Dom Pérignon 2012 Vintage or Giulio Ferrari Riserva del Fondatore staged on your ocean loggia with artisan Campanian cicchetti.',
            price: 190,
            currencySymbol: '€',
            pricingUnit: 'sanctuary welcome',
            durationOrSchedule: 'Staged at Check-In',
            defaultSelected: false,
        },
    ],
    voucher: {
        badge: 'SOVEREIGN PRIVILEGE VERIFIED',
        benefitTag: '15% PATRON COURTESY',
        headline: 'APPLIED: -€735.00',
        discountAmount: 735,
        currencySymbol: '€',
        promoCode: 'AURELIA-PRIVILEGE',
        termsNote:
            'Direct reservation protocol verified under Sovereign Key Folio AUR-8829-CAP. 15% courtesy credited against residential suite balance.',
    },
    returnHref: '/suites/azure-master-ocean-suite',
    returnLabel: 'Return to Sanctuary Selection',
    submitLabel: 'Continue to Payment & Guarantee',
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
        filterTabs,
        addOns,
        voucher,
        returnHref,
        returnLabel,
        submitLabel,
    } = data;

    const [selectedPillowId, setSelectedPillowId] =
        useState<PillowOption['id']>(defaultPillowId);
    const [temperatureCelsius, setTemperatureCelsius] = useState<number>(
        initialTemperatureCelsius
    );
    const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>(
        function () {
            return addOns.filter((a) => a.defaultSelected).map((a) => a.id);
        }
    );
    const [activeFilterTab, setActiveFilterTab] = useState<string>('all');

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
            const nextTemp =
                Math.round((temperatureCelsius - temperatureStep) * 10) / 10;
            setTemperatureCelsius(nextTemp);
            notifyChange({ temperatureCelsius: nextTemp });
        }
    };

    const handleTemperatureIncrease = () => {
        if (temperatureCelsius < maxTemperatureCelsius) {
            const nextTemp =
                Math.round((temperatureCelsius + temperatureStep) * 10) / 10;
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

    const filteredAddOns = addOns.filter(function (item) {
        if (activeFilterTab === 'experiences') {
            return item.categoryGroup === 'SIGNATURE_EXPERIENCE';
        }
        if (activeFilterTab === 'transits-cellar') {
            return item.categoryGroup === 'ARRIVAL_LOGISTICS';
        }
        return true;
    });

    const renderAddOnIcon = (itemType: AddOnItem['itemType']) => {
        switch (itemType) {
            case 'NAUTICAL_CHARTER':
            case 'BESPOKE_TRANSFER':
                return (
                    <svg
                        className="w-4 h-4 text-[#8e763b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                );
            case 'WELLNESS_SPA':
                return (
                    <svg
                        className="w-4 h-4 text-[#8e763b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 22c4-4 8-7.5 8-12a8 8 0 0 0-16 0c0 4.5 4 8 8 12z" />
                        <path d="M12 22V10" />
                        <path d="M8 14c2-1 4-1 4-1s2 0 4 1" />
                    </svg>
                );
            case 'GASTRONOMY':
            case 'TERROIR_CRAFT':
                return (
                    <svg
                        className="w-4 h-4 text-[#8e763b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 2l-4 4-2-2 4-4 2 2z" />
                        <path d="M14 6l-9 9a2 2 0 0 0 0 2.83l.17.17a2 2 0 0 0 2.83 0l9-9" />
                        <path d="M6 18l-3 3" />
                        <path d="M2 14l2-2" />
                        <path d="M12 2l8 8" />
                    </svg>
                );
            case 'ENOLOGY':
            case 'CELLAR_PROVISION':
                return (
                    <svg
                        className="w-4 h-4 text-[#8e763b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M8 22h8" />
                        <path d="M12 11v11" />
                        <path d="M19 3l-7 8-7-8h14z" />
                    </svg>
                );
            default:
                return (
                    <svg
                        className="w-4 h-4 text-[#8e763b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 14 14" />
                    </svg>
                );
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`space-y-8 ${className}`}>
            {/* SECTION 3: Sanctuary Comfort & Pillow Architecture */}
            <article className="bg-white border border-[#e8e4dc] -2xl p-6 sm:p-8 lg:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#eeeae2] pb-5">
                    <div className="flex items-center gap-3">
                        <span className="w-6 h-6 -full bg-[#1f1e1d] text-white flex items-center justify-center font-sans text-xs font-semibold">
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

                {/* 3 Pillow Ergonomics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {pillowOptions.map((pillow) => {
                        const isSelected = selectedPillowId === pillow.id;

                        return (
                            <div
                                key={pillow.id}
                                onClick={() => handlePillowSelect(pillow.id)}
                                className={`p-4 sm:p-5 -xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 ${
                                    isSelected
                                        ? 'bg-[#f7f2e7] border-[#8e763b] shadow-xs'
                                        : 'bg-white border-[#ded9ce] hover:border-[#8e763b]/60'
                                }`}
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.16em] text-[#8e763b]">
                                            {pillow.badge || pillow.loftTag}
                                        </span>
                                        <span
                                            className={`w-3.5 h-3.5 -full border flex items-center justify-center ${
                                                isSelected
                                                    ? 'border-[#8e763b] bg-[#8e763b]'
                                                    : 'border-[#ded9ce] bg-white'
                                            }`}
                                        >
                                            {isSelected && (
                                                <span className="w-1.5 h-1.5 -full bg-white" />
                                            )}
                                        </span>
                                    </div>

                                    <h3 className="font-serif text-base sm:text-lg font-medium text-[#1f1e1d] tracking-tight">
                                        {pillow.title}
                                    </h3>
                                    <p className="text-xs text-[#6e6b64] font-sans font-light leading-relaxed">
                                        {pillow.description}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-[#f0ece3] text-[9px] font-sans font-semibold uppercase tracking-[0.18em] text-[#8e8a82]">
                                    {pillow.loftTag}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Staging Climate Bar */}
                <div className="pt-4 border-t border-[#eeeae2] flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 -xl bg-[#f6f2ea]/70 border">
                    <div className="flex items-start sm:items-center gap-3">
                        <div className="p-2 -lg bg-white border border-[#ded9ce] shadow-2xs text-[#8e763b] shrink-0">
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

                    <div className="flex items-center gap-2 self-start sm:self-auto bg-white border border-[#ded9ce] -xl px-2.5 py-1.5 shadow-2xs">
                        <button
                            type="button"
                            onClick={handleTemperatureDecrease}
                            disabled={temperatureCelsius <= minTemperatureCelsius}
                            className="w-7 h-7 -lg bg-[#f6f2ea] hover:bg-[#eeeae2] text-[#1f1e1d] flex items-center justify-center font-mono text-base font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
                            className="w-7 h-7 -lg bg-[#f6f2ea] hover:bg-[#eeeae2] text-[#1f1e1d] flex items-center justify-center font-mono text-base font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label="Increase temperature"
                        >
                            +
                        </button>
                    </div>
                </div>
            </article>

            {/* SECTION 4: Curated Sanctuary Add-Ons */}
            <article className="bg-white border border-[#e8e4dc] -2xl p-6 sm:p-8 lg:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#eeeae2] pb-5">
                    <div className="flex items-center gap-3">
                        <span className="w-6 h-6 -full bg-[#1f1e1d] text-white flex items-center justify-center font-sans text-xs font-semibold">
                            {addOnsSectionNumber}
                        </span>
                        <div>
                            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1f1e1d] tracking-tight">
                                {addOnsHeading}
                            </h2>
                            <p className="text-xs text-[#78756d] font-sans font-light mt-0.5 max-w-xl">
                                {addOnsSubtitle}
                            </p>
                        </div>
                    </div>

                    <span className="px-2.5 py-0.5 -sm bg-[#f2ede4] border border-[#ded9ce] text-[9px] font-sans font-semibold uppercase tracking-[0.16em] text-[#8e763b] self-start sm:self-auto shrink-0">
                        {addOnsBadge}
                    </span>
                </div>

                {/* Filter Pill Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {filterTabs.map(function (tab) {
                        const isActive = activeFilterTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={function () {
                                    setActiveFilterTab(tab.id);
                                }}
                                className={`px-4 py-2 -xl text-xs font-sans font-semibold uppercase tracking-[0.16em] transition-all whitespace-nowrap ${
                                    isActive
                                        ? 'bg-[#1f1e1d] text-white shadow-xs'
                                        : 'bg-white hover:bg-[#f6f2ea] text-[#6d6a62] border border-[#ded9ce]'
                                }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* List of Add-Ons */}
                <div className="space-y-3.5">
                    {filteredAddOns.map((addOn) => {
                        const isChecked = selectedAddOnIds.includes(addOn.id);

                        return (
                            <div
                                key={addOn.id}
                                onClick={() => handleAddOnToggle(addOn.id)}
                                className={`p-4 sm:p-5 -xl border transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                                    isChecked
                                        ? 'bg-[#f7f2e7]/80 border-[#8e763b] shadow-xs'
                                        : 'bg-white border-[#ded9ce] hover:border-[#8e763b]/50'
                                }`}
                            >
                                <div className="flex items-start gap-3.5 min-w-0">
                                    <div
                                        className={`w-5 h-5 -md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
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

                                    <div className="p-2 -lg bg-[#fcfaf7] border border-[#ded9ce] shadow-2xs shrink-0 hidden sm:block">
                                        {renderAddOnIcon(addOn.itemType)}
                                    </div>

                                    <div className="space-y-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.16em] text-[#8e763b]">
                                                {addOn.badge}
                                            </span>
                                            {addOn.durationOrSchedule && (
                                                <>
                                                    <span className="text-[#ded9ce]">•</span>
                                                    <span className="text-[10px] font-sans text-[#78756d]">
                                                        {addOn.durationOrSchedule}
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        <h3 className="font-serif text-base font-medium text-[#1f1e1d] tracking-tight">
                                            {addOn.title}
                                        </h3>
                                        <p className="text-xs text-[#6e6b64] font-sans font-light leading-relaxed max-w-2xl">
                                            {addOn.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="md:text-right shrink-0 pl-8 md:pl-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#f0ece3] flex md:flex-col items-baseline md:items-end justify-between md:justify-center">
                                    <span className="font-serif text-lg font-bold text-[#1f1e1d] leading-none">
                                        +{addOn.currencySymbol}
                                        {addOn.price.toLocaleString()}
                                    </span>
                                    <span className="block text-[10px] font-sans text-[#78756d] uppercase tracking-wider mt-1">
                                        {addOn.pricingUnit}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </article>

            {/* Sovereign Privilege Verified Banner */}
            <div className="bg-[#1f1e1d] text-[#fcf9f4] border border-[#383530] -2xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                    <div className="p-2.5 -xl bg-[#2a2826] border border-[#44403a] text-[#bfa76f] shrink-0">
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
                            <span className="px-2 py-0.5 -sm bg-white/10 text-[9px] font-sans font-medium uppercase tracking-wider text-white/90">
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
                    <span className="inline-block px-3 py-1.5 -md bg-[#2a2826] border border-[#44403a] font-mono text-xs text-[#bfa76f] tracking-wider uppercase">
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
                    className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 -xl bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 shadow-md active:translate-y-0.5"
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