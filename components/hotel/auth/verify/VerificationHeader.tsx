import Link from 'next/link';
import Image from 'next/image';

export interface VerificationPageData {
    topBar: {
        protocolTag: string;
        vaultNodeTag: string;
        tlsTag: string;
        zeroKnowledgeTag: string;
    };
    editorialHero: {
        crestInitial: string;
        reserveLabel: string;
        estDateLabel: string;
        passkeyLayerBadge: string;
        quoteText: string;
        quoteAuthor: string;
        quoteRole: string;
        imageUrl: string;
        imageAlt: string;
        clearanceProtocolTitle: string;
        terminalStatus: string;
        privacyProtocolStatus: string;
        majordomoHotlineDisplay: string;
        majordomoHotlineTel: string;
    };
    verificationForm: {
        phaseEyebrow: string;
        title: string;
        descriptionPrefix: string;
        maskedEmail: string;
        maskedMobile: string;
        initialCode: string[];
        resendTimeoutSeconds: number;
        passkeyButtonLabel: string;
        passkeySubLabel: string;
        submitButtonLabel: string;
        returnLinkText: string;
        returnLinkHref: string;
        lostKeyText: string;
        lostKeyHref: string;
        conciergeHotlineDisplay: string;
        conciergeHotlineTel: string;
        compliancePills: Array<{
            label: string;
            value: string;
        }>;
    };
    footer: {
        copyrightNotice: string;
        legalNotice: string;
        hardwareAttestationNotice: string;
        conciergeDeskText: string;
        conciergeDeskTel: string;
    };
}

export const verificationDefaultData: VerificationPageData = {
    topBar: {
        protocolTag: 'EIDAS SOVEREIGN PROTOCOL',
        vaultNodeTag: 'SOVEREIGN VAULT SESSION • ZURICH MAINFRAME #749',
        tlsTag: 'End-to-End TLS 1.3 Strict',
        zeroKnowledgeTag: 'Zero-Knowledge Handshake',
    },

    editorialHero: {
        crestInitial: 'A',
        reserveLabel: 'AURELIA PRIVATE RESERVE',
        estDateLabel: 'Est. 1928 • Helvetia',
        passkeyLayerBadge: 'PASSKEY LAYER',
        quoteText:
            '“Discretion is not merely an amenity, but our permanent architectural foundation.”',
        quoteAuthor: 'MATTEO DE LUCA',
        quoteRole: 'SENIOR MAJORDOMO',
        imageUrl:
            '/limestone-villa.png',
        imageAlt:
            'Monolithic Mediterranean boutique hotel exterior overlooking the sea at golden hour sunset',
        clearanceProtocolTitle: 'SANCTUARY CLEARANCE PROTOCOL',
        terminalStatus: '256-Bit Cryptographic Terminal • ACTIVE',
        privacyProtocolStatus: 'Swiss Banking Privacy (FADP) • RATIFIED',
        majordomoHotlineDisplay: '+39 089 875 000',
        majordomoHotlineTel: '+39089875000',
    },

    verificationForm: {
        phaseEyebrow: 'PROTOCOL PHASE 02 / 02 • DISCREET TERMINAL ACCESS',
        title: 'Verify Sovereign Identity',
        descriptionPrefix:
            'A 6-digit cryptographic verification code has been dispatched to your confidential address: ',
        maskedEmail: 'k.****@sovereign-holdings.co.uk',
        maskedMobile: '+44 7911 ••••01',
        initialCode: ['8', '8', '2', '9', '', ''],
        resendTimeoutSeconds: 41,
        passkeyButtonLabel: 'Authenticate via Apple Sovereign ID',
        passkeySubLabel: 'Biometric Passkey • Secure Enclave FIDO2',
        submitButtonLabel: 'VERIFY & ENTER SANCTUARY',
        returnLinkText: 'Return to Sovereign Login',
        returnLinkHref: '/login',
        lostKeyText: 'Lost Authenticator Key?',
        lostKeyHref: '/not-found',
        conciergeHotlineDisplay: 'Dispatch verbal code via Concierge',
        conciergeHotlineTel: '+39089875000',
        compliancePills: [
            {
                label: 'BANK-GRADE CRYPTOGRAPHIC CLEARANCE',
                value: 'PCI-DSS TIER 1',
            },
            {
                label: 'FINMA REGULATION',
                value: '08/21',
            },
        ],
    },

    footer: {
        copyrightNotice:
            '© MMXXIV AURELIA PRIVATE ESTATES • GENEVA • ZÜRICH • ST. MORITZ',
        legalNotice: 'SWISS BANKING SECRECY ART. 47',
        hardwareAttestationNotice: 'HARDWARE ENCLAVE ATTESTATION',
        conciergeDeskText: 'CONCIERGE DESK',
        conciergeDeskTel: '+39089875000',
    },
};

export interface VerificationHeaderProps {
    data: VerificationPageData['topBar'];
    className?: string;
}

export function VerificationHeader({
    data,
    className = '',
}: VerificationHeaderProps) {
    const {
        protocolTag,
        vaultNodeTag,
        tlsTag,
        zeroKnowledgeTag,
    } = data;

    return (
        <header
            className={`w-full bg-[#fcf9f4] border-b border-[#e8e4dc] ${className}`}
        >
            {/* Primary Wordmark & Handshake Bar */}
            <div className="max-w-360 mx-auto px-4 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-4">
                {/* Brand Logo & Security Protocol Pill */}
                <div className="flex items-center gap-4 sm:gap-6">
                    <Link href="/" className="flex flex-col group">
                        <Image src={'/aurelia-logo-light.png'} width={200} height={66} alt='AURELIA'></Image>
                    </Link>

                    <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f6f2ea] border border-[#ded9ce] text-[9px] font-mono uppercase tracking-[0.18em] text-[#6d6961]">
                        <svg
                            className="w-3 h-3 text-[#8e763b]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <rect
                                x="3"
                                y="11"
                                width="18"
                                height="11"
                                rx="2"
                                ry="2"
                            />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>

                        <span>{protocolTag}</span>
                    </div>
                </div>

                {/* Handshake Telemetry & Patron Monogram */}
                <div className="flex items-center gap-4 text-xs font-sans">
                    <div className="hidden lg:flex items-center gap-6 text-[10px] font-mono uppercase tracking-wider text-[#78756d]">
                        <span>{tlsTag}</span>

                        <span className="text-[#ded9ce]">•</span>

                        <span className="text-[#8e763b]">
                            {zeroKnowledgeTag}
                        </span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#1f1e1d] text-white flex items-center justify-center font-serif text-xs font-semibold shadow-2xs">
                        KV
                    </div>
                </div>
            </div>

            {/* Sub-strip Terminal Node Strip */}
            <div className="w-full bg-[#f6f2ea] border-t border-[#ded9ce] py-1.5 px-4 sm:px-8 lg:px-12 text-[9px] font-mono uppercase tracking-[0.2em] text-[#8e8a82]">
                <div className="max-w-360 mx-auto flex items-center justify-between">
                    <span>{vaultNodeTag}</span>

                    <span className="text-[#24633b] flex items-center gap-1.5 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />

                        <span>HANDSHAKE VERIFIED</span>
                    </span>
                </div>
            </div>
        </header>
    );
}
