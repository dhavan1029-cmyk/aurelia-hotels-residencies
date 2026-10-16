import { AccommodationGallerySection } from "@/components/hotel/accommodations/AccommodationGallerySection";
import { AccommodationNarrativeAndFloorplanSection } from "@/components/hotel/accommodations/AccommodationNarrative";
import { AccommodationBookingRail } from '@/components/hotel/accommodations/AccommodationBookingRail'
import { PrivilegesAndPoliciesSection } from "@/components/hotel/accommodations/PrivilegesAndPolicies";
import { AccommodationArchitecturalSiblingsSection } from "@/components/hotel/accommodations/ArchitecturalSiblingsSection";
import { Footer } from "@/components/layout/Footer";

export function AccommodationDetailsPage(){
    return <main className="bg-[#f5f0e8] min-h-screen text-[#1f1e1d]">
            {/* Phase 1: Header, Asymmetric Gallery & Spatial Specs */}
            <AccommodationGallerySection />

            {/* Container for Phase 2 & Phase 3 (Sticky Booking Rail) */}
            <div className="max-w-340 mx-auto py-10 px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left 8 Columns: Narrative, Specs & Floorplan (Phase 2) */}
                    <div className="lg:col-span-8 space-y-10 sm:space-y-12">
                        <AccommodationNarrativeAndFloorplanSection/>
                        <PrivilegesAndPoliciesSection/>
                    </div>

                    {/* Right 4 Columns: Sticky Booking Rail (Phase 3 - next) */}
                    <div className="lg:col-span-4 sticky top-24">
                        {/* Phase 3 Booking Rail will be mounted here */}
                        <AccommodationBookingRail/>
                    </div>
                </div>
            </div>

            <AccommodationArchitecturalSiblingsSection />

            <Footer></Footer>

        </main>

}