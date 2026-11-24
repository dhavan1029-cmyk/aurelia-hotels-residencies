'use client';

import React, { useState, useEffect, useId } from 'react';
import {
    CountryIso2,
    STRICT_COUNTRY_PLANS,
    STRICT_COUNTRY_LIST,
    validatePhoneNumberStrict,
    StrictValidationResult,
} from '@/lib/data/phoneValidator';

export interface SovereignPhoneInputProps {
    /** Initial or bound country ISO code (e.g. 'GB', 'US', 'CH', 'IT') */
    selectedIso?: CountryIso2;
    /** Initial or bound phone number string */
    value?: string;
    /** Form name attribute */
    name?: string;
    /** Label text displayed in quiet luxury typography */
    label?: string;
    /** Required field flag */
    required?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Custom CSS class wrapper */
    className?: string;
    /** Change callback returning complete validation telemetry */
    onChange?: (result: StrictValidationResult) => void;
}

export function SovereignPhoneInput({
    selectedIso = 'GB',
    value = '',
    name = 'phoneNumber',
    label = 'DIRECT MOBILE',
    required = true,
    disabled = false,
    className = '',
    onChange,
}: SovereignPhoneInputProps) {
    const inputId = useId();
    const selectId = useId();

    const [countryIso, setCountryIso] = useState<CountryIso2>(selectedIso);
    const [rawInput, setRawInput] = useState<string>(value);
    const [isTouched, setIsTouched] = useState<boolean>(false);

    // Sync external value updates
    useEffect(function () {
        if (value !== rawInput) {
            setRawInput(value || '');
        }
    }, [value]);

    // Sync external ISO updates
    useEffect(function () {
        if (selectedIso && selectedIso !== countryIso && STRICT_COUNTRY_PLANS[selectedIso]) {
            setCountryIso(selectedIso);
        }
    }, [selectedIso]);

    const activePlan = STRICT_COUNTRY_PLANS[countryIso] || STRICT_COUNTRY_PLANS.GB;
    const validation = validatePhoneNumberStrict(rawInput, countryIso);

    // Dynamic HTML5 pattern enforcing exact digit counts
    const dynamicPattern = activePlan.minLen === activePlan.maxLen
        ? `^(\\D*\\d){${activePlan.minLen}}\\D*$`
        : `^(\\D*\\d){${activePlan.minLen},${activePlan.maxLen}}\\D*$`;

    function triggerValidationAndNotify(nextValue: string, nextIso: CountryIso2) {
        const nextValidation = validatePhoneNumberStrict(nextValue, nextIso);
        if (onChange) {
            onChange(nextValidation);
        }
    }

    function handleCountrySelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const newIso = e.target.value as CountryIso2;
        setCountryIso(newIso);
        triggerValidationAndNotify(rawInput, newIso);
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        setRawInput(val);
        if (!isTouched) setIsTouched(true);
        triggerValidationAndNotify(val, countryIso);
    }

    function handleInputBlur() {
        if (!isTouched) setIsTouched(true);
    }

    const hasDigits = validation.cleanNationalDigits.length > 0;
    const showSuccess = hasDigits && validation.isValid;
    const showError = isTouched && hasDigits && !validation.isValid;

    return (
        <div className={`space-y-1.5 select-none ${className}`}>
            {/* Header: Label & Plan Mask Info */}
            <div className="flex items-center justify-between">
                <label
                    htmlFor={inputId}
                    className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6d6961]"
                >
                    {label} {required && <span className="text-[#8e763b]">*</span>}
                </label>

                <span className="text-[9px] font-mono text-[#8e763b] uppercase tracking-wider">
                    {activePlan.minLen === activePlan.maxLen
                        ? `${activePlan.minLen} DIGITS`
                        : `${activePlan.minLen}–${activePlan.maxLen} DIGITS`} • FORMAT: {activePlan.mask}
                </span>
            </div>

            {/* Input Dual Pill Strip: Country Select + Phone Input Field */}
            <div className="flex gap-2">
                {/* Styled Native Country Select Dropdown */}
                <div className="relative shrink-0">
                    <label htmlFor={selectId} className="sr-only">
                        Select country calling code
                    </label>
                    <select
                        id={selectId}
                        name={`${name}_countryIso`}
                        value={countryIso}
                        disabled={disabled}
                        onChange={handleCountrySelect}
                        className="w-44 sm:w-48 px-2.5 py-3 bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] shadow-2xs truncate cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed appearance-none pr-7"
                    >
                        {STRICT_COUNTRY_LIST.map(function (c) {
                            return (
                                <option key={c.iso} value={c.iso}>
                                    {c.name} ({c.callingCode})
                                </option>
                            );
                        })}
                    </select>

                    <svg
                        className="w-3.5 h-3.5 text-[#8e763b] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>

                {/* Telephone Number Input Field with Real-Time Validation Feedback */}
                <div className="relative w-full">
                    <input
                        id={inputId}
                        type="tel"
                        name={name}
                        required={required}
                        disabled={disabled}
                        pattern={dynamicPattern}
                        value={rawInput}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        placeholder={activePlan.example}
                        autoComplete="tel-national"
                        className={`w-full px-3.5 py-3 bg-white border text-xs font-sans text-[#1f1e1d] outline-none shadow-2xs placeholder-[#a4a098] transition-colors pr-9 ${
                            showError
                                ? 'border-rose-400 focus:border-rose-600 bg-rose-50/20'
                                : showSuccess
                                ? 'border-emerald-600/70 focus:border-emerald-600 bg-emerald-50/15'
                                : 'border-[#ded9ce] focus:border-[#8e763b]'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                    />

                    {/* Status Feedback Badge (Valid / Invalid) */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 select-none pointer-events-none flex items-center">
                        {showSuccess ? (
                            <span className="text-emerald-600 font-bold text-xs" title="Telephone number valid">
                                ✓
                            </span>
                        ) : showError ? (
                            <span className="text-rose-500 font-bold text-xs" title="Telephone format exception">
                                !
                            </span>
                        ) : null}
                    </div>
                </div>
            </div>

            {/* Error & Format Help Strip */}
            <div className="min-h-4">
                {showError ? (
                    <span className="block text-[9px] font-mono text-rose-600 leading-tight">
                        {validation.errorMessage}
                    </span>
                ) : (
                    <div className="flex items-center justify-between text-[9px] font-mono text-[#8e8a82] leading-tight">
                        <span>
                            Example: {activePlan.example} ({activePlan.callingCode})
                        </span>
                        {hasDigits && (
                            <span className="text-[#6d6961]">
                                {validation.cleanNationalDigits.length} / {activePlan.minLen === activePlan.maxLen ? activePlan.maxLen : `${activePlan.minLen}–${activePlan.maxLen}`} digits
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SovereignPhoneInput;
