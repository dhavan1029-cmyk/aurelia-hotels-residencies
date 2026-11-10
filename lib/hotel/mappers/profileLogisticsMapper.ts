import type { Prisma } from '@/app/generated/prisma/client';
import type {
    HistoricalStayArchiveItem,
    LogisticsDetailItem,
    NextSanctuaryReservation,
    ProfileLogisticsData,
    RegisteredCompanion,
} from '@/components/hotel/profile/ProfileLogisticsRail';

// ============================================================================
// 1. PRIMARY INPUT PRISMA CONTRACT (USER AS ROOT ENTITY)
// ============================================================================

export type FullUserWithProfileAndBookings = Prisma.UserGetPayload<{
    include: {
        profile: true;
        primaryMajordomo?: true;
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

export interface ActiveBookingOverride {
    id?: string;
    bookingReference: string;
    sanctuaryName?: string | null;
    sanctuaryCity?: string | null;
    sanctuaryRegion?: string | null;
    suiteTitle?: string | null;
    unitCode?: string | null;
    checkInDate: Date | string;
    checkOutDate: Date | string;
    numberOfNights?: number | null;
    chauffeurDetail?: string | null;
    keylessBadge?: string | null;
    luggageProtocol?: string | null;
}

export interface LogisticsMapperOptions {
    activeBooking?: ActiveBookingOverride | null;
    historicalStays?: HistoricalStayArchiveItem[];
}

type JsonObject = Record<string, unknown>;

// ============================================================================
// 2. DEFENSIVE PARSING & DATE FORMATTING HELPERS
// ============================================================================

function parseJsonArray(val: unknown): unknown[] {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') {
        try {
            const parsed = JSON.parse(val);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }
    return [];
}

function formatDateRange(checkIn: Date | string, checkOut: Date | string): string {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    if (isNaN(inDate.getTime()) || isNaN(outDate.getTime())) {
        return 'Sept 28 — Oct 05, 2025';
    }
    const inMonth = inDate.toLocaleDateString('en-US', { month: 'short' });
    const inDay = inDate.getDate();
    const outMonth = outDate.toLocaleDateString('en-US', { month: 'short' });
    const outDay = outDate.getDate();
    const year = outDate.getFullYear();

    if (inMonth === outMonth) {
        return `${inMonth} ${inDay} — ${outDay}, ${year}`;
    }
    return `${inMonth} ${inDay} — ${outMonth} ${outDay}, ${year}`;
}

function computeCountdownBadge(checkInDate: Date | string): string {
    const target = new Date(checkInDate);
    if (isNaN(target.getTime())) {
        return 'IN 18 DAYS • ARRIVAL CONFIRMED';
    }
    const now = new Date();
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
        return 'IN RESIDENCE • ON PROPERTY';
    }
    if (diffDays === 1) {
        return 'TOMORROW • ARRIVAL PROTOCOL ACTIVE';
    }
    return `IN ${diffDays} DAYS • ARRIVAL CONFIRMED`;
}

// ============================================================================
// 3. MASTER LOGISTICS MAPPER FUNCTION (USER AS INPUT)
// ============================================================================

export function mapToProfileLogisticsData(
    user: FullUserWithProfileAndBookings,
    options: LogisticsMapperOptions = {}
): ProfileLogisticsData {
    const profile = user.profile;

    // 1. Resolve Upcoming / Active Booking from relations or override
    const rawUpcomingBooking = user.bookings?.find(function (b) {
        return b.status === 'CONFIRMED' || b.status === 'CHECKED_IN';
    });

    const activeBooking: ActiveBookingOverride | null =
        options.activeBooking !== undefined
            ? options.activeBooking
            : (rawUpcomingBooking
                  ? {
                        id: rawUpcomingBooking.id,
                        bookingReference: rawUpcomingBooking.bookingReference,
                        sanctuaryName: rawUpcomingBooking.sanctuary?.name,
                        sanctuaryCity: rawUpcomingBooking.sanctuary?.city,
                        sanctuaryRegion: rawUpcomingBooking.sanctuary?.region,
                        suiteTitle: rawUpcomingBooking.accommodationCategory?.name,
                        unitCode: rawUpcomingBooking.roomUnit?.unitCode,
                        checkInDate: rawUpcomingBooking.checkInDate,
                        checkOutDate: rawUpcomingBooking.checkOutDate,
                        numberOfNights: rawUpcomingBooking.numberOfNights,
                        chauffeurDetail: null,
                        keylessBadge: null,
                        luggageProtocol: null,
                    }
                  : null);

    // 2. Build NextSanctuaryReservation only if active booking exists
    let nextSanctuary: NextSanctuaryReservation | null = null;

    if (activeBooking) {
        const bookingRef = activeBooking.bookingReference || 'AUR-8911-POS';
        const checkIn = activeBooking.checkInDate;
        const checkOut = activeBooking.checkOutDate;
        const nights = activeBooking.numberOfNights ?? 7;

        const chauffeurValue =
            activeBooking.chauffeurDetail ||
            'Maybach S680 Rendezvous (Naples Heliport into Coastal Pad)';

        const keylessValue =
            activeBooking.keylessBadge ||
            'Encrypted NFC Keyless Attestation Authorized';

        const luggageValue =
            activeBooking.luggageProtocol ||
            'Direct Unpacking & Steaming via Assigned Senior Majordomo';

        const logisticsItems: LogisticsDetailItem[] = [
            {
                id: 'logistics-chauffeur',
                label: 'Private Diplomatic Transfer',
                value: chauffeurValue,
                statusBadge: 'COORDINATED',
                iconType: 'chauffeur',
            },
            {
                id: 'logistics-keyless',
                label: 'Hardware & Sea-Gate Access',
                value: keylessValue,
                statusBadge: 'NFC ACTIVE',
                iconType: 'keyless',
            },
            {
                id: 'logistics-luggage',
                label: 'Luggage In-Suite Staging',
                value: luggageValue,
                statusBadge: 'CONFIRMED',
                iconType: 'luggage',
            },
        ];

        nextSanctuary = {
            countdownBadge: computeCountdownBadge(checkIn),
            sanctuaryName: activeBooking.sanctuaryName || 'Aurelia Sanctuary Positano',
            enclaveLocation: `${activeBooking.sanctuaryCity || 'Amalfi Coast'} • ${activeBooking.sanctuaryRegion || 'Coastal Cliff Enclave'}`,
            suiteName: activeBooking.suiteTitle || 'The Azure Master Ocean Suite',
            roomUnit: activeBooking.unitCode || 'Suite 402',
            dateRangeDisplay: formatDateRange(checkIn, checkOut),
            nightsCount: nights,
            logistics: logisticsItems,
            itineraryHref: `/confirmation?bookingRef=${encodeURIComponent(bookingRef)}`,
        };
    }

    // 3. Resolve Registered Companions from user.profile JSONB
    const rawCompanions = parseJsonArray(profile?.registeredCompanions);

    const companions: RegisteredCompanion[] =
        rawCompanions.length > 0
            ? rawCompanions.map(function (item, idx) {
                  const comp = (item !== null && typeof item === 'object' ? item : {}) as JsonObject;
                  return {
                      id: String(comp.id || `comp-${idx + 1}`),
                      fullName: String(comp.fullName || 'Registered Co-Patron'),
                      relationshipTag: String(comp.relationshipTag || 'CO-PATRON • FOLIO CLEARANCE'),
                      clearanceLevel: String(
                          comp.clearanceLevel ||
                              'Full Villa Access, Cellar Vault Authorization & Slipway Clearance'
                      ),
                      avatarUrl: String(comp.avatarUrl || '/limestone-villa.png'),
                      avatarAlt: String(
                          comp.avatarAlt || `Portrait of registered companion ${comp.fullName || ''}`
                      ),
                  };
              })
            : [];

    // 4. Resolve Historical Stay Archive Items
    const archiveItems: HistoricalStayArchiveItem[] =
        options.historicalStays && options.historicalStays.length > 0
            ? options.historicalStays
            : [
                  {
                      id: 'stay-hist-01',
                      sanctuaryName: 'Aurelia Sanctuary Positano',
                      chamberName: 'Azure Master Ocean Suite (Suite 402)',
                      dateDisplay: 'Oct 2024 • 5 Nights',
                      folioCode: 'AUR-FOLIO-8911-A',
                      pdfDownloadUrl: '/api/folios/AUR-FOLIO-8911-A/pdf',
                  },
                  {
                      id: 'stay-hist-02',
                      sanctuaryName: 'Higashiyama Onsen Pavilions',
                      chamberName: 'Tamba River-Stone Pavilion 104',
                      dateDisplay: 'Apr 2024 • 4 Nights',
                      folioCode: 'AUR-FOLIO-7814-K',
                      pdfDownloadUrl: '/api/folios/AUR-FOLIO-7814-K/pdf',
                  },
                  {
                      id: 'stay-hist-03',
                      sanctuaryName: 'Engadin Alpine Refuge',
                      chamberName: 'High Moraine Larch Suite 201',
                      dateDisplay: 'Jan 2024 • 7 Nights',
                      folioCode: 'AUR-FOLIO-6210-S',
                      pdfDownloadUrl: '/api/folios/AUR-FOLIO-6210-S/pdf',
                  },
              ];

    return {
        nextSanctuary,
        companions,
        archiveItems,
    };
}