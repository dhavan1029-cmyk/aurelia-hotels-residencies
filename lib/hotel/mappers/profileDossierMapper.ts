import type { Prisma } from '@/app/generated/prisma/client';

import { MajordomoHostInfo, PatronDossierInfo } from '@/components/hotel/profile/ProfileDossierHeader';

export type FullGuestProfileWithUserAndBookings = Prisma.GuestProfileGetPayload<{
    include: {
        user: {
            include: {
                primaryMajordomo?: true;
                bookings: {
                    include: {
                        sanctuary: true;
                        accommodationCategory: true;
                        roomUnit: true;
                        folio: true;
                    };
                };
            };
        };
    };
}>;


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

/**
 * Formats Sovereign membership tier and badge according to the database enum
 */
export function formatTierMetadata(sovereignTier?: string | null): {
    membershipTier: string;
    tierBadge: string;
} {
    const tier = (sovereignTier || 'EXPLORER').toUpperCase();

    if (tier === 'IMPERIAL_HONORARY') {
        return {
            membershipTier: 'SOVEREIGN PATRON • IMPERIAL HONORARY',
            tierBadge: 'Imperial Honorary Fellow',
        };
    }

    if (tier === 'SOVEREIGN_KEY') {
        return {
            membershipTier: 'SOVEREIGN PATRON • TIER I',
            tierBadge: 'Tier I Sovereign Fellow',
        };
    }

    return {
        membershipTier: 'RESIDENT PATRON • EXPLORER TIER',
        tierBadge: 'Explorer Circle',
    };
}

/**
 * Resolves the majordomo card data based on active booking, permanent attache, or tier default
 */
export function formatMajordomoCard(
    user: FullGuestProfileWithUserAndBookings['user'],
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

/**
 * Maps full database GuestProfile and User models to PatronDossierInfo for the UI
 */
export function mapDossierHeaderData(
    guestProfile: FullGuestProfileWithUserAndBookings,
    options: DossierMapperOptions = {}
): PatronDossierInfo {
    const user = guestProfile.user;

    // Full name and honorific assembly
    const honorific = user.title?.trim() || 'Lady';
    const fullName = `${honorific} ${user.firstName} ${user.lastName}`.trim();

    // Sovereign membership tier and badges
    const { membershipTier, tierBadge } = formatTierMetadata(user.sovereignTier);

    // Provenance subtitle derived dynamically from DB records
    const memberSinceYear = user.createdAt ? new Date(user.createdAt).getFullYear() : 2021;
    const staysCount = user.lifetimeStaysCount ?? 0;
    const confidentiality = guestProfile.confidentialityLevel || 'Level IV Swiss Banking Privacy Protocol';
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
