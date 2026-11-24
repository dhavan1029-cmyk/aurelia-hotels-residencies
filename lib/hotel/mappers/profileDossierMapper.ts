import type { Prisma } from '@/app/generated/prisma/client';

import { MajordomoHostInfo, PatronDossierInfo } from '@/components/hotel/profile/ProfileDossierHeader';
import { computeNightsCount, formatDateRange, formatTierMetadata, resolveHostLiaisonByTier } from '@/lib/utils/profileUtils';

// ============================================================================
// 1. PRIMARY INPUT PRISMA CONTRACT (USER AS ROOT ROOT ENTITY)
// ============================================================================

export type FullUserWithProfileAndBookings = Prisma.UserGetPayload<{
    include: {
        profile: true;
        primaryMajordomo: true;
        bookings: {
            include: {
                sanctuary: true;
                accommodationCategory: true;
                roomUnit: true;
                folio: true;
                assignedMajordomo: true;
            };
        };
    };
}>;

// ============================================================================
// 2. SUPPORTING DOMAIN & CONTEXT INTERFACES
// ============================================================================

export interface ActiveBookingContext {
    id: string;
    bookingReference: string;
    checkInDate: Date | string;
    checkOutDate: Date | string;
    numberOfNights?: number | null;
    sanctuaryName?: string | null;
    sanctuaryCity?: string | null;
    sanctuaryRegion?: string | null;
    suiteTitle?: string | null;
    unitCode?: string | null;
    chauffeurDetail?: string | null;
    assignedHostName?: string | null;
    assignedHostRole?: string | null;
}

export interface HistoricalFolioContext {
    folioCode: string;
    datesDisplay: string;
    sanctuaryLocation: string;
    totalInvestmentDisplay: string;
    isPdfReady?: boolean;
}

export interface ProfileMappingContextOptions {
    activeBooking?: ActiveBookingContext | null;
    historicalLedgers?: HistoricalFolioContext[];
    housekeepingAttendantName?: string;
    heroBedroomImageUrl?: string;
    heroBedroomImageAlt?: string;
}

export interface ActiveSanctuaryStayData {
    /**
     * Unique booking reference code (e.g., "AUR-8911-POS")
     * Used for digital QR passes, vouchers, and query param routing.
     */
    bookingReference: string;

    /**
     * Formal display name of the destination enclave (e.g., "Aurelia Sanctuary Positano")
     */
    sanctuaryName: string;

    /**
     * Geographic or enclave descriptor (e.g., "Amalfi Coastline • Tyrrhenian Sea")
     */
    enclaveLocation?: string;

    /**
     * Display title of the reserved suite/villa category (e.g., "The Azure Master Ocean Suite")
     */
    suiteTitle: string;

    /**
     * Assigned physical suite/room unit code (e.g., "Suite 402", "Villa 101")
     */
    unitCode?: string;

    /**
     * Formatted human-readable date horizon (e.g., "Sept 28 — Oct 05, 2025")
     */
    dateRangeDisplay: string;

    /**
     * Formatted duration text (e.g., "7 Nights Horizon", "4 Nights Residency")
     */
    nightsCountDisplay: string;

    /**
     * Number of nights calculated between checkInDate and checkOutDate
     */
    numberOfNights?: number;

    /**
     * Coordinated arrival transfer protocol (e.g., "Maybach S680 Rendezvous (Naples Heliport into Coastal Pad)")
     */
    chauffeurProtocol: string;

    /**
     * Physical and cryptographic hardware clearance status (e.g., "Keyless Sovereign Folio • Biometric NFC")
     */
    sanctuaryAccessMethod: string;

    /**
     * Full name of assigned senior majordomo or resident host (e.g., "Matteo Bellini")
     */
    attendingHostName: string;

    /**
     * Operational title of attending liaison (e.g., "Senior Majordomo & Sommelier")
     */
    attendingHostRole: string;

    /**
     * Direct telephone number for attending majordomo desk (e.g., "+39 089 875 111")
     */
    attendingHostPhone?: string;

    /**
     * Direct link to complete itinerary voucher (e.g., "/confirmation?bookingRef=AUR-8911-POS")
     */
    itineraryHref?: string;
}

export type CellarAllocationStatus =
    | 'STAGED FOR ARRIVAL'
    | 'HELD IN BOND'
    | 'CELLAR EQUILIBRIUM'
    | 'TRANSFERRED TO SUITE';

export type CellarCruCategory =
    | 'SUPER_TUSCAN'
    | 'BURGUNDY_GRAND_CRU'
    | 'CHAMPAGNE_VINTAGE'
    | 'PIEDMONT_BAROLO'
    | 'RESERVE_MINERAL_SPRING';

export interface CellarCruAllocation {
    id: string;
    cruName: string;
    provenance?: string;
    quantityDisplay: string;
    vaultLocation: string;
    allocationStatus: CellarAllocationStatus;
    category?: CellarCruCategory;
    serviceProtocol?: string;
}

export interface SecurityCredentialsData {
    verbalConciergePin: string;
    passkeyStatusText: string;
    passkeyHardwareToken: string;
    confidentialityLevel: string;
    lastAttestationDate?: string;
    emergencyConciergePhone?: string;
}

export interface DossierMapperOptions {
    /**
     * Active/upcoming booking majordomo override if resolved via reservation
     */
    activeBookingMajordomo?: {
        name: string;
        role?: string;
        phone?: string | null;
        avatarUrl?: string | null;
        sanctuaryName?: string;
    } | null;
    confirmedStaysCount?: number;
    activeCellarCount?: number;
}

export interface ProfileExtendedTabsViewModel {
    /**
     * Active upcoming or in-residence booking details.
     * Null when the patron holds no active sanctuary reservations.
     */
    upcomingStay: ActiveSanctuaryStayData | null;
    upcomingStays?: ActiveSanctuaryStayData[];
    /**
     * Array of private cellar crus allocated to this patron folio.
     */
    cellarAllocations: CellarCruAllocation[];
    /**
     * High-assurance voice PIN, biometric hardware tokens, and Swiss privacy disclosures.
     */
    securityData: SecurityCredentialsData;
}

export interface ProfileTabsMapperOptions {
    activeBookingOverride?: {
        bookingReference: string;
        sanctuaryName?: string | null;
        sanctuaryCity?: string | null;
        sanctuaryRegion?: string | null;
        suiteTitle?: string | null;
        unitCode?: string | null;
        checkInDate: Date | string;
        checkOutDate: Date | string;
        numberOfNights?: number | null;
        chauffeurProtocol?: string | null;
        accessMethod?: string | null;
    } | null;
    customCellarAllocations?: CellarCruAllocation[];
    conciergeHotline?: string;
}

// ============================================================================
// 3. HOST LIAISON RESOLVER
// ============================================================================

/**
 * Resolves the majordomo card data based on active booking, permanent attache, or tier default
 */
export function formatMajordomoCard(
    user: FullUserWithProfileAndBookings,
    activeBookingMajordomo?: DossierMapperOptions['activeBookingMajordomo']
): MajordomoHostInfo {
    const tier = (user.sovereignTier || 'EXPLORER').toUpperCase();

    // 1. In-stay active reservation majordomo priority
    if (activeBookingMajordomo) {
        const phone = activeBookingMajordomo.phone || '+39 089 875 111';
        return {
            name: activeBookingMajordomo.name,
            title: activeBookingMajordomo.role === 'MAJORDOMO'
                ? 'Assigned Senior Majordomo & Sommelier'
                : 'Resident Host Liaison',
            statusText: 'Private Line Active',
            locationText: activeBookingMajordomo.sanctuaryName
                ? `${activeBookingMajordomo.sanctuaryName} • On Duty`
                : 'Positano Cliffside Estate',
            phoneDisplay: phone,
            phoneTel: phone.replace(/\s+/g, ''),
            avatarUrl: activeBookingMajordomo.avatarUrl || '/limestone-villa.png',
            avatarAlt: `Portrait of assigned Majordomo ${activeBookingMajordomo.name}`,
        };
    }

    // 2. Permanent personal attaché priority (from user relation)
    if (user.primaryMajordomo) {
        const phone = user.primaryMajordomo.phone || '+39 089 875 999';
        return {
            name: user.primaryMajordomo.name,
            title: 'Personal Intendant & Chief Sommelier',
            statusText: 'Global CIP Line 24/7 Active',
            locationText: 'Sovereign Diplomatic Protocol',
            phoneDisplay: phone,
            phoneTel: phone.replace(/\s+/g, ''),
            avatarUrl: user.primaryMajordomo.avatarUrl || '/limestone-villa.png',
            avatarAlt: `Portrait of Personal Attache ${user.primaryMajordomo.name}`,
        };
    }

    // 3. Explorer Tier fallback (shared central concierge desk)
    if (tier === 'EXPLORER') {
        return {
            name: 'Central Concierge Desk',
            title: 'Resident Guest Liaison',
            statusText: 'Desk Relay Standing By',
            locationText: 'Main Colonnade Portico',
            phoneDisplay: '+39 089 875 000',
            phoneTel: '+39089875000',
            avatarUrl: '/garden-pavillion.png',
            avatarAlt: 'Aurelia Concierge Desk Insignia',
        };
    }

    // 4. Default Sovereign Key flagship estate liaison (Matteo Bellini)
    return {
        name: 'Matteo Bellini',
        title: 'Senior Majordomo & Sommelier',
        statusText: 'Private Line Active',
        locationText: 'Positano Cliffside Estate',
        phoneDisplay: '+39 089 875 111',
        phoneTel: '+39089875111',
        avatarUrl: '/limestone-villa.png',
        avatarAlt: 'Portrait of assigned Senior Majordomo Matteo Bellini',
    };
}

// ============================================================================
// 4. DOSSIER HEADER MAPPER (USER AS INPUT)
// ============================================================================

/**
 * Maps full database User (with included profile and bookings) directly to PatronDossierInfo for the UI
 */
export function mapDossierHeaderData(
    user: FullUserWithProfileAndBookings,
    options: DossierMapperOptions = {}
): PatronDossierInfo {
    const profile = user.profile;

    // Full name and honorific assembly
    const honorific = user.title?.trim() || 'Lady';
    const fullName = `${honorific} ${user.firstName} ${user.lastName}`.trim();

    // Sovereign membership tier and badges
    const { membershipTier, tierBadge } = formatTierMetadata(user.sovereignTier);

    // Provenance subtitle derived dynamically from DB records
    const memberSinceYear = user.createdAt ? new Date(user.createdAt).getFullYear() : 2021;
    const staysCount = user.lifetimeStaysCount ?? 0;
    const confidentiality = profile?.confidentialityLevel || 'Level IV Swiss Banking Privacy Protocol';
    const provenanceNotice = `Active Member since ${memberSinceYear} • ${staysCount} Global Sanctuary Residencies • ${confidentiality}`;

    // Majordomo card resolution
    const majordomo = formatMajordomoCard(user, options.activeBookingMajordomo);

    return {
        fullName,
        folioNumber: user.sovereignKeyNumber,
        membershipTier,
        tierBadge,
        provenanceNotice,
        avatarUrl: user.avatarUrl || '/garden-pavillion.png',
        avatarAlt: `Verified Sovereign Patron ${fullName}`,
        majordomo,
    };
}

// ============================================================================
// 5. EXTENDED TABS MAPPER (USER AS INPUT)
// ============================================================================

/**
 * Maps full database User (with included profile, bookings, and staff) directly
 * into ProfileExtendedTabsViewModel for Tabs 2, 3, and 4.
 */
export function mapProfileExtendedTabsData(
    user: FullUserWithProfileAndBookings,
    options: ProfileTabsMapperOptions = {}
): ProfileExtendedTabsViewModel {
    const profile = user.profile;
    const tier = user.sovereignTier || 'EXPLORER';

    // 1. Resolve All Upcoming / Active Bookings
    const activeBookings = (user.bookings || [])
        .filter(function (b) {
            return (
                b.status === 'CONFIRMED' ||
                b.status === 'CHECKED_IN' ||
                b.status === 'GUARANTEED'
            );
        })
        .sort(function (a, b) {
            const dateA = new Date(a.checkInDate).getTime();
            const dateB = new Date(b.checkInDate).getTime();
            return dateA - dateB;
        });

    let upcomingStays: ActiveSanctuaryStayData[] = [];

    if (options.activeBookingOverride) {
        const override = options.activeBookingOverride;
        const nights = computeNightsCount(
            override.checkInDate,
            override.checkOutDate,
            override.numberOfNights ?? 7
        );
        const host = resolveHostLiaisonByTier(tier, user.primaryMajordomo);

        upcomingStays.push({
            bookingReference: override.bookingReference,
            sanctuaryName: override.sanctuaryName || 'Aurelia Sanctuary Positano',
            enclaveLocation: `${override.sanctuaryCity || 'Positano'} • ${override.sanctuaryRegion || 'Amalfi Coast'}`,
            suiteTitle: override.suiteTitle || 'The Azure Master Ocean Suite',
            unitCode: override.unitCode || 'Suite 402',
            dateRangeDisplay: formatDateRange(override.checkInDate, override.checkOutDate),
            nightsCountDisplay: nights.display,
            numberOfNights: nights.count,
            chauffeurProtocol: override.chauffeurProtocol || 'Maybach S680 Rendezvous (Naples Heliport into Coastal Pad)',
            sanctuaryAccessMethod: override.accessMethod || 'Hardware & Sea-Gate Slipway Clearance Active (Biometric NFC)',
            attendingHostName: host.hostName,
            attendingHostRole: host.hostRole,
            attendingHostPhone: host.phoneDisplay,
            itineraryHref: `/confirmation?bookingRef=${encodeURIComponent(override.bookingReference)}`,
        });
    } else if (activeBookings.length > 0) {
        upcomingStays = activeBookings.map(function (b) {
            const nights = computeNightsCount(
                b.checkInDate,
                b.checkOutDate,
                b.numberOfNights ?? 7
            );
            const assignedStaff = b.assignedMajordomo || user.primaryMajordomo;
            const host = resolveHostLiaisonByTier(tier, assignedStaff);

            return {
                bookingReference: b.bookingReference,
                sanctuaryName: b.sanctuary?.name || 'Aurelia Sanctuary Positano',
                enclaveLocation: `${b.sanctuary?.city || 'Positano'} • ${b.sanctuary?.region || 'Amalfi Coast'}`,
                suiteTitle: b.accommodationCategory?.name || 'The Azure Master Ocean Suite',
                unitCode: b.roomUnit?.unitCode ? `Suite ${b.roomUnit.unitCode}` : 'Suite 402',
                dateRangeDisplay: formatDateRange(b.checkInDate, b.checkOutDate),
                nightsCountDisplay: nights.display,
                numberOfNights: nights.count,
                chauffeurProtocol: 'Maybach S680 Rendezvous (Naples Marina / Heliport into Coastal Pad)',
                sanctuaryAccessMethod: 'Hardware & Sea-Gate Slipway Clearance Active (Biometric NFC)',
                attendingHostName: host.hostName,
                attendingHostRole: host.hostRole,
                attendingHostPhone: host.phoneDisplay,
                itineraryHref: `/confirmation?bookingRef=${encodeURIComponent(b.bookingReference)}`,
            };
        });
    }

    const primaryUpcomingStay = upcomingStays.length > 0 ? upcomingStays[0] : null;

    // 2. Resolve Cellar Allocations
    const preferredCru =
        profile?.preferredChampagneOrCru ||
        "2016 Tenuta dell'Ornellaia Bolgheri Superiore";

    const cellarAllocations: CellarCruAllocation[] =
        options.customCellarAllocations && options.customCellarAllocations.length > 0
            ? options.customCellarAllocations
            : [
                  {
                      id: 'cellar-cru-01',
                      cruName: preferredCru,
                      provenance: 'Tuscan Coast • Cellar Vault Reserve #AUR-2016-ORN',
                      quantityDisplay: '2 Bottles (750ml)',
                      vaultLocation: 'Vault Shelf #AUR-ORN-16',
                      allocationStatus: primaryUpcomingStay ? 'STAGED FOR ARRIVAL' : 'CELLAR EQUILIBRIUM',
                      category: 'SUPER_TUSCAN',
                      serviceProtocol: 'Decanted into mouth-blown Riedel decanter 90m prior • 16.5°C serve',
                  },
                  {
                      id: 'cellar-cru-02',
                      cruName: '2015 Domaine de la Romanée-Conti Échézeaux Grand Cru',
                      provenance: 'Côte de Nuits • Burgundy Grand Cru',
                      quantityDisplay: '1 Bottle (750ml)',
                      vaultLocation: 'Vault Shelf #AUR-DRC-15',
                      allocationStatus: 'HELD IN BOND',
                      category: 'BURGUNDY_GRAND_CRU',
                      serviceProtocol: 'Cellar temperature equilibrium • Staged on request',
                  },
                  {
                      id: 'cellar-cru-03',
                      cruName: '2008 Dom Pérignon Rosé Vintage Brut',
                      provenance: 'Épernay • Champagne Millésimé',
                      quantityDisplay: '3 Bottles (750ml)',
                      vaultLocation: 'Vault Shelf #AUR-DOM-08',
                      allocationStatus: 'HELD IN BOND',
                      category: 'CHAMPAGNE_VINTAGE',
                      serviceProtocol: 'Chilled sub-zero stone credenza staging • 7.0°C serve',
                  },
              ];

    // 3. Resolve Security Credentials
    const pin = profile?.verbalConciergePin || '8829';
    const folioCode = user.sovereignKeyNumber || 'AUR-8911-S';
    const confidentiality =
        profile?.confidentialityLevel ||
        'Level IV Swiss Banking Privacy Protocol';

    const securityData: SecurityCredentialsData = {
        verbalConciergePin: pin,
        passkeyStatusText: 'Apple Sovereign ID Active • FIDO2 WebAuthn',
        passkeyHardwareToken: `#SE-${folioCode}`,
        confidentialityLevel: confidentiality,
        lastAttestationDate: 'Authenticated at induction • In Perpetuity',
        emergencyConciergePhone: options.conciergeHotline || '+39 089 875 111',
    };

    return {
        upcomingStay: primaryUpcomingStay,
        upcomingStays,
        cellarAllocations,
        securityData,
    };
}

