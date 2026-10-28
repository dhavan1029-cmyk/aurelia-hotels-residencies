'use client';

import React, { useState } from 'react';
import {
    GazetteNewsletterData,
    experiencesVipDefaultData,
} from './BespokeConciergeInquiryBanner';

export interface SeasonalGazetteNewsletterStripProps {
    data?: GazetteNewsletterData;
    onSubscribe?: (email: string) => void;
    className?: string;
}

export function SeasonalGazetteNewsletterStrip({
    data = experiencesVipDefaultData.newsletter,
    onSubscribe,
    className = '',
}: SeasonalGazetteNewsletterStripProps) {
    const {
        eyebrow,
        heading,
        tagline,
        privacyNotice,
        buttonLabel,
        placeholderText,
    } = data;

    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setIsSubmitted(true);
            if (onSubscribe) {
                onSubscribe(email.trim());
            }
        }
    };

    return (
        <section className={`w-full bg-[#f4f0e6] border-t border-b border-[#e2ddd3] py-12 sm:py-16 px-4 sm:px-8 lg:px-12 text-[#1f1e1d] ${className}`}>
            <div className="max-w-340 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Title Monograph (6 cols) */}
                <div className="lg:col-span-6 space-y-2">
                    <span className="block text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8e763b]">
                        {eyebrow}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#1f1e1d] tracking-tight leading-[1.15]">
                        {heading}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#5f5c56] font-sans font-light leading-relaxed max-w-lg">
                        {tagline}
                    </p>
                </div>

                {/* Right Form Input Column (6 cols) */}
                <div className="lg:col-span-6">
                    {isSubmitted ? (
                        <div className="p-4 -xl bg-white border border-[#ded9ce] text-center sm:text-left">
                            <span className="font-serif text-base font-semibold text-[#1f1e1d] block">
                                Inscription Recorded
                            </span>
                            <span className="text-xs text-[#78756d] font-sans mt-0.5 block">
                                Seasonal gazette correspondence dispatched to {email}.
                            </span>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-2.5">
                            <div className="flex flex-col sm:flex-row gap-2.5">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={function (e) {
                                        setEmail(e.target.value);
                                    }}
                                    placeholder={placeholderText}
                                    className="flex-1 px-4 py-3.5 -xl bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs placeholder-[#a4a098]"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3.5 -xl bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all shadow-md shrink-0 active:translate-y-0.5"
                                >
                                    {buttonLabel}
                                </button>
                            </div>
                            <span className="block text-[10px] font-sans text-[#8e8a82]">
                                {privacyNotice}
                            </span>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}