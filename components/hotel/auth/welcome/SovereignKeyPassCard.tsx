import { SovereignKeyPassDetails } from './InscriptionWelcomeHeader';
import { WalletDownloadActions } from './WalletDownloadActions';

export interface SovereignKeyPassCardProps {
    data: SovereignKeyPassDetails;
    className?: string;
}

export function SovereignKeyPassCard({
    data,
    className = '',
}: SovereignKeyPassCardProps) {
    const {
        cardIssuerBadge,
        patronHonorific,
        patronFirstName,
        patronLastName,
        folioCode,
        membershipTierLabel,
        issuedDateDisplay,
        expiryDisplay,
        nfcChipNotice,
        qrInstructionText,
    } = data;

    return (
        <article
            aria-label="Sovereign Patron Titanium Access Pass"
            className={`w-full max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 lg:p-10 bg-[#161514] text-white border border-[#bfa76f]/50 shadow-[0_24px_64px_rgba(0,0,0,0.45)] relative overflow-hidden select-none ${className}`}
        >
            {/* Subtle Metallic Brushed Grain Texture */}
            <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                    backgroundImage:
                        'radial-gradient(#bfa76f 1px, transparent 1px), linear-gradient(135deg, rgba(191,167,111,0.06) 0%, transparent 60%)',
                    backgroundSize: '24px 24px, 100% 100%',
                }}
            />

            {/* Ambient Gold Radial Halo */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#bfa76f]/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6 sm:space-y-8">
                {/* 1. TOP PASS BAR: Emblem, Chip & Issuer */}
                <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-3.5">
                        {/* Circular Compass Monogram Insignia */}
                        <div className="w-12 h-12 rounded-2xl bg-black/60 backdrop-blur-md border border-[#bfa76f]/60 flex items-center justify-center text-[#bfa76f] shadow-inner shrink-0">
                            <svg
                                className="w-7 h-7"
                                viewBox="0 0 100 100"
                                fill="none"
                            >
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="42"
                                    stroke="#bfa76f"
                                    strokeWidth="2"
                                />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="35"
                                    stroke="#bfa76f"
                                    strokeWidth="1"
                                    strokeDasharray="3 3"
                                    opacity="0.6"
                                />
                                <line
                                    x1="50"
                                    y1="6"
                                    x2="50"
                                    y2="94"
                                    stroke="#bfa76f"
                                    strokeWidth="1"
                                    opacity="0.4"
                                />
                                <line
                                    x1="6"
                                    y1="50"
                                    x2="94"
                                    y2="50"
                                    stroke="#bfa76f"
                                    strokeWidth="1"
                                    opacity="0.4"
                                />
                                <path
                                    d="M50 24L30 74M50 24L70 74M36 57H64"
                                    stroke="#fcf9f4"
                                    strokeWidth="3.2"
                                    strokeLinecap="round"
                                />
                                <polygon
                                    points="50,44 54,49 50,54 46,49"
                                    fill="#bfa76f"
                                />
                            </svg>
                        </div>

                        <div>
                            <span className="font-serif text-xs sm:text-[13px] tracking-[0.2em] text-white uppercase block leading-none">
                                Aurelia
                            </span>

                            <span className="text-[8px] sm:text-[9px] font-sans font-semibold tracking-[0.28em] text-[#bfa76f] mt-1 block uppercase leading-none">
                                {cardIssuerBadge}
                            </span>
                        </div>
                    </div>

                    {/* Hardware Micro-Chip Visual Contacts */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <div className="w-10 h-7 rounded-md bg-[#25221d] border border-[#bfa76f]/60 p-1 flex flex-col justify-between shadow-2xs">
                            <div className="w-full h-1 bg-[#bfa76f]/50 rounded-xs" />

                            <div className="flex gap-1">
                                <span className="w-2.5 h-2 bg-[#bfa76f]/40 rounded-xs" />
                                <span className="w-2.5 h-2 bg-[#bfa76f]/40 rounded-xs" />
                            </div>
                        </div>

                        <span className="text-[7.5px] font-mono uppercase tracking-widest text-[#a4a098]">
                            NFC SECURE
                        </span>
                    </div>
                </div>

                {/* 2. CENTER SECTION: Inscribed Patron Name & Cryptographic QR Block */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    {/* Inscribed Particulars (8 cols) */}
                    <div className="sm:col-span-8 space-y-4">
                        <div>
                            <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-[#bfa76f] block">
                                INSCRIBED SOVEREIGN FELLOW
                            </span>

                            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-white tracking-tight leading-tight mt-1">
                                {patronHonorific} {patronFirstName}

                                <span className="block font-light italic text-[#fcf9f4]">
                                    {patronLastName}
                                </span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                            <div>
                                <span className="text-[8px] uppercase tracking-widest text-[#8e8a82] block">
                                    FOLIO IDENTIFIER
                                </span>

                                <span className="text-sm font-semibold tracking-wider text-[#bfa76f] block mt-0.5">
                                    {folioCode}
                                </span>
                            </div>

                            <div>
                                <span className="text-[8px] uppercase tracking-widest text-[#8e8a82] block">
                                    MEMBERSHIP TIER
                                </span>

                                <span className="text-xs text-white uppercase tracking-wider block mt-0.5">
                                    {membershipTierLabel}
                                </span>
                            </div>

                            <div>
                                <span className="text-[8px] uppercase tracking-widest text-[#8e8a82] block">
                                    ISSUED ANNO
                                </span>

                                <span className="text-[11px] text-[#dcdad5] block mt-0.5">
                                    {issuedDateDisplay}
                                </span>
                            </div>

                            <div>
                                <span className="text-[8px] uppercase tracking-widest text-[#8e8a82] block">
                                    EXPIRY HORIZON
                                </span>

                                <span className="text-[11px] text-emerald-400 font-semibold block mt-0.5">
                                    {expiryDisplay}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* High-Contrast 256-Bit Cryptographic QR Attestation Block (4 cols) */}
                    <div className="sm:col-span-4 flex flex-col items-center sm:items-end text-center sm:text-right">
                        <div className="p-2.5 rounded-2xl bg-white border border-[#bfa76f] shadow-lg">
                            <svg
                                className="w-28 h-28 sm:w-32 sm:h-32 text-[#161514]"
                                viewBox="0 0 120 120"
                                fill="currentColor"
                            >
                                <rect
                                    x="10"
                                    y="10"
                                    width="30"
                                    height="30"
                                    rx="3"
                                    fill="#161514"
                                />
                                <rect
                                    x="16"
                                    y="16"
                                    width="18"
                                    height="18"
                                    rx="2"
                                    fill="#fff"
                                />
                                <rect
                                    x="21"
                                    y="21"
                                    width="8"
                                    height="8"
                                    fill="#161514"
                                />

                                <rect
                                    x="80"
                                    y="10"
                                    width="30"
                                    height="30"
                                    rx="3"
                                    fill="#161514"
                                />
                                <rect
                                    x="86"
                                    y="16"
                                    width="18"
                                    height="18"
                                    rx="2"
                                    fill="#fff"
                                />
                                <rect
                                    x="91"
                                    y="21"
                                    width="8"
                                    height="8"
                                    fill="#161514"
                                />

                                <rect
                                    x="10"
                                    y="80"
                                    width="30"
                                    height="30"
                                    rx="3"
                                    fill="#161514"
                                />
                                <rect
                                    x="16"
                                    y="86"
                                    width="18"
                                    height="18"
                                    rx="2"
                                    fill="#fff"
                                />
                                <rect
                                    x="21"
                                    y="91"
                                    width="8"
                                    height="8"
                                    fill="#161514"
                                />

                                <rect x="48" y="12" width="6" height="6" fill="#161514" />
                                <rect x="58" y="12" width="6" height="6" fill="#161514" />
                                <rect x="68" y="18" width="6" height="6" fill="#161514" />
                                <rect x="48" y="24" width="6" height="6" fill="#161514" />
                                <rect x="62" y="30" width="6" height="6" fill="#161514" />
                                <rect x="48" y="48" width="8" height="8" fill="#8e763b" />
                                <rect x="64" y="48" width="8" height="8" fill="#161514" />
                                <rect x="56" y="60" width="8" height="8" fill="#161514" />
                                <rect x="48" y="72" width="6" height="6" fill="#161514" />
                                <rect x="64" y="80" width="6" height="6" fill="#8e763b" />
                                <rect x="74" y="92" width="6" height="6" fill="#161514" />
                                <rect x="84" y="80" width="6" height="6" fill="#161514" />
                                <rect x="94" y="92" width="6" height="6" fill="#161514" />
                                <rect x="104" y="104" width="6" height="6" fill="#161514" />
                            </svg>
                        </div>

                        <span className="text-[8px] font-mono text-[#a4a098] mt-2 max-w-35 leading-tight block">
                            {qrInstructionText}
                        </span>
                    </div>
                </div>

                {/* 3. BOTTOM NOTIFICATION & WALLET DOWNLOAD ACTIONS */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.2em] text-[#8e8a82]">
                        <span>{nfcChipNotice}</span>

                        <span className="text-[#bfa76f]">
                            ACTIVE ENCLAVE KEY
                        </span>
                    </div>

                    <WalletDownloadActions folioCode={folioCode} />
                </div>
            </div>
        </article>
    );
}
