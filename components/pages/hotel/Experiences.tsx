import { Footer } from '@/components/layout/Footer';

// Phase 1: Gazette Monograph Header & Segmented Filter Bar
import { ExperiencesHeaderSection } from '@/components/hotel/experiences/Header';
import {
    experiencesHeaderDefaultData,
} from '@/components/hotel/experiences/Header';

// Phase 2: Hero Asymmetric Riva Aquarama Faraglioni Bento Showcase
import { FeaturedExpeditionHeroSection } from '@/components/hotel/experiences/FeaturedExpeditionHeroSection';
import { experiencesFeaturedDefaultData } from '@/components/hotel/experiences/FeaturedExpeditionHeroSection';

// Phase 3: Dual Medium Bento Cards (Roman Grotto Caldarium & Michelin 3-Star Il Belvedere)
import { SignatureRhythmsDualBentoSection } from '@/components/hotel/experiences/SignatureRhythmsDualBentoSection';
import { experiencesRhythmsDefaultData } from '@/components/hotel/experiences/SignatureRhythmsDualBentoSection';

// Phase 4: Dual Compact Bento Cards (Barolo Vault & Cliffside Olive Grove EVOO)
import { EnologyAndTerroirMasterclassesSection } from '@/components/hotel/experiences/EnologyAndTerroirMasterclassesSection';
import { experiencesEnologyDefaultData } from '@/components/hotel/experiences/EnologyAndTerroirMasterclassesSection';

// Phase 5: VIP Privatization Monolith & Gazette Dispatch Strip
import { BespokeConciergeInquiryBanner } from '@/components/hotel/experiences/BespokeConciergeInquiryBanner';
import { SeasonalGazetteNewsletterStrip } from '@/components/hotel/experiences/SeasonalGazetteNewsletterStrip';
import { experiencesVipDefaultData } from '@/components/hotel/experiences/BespokeConciergeInquiryBanner';

export interface ExperiencesPageProps {
    className?: string;
}

export function ExperiencesPage({ className = '' }: ExperiencesPageProps) {

    return (
        <div className={`min-h-screen bg-[#fcf9f4] text-[#1f1e1d] flex flex-col font-sans selection:bg-[#8e763b]/20 selection:text-[#1f1e1d] ${className}`}>

            {/* PHASE 1: Gazette Monograph Header & Segmented Category Filter Bar */}
            <ExperiencesHeaderSection
                data={experiencesHeaderDefaultData}
            />

            {/* Main Curated Showcase Workspace */}
            <main className="w-full flex-1 space-y-4 sm:space-y-6">
                {/* PHASE 2: Hero Asymmetric Riva Aquarama Faraglioni Bento Showcase */}
                <FeaturedExpeditionHeroSection
                    data={experiencesFeaturedDefaultData}
                />

                {/* PHASE 3: Dual Medium Bento Cards (Roman Grotto & Michelin 3-Star Il Belvedere) */}
                <SignatureRhythmsDualBentoSection
                    data={experiencesRhythmsDefaultData}
                />

                {/* PHASE 4: Dual Compact Bento Cards (Barolo Vault & Cliffside Olive Grove EVOO) */}
                <EnologyAndTerroirMasterclassesSection
                    data={experiencesEnologyDefaultData}
                />
            </main>

            {/* PHASE 5A: Dark Monolithic VIP Private Charter Concierge Inquiries Card */}
            <BespokeConciergeInquiryBanner
                data={experiencesVipDefaultData.inquiryBanner}
            />

            {/* PHASE 5B: Seasonal Gazette Newsletter Dispatch Strip */}
            <SeasonalGazetteNewsletterStrip
                data={experiencesVipDefaultData.newsletter}
            />

            {/* Global Sanctuary Footer */}
            <Footer />
        </div>
    );
}

export default ExperiencesPage;