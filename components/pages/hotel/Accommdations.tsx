import { FilterBar } from "@/components/hotel/accommodations/AccommodationFilterBar"
// import { SuiteCard, SuiteCardProps } from "@/components/hotel/SuiteCard";
import { Footer } from "@/components/layout/Footer";
import AccommodationListings from '@/components/hotel/accommodations/AccommodationListings';
// import { prisma } from '@/lib/prisma'

export interface SearchParamsValues {
    sanctuary?: string, checkIn?: string, checkOut?: string, suites?: string, guests?: string, sortBy?: string
}

interface AccommodationsProps {
    searchParams: Promise<SearchParamsValues>;
}


export default async function Accommodations({ searchParams } : AccommodationsProps){

    const params = await searchParams

    return <section className="relative w-full h-fit bg-[#fcf9f4] pt-5 lg:pt-10 text-[#1f1e1d]">
        {/* Header: Editorial Monograph & Sanctuary Geo Coordinates */}
        <div className="max-w-340 mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-8 sm:pb-10">
                {/* Left: Master Heading Block */}
                <div className="max-w-3xl">
                    <span className="block text-[11px] sm:text-[12px] font-sans font-semibold uppercase tracking-[0.3em] text-[#8e763b] mb-3">
                        {'THE POSITANO HAVEN • ITALY'}
                    </span>
                    <h1 className="font-serif text-3xl sm:text-5xl lg:text-[56px] font-normal text-[#1f1e1d] tracking-tight leading-[1.08]">
                        {'Curated Suites & Private Sanctuaries'}
                    </h1>
                    <p className="hidden md:block mt-3.5 sm:mt-4 text-[#636058] font-sans leading-relaxed max-w-2xl">
                        {'18 oceanfront sanctuaries carved into Positano cliffside limestone, crafted for unhurried living.'}
                    </p>
                </div>
                
                {/* Right: Coordinates & Live Reservation Pulse */}
                <div className="hidden md:flex flex-col lg:items-end lg:text-right shrink-0 pt-1 lg:pt-2">
                    <span className="block text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#8e8a82]">
                        SANCTUARY COORDINATES
                    </span>
                    <span className="font-mono text-xs sm:text-[13px] text-[#1f1e1d] font-normal tracking-wider mt-1.5">
                        {"40°37'41.2\"N • 14°29'08.6\"E"}
                    </span>
                    <div className="inline-flex items-center gap-2 mt-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full -full bg-[#8e763b] opacity-75" />
                            <span className="relative inline-flex -full h-2 w-2 bg-[#8e763b]" />
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e763b]">
                            {'RESERVATIONS OPEN FOR 2025'}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        {/* Stone-Toned Filter & Sort Control Strip Box */}
        {/* <Suspense> */}
            <FilterBar initFilters={params}></FilterBar>
        {/* </Suspense> */}

        <section
            className={`w-full bg-[#fcf9f4] py-20 sm:py-10 lg:py-10 px-4 sm:px-8 lg:px-12 border-b border-[#e8e4dc]`}
        >
            <div className="max-w-340 mx-auto space-y-12 sm:space-y-16">

                {/* <Suspense
                    fallback={
                        <div className="max-w-340 mx-auto py-12 text-center text-sm text-[#78756e]">
                            Preparing your sanctuaries...
                        </div>
                    }
                > */}
                    <AccommodationListings searchParams={ params } />
                {/* </Suspense> */}

                {/* 3. Dark Bespoke Multi-Week Stays Callout Banner */}
                <div className="bg-[#1f1e1d] text-[#fcf9f4] border border-[#383530] -lg p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
                    <div>
                        <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#bfa76f] block mb-1">
                            EXCLUSIVE RESIDENTIAL ENCLAVES
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white tracking-tight">
                            Bespoke Multi-Week Stays & Entire Wing Buyouts
                        </h3>
                        <p className="mt-1.5 text-xs sm:text-[13px] text-[#a4a098] font-sans font-light max-w-xl leading-relaxed">
                            Direct inquiries for multi-suite buyout itineraries, private helicopter charter arrivals, and dedicated Riva yacht tender mooring.
                        </p>
                    </div>

                    <a
                        href="tel:+39089875000"
                        className="px-6 py-3.5 -lg bg-[#bfa76f] hover:bg-[#aa935e] text-white font-sans text-[11px] font-semibold uppercase tracking-[0.2em] whitespace-nowrap transition-all shadow-md self-stretch sm:self-auto text-center active:scale-[0.99]"
                    >
                        CALL CONCIERGE DESK
                    </a>
                </div>
            </div>
        </section>

        <Footer></Footer>

    </section>
}