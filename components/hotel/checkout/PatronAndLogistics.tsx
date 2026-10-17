'use client'

import { useState } from 'react';

export interface HonorificOption {
    label: string;
    value: string;
}

export interface ArrivalWindowOption {
    id: string;
    badge: string;
    timeRange: string;
    description: string;
    iconType: 'early' | 'sunset' | 'charter';
}

export interface PatronFormData {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneCountryCode: string;
    phoneNumber: string;
    countryOfResidence: string;
    accompanyingGuestName: string;
    selectedArrivalWindowId: string;
    transportDesignation: string;
    dietaryAndCellarNuances: string;
}

export interface PatronSectionData {
    eyebrow: string;
    heading: string;
    description: string;
    honorificOptions: HonorificOption[];
    countryOptions: Array<{ label: string; value: string }>;
    arrivalWindows: ArrivalWindowOption[];
    initialFormValues: PatronFormData;
}

export const checkoutPatronDefaultData: PatronSectionData = {
    eyebrow: 'PHASE 01 / 03 • AURELIA RESIDENTIAL PROTOCOL',
    heading: 'Guest Particulars & Sanctuary Preferences',
    description:
        'Please record the primary patron identity for encrypted sanctuary key generation, diplomatic transport orchestration, and personalized residential service.',
    honorificOptions: [
        { label: 'Lord', value: 'Lord' },
        { label: 'Lady', value: 'Lady' },
        { label: 'Baron', value: 'Baron' },
        { label: 'Baroness', value: 'Baroness' },
        { label: 'Dr.', value: 'Dr' },
        { label: 'Mr.', value: 'Mr' },
        { label: 'Mrs.', value: 'Mrs' },
        { label: 'Ms.', value: 'Ms' },
    ],
    countryOptions: [
        { label: 'United Kingdom (GB)', value: 'GB' },
        { label: 'Switzerland (CH)', value: 'CH' },
        { label: 'United States (US)', value: 'US' },
        { label: 'Italy (IT)', value: 'IT' },
        { label: 'Monaco (MC)', value: 'MC' },
        { label: 'France (FR)', value: 'FR' },
        { label: 'Germany (DE)', value: 'DE' },
        { label: 'United Arab Emirates (AE)', value: 'AE' },
    ],
    arrivalWindows: [
        {
            id: 'early-checkin',
            badge: 'EARLY CHECK-IN',
            timeRange: '14:00 – 16:00',
            description: 'Direct suite staging upon harbor arrival.',
            iconType: 'early',
        },
        {
            id: 'sunset-welcome',
            badge: 'SUNSET WELCOME',
            timeRange: '16:00 – 19:00',
            description: 'Aperitivo in the terrace colonnade.',
            iconType: 'sunset',
        },
        {
            id: 'charter-tender',
            badge: 'CHARTER / PRIVATE TENDER',
            timeRange: 'Custom Arrival',
            description: 'Tender berth coordinated by Aurelia dock master.',
            iconType: 'charter',
        },
    ],
    initialFormValues: {
        title: 'Lord',
        firstName: 'Julian',
        lastName: 'Vane-Tempest',
        email: 'j.vane-tempest@sovereign-holdings.co.uk',
        phoneCountryCode: '+44',
        phoneNumber: '7911 123456',
        countryOfResidence: 'GB',
        accompanyingGuestName: 'Lady Evelyn Vane-Tempest',
        selectedArrivalWindowId: 'early-checkin',
        transportDesignation: 'NetJets Citation Latitude — NJE849 into Naples',
        dietaryAndCellarNuances: 'Preference for Campania whites & biodynamic pressings. Shellfish intolerance for companion.',
    },
};

export interface PatronAndLogisticsProps {
    data?: PatronSectionData;
    onChange?: (formData: PatronFormData) => void;
    className?: string;
}

export function PatronAndLogisticsSection({
    data = checkoutPatronDefaultData,
    onChange,
    className = '',
}: PatronAndLogisticsProps) {
    const {
        eyebrow,
        heading,
        description,
        honorificOptions,
        countryOptions,
        arrivalWindows,
        initialFormValues,
    } = data;

    const [formValues, setFormValues] = useState<PatronFormData>(initialFormValues);

    const handleFieldChange = (field: keyof PatronFormData, value: string) => {
        const updated = { ...formValues, [field]: value };
        setFormValues(updated);
        if (onChange) {
            onChange(updated);
        }
    };

    return (
        <div className={`space-y-8 ${className}`}>
            {/* Editorial Header Monograph */}
            <div>
                <span className="block text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#8e763b] mb-2">
                    {eyebrow}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#1f1e1d] tracking-tight leading-[1.12]">
                    {heading}
                </h1>
                <p className="mt-3 text-xs sm:text-[13px] md:text-sm text-[#5f5c56] font-sans font-light leading-relaxed max-w-3xl">
                    {description}
                </p>
            </div>

            {/* SECTION 1: Primary Patron Details Form Card */}
            <article className="bg-white border border-[#e8e4dc] rounded-lg p-6 sm:p-8 lg:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                {/* Form Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#eeeae2] pb-5 mb-6">
                    <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#1f1e1d] text-white flex items-center justify-center font-sans text-xs font-semibold">
                            1
                        </span>
                        <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1f1e1d] tracking-tight">
                            Primary Patron Details
                        </h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-sm bg-[#f2ede4] border border-[#ded9ce] text-[9px] font-sans font-semibold uppercase tracking-[0.16em] text-[#8e763b]">
                            REQUIRED FIELDS
                        </span>
                        <span className="hidden sm:inline text-[11px] font-sans text-[#78756d]">
                            All correspondence is confidential & encrypted.
                        </span>
                    </div>
                </div>

                {/* Form Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                    {/* Honorific Title */}
                    <div className="sm:col-span-3">
                        <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#6d6961] mb-2">
                            HONORIFIC TITLE
                        </label>
                        <select
                            value={formValues.title}
                            onChange={(e) => handleFieldChange('title', e.target.value)}
                            className="w-full px-3.5 py-3 rounded-sm bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs"
                        >
                            {honorificOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* First / Given Name */}
                    <div className="sm:col-span-4">
                        <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#6d6961] mb-2">
                            FIRST / GIVEN NAME *
                        </label>
                        <input
                            type="text"
                            required
                            value={formValues.firstName}
                            onChange={(e) => handleFieldChange('firstName', e.target.value)}
                            placeholder="e.g. Julian"
                            className="w-full px-3.5 py-3 rounded-sm bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs placeholder-[#a4a098]"
                        />
                    </div>

                    {/* Surname */}
                    <div className="sm:col-span-5">
                        <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#6d6961] mb-2">
                            SURNAME *
                        </label>
                        <input
                            type="text"
                            required
                            value={formValues.lastName}
                            onChange={(e) => handleFieldChange('lastName', e.target.value)}
                            placeholder="e.g. Vane-Tempest"
                            className="w-full px-3.5 py-3 rounded-sm bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs placeholder-[#a4a098]"
                        />
                    </div>

                    {/* Discreet Email Address */}
                    <div className="sm:col-span-6">
                        <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#6d6961] mb-2">
                            DISCREET EMAIL ADDRESS *
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                value={formValues.email}
                                onChange={(e) => handleFieldChange('email', e.target.value)}
                                placeholder="patron@sovereign-holdings.co.uk"
                                className="w-full pl-10 pr-3.5 py-3 rounded-sm bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs placeholder-[#a4a098]"
                            />
                            <svg
                                className="w-4 h-4 text-[#8e763b] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="3" y="5" width="18" height="14" rx="2" />
                                <polyline points="3 7 12 13 21 7" />
                            </svg>
                        </div>
                        <span className="block text-[10px] font-sans text-[#8e8a82] mt-1.5 leading-snug">
                            Digital key card & itinerary dispatched here 24h prior.
                        </span>
                    </div>

                    {/* Mobile Contact */}
                    <div className="sm:col-span-6">
                        <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#6d6961] mb-2">
                            MOBILE CONTACT (WHATSAPP / SMS) *
                        </label>
                        <div className="flex gap-2">
                            <select
                                value={formValues.phoneCountryCode}
                                onChange={(e) => handleFieldChange('phoneCountryCode', e.target.value)}
                                className="px-3 py-3 rounded-sm bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs shrink-0"
                            >
                                <option value="+44">+44 (UK)</option>
                                <option value="+41">+41 (CH)</option>
                                <option value="+1">+1 (US)</option>
                                <option value="+39">+39 (IT)</option>
                                <option value="+33">+33 (FR)</option>
                                <option value="+49">+49 (DE)</option>
                                <option value="+971">+971 (AE)</option>
                            </select>
                            <input
                                type="tel"
                                required
                                value={formValues.phoneNumber}
                                onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
                                placeholder="7911 123456"
                                className="w-full px-3.5 py-3 rounded-sm bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs placeholder-[#a4a098]"
                            />
                        </div>
                        <span className="block text-[10px] font-sans text-[#8e8a82] mt-1.5 leading-snug">
                            Direct connection for your assigned personal majordomo.
                        </span>
                    </div>

                    {/* Country of Residence */}
                    <div className="sm:col-span-6">
                        <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#6d6961] mb-2">
                            COUNTRY OF RESIDENCE
                        </label>
                        <select
                            value={formValues.countryOfResidence}
                            onChange={(e) => handleFieldChange('countryOfResidence', e.target.value)}
                            className="w-full px-3.5 py-3 rounded-sm bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs"
                        >
                            {countryOptions.map((country) => (
                                <option key={country.value} value={country.value}>
                                    {country.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Accompanying Adult Guest */}
                    <div className="sm:col-span-6">
                        <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#6d6961] mb-2">
                            ACCOMPANYING ADULT GUEST
                        </label>
                        <input
                            type="text"
                            value={formValues.accompanyingGuestName}
                            onChange={(e) => handleFieldChange('accompanyingGuestName', e.target.value)}
                            placeholder="e.g. Lady Evelyn Vane-Tempest"
                            className="w-full px-3.5 py-3 rounded-sm bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs placeholder-[#a4a098]"
                        />
                        <span className="block text-[10px] font-sans text-[#8e8a82] mt-1.5 leading-snug">
                            For personalized sanctuary pass & dining reservations.
                        </span>
                    </div>
                </div>
            </article>

            {/* SECTION 2: Arrival Logistics & Host Orchestration */}
            <article className="bg-white border border-[#e8e4dc] rounded-lg p-6 sm:p-8 lg:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                {/* Form Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#eeeae2] pb-5 mb-6">
                    <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#1f1e1d] text-white flex items-center justify-center font-sans text-xs font-semibold">
                            2
                        </span>
                        <div>
                            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1f1e1d] tracking-tight">
                                Arrival Logistics & Host Orchestration
                            </h2>
                            <p className="text-xs text-[#78756d] font-sans font-light mt-0.5">
                                Ensure seamless harbor rendezvous or heliport reception.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3 Arrival Window Choice Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {arrivalWindows.map((window) => {
                        const isSelected = formValues.selectedArrivalWindowId === window.id;

                        return (
                            <div
                                key={window.id}
                                onClick={() => handleFieldChange('selectedArrivalWindowId', window.id)}
                                className={`p-4 rounded-sm border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                                    isSelected
                                        ? 'bg-[#f7f2e7] border-[#8e763b] shadow-xs'
                                        : 'bg-white border-[#ded9ce] hover:border-[#8e763b]/60'
                                }`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.16em] text-[#8e763b]">
                                            {window.badge}
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
                                        {window.timeRange}
                                    </h3>
                                    <p className="mt-1 text-xs text-[#6e6b64] font-sans font-light leading-relaxed">
                                        {window.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Dual Transport & Dietary Nuances Input Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-[#eeeae2]">
                    {/* Vessel, Jet Flight, or Train Designation */}
                    <div>
                        <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#6d6961] mb-2">
                            VESSEL, JET FLIGHT, OR TRAIN DESIGNATION
                        </label>
                        <input
                            type="text"
                            value={formValues.transportDesignation}
                            onChange={(e) => handleFieldChange('transportDesignation', e.target.value)}
                            placeholder="e.g. NetJets Citation Latitude — NJE849 into Naples"
                            className="w-full px-3.5 py-3 rounded-sm bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs placeholder-[#a4a098]"
                        />
                        <span className="block text-[10px] font-sans text-[#8e8a82] mt-1.5 leading-snug">
                            Coordinated with private heliport or Positano harbor master.
                        </span>
                    </div>

                    {/* Dietary & Cellar Nuances */}
                    <div>
                        <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#6d6961] mb-2">
                            DIETARY & CELLAR NUANCES
                        </label>
                        <input
                            type="text"
                            value={formValues.dietaryAndCellarNuances}
                            onChange={(e) => handleFieldChange('dietaryAndCellarNuances', e.target.value)}
                            placeholder="e.g. Preference for Campania whites & biodynamic pressings"
                            className="w-full px-3.5 py-3 rounded-sm bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs placeholder-[#a4a098]"
                        />
                        <span className="block text-[10px] font-sans text-[#8e8a82] mt-1.5 leading-snug">
                            Shared directly with Executive Sommelier Matteo Moretti.
                        </span>
                    </div>
                </div>
            </article>
        </div>
    );
}