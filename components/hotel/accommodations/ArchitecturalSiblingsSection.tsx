import Image from 'next/image';
import Link from 'next/link';


export interface SiblingAccommodationItem {
    id: string;
    slug: string;
    name: string;
    category: string;
    badge: string;
    squareMeters: number;
    elevationTag: string;
    tagline: string;
    basePriceNightly: number;
    currencySymbol: string;
    heroImageUrl: string;
    privilegeText: string;
    features: string[];
}

export interface AccommodationSiblingsData {
    eyebrow: string;
    heading: string;
    description: string;
    viewAllHref: string;
    siblings: SiblingAccommodationItem[];
}

export const suite402SiblingsData: AccommodationSiblingsData = {
    eyebrow: 'ARCHITECTURAL SIBLINGS',
    heading: 'Alternative Sanctuaries of Equal Distinction',
    description:
        'Should Suite 402 be unavailable during your preferred stay horizon, our coastal master estate includes these complementary sanctuaries.',
    viewAllHref: '/accommodations',
    siblings: [
        {
            id: 'villa-limestone',
            slug: 'the-limestone-villa',
            name: 'The Limestone Villa',
            category: 'CLIFFSIDE VILLA',
            badge: 'STANDALONE ESTATE',
            squareMeters: 210,
            elevationTag: 'LEVEL I • WATERFRONT',
            tagline:
                'Multi-level independent cliff residence with heated infinity plunge pool, private Riva yacht tender dock, and dedicated sommelier cellar.',
            basePriceNightly: 2850,
            currencySymbol: '€',
            heroImageUrl: '/limestone-villa.png',
            privilegeText: 'Dedicated Majordomo & Private Dock',
            features: ['2 King Chambers', 'Private Mooring', 'Basalt Solarium'],
        },
        {
            id: 'garden-pavilion',
            slug: 'lemon-grove-garden-pavilion',
            name: 'Lemon Grove Garden Pavilion',
            category: 'GARDEN SANCTUARY',
            badge: 'CENTURY ORCHARD',
            squareMeters: 175,
            elevationTag: 'UPPER GROVE TERRACE',
            tagline:
                'Nestled among two-century-old Amalfi lemon groves with freestanding carved travertine baths and secluded sun solarium.',
            basePriceNightly: 1800,
            currencySymbol: '€',
            heroImageUrl: '/garden-pavillion.png',
            privilegeText: 'Artisan Orchard Breakfast Daily',
            features: ['Emperor Linen King', 'Travertine Bath', 'Citrus Solarium'],
        },
    ],
};

export interface AccommodationArchitecturalSiblingsProps {
    data?: AccommodationSiblingsData;
    className?: string;
}

export function AccommodationArchitecturalSiblingsSection({
    data = suite402SiblingsData,
    className = '',
}: AccommodationArchitecturalSiblingsProps) {
    const { eyebrow, heading, description, viewAllHref, siblings } = data;

    return (
        <section className={`bg-[#fcf9f4] pt-12 pb-12 px-4 sm:px-8 lg:px-26 border-t border-[#e8e4dc] ${className}`}>
            {/* Header Strip */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                    <span className="block text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#8e763b] mb-2">
                        {eyebrow}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-normal text-[#1f1e1d] tracking-tight">
                        {heading}
                    </h2>
                    <p className="mt-2 text-xs sm:text-[13px] text-[#6e6b64] font-sans font-light max-w-2xl">
                        {description}
                    </p>
                </div>

                <Link
                    href={viewAllHref}
                    className="group inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e763b] hover:text-[#1f1e1d] transition-colors py-1 shrink-0"
                >
                    <span>VIEW ALL 18 SANCTUARIES</span>
                    <span className="text-sm font-normal transform transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </Link>
            </div>

            {/* 2-Column Sibling Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {siblings.map(function (item) {
                    return (
                        <article
                            key={item.id}
                            className="group bg-white border border-[#e8e4dc] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(31,30,29,0.07)] hover:border-[#8e763b]/50 transition-all duration-500 flex flex-col justify-between"
                        >
                            {/* Card Media Container */}
                            <div>
                                <div className="relative aspect-16/10 w-full overflow-hidden bg-[#eeeae2]">
                                    <Image
                                        src={item.heroImageUrl}
                                        alt={item.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                                    {/* Top Left Category Badges */}
                                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                                        <span className="px-2.5 py-1 rounded-sm bg-black/60 backdrop-blur-md text-white font-sans text-[9px] font-semibold uppercase tracking-[0.18em]">
                                            {item.category}
                                        </span>
                                        <span className="px-2.5 py-1 rounded-sm bg-white/90 backdrop-blur-md text-[#1f1e1d] font-sans text-[9px] font-semibold uppercase tracking-[0.18em]">
                                            {item.badge}
                                        </span>
                                    </div>

                                    {/* Bottom Floating Price Tag */}
                                    <div className="absolute bottom-3 right-3 z-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-sm shadow-sm border border-[#e8e4dc] text-right">
                                        <div className="flex items-baseline gap-1">
                                            <span className="font-serif text-base sm:text-lg font-bold text-[#1f1e1d]">
                                                {item.currencySymbol}
                                                {item.basePriceNightly.toLocaleString()}
                                            </span>
                                            <span className="text-[10px] font-sans text-[#78756d]">
                                                / night
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="p-5 sm:p-6">
                                    <div className="flex items-center justify-between text-[10px] font-sans uppercase tracking-[0.2em] text-[#8e763b] mb-1.5">
                                        <span>{item.squareMeters} M²</span>
                                        <span className="text-[#8e8a82]">{item.elevationTag}</span>
                                    </div>

                                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1f1e1d] tracking-tight group-hover:text-[#8e763b] transition-colors">
                                        {item.name}
                                    </h3>

                                    <p className="mt-2 text-xs sm:text-[13px] text-[#6e6b64] font-sans font-light leading-relaxed line-clamp-2">
                                        {item.tagline}
                                    </p>

                                    {/* Feature Badges Strip */}
                                    <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-[#f0ece3]">
                                        {item.features.map(function (feat, idx) {
                                            return (
                                                <span
                                                    key={idx}
                                                    className="px-2.5 py-1 rounded-sm bg-[#f6f2ea] border border-[#e8e4dc] text-[9px] font-sans font-medium uppercase tracking-[0.15em] text-[#646159]"
                                                >
                                                    {feat}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Card Action Footer */}
                            <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#f0ece3] flex items-center justify-between">
                                <span className="text-[11px] font-sans text-[#78756d]">
                                    {item.privilegeText}
                                </span>

                                <Link
                                    href={`/accommodations/${item.id}`}
                                    className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b] hover:text-[#1f1e1d] transition-colors"
                                >
                                    <span>EXPLORE</span>
                                    <span>→</span>
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}