import Image from 'next/image';
import Link from 'next/link';

export interface SovereignKeyPassDetails {
    patronHonorific: string;
    patronFirstName: string;
    patronLastName: string;
    folioCode: string;
    membershipTierLabel: string;
    membershipTierCode: string;
    issuedDateDisplay: string;
    expiryDisplay: string;
    qrProtocolPayload: string;
}

export interface AssignedMajordomo {
    name: string;
    roleTag: string;
    statusText: string;
    estateLocation: string;
    directPhoneDisplay: string;
    directPhoneTel?: string;
    avatarUrl: string;
}

export interface EntitlementRule {
    id: string;
    discountPercent?: number;
    specificationNote: string;
}

export interface InscriptionWelcomePageData {
    patronHonorific: string;
    patronFirstName: string;
    patronLastName: string;
    folioCode: string;
    membershipTierLabel: string;
    membershipTierCode: string;
    issuedDateDisplay: string;
    expiryDisplay: string;
    confidentialityLevel: string;
    keyPass: SovereignKeyPassDetails;
    majordomo: AssignedMajordomo;
    entitlements: EntitlementRule[];
}

// ============================================================================
// 2. DEFAULT DYNAMIC DATA FIXTURE (STRICTLY DYNAMIC VALUES)
// ============================================================================

export const inscriptionWelcomeDefaultData: InscriptionWelcomePageData = {
    patronHonorific: 'Lady',
    patronFirstName: 'Katherine',
    patronLastName: 'Vane-Tempest',
    folioCode: 'AUR-8911-S',
    membershipTierLabel: 'TIER I SOVEREIGN FELLOW',
    membershipTierCode: 'TIER I • PERPETUAL',
    issuedDateDisplay: 'OCTOBER 2025',
    expiryDisplay: 'IN PERPETUITY',
    confidentialityLevel: 'LEVEL IV CONFIDENTIALITY',
    keyPass: {
        patronHonorific: 'Lady',
        patronFirstName: 'Katherine',
        patronLastName: 'Vane-Tempest',
        folioCode: 'AUR-8911-S',
        membershipTierLabel: 'TIER I SOVEREIGN FELLOW',
        membershipTierCode: 'TIER I • PERPETUAL',
        issuedDateDisplay: 'OCTOBER 2025',
        expiryDisplay: 'IN PERPETUITY',
        qrProtocolPayload: 'AURELIA://SOVEREIGN-KEY/AUR-8911-S/KATHERINE-VANE',
    },
    majordomo: {
        name: 'Matteo Bellini',
        roleTag: 'ASSIGNED SENIOR MAJORDOMO & SOMMELIER',
        statusText: 'Standing by • Private Line Active',
        estateLocation: 'Aurelia Sanctuary Positano • Cliffside Enclave',
        directPhoneDisplay: '+39 089 875 111',
        directPhoneTel: '+39089875111',
        avatarUrl: '/limestone-villa.png',
    },
    entitlements: [
        {
            id: 'patron-courtesy',
            discountPercent: 15,
            specificationNote: "Applicable in Positano, Cap d'Antibes, St. Moritz & Kyoto",
        },
        {
            id: 'allocated-majordomo',
            specificationNote: 'Senior Majordomo Matteo Bellini assigned to your docket',
        },
        {
            id: 'sensory-continuity',
            specificationNote: 'Synchronized via encrypted IoT controllers 2h prior to arrival',
        },
    ],
};

export const INSCRIPTION_STATIC_HEADER = {
    brandName: 'Aurelia',
    brandSub: 'HOTELS & RESIDENCES',
    registryStatusBadge: 'AURELIA REGISTRY • NODE ACTIVE',
    encryptionNodeNotice: '256-BIT CRYPTOGRAPHIC LEDGER',
    exitLinkLabel: '← Return to Sanctuary Grounds',
    exitLinkHref: '/',
    subStripTitle: 'SOVEREIGN PATRON DOSSIER REGISTRATION COMPLETE',
    subStripNotice: 'CRYPTO ACCESS PASS AUTHORIZED FOR ROOM & SLIPWAY',
} as const;

// export const INSCRIPTION_STATIC_HERO = {
//     inductionBadge: 'SOVEREIGN PATRONAGE RATIFIED • MCMXXIV',
//     headlinePrefix: 'Welcome to the Sovereign Circle,',
//     narrativeWelcome:
//         'Your sovereign patron folio has been inscribed into our confidential ledger under Swiss banking secrecy standards. From this moment onward, your presence is recognized across all global enclaves with intuitive discretion, personalized bedroom acoustics, and dedicated majordomo attendance.',
//     diplomaticClearancePill: 'SWISS FADP RATIFIED • 100% DISCREET',
// } as const;

// export const INSCRIPTION_STATIC_KEYPASS = {
//     cardIssuerBadge: 'AURELIA SOVEREIGN FOLIO KEY',
//     enclaveEmblemLetter: 'A',
//     nfcChipNotice: 'DISCREET NFC & BIOMETRIC HARDWARE ENCLAVE',
//     qrInstructionText: 'Touch to Smart Lock or Tender Sea Gate Slipway',
// } as const;


export function InscriptionWelcomeHeader({ className = '' }: { className?: string }) {
    return (
        <header
            aria-label="Sovereign Protocol Header"
            className={`w-full bg-[#fcf9f4] border-b border-[#e8e4dc] select-none ${className}`}
        >
            {/* Top Navigation Row */}
            <div className="max-w-360 mx-auto px-4 sm:px-8 lg:px-12 h-20 sm:h-22 flex items-center justify-between gap-4">
                {/* 1. Left Brand Monogram Lockup */}
                <Link href="/" className="flex flex-col group shrink-0">
                    <Image src="/aurelia-logo-light.png" width={240} height={66} alt="AURELIA" priority />
                </Link>

                {/* 2. Center Telemetry & Ledger Status Badge */}
                <div className="hidden md:inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#f6f2ea] border border-[#ded9ce] text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#6d6961]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>AURELIA REGISTRY • NODE ACTIVE</span>
                    <span className="text-[#ded9ce]">•</span>
                    <span className="text-[#8e763b]">256-BIT CRYPTOGRAPHIC LEDGER</span>
                </div>

                {/* 3. Right Return Action */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-medium uppercase tracking-[0.18em] text-[#78756d] hover:text-[#1f1e1d] transition-colors py-2 shrink-0"
                >
                    <span>← Return to Sanctuary Grounds</span>
                </Link>
            </div>

            {/* Sub-strip Notice */}
            <div className="w-full bg-[#f6f2ea] border-t border-[#ded9ce] py-2 px-4 sm:px-8 lg:px-12 text-[9px] font-mono uppercase tracking-[0.22em] text-[#8e8a82]">
                <div className="max-w-360 mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
                    <span>SOVEREIGN PATRON DOSSIER REGISTRATION COMPLETE</span>
                    <span className="text-[#8e763b]">CRYPTO ACCESS PASS AUTHORIZED FOR ROOM & SLIPWAY</span>
                </div>
            </div>
        </header>
    );
}