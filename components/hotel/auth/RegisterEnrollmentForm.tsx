'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface SanctuaryChoiceOption {
    id: string;
    code: string;
    label: string;
    region: string;
}

export interface OlfactoryChoiceOption {
    id: string;
    label: string;
    notes: string;
}

export interface CellarChoiceOption {
    id: string;
    label: string;
    provenance: string;
}

export interface RegisterFormInitialValues {
    honorific: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneCountryCode: string;
    phoneNumber: string;
    passkey: string;
    conciergePin: string;
    selectedSanctuaryIds: string[];
    selectedAromaId: string;
    selectedCellarId: string;
    invitationToken: string;
    agreeSwissPrivacy: boolean;
    agreeSensorySync: boolean;
}

export interface RegisterFormData {
    registryBadge: string;
    signInPromptText: string;
    signInLinkText: string;
    headline: string;
    subheadline: string;
    expeditedTitle: string;
    appleAuthLabel: string;
    conciergeAuthLabel: string;
    section1Number: string;
    section1Title: string;
    section1Sub: string;
    section2Number: string;
    section2Title: string;
    section2Sub: string;
    section3Number: string;
    section3Title: string;
    section3Sub: string;
    section4Number: string;
    section4Title: string;
    section4Sub: string;
    sanctuaryOptions: SanctuaryChoiceOption[];
    aromaOptions: OlfactoryChoiceOption[];
    cellarOptions: CellarChoiceOption[];
    initialValues: RegisterFormInitialValues;
    submitCtaLabel: string;
    encryptionAssuranceText: string;
}

export const registerFormDefaultData: RegisterFormData = {
    registryBadge: 'AURELIA MEMBERSHIP REGISTRY',
    signInPromptText: 'Already hold an active folio?',
    signInLinkText: 'Sign In →',
    headline: 'Apply for Sovereign Patronage',
    subheadline:
        'Complete your confidential profile to unlock unlisted oceanfront inventory, dedicated majordomo allocation, and bespoke sensory stay staging across all global sanctuaries.',
    expeditedTitle: 'Synchronize verified luxury identity',
    appleAuthLabel: 'Apple Sovereign ID',
    conciergeAuthLabel: 'Concierge Direct Passcode',
    section1Number: '01',
    section1Title: 'Sovereign Identity',
    section1Sub: 'CONFIDENTIAL FOLIO & DIPLOMATIC CORRESPONDENCE DATA',
    section2Number: '02',
    section2Title: 'Security & Concierge Passkey',
    section2Sub: 'DISCREET ACCESS KEYS & ENCRYPTED TELEPHONE VERBAL PIN',
    section3Number: '03',
    section3Title: 'Bespoke Hospitality Preferences',
    section3Sub: 'TAILORED AMBIANCE, OLFACTORY FORMULATION & CELLAR ALLOCATION',
    section4Number: '04',
    section4Title: 'Invitation Token or Folio Reference',
    section4Sub: 'PEER-SPONSORED OR CURATORIAL GUILD DISPATCH NUMBER',
    sanctuaryOptions: [
        {
            id: 'sanctuary-positano',
            code: 'AMA',
            label: 'Positano Cliffside',
            region: 'Amalfi Coast, Italy',
        },
        {
            id: 'sanctuary-antibes',
            code: 'ANT',
            label: "Cap d'Antibes",
            region: "Côte d'Azur, France",
        },
        {
            id: 'sanctuary-engadin',
            code: 'STM',
            label: 'St. Moritz Engadin',
            region: 'Swiss Alps, Switzerland',
        },
        {
            id: 'sanctuary-kyoto',
            code: 'KYO',
            label: 'Kyoto Arashiyama',
            region: 'Kansai, Japan',
        },
    ],
    aromaOptions: [
        {
            id: 'AMALFI_NEROLI_BERGAMOT',
            label: 'Mediterranean Neroli & Bitter Orange',
            notes: 'Cold-pressed Amalfi rind, sea mineral salt, coastal amber',
        },
        {
            id: 'TUSCAN_CYPRESS_CEDAR',
            label: 'Tuscan Cypress & Smoked Cedar',
            notes: 'Aged woodland heartwood, crushed rosemary, Tuscan resin',
        },
        {
            id: 'ALPINE_JUNIPER',
            label: 'Engadin Juniper & Crisp Ozone',
            notes: 'High alpine needles, mountain mint, glacial vapor',
        },
        {
            id: 'UNSCENTED',
            label: 'Neutralized Ozone (Unscented)',
            notes: 'Pure medical-grade air neutralization without botanical oils',
        },
    ],
    cellarOptions: [
        {
            id: 'BURGUNDY_GRAND_CRU',
            label: 'Premier & Grand Cru Burgundy Allocation',
            provenance: 'Domaine de la Romanée-Conti, Roumier, Coche-Dury allocations',
        },
        {
            id: 'SUPER_TUSCAN_RESERVE',
            label: 'Campania Whites & Super Tuscan Reserve',
            provenance: 'Sassicaia, Ornellaia, aged Fiano di Avellino from volcanic ash',
        },
        {
            id: 'BIODYNAMIC_MINERAL',
            label: 'Low-Intervention Biodynamic Natural Crus',
            provenance: 'Unfiltered, zero-sulfur amphora pressings from Etna & Jura',
        },
    ],
    initialValues: {
        honorific: 'Lady',
        firstName: 'Katherine',
        lastName: 'Vane-Tempest',
        email: 'k.vane-tempest@sovereign-holdings.co.uk',
        phoneCountryCode: '+44',
        phoneNumber: '7911 882901',
        passkey: 'SovereignKey#2025',
        conciergePin: '8829',
        selectedSanctuaryIds: ['sanctuary-positano', 'sanctuary-kyoto'],
        selectedAromaId: 'AMALFI_NEROLI_BERGAMOT',
        selectedCellarId: 'SUPER_TUSCAN_RESERVE',
        invitationToken: 'AUR-8829-SVR',
        agreeSwissPrivacy: true,
        agreeSensorySync: true,
    },
    submitCtaLabel: 'Submit Sovereign Application & Inscribe Folio',
    encryptionAssuranceText:
        'Protected under Swiss Federal Data Protection Act (FADP) and 256-bit TLS Cryptographic Protocol',
};

export interface RegisterEnrollmentFormProps {
    data?: RegisterFormData;
    className?: string;
    onSubmitApplication?: (values: RegisterFormInitialValues) => void;
    onAppleSovereignSync?: () => void;
    onConciergePassSync?: () => void;
}

export function RegisterEnrollmentForm({
    data = registerFormDefaultData,
    className = '',
    onSubmitApplication,
    onAppleSovereignSync,
    onConciergePassSync,
}: RegisterEnrollmentFormProps) {
    const router = useRouter();

    const {
        registryBadge,
        signInPromptText,
        signInLinkText,
        headline,
        subheadline,
        expeditedTitle,
        appleAuthLabel,
        conciergeAuthLabel,
        section1Number,
        section1Title,
        section1Sub,
        section2Number,
        section2Title,
        section2Sub,
        section3Number,
        section3Title,
        section3Sub,
        section4Number,
        section4Title,
        section4Sub,
        sanctuaryOptions,
        aromaOptions,
        cellarOptions,
        initialValues,
        submitCtaLabel,
        encryptionAssuranceText,
    } = data;

    // Component Form State
    const [values, setValues] = useState<RegisterFormInitialValues>(initialValues);
    const [showPasskey, setShowPasskey] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tokenVerified, setTokenVerified] = useState(true);

    // Live validation checks
    const hasMinLength = values.passkey.length >= 12;
    const hasUppercase = /[A-Z]/.test(values.passkey);
    const hasNumber = /[0-9]/.test(values.passkey);
    const hasSymbol = /[^A-Za-z0-9]/.test(values.passkey);
    const isPinValid = /^\d{4}$/.test(values.conciergePin);

    // Compute passkey strength score (0-4)
    const passkeyScore = [hasMinLength, hasUppercase, hasNumber, hasSymbol].filter(Boolean).length;

    function handleFieldChange<K extends keyof RegisterFormInitialValues>(
        field: K,
        val: RegisterFormInitialValues[K]
    ) {
        setValues(function (prev) {
            return {
                ...prev,
                [field]: val,
            };
        });
    }

    function handleToggleSanctuary(id: string) {
        const exists = values.selectedSanctuaryIds.includes(id);
        const nextIds = exists
            ? values.selectedSanctuaryIds.filter(function (s) {
                  return s !== id;
              })
            : [...values.selectedSanctuaryIds, id];

        handleFieldChange('selectedSanctuaryIds', nextIds);
    }

    function handleTokenChange(e: React.ChangeEvent<HTMLInputElement>) {
        const raw = e.target.value.toUpperCase();
        handleFieldChange('invitationToken', raw);
        // Simulate immediate client validation for recognized Sovereign tokens
        setTokenVerified(raw.startsWith('AUR-') || raw.startsWith('LUX-') || raw.length >= 8);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        if (onSubmitApplication) {
            onSubmitApplication(values);
        }

        // Simulate secure inscription and dispatch to Sovereign Profile
        setTimeout(function () {
            setIsSubmitting(false);
            router.push('/profile?registered=true');
        }, 1000);
    }

    return (
        <section
            className={`w-full max-w-3xl mx-auto flex flex-col justify-between p-6 sm:p-10 lg:p-12 text-[#1f1e1d] ${className}`}
        >
            <div className="space-y-10">
                {/* 1. TOP HEADER STRIP & NAVIGATION TO SIGN IN */}
                <div className="space-y-3 pb-6 border-b border-[#e8e4dc]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b]" />
                            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.26em] text-[#8e763b]">
                                {registryBadge}
                            </span>
                        </div>

                        <div className="text-xs font-sans text-[#78756d]">
                            <span>{signInPromptText} </span>
                            <Link
                                href="/login"
                                className="font-semibold text-[#1f1e1d] hover:text-[#8e763b] underline transition-colors"
                            >
                                {signInLinkText}
                            </Link>
                        </div>
                    </div>

                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#1f1e1d] tracking-tight leading-[1.12]">
                        {headline}
                    </h1>

                    <p className="text-xs sm:text-[13px] text-[#5f5c56] font-sans font-light leading-relaxed max-w-2xl">
                        {subheadline}
                    </p>
                </div>

                {/* 2. EXPEDITED CREDENTIALS SHORTCUTS (Apple Sovereign & Concierge Pass) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#f6f2ea] border border-[#ded9ce] space-y-3 shadow-2xs">
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8e8a82] block">
                        {expeditedTitle}
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                        <button
                            type="button"
                            onClick={onAppleSovereignSync}
                            className="p-3 rounded-xl bg-white hover:bg-[#faf7f0] border border-[#ded9ce] flex items-center justify-center gap-2 transition-colors shadow-2xs group"
                        >
                            <svg className="w-3.5 h-3.5 fill-current text-[#1f1e1d]" viewBox="0 0 170 170">
                                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.7-7.94-12.04-14.58-6.19-9.49-11.03-20.25-14.52-32.27-3.48-12.02-5.23-23.47-5.23-34.34 0-14.15 3.53-26.02 10.59-35.61 7.06-9.59 16.03-14.48 26.92-14.67 4.93 0 10.42 1.34 16.48 4.02 6.06 2.68 10.1 4.09 12.12 4.23 1.83-.14 6.08-1.63 12.74-4.48 6.67-2.85 12.35-4.08 17.06-3.7 12.63.66 22.75 5.06 30.36 13.2-11.01 6.66-16.39 15.75-16.14 27.27.24 8.98 3.73 16.59 10.47 22.83 6.74 6.24 14.88 9.77 24.42 10.59-2.07 6.42-4.55 12.69-7.44 18.8zM119.22 33.15c0-7.23 2.66-14.11 7.98-20.64 5.32-6.53 11.89-10.7 19.71-12.51.55 1.5.83 3.03.83 4.59 0 7.23-2.73 14.22-8.19 20.97-5.46 6.75-12.06 10.87-19.8 12.36-.18-1.57-.27-3.13-.27-4.77z" />
                            </svg>
                            <span className="font-semibold uppercase tracking-wider text-[10px]">
                                {appleAuthLabel}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={onConciergePassSync}
                            className="p-3 rounded-xl bg-white hover:bg-[#faf7f0] border border-[#ded9ce] flex items-center justify-center gap-2 transition-colors shadow-2xs group"
                        >
                            <span className="text-[#8e763b] text-sm leading-none">☆</span>
                            <span className="font-semibold uppercase tracking-wider text-[10px] text-[#2c2a26]">
                                {conciergeAuthLabel}
                            </span>
                        </button>
                    </div>
                </div>

                {/* 3. PRIMARY ENROLLMENT FORM */}
                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* ------------------------------------------------------------- */}
                    {/* SECTION 01: SOVEREIGN IDENTITY                                */}
                    {/* ------------------------------------------------------------- */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5 pb-2 border-b border-[#eeeae2]">
                            <span className="w-5 h-5 rounded-full bg-[#1f1e1d] text-white flex items-center justify-center font-mono text-[10px] font-semibold">
                                {section1Number}
                            </span>
                            <div>
                                <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1f1e1d] tracking-tight">
                                    {section1Title}
                                </h3>
                                <span className="text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-[#8e8a82]">
                                    {section1Sub}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                            {/* Honorific Dropdown (3 cols) */}
                            <div className="sm:col-span-3 space-y-1.5">
                                <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.16em] text-[#6d6961]">
                                    HONORIFIC *
                                </label>
                                <select
                                    value={values.honorific}
                                    onChange={function (e) {
                                        handleFieldChange('honorific', e.target.value);
                                    }}
                                    className="w-full px-3.5 py-3 rounded-xl bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] shadow-2xs"
                                >
                                    <option value="Lady">Lady</option>
                                    <option value="Lord">Lord</option>
                                    <option value="Baron">Baron</option>
                                    <option value="Baroness">Baroness</option>
                                    <option value="Count">Count</option>
                                    <option value="Countess">Countess</option>
                                    <option value="Dr.">Dr.</option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Ms.">Ms.</option>
                                </select>
                            </div>

                            {/* First Legal Name (4 cols) */}
                            <div className="sm:col-span-4 space-y-1.5">
                                <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.16em] text-[#6d6961]">
                                    GIVEN NAME *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={values.firstName}
                                    onChange={function (e) {
                                        handleFieldChange('firstName', e.target.value);
                                    }}
                                    placeholder="e.g. Katherine"
                                    className="w-full px-3.5 py-3 rounded-xl bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] shadow-2xs placeholder-[#a4a098]"
                                />
                            </div>

                            {/* Family Surname (5 cols) */}
                            <div className="sm:col-span-5 space-y-1.5">
                                <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.16em] text-[#6d6961]">
                                    FAMILY SURNAME *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={values.lastName}
                                    onChange={function (e) {
                                        handleFieldChange('lastName', e.target.value);
                                    }}
                                    placeholder="e.g. Vane-Tempest"
                                    className="w-full px-3.5 py-3 rounded-xl bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] shadow-2xs placeholder-[#a4a098]"
                                />
                            </div>

                            {/* Folio Correspondence Email (6 cols) */}
                            <div className="sm:col-span-6 space-y-1.5">
                                <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.16em] text-[#6d6961]">
                                    FOLIO CORRESPONDENCE EMAIL *
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        value={values.email}
                                        onChange={function (e) {
                                            handleFieldChange('email', e.target.value);
                                        }}
                                        placeholder="patron@sovereign-holdings.co.uk"
                                        className="w-full pl-9 pr-3.5 py-3 rounded-xl bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] shadow-2xs placeholder-[#a4a098]"
                                    />
                                    <svg
                                        className="w-3.5 h-3.5 text-[#8e763b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <rect x="3" y="5" width="18" height="14" rx="2" />
                                        <polyline points="3 7 12 13 21 7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Direct Mobile (6 cols) */}
                            <div className="sm:col-span-6 space-y-1.5">
                                <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.16em] text-[#6d6961]">
                                    DIRECT MOBILE (MAJORDOMO SMS) *
                                </label>
                                <div className="flex gap-2">
                                    <select
                                        value={values.phoneCountryCode}
                                        onChange={function (e) {
                                            handleFieldChange('phoneCountryCode', e.target.value);
                                        }}
                                        className="px-2.5 py-3 rounded-xl bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] shadow-2xs shrink-0"
                                    >
                                        <option value="+44">+44 (UK)</option>
                                        <option value="+41">+41 (CH)</option>
                                        <option value="+1">+1 (US)</option>
                                        <option value="+39">+39 (IT)</option>
                                        <option value="+33">+33 (FR)</option>
                                        <option value="+971">+971 (AE)</option>
                                    </select>
                                    <input
                                        type="tel"
                                        required
                                        value={values.phoneNumber}
                                        onChange={function (e) {
                                            handleFieldChange('phoneNumber', e.target.value);
                                        }}
                                        placeholder="7911 882901"
                                        className="w-full px-3.5 py-3 rounded-xl bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] shadow-2xs placeholder-[#a4a098]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ------------------------------------------------------------- */}
                    {/* SECTION 02: SECURITY & CONCIERGE PASSKEY                      */}
                    {/* ------------------------------------------------------------- */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5 pb-2 border-b border-[#eeeae2]">
                            <span className="w-5 h-5 rounded-full bg-[#1f1e1d] text-white flex items-center justify-center font-mono text-[10px] font-semibold">
                                {section2Number}
                            </span>
                            <div>
                                <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1f1e1d] tracking-tight">
                                    {section2Title}
                                </h3>
                                <span className="text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-[#8e8a82]">
                                    {section2Sub}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                            {/* Passkey Input (8 cols) */}
                            <div className="sm:col-span-8 space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.16em] text-[#6d6961]">
                                        CREATE SOVEREIGN PASSKEY * (MIN 12 GLYPHS)
                                    </label>
                                    <button
                                        type="button"
                                        onClick={function () {
                                            setShowPasskey(!showPasskey);
                                        }}
                                        className="text-[10px] font-sans uppercase tracking-wider text-[#8e763b] hover:text-[#1f1e1d]"
                                    >
                                        {showPasskey ? 'HIDE' : 'SHOW'}
                                    </button>
                                </div>

                                <div className="relative">
                                    <input
                                        type={showPasskey ? 'text' : 'password'}
                                        required
                                        value={values.passkey}
                                        onChange={function (e) {
                                            handleFieldChange('passkey', e.target.value);
                                        }}
                                        className="w-full pl-9 pr-3.5 py-3 rounded-xl bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] shadow-2xs"
                                    />
                                    <svg
                                        className="w-3.5 h-3.5 text-[#8e763b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </div>

                                {/* Cryptographic Strength Gauge */}
                                <div className="pt-1.5 space-y-1.5">
                                    <div className="flex gap-1 h-1 w-full bg-[#eeeae2] rounded-full overflow-hidden">
                                        <span
                                            className={`h-full transition-all duration-300 ${
                                                passkeyScore >= 1 ? 'w-1/4 bg-amber-500' : 'w-0'
                                            }`}
                                        />
                                        <span
                                            className={`h-full transition-all duration-300 ${
                                                passkeyScore >= 2 ? 'w-1/4 bg-amber-500' : 'w-0'
                                            }`}
                                        />
                                        <span
                                            className={`h-full transition-all duration-300 ${
                                                passkeyScore >= 3 ? 'w-1/4 bg-emerald-500' : 'w-0'
                                            }`}
                                        />
                                        <span
                                            className={`h-full transition-all duration-300 ${
                                                passkeyScore >= 4 ? 'w-1/4 bg-emerald-600' : 'w-0'
                                            }`}
                                        />
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-[#78756d]">
                                        <span className={hasMinLength ? 'text-emerald-700' : ''}>
                                            {hasMinLength ? '✓' : '○'} 12+ Glyphs
                                        </span>
                                        <span className={hasUppercase ? 'text-emerald-700' : ''}>
                                            {hasUppercase ? '✓' : '○'} Uppercase
                                        </span>
                                        <span className={hasNumber ? 'text-emerald-700' : ''}>
                                            {hasNumber ? '✓' : '○'} Numeral
                                        </span>
                                        <span className={hasSymbol ? 'text-emerald-700' : ''}>
                                            {hasSymbol ? '✓' : '○'} Symbol
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Verbal Concierge PIN (4 cols) */}
                            <div className="sm:col-span-4 space-y-1.5">
                                <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.16em] text-[#6d6961]">
                                    VERBAL CONCIERGE PIN *
                                </label>

                                <input
                                    type="text"
                                    maxLength={4}
                                    required
                                    value={values.conciergePin}
                                    onChange={function (e) {
                                        const clean = e.target.value.replace(/\D/g, '');
                                        handleFieldChange('conciergePin', clean);
                                    }}
                                    placeholder="8829"
                                    className="w-full px-3.5 py-3 rounded-xl bg-white border border-[#ded9ce] font-mono text-center text-sm tracking-[0.3em] font-semibold text-[#1f1e1d] outline-none focus:border-[#8e763b] shadow-2xs"
                                />

                                <span className="block text-[9px] font-sans text-[#8e8a82] leading-tight text-center">
                                    {isPinValid
                                        ? '✓ 4-digit telephone clearance established'
                                        : 'Required for aviation & tender dispatch'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ------------------------------------------------------------- */}
                    {/* SECTION 03: BESPOKE HOSPITALITY PREFERENCES                  */}
                    {/* ------------------------------------------------------------- */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-2.5 pb-2 border-b border-[#eeeae2]">
                            <span className="w-5 h-5 rounded-full bg-[#1f1e1d] text-white flex items-center justify-center font-mono text-[10px] font-semibold">
                                {section3Number}
                            </span>
                            <div>
                                <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1f1e1d] tracking-tight">
                                    {section3Title}
                                </h3>
                                <span className="text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-[#8e763b]">
                                    {section3Sub}
                                </span>
                            </div>
                        </div>

                        {/* A. Sanctuaries of Interest Multi-Select */}
                        <div className="space-y-2">
                            <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.16em] text-[#6d6961]">
                                PRIMARY SANCTUARIES OF PROSPECTIVE RESIDENCE (SELECT ALL THAT APPLY)
                            </label>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                {sanctuaryOptions.map(function (sanc) {
                                    const isSelected = values.selectedSanctuaryIds.includes(sanc.id);

                                    return (
                                        <button
                                            key={sanc.id}
                                            type="button"
                                            onClick={function () {
                                                handleToggleSanctuary(sanc.id);
                                            }}
                                            className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between space-y-1 ${
                                                isSelected
                                                    ? 'bg-[#1f1e1d] text-white border-[#1f1e1d] shadow-sm'
                                                    : 'bg-white hover:bg-[#faf7f0] border-[#ded9ce] text-[#1f1e1d]'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between w-full">
                                                <span
                                                    className={`font-mono text-[9px] font-semibold ${
                                                        isSelected ? 'text-[#bfa76f]' : 'text-[#8e763b]'
                                                    }`}
                                                >
                                                    {sanc.code}
                                                </span>
                                                <span
                                                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[9px] ${
                                                        isSelected
                                                            ? 'border-[#bfa76f] bg-[#bfa76f] text-[#1f1e1d]'
                                                            : 'border-[#ded9ce]'
                                                    }`}
                                                >
                                                    {isSelected ? '✓' : ''}
                                                </span>
                                            </div>

                                            <span className="font-serif text-xs font-semibold leading-tight block">
                                                {sanc.label}
                                            </span>
                                            <span
                                                className={`text-[9px] font-sans block truncate ${
                                                    isSelected ? 'text-white/70' : 'text-[#8e8a82]'
                                                }`}
                                            >
                                                {sanc.region}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* B. Olfactory Formulation Selector */}
                        <div className="space-y-2 pt-2">
                            <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.16em] text-[#6d6961]">
                                SUITE OLFACTORY CALIBRATION (PRE-ARRIVAL ATELIER AROMA)
                            </label>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {aromaOptions.map(function (aroma) {
                                    const isChosen = values.selectedAromaId === aroma.id;

                                    return (
                                        <div
                                            key={aroma.id}
                                            onClick={function () {
                                                handleFieldChange('selectedAromaId', aroma.id);
                                            }}
                                            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                                                isChosen
                                                    ? 'bg-[#f7f2e7] border-[#8e763b] shadow-xs'
                                                    : 'bg-white hover:bg-[#faf8f5] border-[#ded9ce]'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-serif text-xs font-semibold text-[#1f1e1d]">
                                                    {aroma.label}
                                                </span>
                                                <span
                                                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                                        isChosen
                                                            ? 'border-[#8e763b] bg-[#8e763b]'
                                                            : 'border-[#ded9ce]'
                                                    }`}
                                                >
                                                    {isChosen && (
                                                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                                    )}
                                                </span>
                                            </div>
                                            <p className="text-[10px] font-sans text-[#78756d] font-light mt-1 leading-snug">
                                                {aroma.notes}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* C. Epicurean & Cellar Preference */}
                        <div className="space-y-2 pt-2">
                            <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.16em] text-[#6d6961]">
                                CELLAR ALLOCATION PREFERENCE (SUBTERRANEAN SOMMELIER VAULT)
                            </label>

                            <div className="space-y-2">
                                {cellarOptions.map(function (cellar) {
                                    const isChosen = values.selectedCellarId === cellar.id;

                                    return (
                                        <div
                                            key={cellar.id}
                                            onClick={function () {
                                                handleFieldChange('selectedCellarId', cellar.id);
                                            }}
                                            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                                                isChosen
                                                    ? 'bg-[#f7f2e7] border-[#8e763b] shadow-xs'
                                                    : 'bg-white hover:bg-[#faf8f5] border-[#ded9ce]'
                                            }`}
                                        >
                                            <div>
                                                <span className="font-serif text-xs font-semibold text-[#1f1e1d] block">
                                                    {cellar.label}
                                                </span>
                                                <span className="text-[10px] font-sans text-[#78756d] block font-light mt-0.5">
                                                    {cellar.provenance}
                                                </span>
                                            </div>

                                            <span
                                                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                                                    isChosen
                                                        ? 'border-[#8e763b] bg-[#8e763b]'
                                                        : 'border-[#ded9ce]'
                                                }`}
                                            >
                                                {isChosen && (
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                                )}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* ------------------------------------------------------------- */}
                    {/* SECTION 04: INVITATION TOKEN & VALIDATION                     */}
                    {/* ------------------------------------------------------------- */}
                    <div className="space-y-3.5">
                        <div className="flex items-center gap-2.5 pb-2 border-b border-[#eeeae2]">
                            <span className="w-5 h-5 rounded-full bg-[#1f1e1d] text-white flex items-center justify-center font-mono text-[10px] font-semibold">
                                {section4Number}
                            </span>
                            <div>
                                <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1f1e1d] tracking-tight">
                                    {section4Title}
                                </h3>
                                <span className="text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-[#8e8a82]">
                                    {section4Sub}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row gap-2.5">
                                <input
                                    type="text"
                                    value={values.invitationToken}
                                    onChange={handleTokenChange}
                                    placeholder="E.G. AUR-8829-SVR"
                                    className="flex-1 px-4 py-3 rounded-xl bg-white border border-[#ded9ce] font-mono text-xs uppercase tracking-widest text-[#1f1e1d] outline-none focus:border-[#8e763b] shadow-2xs"
                                />

                                <div className="inline-flex items-center gap-2 px-3.5 py-3 rounded-xl bg-[#f6f2ea] border border-[#ded9ce] shrink-0">
                                    <span
                                        className={`w-2 h-2 rounded-full ${
                                            tokenVerified ? 'bg-emerald-500 animate-pulse' : 'bg-[#8e763b]'
                                        }`}
                                    />
                                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#1f1e1d]">
                                        {tokenVerified
                                            ? '✓ VALIDATED: TIER I ENCLAVE'
                                            : 'UNVERIFIED (CURATOR AUDIT)'}
                                    </span>
                                </div>
                            </div>

                            <span className="block text-[10px] font-sans text-[#8e8a82]">
                                If you do not hold an invitation code, leave blank for manual Curatorial Council review.
                            </span>
                        </div>
                    </div>

                    {/* ------------------------------------------------------------- */}
                    {/* CONSENT PROTOCOLS & LEGAL CHECKBOXES                          */}
                    {/* ------------------------------------------------------------- */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#f6f2ea]/80 border border-[#ded9ce] space-y-3 text-xs font-sans">
                        <label className="flex items-start gap-3 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                required
                                checked={values.agreeSwissPrivacy}
                                onChange={function (e) {
                                    handleFieldChange('agreeSwissPrivacy', e.target.checked);
                                }}
                                className="w-4 h-4 rounded border-[#ded9ce] text-[#8e763b] focus:ring-0 mt-0.5"
                            />
                            <span className="text-[11px] text-[#55524d] font-light leading-relaxed">
                                I agree to the <strong className="font-semibold text-[#1f1e1d]">Aurelia Confidentiality Protocol</strong> and Swiss Federal Data Protection Standards. My identity will never be disclosed to commercial third parties.
                            </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer select-none pt-2 border-t border-[#ded9ce]/70">
                            <input
                                type="checkbox"
                                checked={values.agreeSensorySync}
                                onChange={function (e) {
                                    handleFieldChange('agreeSensorySync', e.target.checked);
                                }}
                                className="w-4 h-4 rounded border-[#ded9ce] text-[#8e763b] focus:ring-0 mt-0.5"
                            />
                            <span className="text-[11px] text-[#55524d] font-light leading-relaxed">
                                Permit sensory ambiance, dietary nuances, and cellar preferences to harmonize across all global Aurelia sanctuaries prior to arrival.
                            </span>
                        </label>
                    </div>

                    {/* ------------------------------------------------------------- */}
                    {/* SUBMIT BUTTON & ENCRYPTION PROTOCOL STRIP                     */}
                    {/* ------------------------------------------------------------- */}
                    <div className="space-y-3 pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-xs font-semibold uppercase tracking-[0.24em] transition-all shadow-md active:translate-y-0.5 disabled:opacity-75 group"
                        >
                            <span>
                                {isSubmitting
                                    ? 'Inscribing Sovereign Folio...'
                                    : submitCtaLabel}
                            </span>
                            <span className="text-sm font-normal transform transition-transform duration-300 group-hover:translate-x-1">
                                →
                            </span>
                        </button>

                        <div className="flex items-center justify-center gap-2 text-center text-[10px] font-sans text-[#8e8a82]">
                            <svg
                                className="w-3.5 h-3.5 text-[#8e763b] shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <span>{encryptionAssuranceText}</span>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}