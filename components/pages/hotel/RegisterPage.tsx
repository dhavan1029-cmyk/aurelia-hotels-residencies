'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RegisterDossierRail } from '@/components/hotel/auth/RegisterDossierRail';
import { RegisterEnrollmentForm } from '@/components/hotel/auth/RegisterEnrollmentForm';
import {
    RegisterDossierData,
    registerDossierDefaultData,
} from '@/components/hotel/auth/RegisterDossierRail';
import {
    RegisterFormData,
    RegisterFormInitialValues,
    registerFormDefaultData,
} from '@/components/hotel/auth/RegisterEnrollmentForm';
import { Footer } from '@/components/layout/Footer';

export interface RegisterPageProps {
    dossierData?: RegisterDossierData;
    formData?: RegisterFormData;
    className?: string;
}

export function RegisterPage({
    dossierData = registerDossierDefaultData,
    formData = registerFormDefaultData,
    className = '',
}: RegisterPageProps) {
    const router = useRouter();

    function handleSubmitApplication(values: RegisterFormInitialValues) {
        console.log('Submitting Sovereign Patron Registration Application:', {
            honorific: values.honorific,
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            phone: `${values.phoneCountryCode} ${values.phoneNumber}`,
            sanctuaries: values.selectedSanctuaryIds,
            aroma: values.selectedAromaId,
            cellar: values.selectedCellarId,
            token: values.invitationToken,
        });

        // Simulate secure database inscription & redirect to Sovereign Profile
        setTimeout(function () {
            router.push('/profile?registered=true');
        }, 800);
    }

    function handleAppleSovereignSync() {
        console.log('Synchronizing Apple Sovereign ID biometric credentials');
        router.push('/profile?registered=true&sync=apple');
    }

    function handleConciergePassSync() {
        console.log('Opening Concierge Direct Passcode verification modal');
    }

    return (
        <main
            className={`min-h-screen w-full bg-[#fcf9f4] text-[#1f1e1d] flex flex-col font-sans selection:bg-[#8e763b]/20 selection:text-[#1f1e1d] ${className}`}
        >
            {/* ----------------------------------------------------------------- */}
            {/* 1. TOP PROTOCOL HEADER BAR                                        */}
            {/* ----------------------------------------------------------------- */}
            <header className="w-full bg-[#fcf9f4] border-b border-[#e8e4dc] sticky top-0 z-40 backdrop-blur-md">
                <div className="max-w-360 mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-4">
                    {/* Brand Monogram Lockup */}
                    <Link href="/" className="flex flex-col group">
                        <span className="font-serif text-2xl sm:text-[26px] font-normal tracking-[0.24em] text-[#1f1e1d] leading-none uppercase group-hover:text-[#8e763b] transition-colors">
                            Aurelia
                        </span>
                        <span className="text-[8px] sm:text-[9px] font-sans font-semibold tracking-[0.32em] text-[#8e763b] mt-1 leading-none uppercase">
                            HOTELS &amp; RESIDENCES
                        </span>
                    </Link>

                    {/* Center Protocol Badge (Hidden on Mobile) */}
                    <div className="hidden md:inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#f6f2ea] border border-[#ded9ce] text-[9px] font-mono uppercase tracking-[0.2em] text-[#6d6961]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b] animate-pulse" />
                        <span>SOVEREIGN PATRONAGE ENCLAVE • TIER I APPLICATION</span>
                    </div>

                    {/* Right Return Navigation */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-[0.18em] text-[#78756d] hover:text-[#1f1e1d] transition-colors"
                    >
                        <span>← Return to Sanctuary</span>
                    </Link>
                </div>

                {/* Sub-strip Notice */}
                <div className="w-full bg-[#f6f2ea] border-t border-[#ded9ce] py-2 px-4 sm:px-8 lg:px-12 text-[9px] font-mono uppercase tracking-[0.22em] text-[#8e8a82]">
                    <div className="max-w-360 mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
                        <span>INVITATION-ONLY OR PEER-SPONSORED ENCLAVE • EST. 1928</span>
                        <span className="text-[#8e763b]">PROTECTED UNDER SWISS BANKING PRIVACY PROTOCOL</span>
                    </div>
                </div>
            </header>

            {/* ----------------------------------------------------------------- */}
            {/* 2. MAIN SPLIT REGISTRATION WORKSPACE                              */}
            {/* ----------------------------------------------------------------- */}
            <div className="max-w-360 mx-auto w-full flex-1 flex flex-col lg:flex-row items-start">
                {/* PHASE 1: Left Split Architectural Dossier & Privileges Rail (38% width) */}
                <div className="w-full lg:w-[38%] lg:sticky lg:top-28 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-[#e8e4dc]">
                    <RegisterDossierRail data={dossierData} />
                </div>

                {/* PHASE 2: Right Split Sovereign Patron Registration Form (62% width) */}
                <div className="w-full lg:w-[62%] py-8 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-14">
                    <RegisterEnrollmentForm
                        data={formData}
                        onSubmitApplication={handleSubmitApplication}
                        onAppleSovereignSync={handleAppleSovereignSync}
                        onConciergePassSync={handleConciergePassSync}
                    />
                </div>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* 3. BOTTOM SOVEREIGN FOOTER PROTOCOL STRIP                        */}
            {/* ----------------------------------------------------------------- */}
            <Footer></Footer>
        </main>
    );
}

export default RegisterPage;