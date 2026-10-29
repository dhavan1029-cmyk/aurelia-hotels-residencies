import Link from 'next/link';
import { InscriptionWelcomePageData } from './InscriptionWelcomeHeader';

export interface InscriptionWayfindingBarProps {
    data: InscriptionWelcomePageData['wayfinding'];
    className?: string;
}

export function InscriptionWayfindingBar({
    data,
    className = '',
}: InscriptionWayfindingBarProps) {
    const {
        primaryActionLabel,
        primaryActionHref,
        secondaryActionLabel,
        secondaryActionHref,
        conciergeAssuranceText,
    } = data;

    return (
        <section
            aria-label="Sovereign Wayfinding Pathways"
            className={`w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-4 pt-4 select-none ${className}`}
        >
            {/* Primary & Secondary Action CTAs */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5">
                <Link
                    href={primaryActionHref}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 shadow-md active:translate-y-0.5 group"
                >
                    <span>{primaryActionLabel}</span>
                    <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </Link>

                <Link
                    href={secondaryActionHref}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl bg-white hover:bg-[#faf7f0] border border-[#ded9ce] text-[#1f1e1d] font-sans text-xs font-semibold uppercase tracking-[0.18em] transition-colors shadow-2xs"
                >
                    <span>{secondaryActionLabel}</span>
                </Link>
            </div>

            {/* Direct Telephone Assurance Note */}
            <p className="text-[11px] font-sans text-[#8e8a82] font-light">
                {conciergeAssuranceText}
            </p>
        </section>
    );
}
