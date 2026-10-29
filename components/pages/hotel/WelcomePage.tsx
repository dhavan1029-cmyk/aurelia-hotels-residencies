import { inscriptionWelcomeDefaultData, InscriptionWelcomeHeader, InscriptionWelcomePageData } from '@/components/hotel/auth/welcome/InscriptionWelcomeHeader';
import { InscriptionWelcomeHero } from '@/components/hotel/auth/welcome/InscriptionWelcomeHero';
import { SovereignKeyPassCard } from '@/components/hotel/auth/welcome/SovereignKeyPassCard';
import { SovereignEntitlementsGrid } from '@/components/hotel/auth/welcome/SovereignEntitlementsGrid';
import { InscriptionWayfindingBar } from '@/components/hotel/auth/welcome/InscriptionWayfindingBar';
import { InscriptionWelcomeFooter } from '@/components/hotel/auth/welcome/InscriptionWelcomeFooter';

export interface InscriptionWelcomePageProps {
    data?: InscriptionWelcomePageData;
}

export default function InscriptionWelcomePage({
    data = inscriptionWelcomeDefaultData,
}: InscriptionWelcomePageProps) {
    const {
        header,
        hero,
        keyPass,
        entitlementsEyebrow,
        entitlementsHeading,
        entitlementsDescription,
        entitlements,
        majordomo,
        wayfinding,
        footer,
    } = data;

    return (
        <main className="min-h-screen w-full bg-[#fcf9f4] text-[#1f1e1d] flex flex-col justify-between font-sans selection:bg-[#8e763b]/20 selection:text-[#1f1e1d]">
            {/* 1. TOP PROTOCOL & LEDGER HEADER (Server Component) */}
            <InscriptionWelcomeHeader data={header} />

            {/* 2. MAIN MONUMENTAL WELCOME & PASS ISSUANCE WORKSPACE */}
            <div className="max-w-360 mx-auto w-full px-4 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-16 flex-1 space-y-12 sm:space-y-16">
                {/* PHASE 2: Architectural Hero Monograph & Induction Headline */}
                <InscriptionWelcomeHero data={hero} />

                {/* PHASE 3: Titanium Sovereign Key Pass Card (RSC with Leaf Client Actions) */}
                <div className="w-full flex justify-center">
                    <SovereignKeyPassCard data={keyPass} />
                </div>

                {/* PHASE 4: Conferred Sovereign Prerogatives & Personal Majordomo Host */}
                <SovereignEntitlementsGrid
                    eyebrow={entitlementsEyebrow}
                    heading={entitlementsHeading}
                    description={entitlementsDescription}
                    entitlements={entitlements}
                    majordomo={majordomo}
                />

                {/* PHASE 5: Wayfinding Navigation & Concierge Hotline */}
                <InscriptionWayfindingBar data={wayfinding} />
            </div>

            {/* 3. SWISS BANKING PRIVACY & FOOTER DISCLOSURES (Server Component) */}
            <InscriptionWelcomeFooter data={footer} />
        </main>
    );
}
