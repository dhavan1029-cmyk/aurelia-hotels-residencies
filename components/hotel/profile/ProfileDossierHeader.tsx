'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type ProfileNavTabId = 'sensory-calibration' | 'upcoming-stays' | 'cellar-allocations' | 'security-access';

export interface ProfileNavTab {
    id: ProfileNavTabId;
    label: string;
    count?: number;
    badge?: string;
}

export interface MajordomoHostInfo {
    name: string;
    title: string;
    statusText: string;
    locationText: string;
    phoneDisplay: string;
    phoneTel: string;
    avatarUrl: string;
    avatarAlt: string;
}

export interface PatronDossierInfo {
    honorific: string;
    fullName: string;
    folioNumber: string;
    membershipTier: string;
    tierBadge: string;
    provenanceNotice: string;
    avatarUrl: string;
    avatarAlt: string;
    majordomo: MajordomoHostInfo;
    tabs: ProfileNavTab[];
    activeTabId: ProfileNavTabId;
}

export const profileDossierDefaultData: PatronDossierInfo = {
    honorific: 'Lady',
    fullName: 'Lady Katherine V. Beaumont',
    folioNumber: 'AUR-8911-S',
    membershipTier: 'SOVEREIGN PATRON • TIER I',
    tierBadge: 'Tier I Sovereign Fellow',
    provenanceNotice:
        'Active Member since May 2021 • 14 Global Sanctuary Residencies • Swiss Data Confidentiality Protocol Level IV',
    avatarUrl: '/garden-pavillion.png',
    avatarAlt: 'Verified Sovereign Patron Lady Katherine V. Beaumont',
    majordomo: {
        name: 'Matteo Bellini',
        title: 'Senior Majordomo & Sommelier',
        statusText: 'Private Line Active',
        locationText: 'Positano Cliffside Estate',
        phoneDisplay: '+39 089 875 111',
        phoneTel: '+39089875111',
        avatarUrl: '/limestone-villa.png',
        avatarAlt: 'Portrait of assigned Senior Majordomo Matteo Bellini',
    },
    tabs: [
        {
            id: 'sensory-calibration',
            label: 'Sensory & Room Calibration',
        },
        {
            id: 'upcoming-stays',
            label: 'Upcoming Stays & Itineraries',
            count: 1,
            badge: 'CONFIRMED',
        },
        {
            id: 'cellar-allocations',
            label: 'Private Cellar Allocations',
            count: 6,
        },
        {
            id: 'security-access',
            label: 'Confidential Access & Security',
        },
    ],
    activeTabId: 'sensory-calibration',
};

export interface ProfileDossierHeaderProps {
    data?: PatronDossierInfo;
    className?: string;
    onTabChange?: (tabId: ProfileNavTabId) => void;
    onContactMajordomo?: () => void;
}

export function ProfileDossierHeader({
    data = profileDossierDefaultData,
    className = '',
    onTabChange,
    onContactMajordomo,
}: ProfileDossierHeaderProps) {
    const {
        fullName,
        folioNumber,
        membershipTier,
        tierBadge,
        provenanceNotice,
        avatarUrl,
        avatarAlt,
        majordomo,
        tabs,
        activeTabId,
    } = data;

    const [currentTab, setCurrentTab] = useState<ProfileNavTabId>(activeTabId);

    function handleTabClick(tabId: ProfileNavTabId) {
        setCurrentTab(tabId);
        if (onTabChange) {
            onTabChange(tabId);
        }
    }

    return (
        <header className={`w-full bg-[#fcf9f4] border-b border-[#e8e4dc] ${className}`}>
            {/* ------------------------------------------------------------- */}
            {/* 1. TOP PROTOCOL GLOBAL NAVIGATION BAR                         */}
            {/* ------------------------------------------------------------- */}
            <div className="w-full bg-[#fcf9f4] border-b border-[#eeeae2]">
                <div className="max-w-360 mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-6">
                    {/* Brand Wordmark & Monogram Lockup */}
                    <Link href="/" className="flex flex-col group shrink-0">
                        <Image src='/aurelia-logo-light.png' alt='aurelia logo' width={240} height={90}></Image>
                    </Link>

                    {/* Desktop Enclave Navigation Links */}
                    <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-xs font-sans tracking-[0.18em] uppercase text-[#636059]">
                        <Link href="/accommodations" className="hover:text-[#1f1e1d] transition-colors">
                            Sanctuaries
                        </Link>
                        <Link href="/experiences" className="hover:text-[#1f1e1d] transition-colors">
                            Experiences
                        </Link>
                        <Link href="/heritage" className="hover:text-[#1f1e1d] transition-colors">
                            Heritage
                        </Link>
                        <Link href="/register" className="hover:text-[#1f1e1d] transition-colors">
                            Sovereign Circle
                        </Link>
                        <a href={`tel:${majordomo.phoneTel}`} className="text-[#8e763b] hover:text-[#1f1e1d] transition-colors">
                            Concierge
                        </a>
                    </nav>

                    {/* Patron Verified Status Capsule Pill */}
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="hidden sm:flex flex-col text-right">
                            <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#8e763b] font-semibold leading-none">
                                {membershipTier}
                            </span>
                            <span className="text-[10px] font-mono text-[#8e8a82] tracking-wider mt-1 leading-none">
                                Folio #{folioNumber}
                            </span>
                        </div>

                        <div className="relative w-10 h-10 -full overflow-hidden border border-[#bfa76f] bg-[#f6f2ea] shadow-xs shrink-0">
                            <Image
                                src={avatarUrl}
                                alt={avatarAlt}
                                fill
                                sizes="40px"
                                className="object-cover object-center"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* 2. MASTER PATRON DOSSIER & MAJORDOMO HOST SECTION             */}
            {/* ------------------------------------------------------------- */}
            <div className="max-w-360 mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-10 pb-6">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#eeeae2]">
                    {/* Left: Patron Identity & Monograph Credentials */}
                    <div className="space-y-3 max-w-2xl">
                        {/* Eyebrow Protocol Badges */}
                        <div className="flex flex-wrap items-center gap-2.5">
                            <span className="inline-flex items-center gap-2 px-3 py-1 -sm bg-[#f6f2ea] border border-[#ded9ce] text-[9px] font-mono uppercase tracking-[0.22em] text-[#6d6961]">
                                <span className="w-1.5 h-1.5 -full bg-[#8e763b]" />
                                <span>SOVEREIGN PATRON DOSSIER • FOLIO #{folioNumber}</span>
                            </span>

                            <span className="px-2.5 py-1 -sm bg-[#8e763b] text-white font-sans text-[9px] font-semibold uppercase tracking-[0.18em] shadow-2xs">
                                {tierBadge}
                            </span>
                        </div>

                        {/* Patron Master Serif Headline */}
                        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#1f1e1d] tracking-tight leading-[1.08]">
                            {fullName}
                        </h1>

                        {/* Provenance Subtitle */}
                        <p className="text-xs sm:text-[13px] text-[#68655e] font-sans font-light leading-relaxed">
                            {provenanceNotice}
                        </p>
                    </div>

                    {/* Right: Assigned Personal Majordomo Host Card */}
                    <div className="w-full lg:w-auto bg-white border border-[#ded9ce] -2xl p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                        <div className="flex items-center gap-3.5">
                            {/* Majordomo Avatar */}
                            <div className="relative w-12 h-12 -full overflow-hidden border border-[#ded9ce] bg-[#f6f2ea] shadow-2xs shrink-0">
                                <Image
                                    src={majordomo.avatarUrl}
                                    alt={majordomo.avatarAlt}
                                    fill
                                    sizes="48px"
                                    className="object-cover object-center"
                                />
                            </div>

                            <div className="space-y-0.5 min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 -full bg-emerald-500 animate-pulse" />
                                    <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#24633b] font-medium">
                                        {majordomo.statusText}
                                    </span>
                                </div>
                                <h3 className="font-serif text-base font-semibold text-[#1f1e1d] tracking-tight leading-tight">
                                    {majordomo.name}
                                </h3>
                                <p className="text-[11px] text-[#78756d] font-sans font-light leading-tight">
                                    {majordomo.title} • {majordomo.locationText}
                                </p>
                            </div>
                        </div>

                        {/* Quick Contact Hotline & Dispatch Button */}
                        <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#eeeae2]">
                            <a
                                href={`tel:${majordomo.phoneTel}`}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 -xl bg-[#f6f2ea] hover:bg-[#eeeae2] border border-[#ded9ce] text-[10px] font-sans font-semibold uppercase tracking-[0.16em] text-[#1f1e1d] transition-colors shadow-2xs"
                                aria-label="Direct Telephone Line"
                            >
                                <svg
                                    className="w-3.5 h-3.5 text-[#8e763b]"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <span>{majordomo.phoneDisplay}</span>
                            </a>

                            <button
                                type="button"
                                onClick={onContactMajordomo}
                                className="inline-flex items-center justify-center px-4 py-2.5 -xl bg-[#1f1e1d] hover:bg-[#343230] text-white text-[10px] font-sans font-semibold uppercase tracking-[0.18em] transition-colors shadow-2xs"
                            >
                                DISPATCH
                            </button>
                        </div>
                    </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* 3. SEGMENTED FUNCTIONAL NAVIGATION TABS                       */}
                {/* ------------------------------------------------------------- */}
                <div className="pt-6 flex items-center gap-2 overflow-x-auto no-scrollbar">
                    {tabs.map(function (tab) {
                        const isActive = currentTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={function () {
                                    handleTabClick(tab.id);
                                }}
                                className={`px-4 sm:px-5 py-2.5 -xl font-sans text-xs font-semibold uppercase tracking-[0.16em] transition-all whitespace-nowrap shadow-2xs flex items-center gap-2 ${
                                    isActive
                                        ? 'bg-[#1f1e1d] text-white shadow-sm'
                                        : 'bg-white hover:bg-[#faf8f5] text-[#4d4a45] border border-[#ded9ce]'
                                }`}
                            >
                                <span>{tab.label}</span>
                                {tab.badge && (
                                    <span
                                        className={`px-1.5 py-0.5 -xs text-[9px] font-mono tracking-wider ${
                                            isActive
                                                ? 'bg-[#8e763b] text-white'
                                                : 'bg-[#f6f2ea] text-[#8e763b]'
                                        }`}
                                    >
                                        {tab.badge}
                                    </span>
                                )}
                                {tab.count !== undefined && !tab.badge && (
                                    <span
                                        className={`font-mono text-[10px] ${
                                            isActive ? 'text-white/70' : 'text-[#8e8a82]'
                                        }`}
                                    >
                                        ({tab.count})
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </header>
    );
}