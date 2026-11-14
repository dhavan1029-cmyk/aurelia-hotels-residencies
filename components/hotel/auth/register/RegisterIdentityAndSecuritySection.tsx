'use client';

import React, { useState } from 'react';
import SovereignPhoneInput from '../SovereignPhoneInput';
import { CountryIso2 } from '@/lib/hotel/phoneValidator';
// import { SovereignPhoneInput } from './SovereignPhoneInput';

export interface RegisterIdentityValues {
    honorific: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneCountryCode: string;
    phoneNumber: string;
    selectedCountryIso: CountryIso2;
    passkey: string;
    conciergePin: string;
    isPhoneValid?: boolean;
}

export const DEFAULT_IDENTITY_VALUES: RegisterIdentityValues = {
    honorific: 'Lady',
    firstName: '',
    lastName: '',
    email: '',
    phoneCountryCode: '+44',
    phoneNumber: '',
    selectedCountryIso: 'GB',
    passkey: '',
    conciergePin: '',
    isPhoneValid: false,
};

export interface RegisterIdentityAndSecuritySectionProps {
    initialValues?: Partial<RegisterIdentityValues>;
    onChange?: (values: RegisterIdentityValues) => void;
    className?: string;
}

export function RegisterIdentityAndSecuritySection({
    initialValues = {},
    onChange,
    className = '',
}: RegisterIdentityAndSecuritySectionProps) {
    const [values, setValues] = useState<RegisterIdentityValues>({
        ...DEFAULT_IDENTITY_VALUES,
        ...initialValues,
    });

    const [showPasskey, setShowPasskey] = useState(false);

    const trimmedPasskey = values.passkey.trim();
    const hasMinLength = trimmedPasskey.length >= 12;
    const hasUppercase = /[A-Z]/.test(values.passkey);
    const hasLowercase = /[a-z]/.test(values.passkey);
    const hasNumber = /[0-9]/.test(values.passkey);
    const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(values.passkey);
    const hasLeadingOrTrailingSpaces = values.passkey.length > 0 && values.passkey !== trimmedPasskey;
    const isPinValid = /^\d{4}$/.test(values.conciergePin);

    const passkeyScore = [
        hasMinLength,
        hasUppercase && hasLowercase,
        hasNumber,
        hasSymbol,
    ].filter(Boolean).length;

    function handleFieldChange<K extends keyof RegisterIdentityValues>(
        field: K,
        val: RegisterIdentityValues[K]
    ) {
        const next = { ...values, [field]: val };
        setValues(next);
        if (onChange) {
            onChange(next);
        }
    }

    return (
        <div className={`space-y-10 select-none ${className}`}>
            <section aria-labelledby="section-01-heading" className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#eeeae2]">
                    <span className="w-5 h-5 rounded-full bg-[#1f1e1d] text-white flex items-center justify-center font-mono text-[10px] font-semibold">
                        01
                    </span>
                    <div>
                        <h3
                            id="section-01-heading"
                            className="font-serif text-lg sm:text-xl font-normal text-[#1f1e1d] tracking-tight"
                        >
                            Sovereign Identity
                        </h3>
                        <span className="text-[9px] font-mono font-medium uppercase tracking-[0.2em] text-[#8e8a82]">
                            CONFIDENTIAL FOLIO &amp; DIPLOMATIC CORRESPONDENCE DATA
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    {/* Honorific Title Dropdown (3 cols) */}
                    <div className="sm:col-span-3 space-y-1.5">
                        <label className="block text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-[#6d6961]">
                            HONORIFIC *
                        </label>
                        <select
                            name="honorific"
                            value={values.honorific}
                            onChange={function (e) {
                                handleFieldChange('honorific', e.target.value);
                            }}
                            className="w-full px-3.5 py-3 bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] shadow-2xs cursor-pointer"
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

                    {/* First Given Name (4 cols) */}
                    <div className="sm:col-span-4 space-y-1.5">
                        <label className="block text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-[#6d6961]">
                            GIVEN NAME *
                        </label>
                        <input
                            type="text"
                            required
                            name="firstName"
                            value={values.firstName}
                            onChange={function (e) {
                                handleFieldChange('firstName', e.target.value);
                            }}
                            placeholder="e.g. Katherine"
                            className="w-full px-3.5 py-3 bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] shadow-2xs placeholder-[#a4a098]"
                        />
                    </div>

                    {/* Family Surname (5 cols) */}
                    <div className="sm:col-span-5 space-y-1.5">
                        <label className="block text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-[#6d6961]">
                            FAMILY SURNAME *
                        </label>
                        <input
                            type="text"
                            required
                            name="lastName"
                            value={values.lastName}
                            onChange={function (e) {
                                handleFieldChange('lastName', e.target.value);
                            }}
                            placeholder="e.g. Vane-Tempest"
                            className="w-full px-3.5 py-3 bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] shadow-2xs placeholder-[#a4a098]"
                        />
                    </div>

                    {/* Primary Folio Correspondence Email (6 cols) */}
                    <div className="sm:col-span-6 space-y-1.5">
                        <label className="block text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-[#6d6961]">
                            FOLIO CORRESPONDENCE EMAIL *
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                name="email"
                                value={values.email}
                                onChange={function (e) {
                                    handleFieldChange('email', e.target.value);
                                }}
                                placeholder="patron@sovereign-holdings.co.uk"
                                className="w-full pl-9 pr-3.5 py-3 bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] shadow-2xs placeholder-[#a4a098]"
                            />
                            <svg
                                className="w-3.5 h-3.5 text-[#8e763b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden="true"
                            >
                                <rect x="3" y="5" width="18" height="14" rx="2" />
                                <polyline points="3 7 12 13 21 7" />
                            </svg>
                        </div>
                    </div>

                    {/* Direct Mobile Contact with Integrated SovereignPhoneInput (6 cols) */}
                    <div className="sm:col-span-6">
                        <SovereignPhoneInput
                            selectedIso={values.selectedCountryIso}
                            value={values.phoneNumber}
                            name="phoneNumber"
                            label="DIRECT MOBILE"
                            required={true}
                            onChange={function (res) {
                                const next = {
                                    ...values,
                                    phoneNumber: res.rawInput,
                                    phoneCountryCode: res.callingCode,
                                    selectedCountryIso: res.countryIso,
                                    isPhoneValid: res.isValid,
                                };
                                setValues(next);
                                if (onChange) {
                                    onChange(next);
                                }
                            }}
                        />
                    </div>
                </div>
            </section>

            <section aria-labelledby="section-02-heading" className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#eeeae2]">
                    <span className="w-5 h-5 rounded-full bg-[#1f1e1d] text-white flex items-center justify-center font-mono text-[10px] font-semibold">
                        02
                    </span>
                    <div>
                        <h3
                            id="section-02-heading"
                            className="font-serif text-lg sm:text-xl font-normal text-[#1f1e1d] tracking-tight"
                        >
                            Security &amp; Concierge Passkey
                        </h3>
                        <span className="text-[9px] font-mono font-medium uppercase tracking-[0.2em] text-[#8e8a82]">
                            DISCREET ACCESS KEYS &amp; ENCRYPTED TELEPHONE VERBAL PIN
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    {/* Passkey Input (8 cols) */}
                    <div className="sm:col-span-8 space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="block text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-[#6d6961]">
                                CREATE SOVEREIGN PASSKEY * (MIN 12 GLYPHS)
                            </label>
                            <button
                                type="button"
                                onClick={function () {
                                    setShowPasskey(!showPasskey);
                                }}
                                className="text-[10px] font-mono uppercase tracking-wider text-[#8e763b] hover:text-[#1f1e1d] transition-colors cursor-pointer"
                            >
                                {showPasskey ? 'HIDE' : 'SHOW'}
                            </button>
                        </div>

                        <div className="relative">
                            <input
                                type={showPasskey ? 'text' : 'password'}
                                required
                                name="passkey"
                                value={values.passkey}
                                onChange={function (e) {
                                    handleFieldChange('passkey', e.target.value);
                                }}
                                placeholder="Min 12 glyphs (passphrases with spaces welcome)"
                                className={`w-full pl-9 pr-3.5 py-3 bg-white border text-xs font-sans text-[#1f1e1d] outline-none shadow-2xs transition-colors ${
                                    hasLeadingOrTrailingSpaces
                                        ? 'border-amber-400 focus:border-amber-600'
                                        : 'border-[#ded9ce] focus:border-[#8e763b]'
                                }`}
                            />
                            <svg
                                className="w-3.5 h-3.5 text-[#8e763b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden="true"
                            >
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>

                        {hasLeadingOrTrailingSpaces && (
                            <span className="block text-[9px] font-mono text-amber-700 leading-tight">
                                Note: Leading or trailing spaces will be trimmed upon folio inscription.
                            </span>
                        )}

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
                                <span className={hasMinLength ? 'text-emerald-700 font-medium' : ''}>
                                    {hasMinLength ? '✓' : '○'} 12+ Glyphs (Non-Whitespace)
                                </span>
                                <span className={hasUppercase && hasLowercase ? 'text-emerald-700 font-medium' : ''}>
                                    {hasUppercase && hasLowercase ? '✓' : '○'} Upper &amp; Lowercase
                                </span>
                                <span className={hasNumber ? 'text-emerald-700 font-medium' : ''}>
                                    {hasNumber ? '✓' : '○'} Numeral
                                </span>
                                <span className={hasSymbol ? 'text-emerald-700 font-medium' : ''}>
                                    {hasSymbol ? '✓' : '○'} Symbol (Excl. Spaces)
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Verbal Concierge PIN (4 cols) */}
                    <div className="sm:col-span-4 space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="block text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-[#6d6961]">
                                VERBAL CONCIERGE PIN *
                            </label>
                            <span className="text-[9px] font-mono text-[#8e763b]">4 DIGITS</span>
                        </div>

                        <input
                            type="text"
                            maxLength={4}
                            required
                            name="conciergePin"
                            value={values.conciergePin}
                            onChange={function (e) {
                                const clean = e.target.value.replace(/\D/g, '');
                                handleFieldChange('conciergePin', clean);
                            }}
                            placeholder="••••"
                            className="w-full px-3.5 py-3 bg-white border border-[#ded9ce] font-mono text-center text-sm tracking-[0.3em] font-semibold text-[#1f1e1d] outline-none focus:border-[#8e763b] shadow-2xs placeholder-[#a4a098]"
                        />

                        <span className="block text-[9px] font-mono text-[#8e8a82] leading-tight text-center">
                            {isPinValid
                                ? '✓ 4-digit telephone clearance established'
                                : 'Choose 4 digits for aviation & tender dispatch'}
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default RegisterIdentityAndSecuritySection;
