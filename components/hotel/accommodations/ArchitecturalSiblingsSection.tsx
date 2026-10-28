import Image from 'next/image';
import Link from 'next/link';
import { SiblingAccommodationItem } from '../types/accommodations'; 

export interface AccommodationArchitecturalSiblingsProps {
    data: SiblingAccommodationItem[];
    className?: string;
}

export function AccommodationArchitecturalSiblingsSection({
    data,
    className = '',
}: AccommodationArchitecturalSiblingsProps) {

    return (
        <section className={`bg-[#fcf9f4] pt-12 pb-12 px-4 sm:px-8 lg:px-26 border-t border-[#e8e4dc] ${className}`}>
            {/* Header Strip */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                    <span className="block text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#8e763b] mb-2">
                        ARCHITECTURAL SIBLINGS
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-normal text-[#1f1e1d] tracking-tight">
                        Alternative Sanctuaries of Equal Distinction
                    </h2>
                    <p className="mt-2 text-xs sm:text-[13px] text-[#6e6b64] font-sans font-light max-w-2xl">
                        Should Suite 402 be unavailable during your preferred stay horizon, our coastal master estate includes these complementary sanctuaries.
                    </p>
                </div>

                <Link
                    href={'/accommodations'}
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
                {data.map(function (item) {
                    return (
                        <article
                            key={item.id}
                            className="group bg-white border border-[#e8e4dc] -2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(31,30,29,0.07)] hover:border-[#8e763b]/50 transition-all duration-500 flex flex-col justify-between"
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
                                        <span className="px-2.5 py-1 -sm bg-black/60 backdrop-blur-md text-white font-sans text-[9px] font-semibold uppercase tracking-[0.18em]">
                                            {item.category}
                                        </span>
                                        <span className="px-2.5 py-1 -sm bg-white/90 backdrop-blur-md text-[#1f1e1d] font-sans text-[9px] font-semibold uppercase tracking-[0.18em]">
                                            {item.badge}
                                        </span>
                                    </div>

                                    {/* Bottom Floating Price Tag */}
                                    <div className="absolute bottom-3 right-3 z-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 -sm shadow-sm border border-[#e8e4dc] text-right">
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
                                                    className="px-2.5 py-1 -sm bg-[#f6f2ea] border border-[#e8e4dc] text-[9px] font-sans font-medium uppercase tracking-[0.15em] text-[#646159]"
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