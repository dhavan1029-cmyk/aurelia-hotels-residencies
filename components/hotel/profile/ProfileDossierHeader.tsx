'use client';

import { useState } from 'react';
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
    fullName: string;
    folioNumber: string;
    membershipTier: string;
    tierBadge: string;
    provenanceNotice: string;
    avatarUrl: string;
    avatarAlt?: string;
    majordomo: MajordomoHostInfo;
    passport?: {
        nationality?: string;
        issuingCountry?: string;
        passportNumberMasked?: string;
    };
}

export const profileDossierDefaultData: PatronDossierInfo = {
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
    }
};

export interface MajordomoTierConfig {
    badgePillText: string;
    badgePillClass: string;
    indicatorDotClass: string;
    hostName: string;
    hostRole: string;
    locationNote: string;
    phoneDisplay: string;
    phoneTel: string;
    avatarUrl: string;
    avatarAlt: string;
    actionLabel: string;
    containerClass: string;
    nameClass: string;
    textMutedClass: string;
    buttonClass: string;
    callButtonClass: string;
}

export function getMajordomoTierConfig(
    tier: 'EXPLORER' | 'SOVEREIGN_KEY' | 'IMPERIAL_HONORARY' | string,
    majordomoData?: {
        name?: string;
        title?: string;
        locationText?: string;
        phoneDisplay?: string;
        phoneTel?: string;
        avatarUrl?: string;
    }
): MajordomoTierConfig {
    const normalized = (tier || 'SOVEREIGN_KEY').toUpperCase();

    // -------------------------------------------------------------------------
    // TIER 0: IMPERIAL HONORARY (Diplomatic VIP / Sovereign Fellow)
    // -------------------------------------------------------------------------
    if (normalized.includes('IMPERIAL')) {
        return {
            badgePillText: 'GLOBAL CIP LINE 24/7 ACTIVE',
            badgePillClass: 'bg-black/60 border border-[#bfa76f]/40 text-[#bfa76f]',
            indicatorDotClass: 'bg-[#bfa76f] animate-ping',
            hostName: majordomoData?.name || 'Roberto Castiglione',
            hostRole: majordomoData?.title || 'Chief Executive Intendant & Master Sommelier',
            locationNote: majordomoData?.locationText || 'Direct Sovereign Diplomatic Channel',
            phoneDisplay: majordomoData?.phoneDisplay || '+39 089 875 999',
            phoneTel: majordomoData?.phoneTel || '+39089875999',
            avatarUrl: majordomoData?.avatarUrl || '/limestone-villa.png',
            avatarAlt: 'Portrait of Chief Intendant Roberto Castiglione',
            actionLabel: 'SIGNAL ATTACHE',
            containerClass: 'bg-[#191817] text-white border border-[#3e3a34] shadow-xl',
            nameClass: 'text-white font-normal',
            textMutedClass: 'text-[#a4a098]',
            buttonClass: 'bg-[#bfa76f] hover:bg-[#a89056] text-[#191817]',
            callButtonClass: 'bg-white/10 hover:bg-white/15 border-white/20 text-white',
        };
    }

    // -------------------------------------------------------------------------
    // TIER III: RESIDENT PATRON • EXPLORER TIER (Shared Concierge Desk)
    // -------------------------------------------------------------------------
    if (normalized.includes('EXPLORER')) {
        return {
            badgePillText: 'DESK RELAY • STANDING BY',
            badgePillClass: 'bg-[#f4efe6] border border-[#ded9ce] text-[#78756d]',
            indicatorDotClass: 'bg-amber-500',
            hostName: 'Positano Concierge Desk',
            hostRole: 'Central Resident Guest Liaison',
            locationNote: 'Main Colonnade Portico',
            phoneDisplay: '+39 089 875 000',
            phoneTel: '+39089875000',
            avatarUrl: '/garden-pavillion.png',
            avatarAlt: 'Aurelia Concierge Desk Insignia',
            actionLabel: 'INQUIRE DESK',
            containerClass: 'bg-[#fcfaf7] text-[#1f1e1d] border border-[#e2ddd3] shadow-2xs',
            nameClass: 'text-[#1f1e1d] font-normal',
            textMutedClass: 'text-[#78756d]',
            buttonClass: 'bg-[#3b3834] hover:bg-[#1f1e1d] text-white',
            callButtonClass: 'bg-white hover:bg-[#f6f2ea] border-[#ded9ce] text-[#1f1e1d]',
        };
    }

    // -------------------------------------------------------------------------
    // TIER I: SOVEREIGN KEY (Default Flagship Experience with Personal Majordomo)
    // -------------------------------------------------------------------------
    return {
        badgePillText: 'PRIVATE LINE ACTIVE',
        badgePillClass: 'bg-[#f6f2ea] border border-[#ded9ce] text-[#24633b]',
        indicatorDotClass: 'bg-emerald-500 animate-pulse',
        hostName: majordomoData?.name || 'Matteo Bellini',
        hostRole: majordomoData?.title || 'Senior Majordomo & Sommelier',
        locationNote: majordomoData?.locationText || 'Positano Cliffside Estate',
        phoneDisplay: majordomoData?.phoneDisplay || '+39 089 875 111',
        phoneTel: majordomoData?.phoneTel || '+39089875111',
        avatarUrl: majordomoData?.avatarUrl || '/limestone-villa.png',
        avatarAlt: `Portrait of Senior Majordomo ${majordomoData?.name || 'Matteo Bellini'}`,
        actionLabel: 'DISPATCH',
        containerClass: 'bg-white text-[#1f1e1d] border border-[#ded9ce] shadow-2xs',
        nameClass: 'text-[#1f1e1d] font-semibold',
        textMutedClass: 'text-[#78756d]',
        buttonClass: 'bg-[#1f1e1d] hover:bg-[#343230] text-white',
        callButtonClass: 'bg-[#f6f2ea] hover:bg-[#eeeae2] border-[#ded9ce] text-[#1f1e1d]',
    };
}

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
    } = data;

    const tabs : ProfileNavTab[] = [
        {
            id: 'sensory-calibration',
            label: 'Sensory & Room Calibration',
        },
        {
            id: 'upcoming-stays',
            label: 'Upcoming Stays & Itineraries',
        },
        {
            id: 'cellar-allocations',
            label: 'Private Cellar Allocations',
        },
        {
            id: 'security-access',
            label: 'Confidential Access & Security',
        },
    ]

    const [currentTab, setCurrentTab] = useState<ProfileNavTabId>('sensory-calibration');

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

                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#bfa76f] bg-[#f6f2ea] shadow-xs shrink-0">
                            <Image
                                src={avatarUrl}
                                alt={avatarAlt || ''}
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
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#f6f2ea] border border-[#ded9ce] text-[9px] font-mono uppercase tracking-[0.22em] text-[#6d6961]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b]" />
                                <span>SOVEREIGN PATRON DOSSIER • FOLIO #{folioNumber}</span>
                            </span>

                            <span className="px-2.5 py-1 bg-[#8e763b] text-white font-sans text-[9px] font-semibold uppercase tracking-[0.18em] shadow-2xs">
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

                    {/* Right: Assigned Personal Majordomo Host Card (Tier-Aware) */}
                    {(() => {
                        const tierConfig = getMajordomoTierConfig(membershipTier, majordomo);
                    
                        return (
                            <div
                                className={`w-full lg:w-auto p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 transition-colors ${tierConfig.containerClass}`}
                            >
                                <div className="flex items-center gap-3.5">
                                    {/* Majordomo Avatar with Tier Border */}
                                    <div className="relative w-12 h-12 overflow-hidden border border-[#bfa76f]/50 bg-[#f6f2ea] shadow-2xs shrink-0">
                                        <Image
                                            src={tierConfig.avatarUrl}
                                            alt={tierConfig.avatarAlt}
                                            fill
                                            sizes="48px"
                                            className="object-cover object-center"
                                        />
                                    </div>
                        
                                    <div className="space-y-0.5 min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <span className={`w-1.5 h-1.5 rounded-full ${tierConfig.indicatorDotClass}`} />
                                            <span className="text-[9px] font-mono uppercase tracking-[0.18em] font-medium">
                                                {tierConfig.badgePillText}
                                            </span>
                                        </div>
                        
                                        <h3 className={`font-serif text-base tracking-tight leading-tight ${tierConfig.nameClass}`}>
                                            {tierConfig.hostName}
                                        </h3>
                        
                                        <p className={`text-[11px] font-sans font-light leading-tight ${tierConfig.textMutedClass}`}>
                                            • {tierConfig.hostRole} <br></br> • {tierConfig.locationNote}
                                        </p>
                                    </div>
                                </div>
                        
                                {/* Quick Contact Hotline & Dispatch Button */}
                                <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-current/10">
                                    <a
                                        href={`tel:${tierConfig.phoneTel}`}
                                        className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 border text-[10px] font-sans font-semibold uppercase tracking-[0.16em] transition-colors shadow-2xs ${tierConfig.callButtonClass}`}
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
                                        <span>{tierConfig.phoneDisplay}</span>
                                    </a>
                        
                                    <button
                                        type="button"
                                        onClick={onContactMajordomo}
                                        className={`inline-flex items-center justify-center px-4 py-2.5 text-[10px] font-sans font-semibold uppercase tracking-[0.18em] transition-colors shadow-2xs ${tierConfig.buttonClass}`}
                                    >
                                        {tierConfig.actionLabel}
                                    </button>
                                </div>
                            </div>
                        );
                    })()}

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
                                className={`px-4 sm:px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] transition-all whitespace-nowrap shadow-2xs flex items-center gap-2 ${
                                    isActive
                                        ? 'bg-[#1f1e1d] text-white shadow-sm'
                                        : 'bg-white hover:bg-[#faf8f5] text-[#4d4a45] border border-[#ded9ce]'
                                }`}
                            >
                                <span>{tab.label}</span>
                                {tab.badge && (
                                    <span
                                        className={`px-1.5 py-0.5 rounded-xs text-[9px] font-mono tracking-wider ${
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