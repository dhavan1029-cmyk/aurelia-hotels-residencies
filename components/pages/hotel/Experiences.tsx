import React from 'react';
import { prisma } from '@/lib/config/prisma';
import { Footer } from '@/components/layout/Footer';
import { ExperiencesHeaderSection } from '@/components/hotel/experiences/Header';
import { FeaturedExpeditionHeroSection } from '@/components/hotel/experiences/FeaturedExpeditionHeroSection';
import { SignatureRhythmsDualBentoSection } from '@/components/hotel/experiences/SignatureRhythmsDualBentoSection';
import { EnologyAndTerroirMasterclassesSection } from '@/components/hotel/experiences/EnologyAndTerroirMasterclassesSection';
import { BespokeConciergeInquiryBanner } from '@/components/hotel/experiences/BespokeConciergeInquiryBanner';
import { SeasonalGazetteNewsletterStrip } from '@/components/hotel/experiences/SeasonalGazetteNewsletterStrip';

import {
    mapSanctuaryToExperiencesHeader,
    mapExperiencesToFeaturedExpedition,
    mapExperiencesAndDiningToSignatureRhythms,
    mapExperiencesToEnologyMasterclasses,
    mapSanctuaryToConciergeInquiryBanner,
    DbSanctuaryWithExperiencesPayload,
} from '@/lib/hotel/mappers/experiencesMapper';

export default async function ExperiencesPage() {
    // 1. Fetch Sanctuary with nested Experiences, Dining Venues, and Staff
    const rawSanctuary = await prisma.sanctuary.findFirst({
        where: { status: 'ACTIVE' },
        include: {
            experiences: true,
            diningVenues: true,
            staff: true,
        },
    });

    const sanctuary = rawSanctuary as unknown as DbSanctuaryWithExperiencesPayload;
    const experiences = sanctuary?.experiences || [];
    const diningVenues = sanctuary?.diningVenues || [];

    // 2. Execute Pure Dynamic Mappers
    const headerData = sanctuary ? mapSanctuaryToExperiencesHeader(sanctuary) : undefined;
    const featuredExpedition = mapExperiencesToFeaturedExpedition(experiences, sanctuary?.name);
    const signatureRhythms = mapExperiencesAndDiningToSignatureRhythms(experiences, diningVenues);
    const enologyMasterclasses = mapExperiencesToEnologyMasterclasses(experiences);
    const inquiryBannerData = sanctuary ? mapSanctuaryToConciergeInquiryBanner(sanctuary) : undefined;

    return (
        <main className="min-h-screen bg-[#fcf9f4] text-[#1f1e1d]">
            {/* Gazette Monograph Masthead */}
            <ExperiencesHeaderSection data={headerData} />

            {/* Featured Marine Expedition Hero */}
            <FeaturedExpeditionHeroSection data={featuredExpedition} />

            {/* Signature Rhythms & Michelin Dining Bento */}
            <SignatureRhythmsDualBentoSection experiences={signatureRhythms} />

            {/* Enology & Terroir Masterclasses */}
            <EnologyAndTerroirMasterclassesSection experiences={enologyMasterclasses} />/

            {/* Bespoke Privatization Concierge Banner */}
            <BespokeConciergeInquiryBanner data={inquiryBannerData} />

            {/* Seasonal Gazette Inscription Strip */}
            <SeasonalGazetteNewsletterStrip />

            {/* Global Sanctuary Footer */}
            <Footer />
        </main>
    );
}

