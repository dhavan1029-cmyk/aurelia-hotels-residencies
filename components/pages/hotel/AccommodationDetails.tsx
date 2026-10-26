import { AccommodationGallerySection } from "@/components/hotel/accommodations/AccommodationGallerySection";
import { AccommodationNarrativeAndFloorplanSection } from "@/components/hotel/accommodations/AccommodationNarrative";
import { AccommodationBookingRail } from '@/components/hotel/accommodations/AccommodationBookingRail'
import { PrivilegesAndPoliciesSection } from "@/components/hotel/accommodations/PrivilegesAndPolicies";
import { AccommodationArchitecturalSiblingsSection } from "@/components/hotel/accommodations/ArchitecturalSiblingsSection";
import { Footer } from "@/components/layout/Footer";
import { prisma } from '@/lib/prisma'
import { AccommodationBookingContext, mapAccommodationDetails, mapAccommodationSiblings } from "@/lib/hotel/mappers/AccommodationDetailsMapper";
import { notFound } from "next/navigation";

interface PageProps {
    slug: string,
    bookingParams: AccommodationBookingContext
}

export async function AccommodationDetailsPage({slug, bookingParams} : PageProps){
    
    const accommodations = await prisma.accommodationCategory.findMany({
        where: {
            slug
        },
        include: {
            roomUnits: true,
        },
    })

    const accommodation = accommodations[0]

    if (!accommodation) {
        notFound();
    }
    
    const accommodationDetails = mapAccommodationDetails(accommodation, {
        bookingContext: bookingParams
    });

    const { gallery, narrativeAndFloorplan, privilegesAndPolicies, rateBreakdown } = accommodationDetails


    const siblings = mapAccommodationSiblings(accommodations, accommodation.id)

    return <main className="bg-[#f5f0e8] min-h-screen text-[#1f1e1d]">
            {/* Phase 1: Header, Asymmetric Gallery & Spatial Specs */}
            <AccommodationGallerySection data={gallery}/>

            {/* Container for Phase 2 & Phase 3 (Sticky Booking Rail) */}
            <div className="max-w-340 mx-auto py-10 px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left 8 Columns: Narrative, Specs & Floorplan (Phase 2) */}
                    <div className="lg:col-span-8 space-y-10 sm:space-y-12">
                        <AccommodationNarrativeAndFloorplanSection data={narrativeAndFloorplan}/>
                        <PrivilegesAndPoliciesSection data={privilegesAndPolicies}/>
                    </div>

                    {/* Right 4 Columns: Sticky Booking Rail (Phase 3 - next) */}
                    <div className="lg:col-span-4 sticky top-24">
                        {/* Phase 3 Booking Rail will be mounted here */}
                        <AccommodationBookingRail data={rateBreakdown}/>
                    </div>
                </div>
            </div>

            {siblings.length > 0 && (
                <AccommodationArchitecturalSiblingsSection data={siblings} />
            )}

            <Footer></Footer>

        </main>

}