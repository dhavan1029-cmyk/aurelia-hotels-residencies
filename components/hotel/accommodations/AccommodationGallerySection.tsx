import Image from "next/image";
import { AccommodationGalleryData } from "../types/accommodations";

const suite402DetailData: AccommodationGalleryData = {
    sanctuaryEyebrow: 'SANCTUARY 402',
    wingSubtitle: 'AURELIA MEDITERRANEAN WING',
    suiteTitle: 'Room 402 — The Azure Master Ocean Suite',
    ratingScore: 4.98,
    appraisalsCount: 48,
    patronReserveTier: 'Virtuoso Private Reserve',
    heroImage: {
        url: '/suite-402.png',
        alt: 'The Azure Master Ocean Suite bedroom opening to panoramic coastal sea terrace',
        title: 'Acoustic serenity suspended over the bay.',
        badge: 'UNINTERRUPTED HORIZON • LEVEL IV',
        actionLabel: '1 OF 12 CURATED VIEWS',
    },
    secondaryTopImage: {
        url: '/suite-402.png',
        alt: 'Honed travertine en-suite soaking bath overlooking the Mediterranean',
        title: 'Honed Travertine Bath',
        badge: 'EN-SUITE SPA',
    },
    secondaryBottomImage: {
        url: '/suite-402.png',
        alt: 'Private clifftop terrace with heated basalt plunge deck',
        title: 'Basalt Plunge Deck',
        badge: 'PRIVATE TERRACE',
        actionLabel: 'Explore Gallery',
    },
};

export interface AccommodationGalleryProps {
    data?: AccommodationGalleryData;
    onSaveWishlist?: () => void;
    onShareSanctuary?: () => void;
    onOpenGalleryModal?: () => void;
    className?: string;
}

export function AccommodationGallerySection({
    data = suite402DetailData,
    onSaveWishlist,
    onShareSanctuary,
    onOpenGalleryModal,
    className = '',
}: AccommodationGalleryProps) {
    const {
        sanctuaryEyebrow,
        wingSubtitle,
        suiteTitle,
        ratingScore,
        appraisalsCount,
        patronReserveTier,
        heroImage,
        secondaryTopImage,
        secondaryBottomImage,
    } = data;

    return (
        <section className={`w-full bg-[#fcf9f4] pt-6 sm:pt-8 pb-10 px-4 sm:px-8 lg:px-12 text-[#1f1e1d] ${className}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 max-w-340 mx-auto space-y-6 sm:space-y-8">

                {/* Suite Category Eyebrow, Master Serif Title & Patron Accolades */}
                <div className="col-span-12 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2.5 py-0.5 rounded-sm bg-[#f2ede4] border border-[#ded9ce] text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b]">
                                {sanctuaryEyebrow}
                            </span>
                            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e8a82]">
                                {wingSubtitle}
                            </span>
                        </div>
                        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#1f1e1d] tracking-tight leading-[1.12]">
                            {suiteTitle}
                        </h1>
                    </div>

                    {/* Patron Accolade Rating Strip */}
                    <div className="flex items-center gap-3 text-xs font-sans text-[#5c5952] shrink-0 pt-2 lg:pt-0">
                        <div className="flex items-center gap-1 text-[#8e763b]">
                            <svg className="w-4 h-4 fill-[#bfa76f] text-[#bfa76f]" viewBox="0 0 24 24">
                                <path d="M12 2l2.4 7.4h7.6l-6 4.5 2.3 7.1-6.3-4.6-6.3 4.6 2.3-7.1-6-4.5h7.6z" />
                            </svg>
                            <span className="font-serif font-bold text-sm text-[#1f1e1d]">{ratingScore}</span>
                        </div>
                        <span>•</span>
                        <span className="underline cursor-pointer hover:text-[#1f1e1d]">
                            {appraisalsCount} Discerning Patron Appraisals
                        </span>
                        <span>•</span>
                        <span className="text-[#8e763b] font-medium tracking-wide">
                            {patronReserveTier}
                        </span>
                    </div>
                </div>

                {/* High-Fidelity Asymmetric Gallery Grid */}
                <div className="col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 h-auto lg:h-135">
                    {/* Primary Hero Column (8 Columns) */}
                    <div className="lg:col-span-8 relative min-h-90 sm:min-h-110 lg:min-h-full rounded-lg overflow-hidden bg-[#eeeae2] group">
                        <Image
                            src={heroImage.url}
                            alt={heroImage.alt}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 68vw"
                            className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                        {/* Bottom Overlay Narrative & Counter */}
                        <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
                            <div>
                                {heroImage.badge && (
                                    <span className="block text-[9px] font-sans font-semibold uppercase tracking-[0.22em] text-[#dcdad5] mb-1">
                                        {heroImage.badge}
                                    </span>
                                )}
                                <p className="font-serif text-lg sm:text-2xl font-light tracking-tight text-white/95">
                                    {heroImage.title}
                                </p>
                            </div>

                            {heroImage.actionLabel && (
                                <button
                                    type="button"
                                    onClick={onOpenGalleryModal}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-sans font-medium uppercase tracking-[0.16em] hover:bg-black/80 transition-all self-start sm:self-auto"
                                >
                                    <svg className="w-3.5 h-3.5 text-[#bfa76f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <polyline points="21 15 16 10 5 21" />
                                    </svg>
                                    <span>{heroImage.actionLabel}</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Secondary Stacked Photography Column (4 Columns) */}
                    <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-5 h-full">
                        {/* Secondary Top: En-suite Travertine Bath */}
                        <div className="relative min-h-55 lg:h-full rounded-lg overflow-hidden bg-[#eeeae2] group">
                            <Image
                                src={secondaryTopImage.url}
                                alt={secondaryTopImage.alt}
                                fill
                                sizes="(max-width: 1024px) 50vw, 32vw"
                                className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                            <div className="absolute top-4 left-4 z-10">
                                {secondaryTopImage.badge && (
                                    <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[9px] font-sans font-semibold uppercase tracking-[0.18em] text-[#dcdad5]">
                                        {secondaryTopImage.badge}
                                    </span>
                                )}
                            </div>

                            <div className="absolute bottom-4 left-4 right-4 z-10">
                                <h4 className="font-serif text-lg sm:text-xl font-normal text-white">
                                    {secondaryTopImage.title}
                                </h4>
                            </div>
                        </div>

                        {/* Secondary Bottom: Basalt Plunge Deck with Explore Gallery Pill */}
                        <div className="relative min-h-55 lg:h-full rounded-lg overflow-hidden bg-[#eeeae2] group">
                            <Image
                                src={secondaryBottomImage.url}
                                alt={secondaryBottomImage.alt}
                                fill
                                sizes="(max-width: 1024px) 50vw, 32vw"
                                className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                            <div className="absolute top-4 left-4 z-10">
                                {secondaryBottomImage.badge && (
                                    <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[9px] font-sans font-semibold uppercase tracking-[0.18em] text-[#bfa76f]">
                                        {secondaryBottomImage.badge}
                                    </span>
                                )}
                            </div>

                            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between gap-2">
                                <h4 className="font-serif text-lg sm:text-xl font-normal text-white">
                                    {secondaryBottomImage.title}
                                </h4>

                                {secondaryBottomImage.actionLabel && (
                                    <button
                                        type="button"
                                        onClick={onOpenGalleryModal}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-[#1f1e1d] text-[10px] font-sans font-semibold uppercase tracking-[0.16em] transition-all shadow-md shrink-0"
                                    >
                                        <span>{secondaryBottomImage.actionLabel}</span>
                                        <span className="text-xs">→</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}



