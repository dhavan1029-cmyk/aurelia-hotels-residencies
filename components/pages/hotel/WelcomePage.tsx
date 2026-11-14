import React from 'react';
import {
    inscriptionWelcomeDefaultData,
    InscriptionWelcomePageData,
    InscriptionWelcomeHeader,
} from '@/components/hotel/auth/welcome/InscriptionWelcomeHeader';
import { InscriptionWelcomeHero } from '@/components/hotel/auth/welcome/InscriptionWelcomeHero';
import { SovereignKeyPassCard } from '@/components/hotel/auth/welcome/SovereignKeyPassCard';
import { SovereignEntitlementsGrid } from '@/components/hotel/auth/welcome/SovereignEntitlementsGrid';
import { InscriptionWayfindingBar } from '@/components/hotel/auth/welcome/InscriptionWayfindingBar';
import { InscriptionWelcomeFooter } from '@/components/hotel/auth/welcome/InscriptionWelcomeFooter';

export interface InscriptionWelcomePageProps {
    /** Strictly dynamic patron docket credentials */
    data?: InscriptionWelcomePageData;
}

/**
 * InscriptionWelcomePage
 *
 * Master assembly for the Sovereign Folio Inscription Welcome & Pass Issuance screen (/register/welcome).
 * Completely decoupled from static UI labels, institutional telemetry, and legal copy.
 * Receives strictly dynamic patron credentials and passes them to decoupled child components.
 */
export function InscriptionWelcomePage({
    data = inscriptionWelcomeDefaultData,
}: InscriptionWelcomePageProps) {
    const {
        patronHonorific,
        patronFirstName,
        patronLastName,
        folioCode,
        confidentialityLevel,
        keyPass,
        majordomo,
        entitlements,
    } = data;

    return (
        <main className="min-h-screen w-full bg-[#fcf9f4] text-[#1f1e1d] flex flex-col justify-between font-sans selection:bg-[#8e763b]/20 selection:text-[#1f1e1d]">
            {/* 1. TOP PROTOCOL & LEDGER HEADER (Decoupled Server Component) */}
            <InscriptionWelcomeHeader />

            {/* 2. MAIN MONUMENTAL WELCOME & PASS ISSUANCE WORKSPACE */}
            <div className="max-w-360 mx-auto w-full px-4 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-16 flex-1 space-y-12 sm:space-y-16">
                {/* PHASE 2: Architectural Hero Monograph & Induction Headline */}
                <InscriptionWelcomeHero
                    patronHonorific={patronHonorific}
                    patronFirstName={patronFirstName}
                    patronLastName={patronLastName}
                    folioCode={folioCode}
                    confidentialityLevel={confidentialityLevel}
                />

                {/* PHASE 3: Titanium Sovereign Key Pass Card (RSC with Leaf Client Actions) */}
                <div className="w-full flex justify-center">
                    <SovereignKeyPassCard data={keyPass} />
                </div>

                {/* PHASE 4: Conferred Sovereign Prerogatives & Personal Majordomo Host */}
                <SovereignEntitlementsGrid
                    entitlements={entitlements}
                    majordomo={majordomo}
                />

                {/* PHASE 5: Wayfinding Navigation & Concierge Hotline (Decoupled Server Component) */}
                <InscriptionWayfindingBar />
            </div>

            {/* 3. SWISS BANKING PRIVACY & FOOTER DISCLOSURES (Decoupled Server Component) */}
            <InscriptionWelcomeFooter />
        </main>
    );
}

export default InscriptionWelcomePage