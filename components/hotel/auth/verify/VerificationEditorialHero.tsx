import Image from 'next/image';
import { VerificationPageData } from './VerificationHeader';

export interface VerificationEditorialHeroProps {
    data: VerificationPageData['editorialHero'];
    className?: string;
}

export function VerificationEditorialHero({
    data,
    className = '',
}: VerificationEditorialHeroProps) {
    const {
        crestInitial,
        reserveLabel,
        estDateLabel,
        passkeyLayerBadge,
        quoteText,
        quoteAuthor,
        quoteRole,
        imageUrl,
        imageAlt,
        clearanceProtocolTitle,
        terminalStatus,
        privacyProtocolStatus,
        majordomoHotlineDisplay,
        majordomoHotlineTel,
    } = data;

    return (
        <aside
            aria-label="Sovereign Architectural Monograph & Security Protocol"
            className={`relative w-full rounded-2xl overflow-hidden border border-[#ded9ce] bg-[#191817] shadow-xl flex flex-col justify-between p-6 sm:p-8 min-h-145 lg:min-h-175 text-white select-none ${className}`}
        >
            {/* 1. Background Photographic Layer with Dual Editorial Vignettes */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center"
                />
                {/* Contrast layers for text legibility */}
                <div className="absolute inset-0 bg-[#161514]/65 mix-blend-multiply" />
                <div className="absolute inset-0 bg-linear-to-t from-[#141312] via-[#141312]/50 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-[#141312]/70 via-transparent to-transparent" />
            </div>

            {/* 2. Top Monogram Crest & Passkey Security Badge */}
            <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-serif text-lg font-bold text-[#bfa76f] shadow-2xs">
                        {crestInitial}
                    </div>
                    <div>
                        <span className="font-serif text-xs sm:text-[13px] tracking-[0.18em] uppercase text-white font-normal block leading-tight">
                            {reserveLabel}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#a4a098] block mt-0.5">
                            {estDateLabel}
                        </span>
                    </div>
                </div>

                <span className="px-2.5 py-1 rounded-sm bg-white/15 backdrop-blur-md border border-white/20 font-mono text-[9px] uppercase tracking-wider text-[#dcdad5] shrink-0">
                    {passkeyLayerBadge}
                </span>
            </div>

            {/* 3. Central Monograph Pull-Quote */}
            <div className="relative z-10 my-auto py-10 max-w-sm space-y-4">
                <span className="text-2xl text-[#bfa76f] font-serif leading-none select-none block">
                    “
                </span>
                <blockquote className="font-serif italic text-xl sm:text-2xl font-light text-white/95 leading-[1.35] tracking-tight">
                    {quoteText.replace(/[“”]/g, '')}
                </blockquote>
                <div className="pt-2 border-t border-white/20 text-[10px] font-sans">
                    <span className="font-semibold uppercase tracking-[0.2em] text-[#bfa76f] block">
                        {quoteAuthor}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#a4a098] block mt-0.5">
                        {quoteRole}
                    </span>
                </div>
            </div>

            {/* 4. Bottom Sanctuary Clearance Protocol Card */}
            <div className="relative z-10 bg-black/60 backdrop-blur-md border border-white/15 rounded-xl p-4 sm:p-5 space-y-2.5 shadow-2xs text-[10px] font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[9px] tracking-wider text-[#bfa76f] uppercase font-semibold">
                    <div className="flex items-center gap-1.5">
                        <svg
                            className="w-3.5 h-3.5 text-[#bfa76f]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <span>{clearanceProtocolTitle}</span>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="space-y-1.5 text-[#dcdad5]">
                    <div className="flex items-center justify-between">
                        <span>• 256-Bit Cryptographic Terminal</span>
                        <span className="text-emerald-400 font-semibold uppercase tracking-wider">
                            {terminalStatus.includes('ACTIVE') ? 'ACTIVE' : terminalStatus}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>• Swiss Banking Privacy (FADP)</span>
                        <span className="text-[#bfa76f] uppercase tracking-wider">
                            {privacyProtocolStatus.includes('RATIFIED') ? 'RATIFIED' : privacyProtocolStatus}
                        </span>
                    </div>
                </div>

                <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[#a4a098] text-[10px]">
                        <svg
                            className="w-3.5 h-3.5 text-[#bfa76f]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span>Majordomo Hotline</span>
                    </div>
                    <a
                        href={`tel:${majordomoHotlineTel}`}
                        className="font-mono text-white hover:text-[#bfa76f] tracking-wider text-[11px] underline"
                    >
                        {majordomoHotlineDisplay}
                    </a>
                </div>
            </div>
        </aside>
    );
}