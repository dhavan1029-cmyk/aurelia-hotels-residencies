import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Waves,
    Bath,
    DoorOpen,
    Wine,
    Sun,
    Ship,
    Thermometer,
    Sprout,
    Flower2,
    Shield,
    Sparkles,
    type LucideIcon,
} from 'lucide-react';
import { AccommodationBookingContext } from '@/lib/hotel/mappers/AccommodationDetailsMapper';

const amenityIcons: Record<string, LucideIcon> = {
    Waves,
    Bath,
    DoorOpen,
    Wine,
    Sun,
    Ship,
    Thermometer,
    Sprout,
    Flower2,
    Shield,
    Sparkles,
};

export interface SuiteAmenityItem {
    name: string;
    label: string;
    iconClass?: string;
}

export interface SuiteFeatureItem {
    icon?: string;
    title: string;
    description: string;
}

export interface SuitePrivilegeItem {
    badge?: string;
    title: string;
    description: string;
}

export type BookingParams = AccommodationBookingContext;

export interface SuiteCardProps {
    id: string;
    slug: string;
    name: string;
    category?: string;
    badgeLabel?: string;
    elevationTag?: string;
    highlightTag?: string;
    metaEyebrow?: string;
    headline?: string;
    description: string;
    paragraphs?: string[];

    squareMeters?: number;
    squareFeet?: number;
    bedroomsCount?: number;
    bathroomsCount?: number;
    maxOccupancy?: number;
    bedConfiguration?: string;
    viewOrientation?: string;

    pricePerNight: number;
    currency?: string;
    currencySymbol?: string;
    pricePeriodSuffix?: string;
    minStayNotice?: string;
    specsText?: string;

    heroImageUrl: string;
    photoCount?: number;

    privilegeNotice?: string;
    privileges?: SuitePrivilegeItem[];
    features?: SuiteFeatureItem[];
    amenities?: SuiteAmenityItem[];
    sensoryBadges?: string[];
    pillTags?: string[];

    featureOverlayText?: string;
    featureOverlayIcon?: React.ReactNode;

    primaryCtaLabel?: string;
    secondaryCtaLabel?: string;
    onPrimaryAction?: () => void;
    onSecondaryAction?: () => void;

    bookingParams: BookingParams

    variant?: 'master-featured' | 'coastal-grid' | 'featured' | 'compact-horizontal' | 'standard';
    className?: string;
}

export function SuiteCard({
    id,
    slug,
    name,
    category = 'SUITE',
    badgeLabel,
    elevationTag,
    highlightTag,
    metaEyebrow,
    headline,
    description,
    pricePerNight,
    currency = 'EUR',
    currencySymbol = '€',
    pricePeriodSuffix = '/ night',
    minStayNotice,
    specsText,
    heroImageUrl,
    photoCount,
    privilegeNotice,
    amenities = [],
    features = [],
    privileges = [],
    sensoryBadges = [],
    pillTags = [],
    featureOverlayText,
    featureOverlayIcon,
    primaryCtaLabel = 'Reserve Suite',
    secondaryCtaLabel = 'View Details',
    onPrimaryAction,
    onSecondaryAction,
    variant = 'coastal-grid',
    className = '',
    bookingParams
}: SuiteCardProps) {

    const {checkInDate, checkOutDate, nightsCount, guestsCount} = bookingParams

    const symbol = currencySymbol || (currency === 'EUR' ? '€' : currency === 'USD' ? '$' : currency);
    const resolvedBadge = badgeLabel || category;
    const resolvedElevation = elevationTag || highlightTag || (sensoryBadges.length > 0 ? sensoryBadges[0] : undefined);
    const resolvedSpecs = specsText || metaEyebrow;
    const resolvedPrivilegeNotice = privilegeNotice || (privileges.length > 0 ? privileges[0].title : undefined);
    const activePillTags = pillTags.length > 0 ? pillTags : sensoryBadges;

    // -------------------------------------------------------------------------
    // VARIANT 1: MASTER FEATURED HORIZONTAL BENTO (Top Azure Ocean Suite)
    // -------------------------------------------------------------------------
    if (variant === 'master-featured' || variant === 'featured') {
        return (
            <article
                className={`w-full bg-white border border-[#e8e4dc] rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 transition-all duration-500 hover:border-[#8e763b]/50 hover:shadow-[0_12px_36px_rgba(31,30,29,0.06)] ${className}`}
            >
                {/* Left 7 Columns: Media Container with Badges, Valet Banner & Photo Counter */}
                <div className="lg:col-span-7 relative min-h-95 sm:min-h-115 lg:min-h-125 bg-[#eeeae2] overflow-hidden group">
                    <Image
                        src={heroImageUrl}
                        alt={name}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient overlay for text legibility */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Top Badges Row */}
                    <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
                        {resolvedBadge && (
                            <span className="px-3 py-1 bg-[#8e763b]/95 backdrop-blur-md rounded-md text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-white shadow-xs">
                                {resolvedBadge}
                            </span>
                        )}
                        {resolvedElevation && (
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-md text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#2c2a26] shadow-xs">
                                {resolvedElevation}
                            </span>
                        )}
                    </div>

                    {/* Bottom Valet / Direct Reservation Privilege Micro-Banner */}
                    {resolvedPrivilegeNotice && (
                        <div className="absolute bottom-4 left-4 right-24 sm:right-auto sm:max-w-md z-10 bg-white/95 backdrop-blur-md rounded-xl p-3 sm:px-4 sm:py-3 border border-[#ded9ce] shadow-md">
                            <span className="block text-[8px] sm:text-[9px] font-mono font-semibold uppercase tracking-[0.2em] text-[#8e763b]">
                                DIRECT RESERVATION PRIVILEGE
                            </span>
                            <p className="text-[11px] font-sans text-[#2c2a26] font-medium leading-tight mt-0.5">
                                {resolvedPrivilegeNotice}
                            </p>
                        </div>
                    )}

                    {/* Bottom Right Photo Counter Pill */}
                    {Boolean(photoCount) && (
                        <div className="absolute bottom-4 right-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-white flex items-center gap-1.5 text-[10px] font-mono font-medium tracking-wider uppercase">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                            <span>{photoCount} PHOTOS</span>
                        </div>
                    )}
                </div>

                {/* Right 5 Columns: Editorial Content, Specs, Amenities & CTAs */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-[#fcf9f4]">
                    <div>
                        {/* Header: Category Eyebrow & Price */}
                        <div className="flex items-start justify-between gap-4 border-b border-[#eeeae2] pb-4">
                            <div>
                                <span className="block text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#8e763b]">
                                    {category}
                                </span>
                                <h3 className="font-serif text-2xl sm:text-3xl text-[#1f1e1d] font-normal tracking-tight mt-1">
                                    {name}
                                </h3>
                            </div>
                            <div className="text-right shrink-0">
                                <div className="font-serif text-2xl sm:text-[28px] font-semibold text-[#1f1e1d] leading-none">
                                    {symbol}{pricePerNight.toLocaleString()}
                                </div>
                                <span className="text-[10px] text-[#78756d] font-sans uppercase tracking-wider block mt-1">
                                    {pricePeriodSuffix} {minStayNotice ? `• ${minStayNotice}` : ''}
                                </span>
                            </div>
                        </div>

                        {/* Specs Text */}
                        {resolvedSpecs && (
                            <p className="mt-3.5 text-xs font-sans text-[#78756d] font-medium tracking-tight">
                                {resolvedSpecs}
                            </p>
                        )}

                        {/* Editorial Headline */}
                        {headline && (
                            <p className="mt-3 font-serif italic text-sm text-[#2d2b27] font-light leading-snug">
                                “{headline}”
                            </p>
                        )}

                        {/* Narrative Description */}
                        <p className="mt-2 text-xs sm:text-[13px] text-[#55524d] font-sans font-light leading-relaxed">
                            {description}
                        </p>

                        {/* Architectural Features (3 Highlight Spec Items) */}
                        {features.length > 0 && (
                            <div className="mt-5 pt-4 border-t border-[#eeeae2] grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                {features.map((feat, idx) => (
                                    <div
                                        key={`${feat.title}-${idx}`}
                                        className="p-2.5 rounded-xl bg-white border border-[#ded9ce] shadow-2xs"
                                    >
                                        <span className="font-serif text-xs font-semibold text-[#1f1e1d] block truncate">
                                            {feat.title}
                                        </span>
                                        <span className="text-[9.5px] font-sans text-[#78756d] font-light block leading-tight mt-0.5 line-clamp-2">
                                            {feat.description}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Amenity Line Items with Safe Lucide Icon Lookup */}
                        {amenities.length > 0 && (
                            <div className="mt-5 pt-4 border-t border-[#eeeae2] grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-sans text-[#2e2c29]">
                                {amenities.map((amenity, idx) => {
                                    const IconComponent =
                                        (amenity.iconClass && amenityIcons[amenity.iconClass]) ||
                                        amenityIcons.Sparkles ||
                                        amenityIcons.Sun;

                                    return (
                                        <div
                                            key={`${amenity.label}-${idx}`}
                                            className="flex items-center gap-2.5"
                                        >
                                            <span className="w-6 h-6 rounded-md bg-[#f6f2ea] border border-[#ded9ce] flex items-center justify-center text-[#8e763b] shrink-0">
                                                <IconComponent
                                                    size={13}
                                                    strokeWidth={1.6}
                                                    aria-hidden="true"
                                                />
                                            </span>

                                            <span className="font-medium text-[11px] text-[#3c3934] truncate">
                                                {amenity.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="mt-8 pt-5 border-t border-[#eeeae2] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <Link
                            href={`/checkout?suite=${slug || id}`}
                            onClick={onPrimaryAction}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-6 py-3.5 bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-[11px] font-semibold uppercase tracking-[0.2em] rounded-xl transition-all duration-200 shadow-sm text-center"
                        >
                            <span>{primaryCtaLabel}</span>
                            <span className="ml-1">→</span>
                        </Link>
                        <Link
                            href={`/accommodations/${slug || id}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&nightsCount=${nightsCount}&guestsCount=${guestsCount}`}
                            onClick={onSecondaryAction}
                            className="inline-flex items-center justify-center px-6 py-3.5 bg-white hover:bg-[#f6f2ea] text-[#2c2a26] border border-[#ded9ce] font-sans text-[11px] font-medium uppercase tracking-[0.18em] rounded-xl transition-all duration-200 text-center shadow-2xs"
                        >
                            {secondaryCtaLabel}
                        </Link>
                    </div>
                </div>
            </article>
        );
    }

    // -------------------------------------------------------------------------
    // VARIANT 2: COASTAL GRID CARD (Bottom Cliff Villa & Citrus Pavilion)
    // -------------------------------------------------------------------------
    return (
        <article
            className={`w-full bg-white border border-[#e8e4dc] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(31,30,29,0.06)] hover:border-[#8e763b]/50 transition-all duration-500 flex flex-col justify-between group ${className}`}
        >
            <div>
                {/* Media Image with Badges, Feature Overlay & Embedded Price Tag */}
                <div className="relative aspect-16/10 sm:aspect-16/10.5 w-full bg-[#eeeae2] overflow-hidden">
                    <Image
                        src={heroImageUrl}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 z-10 flex flex-wrap items-center gap-1.5">
                        {resolvedBadge && (
                            <span className="px-2.5 py-1 bg-[#8e763b]/95 backdrop-blur-md rounded-md text-[9px] font-sans font-semibold uppercase tracking-[0.18em] text-white shadow-xs">
                                {resolvedBadge}
                            </span>
                        )}
                        {resolvedElevation && (
                            <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-md text-[9px] font-sans font-semibold uppercase tracking-[0.16em] text-[#2c2a26] shadow-xs">
                                {resolvedElevation}
                            </span>
                        )}
                    </div>

                    {/* Bottom Overlay Row: Feature Indicator (Left) & Price Tag (Right) */}
                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between gap-2 text-white">
                        {featureOverlayText ? (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-sans font-medium tracking-wide">
                                {featureOverlayIcon || (
                                    <svg className="w-3.5 h-3.5 text-[#bfa76f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M2 12h20M2 17h20M2 7h20" />
                                    </svg>
                                )}
                                <span>{featureOverlayText}</span>
                            </div>
                        ) : resolvedPrivilegeNotice ? (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-sans font-medium text-white/95">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#bfa76f]" />
                                <span className="truncate max-w-42.5">{resolvedPrivilegeNotice}</span>
                            </div>
                        ) : null}

                        <div className="text-right bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl ml-auto border border-white/10">
                            <span className="font-serif text-lg sm:text-xl font-bold leading-none block text-white">
                                {symbol}{pricePerNight.toLocaleString()}
                            </span>
                            <span className="text-[9px] font-sans text-white/80 block uppercase tracking-wider mt-0.5">
                                {pricePeriodSuffix} {minStayNotice ? `• ${minStayNotice}` : ''}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Details Body */}
                <div className="p-6">
                    <h4 className="font-serif text-xl sm:text-2xl text-[#1f1e1d] font-normal tracking-tight group-hover:text-[#8e763b] transition-colors">
                        {name}
                    </h4>

                    {resolvedSpecs && (
                        <p className="mt-1.5 text-xs font-sans text-[#78756d] leading-snug">
                            {resolvedSpecs}
                        </p>
                    )}

                    {headline && (
                        <p className="mt-2.5 font-serif italic text-xs text-[#2c2a26] font-light leading-snug">
                            “{headline}”
                        </p>
                    )}

                    <p className="mt-2 text-xs text-[#55524d] font-sans font-light leading-relaxed">
                        {description}
                    </p>

                    {/* Features Micro-List */}
                    {features.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-[#f0ece3] space-y-1">
                            {features.slice(0, 2).map((feat, idx) => (
                                <div key={idx} className="flex items-center justify-between text-[11px] font-sans">
                                    <span className="text-[#3c3934] font-medium">{feat.title}</span>
                                    <span className="text-[#8e8a82] font-light text-[10px]">{feat.description}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pill Tags / Sensory Badges */}
                    {activePillTags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                            {activePillTags.map(function (tag, idx) {
                                return (
                                    <span
                                        key={idx}
                                        className="px-2.5 py-1 bg-[#f6f3ee] border border-[#e8e4dc] rounded-md text-[9px] font-mono font-medium uppercase tracking-[0.16em] text-[#55524d]"
                                    >
                                        {tag}
                                    </span>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="px-6 pb-6 pt-3 flex items-center justify-between gap-3 border-t border-[#f2ede4] mt-2">
                <Link
                    href={`/checkout?suite=${slug || id}`}
                    onClick={onPrimaryAction}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-[10px] font-semibold uppercase tracking-[0.2em] rounded-xl transition-all duration-200 shadow-sm text-center"
                >
                    <span>{primaryCtaLabel}</span>
                    <span className="ml-1">→</span>
                </Link>

                <Link
                    href={`/accommodations/${slug || id}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&nightsCount=${nightsCount}&guestsCount=${guestsCount}`}
                    onClick={onSecondaryAction}
                    className="inline-flex items-center justify-center px-4 py-3 bg-[#f6f3ee] hover:bg-[#eeeae2] text-[#2c2a26] border border-[#ded9ce] font-sans text-[10px] font-medium uppercase tracking-[0.18em] rounded-xl transition-all duration-200 text-center"
                >
                    {secondaryCtaLabel}
                </Link>
            </div>
        </article>
    );
}
