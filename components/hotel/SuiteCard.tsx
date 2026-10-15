import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface SuiteAmenityItem {
    icon?: React.ReactNode;
    label: string;
}

export interface SuiteCardProps {
    id: string;
    slug: string;
    name: string;
    category?: string;
    badgeLabel?: string;
    elevationTag?: string;
    pricePerNight: number;
    currency?: string;
    pricePeriodSuffix?: string;
    minStayNotice?: string;
    specsText?: string;
    description: string;
    heroImageUrl: string;
    photoCount?: number;
    privilegeNotice?: string;
    amenities?: SuiteAmenityItem[];
    pillTags?: string[];
    featureOverlayText?: string;
    featureOverlayIcon?: React.ReactNode;
    primaryCtaLabel?: string;
    secondaryCtaLabel?: string;
    onPrimaryAction?: () => void;
    onSecondaryAction?: () => void;
    variant?: 'master-featured' | 'coastal-grid';
    className?: string;
}

export function SuiteCard({
    id,
    slug,
    name,
    category,
    badgeLabel,
    elevationTag,
    pricePerNight,
    currency = '€',
    pricePeriodSuffix = '/ night',
    minStayNotice,
    specsText,
    description,
    heroImageUrl,
    photoCount,
    privilegeNotice,
    amenities = [],
    pillTags = [],
    featureOverlayText,
    featureOverlayIcon,
    primaryCtaLabel = 'Reserve Suite',
    secondaryCtaLabel = 'View Sanctuary Details',
    onPrimaryAction,
    onSecondaryAction,
    variant = 'coastal-grid',
    className = '',
}: SuiteCardProps) {
    // -------------------------------------------------------------------------
    // VARIANT 1: MASTER FEATURED HORIZONTAL BENTO (Top Azure Ocean Suite)
    // -------------------------------------------------------------------------
    if (variant === 'master-featured') {
        return (
            <article
                className={`w-full bg-white border border-[#e8e4dc] rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 ${className}`}
            >
                {/* Left 7 Columns: Media Container with Badges, Valet Banner & Photo Counter */}
                <div className="lg:col-span-7 relative min-h-95 sm:min-h-115 lg:min-h-125 bg-[#eeeae2] overflow-hidden">
                    <Image
                        src={heroImageUrl}
                        alt={name}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover object-center transform transition-transform duration-700 hover:scale-105"
                    />

                    {/* Top Badges Row */}
                    <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
                        {badgeLabel && (
                            <span className="px-3 py-1 bg-[#8e763b]/90 backdrop-blur-md rounded-md text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-white shadow-xs">
                                {badgeLabel}
                            </span>
                        )}
                        {elevationTag && (
                            <span className="px-3 py-1 bg-white/85 backdrop-blur-md rounded-md text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#33312e] shadow-xs">
                                {elevationTag}
                            </span>
                        )}
                    </div>

                    {/* Bottom Valet Privilege Micro-Banner */}
                    {privilegeNotice && (
                        <div className="absolute bottom-4 left-4 right-20 sm:right-auto sm:max-w-md z-10 bg-white/95 backdrop-blur-md rounded-xl p-3 sm:px-4 sm:py-3 border border-[#ded9ce] shadow-md">
                            <span className="block text-[8px] sm:text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b]">
                                DIRECT RESERVATION PRIVILEGES
                            </span>
                            <p className="text-[11px] font-sans text-[#2c2a26] font-medium leading-tight mt-0.5">
                                {privilegeNotice}
                            </p>
                        </div>
                    )}

                    {/* Bottom Right Photo Counter Pill */}
                    {photoCount && (
                        <div className="absolute bottom-4 right-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-white flex items-center gap-1.5 text-[10px] font-sans font-semibold tracking-wider uppercase">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                            <span>{photoCount} PHOTOGRAPHS</span>
                        </div>
                    )}
                </div>

                {/* Right 5 Columns: Editorial Content & CTAs */}
                <div className={"lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between"}>
                    <div>
                        {/* Header: Category Eyebrow & Price */}
                        <div className="flex items-start justify-between gap-4 border-b border-[#f2ede4] pb-4">
                            <div>
                                <span className="block text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#8e763b]">
                                    {category}
                                </span>
                                <h3 className="font-serif text-2xl sm:text-3xl text-[#1f1e1d] font-normal tracking-tight mt-1">
                                    {name}
                                </h3>
                            </div>
                            <div className="text-right shrink-0">
                                <div className="font-serif text-2xl sm:text-[26px] font-normal text-[#1f1e1d]">
                                    {currency}{pricePerNight.toLocaleString()}
                                </div>
                                <span className="text-[10px] text-[#7d7a73] font-sans uppercase tracking-wider block">
                                    {pricePeriodSuffix}
                                </span>
                            </div>
                        </div>

                        {/* Specs Text */}
                        {specsText && (
                            <p className="mt-3.5 text-xs font-sans text-[#78756e] font-normal">
                                {specsText}
                            </p>
                        )}

                        {/* Narrative Description */}
                        <p className="mt-3 text-xs sm:text-[13px] text-[#55524d] font-sans font-light leading-relaxed">
                            {description}
                        </p>

                        {/* 4 Amenity Line Items (2x2 Grid) */}
                        {amenities.length > 0 && (
                            <div className="mt-6 pt-5 border-t border-[#f2ede4] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-[#2e2c29]">
                                {amenities.map(function (amenity, idx) {
                                    return (
                                        <div key={idx} className="flex items-center gap-2.5">
                                            <span className="text-[#8e763b] shrink-0">
                                                {amenity.icon || (
                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                                        <circle cx="12" cy="12" r="9" />
                                                    </svg>
                                                )}
                                            </span>
                                            <span className="font-medium text-[11px]">{amenity.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="mt-8 pt-5 border-t border-[#f2ede4] flex flex-col sm:flex-row items-stretch justify-around sm:items-center gap-3">
                        <Link
                            href={`/checkout?suite=${slug}`}
                            onClick={onPrimaryAction}
                            className="inline-flex items-center justify-center px-6 py-3.5 bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-[11px] font-semibold uppercase tracking-[0.2em] rounded-lg transition-all duration-200 shadow-sm text-center"
                        >
                            <span>{primaryCtaLabel}</span>
                            <span className="ml-1.5">→</span>
                        </Link>
                        <Link
                            href={`/suites/${slug}`}
                            onClick={onSecondaryAction}
                            className="inline-flex items-center justify-center px-6 py-3.5 bg-[#f6f3ee] hover:bg-[#eeeae2] text-[#2c2a26] border border-[#ded9ce] font-sans text-[11px] font-medium uppercase tracking-[0.18em] rounded-lg transition-all duration-200 text-center"
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
            className={`w-full bg-white border border-[#e8e4dc] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between ${className}`}
        >
            <div>
                {/* Media Image with Badges, Feature Overlay & Embedded Price Tag */}
                <div className="relative aspect-16/10 sm:aspect-16/10.5 w-full bg-[#eeeae2] overflow-hidden">
                    <Image
                        src={heroImageUrl}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center transform transition-transform duration-700 hover:scale-105"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 z-10 flex flex-wrap items-center gap-1.5">
                        {badgeLabel && (
                            <span className="px-2.5 py-1 bg-[#8e763b]/90 backdrop-blur-md rounded-md text-[9px] font-sans font-semibold uppercase tracking-[0.18em] text-white shadow-xs">
                                {badgeLabel}
                            </span>
                        )}
                    </div>

                    {/* Bottom Overlay Row: Feature Indicator (Left) & Price Tag (Right) */}
                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between gap-2 text-white">
                        {featureOverlayText && (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-sans font-medium tracking-wide">
                                {featureOverlayIcon || (
                                    <svg className="w-3.5 h-3.5 text-[#bfa76f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M2 12h20M2 17h20M2 7h20" />
                                    </svg>
                                )}
                                <span>{featureOverlayText}</span>
                            </div>
                        )}

                        <div className="text-right bg-black/60 backdrop-blur-md px-3 py-1 rounded-md ml-auto">
                            <span className="font-serif text-lg font-normal leading-none block">
                                {currency}{pricePerNight.toLocaleString()}
                            </span>
                            <span className="text-[9px] font-sans text-white/80 block uppercase tracking-wider">
                                {pricePeriodSuffix} {minStayNotice ? `• ${minStayNotice}` : ''}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Details Body */}
                <div className="p-6">
                    <h4 className="font-serif text-2xl text-[#1f1e1d] font-normal tracking-tight">
                        {name}
                    </h4>

                    {specsText && (
                        <p className="mt-1.5 text-xs font-sans text-[#78756e] leading-snug">
                            {specsText}
                        </p>
                    )}

                    <p className="mt-3 text-xs text-[#55524d] font-sans font-light leading-relaxed">
                        {description}
                    </p>

                    {/* Pill Tags */}
                    {pillTags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                            {pillTags.map(function (tag, idx) {
                                return (
                                    <span
                                        key={idx}
                                        className="px-2.5 py-1 bg-[#f6f3ee] border border-[#e8e4dc] rounded-md text-[9px] font-sans font-semibold uppercase tracking-[0.16em] text-[#55524d]"
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
            <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3 border-t border-[#f2ede4] mt-2">
                <Link
                    href={`/checkout?suite=${slug}`}
                    onClick={onPrimaryAction}
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-[10px] font-semibold uppercase tracking-[0.2em] rounded-lg transition-all duration-200 shadow-sm text-center"
                >
                    <span>{primaryCtaLabel}</span>
                    <span className="ml-1">→</span>
                </Link>

                <Link
                    href={`/suites/${slug}`}
                    onClick={onSecondaryAction}
                    className="inline-flex items-center justify-center px-4 py-3 bg-[#f6f3ee] hover:bg-[#eeeae2] text-[#2c2a26] border border-[#ded9ce] font-sans text-[10px] font-medium uppercase tracking-[0.18em] rounded-lg transition-all duration-200 text-center"
                >
                    {secondaryCtaLabel}
                </Link>
            </div>
        </article>
    );
}