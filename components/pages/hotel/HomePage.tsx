import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '../../layout/Navbar';
import { Footer } from '../../layout/Footer';
import { BookingBar } from '../../hotel/BookingBar';
import { SuiteCard, SuiteCardProps } from '../../hotel/SuiteCard';

export interface TestimonialItem {
    quote: string;
    authorName: string;
    authorRole: string;
    avatarUrl?: string;
    rating?: number;
}

export function HomePage() {
    const featuredSuite: SuiteCardProps = {
        id: 'suite-402',
        slug: 'azure-master-ocean-suite',
        name: 'The Azure Master Ocean Suite',
        categoryEyebrow: 'MASTER SANCTUARY SUITE',
        sanctuaryNumber: 'SANCTUARY 01',
        badgeLabel: 'SIGNATURE OCEANFRONT',
        elevationTag: 'LEVEL IV ELEVATION',
        pricePerNight: 1450,
        currency: '€',
        pricePeriodSuffix: '/ night',
        specsText: '132 m² / 1,420 sq ft • King Panoramic Terrace • Heated Plunge Pool • Max 3 Guests',
        description:
            'Floor-to-ceiling panoramic vistas of the Amalfi coastline. Custom white oak millwork, hand-spun linen drapery, freestanding carved travertine soaking tub, and open-air sunset loggia with heated basalt plunge pool.',
        heroImageUrl: '/suite-402.png',
        photoCount: 12,
        privilegeNotice: 'Dedicated Aurelia Valet & Daily Thermal Hydrotherapy Access Included',
        amenities: [
            {
                icon: (
                    <svg className="w-4 h-4 text-[#8e763b] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M2 19h20M4 19V9a2 2 0 012-2h12a2 2 0 012 2v10M2 14h20" />
                    </svg>
                ),
                label: 'King Linen Bed',
            },
            {
                icon: (
                    <svg className="w-4 h-4 text-[#8e763b] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                    </svg>
                ),
                label: 'Up to 3 Guests',
            },
            {
                icon: (
                    <svg className="w-4 h-4 text-[#8e763b] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M8 22h8M12 11v11M19 3l-7 8-7-8h14z" />
                    </svg>
                ),
                label: 'Private Sommelier Bar',
            },
            {
                icon: (
                    <svg className="w-4 h-4 text-[#8e763b] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ),
                label: '24/7 Butler Service',
            },
        ],
        primaryCtaLabel: 'Reserve Suite',
        secondaryCtaLabel: 'View Sanctuary Details',
    };

    // 2. Secondary Accommodations Data for 2-Col Grid (variant="coastal-grid")
    const secondarySuites: SuiteCardProps[] = [
        {
            id: 'villa-limestone',
            slug: 'the-limestone-cliff-villa',
            name: 'The Limestone Cliff Villa',
            categoryEyebrow: 'PRIVATE CLIFFTOP ESTATE',
            sanctuaryNumber: 'SANCTUARY 02',
            badgeLabel: 'ESTATE RESIDENCE',
            elevationTag: 'CLIFFTOP LEVEL VI',
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
            specsText: 'Independent Clifftop Wing • Private Estate • 210 m² • 2 King Bedrooms • Infinity Edge Pool • Helipad Access',
            description:
                'Multi-level independent estate carved directly into the sheer cliffside face with total privacy. Includes dedicated estate butler, demonstration kitchen, and arrival via sea tender or helipad.',
            heroImageUrl: '/limestone-villa.png',
            photoCount: 8,
            privilegeNotice: 'Includes Dedicated Majordomo & Arrival Sea Tender',
            pillTags: ['DEDICATED ESTATE BUTLER', 'PRIVATE HELIPAD ACCESS', 'ALFRESCO FIRE HEARTH'],
            primaryCtaLabel: 'Reserve Villa',
            secondaryCtaLabel: 'View Details',
        },
        {
            id: 'garden-pavilion',
            slug: 'the-citrus-garden-pavilion',
            name: 'The Citrus Garden Pavilion',
            categoryEyebrow: 'GARDEN SOLARIUM',
            sanctuaryNumber: 'SANCTUARY 03',
            badgeLabel: 'LEMON GROVE RETREAT',
            elevationTag: 'GARDEN LEVEL I',
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
            specsText: 'Level I • Lemon Grove Seclusion • 85 m² • King Bed & Solarium • Sunken Marble Tub',
            description:
                'Enclosed within 200-year-old Amalfi lemon groves. Features fragrant private herbal terraces, an indoor glass solarium reading pavilion, sunken Carrara marble immersion tub, and gentle ocean breezes.',
            heroImageUrl: '/garden-pavillion.png',
            photoCount: 6,
            privilegeNotice: 'Includes Organic Grove Breakfast & Thermal Spa Pass',
            pillTags: ['WALLED GARDEN PRIVACY', 'GLASS SOLARIUM LOUNGE', 'BOTANICAL BATH RITUAL'],
            primaryCtaLabel: 'Reserve Pavilion',
            secondaryCtaLabel: 'View Details',
        },
    ];

    const pricingItems = [
        { label: 'Seasonal Tasting Journey', price: '€210 per guest' },
        { label: 'Campania Sommelier Pairing', price: '€135 per guest' },
    ]

    const defaultTestimonials: TestimonialItem[] = [
        {
            quote:
                '“Aurelia redefined our concept of hospitality. The sheer quiet, the aroma of cypress and salt, and the limestone plunge pool made time stand still.”',
            authorName: 'ELEANOR VANCE',
            authorRole: 'Private Resident Member • 4 Stays',
            avatarUrl: '{{DATA:IMAGE:IMAGE_109}}',
            rating: 5,
        },
        {
            quote:
                '“A masterpiece of Mediterranean minimalism. Il Belvedere and the thermal spring circuit are unlike anything in Southern Europe.”',
            authorName: 'ARCHITECTURAL DIGEST',
            authorRole: 'Global Hotel Design Award 2024',
            rating: 5,
        },
        {
            quote:
                '“Discreet, impeccable, and unforgettable. The private yacht transfer directly to our cliff villa set a gold standard in arrival experiences.”',
            authorName: 'JULIAN & CLAIRE STERLING',
            authorRole: 'Limestone Villa Guests • London',
            rating: 5,
        },
    ];

    const activeTestimonials = defaultTestimonials;

    return (
        <div className="min-h-screen bg-[#fcf9f4] text-[#1f1e1d] flex flex-col font-sans">
            
            {/* Hero Section */}
            <section className="relative w-full min-h-[92vh] lg:min-h-[96vh] flex flex-col justify-between overflow-hidden bg-[#1f1e1d]">
                {/* Background Image using Next.js Image Component */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={'/limestone-villa.png'}
                        alt="Aurelia Sanctuary Positano overlooking the Tyrrhenian Sea at golden hour"
                        fill
                        priority
                        quality={95}
                        sizes="100vw"
                        className="object-cover object-center transform scale-[1.02] transition-transform duration-1000 ease-out"
                    />

                    {/* Editorial Vignette & Contrast Overlays */}
                    1. Overall subtle cinematic darkening for text legibility
                    <div className="absolute inset-0 bg-black/35" />

                    {/* 2. Deep gradient from bottom up to anchor the Booking Bar smoothly */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/20" />

                    {/* 3. Subtle directional gradient favoring left-hand narrative text */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent" />
                </div>

                {/* Spacer for Top Navigation Bar */}
                <div className="relative z-10 h-24 lg:h-28 w-full" aria-hidden="true" />

                {/* Central / Lower Hero Editorial Content */}
                <div className="relative z-10 w-full max-w-7xl mx-auto sm:px-8 lg:px-12 pt-8 pb-10 flex-1 flex flex-col justify-center">
                    <div className="max-w-3xl">
                        {/* Location Badge / Monograph Pill */}
                        <div className="flex items-center w-fit gap-2.5 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[#fcf9f4] shadow-sm m-auto mb-2 md:mx-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#bfa76f] animate-pulse" />
                            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-sans font-medium text-white/90">
                                Positano Cliffside Sanctuary • Amalfi Coast
                            </span>
                        </div>

                        {/* Editorial Master Heading */}
                        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] text-white font-normal tracking-tight drop-shadow-md text-center md:text-left">
                            Where Serenity Meets The Mediterranean Horizon
                        </h1>

                        {/* Subheading / Provenance Body Text */}
                        <p className="mt-5 px-8 md:px-0 text-sm sm:text-base md:text-[17px] leading-relaxed text-[#fcf9f4]/90 font-sans max-w-2xl font-light drop-shadow text-center md:text-left">
                            Perched along monolithic limestone bluffs, Aurelia offers an unhurried haven crafted from warm travertine, sea stone, and deep coastal stillness.
                        </p>

                        {/* Action Callouts */}
                        <div className="mt-8 flex flex-wrap flex-col md:flex-row items-center justify-center md:justify-normal gap-8 md:gap-5">
                            {/* Primary Gold CTA */}
                            <Link
                                href="/suites"
                                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#bfa76f] hover:bg-[#a99159] text-white font-sans text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <span>Explore Signature Suites</span>
                                <span className="text-sm font-normal">→</span>
                            </Link>

                            {/* Secondary Text Link with Arrow */}
                            <Link
                                href="/heritage"
                                className="group inline-flex items-center gap-2 text-white hover:text-[#bfa76f] font-sans text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors py-2"
                            >
                                <span>The Aurelia Narrative</span>
                                <span className="text-sm font-normal transform transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Booking Bar */}
            <div className="relative -top-16 p-4">
                <BookingBar />
            </div>

            {/* Editorial Narrative Monograph */}
            <section className="max-w-5xl mx-auto px-6 py-24 text-center mb-24">
                <div className="max-w-7xl mx-auto">
                    {/* Header Monograph & Quote */}
                    <div className="mx-auto text-center max-w-4xl tracking-wide">
                        {/* Eyebrow Label */}
                        <span className="block text-[11px] sm:text-[12px] font-sans font-semibold uppercase tracking-[0.35em] text-[#8e763b] mb-4">
                            {'THE AURELIA MANIFESTO'}
                        </span>

                        {/* Master Headline */}
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal text-[#1f1e1d] tracking-tight leading-[1.12]">
                            {'An Architecture of Quiet Unhurried Grace'}
                        </h2>

                        {/* Editorial Italic Quote */}
                        <blockquote className="mt-8 font-serif italic text-base sm:text-lg md:text-[19px] text-[#55524d] font-light leading-9 mx-auto">
                            {'“True luxury is neither rushed nor ostentatious. Carved into living cliffside limestone, Aurelia celebrates the restorative rhythm of the tides, hand-dressed travertine, and intuitive hospitality that anticipates every desire without ceremony.”'}
                        </blockquote>
                    </div>
                </div>

            </section>

            {/* Featured Suites Grid */}
            <section
                className={`w-full bg-[#fcf9f4] py-20 sm:py-24 lg:py-24 px-6 sm:px-8 lg:px-12 border-b border-t border-[#e8e4dc]`}
            >
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
                        <div>
                            <span className="block text-[11px] sm:text-[12px] font-sans font-semibold uppercase tracking-[0.3em] text-[#8e763b] mb-2.5">
                                {"PRIVATE SANCTUARIES"}
                            </span>
                            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#1f1e1d] tracking-tight leading-[1.15]">
                                {'Curated Suites & Cliffside Villas'}
                            </h2>
                        </div>

                        <Link
                            href={'/suites'}
                            className="group inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-sans font-semibold uppercase tracking-[0.25em] text-[#8e763b] hover:text-[#1f1e1d] transition-colors py-1 self-start sm:self-auto"
                        >
                            <span>VIEW ALL 18 ACCOMMODATIONS</span>
                            <span className="text-sm font-normal transform transition-transform duration-300 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>

                    {/* Asymmetric Bento Showcase Grid */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 break-inside-avoid items-start break-inside-avoid">
                        {/* LEFT COLUMN: Large Featured Suite Card (7 Columns) */}
                        <div className="order-1 lg:col-span-8 lg:row-start-1">
                            <SuiteCard {...featuredSuite} variant="master-featured" />
                            
                        </div>

                        {/* RIGHT COLUMN: Stacked Secondary Cards & Concierge Callout (5 Columns) */}
                        <div className="order-2 lg:col-span-4 lg:row-span-2 flex flex-col gap-6">
                            {secondarySuites.map((suite) => (
                                <SuiteCard
                                    key={suite.id}
                                    {...suite}
                                    variant="coastal-grid"
                                />
                            ))}
                        </div>

                        {/* Dark Bespoke Inquiries Banner Card */}
                        <div className="order-3 lg:col-span-8 lg:col-start-1 lg:row-start-2 bg-[#1f1e1d] text-[#fcf9f4] border border-[#383530] rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg lg:transform lg:-translate-y-58">
                            <div>
                                <h4 className="font-serif text-xl sm:text-2xl font-normal text-white tracking-tight">
                                    Bespoke Multi-Week Stays
                                </h4>
                                <p className="mt-1 text-xs text-[#a4a098] font-sans font-light max-w-sm">
                                    Direct inquiries for entire wing reservations and private yacht mooring.
                                </p>
                            </div>

                            <a
                                href="tel:+39089875000"
                                className="px-5 py-3 rounded-sm bg-[#bfa76f] hover:bg-[#aa935e] text-white font-sans text-[11px] font-semibold uppercase tracking-[0.2em] whitespace-nowrap transition-all shadow-md self-stretch sm:self-auto text-center"
                            >
                                CALL CONCIERGE
                            </a>
                        </div>

                    </div>
                </div>
            </section>

            {/* Dining Venue Section */}
            <section className='px-6 md:px-0'>
                <article
                    className={`max-w-7xl mx:30 lg:mx-auto my-20 bg-white border border-[#e8e4dc] rounded-3xl p-8 sm:p-10 lg:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.03)]`}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left Content Column (6 cols on desktop) */}
                        <div className="lg:col-span-6 flex flex-col justify-between h-full">
                            <div>
                                {/* Michelin Star & Chef Eyebrow Badge Pill */}
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f6f2ea] border border-[#ebe5d8] text-[#8e763b] text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-[0.22em] mb-6">
                                    <svg
                                        className="w-3.5 h-3.5 text-[#bfa76f] shrink-0"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12 2l2.4 7.4h7.6l-6 4.5 2.3 7.1-6.3-4.6-6.3 4.6 2.3-7.1-6-4.5h7.6z" />
                                    </svg>
                                    <span>
                                        {'THREE MICHELIN STARS'} • {'CHEF MATTEO MORETTI'}
                                    </span>
                                </div>

                                {/* Master Serif Title */}
                                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#1f1e1d] tracking-tight leading-[1.12]">
                                    {'Ristorante Il Belvedere'}
                                </h2>

                                {/* Narrative Description */}
                                <p className="mt-4 sm:mt-5 text-xs sm:text-[13px] md:text-sm text-[#5f5c56] font-sans font-light leading-relaxed max-w-xl">
                                    {'Perched 200 meters above the surf on an open-air travertine terrace. Experience an unhurried seven-course tasting menu paired with rare reserve vintages from our subterranean volcanic cellar.'}
                                </p>

                                {/* Pricing Breakdown Lines */}
                                <div className="mt-8 sm:mt-10 pt-6 border-t border-[#f0ece3] space-y-3.5 max-w-lg">
                                    {pricingItems.map(function (item, idx) {
                                        return (
                                            <div
                                                key={idx}
                                                className="flex items-baseline justify-between text-xs sm:text-sm font-sans"
                                            >
                                                <span className="text-[#64615a] font-normal">
                                                    {item.label}
                                                </span>
                                                <span className="font-sans font-semibold text-[#1f1e1d] tracking-tight">
                                                    {item.price}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Bottom CTA & Notice Area */}
                            <div className="mt-10 pt-6 border-t border-[#f0ece3] flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                                <Link
                                    href={'/experiences#dining-venue'}
                                    // onClick={onRequestTable}
                                    className="inline-flex items-center justify-center px-7 py-3.5 bg-[#bfa76f] hover:bg-[#aa935e] text-white font-sans text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 shadow-sm active:translate-y-0.5 text-center"
                                >
                                    {'REQUEST DINING TABLE'}
                                </Link>
                                <span className="text-xs text-[#8c8880] font-sans font-light">
                                    {'Advance reservation recommended'}
                                </span>
                            </div>
                        </div>

                        {/* Right Dual Photography Column (6 cols on desktop) */}
                        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full">
                            {/* Primary Image: Sunset Open-Air Terrace */}
                            <div className="relative aspect-4/5 sm:aspect-3/4 w-full rounded-2xl overflow-hidden bg-[#eeeae2] shadow-sm">
                                <Image
                                    src={'/limestone-villa.png'}
                                    alt={`Ristorante Il Belvedere open-air sunset dining terrace overlooking the Mediterranean`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                                    className="object-cover object-center transform transition-transform duration-700 hover:scale-105"
                                />
                            </div>

                            {/* Secondary Image: Sunlit Dining Chamber & Ocean View */}
                            <div className="relative aspect-4/5 sm:aspect-3/4 w-full rounded-2xl overflow-hidden bg-[#eeeae2] shadow-sm">
                                <Image
                                    src={'/suite-402.png'}
                                    alt={`Ristorante Il Belvedere floor-to-ceiling panoramic ocean lounge`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                                    className="object-cover object-center transform transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </article>
            </section>
            
            {/* Testimonials */}
            <section
                className={`w-full bg-[#fcf9f4] py-20 sm:py-24 lg:py-28 px-6 sm:px-8 lg:px-12 border-b border-[#e8e4dc]`}
            >   
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
                        <span className="block text-[11px] sm:text-[12px] font-sans font-semibold uppercase tracking-[0.3em] text-[#8e763b] mb-3">
                            {'CRITICAL ACCLAIM'}
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#1f1e1d] tracking-tight leading-[1.15]">
                            {'Words of Reflection'}
                        </h2>
                    </div>

                    {/* 3 Testimonials Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                        {activeTestimonials.map(function (item, idx) {
                            return (
                                <div
                                    key={idx}
                                    className="bg-white border border-[#e8e4dc] rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(31,30,29,0.05)] transition-all duration-300"
                                >
                                    <div>
                                        {/* 5-Star Rating Row */}
                                        <div
                                            className="flex items-center gap-1.5 text-[#bfa76f] mb-6"
                                            aria-label={`${item.rating || 5} out of 5 stars`}
                                        >
                                            {Array.from({ length: item.rating || 5 }).map(function (_, starIdx) {
                                                return (
                                                    <svg
                                                        key={starIdx}
                                                        className="w-3.5 h-3.5 fill-current"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M12 2l2.4 7.4h7.6l-6 4.5 2.3 7.1-6.3-4.6-6.3 4.6 2.3-7.1-6-4.5h7.6z" />
                                                    </svg>
                                                );
                                            })}
                                        </div>

                                        {/* Italicized Editorial Quote */}
                                        <p className="font-serif italic text-sm sm:text-[15px] text-[#2d2b27] font-light leading-relaxed">
                                            {item.quote}
                                        </p>
                                    </div>

                                    {/* Author Metadata Footer */}
                                    <div className="mt-8 pt-5 border-t border-[#f4f0e6] flex items-center gap-3.5">

                                        <div className="flex flex-col">
                                            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1f1e1d]">
                                                {item.authorName}
                                            </span>
                                            <span className="font-sans text-[10px] text-[#78756d] font-light mt-0.5">
                                                {item.authorRole}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Dark Monolithic Callout Banner Card */}
                    <div className="mt-16 sm:mt-20 bg-[#161514] text-[#fcf9f4] border border-[#2d2b27] rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
                            {/* Left Content Area */}
                            <div className="max-w-2xl">
                                <span className="block text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.3em] text-[#bfa76f] mb-3">
                                    {'YOUR ESCAPE AWAITS'}
                                </span>
                                <h3 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-white tracking-tight leading-[1.12]">
                                    {'Begin Your Mediterranean Retreat'}
                                </h3>
                                <p className="mt-4 text-sm font-sans text-white/60 leading-relaxed max-w-xl">
                                    {'Reserve directly with our private concierge team for bespoke itinerary curation, private helipad arrival, and preferred suite placement'}
                                </p>
                            </div>

                            {/* Right Dual Action Buttons */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 shrink-0">
                                {/* Primary Gold Button */}
                                <Link
                                    href={'/suites'}
                                    // onClick={onCheckAvailability}
                                    className="inline-flex items-center justify-center px-10 py-4 bg-[#b28c51] hover:bg-[#9e7a42] text-white font-sans text-[11px] font-semibold uppercase tracking-[0.22em] rounded-sm transition-all duration-300 shadow-sm active:translate-y-0.5 text-center whitespace-nowrap"
                                >
                                    {'CHECK AVAILABILITY'}
                                </Link>

                                {/* Secondary Outline Button */}
                                <Link
                                    href={'/experiences#concierge'}
                                    // onClick={onInquireConcierge}
                                    className="inline-flex items-center justify-center px-10 py-4 bg-transparent hover:bg-white/5 border border-white/20 hover:border-white/40 text-white font-sans text-[11px] font-medium uppercase tracking-[0.22em] rounded-sm transition-all duration-300 active:translate-y-0.5 text-center whitespace-nowrap"
                                >
                                    {'INQUIRE CONCIERGE'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
