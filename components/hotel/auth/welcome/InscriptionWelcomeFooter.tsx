
import React from 'react';
import Link from 'next/link';
import { InscriptionWelcomePageData } from './InscriptionWelcomeHeader';

export interface InscriptionWelcomeFooterProps {
    data: InscriptionWelcomePageData['footer'];
    className?: string;
}

export function InscriptionWelcomeFooter({
    data,
    className = '',
}: InscriptionWelcomeFooterProps) {
    const {
        copyrightNotice,
        secrecyArticleText,
        hotlineLabel,
        hotlineTel,
    } = data;

    return (
        <footer
            aria-label="Sovereign Secrecy Disclosures & Protocol Footer"
            className={`w-full bg-[#f6f2ea] border-t border-[#ded9ce] py-6 sm:py-8 px-4 sm:px-8 lg:px-12 text-[10px] font-sans text-[#78756d] select-none ${className}`}
        >
            <div className="max-w-360 mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                {/* 1. Copyright & Sovereign Hospitality Notice */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="font-semibold uppercase tracking-[0.2em] text-[#1f1e1d]">
                        {copyrightNotice}
                    </span>

                    <span className="hidden sm:inline text-[#ded9ce]">
                        •
                    </span>

                    <span className="text-[#8e8a82] font-mono text-[9px]">
                        {secrecyArticleText}
                    </span>
                </div>

                {/* 2. Privacy, Terms & Hotline Navigation */}
                <div className="flex items-center gap-6 uppercase tracking-wider text-[9px] text-[#55524d]">
                    <Link
                        href="/not-found"
                        className="hover:text-[#1f1e1d] transition-colors"
                    >
                        PRIVACY MANDATE
                    </Link>

                    <Link
                        href="/not-found"
                        className="hover:text-[#1f1e1d] transition-colors"
                    >
                        TERMS OF RESIDENCE
                    </Link>

                    <a
                        href={`tel:${hotlineTel}`}
                        className="text-[#8e763b] hover:text-[#1f1e1d] transition-colors font-medium"
                    >
                        {hotlineLabel}
                    </a>
                </div>
            </div>
        </footer>
    );
}
