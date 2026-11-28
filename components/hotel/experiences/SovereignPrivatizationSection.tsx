import React from 'react';
import Link from 'next/link';
import GazetteSubscribeForm from './GazetteSubscribeForm';

export interface SovereignPrivatizationData {
    eyebrow: string;
    headline: string;
    narrative: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    gazetteEyebrow: string;
    gazetteDescription: string;
}

export interface SovereignPrivatizationSectionProps {
    data?: Partial<SovereignPrivatizationData>;
}

const DEFAULT_PRIVATIZATION_DATA: SovereignPrivatizationData = {
    eyebrow: 'ENTIRE FLEET & ESTATE BUYOUTS • SOVEREIGN CHARTER',
    headline: 'Commission a Private Sanctuary Privatization',
    narrative:
        'For diplomatic summits, multi-generational gatherings, or unannounced coastal retreats, the entire Positano cliffside enclave, Riva fleet, and Michelin culinary brigade may be reserved under a single confidentiality seal.',
    primaryCtaLabel: 'REQUEST PRIVATIZATION DOSSIER',
    primaryCtaHref: '/contact?subject=sanctuary-privatization',
    secondaryCtaLabel: 'SPEAK WITH MAJORDOMO DESK',
    secondaryCtaHref: 'tel:+39089875111',
    gazetteEyebrow: 'THE AURELIA GAZETTE • SEASONAL DISPATCH',
    gazetteDescription:
        'Receive private invitations to unreleased cellar allocations, seasonal maritime routes, and off-calendar sanctuary openings.',
};

export function SovereignPrivatizationSection({ data }: SovereignPrivatizationSectionProps) {
    const content: SovereignPrivatizationData = {
        ...DEFAULT_PRIVATIZATION_DATA,
        ...data,
    };

    return (
        <section
            aria-label="Sovereign Privatization & Gazette"
            className="w-full bg-[#191817] text-[#fcf9f4] border-t border-[#2c2a28]"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20 space-y-14">
                {/* Upper Row: Estate & Fleet Buyout Callout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-7 space-y-4">
                        <p className="text-[10px] sm:text-[10.5px] font-mono tracking-[0.22em] text-[#bfa76f] uppercase">
                            {content.eyebrow}
                        </p>
                        <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif text-[#fcf9f4] leading-tight">
                            {content.headline}
                        </h2>
                        <p className="text-[13.5px] leading-[1.7] text-[#dcdad5] max-w-2xl">
                            {content.narrative}
                        </p>
                    </div>

                    <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                        <Link
                            href={content.primaryCtaHref}
                            className="w-full sm:w-auto lg:w-full max-w-xs bg-[#fcf9f4] text-[#191817] hover:bg-[#e8e4dc] transition-colors px-6 py-3.5 text-[10.5px] font-mono font-semibold tracking-[0.16em] uppercase text-center"
                        >
                            {content.primaryCtaLabel}
                        </Link>
                        <a
                            href={content.secondaryCtaHref}
                            className="w-full sm:w-auto lg:w-full max-w-xs border border-[#3a3632] text-[#fcf9f4] hover:border-[#bfa76f] transition-colors px-6 py-3.5 text-[10.5px] font-mono tracking-[0.16em] uppercase text-center"
                        >
                            {content.secondaryCtaLabel}
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#2c2a28]" aria-hidden="true" />

                {/* Lower Row: Gazette Newsletter Strip */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-6 space-y-1.5">
                        <p className="text-[10px] font-mono tracking-[0.22em] text-[#bfa76f] uppercase">
                            {content.gazetteEyebrow}
                        </p>
                        <p className="text-[13px] leading-relaxed text-[#b8b3ac]">
                            {content.gazetteDescription}
                        </p>
                    </div>

                    <div className="lg:col-span-6 lg:flex lg:justify-end">
                        <GazetteSubscribeForm />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SovereignPrivatizationSection;
