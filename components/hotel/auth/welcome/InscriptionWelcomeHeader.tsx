import Image from 'next/image';
import Link from 'next/link';

export interface InscriptionWelcomeHeaderData {
    brandName: string;
    brandSub: string;
    registryStatusBadge: string;
    encryptionNodeNotice: string;
    exitLinkLabel: string;
    exitLinkHref: string;
}

export interface SovereignKeyPassDetails {
    cardIssuerBadge: string;
    enclaveEmblemLetter: string;
    patronHonorific: string;
    patronFirstName: string;
    patronLastName: string;
    folioCode: string;
    membershipTierLabel: string;
    membershipTierCode: string;
    issuedDateDisplay: string;
    expiryDisplay: string;
    nfcChipNotice: string;
    qrProtocolPayload: string;
    qrInstructionText: string;
}

export interface ConferredEntitlementItem {
    id: string;
    romanNumeral: string;
    title: string;
    badge: string;
    description: string;
    specificationNote: string;
    iconType: 'discount' | 'majordomo' | 'sensory';
}

export interface AssignedMajordomoLiaison {
    name: string;
    roleTag: string;
    statusText: string;
    estateLocation: string;
    directPhoneDisplay: string;
    directPhoneTel: string;
    avatarUrl: string;
}

export interface InscriptionWelcomePageData {
    header: InscriptionWelcomeHeaderData;
    hero: {
        inductionBadge: string;
        headlineHonorific: string;
        headlineName: string;
        narrativeWelcome: string;
        provenanceDossierRef: string;
        diplomaticClearancePill: string;
    };
    keyPass: SovereignKeyPassDetails;
    entitlementsEyebrow: string;
    entitlementsHeading: string;
    entitlementsDescription: string;
    entitlements: ConferredEntitlementItem[];
    majordomo: AssignedMajordomoLiaison;
    wayfinding: {
        primaryActionLabel: string;
        primaryActionHref: string;
        secondaryActionLabel: string;
        secondaryActionHref: string;
        conciergeAssuranceText: string;
    };
    footer: {
        copyrightNotice: string;
        secrecyArticleText: string;
        hotlineLabel: string;
        hotlineTel: string;
    };
}

export const inscriptionWelcomeDefaultData: InscriptionWelcomePageData = {
    header: {
        brandName: 'Aurelia',
        brandSub: 'HOTELS & RESIDENCES',
        registryStatusBadge: 'AURELIA REGISTRY • NODE ACTIVE',
        encryptionNodeNotice: '256-BIT CRYPTOGRAPHIC LEDGER',
        exitLinkLabel: '← Return to Sanctuary Grounds',
        exitLinkHref: '/',
    },
    hero: {
        inductionBadge: 'SOVEREIGN PATRONAGE RATIFIED • MCMXXIV',
        headlineHonorific: 'Welcome to the Sovereign Circle,',
        headlineName: 'Lady Katherine.',
        narrativeWelcome:
            'Your sovereign patron folio has been inscribed into our confidential ledger under Swiss banking secrecy standards. From this moment onward, your presence is recognized across all global enclaves with intuitive discretion, personalized bedroom acoustics, and dedicated majordomo attendance.',
        provenanceDossierRef: 'FOLIO #AUR-8911-S • LEVEL IV CONFIDENTIALITY',
        diplomaticClearancePill: 'SWISS FADP RATIFIED • 100% DISCREET',
    },
    keyPass: {
        cardIssuerBadge: 'AURELIA SOVEREIGN FOLIO KEY',
        enclaveEmblemLetter: 'A',
        patronHonorific: 'Lady',
        patronFirstName: 'Katherine',
        patronLastName: 'Vane-Tempest',
        folioCode: 'AUR-8911-S',
        membershipTierLabel: 'TIER I SOVEREIGN FELLOW',
        membershipTierCode: 'TIER I • PERPETUAL',
        issuedDateDisplay: 'OCTOBER 2025',
        expiryDisplay: 'IN PERPETUITY',
        nfcChipNotice: 'DISCREET NFC & BIOMETRIC HARDWARE ENCLAVE',
        qrProtocolPayload: 'AURELIA://SOVEREIGN-KEY/AUR-8911-S/KATHERINE-VANE',
        qrInstructionText: 'Touch to Smart Lock or Tender Sea Gate Slipway',
    },
    entitlementsEyebrow: 'CONFERRED SOVEREIGN PREROGATIVES',
    entitlementsHeading: 'Permanent Privileges of Your Membership',
    entitlementsDescription:
        'Your folio unlocks automated privileges across our coastal cliff retreats, alpine monoliths, and bamboo onsen sanctuaries.',
    entitlements: [
        {
            id: 'patron-courtesy',
            romanNumeral: 'PREROGATIVE I',
            title: '15% Automated Patron Courtesy',
            badge: 'PERPETUAL COURTESY',
            description:
                'Credited automatically against all residential suite tariffs, vintage Riva yacht expeditions, and subterranean vault tastings.',
            specificationNote: 'Applicable in Positano, Cap d\'Antibes, St. Moritz & Kyoto',
            iconType: 'discount',
        },
        {
            id: 'allocated-majordomo',
            romanNumeral: 'PREROGATIVE II',
            title: 'Dedicated Personal Majordomo',
            badge: '24/7 ATTENDANCE',
            description:
                'Stationed at your assigned sanctuary to coordinate helicopter landings, harbor slipway tenders, and in-suite unpacking rituals.',
            specificationNote: 'Senior Majordomo Matteo Bellini assigned to your docket',
            iconType: 'majordomo',
        },
        {
            id: 'sensory-continuity',
            romanNumeral: 'PREROGATIVE III',
            title: 'Harmonized Sensory Staging',
            badge: 'PRE-ARRIVAL CALIBRATION',
            description:
                'Your suite pre-set to 20.5°C geothermal cooling, Hungarian goose down pillows dressed, and cold-atomized Amalfi Neroli diffusers active.',
            specificationNote: 'Synchronized via encrypted IoT controllers 2h prior to arrival',
            iconType: 'sensory',
        },
    ],
    majordomo: {
        name: 'Matteo Bellini',
        roleTag: 'ASSIGNED SENIOR MAJORDOMO & SOMMELIER',
        statusText: 'Standing by • Private Line Active',
        estateLocation: 'Aurelia Sanctuary Positano • Cliffside Enclave',
        directPhoneDisplay: '+39 089 875 111',
        directPhoneTel: '+39089875111',
        avatarUrl: '/limestone-villa.png',
    },
    wayfinding: {
        primaryActionLabel: 'Enter Patron Dossier & Sensory Preferences',
        primaryActionHref: '/profile',
        secondaryActionLabel: 'Explore Curated Suites & Sanctuaries',
        secondaryActionHref: '/accommodations',
        conciergeAssuranceText: 'Direct telephone coordination available 24/7 via private majordomo line.',
    },
    footer: {
        copyrightNotice: 'AURELIA HOTELS & RESIDENCES S.P.A. © MMXXIV',
        secrecyArticleText: 'PROTECTED UNDER SWISS FEDERAL DATA PROTECTION ACT (FADP)',
        hotlineLabel: 'CONCIERGE DESK (+39 089 875 111)',
        hotlineTel: '+39089875111',
    },
};


export interface InscriptionWelcomeHeaderProps {
    data: InscriptionWelcomeHeaderData;
    className?: string;
}

export function InscriptionWelcomeHeader({
    data,
    className = '',
}: InscriptionWelcomeHeaderProps) {
    const {
        registryStatusBadge,
        encryptionNodeNotice,
        exitLinkLabel,
        exitLinkHref,
    } = data;

    return (
        <header
            aria-label="Sovereign Protocol Header"
            className={`w-full bg-[#fcf9f4] border-b border-[#e8e4dc] select-none ${className}`}
        >
            {/* Top Navigation Row */}
            <div className="max-w-360 mx-auto px-4 sm:px-8 lg:px-12 h-20 sm:h-22 flex items-center justify-between gap-4">
                {/* 1. Left Brand Monogram Lockup */}
                <Link href="/" className="flex flex-col group shrink-0">
                    <Image src={'/aurelia-logo-light.png'} width={240} height={66} alt='AURELIA'></Image>
                </Link>

                {/* 2. Center Telemetry & Ledger Status Badge (Hidden on mobile) */}
                <div className="hidden md:inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#f6f2ea] border border-[#ded9ce] text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#6d6961]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{registryStatusBadge}</span>
                    <span className="text-[#ded9ce]">•</span>
                    <span className="text-[#8e763b]">{encryptionNodeNotice}</span>
                </div>

                {/* 3. Right Return Action */}
                <Link
                    href={exitLinkHref}
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-medium uppercase tracking-[0.18em] text-[#78756d] hover:text-[#1f1e1d] transition-colors py-2 shrink-0"
                >
                    <span>{exitLinkLabel}</span>
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