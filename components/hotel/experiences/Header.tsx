
export interface ExperiencesHeaderData {
    editionEyebrow: string;
    heading: string;
    narrative: string;
    sanctuaryLocationPill: string;
    curatorDeskNotice: string;
    directDeskPhoneDisplay?: string;
    directDeskPhoneTel?: string;
}

export const experiencesHeaderDefaultData: ExperiencesHeaderData = {
    editionEyebrow: '• AURELIA SEASONAL GAZETTE • 2025 •',
    heading: 'Curated Escapes & Sensory Gastronomy',
    narrative:
        'Beyond the stillness of our monolithic travertine suites lies the living culture of the Campanian coastline. From private wooden Riva excursions navigating the sheer limestone bluffs of Capri to subterranean volcanic caldarium immersions and cellar tastings of historic reserve vintages, each experience is tailored for unhurried presence.',
    sanctuaryLocationPill: 'SANCTUARY POSITANO • AMALFI COASTLINE',
    curatorDeskNotice: 'Bespoke privatizations coordinated directly via Head Majordomo Matteo de Luca.',
    directDeskPhoneDisplay: '+39 089 875 000',
    directDeskPhoneTel: '+39089875000',
};

export interface ExperiencesHeaderSectionProps {
    data?: ExperiencesHeaderData;
    onInquireCurator?: () => void;
    className?: string;
}

export function ExperiencesHeaderSection({
    data = experiencesHeaderDefaultData,
    className = '',
}: ExperiencesHeaderSectionProps) {
    const {
        editionEyebrow,
        heading,
        narrative,
        sanctuaryLocationPill,
        curatorDeskNotice,
        directDeskPhoneDisplay = '+39 089 875 000',
        directDeskPhoneTel = '+39089875000',
    } = data;

    return (
        <section
            className={`w-full bg-[#fcf9f4] pt-14 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 border-b border-[#e8e4dc] text-[#1f1e1d] ${className}`}
        >
            <div className="max-w-340 mx-auto">
                {/* Gazette Monograph Header Block */}
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
                    {/* Top Architectural Gazette Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f6f2ea] border border-[#ded9ce] text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8e763b] shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b] animate-pulse" />
                        <span>{editionEyebrow}</span>
                    </div>

                    {/* Master Serif Headline */}
                    <h1 className="font-serif text-3xl sm:text-5xl lg:text-[58px] font-normal text-[#1f1e1d] tracking-tight leading-[1.08]">
                        {heading}
                    </h1>

                    {/* Subtitle / Narrative Monograph */}
                    <p className="text-xs sm:text-[14px] md:text-[15px] text-[#5f5c56] font-sans font-light leading-relaxed max-w-3xl">
                        {narrative}
                    </p>

                    {/* Meta Status & Concierge Hotline Sub-strip */}
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-[11px] font-sans text-[#78756d]">
                        <span className="uppercase tracking-[0.22em] text-[#8e763b] font-medium">
                            {sanctuaryLocationPill}
                        </span>
                        <span className="hidden sm:inline text-[#ded9ce]">•</span>
                        <span className="font-light italic text-[#78756d]">
                            {curatorDeskNotice}
                        </span>
                        <span className="hidden sm:inline text-[#ded9ce]">•</span>
                        <a
                            href={`tel:${directDeskPhoneTel}`}
                            className="inline-flex items-center gap-1.5 font-mono text-[#1f1e1d] hover:text-[#8e763b] transition-colors underline uppercase tracking-wider font-medium"
                        >
                            <svg
                                className="w-3.5 h-3.5 text-[#8e763b]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <span>{directDeskPhoneDisplay}</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ExperiencesHeaderSection;