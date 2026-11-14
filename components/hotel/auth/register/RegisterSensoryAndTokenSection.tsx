'use client';

import React, { useState } from 'react';

// ============================================================================
// 1. DATA CONTRACTS & INITIAL VALUES
// ============================================================================

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
    notes: string;
}

export interface RegisterSensoryAndTokenValues {
    selectedSanctuaryIds: string[];
    selectedAromaId: string;
    selectedCellarId: string;
    invitationToken: string;
    agreeSwissPrivacy: boolean;
    agreeSensorySync: boolean;
}

export const CANONICAL_SANCTUARIES: SanctuaryChoiceOption[] = [
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
];

export const CANONICAL_AROMAS: OlfactoryChoiceOption[] = [
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
];

export const CANONICAL_CELLAR_ALLOCATIONS: CellarChoiceOption[] = [
    {
        id: 'BURGUNDY_GRAND_CRU',
        label: 'Premier & Grand Cru Burgundy Allocation',
        notes: 'Domaine de la Romanée-Conti, Roumier, Coche-Dury allocations',
    },
    {
        id: 'SUPER_TUSCAN_RESERVE',
        label: 'Campania Whites & Super Tuscan Reserve',
        notes: 'Sassicaia, Ornellaia, aged Fiano di Avellino from volcanic ash',
    },
    {
        id: 'BIODYNAMIC_MINERAL',
        label: 'Low-Intervention Biodynamic Natural Crus',
        notes: 'Unfiltered, zero-sulfur amphora pressings from Etna & Jura',
    },
];

export const DEFAULT_SENSORY_AND_TOKEN_VALUES: RegisterSensoryAndTokenValues = {
    selectedSanctuaryIds: ['sanctuary-positano', 'sanctuary-kyoto'],
    selectedAromaId: 'AMALFI_NEROLI_BERGAMOT',
    selectedCellarId: 'SUPER_TUSCAN_RESERVE',
    invitationToken: '',
    agreeSwissPrivacy: true,
    agreeSensorySync: true,
};

export interface RegisterSensoryAndTokenSectionProps {
    initialValues?: Partial<RegisterSensoryAndTokenValues>;
    onChange?: (values: RegisterSensoryAndTokenValues) => void;
    onSubmit?: (values: RegisterSensoryAndTokenValues) => void;
    isSubmitting?: boolean;
    className?: string;
}

// ============================================================================
// 2. ISOLATED LEAF CLIENT COMPONENT IMPLEMENTATION
// ============================================================================

export function RegisterSensoryAndTokenSection({
    initialValues = {},
    onChange,
    onSubmit,
    isSubmitting = false,
    className = '',
}: RegisterSensoryAndTokenSectionProps) {
    const [values, setValues] = useState<RegisterSensoryAndTokenValues>({
        ...DEFAULT_SENSORY_AND_TOKEN_VALUES,
        ...initialValues,
    });

    const isTokenVerified =
        values.invitationToken.startsWith('AUR-') ||
        values.invitationToken.startsWith('LUX-') ||
        values.invitationToken.length >= 8;

    function handleFieldChange<K extends keyof RegisterSensoryAndTokenValues>(
        field: K,
        val: RegisterSensoryAndTokenValues[K]
    ) {
        const next = { ...values, [field]: val };
        setValues(next);
        if (onChange) {
            onChange(next);
        }
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

    function handleTokenInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const clean = e.target.value.toUpperCase();
        handleFieldChange('invitationToken', clean);
    }

    function handleSubmitTrigger(e: React.FormEvent) {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(values);
        }
    }

    return (
        <div className={`space-y-10 select-none ${className}`}>
            {/* ------------------------------------------------------------- */}
            {/* SECTION 03: BESPOKE HOSPITALITY PREFERENCES                  */}
            {/* ------------------------------------------------------------- */}
            <section aria-labelledby="section-03-heading" className="space-y-5">
                <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#eeeae2]">
                    <span className="w-5 h-5 rounded-full bg-[#1f1e1d] text-white flex items-center justify-center font-mono text-[10px] font-semibold">
                        03
                    </span>
                    <div>
                        <h3
                            id="section-03-heading"
                            className="font-serif text-lg sm:text-xl font-normal text-[#1f1e1d] tracking-tight"
                        >
                            Bespoke Hospitality Preferences
                        </h3>
                        <span className="text-[9px] font-mono font-medium uppercase tracking-[0.2em] text-[#8e8a82]">
                            TAILORED AMBIANCE, OLFACTORY FORMULATION & CELLAR ALLOCATION
                        </span>
                    </div>
                </div>

                {/* Sub-item A: Primary Sanctuaries Selection Chips */}
                <div className="space-y-2">
                    <label className="block text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-[#6d6961]">
                        PRIMARY SANCTUARIES OF PROSPECTIVE RESIDENCE (SELECT ALL THAT APPLY)
                    </label>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {CANONICAL_SANCTUARIES.map(function (sanc) {
                            const isSelected = values.selectedSanctuaryIds.includes(sanc.id);

                            return (
                                <button
                                    key={sanc.id}
                                    type="button"
                                    onClick={function () {
                                        handleToggleSanctuary(sanc.id);
                                    }}
                                    className={`p-3 border text-left transition-all duration-200 flex flex-col justify-between space-y-1 shadow-2xs ${
                                        isSelected
                                            ? 'bg-[#1f1e1d] text-white border-[#1f1e1d]'
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
                                                    ? 'border-[#bfa76f] bg-[#bfa76f] text-[#1f1e1d] font-bold'
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

                {/* Sub-item B: Suite Olfactory Formulation Selector */}
                <div className="space-y-2 pt-2">
                    <label className="block text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-[#6d6961]">
                        SUITE OLFACTORY CALIBRATION (PRE-ARRIVAL ATELIER AROMA)
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {CANONICAL_AROMAS.map(function (aroma) {
                            const isChosen = values.selectedAromaId === aroma.id;

                            return (
                                <div
                                    key={aroma.id}
                                    onClick={function () {
                                        handleFieldChange('selectedAromaId', aroma.id);
                                    }}
                                    className={`p-3.5 border cursor-pointer transition-all duration-200 shadow-2xs ${
                                        isChosen
                                            ? 'bg-[#f7f2e7] border-[#8e763b]'
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

                {/* Sub-item C: Subterranean Cellar Allocation Preference */}
                <div className="space-y-2 pt-2">
                    <label className="block text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-[#6d6961]">
                        CELLAR ALLOCATION PREFERENCE (SUBTERRANEAN SOMMELIER VAULT)
                    </label>

                    <div className="space-y-2">
                        {CANONICAL_CELLAR_ALLOCATIONS.map(function (cellar) {
                            const isChosen = values.selectedCellarId === cellar.id;

                            return (
                                <div
                                    key={cellar.id}
                                    onClick={function () {
                                        handleFieldChange('selectedCellarId', cellar.id);
                                    }}
                                    className={`p-3.5 border cursor-pointer transition-all duration-200 flex items-center justify-between shadow-2xs ${
                                        isChosen
                                            ? 'bg-[#f7f2e7] border-[#8e763b]'
                                            : 'bg-white hover:bg-[#faf8f5] border-[#ded9ce]'
                                    }`}
                                >
                                    <div className="min-w-0 pr-3">
                                        <span className="font-serif text-xs font-semibold text-[#1f1e1d] block">
                                            {cellar.label}
                                        </span>
                                        <span className="text-[10px] font-sans text-[#78756d] block font-light mt-0.5 leading-snug">
                                            {cellar.notes}
                                        </span>
                                    </div>

                                    <span
                                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
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
            </section>

            {/* ------------------------------------------------------------- */}
            {/* SECTION 04: INVITATION TOKEN & VALIDATION                     */}
            {/* ------------------------------------------------------------- */}
            <section aria-labelledby="section-04-heading" className="space-y-3.5">
                <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#eeeae2]">
                    <span className="w-5 h-5 rounded-full bg-[#1f1e1d] text-white flex items-center justify-center font-mono text-[10px] font-semibold">
                        04
                    </span>
                    <div>
                        <h3
                            id="section-04-heading"
                            className="font-serif text-lg sm:text-xl font-normal text-[#1f1e1d] tracking-tight"
                        >
                            Invitation Token or Folio Reference
                        </h3>
                        <span className="text-[9px] font-mono font-medium uppercase tracking-[0.2em] text-[#8e8a82]">
                            PEER-SPONSORED OR CURATORIAL GUILD DISPATCH NUMBER
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row gap-2.5">
                        <input
                            type="text"
                            value={values.invitationToken}
                            onChange={handleTokenInputChange}
                            placeholder="E.G. AUR-8829-SVR"
                            className="flex-1 px-4 py-3 bg-white border border-[#ded9ce] font-mono text-xs uppercase tracking-widest text-[#1f1e1d] outline-none focus:border-[#8e763b] shadow-2xs placeholder-[#a4a098]"
                        />

                        <div className="inline-flex items-center gap-2 px-3.5 py-3 bg-[#f6f2ea] border border-[#ded9ce] shrink-0 shadow-2xs">
                            <span
                                className={`w-2 h-2 rounded-full ${
                                    isTokenVerified ? 'bg-emerald-500 animate-pulse' : 'bg-[#8e763b]'
                                }`}
                            />
                            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#1f1e1d]">
                                {isTokenVerified
                                    ? '✓ VALIDATED: TIER I ENCLAVE'
                                    : 'UNVERIFIED (CURATOR AUDIT)'}
                            </span>
                        </div>
                    </div>

                    <span className="block text-[10px] font-sans text-[#8e8a82] leading-tight">
                        If you do not hold an invitation code, leave blank for manual Curatorial Council review.
                    </span>
                </div>
            </section>

            {/* ------------------------------------------------------------- */}
            {/* CONSENT PROTOCOLS & SWISS PRIVACY CHECKBOXES                  */}
            {/* ------------------------------------------------------------- */}
            <div className="p-4 sm:p-5 bg-[#f6f2ea]/90 border border-[#ded9ce] space-y-3 text-xs font-sans shadow-2xs">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        required
                        checked={values.agreeSwissPrivacy}
                        onChange={function (e) {
                            handleFieldChange('agreeSwissPrivacy', e.target.checked);
                        }}
                        className="w-4 h-4 rounded border-[#ded9ce] text-[#8e763b] focus:ring-0 mt-0.5 accent-[#8e763b]"
                    />
                    <span className="text-[11px] text-[#55524d] font-light leading-relaxed">
                        I agree to the <strong className="font-semibold text-[#1f1e1d]">Aurelia Confidentiality Protocol</strong> and Swiss Federal Data Protection Standards. My identity will never be disclosed to commercial third parties.
                    </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer select-none pt-2.5 border-t border-[#ded9ce]/80">
                    <input
                        type="checkbox"
                        checked={values.agreeSensorySync}
                        onChange={function (e) {
                            handleFieldChange('agreeSensorySync', e.target.checked);
                        }}
                        className="w-4 h-4 rounded border-[#ded9ce] text-[#8e763b] focus:ring-0 mt-0.5 accent-[#8e763b]"
                    />
                    <span className="text-[11px] text-[#55524d] font-light leading-relaxed">
                        Permit sensory ambiance, dietary nuances, and cellar preferences to harmonize across all global Aurelia sanctuaries prior to arrival.
                    </span>
                </label>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* SUBMIT BUTTON & 256-BIT CRYPTOGRAPHIC PROTOCOL STRIP          */}
            {/* ------------------------------------------------------------- */}
            <div className="space-y-3 pt-2">
                <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmitTrigger}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-xs font-semibold uppercase tracking-[0.24em] transition-all shadow-md active:translate-y-0.5 disabled:opacity-75 group"
                >
                    <span>
                        {isSubmitting
                            ? 'Inscribing Sovereign Folio...'
                            : 'Submit Sovereign Application & Inscribe Folio'}
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
                        aria-hidden="true"
                    >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>
                        Protected under Swiss Federal Data Protection Act (FADP) and 256-bit TLS Cryptographic Protocol
                    </span>
                </div>
            </div>
        </div>
    );
}

export default RegisterSensoryAndTokenSection;