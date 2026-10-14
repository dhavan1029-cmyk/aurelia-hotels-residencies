
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/Button';

export interface SuiteFeatureItem {
    icon?: React.ReactNode;
    label: string;
}

export interface SuiteCardProps {
    id: string;
    slug: string;
    name: string;
    category: string;
    badgeVariant?: 'gold' | 'dark' | 'neutral';
    sanctuaryNumber?: string;
    elevationTag?: string;
    metaEyebrow?: string;
    highlightTag?: string;
    tagline: string;
    squareMeters?: number;
    squareFeet?: number;
    maxOccupancy?: number;
    bedDetails?: string;
    basePriceNightly: number;
    minNights?: number;
    currency?: string;
    heroImageUrl: string;
    photoCount?: number;
    privilegeText?: string;
    amenityTags?: string[];
    features?: SuiteFeatureItem[];
    viewAllHref?: string;
    variant?: 'featured' | 'compact-horizontal' | 'standard';
    className?: string;
}

export function SuiteCard({
    slug,
    name,
    category,
    badgeVariant = 'dark',
    sanctuaryNumber,
    elevationTag,
    metaEyebrow,
    highlightTag,
    tagline,
    squareMeters,
    squareFeet,
    maxOccupancy,
    bedDetails,
    basePriceNightly,
    minNights,
    currency = 'USD',
    heroImageUrl,
    photoCount,
    privilegeText,
    amenityTags = [],
    features = [],
    variant = 'standard',
    className = '',
}: SuiteCardProps) {
    const currencySymbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : currency;

    // -------------------------------------------------------------
    // VARIANT 1: COMPACT HORIZONTAL CARD (Right Bento Column)
    // -------------------------------------------------------------
    if (variant === 'compact-horizontal') {
        return (
            <div
                className={`bg-white border border-[#e8e4dc] rounded-2xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(31,30,29,0.06)] transition-all duration-300 flex flex-col sm:flex-row gap-5 ${className}`}
            >
                {/* Thumbnail Media */}
                <div className="relative w-full sm:w-44 h-44 sm:h-auto rounded-xl overflow-hidden shrink-0 bg-[#eeeae2]">
                    <Image
                        src={heroImageUrl}
                        alt={name}
                        fill
                        sizes="(max-width: 640px) 100vw, 176px"
                        className="object-cover object-center hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 z-10">
                        <span
                            className={`px-2.5 py-0.5 rounded-sm font-sans text-[9px] font-semibold uppercase tracking-wider ${
                                badgeVariant === 'gold'
                                    ? 'bg-[#8e763b] text-white'
                                    : 'bg-black/60 backdrop-blur-md text-white'
                            }`}
                        >
                            {category}
                        </span>
                    </div>
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between flex-1">
                    <div>
                        <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif text-xl text-[#1f1e1d] font-normal tracking-tight">
                                {name}
                            </h4>
                            <div className="text-right shrink-0">
                                <span className="font-serif text-base font-bold text-[#1f1e1d]">
                                    {currencySymbol}{basePriceNightly.toLocaleString()}
                                </span>
                                <span className="text-[10px] text-[#78756d] font-sans block leading-none">
                                    /nt
                                </span>
                            </div>
                        </div>

                        {(metaEyebrow || (squareMeters && bedDetails)) && (
                            <span className="block text-[10px] uppercase tracking-wider text-[#8e763b] font-medium mt-1">
                                {metaEyebrow || `${squareMeters} M² • ${bedDetails}`}
                            </span>
                        )}

                        <p className="mt-2 text-xs text-[#6e6b64] font-sans font-light leading-relaxed line-clamp-2">
                            {tagline}
                        </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#f4f0e6] flex items-center justify-between text-[11px] font-sans">
                        <span className="text-[#78756d]">{privilegeText || 'Private Butler Included'}</span>
                        <Link
                            href={`/checkout?suite=${slug}`}
                            className="group inline-flex items-center gap-1 font-semibold uppercase tracking-[0.2em] text-[#8e763b] hover:text-[#1f1e1d] transition-colors"
                        >
                            <span>RESERVE</span>
                            <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // -------------------------------------------------------------
    // VARIANT 2: FEATURED HERO BENTO CARD (Left Bento Column)
    // -------------------------------------------------------------
    if (variant === 'featured') {
        return (
            <div
                className={`bg-white border border-[#e8e4dc] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(31,30,29,0.06)] transition-all duration-500 flex flex-col ${className}`}
            >
                {/* Image Media with Badges & Floating Price Tag */}
                <div className="relative aspect-16/11 sm:aspect-16/10 w-full overflow-hidden bg-[#eeeae2]">
                    <Image
                        src={heroImageUrl}
                        alt={name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-center transform transition-transform duration-700 ease-out hover:scale-105"
                    />

                    {/* Top Left Badges */}
                    <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
                        {sanctuaryNumber && (
                            <span className="inline-block px-3 py-1.5 rounded-sm bg-white/95 backdrop-blur-md text-[#1f1e1d] font-sans text-[10px] font-semibold uppercase tracking-[0.22em] shadow-sm">
                                {sanctuaryNumber}
                            </span>
                        )}
                        <span className="inline-block px-3 py-1.5 rounded-sm bg-black/60 backdrop-blur-md text-white font-sans text-[10px] font-semibold uppercase tracking-[0.22em]">
                            {category}
                        </span>
                        {elevationTag && (
                            <span className="inline-block px-3 py-1.5 rounded-sm bg-white/80 backdrop-blur-md text-[#2a2825] font-sans text-[10px] font-semibold uppercase tracking-[0.22em]">
                                {elevationTag}
                            </span>
                        )}
                    </div>

                    {/* Floating Bottom Right Price Tag */}
                    <div className="absolute bottom-4 right-4 z-10 bg-white/95 backdrop-blur-md px-4 py-2 rounded-sm shadow-md border border-[#e8e4dc]/80 text-right">
                        <span className="text-[10px] font-sans text-[#78756d] uppercase tracking-wider block">
                            From
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="font-serif text-lg sm:text-xl font-bold text-[#1f1e1d] leading-none">
                                {currencySymbol}{basePriceNightly.toLocaleString()}
                            </span>
                            <span className="text-[11px] font-sans text-[#78756d]">
                                / night
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                    <div>
                        {/* Meta Eyebrows Strip */}
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-sans text-[#78756d] uppercase tracking-wider mb-2.5">
                            <span className="font-medium text-[#8e763b]">
                                {metaEyebrow || `${squareMeters || 125} M² • ${bedDetails || 'CLIFF EDGE PAVILION'}`}
                            </span>
                            {highlightTag && (
                                <span className="flex items-center gap-1.5 text-[#55524d]">
                                    <svg
                                        className="w-3.5 h-3.5 text-[#8e763b]"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M2 12h20M2 17h20M2 7h20" />
                                    </svg>
                                    {highlightTag}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-2xl sm:text-3xl text-[#1f1e1d] font-normal tracking-tight">
                            {name}
                        </h3>

                        {/* Body Description */}
                        <p className="mt-3 text-xs sm:text-[13px] text-[#6e6b64] font-sans font-light leading-relaxed">
                            {tagline}
                        </p>

                        {/* Feature Pills / Amenities */}
                        {(features.length > 0 || amenityTags.length > 0) && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-[#f0ece3] text-[11px] font-sans text-[#4a4742]">
                                {features.length > 0 ? (
                                    features.map((feat, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            {feat.icon || (
                                                <svg className="w-4 h-4 text-[#8e763b] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                    <circle cx="12" cy="12" r="9" />
                                                </svg>
                                            )}
                                            <span>{feat.label}</span>
                                        </div>
                                    ))
                                ) : (
                                    amenityTags.map((tag, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b] shrink-0" />
                                            <span>{tag.replace(/_/g, ' ')}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    {/* Actions Footer */}
                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#f0ece3]">
                        <Link
                            href={`/suites/${slug}`}
                            className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#8e763b] hover:text-[#1f1e1d] transition-colors"
                        >
                            FLOORPLAN & DETAILS
                        </Link>

                        <Link href={`/checkout?suite=${slug}`}>
                            <Button
                                variant="primary"
                                size="md"
                                className="bg-[#1f1e1d] text-white hover:bg-[#353330] px-6 py-3 text-[11px] tracking-[0.2em] font-semibold uppercase rounded-sm transition-all"
                            >
                                RESERVE SUITE
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // -------------------------------------------------------------
    // VARIANT 3: STANDARD VERTICAL GRID CARD (Catalog & Grids)
    // -------------------------------------------------------------
    return (
        <article
            className={`group bg-white border border-[#e8e4dc] transition-all duration-300 hover:shadow-xl rounded-2xl overflow-hidden flex flex-col ${className}`}
        >
            <div className="relative aspect-16/10 overflow-hidden bg-[#eeeae2]">
                <Image
                    src={heroImageUrl}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute top-4 left-4 flex gap-2 z-10">
                    <span className="px-2.5 py-1 bg-[#8e763b] text-white font-sans text-[10px] tracking-[0.2em] uppercase font-semibold rounded-sm shadow-sm">
                        {category}
                    </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-sans drop-shadow-md z-10">
                    <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-sm text-[10px] uppercase tracking-wider">
                        {highlightTag || (squareMeters ? `${squareMeters} m²` : 'Private Sanctuary')}
                    </span>

                    <div className="text-right bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-sm">
                        <span className="font-serif text-base font-medium text-white">
                            {currencySymbol}{basePriceNightly.toLocaleString()}
                        </span>
                        <span className="text-[9px] text-white/80 block uppercase tracking-wider">
                            / night {minNights ? `• ${minNights}nt min` : ''}
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-7 flex flex-col flex-1 justify-between gap-5">
                <div>
                    <h3 className="font-serif text-2xl text-[#1f1e1d] font-normal tracking-tight group-hover:text-[#8e763b] transition-colors">
                        {name}
                    </h3>
                    <p className="text-xs text-[#6e6b64] font-sans mt-2 leading-relaxed">
                        {tagline}
                    </p>

                    {amenityTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                            {amenityTags.slice(0, 3).map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-0.5 bg-[#f6f3ee] border border-[#e8e4dc] text-[9px] uppercase tracking-widest text-[#6e6b64] font-medium rounded-sm"
                                >
                                    {tag.replace(/_/g, ' ')}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="pt-4 border-t border-[#f0ece3] flex items-center justify-between">
                    <Link
                        href={`/suites/${slug}`}
                        className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b] hover:text-[#1f1e1d] transition-colors"
                    >
                        DETAILS
                    </Link>
                    <Link href={`/checkout?suite=${slug}`}>
                        <Button variant="primary" size="sm" className="bg-[#1f1e1d] text-white hover:bg-[#353330] px-4 py-2 text-[10px] tracking-[0.2em] font-semibold uppercase rounded-sm">
                            RESERVE
                        </Button>
                    </Link>
                </div>
            </div>
        </article>
    );
}