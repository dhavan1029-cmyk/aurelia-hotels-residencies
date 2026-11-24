'use client';

import { useState, useEffect, useCallback } from 'react';
import { SovereignPhoneInput } from '@/components/hotel/auth/SovereignPhoneInput';
import {
    CountryIso2,
    STRICT_COUNTRY_LIST,
} from '@/lib/data/phoneValidator';

// ============================================================================
// TYPE CONTRACTS
// ============================================================================

export interface StrictValidationResult {
    isValid: boolean;
    countryIso: CountryIso2;
    cleanNationalDigits: string;
    formattedInternational?: string;
    error?: string;
}

export interface HonorificOption {
    label: string;
    value: string;
}

export interface ArrivalWindowOption {
    id: string;
    badge: string;
    timeRange: string;
    description: string;
    iconType?: 'early' | 'sunset' | 'charter';
}

export interface PatronFormData {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneCountryIso: CountryIso2;
    phoneNumber: string;
    isPhoneValid?: boolean;
    countryOfResidence: string;
    accompanyingGuestName?: string;
    selectedArrivalWindowId: string;
    transportDesignation?: string;
    dietaryAndCellarNuances?: string;
}

export interface PatronSectionData {
    initialFormValues?: Partial<PatronFormData>;
    arrivalWindows?: ArrivalWindowOption[];
    isAuthenticated?: boolean;
    patronName?: string;
    patronFolioCode?: string;
    sovereignTierLabel?: string;
}

export const HONORIFIC_OPTIONS: HonorificOption[] = [
    { label: 'Mr.', value: 'Mr' },
    { label: 'Mrs.', value: 'Mrs' },
    { label: 'Ms.', value: 'Ms' },
    { label: 'Dr.', value: 'Dr' },
    { label: 'Lord', value: 'Lord' },
    { label: 'Lady', value: 'Lady' },
    { label: 'Baron', value: 'Baron' },
    { label: 'Baroness', value: 'Baroness' },
    { label: 'Ambassador', value: 'Ambassador' },
    { label: 'Sheikh / Sheikha', value: 'Sheikh' },
];

export const CANONICAL_ARRIVAL_WINDOWS: ArrivalWindowOption[] = [
    {
        id: 'window-standard',
        badge: 'STANDARD SANCTUARY CHECK-IN',
        timeRange: '15:00 — 18:00',
        description: 'Majordomo reception in cloistered courtyard with chilled Amalfi limoncello.',
        iconType: 'early',
    },
    {
        id: 'window-sunset',
        badge: 'GOLDEN HOUR DUSK RECEPTION',
        timeRange: '18:00 — 21:00',
        description: 'Direct cliffside escort with candlelight terrace staging and private aperitivo.',
        iconType: 'sunset',
    },
    {
        id: 'window-charter',
        badge: 'DIPLOMATIC / PRIVATE HARBOR ARRIVAL',
        timeRange: '21:00 — 02:00',
        description: 'Private Riva tender disembarkation and silent suite escort with minimal formality.',
        iconType: 'charter',
    },
];

export const checkoutPatronDefaultValues: PatronFormData = {
    title: 'Mr',
    firstName: '',
    lastName: '',
    email: '',
    phoneCountryIso: 'IT',
    phoneNumber: '',
    isPhoneValid: false,
    countryOfResidence: 'IT',
    accompanyingGuestName: '',
    selectedArrivalWindowId: 'window-standard',
    transportDesignation: '',
    dietaryAndCellarNuances: '',
};

export interface PatronAndLogisticsProps {
    data?: PatronSectionData;
    onChange?: (formData: PatronFormData) => void;
    onAuthenticateClick?: () => void;
    className?: string;
}

// ============================================================================
// COMPONENT IMPLEMENTATION
// ============================================================================

export function PatronAndLogisticsSection({
    data = {},
    onChange,
    onAuthenticateClick,
    className = '',
}: PatronAndLogisticsProps) {
    const {
        initialFormValues,
        arrivalWindows = CANONICAL_ARRIVAL_WINDOWS,
        isAuthenticated,
        patronName,
        patronFolioCode,
        sovereignTierLabel,
    } = data;

    const defaultWindowId =
        arrivalWindows && arrivalWindows.length > 0
            ? arrivalWindows[0].id
            : 'window-standard';

    const [formValues, setFormValues] = useState<PatronFormData>(function () {
        return {
            ...checkoutPatronDefaultValues,
            selectedArrivalWindowId: defaultWindowId,
            ...(initialFormValues || {}),
        };
    });

    useEffect(
        function () {
            if (!initialFormValues || Object.keys(initialFormValues).length === 0) {
                return;
            }
            setFormValues(function (prev) {
                return {
                    ...prev,
                    ...initialFormValues,
                };
            });
        },
        [initialFormValues]
    );

    const handleFieldChange = useCallback(
        function <K extends keyof PatronFormData>(field: K, value: PatronFormData[K]) {
            setFormValues(function (prev) {
                const updated: PatronFormData = { ...prev, [field]: value };
                if (onChange) {
                    onChange(updated);
                }
                return updated;
            });
        },
        [onChange]
    );

    const handlePhoneValidationChange = useCallback(
        function (result: any) {
            setFormValues(function (prev) {
                const countryIso = (result.countryIso || result.iso || prev.phoneCountryIso) as CountryIso2;
                const digits = result.cleanNationalDigits || result.sanitized || result.value || '';
                const valid = Boolean(result.isValid);

                const updated: PatronFormData = {
                    ...prev,
                    phoneCountryIso: countryIso,
                    phoneNumber: digits,
                    isPhoneValid: valid,
                };

                if (onChange) {
                    onChange(updated);
                }
                return updated;
            });
        },
        [onChange]
    );

    return (
        <div className={`space-y-10 ${className}`}>
            {/* 1. SECTION TITLE & RESIDENTIAL PROTOCOL STRIP */}
            <div className="border-b border-[#eeeae2] pb-4">
                <span className="text-[9px] font-mono uppercase tracking-[0.24em] text-[#8e763b] block">
                    STAGE 01 • RESIDENTIAL PROTOCOL &amp; PATRON IDENTITY
                </span>
                <h2 className="font-serif text-2xl font-light text-[#1f1e1d] tracking-tight mt-0.5">
                    Guest Particulars &amp; Sanctuary Preferences
                </h2>
                <p className="text-xs font-sans text-[#78756d] mt-1">
                    Record primary patron particulars for encrypted key issuance and harbor transfer coordination. Registration is never mandatory.
                </p>

                {/* Authentication Recognition / Prompt */}
                {isAuthenticated ? (
                    <div className="mt-4 p-4 bg-[#fbf9f4] border border-[#bfa76f]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-[#8e763b] animate-pulse shrink-0" />
                            <div>
                                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-[#1f1e1d] block">
                                    RECOGNIZED SOVEREIGN PATRON
                                </span>
                                <span className="text-xs font-sans text-[#78756d]">
                                    {patronName || 'Esteemed Patron'} • Folio:{' '}
                                    <span className="font-mono font-medium text-[#8e763b]">
                                        {patronFolioCode || 'AUR-SVR-FOLIO'}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <span className="text-[9px] font-mono tracking-widest uppercase text-[#8e763b] px-3 py-1 bg-[#bfa76f]/10 border border-[#bfa76f]/30 self-start sm:self-auto font-medium">
                            ✦ {sovereignTierLabel || 'PRE-CALIBRATED STAY'}
                        </span>
                    </div>
                ) : (
                    onAuthenticateClick && (
                        <div className="mt-4 p-3 bg-[#faf8f5] border border-[#e8e4dc] flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 min-w-0">
                                <span className="text-[#8e763b] text-xs shrink-0">✦</span>
                                <span className="text-xs font-sans text-[#1f1e1d] truncate">
                                    Already hold an accredited Sovereign Key or Explorer Docket?
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={onAuthenticateClick}
                                className="text-[10px] font-sans font-semibold uppercase tracking-[0.16em] text-[#8e763b] hover:text-[#1f1e1d] underline transition-colors cursor-pointer shrink-0"
                            >
                                Sign In for Automated Clearance
                            </button>
                        </div>
                    )
                )}
            </div>

            {/* 2. PRIMARY PATRON IDENTITY FORM */}
            <section aria-labelledby="primary-patron-title" className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 id="primary-patron-title" className="font-serif text-base font-normal text-[#1f1e1d]">
                            Primary Patron Dossier
                        </h3>
                        <p className="text-xs font-sans text-[#78756d]">
                            Encrypted and protected under Swiss FADP and EU-GDPR standards.
                        </p>
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-[#8e763b]">
                        REQUIRED FIELDS
                    </span>
                </div>

                <div className="p-5 sm:p-6 bg-[#faf8f5] border border-[#e8e4dc] space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                        {/* Honorific Title */}
                        <div className="sm:col-span-3">
                            <label className="block text-[9px] font-mono uppercase tracking-[0.18em] text-[#6d6961] mb-1.5">
                                HONORIFIC TITLE
                            </label>
                            <select
                                value={formValues.title}
                                onChange={function (e) {
                                    handleFieldChange('title', e.target.value);
                                }}
                                className="w-full px-3 py-2 bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs cursor-pointer"
                            >
                                {HONORIFIC_OPTIONS.map(function (opt) {
                                    return (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        {/* First / Given Name */}
                        <div className="sm:col-span-4">
                            <label className="block text-[9px] font-mono uppercase tracking-[0.18em] text-[#6d6961] mb-1.5">
                                GIVEN NAME <span className="text-[#8e763b]">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formValues.firstName}
                                onChange={function (e) {
                                    handleFieldChange('firstName', e.target.value);
                                }}
                                placeholder="e.g. Julian"
                                className="w-full px-3 py-2 bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs placeholder-[#a4a098]"
                            />
                        </div>

                        {/* Surname */}
                        <div className="sm:col-span-5">
                            <label className="block text-[9px] font-mono uppercase tracking-[0.18em] text-[#6d6961] mb-1.5">
                                SURNAME <span className="text-[#8e763b]">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formValues.lastName}
                                onChange={function (e) {
                                    handleFieldChange('lastName', e.target.value);
                                }}
                                placeholder="e.g. Vane-Tempest"
                                className="w-full px-3 py-2 bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs placeholder-[#a4a098]"
                            />
                        </div>

                        {/* Discreet Email Address */}
                        <div className="sm:col-span-6">
                            <label className="block text-[9px] font-mono uppercase tracking-[0.18em] text-[#6d6961] mb-1.5">
                                DISCREET EMAIL ADDRESS <span className="text-[#8e763b]">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    value={formValues.email}
                                    onChange={function (e) {
                                        handleFieldChange('email', e.target.value);
                                    }}
                                    placeholder="patron@sovereign-holdings.co.uk"
                                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs placeholder-[#a4a098]"
                                />
                                <svg
                                    className="w-3.5 h-3.5 text-[#8e763b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
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
                            <span className="block text-[9.5px] font-sans text-[#8e8a82] mt-1 leading-snug">
                                Digital key &amp; itinerary dispatched here 24h prior to docking.
                            </span>
                        </div>

                        {/* Direct Mobile Contact */}
                        <div className="sm:col-span-6">
                            <SovereignPhoneInput
                                selectedIso={formValues.phoneCountryIso as any}
                                value={formValues.phoneNumber}
                                name="checkoutPhone"
                                label="DIRECT MOBILE"
                                required={true}
                                onChange={handlePhoneValidationChange}
                                className="font-sans text-[9.5px]"
                            />
                        </div>

                        {/* Country of Residence */}
                        <div className="sm:col-span-6">
                            <label className="block text-[9px] font-mono uppercase tracking-[0.18em] text-[#6d6961] mb-1.5">
                                COUNTRY OF RESIDENCE
                            </label>
                            <select
                                value={formValues.countryOfResidence}
                                onChange={function (e) {
                                    handleFieldChange('countryOfResidence', e.target.value);
                                }}
                                className="w-full px-3 py-2 bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs cursor-pointer"
                            >
                                {STRICT_COUNTRY_LIST.map(function (country) {
                                    return (
                                        <option key={country.iso} value={country.iso}>
                                            {country.name} ({country.iso})
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        {/* Accompanying Adult Guest */}
                        <div className="sm:col-span-6">
                            <label className="block text-[9px] font-mono uppercase tracking-[0.18em] text-[#6d6961] mb-1.5">
                                ACCOMPANYING ADULT GUEST
                            </label>
                            <input
                                type="text"
                                value={formValues.accompanyingGuestName || ''}
                                onChange={function (e) {
                                    handleFieldChange('accompanyingGuestName', e.target.value);
                                }}
                                placeholder="e.g. Lady Evelyn Vane-Tempest"
                                className="w-full px-3 py-2 bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs placeholder-[#a4a098]"
                            />
                            <span className="block text-[9.5px] font-sans text-[#8e8a82] mt-1 leading-snug">
                                For companion NFC key attestation &amp; dining reservations.
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. ARRIVAL LOGISTICS & HOST ORCHESTRATION TILES */}
            <section aria-labelledby="arrival-orchestration-title" className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 id="arrival-orchestration-title" className="font-serif text-base font-normal text-[#1f1e1d]">
                            Arrival Logistics &amp; Host Orchestration
                        </h3>
                        <p className="text-xs font-sans text-[#78756d]">
                            Select an arrival window to coordinate private tenders and courtyard greeting.
                        </p>
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-[#8e763b]">
                        HARBOR &amp; HELIPORT
                    </span>
                </div>

                {/* Arrival Window Choice Cards (Matching Pillow Card Aesthetics) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {arrivalWindows.map(function (window) {
                        const isSelected = formValues.selectedArrivalWindowId === window.id;

                        return (
                            <button
                                key={window.id}
                                type="button"
                                onClick={function () {
                                    handleFieldChange('selectedArrivalWindowId', window.id);
                                }}
                                className={`text-left p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                                    isSelected
                                        ? 'bg-white border-[#8e763b] ring-1 ring-[#8e763b]/30 shadow-xs'
                                        : 'bg-[#faf8f5] border-[#e8e4dc] hover:border-[#8e763b]/50'
                                }`}
                            >
                                <div className="space-y-2">
                                    <div className="flex items-start justify-between gap-2">
                                        <span className="text-[8.5px] font-mono uppercase tracking-wider text-[#8e763b]">
                                            {window.badge}
                                        </span>
                                        <div
                                            className={`w-3.5 h-3.5 border rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                                isSelected
                                                    ? 'border-[#8e763b] bg-[#8e763b]'
                                                    : 'border-[#ded9ce] bg-white'
                                            }`}
                                        >
                                            {isSelected && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                            )}
                                        </div>
                                    </div>

                                    <h4 className="font-serif text-sm font-medium text-[#1f1e1d] leading-snug">
                                        {window.timeRange}
                                    </h4>
                                    <p className="text-[11px] font-sans text-[#78756d] leading-relaxed">
                                        {window.description}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* 4. TRANSPORT & CELLAR NUANCES (MATCHING MICROCLIMATE PANEL STYLING) */}
            <section aria-labelledby="bespoke-transit-title" className="p-5 sm:p-6 bg-[#faf8f5] border border-[#e8e4dc] space-y-4">
                <div>
                    <h3 id="bespoke-transit-title" className="font-serif text-base font-normal text-[#1f1e1d]">
                        Bespoke Transit &amp; Sommelier Directives
                    </h3>
                    <p className="text-xs font-sans text-[#78756d]">
                        Optional flight numbers and cellar requirements dispatched directly to estate staff.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Vessel, Jet Flight, or Train Designation */}
                    <div>
                        <label className="block text-[9px] font-mono uppercase tracking-[0.18em] text-[#6d6961] mb-1.5">
                            VESSEL, JET FLIGHT, OR TRAIN DESIGNATION
                        </label>
                        <input
                            type="text"
                            value={formValues.transportDesignation || ''}
                            onChange={function (e) {
                                handleFieldChange('transportDesignation', e.target.value);
                            }}
                            placeholder="e.g. NetJets Citation Latitude — NJE849 into Naples"
                            className="w-full px-3 py-2 bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs placeholder-[#a4a098]"
                        />
                        <span className="block text-[9.5px] font-sans text-[#8e8a82] mt-1 leading-snug">
                            Coordinated with private heliport or Positano harbor master.
                        </span>
                    </div>

                    {/* Dietary & Cellar Nuances */}
                    <div>
                        <label className="block text-[9px] font-mono uppercase tracking-[0.18em] text-[#6d6961] mb-1.5">
                            DIETARY &amp; CELLAR NUANCES
                        </label>
                        <input
                            type="text"
                            value={formValues.dietaryAndCellarNuances || ''}
                            onChange={function (e) {
                                handleFieldChange('dietaryAndCellarNuances', e.target.value);
                            }}
                            placeholder="e.g. Preference for Campania whites & biodynamic pressings"
                            className="w-full px-3 py-2 bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs placeholder-[#a4a098]"
                        />
                        <span className="block text-[9.5px] font-sans text-[#8e8a82] mt-1 leading-snug">
                            Shared directly with Executive Sommelier Matteo Moretti.
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
}
