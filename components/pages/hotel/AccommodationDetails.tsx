import { notFound } from 'next/navigation';
import { AccommodationGallerySection } from '@/components/hotel/accommodations/AccommodationGallerySection';
import { AccommodationNarrativeAndFloorplanSection } from '@/components/hotel/accommodations/AccommodationNarrative';
import { AccommodationBookingRail } from '@/components/hotel/accommodations/AccommodationBookingRail';
import { PrivilegesAndPoliciesSection } from '@/components/hotel/accommodations/PrivilegesAndPolicies';
import { AccommodationArchitecturalSiblingsSection } from '@/components/hotel/accommodations/ArchitecturalSiblingsSection';
import { Footer } from '@/components/layout/Footer';
import { prisma } from '@/lib/config/prisma';
import {
    BasicAccommodationBookingParams,
    mapAccommodationDetails,
    mapAccommodationSiblings,
} from '@/lib/hotel/mappers/AccommodationDetailsMapper';

interface PageProps {
    slug: string;
    bookingParams?: BasicAccommodationBookingParams;
}

export function getISODateAhead(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);

    return date.toISOString();
}

export async function AccommodationDetailsPage({ slug, bookingParams }: PageProps) {
    // 1. Fetch current accommodation along with its sanctuary & all sanctuary sibling accommodations
    const accommodation = await prisma.accommodationCategory.findUnique({
        where: {
            slug,
        },
        include: {
            roomUnits: true,
            sanctuary: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    code: true,
                    arrivalGuide: true,
                    // Fetch sibling suites belonging to this same sanctuary
                    accommodations: {
                        include: {
                            roomUnits: true,
                        },
                    },
                },
            },
        },
    });

    if (!accommodation) {
        notFound();
    }

    // 2. Map accommodation details with active booking context (dates, guests, nights)
    const accommodationDetails = mapAccommodationDetails(accommodation, {
        bookingContext: bookingParams,
    });

    const { gallery, narrativeAndFloorplan, privilegesAndPolicies, rateBreakdown } = accommodationDetails;

    // 3. Map sibling accommodations (excluding the current one)
    const siblings = mapAccommodationSiblings(
        accommodation.sanctuary.accommodations || [],
        accommodation.id,
        accommodation.sanctuary.name
    );


    return (
        <main className="bg-[#fcf9f4] min-h-screen text-[#1f1e1d]">
            {/* Phase 1: Header, Asymmetric Gallery & Spatial Specs */}
            <AccommodationGallerySection data={gallery} />

            {/* Container for Phase 2 & Phase 3 (Sticky Booking Rail) */}
            <div className="max-w-340 mx-auto py-10 px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left 8 Columns: Narrative, Specs, Floorplan & Privileges */}
                    <div className="lg:col-span-8 space-y-10 sm:space-y-12">
                        <AccommodationNarrativeAndFloorplanSection data={narrativeAndFloorplan} />

                        <PrivilegesAndPoliciesSection
                            data={privilegesAndPolicies}
                            accommodationDb={accommodation}
                            sanctuaryDb={accommodation.sanctuary}
                        />
                    </div>

                    {/* Right 4 Columns: Sticky Folio Booking Rail */}
                    <div className="lg:col-span-4 sticky top-24 z-20">
                        <AccommodationBookingRail
                            sanctuarySlug={accommodation.sanctuary.slug}
                            suiteSlug={accommodation.slug}
                            data={rateBreakdown}
                        />
                    </div>
                </div>
            </div>

            {/* Sibling Sanctuaries Carousel / Grid */}
            {siblings.length > 0 && (
                <AccommodationArchitecturalSiblingsSection data={siblings} />
            )}

            {/* Persistent Platform Footer */}
            <Footer />
        </main>
    );
}
