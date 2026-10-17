'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Phase 1: Gazette Monograph Header & Segmented Filter Bar
import { ExperiencesHeaderAndFilterSection } from '@/components/hotel/experiences/Header';
import {
    ExperienceCategoryFilterId,
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
    const router = useRouter();

    // 1. Dynamic Category Filter State
    const [activeFilterId, setActiveFilterId] = useState<ExperienceCategoryFilterId>('all');

    // Filter Change Handler
    const handleCategoryChange = (categoryId: ExperienceCategoryFilterId) => {
        setActiveFilterId(categoryId);
    };

    // Experience Reservation Router -> Routes to Checkout with Selected Experience ID
    const handleReserveExperience = (experienceId: string) => {
        router.push(`/checkout?experience=${experienceId}`);
    };

    // Dossier Modal or Routing Handler
    const handleViewDossier = (slug: string) => {
        router.push(`/experiences/${slug}`);
    };

    // Private Concierge Hotline Call
    const handleInquireCurator = () => {
        window.location.href = 'tel:+39089875000';
    };

    return (
        <div className={`min-h-screen bg-[#fcf9f4] text-[#1f1e1d] flex flex-col font-sans selection:bg-[#8e763b]/20 selection:text-[#1f1e1d] ${className}`}>

            {/* PHASE 1: Gazette Monograph Header & Segmented Category Filter Bar */}
            <ExperiencesHeaderAndFilterSection
                data={experiencesHeaderDefaultData}
                activeCategory={activeFilterId}
                onCategoryChange={handleCategoryChange}
                onInquireCurator={handleInquireCurator}
            />

            {/* Main Curated Showcase Workspace */}
            <main className="w-full flex-1 space-y-4 sm:space-y-6">
                {/* PHASE 2: Hero Asymmetric Riva Aquarama Faraglioni Bento Showcase */}
                {(activeFilterId === 'all' || activeFilterId === 'marine-charters') && (
                    <FeaturedExpeditionHeroSection
                        data={experiencesFeaturedDefaultData}
                        onReserveCharter={handleReserveExperience}
                        onViewDossier={handleViewDossier}
                    />
                )}

                {/* PHASE 3: Dual Medium Bento Cards (Roman Grotto & Michelin 3-Star Il Belvedere) */}
                {(activeFilterId === 'all' ||
                    activeFilterId === 'subterranean-wellness' ||
                    activeFilterId === 'gastronomy-enology') && (
                    <SignatureRhythmsDualBentoSection
                        data={experiencesRhythmsDefaultData}
                        onReserveExperience={handleReserveExperience}
                        onViewDossier={handleViewDossier}
                    />
                )}

                {/* PHASE 4: Dual Compact Bento Cards (Barolo Vault & Cliffside Olive Grove EVOO) */}
                {(activeFilterId === 'all' || activeFilterId === 'gastronomy-enology') && (
                    <EnologyAndTerroirMasterclassesSection
                        data={experiencesEnologyDefaultData}
                        onReserveMasterclass={handleReserveExperience}
                        onViewDossier={handleViewDossier}
                    />
                )}

                {/* PHASE 5A: Dark Monolithic VIP Private Charter Concierge Inquiries Card */}
                <BespokeConciergeInquiryBanner
                    data={experiencesVipDefaultData.inquiryBanner}
                    onInitiateConsultation={handleInquireCurator}
                    onDownloadDossier={function () {
                        console.log('Dispatching Aurelia Charter PDF Folio download');
                    }}
                />

                {/* PHASE 5B: Seasonal Gazette Newsletter Dispatch Strip */}
                <SeasonalGazetteNewsletterStrip
                    data={experiencesVipDefaultData.newsletter}
                    onSubscribe={function (email) {
                        console.log('Subscribing patron email to Seasonal Gazette:', email);
                    }}
                />
            </main>

            {/* Global Sanctuary Footer */}
            <Footer />
        </div>
    );
}

export default ExperiencesPage;