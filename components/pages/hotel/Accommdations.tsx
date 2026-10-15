import { FilterBar } from "@/components/hotel/AccommodationFilterBar"
import { SuiteCard, SuiteCardProps } from "@/components/hotel/SuiteCard";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function Accommodations(){

    // 1. Top Featured Master Suite Data
    const masterSuite: SuiteCardProps = {
        id: 'suite-azure',
        slug: 'azure-master-ocean-suite',
        name: 'The Azure Master Ocean Suite',
        category: 'MASTER SANCTUARY SUITE',
        badgeLabel: 'SIGNATURE OCEANFRONT',
        elevationTag: 'LEVEL IV ELEVATION',
        pricePerNight: 1450,
        currency: '€',
        pricePeriodSuffix: '/ night',
        specsText: '132 m² / 1,420 sq ft • King Panoramic Terrace • Heated Plunge Pool • Max 3 Guests',
        description:
            'Unobstructed floor-to-ceiling vistas over the Gulf of Salerno. Handcrafted Tuscan oak millwork, honed Carrara marble soaking tub, and open-air loggia with heated basalt plunge pool.',
        heroImageUrl: '/suite-402.png',
        photoCount: 12,
        privilegeNotice: 'Dedicated Aurelia Valet & Daily Thermal Hydrotherapy Access Included',
        amenities: [
            {
                icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M8 22h8M12 11v11M19 3l-7 8-7-8h14z" />
                    </svg>
                ),
                label: 'Private Sommelier Bar',
            },
            {
                icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
                        <path d="M2 12h20" />
                    </svg>
                ),
                label: 'Freestanding Stone Tub',
            },
            {
                icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M17 11V3M7 11V3M12 21V3" />
                    </svg>
                ),
                label: 'Daily Sunset Aperitivo',
            },
            {
                icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                ),
                label: 'Complimentary Thermal Pass',
            },
        ],
        primaryCtaLabel: 'Reserve Suite',
        secondaryCtaLabel: 'View Sanctuary Details',
    };

    // 2. Bottom 2 Coastal Sanctuary Cards
    const coastalSuites: SuiteCardProps[] = [
        {
            id: 'villa-limestone',
            slug: 'the-limestone-cliff-villa',
            name: 'The Limestone Cliff Villa',
            badgeLabel: 'PRIVATE CLIFFTOP ESTATE',
            pricePerNight: 2850,
            currency: '€',
            pricePeriodSuffix: '/ night',
            minStayNotice: '2-Night Min',
            featureOverlayText: 'Private 14m Heated Infinity Pool',
            featureOverlayIcon: (
                <svg className="w-3.5 h-3.5 text-[#bfa76f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 12h20M2 17h20M2 7h20" />
                </svg>
            ),
            specsText:
                'Independent Clifftop Wing • Private Estate • 210 m² • 2 King Bedrooms • Infinity Edge Pool • Helipad Access',
            description:
                "Carved directly into the sheer cliffside face with total privacy. Includes dedicated estate butler, bespoke chef's demonstration kitchen, private saltwater infinity edge pool, and arrival via sea tender or helipad.",
            heroImageUrl: '/limestone-villa.png',
            pillTags: ['DEDICATED ESTATE BUTLER', 'PRIVATE HELIPAD ACCESS', 'ALFRESCO FIRE HEARTH'],
            primaryCtaLabel: 'Reserve Villa',
            secondaryCtaLabel: 'View Details',
        },
        {
            id: 'garden-pavilion',
            slug: 'the-citrus-garden-pavilion',
            name: 'The Citrus Garden Pavilion',
            badgeLabel: 'GARDEN SOLARIUM',
            pricePerNight: 920,
            currency: '€',
            pricePeriodSuffix: '/ night',
            minStayNotice: 'Thermal Spa Pass',
            featureOverlayText: 'Private Walled Lemon Grove',
            featureOverlayIcon: (
                <svg className="w-3.5 h-3.5 text-[#bfa76f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 3v9l4 4" />
                </svg>
            ),
            specsText:
                'Level I • Lemon Grove Seclusion • 85 m² • King Bed & Solarium • Sunken Marble Tub',
            description:
                'Enclosed within 200-year-old Amalfi lemon groves. Features fragrant private herbal terraces, an indoor glass solarium reading pavilion, sunken Carrara marble immersion tub, and gentle ocean breezes filtered through leafy pergolas.',
            heroImageUrl: '/garden-pavillion.png',
            pillTags: ['WALLED GARDEN PRIVACY', 'GLASS SOLARIUM LOUNGE', 'BOTANICAL BATH RITUAL'],
            primaryCtaLabel: 'Reserve Pavilion',
            secondaryCtaLabel: 'View Details',
        },
    ];


    return <section className="relative w-full h-fit bg-[#fcf9f4] pt-10 text-[#1f1e1d]">
        {/* Header: Editorial Monograph & Sanctuary Geo Coordinates */}
        <div className="max-w-340 mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-8 sm:pb-10">
                {/* Left: Master Heading Block */}
                <div className="max-w-3xl">
                    <span className="block text-[11px] sm:text-[12px] font-sans font-semibold uppercase tracking-[0.3em] text-[#8e763b] mb-3">
                        {'THE POSITANO HAVEN • ITALY'}
                    </span>
                    <h1 className="font-serif text-3xl sm:text-5xl lg:text-[56px] font-normal text-[#1f1e1d] tracking-tight leading-[1.08]">
                        {'Curated Suites & Private Sanctuaries'}
                    </h1>
                    <p className="mt-3.5 sm:mt-4 text-[#636058] font-sans leading-relaxed max-w-2xl">
                        {'18 oceanfront sanctuaries carved into Positano cliffside limestone, crafted for unhurried living.'}
                    </p>
                </div>
                
                {/* Right: Coordinates & Live Reservation Pulse */}
                <div className="flex flex-col lg:items-end lg:text-right shrink-0 pt-1 lg:pt-2">
                    <span className="block text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#8e8a82]">
                        SANCTUARY COORDINATES
                    </span>
                    <span className="font-mono text-xs sm:text-[13px] text-[#1f1e1d] font-normal tracking-wider mt-1.5">
                        {"40°37'41.2\"N • 14°29'08.6\"E"}
                    </span>
                    <div className="inline-flex items-center gap-2 mt-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8e763b] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8e763b]" />
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e763b]">
                            {'RESERVATIONS OPEN FOR 2025'}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        {/* Stone-Toned Filter & Sort Control Strip Box */}
        <FilterBar></FilterBar>

        <section
            className={`w-full bg-[#fcf9f4] py-20 sm:py-10 lg:py-10 px-4 sm:px-8 lg:px-12 border-b border-[#e8e4dc]`}
        >
            <div className="max-w-340 mx-auto space-y-12 sm:space-y-16">

                {/* 1. Featured Master Suite Bento (Variant: master-featured) */}
                <SuiteCard {...masterSuite} variant="master-featured" />

                {/* 2. Secondary Coastal Sanctuaries Grid (Variant: coastal-grid) */}
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e763b]">
                            ADDITIONAL RESONANCES • CLIFFSIDE & GARDEN ESTATES
                        </span>
                        <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-[#8e8a82]">
                            ALL SANCTUARIES INCLUDE PRIVATE BREAKFAST & VALET SERVICE
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                        {coastalSuites.map(function (suite) {
                            return (
                                <SuiteCard
                                    key={suite.id}
                                    {...suite}
                                    variant="coastal-grid"
                                />
                            );
                        })}
                    </div>
                </div>

                {/* 3. Dark Bespoke Multi-Week Stays Callout Banner */}
                <div className="bg-[#1f1e1d] text-[#fcf9f4] border border-[#383530] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
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
                        className="px-6 py-3.5 rounded-lg bg-[#bfa76f] hover:bg-[#aa935e] text-white font-sans text-[11px] font-semibold uppercase tracking-[0.2em] whitespace-nowrap transition-all shadow-md self-stretch sm:self-auto text-center active:scale-[0.99]"
                    >
                        CALL CONCIERGE DESK
                    </a>
                </div>
            </div>
        </section>

        <Footer></Footer>

    </section>
}