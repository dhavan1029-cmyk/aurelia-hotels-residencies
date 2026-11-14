'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    RegisterIdentityAndSecuritySection,
    RegisterIdentityValues,
    DEFAULT_IDENTITY_VALUES,
} from './RegisterIdentityAndSecuritySection';
import {
    RegisterSensoryAndTokenSection,
    RegisterSensoryAndTokenValues,
    DEFAULT_SENSORY_AND_TOKEN_VALUES,
} from './RegisterSensoryAndTokenSection';
import {
    initiateRegistrationAction,
    InitiateRegisterPayload,
} from '@/lib/hotel/actions/register';

export interface RegisterEnrollmentFormCoordinatorProps {
    className?: string;
}

export function RegisterEnrollmentFormCoordinator({
    className = '',
}: RegisterEnrollmentFormCoordinatorProps) {
    const router = useRouter();

    const [identityValues, setIdentityValues] = useState<RegisterIdentityValues>(DEFAULT_IDENTITY_VALUES);
    const [sensoryValues, setSensoryValues] = useState<RegisterSensoryAndTokenValues>(DEFAULT_SENSORY_AND_TOKEN_VALUES);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    
    // Structured error state to support inline field targeting and duplicate user handling
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [isDuplicateUser, setIsDuplicateUser] = useState<boolean>(false);

    // Ref to anchor the bottom CTA error banner
    const bottomErrorRef = useRef<HTMLDivElement>(null);

    async function handleMasterSubmit() {
        setIsSubmitting(true);
        setErrorMessage(null);
        setFieldErrors({});
        setIsDuplicateUser(false);

        const payload: InitiateRegisterPayload = {
            honorific: identityValues.honorific,
            firstName: identityValues.firstName,
            lastName: identityValues.lastName,
            email: identityValues.email,
            phoneNumber: identityValues.phoneNumber,
            selectedCountryIso: identityValues.selectedCountryIso,
            passkey: identityValues.passkey,
            conciergePin: identityValues.conciergePin,
            selectedSanctuaryIds: sensoryValues.selectedSanctuaryIds,
            selectedAromaId: sensoryValues.selectedAromaId,
            selectedCellarId: sensoryValues.selectedCellarId,
            invitationToken: sensoryValues.invitationToken,
            agreeSwissPrivacy: sensoryValues.agreeSwissPrivacy,
            agreeSensorySync: sensoryValues.agreeSensorySync,
            rememberDevice: true,
        };

        // console.log(payload.phoneNumber)

        const result = await initiateRegistrationAction(payload);

        console.log('Gandu')

        if (!result.success) {
            setIsSubmitting(false);
            setErrorMessage(result.message || 'Please review and rectify the highlighted folio credentials.');

            if (result.fieldErrors) {
                setFieldErrors(result.fieldErrors as Record<string, string>);

                // Check if the error is due to an already existing user/email
                if (result.fieldErrors.email && result.fieldErrors.email.toLowerCase().includes('already')) {
                    setIsDuplicateUser(true);
                }

                // Smoothly scroll to the specific input field on error, or highlight it
                const targetElement = document.querySelector('[name="email"]') as HTMLElement;
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    targetElement.focus();
                } else if (bottomErrorRef.current) {
                    bottomErrorRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
            return;
        }

        // Seamless transition to the OTP verification screen
        router.push(`/verify?mode=register`);
        setIsSubmitting(false)
    }

    return (
        <section className={`w-full max-w-3xl mx-auto space-y-10 select-none ${className}`}>
            {/* Top Registry Status & Sign In Redirect */}
            <div className="space-y-3 pb-6 border-b border-[#e8e4dc]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b]" />
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-[#8e763b]">
                            MEMBERSHIP ENROLLMENT REGISTRY
                        </span>
                    </div>

                    <div className="text-xs font-sans text-[#78756d]">
                        <span>Already hold an active folio? </span>
                        <Link
                            href="/login"
                            className="font-semibold text-[#1f1e1d] hover:text-[#8e763b] underline transition-colors"
                        >
                            Sign In →
                        </Link>
                    </div>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#1f1e1d] tracking-tight leading-[1.12]">
                    Apply for Sovereign Patronage
                </h1>

                <p className="text-xs sm:text-[13px] text-[#5f5c56] font-sans font-light leading-relaxed max-w-2xl">
                    Sanctuary membership is extended by diplomatic referral or private committee invitation. Enter your validated credentials below.
                </p>
            </div>

            {/* Contextual Bottom Error Callout: Rendered directly above submit so it is ALWAYS in the user's viewport */}
            {errorMessage && (
                <div
                    ref={bottomErrorRef}
                    role="alert"
                    className="p-4 sm:p-5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 space-y-2.5 shadow-sm transition-all animate-in fade-in slide-in-from-bottom-2 duration-300"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-rose-800">
                            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                            <span>Folio Docket Notice</span>
                        </div>
                        {isDuplicateUser && (
                            <span className="px-2 py-0.5 rounded-sm bg-rose-200/70 text-[9px] font-mono uppercase tracking-wider text-rose-900 font-bold">
                                Registered Patron Detected
                            </span>
                        )}
                    </div>

                    <p className="text-xs font-sans font-light leading-relaxed text-rose-800">
                        {errorMessage}
                    </p>

                    {/* Dedicated Call to Action if user already exists */}
                    {isDuplicateUser && (
                        <div className="pt-2 border-t border-rose-200/80 flex items-center justify-between">
                            <span className="text-[11px] font-sans text-rose-700">
                                Would you like to authenticate to your existing folio?
                            </span>
                            <Link
                                href={`/login?email=${encodeURIComponent(identityValues.email.trim())}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-rose-300 text-rose-900 hover:bg-rose-100 font-sans text-[10px] font-semibold uppercase tracking-wider transition-colors shadow-2xs"
                            >
                                <span>Sign In to Portal</span>
                                <span>→</span>
                            </Link>
                        </div>
                    )}
                </div>
            )}

            {/* Phase 2: Leaf Client Inputs (Sections 01 & 02) */}
            <RegisterIdentityAndSecuritySection
                initialValues={identityValues}
                onChange={setIdentityValues}
                // fieldErrors={fieldErrors}
            />

            {/* Phase 3: Leaf Client Inputs (Sections 03 & 04) + Submission CTA */}
            <RegisterSensoryAndTokenSection
                initialValues={sensoryValues}
                onChange={setSensoryValues}
                onSubmit={handleMasterSubmit}
                isSubmitting={isSubmitting}
            />
        </section>
    );
}

export default RegisterEnrollmentFormCoordinator;
