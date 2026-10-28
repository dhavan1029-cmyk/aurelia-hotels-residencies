'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export interface WayfindingPathwayItem {
    id: string;
    romanNumeral: string;
    title: string;
    description: string;
    actionLabel: string;
    actionHref: string;
    iconType: 'villas' | 'dossier' | 'charter';
}

export interface NotFoundPageData {
    nodeRegistryBadge: string;
    estatesOperationalPill: string;
    statusEyebrow: string;
    headlinePart1: string;
    headlinePart2: string;
    narrative: string;
    searchPlaceholder: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    directDispatchLabel: string;
    directDispatchPhoneDisplay: string;
    directDispatchPhoneTel: string;
    privateLineLabel: string;
    privateLineChannel: string;
    heroCard: {
        enclaveTag: string;
        quote: string;
        portfolioCaption: string;
        imageUrl: string;
        imageAlt: string;
    };
    wayfindingSectionTitle: string;
    wayfindingSectionSubtitle: string;
    curatedReserveBadge: string;
    pathways: WayfindingPathwayItem[];
    footerNotice: string;
    footerLinks: Array<{ label: string; href: string }>;
}

export const notFoundDefaultData: NotFoundPageData = {
    nodeRegistryBadge: 'AURELIA REGISTRY • NODE 404 • SANCTUARY CALIBRATION',
    estatesOperationalPill:
        'All Sanctuary Estates Operational • Positano • Cap d\'Antibes • St. Moritz • Kyoto',
    statusEyebrow: 'STATUS 404 • UNCHARTED HORIZON / TEMPORARY CALIBRATION',
    headlinePart1: 'A Moment of',
    headlinePart2: 'Unintended Stillness.',
    narrative:
        'The sanctuary or docket you seek has receded into unmapped waters, or is undergoing architectural calibration for the upcoming season. Allow our concierge to escort you back to active grounds.',
    searchPlaceholder: 'Search by Folio ID, destination, or suite name...',
    primaryCtaLabel: 'Return to Flagship Sanctuary',
    primaryCtaHref: '/',
    secondaryCtaLabel: 'Explore Available Suites',
    secondaryCtaHref: '/suites',
    directDispatchLabel: 'DIRECT DISPATCH:',
    directDispatchPhoneDisplay: '+39 089 875 111',
    directDispatchPhoneTel: '+39089875111',
    privateLineLabel: 'PRIVATE LINE:',
    privateLineChannel: 'channel.aur-ch7',
    heroCard: {
        enclaveTag: 'CAPRI • AMALFI TERRACES',
        quote: '“Even stillness is an intentional architecture.”',
        portfolioCaption: 'AURELIA ARCHITECTURAL PORTFOLIO • MCMXXIV',
        imageUrl: '/limestone-villa.png',
        imageAlt:
            'Ultra-luxury boutique hotel exterior overlooking the Mediterranean sea at golden hour, minimalist limestone architecture, infinity edge pool reflecting sunset',
    },
    wayfindingSectionTitle: 'NAVIGATION PATHWAYS',
    wayfindingSectionSubtitle: 'Curated Wayfinding',
    curatedReserveBadge: 'AURELIA PRIVATE RESERVE',
    pathways: [
        {
            id: 'suites-villas',
            romanNumeral: 'COLLECTION I',
            title: 'Suites & Private Villas',
            description:
                'Uncover cliffside residences, alpine sanctuaries, and historic waterside estates configured for absolute privacy.',
            actionLabel: 'Explore Sanctuaries',
            actionHref: '/accommodations',
            iconType: 'villas',
        },
        {
            id: 'patron-portal',
            romanNumeral: 'PATRON PORTAL',
            title: 'Sovereign Patron Dossier',
            description:
                'Access encrypted folios, personalized pillow & scent profiles, curated transfers, and bespoke itinerary history.',
            actionLabel: 'Enter Secure Dossier',
            actionHref: '/profile',
            iconType: 'dossier',
        },
        {
            id: 'experiences-riva',
            romanNumeral: 'EXPERIENCES',
            title: 'Gastronomy & Riva Charters',
            description:
                'Reserve Michelin-starred dining verandas, twilight wine tastings, and private vintage yacht voyages across coastal coves.',
            actionLabel: 'Request Reservations',
            actionHref: '/experiences',
            iconType: 'charter',
        },
    ],
    footerNotice: 'AURELIA HOTELS • SOVEREIGN HOSPITALITY GROUP © MMXXIV',
    footerLinks: [
        { label: 'CONCIERGE DESK', href: 'tel:+39089875111' },
        { label: 'ENCRYPTED PRIVACY', href: '/not-found' },
        { label: 'TERMS OF SANCTUARY', href: '/not-found' },
    ],
};

export interface NotFoundPageProps {
    data?: NotFoundPageData;
    className?: string;
}

export function NotFoundPage({
    data = notFoundDefaultData,
    className = '',
}: NotFoundPageProps) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const {
        nodeRegistryBadge,
        estatesOperationalPill,
        statusEyebrow,
        headlinePart1,
        headlinePart2,
        narrative,
        searchPlaceholder,
        primaryCtaLabel,
        primaryCtaHref,
        secondaryCtaLabel,
        secondaryCtaHref,
        directDispatchLabel,
        directDispatchPhoneDisplay,
        directDispatchPhoneTel,
        privateLineLabel,
        privateLineChannel,
        heroCard,
        wayfindingSectionTitle,
        wayfindingSectionSubtitle,
        curatedReserveBadge,
        pathways,
        footerNotice,
        footerLinks,
    } = data;

    function handleSearchSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        router.push(`/accommodations?query=${encodeURIComponent(searchQuery.trim())}`);
    }

    function renderPathwayIcon(type: WayfindingPathwayItem['iconType']) {
        switch (type) {
            case 'villas':
                return (
                    <svg
                        className="w-4 h-4 text-[#8e763b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 21h18M3 7v14M21 7v14M3 7l9-4 9 4M9 21V12h6v9" />
                    </svg>
                );
            case 'dossier':
                return (
                    <svg
                        className="w-4 h-4 text-[#8e763b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                    </svg>
                );
            case 'charter':
                return (
                    <svg
                        className="w-4 h-4 text-[#8e763b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="5" r="3" />
                        <path d="M12 8v13m-8-7l8 7 8-7" />
                    </svg>
                );
            default:
                return null;
        }
    }

    return (
        <main
            className={`min-h-screen w-full bg-[#fcf9f4] text-[#1f1e1d] flex flex-col justify-between font-sans selection:bg-[#8e763b]/20 selection:text-[#1f1e1d] ${className}`}
        >
            <div className="max-w-340 mx-auto w-full px-4 sm:px-8 lg:px-12 pt-8 sm:pt-10 lg:pt-12 pb-16 flex-1 flex flex-col justify-between space-y-12 lg:space-y-16">
                {/* ========================================================= */}
                {/* 1. TOP PROTOCOL & ESTATE STATUS PILL STRIP                */}
                {/* ========================================================= */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px] font-mono tracking-[0.16em] uppercase">
                    {/* Left Node Badge */}
                    <div className="inline-flex items-center gap-2 text-[#68655e]">
                        <span className="w-1.5 h-1.5 -full bg-[#24633b]" />
                        <span>{nodeRegistryBadge}</span>
                    </div>

                    {/* Right Operational Status Pill */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 -full bg-[#f4efe6] border border-[#e5dfd3] text-[#4d4a43] self-start sm:self-auto">
                        <span className="w-1.5 h-1.5 -full bg-[#24633b] animate-pulse" />
                        <span>{estatesOperationalPill}</span>
                    </div>
                </div>

                {/* ========================================================= */}
                {/* 2. MAIN 2-COLUMN SPLIT: NARRATIVE + HERO PHOTOGRAPHY     */}
                {/* ========================================================= */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Left Column: Monograph Narrative & Actions (7 cols) */}
                    <div className="lg:col-span-7 space-y-7">
                        <div className="space-y-3">
                            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.24em] text-[#8e763b] block">
                                {statusEyebrow}
                            </span>

                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] font-normal text-[#1f1e1d] tracking-tight leading-[1.06]">
                                <span className="block">{headlinePart1}</span>
                                <span className="block">{headlinePart2}</span>
                            </h1>

                            <p className="text-xs sm:text-[14px] text-[#55524b] font-sans font-light leading-relaxed max-w-xl pt-2">
                                {narrative}
                            </p>
                        </div>

                        {/* Search Input Bar */}
                        <form
                            onSubmit={handleSearchSubmit}
                            className="max-w-md w-full relative flex items-center bg-white border border-[#ded9ce] -xl p-1.5 shadow-2xs focus-within:border-[#8e763b] transition-colors"
                        >
                            <svg
                                className="w-4 h-4 text-[#8e763b] ml-3 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>

                            <input
                                type="text"
                                value={searchQuery}
                                onChange={function (e) {
                                    setSearchQuery(e.target.value);
                                }}
                                placeholder={searchPlaceholder}
                                className="w-full px-3 py-2 text-xs font-sans text-[#1f1e1d] bg-transparent outline-none placeholder-[#a4a098]"
                            />

                            <button
                                type="submit"
                                className="px-4 py-2 -lg bg-[#1f1e1d] hover:bg-[#343230] text-white text-[10px] font-sans font-semibold uppercase tracking-wider transition-colors shrink-0"
                            >
                                Locate
                            </button>
                        </form>

                        {/* Primary & Secondary Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3.5 pt-1">
                            <Link
                                href={primaryCtaHref}
                                className="inline-flex items-center gap-2 px-6 py-3.5 -xl bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-xs font-semibold uppercase tracking-[0.18em] transition-all shadow-md active:translate-y-0.5 group"
                            >
                                <span>{primaryCtaLabel}</span>
                                <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>

                            <Link
                                href={secondaryCtaHref}
                                className="inline-flex items-center justify-center px-5 py-3.5 -xl bg-[#f4efe6] hover:bg-[#eae4d8] text-[#1f1e1d] font-sans text-xs font-semibold uppercase tracking-[0.16em] transition-colors border border-[#ded9ce]"
                            >
                                <span>{secondaryCtaLabel}</span>
                            </Link>
                        </div>

                        {/* Direct Dispatch & Private Line Contact Ticker */}
                        <div className="flex flex-wrap items-center gap-6 pt-2 text-[10px] font-sans text-[#6e6b64]">
                            <div className="flex items-center gap-2">
                                <span className="text-[#8e763b]">⌂</span>
                                <span className="font-semibold uppercase tracking-wider text-[#78756d]">
                                    {directDispatchLabel}
                                </span>
                                <a
                                    href={`tel:${directDispatchPhoneTel}`}
                                    className="font-mono text-[#1f1e1d] underline hover:text-[#8e763b] transition-colors"
                                >
                                    {directDispatchPhoneDisplay}
                                </a>
                            </div>

                            <span className="text-[#ded9ce]">•</span>

                            <div className="flex items-center gap-2">
                                <span className="text-[#8e763b]">🛡</span>
                                <span className="font-semibold uppercase tracking-wider text-[#78756d]">
                                    {privateLineLabel}
                                </span>
                                <span className="font-mono text-[#1f1e1d]">
                                    {privateLineChannel}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Hero Photographic Card (5 cols) */}
                    <div className="lg:col-span-5">
                        <article className="relative w-full aspect-4/5 sm:aspect-3/4 lg:aspect-4/5 -3xl overflow-hidden shadow-2xl border border-[#ded9ce] bg-[#191817] group">
                            <Image
                                src={heroCard.imageUrl}
                                alt={heroCard.imageAlt}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 42vw"
                                className="object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105"
                            />

                            {/* Contrast Gradients & Atmospheric Vignette */}
                            <div className="absolute inset-0 bg-black/30" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-black/20 pointer-events-none" />

                            {/* Top Right Enclave Badge */}
                            <div className="absolute top-4 right-4 z-10">
                                <span className="px-3 py-1 -sm bg-black/60 backdrop-blur-md text-white font-sans text-[9px] font-semibold uppercase tracking-[0.22em] shadow-sm">
                                    {heroCard.enclaveTag}
                                </span>
                            </div>

                            {/* Bottom Monograph Quote & Architectural Signature */}
                            <div className="absolute bottom-6 left-6 right-6 z-10 text-white space-y-3">
                                <blockquote className="font-serif italic text-lg sm:text-xl font-light text-white/95 leading-snug">
                                    {heroCard.quote}
                                </blockquote>

                                <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-[#dcdad5] uppercase pt-2 border-t border-white/20">
                                    <span>{heroCard.portfolioCaption}</span>
                                    <span className="text-white text-xs">✦</span>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>

                {/* ========================================================= */}
                {/* 3. BOTTOM WAYFINDING PATHWAYS 3-COLUMN CARDS              */}
                {/* ========================================================= */}
                <div className="space-y-5 pt-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#eeeae2] text-[10px] font-sans">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold uppercase tracking-[0.22em] text-[#8e763b]">
                                {wayfindingSectionTitle}
                            </span>
                            <span className="text-[#ded9ce]">•</span>
                            <span className="text-[#78756d] font-light">
                                {wayfindingSectionSubtitle}
                            </span>
                        </div>

                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#8e8a82]">
                            {curatedReserveBadge}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {pathways.map(function (item) {
                            return (
                                <article
                                    key={item.id}
                                    className="p-6 sm:p-7 -2xl bg-white border border-[#ded9ce] shadow-2xs hover:border-[#8e763b]/60 transition-colors flex flex-col justify-between space-y-6"
                                >
                                    <div className="space-y-2.5">
                                        <div className="p-2.5 -xl bg-[#fcf9f4] border border-[#ded9ce] w-fit shadow-2xs">
                                            {renderPathwayIcon(item.iconType)}
                                        </div>

                                        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8e763b] font-semibold block pt-1">
                                            {item.romanNumeral}
                                        </span>

                                        <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1f1e1d] tracking-tight">
                                            {item.title}
                                        </h3>

                                        <p className="text-xs text-[#636058] font-sans font-light leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="pt-3 border-t border-[#eeeae2]">
                                        <Link
                                            href={item.actionHref}
                                            className="group inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#1f1e1d] hover:text-[#8e763b] transition-colors"
                                        >
                                            <span>{item.actionLabel}</span>
                                            <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                                                →
                                            </span>
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ============================================================= */}
            {/* 4. FOOTER MONOGRAPH DISCLOSURE STRIP                          */}
            {/* ============================================================= */}
            <footer className="w-full bg-[#fcf9f4] border-t border-[#e8e4dc] py-6 px-4 sm:px-8 lg:px-12 text-[10px] font-sans text-[#78756d]">
                <div className="max-w-340 mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                    <span className="tracking-widest uppercase">
                        {footerNotice}
                    </span>

                    <div className="flex items-center gap-6 uppercase tracking-wider text-[9px] text-[#55524d]">
                        {footerLinks.map(function (link, idx) {
                            return (
                                <Link
                                    key={idx}
                                    href={link.href}
                                    className="hover:text-[#1f1e1d] transition-colors"
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </footer>
        </main>
    );
}

export default NotFoundPage;