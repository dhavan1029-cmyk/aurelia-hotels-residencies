import { getCurrencySymbol, CurrencyCode } from '@/lib/data/currencyCatalog';
import type {
    ConfirmationHeroData,
    SanctuaryPanoramaLocation,
} from '@/components/hotel/confirmation/ConfirmationHeaderAndHero';
import type {
    SovereignVoucherCardData,
    VoucherStayDates,
    VoucherInclusion,
    VoucherFolioAccounting,
    ResidenceHostLiaison,
} from '@/components/hotel/confirmation/SovereignVoucherCard';
import type {
    DynamicArrivalCalibrationData,
    HarborPickupPoint,
} from '@/components/hotel/confirmation/ArrivalSensoryCalibrationSection';
import type {
    ArrivalCoordinatesData,
    SanctuaryEnclaveCoordinates,
    TransitAccessMethod,
    DedicatedConciergeDesk,
} from '@/components/hotel/confirmation/ArrivalCoordinatesAndConciergeSection';

// ============================================================================
// 1. EXACT DATABASE CONTRACTS (MATCHING PRODUCTION PRISMA SHAPES)
// ============================================================================

export type BookingStatus =
    | 'PENDING_PAYMENT'
    | 'CONFIRMED'
    | 'CHECKED_IN'
    | 'CHECKED_OUT'
    | 'CANCELLED'
    | 'NO_SHOW'
    | 'GUARANTEED';

export type LineItemType =
    | 'ROOM_STAY'
    | 'EXPERIENCE'
    | 'WELLNESS_SPA'
    | 'TRANSFER'
    | 'GASTRONOMY'
    | 'CELLAR_ALLOCATION'
    | 'CUSTOM_FEE';

export type PaymentFolioStatus =
    | 'OPEN'
    | 'AUTHORIZED_HOLD'
    | 'SETTLED'
    | 'PARTIALLY_REFUNDED'
    | 'REFUNDED';

export interface DbSanctuaryArrivalGuide {
    docking?: string;
    heliportCoords?: string;
    nearestAirport?: string;
}

export interface DbSanctuaryMediaData {
    gallery?: string[];
    heroImage?: string;
}

export interface DbSanctuaryPayload {
    id: string;
    slug: string;
    code: string;
    name: string;
    tagline?: string | null;
    city: string;
    region?: string | null;
    country: string;
    latitude?: number | null;
    longitude?: number | null;
    mapUrl?: string | null;
    timezone?: string | null;
    currency?: string | null;
    status?: string | null;
    contactEmail?: string | null;
    contactPhone?: string | null;
    mediaData?: DbSanctuaryMediaData | null;
    arrivalGuide?: DbSanctuaryArrivalGuide | null;
}

export interface DbAccommodationCategoryMediaData {
    gallery?: string[];
    heroImage?: string;
}

export interface DbAccommodationCategoryPayload {
    id: string;
    sanctuaryId: string;
    slug: string;
    name: string;
    category?: string | null;
    tagline?: string | null;
    squareMeters?: number | null;
    squareFeet?: number | null;
    maxOccupancy?: number | null;
    bedroomsCount?: number | null;
    bathroomsCount?: number | null;
    bedConfiguration?: string | null;
    viewOrientation?: string | null;
    basePriceNightly?: number | null;
    currency?: string | null;
    cleaningFee?: number | null;
    cityTaxPerGuest?: number | null;
    vatRate?: number | null;
    minStayNights?: number | null;
    mediaData?: DbAccommodationCategoryMediaData | null;
    privileges?: string[] | null;
    amenityTags?: string[] | null;
}

export interface DbRoomUnitPayload {
    id: string;
    sanctuaryId: string;
    accommodationId: string;
    unitCode: string;
    floorLevel?: string | null;
    wing?: string | null;
    status?: string | null;
    isOccupied?: boolean | null;
}

export interface DbAssignedMajordomoPayload {
    id: string;
    sanctuaryId?: string | null;
    name: string;
    role?: string | null;
    email?: string | null;
    phone?: string | null;
    isActive?: boolean | null;
    avatarUrl?: string | null;
}

export interface DbFolioPaymentPayload {
    id: string;
    note?: string | null;
    type?: string | null;
    amount: number;
    status?: string | null;
    authCode?: string | null;
    timestamp?: string | null;
}

export interface DbFolioPayload {
    id: string;
    bookingId: string;
    status: PaymentFolioStatus | string;
    currency: string;
    paymentMethodType?: string | null;
    cardBrand?: string | null;
    cardLast4?: string | null;
    gatewayReferenceId?: string | null;
    payments?: DbFolioPaymentPayload[] | null;
}

export interface DbLineItemPayload {
    id: string;
    bookingId: string;
    itemType: LineItemType | string;
    title: string;
    description?: string | null;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    currency: string;
    experienceId?: string | null;
    scheduledDate?: Date | string | null;
    scheduledTime?: string | null;
    durationMinutes?: number | null;
}

export interface DbUserPayload {
    id: string;
    email: string;
    phoneNumber?: string | null;
    title?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    avatarUrl?: string | null;
    role?: string | null;
    sovereignTier?: string | null;
    sovereignKeyNumber?: string | null;
    lifetimeStaysCount?: number | null;
    lifetimeSpendTotal?: number | null;
    nationality?: string | null;
    phoneCountryIso?: string | null;
}

export interface DbBookingPayload {
    id: string;
    bookingReference: string;
    userId?: string | null;
    sanctuaryId: string;
    accommodationId: string;
    roomUnitId?: string | null;
    checkInDate: Date | string;
    checkOutDate: Date | string;
    numberOfNights: number;
    adultsCount: number;
    childrenCount?: number | null;
    specialRequests?: string | null;
    status: BookingStatus | string;
    currency: string;
    roomNightlyTotal: number;
    experiencesTotal?: number | null;
    taxesAndServiceTotal: number;
    cityTaxTotal: number;
    grandTotal: number;
    depositPaid?: number | null;
    balanceDueAtCheckIn?: number | null;
    qrCodeData?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    assignedMajordomoId?: string | null;
    guestTitle?: string | null;
    guestFirstName?: string | null;
    guestLastName?: string | null;
    guestEmail?: string | null;
    guestPhone?: string | null;
    guestCountryIso?: string | null;
    accompanyingGuestName?: string | null;
    selectedArrivalWindowId?: string | null;
    transportDesignation?: string | null;
    dietaryAndCellarNuances?: string | null;
    selectedPillowId?: string | null;
    targetTemperatureCelsius?: number | null;
    sovereignDiscountTotal?: number | null;
    voucherCodeApplied?: string | null;
    user?: DbUserPayload | null;
    roomUnit?: DbRoomUnitPayload | null;
    accommodationCategory?: DbAccommodationCategoryPayload | null;
    assignedMajordomo?: DbAssignedMajordomoPayload | null;
    folio?: DbFolioPayload | null;
    lineItems?: DbLineItemPayload[] | null;
    sanctuary?: DbSanctuaryPayload | null;
}

// ============================================================================
// 2. HELPER UTILITIES
// ============================================================================

export function formatFullWeekdayDate(dateInput: Date | string | null | undefined): string {
    if (!dateInput) return 'Unspecified Date';
    const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) return String(dateInput);

    return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function normalizeCardBrand(rawBrand?: string | null): string {
    if (!rawBrand) return 'Sovereign Key Card';
    const b = rawBrand.toUpperCase();
    if (b.includes('CENTURION') || b.includes('AMEX')) return 'Amex Centurion';
    if (b.includes('VISA_INFINITE')) return 'Visa Infinite';
    if (b.includes('VISA')) return 'Visa';
    if (b.includes('MASTERCARD')) return 'Mastercard World Elite';
    return rawBrand;
}

// ============================================================================
// 3. MAPPER: SECTION 1 (ConfirmationHeaderAndHero)
// ============================================================================

export function mapBookingToConfirmationHero(booking: DbBookingPayload): ConfirmationHeroData {
    const sanctuary = booking.sanctuary;
    const estateName = sanctuary?.name || 'Aurelia Sanctuary Positano';
    const streetAddress = sanctuary?.city && sanctuary?.country
        ? `${sanctuary.city}, ${sanctuary.region || ''} ${sanctuary.country}`
        : 'Positano, Amalfi Coast, Italy';

    // Room Unit Code Resolution
    let suiteUnitBadge = 'Sanctuary Suite';
    if (booking.roomUnit?.unitCode) {
        const code = booking.roomUnit.unitCode;
        suiteUnitBadge = isNaN(Number(code)) ? `Villa ${code}` : `Suite ${code}`;
    }

    const marineAccessBadge = booking.transportDesignation?.toLowerCase().includes('helicopter')
        ? 'Private Helipad Access'
        : 'Private Riva Access';

    const heroImageUrl =
        booking.accommodationCategory?.mediaData?.heroImage ||
        booking.sanctuary?.mediaData?.heroImage ||
        '/suite-402.png';

    const heroImageAlt = `${estateName} — ${booking.accommodationCategory?.name || 'Curated Sanctuary'}`;

    const panorama: SanctuaryPanoramaLocation = {
        estateName,
        streetAddress,
        suiteUnitBadge,
        marineAccessBadge,
        heroImageUrl,
        heroImageAlt,
    };

    const isConfirmed =
        booking.status === 'CONFIRMED' ||
        booking.status === 'GUARANTEED' ||
        booking.status === 'CHECKED_IN';

    const locationCityName = sanctuary?.city || 'Positano';

    return {
        isConfirmed,
        locationCityName,
        bookingReference: booking.bookingReference,
        panorama,
        appleWalletPassUrl: `/api/passes/${encodeURIComponent(booking.bookingReference)}.pkpass`,
        itineraryPdfUrl: `/api/documents/itinerary-${encodeURIComponent(booking.bookingReference)}.pdf`,
        calendarIcsUrl: `/api/calendar/${encodeURIComponent(booking.bookingReference)}.ics`,
        printFolioUrl: `/folio/print?ref=${encodeURIComponent(booking.bookingReference)}`,
    };
}

// ============================================================================
// 4. MAPPER: SECTION 2 (SovereignVoucherCard)
// ============================================================================

export function mapBookingToSovereignVoucher(booking: DbBookingPayload): SovereignVoucherCardData {
    const currency = (booking.currency || 'EUR') as CurrencyCode;
    const currencySymbol = getCurrencySymbol(currency);
    const nights = Math.max(1, booking.numberOfNights || 1);
    const guests = Math.max(1, booking.adultsCount || 2);

    const suiteTariffTotal = booking.roomNightlyTotal || (booking.accommodationCategory?.basePriceNightly || 3450) * nights;
    const cityTaxAndResortDues = booking.cityTaxTotal || 5 * guests * nights;
    const hospitalityVatPercentage = booking.accommodationCategory?.vatRate || 10;
    const hospitalityVatAmount = booking.taxesAndServiceTotal || Math.round((suiteTariffTotal * hospitalityVatPercentage) / 100);
    const grandTotal = booking.grandTotal || suiteTariffTotal + cityTaxAndResortDues + hospitalityVatAmount;

    const isSettled =
        booking.status === 'GUARANTEED' ||
        booking.status === 'CONFIRMED' ||
        booking.folio?.status === 'AUTHORIZED_HOLD' ||
        booking.folio?.status === 'SETTLED';

    // Unit Badge Resolution
    let unitBadge = 'Suite Docket';
    if (booking.roomUnit?.unitCode) {
        const code = booking.roomUnit.unitCode;
        unitBadge = isNaN(Number(code)) ? `Villa ${code}` : `Suite ${code}`;
    }

    const stay: VoucherStayDates = {
        suiteTitle: booking.accommodationCategory?.name || 'The Azure Master Ocean Suite',
        suiteUnitBadge: unitBadge,
        viewOrientation: booking.accommodationCategory?.viewOrientation || 'Panoramic Ocean View',
        squareMeters: booking.accommodationCategory?.squareMeters || 185,
        checkInDate: formatFullWeekdayDate(booking.checkInDate),
        checkOutDate: formatFullWeekdayDate(booking.checkOutDate),
        nightsCount: nights,
        guestsCount: guests,
    };

    // Curated Inclusions derived from dynamic LineItems (Experiences) and Accommodation Privileges
    const inclusions: VoucherInclusion[] = [];

    if (booking.lineItems && Array.isArray(booking.lineItems)) {
        for (let i = 0; i < booking.lineItems.length; i++) {
            const item = booking.lineItems[i];
            if (item.itemType === 'EXPERIENCE' || item.itemType === 'WELLNESS_SPA' || item.itemType === 'TRANSFER') {
                inclusions.push({
                    id: item.id || `exp-item-${i}`,
                    title: item.title,
                    description: item.description || 'Curated residential enclave experience addition.',
                });
            }
        }
    }

    if (booking.accommodationCategory?.privileges && Array.isArray(booking.accommodationCategory.privileges)) {
        for (let i = 0; i < booking.accommodationCategory.privileges.length; i++) {
            const priv = booking.accommodationCategory.privileges[i];
            inclusions.push({
                id: `privilege-${i + 1}`,
                title: priv,
                description: 'Included complimentary privilege under active Sovereign Folio docket.',
            });
        }
    }

    // Baseline fallback if no items or privileges exist
    if (inclusions.length === 0) {
        inclusions.push(
            {
                id: 'riva-transfer',
                title: 'Private Riva Yacht Harbor Transfer',
                description: 'Direct maritime tender from regional slipway to private Aurelia water gate.',
            },
            {
                id: 'majordomo-service',
                title: '24-Hour Residential Majordomo',
                description: 'Continuous private butler attention, unpacking ceremony, and sommelier consultations.',
            }
        );
    }

    // Host Resolution
    const majordomo = booking.assignedMajordomo;
    const assignedHost: ResidenceHostLiaison = {
        name: majordomo?.name || 'Matteo Moretti',
        title: majordomo?.role === 'SOMMELIER' ? 'Head Sommelier & Sanctuary Host' : 'Senior Residential Majordomo',
        avatarUrl: majordomo?.avatarUrl || '/garden-pavillion.png',
    };

    // Payment Card Info
    const cardLastFour = booking.folio?.cardLast4 || '8829';
    const cardIssuer = normalizeCardBrand(booking.folio?.cardBrand);

    const accounting: VoucherFolioAccounting = {
        currencySymbol,
        currencyCode: currency,
        suiteTariffTotal,
        cityTaxAndResortDues,
        hospitalityVatPercentage,
        hospitalityVatAmount,
        grandTotal,
        isSettled,
        vatInvoiceNumber: `INV-${booking.bookingReference}`,
    };

    return {
        cardLastFour,
        cardIssuer,
        stay,
        inclusions,
        assignedHost,
        accounting,
    };
}

// ============================================================================
// 5. MAPPER: SECTION 3 (ArrivalSensoryCalibrationSection)
// ============================================================================

export function mapBookingToArrivalCalibration(booking: DbBookingPayload): DynamicArrivalCalibrationData {
    const city = booking.sanctuary?.city || 'Positano';

    const customHarbors: HarborPickupPoint[] = [
        {
            id: 'mergellina-naples',
            name: `${city} Central Marina (Pier 4)`,
            dockLocation: 'Direct rendezvous opposite VIP maritime slipway',
        },
        {
            id: 'molo-beverello',
            name: `${city} Private Tender Dock`,
            dockLocation: 'VIP terminal with direct chauffeur luggage transfer',
        },
        {
            id: 'capri-marina-grande',
            name: 'Capri Marina Grande (Quay B)',
            dockLocation: 'Private yacht tender pontoon beside Yacht Club Capri',
        },
    ];

    return {
        bookingReference: booking.bookingReference,
        checkInDateDisplay: formatFullWeekdayDate(booking.checkInDate),
        defaultBeverageId: 'franciacorta-brut',
        defaultOlfactoryId: 'wild-fig-bitter-orange',
        defaultHarborId: 'mergellina-naples',
        defaultTimeSlotId: booking.selectedArrivalWindowId === 'window-sunset' ? 'slot-1700' : 'slot-1400',
        customHarbors,
    };
}

// ============================================================================
// 6. MAPPER: SECTION 4 (ArrivalCoordinatesAndConciergeSection)
// ============================================================================

export function mapBookingToArrivalCoordinates(booking: DbBookingPayload): ArrivalCoordinatesData {
    const sanctuary = booking.sanctuary;
    const estateName = sanctuary?.name || 'Aurelia Sanctuary Positano';
    const streetAddress = `${sanctuary?.city || 'Positano'}, ${sanctuary?.region || 'Amalfi Coast'}`;
    const locality = `${sanctuary?.city || 'Positano'}, ${sanctuary?.region || 'Amalfi Coast'} (${sanctuary?.country || 'Italy'})`;
    const postalCode = '84017';
    const country = sanctuary?.country || 'Italy';

    const lat = sanctuary?.latitude ? `${sanctuary.latitude.toFixed(4)}°N` : '40.6281°N';
    const lng = sanctuary?.longitude ? `${sanctuary.longitude.toFixed(4)}°E` : '14.4850°E';
    const elevation = '185m Above Mean Sea Level';
    const vhf = 'VHF Ch. 74 (Aurelia Water Gate)';

    const coordinates: SanctuaryEnclaveCoordinates = {
        estateName,
        streetAddress,
        locality,
        postalCode,
        country,
        latitude: lat,
        longitude: lng,
        elevation,
        marineVhfChannel: vhf,
        satelliteMapImageUrl: sanctuary?.mediaData?.heroImage || '/images/maps/positano-enclave-satellite.jpg',
        satelliteMapAlt: `Satellite map of ${estateName}`,
    };

    const majordomo = booking.assignedMajordomo;
    const conciergeDesk: DedicatedConciergeDesk = {
        title: '24-Hour Residential Concierge Desk',
        subtitle: 'Direct encrypted line for immediate itinerary calibrations, dining, and harbor transfers.',
        liaisonName: majordomo?.name || 'Matteo Moretti',
        liaisonRole: majordomo?.role === 'SOMMELIER' ? 'Head Sommelier & Sanctuary Liaison' : 'Head Majordomo & Portico Liaison',
        liaisonAvatarUrl: majordomo?.avatarUrl || '/garden-pavillion.png',
        directHotlineDisplay: majordomo?.phone || sanctuary?.contactPhone || '+39 089 875 111',
        directHotlineTel: (majordomo?.phone || sanctuary?.contactPhone || '+39089875111').replace(/\s+/g, ''),
        secureEmail: majordomo?.email || sanctuary?.contactEmail || 'concierge.positano@aureliahotels.com',
        hoursNotice: 'Continuous standing watch across all European & Atlantic timezones.',
        encryptionBadge: '256-BIT ENCRYPTED CONCIERGE HOTLINE',
    };

    const transitMethods: TransitAccessMethod[] = [
        {
            id: 'marine-tender',
            title: sanctuary?.arrivalGuide?.docking || 'Private Riva Maritime Slipway',
            distanceOrHorizon: '45 Min from Naples Mergellina',
            description: 'Direct deep-water private tender pontoon. Luggage valet boarding at slipway level.',
            badge: 'RECOMMENDED',
            iconType: 'marine',
        },
        {
            id: 'heliport-transit',
            title: 'Estate Clifftop Heliport',
            distanceOrHorizon: sanctuary?.arrivalGuide?.heliportCoords || '15 Min Flight from Naples (NAP)',
            description: 'Private clifftop landing clearance followed by dedicated Aurelia chauffeur transfer.',
            badge: 'VIP HELIPAD',
            iconType: 'heliport',
        },
        {
            id: 'airport-chauffeur',
            title: 'Executive Chauffeur Transfer',
            distanceOrHorizon: `Direct from ${sanctuary?.arrivalGuide?.nearestAirport || 'Naples International (NAP)'}`,
            description: 'Mercedes-Maybach or V-Class direct from airport terminal or private hangar.',
            badge: 'PRIVATE FLEET',
            iconType: 'chauffeur',
        },
    ];

    const mapsUrl = sanctuary?.mapUrl || (sanctuary?.latitude && sanctuary?.longitude
        ? `https://maps.google.com/?q=${sanctuary.latitude},${sanctuary.longitude}`
        : 'https://maps.google.com/?q=40.6281,14.4850');

    return {
        sectionEyebrow: 'ENCLAVE ACCESS & LIAISON',
        heading: 'Geographic Coordinates & Arrival Protocol',
        subheading: `Accessing ${estateName} via maritime tender, private heliport, or executive motorcoach.`,
        coordinates,
        transitMethods,
        conciergeDesk,
        downloadDirectionsPdfUrl: `/api/documents/directions-${encodeURIComponent(booking.bookingReference)}.pdf`,
        googleMapsDirectionsUrl: mapsUrl,
    };
}

export default mapBookingToConfirmationHero