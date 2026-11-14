/**
 * Aurelia Hotels & Residences — Sovereign Inscription Welcome Page Data Mapper
 * File: lib/mappers/inscriptionWelcomeMapper.ts
 *
 * Maps authenticated/registered User, relational GuestProfile, and assigned Majordomo
 * database entities into strictly typed InscriptionWelcomePageData for `/register/welcome?folio=AUR-XXXX-S`.
 */

import { GuestProfile, Prisma, SovereignTier,  User } from "@/app/generated/prisma/client";

// import type { User, GuestProfile, StaffMember, SovereignTier } from '@prisma/client';

// ============================================================================
// 1. DATA CONTRACTS REQUIRED BY InscriptionWelcomePageData
// ============================================================================

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
    // directPhoneTel: string;
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

/**
 * Composite User input shape accepted from Prisma queries.
 */

export type StaffMemberWithSanctuaryName = Prisma.StaffMemberGetPayload<{
    include: {
        sanctuary: {
            select: {
                name: true;
            };
        };
    };
}>;

/**
 * Composite User input shape accepted from Prisma queries.
 */
export type UserForWelcomeMapper = User & {
    profile?: GuestProfile | null;
    primaryMajordomo?: StaffMemberWithSanctuaryName | null;
};

// ============================================================================
// 2. HELPER UTILITIES & TIER RESOLVERS
// ============================================================================

const MONTH_NAMES = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

/**
 * Formats a Date object into uppercase Month Year (e.g. "OCTOBER 2025")
 */
export function formatIssuedMonthYear(date: Date = new Date()): string {
    const month = MONTH_NAMES[date.getMonth()] || 'OCTOBER';
    const year = date.getFullYear();
    return `${month} ${year}`;
}

/**
 * Formats human-friendly Sovereign membership tier presentation labels
 */
export function resolveTierPresentation(tier: SovereignTier | string = 'EXPLORER'): {
    label: string;
    code: string;
    discountPercent: number;
    confidentialityLevel: string;
} {
    switch (tier) {
        case 'IMPERIAL_HONORARY':
            return {
                label: 'IMPERIAL HONORARY FELLOW',
                code: 'TIER III • IMPERIAL',
                discountPercent: 20,
                confidentialityLevel: 'LEVEL V DIPLOMATIC SEAL',
            };
        case 'SOVEREIGN_KEY':
            return {
                label: 'TIER I SOVEREIGN FELLOW',
                code: 'TIER I • PERPETUAL',
                discountPercent: 15,
                confidentialityLevel: 'LEVEL IV CONFIDENTIALITY',
            };
        case 'EXPLORER':
        default:
            return {
                label: 'SOVEREIGN EXPLORER',
                code: 'TIER II • ACCREDITED',
                discountPercent: 10,
                confidentialityLevel: 'LEVEL III CONFIDENTIALITY',
            };
    }
}

/**
 * Builds fallback majordomo liaison details when no staff relation is present in the database.
 */
export function resolveDefaultMajordomo(estateLocation?: string): AssignedMajordomo {
    return {
        name: 'Matteo Bellini',
        roleTag: 'ASSIGNED SENIOR MAJORDOMO & SOMMELIER',
        statusText: 'Standing by • Private Line Active',
        estateLocation: estateLocation || 'Aurelia Sanctuary Positano • Cliffside Enclave',
        directPhoneDisplay: '+39 089 875 111',
        avatarUrl: '/limestone-villa.png',
    };
}

// ============================================================================
// 3. MASTER MAPPER FUNCTION
// ============================================================================

/**
 * mapToInscriptionWelcomeData
 *
 * Transforms database user, profile, and assigned majordomo records into strictly typed
 * InscriptionWelcomePageData for the `/register/welcome?folio=AUR-XXXX-S` route.
 */
export function mapToInscriptionWelcomeData(
    user: UserForWelcomeMapper,
    options?: {
        estateOverride?: string;
        customIssueDate?: Date;
        folioOverride?: string;
    }
): InscriptionWelcomePageData {
    const profile = user.profile;

    // 1. Honorific and Names (with defensive fallbacks)
    const patronHonorific =
        user.title?.trim() ||
        'Patron';

    const patronFirstName =
        user.firstName ||
        'Esteemed';

    const patronLastName =
        user.lastName 

    // 2. Sovereign Folio Code (Priority: URL query override -> user folio -> fallback)
    const folioCode =
        options?.folioOverride ||
        user.sovereignKeyNumber ||
        `AUR-${user.id.slice(-4).toUpperCase()}-S`;

    // 3. Tier Presentation & Courtesy Discounts
    const tierMeta = resolveTierPresentation(user.sovereignTier);
    const issuedDateDisplay = formatIssuedMonthYear(options?.customIssueDate || user.createdAt || new Date());
    const expiryDisplay = 'IN PERPETUITY';

    // 4. Cryptographic Protocol Payload for QR & NFC
    const nameParam = `${patronFirstName}-${patronLastName}`.toUpperCase().replace(/\s+/g, '-');
    const qrProtocolPayload = `AURELIA://SOVEREIGN-KEY/${folioCode}/${nameParam}`;

    // 5. Assigned Majordomo Host Resolution & Sanctuary Integration
    const rawMajordomo = user.primaryMajordomo;

    // Resolve sanctuary name from the included relational sanctuary model
    const resolvedSanctuaryName = rawMajordomo?.sanctuary?.name;
    const estateLocationDisplay =
        options?.estateOverride ||
        (resolvedSanctuaryName ? `${resolvedSanctuaryName} • Enclave` : undefined) ||
        'Aurelia Sanctuary Positano • Cliffside Enclave';

    const majordomo: AssignedMajordomo = rawMajordomo
        ? {
              name: rawMajordomo.name,
              roleTag: rawMajordomo.role ? `ASSIGNED ${rawMajordomo.role.toUpperCase()}` : 'ASSIGNED SENIOR MAJORDOMO',
              statusText: rawMajordomo.isActive !== false ? 'Standing by • Private Line Active' : 'Stationed at Enclave',
              estateLocation: estateLocationDisplay,
              directPhoneDisplay: rawMajordomo.phone || '+39 089 875 111',
              avatarUrl: rawMajordomo.avatarUrl || '/limestone-villa.png',
          }
        : resolveDefaultMajordomo(options?.estateOverride);

    // 6. Dynamic Sovereign Entitlements
    const entitlements: EntitlementRule[] = [
        {
            id: 'patron-courtesy',
            discountPercent: tierMeta.discountPercent,
            specificationNote: "Applicable in Positano, Cap d'Antibes, St. Moritz & Kyoto",
        },
        {
            id: 'allocated-majordomo',
            specificationNote: `Senior Majordomo ${majordomo.name} assigned to your docket`,
        },
        {
            id: 'sensory-continuity',
            specificationNote: 'Synchronized via encrypted IoT controllers 2h prior to arrival',
        },
    ];

    // 7. Sovereign Key Pass Sub-Object
    const keyPass: SovereignKeyPassDetails = {
        patronHonorific,
        patronFirstName,
        patronLastName,
        folioCode,
        membershipTierLabel: tierMeta.label,
        membershipTierCode: tierMeta.code,
        issuedDateDisplay,
        expiryDisplay,
        qrProtocolPayload,
    };

    return {
        patronHonorific,
        patronFirstName,
        patronLastName,
        folioCode,
        membershipTierLabel: tierMeta.label,
        membershipTierCode: tierMeta.code,
        issuedDateDisplay,
        expiryDisplay,
        confidentialityLevel: tierMeta.confidentialityLevel,
        keyPass,
        majordomo,
        entitlements,
    };
}

export default mapToInscriptionWelcomeData;
