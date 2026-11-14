
export const INSCRIPTION_STATIC_HERO = {
    inductionBadge: 'SOVEREIGN PATRONAGE RATIFIED • MCMXXIV',
    headlinePrefix: 'Welcome to the Sovereign Circle,',
    narrativeWelcome:
        'Your sovereign patron folio has been inscribed into our confidential ledger under Swiss banking secrecy standards. From this moment onward, your presence is recognized across all global enclaves with intuitive discretion, personalized bedroom acoustics, and dedicated majordomo attendance.',
    diplomaticClearancePill: 'SWISS FADP RATIFIED • 100% DISCREET',
} as const;

export interface InscriptionWelcomeHeroProps {
    /** Strictly dynamic patron credentials from InscriptionWelcomePageData */
    patronHonorific: string;
    patronFirstName: string;
    patronLastName?: string;
    folioCode: string;
    confidentialityLevel?: string;
    /** Optional custom CSS classes */
    className?: string;
    /** Optional narrative overrides */
    narrativeWelcome?: string;
    inductionBadge?: string;
}

/**
 * InscriptionWelcomeHero
 *
 * Induction hero section displaying personalized patron greeting, ratified folio code,
 * and immutable Swiss FADP secrecy telemetry badges.
 */
export function InscriptionWelcomeHero({
    patronHonorific,
    patronFirstName,
    patronLastName = '',
    folioCode,
    confidentialityLevel = 'LEVEL IV CONFIDENTIALITY',
    className = '',
    narrativeWelcome = INSCRIPTION_STATIC_HERO.narrativeWelcome,
    inductionBadge = INSCRIPTION_STATIC_HERO.inductionBadge,
}: InscriptionWelcomeHeroProps) {
    const fullNameDisplay = patronLastName
        ? `${patronHonorific} ${patronFirstName} ${patronLastName}.`
        : `${patronHonorific} ${patronFirstName}.`;

    return (
        <section
            aria-label="Sovereign Induction Monograph"
            className={`w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-6 pt-4 sm:pt-6 select-none ${className}`}
        >
            {/* 1. Architectural Gold Ratification Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#f6f2ea] border border-[#ded9ce] text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.26em] text-[#8e763b] shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b] animate-pulse" />
                <span>{inductionBadge}</span>
            </div>

            {/* 2. Master Serif Induction Headline */}
            <div className="space-y-1 sm:space-y-2">
                <span className="block font-serif text-2xl sm:text-4xl lg:text-[44px] font-normal text-[#1f1e1d] tracking-tight leading-[1.12]">
                    {INSCRIPTION_STATIC_HERO.headlinePrefix}
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-[56px] font-normal text-[#8e763b] tracking-tight leading-[1.08] italic">
                    {fullNameDisplay}
                </h1>
            </div>

            {/* 3. Editorial Provenance Welcome Monograph */}
            <p className="text-xs sm:text-[14px] md:text-[15px] text-[#5f5c56] font-sans font-light leading-relaxed max-w-2xl">
                {narrativeWelcome}
            </p>

            {/* 4. Cryptographic Ledger & Swiss Banking Secrecy Telemetry Strip */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[9.5px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#78756d]">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="font-semibold text-[#1f1e1d]">
                        FOLIO #{folioCode} • {confidentialityLevel}
                    </span>
                </div>

                <span className="hidden sm:inline text-[#ded9ce]">•</span>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#ded9ce] shadow-2xs">
                    <svg
                        className="w-3.5 h-3.5 text-[#8e763b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span className="text-[#8e763b] font-medium">
                        {INSCRIPTION_STATIC_HERO.diplomaticClearancePill}
                    </span>
                </div>
            </div>
        </section>
    );
}

export default InscriptionWelcomeHero;
