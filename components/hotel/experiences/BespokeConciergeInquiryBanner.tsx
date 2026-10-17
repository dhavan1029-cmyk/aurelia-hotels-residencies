'use client';

import React from 'react';
import Link from 'next/link';

export interface BespokeInquiryBannerData {
    eyebrow: string;
    heading: string;
    description: string;
    supportNotice: string;
    hotlineDisplay: string;
    hotlineTel: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    highlights: string[];
}

export interface GazetteNewsletterData {
    eyebrow: string;
    heading: string;
    tagline: string;
    privacyNotice: string;
    buttonLabel: string;
    placeholderText: string;
}

export interface ExperiencesVipSectionData {
    inquiryBanner: BespokeInquiryBannerData;
    newsletter: GazetteNewsletterData;
}

export const experiencesVipDefaultData: ExperiencesVipSectionData = {
    inquiryBanner: {
        eyebrow: 'EXCLUSIVE SOVEREIGN PRIVATIZATION',
        heading: 'Bespoke Maritime & Culinary Charters',
        description:
            'For whole-vessel privatizations, multi-day Tyrrhenian archipelago itineraries, private cellar buyouts, or clifftop nuptials, our Head Majordomo Desk provides tailored arrangements.',
        supportNotice: 'DEDICATED 24/7 PRIVATE MAJORDOMO CONCIERGE DESK',
        hotlineDisplay: '+39 089 875 000',
        hotlineTel: '+39089875000',
        primaryCtaLabel: 'INITIATE PRIVATE CONSULTATION',
        secondaryCtaLabel: 'DOWNLOAD CHARTER DOSSIER (PDF)',
        highlights: [
            'Direct private Riva tender boarding from Aurelia sea gate',
            'Bespoke Michelin 3-Star in-cove tasting menu curation',
            'Full nautical liability, skipper, and fuel clearance',
            'Room-folio settlement and helipad rendezvous coordination',
        ],
    },
    newsletter: {
        eyebrow: 'AURELIA SEASONAL GAZETTE',
        heading: 'Inscribe for Private Harvest & Cellar Releases',
        tagline:
            'Receive confidential intimations of rare vintage releases, olive pressing dates, and priority charter allocation.',
        privacyNotice: 'Discreet correspondence only. Zero third-party disclosure.',
        buttonLabel: 'INSCRIBE',
        placeholderText: 'Enter confidential email address...',
    },
};

export interface BespokeConciergeInquiryBannerProps {
    data?: BespokeInquiryBannerData;
    onInitiateConsultation?: () => void;
    onDownloadDossier?: () => void;
    className?: string;
}

export function BespokeConciergeInquiryBanner({
    data = experiencesVipDefaultData.inquiryBanner,
    onInitiateConsultation,
    onDownloadDossier,
    className = '',
}: BespokeConciergeInquiryBannerProps) {
    const {
        eyebrow,
        heading,
        description,
        supportNotice,
        hotlineDisplay,
        hotlineTel,
        primaryCtaLabel,
        secondaryCtaLabel,
        highlights,
    } = data;

    return (
        <section className={`w-full max-w-340 mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14 ${className}`}>
            <div className="bg-[#191817] text-[#fcf9f4] border border-[#34322e] rounded-lg p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
                {/* Subtle Geometric Background Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage:
                            'radial-gradient(#bfa76f 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Narrative Column (7 cols) */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.24em] text-[#bfa76f]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#bfa76f] animate-pulse" />
                            <span>{eyebrow}</span>
                        </div>

                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-white tracking-tight leading-[1.12]">
                            {heading}
                        </h2>

                        <p className="text-xs sm:text-sm text-[#a4a098] font-sans font-light leading-relaxed max-w-xl">
                            {description}
                        </p>

                        {/* 4 Feature Checklist Items */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs font-sans text-[#dcdad5]">
                            {highlights.map(function (item, idx) {
                                return (
                                    <div key={idx} className="flex items-center gap-2.5">
                                        <svg
                                            className="w-4 h-4 text-[#bfa76f] shrink-0"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span className="font-light">{item}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Action & Telephone Hotline Card (5 cols) */}
                    <div className="lg:col-span-5 bg-[#22201e] border border-[#3e3a35] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl">
                        <div>
                            <span className="block text-[9px] font-sans font-semibold uppercase tracking-[0.22em] text-[#bfa76f] mb-1">
                                {supportNotice}
                            </span>
                            <a
                                href={`tel:${hotlineTel}`}
                                className="font-serif text-2xl sm:text-3xl font-normal text-white hover:text-[#bfa76f] transition-colors block tracking-tight"
                            >
                                {hotlineDisplay}
                            </a>
                            <span className="text-[11px] text-[#8e8a82] font-sans mt-1 block">
                                Direct connection to Head Majordomo Matteo de Luca
                            </span>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-white/10">
                            <button
                                type="button"
                                onClick={onInitiateConsultation}
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#bfa76f] hover:bg-[#aa935e] text-[#191817] font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all shadow-md active:translate-y-0.5 text-center"
                            >
                                <span>{primaryCtaLabel}</span>
                                <span>→</span>
                            </button>

                            <button
                                type="button"
                                onClick={onDownloadDossier}
                                className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-transparent hover:bg-white/5 border border-white/20 text-white font-sans text-[10px] font-semibold uppercase tracking-[0.18em] transition-all text-center"
                            >
                                <span>{secondaryCtaLabel}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}