import { notFound } from 'next/navigation';
import { prisma } from '@/lib/config/prisma';
import CheckoutPage from '@/components/pages/hotel/CheckoutPage';
import { confirmReservationAction } from '@/lib/hotel/actions/checkout';
import { getAuthenticatedUser } from '@/lib/hotel/actions/auth';
import type { AccommodationBookingContext } from '@/lib/hotel/mappers/AccommodationDetailsMapper';
// import type { CountryIsoCode } from '@/components/hotel/auth/countryPhoneCatalog';
import {
    ArrivalWindowOption,
    PatronFormData,
    PatronSectionData,
} from '@/components/hotel/checkout/PatronAndLogistics';
import {
    AddOnCategoryType,
    AddOnItem,
    ComfortAndAddOnsData,
    PillowOption,
    SovereignVoucherData,
} from '@/components/hotel/checkout/ComfortAndAddOns';
import { CheckoutHeaderData } from '@/components/hotel/checkout/Header';
import {
    FolioStayDetails,
    PatronHostOnDuty,
} from '@/components/hotel/checkout/CheckoutFolioRail';
import type { CheckoutInteractiveInitialData } from '@/components/hotel/checkout/CheckoutInteractive';
import { CurrencyCode, getCurrencySymbol } from '@/lib/data/currencyCatalog';
import { CountryIso2 } from '@/lib/data/phoneValidator';
// import { CurrencyCode, getCurrencySymbol } from '@/data/currencyCatalog';

export const metadata = {
    title: 'Bespoke Guest Checkout & Sovereign Reservation | Aurelia Hotels & Residences',
    description:
        'Complete encrypted sanctuary reservation, diplomatic harbor arrival coordination, and bespoke comfort calibrations for Aurelia Hotels & Residences.',
};

// ============================================================================
// STATIC LUXURY DATA CONFIGURATIONS
// ============================================================================

const DEFAULT_ARRIVAL_WINDOWS: ArrivalWindowOption[] = [
    {
        id: 'window-standard',
        badge: 'STANDARD SANCTUARY CHECK-IN',
        timeRange: '15:00 — 18:00',
        description: 'Majordomo reception in the cloistered courtyard with chilled Amalfi limoncello.',
        iconType: 'early',
    },
    {
        id: 'window-sunset',
        badge: 'GOLDEN HOUR DUSK RECEPTION',
        timeRange: '18:00 — 21:00',
        description: 'Direct cliffside escort with candlelight terrace staging and aperitivo service.',
        iconType: 'sunset',
    },
    {
        id: 'window-charter',
        badge: 'DIPLOMATIC / PRIVATE HARBOR ARRIVAL',
        timeRange: '21:00 — 02:00',
        description: 'Private Riva tender disembarkation and silent suite escort with minimal formality.',
        iconType: 'charter',
    },
];

const DEFAULT_PILLOW_OPTIONS: PillowOption[] = [
    {
        id: 'bespoke-goose-down',
        title: 'Bespoke Goose Down & Silk Casing',
        description: 'Triple-chambered Hungarian goose down wrapped in pure mulberry silk.',
        badge: 'SIGNATURE BASELINE',
        loftTag: 'ULTRA-SOFT • ORGANIC',
    },
    {
        id: 'organic-latex-wool',
        title: 'Organic Botanical Latex & Alpine Wool',
        description: 'Dual-density natural Talalay core with thermo-regulating virgin merino wool.',
        badge: 'ANATOMICAL SUPPORT',
        loftTag: 'MEDIUM CONTOUR • BREATHABLE',
    },
    {
        id: 'mulberry-silk-fill',
        title: 'Mulberry Silk Floss & Sea Salt Gel',
        description: 'Layered long-strand silk fiber infused with cooling crystalline sea minerals.',
        badge: 'DERMAL CELLULAR CALM',
        loftTag: 'CHILLED • HYPOALLERGENIC',
    },
];

function mapToCategoryType(categoryStr?: string | null): AddOnCategoryType {
    switch (categoryStr) {
        case 'MARINE_CHARTER':
            return 'NAUTICAL_CHARTER';
        case 'THERMAL_WELLNESS':
            return 'WELLNESS_SPA';
        case 'FINE_DINING':
            return 'GASTRONOMY';
        case 'WINE_TASTING':
            return 'ENOLOGY';
        case 'CULTURAL_HERITAGE':
            return 'TERROIR_CRAFT';
        case 'PRIVATE_TRANSFER':
            return 'BESPOKE_TRANSFER';
        default:
            return 'CELLAR_PROVISION';
    }
}

function normalizeIsoDateString(rawDate?: string | null): string {
    if (!rawDate) return '';
    const clean = rawDate.trim();
    const isoPattern = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/;
    if (!isoPattern.test(clean)) {
        return '';
    }
    return clean;
}

function calculateNights(startIso: string, endIso: string): number {
    if (!startIso || !endIso) return 0;
    try {
        const [sy, sm, sd] = startIso.split('-').map(Number);
        const [ey, em, ed] = endIso.split('-').map(Number);
        const start = new Date(sy, sm - 1, sd);
        const end = new Date(ey, em - 1, ed);
        const diffTime = end.getTime() - start.getTime();
        const nights = Math.round(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(1, nights);
    } catch {
        return 0;
    }
}

function addDaysToIsoDate(isoDate: string, daysToAdd: number): string {
    const [y, m, d] = isoDate.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + daysToAdd);
    const ny = date.getFullYear();
    const nm = String(date.getMonth() + 1).padStart(2, '0');
    const nd = String(date.getDate()).padStart(2, '0');
    return `${ny}-${nm}-${nd}`;
}

// ============================================================================
// SERVER COMPONENT CONTROLLER
// ============================================================================

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{
        sanctuary?: string;
        accommodation?: string;
        suite?: string;
        slug?: string;
        checkInDate?: string;
        checkIn?: string;
        checkOutDate?: string;
        checkOut?: string;
        nights?: string;
        nightsCount?: string;
        adults?: string;
        guests?: string;
        guestsCount?: string;
        currency?: string;
    }>;
}) {
    const params = await searchParams;

    // 1. Resolve Authenticated Patron
    const authenticatedUser = await getAuthenticatedUser({ lightweight: false });
    const profile = authenticatedUser?.profile || null;
    const isAuthenticated = !!authenticatedUser;

    // 2. Resolve Suite & Sanctuary Slugs
    const suiteSlug =
        params.accommodation ||
        params.suite ||
        params.slug ||
        'azure-master-ocean-suite';

    const sanctuaryQuery = params.sanctuary
        ? { slug: params.sanctuary }
        : {
              accommodations: {
                  some: {
                      slug: suiteSlug,
                  },
              },
          };

    const sanctuary = await prisma.sanctuary.findFirst({
        where: sanctuaryQuery,
        include: {
            accommodations: true,
            experiences: true,
            staff: {
                where: {
                    OR: [
                        { role: { equals: 'MAJORDOMO' } },
                        { role: { equals: 'SOMMELIER' } },
                    ],
                },
                take: 1,
            },
        },
    });

    if (!sanctuary) {
        notFound();
    }

    const selectedAccommodation =
        sanctuary.accommodations.find(function (acc) {
            return acc.slug === suiteSlug;
        }) || sanctuary.accommodations[0];

    if (!selectedAccommodation) {
        notFound();
    }

    const hostStaff = sanctuary.staff[0];

    // 3. Normalize Currency via currencyCatalog
    const rawCurrency = params.currency || sanctuary.currency || selectedAccommodation.currency;
    const currencyCode = rawCurrency.trim().toUpperCase() as CurrencyCode;
    const currencySymbol = getCurrencySymbol(currencyCode);

    console.log(selectedAccommodation.currency, sanctuary.currency, 'checkout page selectedAccommodation.currency, sanctuary.currency');

    // 4. Normalize & Compute Strict Dates ('YYYY-MM-DD'), Nights & Party Occupancy
    const rawCheckIn = params.checkInDate || params.checkIn || '';
    const rawCheckOut = params.checkOutDate || params.checkOut || '';

    let checkInDateStr = normalizeIsoDateString(rawCheckIn);
    let checkOutDateStr = normalizeIsoDateString(rawCheckOut);

    if (!checkInDateStr) {
        const fallbackArrival = new Date();
        fallbackArrival.setDate(fallbackArrival.getDate() + 30);
        const y = fallbackArrival.getFullYear();
        const m = String(fallbackArrival.getMonth() + 1).padStart(2, '0');
        const d = String(fallbackArrival.getDate()).padStart(2, '0');
        checkInDateStr = `${y}-${m}-${d}`;
    }

    let nightsCount = 5;
    if (checkInDateStr && checkOutDateStr) {
        const diff = calculateNights(checkInDateStr, checkOutDateStr);
        if (diff > 0) {
            nightsCount = diff;
        } else {
            checkOutDateStr = addDaysToIsoDate(checkInDateStr, 5);
            nightsCount = 5;
        }
    } else {
        const rawNights = params.nightsCount || params.nights;
        if (rawNights && !isNaN(Number(rawNights))) {
            nightsCount = Math.max(1, parseInt(rawNights, 10));
        }
        checkOutDateStr = addDaysToIsoDate(checkInDateStr, nightsCount);
    }

    const rawGuests = params.guestsCount || params.guests || params.adults;
    const adultsCount = rawGuests && !isNaN(Number(rawGuests)) ? Math.max(1, parseInt(rawGuests, 10)) : 2;
    const nightlyRate = selectedAccommodation.basePriceNightly || 3450;

    // 5. Map Add-On Experiences with Dynamic Currency
    const addOnOptions: AddOnItem[] = sanctuary.experiences.map(function (exp) {
        const itemType = mapToCategoryType(exp.category);
        const isRiva = exp.slug.includes('riva') || itemType === 'NAUTICAL_CHARTER';
        const isSpa = exp.slug.includes('spa') || exp.slug.includes('caldarium') || itemType === 'WELLNESS_SPA';

        return {
            id: exp.id,
            itemType,
            categoryGroup: itemType === 'BESPOKE_TRANSFER' ? 'ARRIVAL_LOGISTICS' : 'SIGNATURE_EXPERIENCE',
            badge: exp.tagline || (isRiva ? 'EXCLUSIVE MARITIME' : isSpa ? 'SUBTERRANEAN THERMAL' : 'CURATED ENCOUNTER'),
            title: exp.title,
            description: exp.tagline || 'Bespoke tailored immersion curated by the resident majordomo.',
            price: exp.pricePerPerson,
            currencyCode,
            currencySymbol,
            pricingUnit: 'per party',
            durationOrSchedule: exp.durationMinutes ? `${exp.durationMinutes} MIN` : '120 MIN',
            defaultSelected: isRiva || isSpa,
            isPriorityRecommendation: isRiva || isSpa,
        };
    });

    // 6. Build Header Section Data
    const userFullName = authenticatedUser
        ? `${authenticatedUser.title ? authenticatedUser.title + ' ' : ''}${authenticatedUser.firstName} ${authenticatedUser.lastName}`.trim()
        : '';

    const headerData: CheckoutHeaderData = {
        currencySymbol,
        currencyCode,
        conciergePhone: hostStaff?.phone || '+39 089 875 111',
        sanctuaryFolioCode: authenticatedUser?.sovereignKeyNumber || 'AUR-SVR-FOLIO',
        currentUser: authenticatedUser
            ? {
                  fullName: userFullName || 'Sovereign Patron',
                  tierLabel:
                      authenticatedUser.sovereignTier === 'IMPERIAL_HONORARY'
                          ? 'IMPERIAL HONORARY FELLOW'
                          : authenticatedUser.sovereignTier === 'SOVEREIGN_KEY'
                          ? 'SOVEREIGN KEY HOLDER'
                          : 'SOVEREIGN EXPLORER',
                  avatarUrl: '/limestone-villa.png',
              }
            : undefined,
        steps: [
            {
                id: 'guest-details',
                stepNumber: '01',
                label: 'Patron Identity & Logistics',
                isCompleted: false,
                isActive: true,
            },
            {
                id: 'bespoke-addons',
                stepNumber: '02',
                label: 'Comfort & Curated Encounters',
                isCompleted: false,
                isActive: false,
            },
            {
                id: 'payment-guarantee',
                stepNumber: '03',
                label: 'Sovereign Folio Guarantee',
                isCompleted: false,
                isActive: false,
            },
        ],
    };

    // 7. Build Patron Section Data
    const dietaryDisplay =
        profile?.dietaryRestrictions && profile.dietaryRestrictions.length > 0
            ? profile.dietaryRestrictions.filter(function (d) { return d !== 'None'; }).join(', ')
            : '';

    let accompanyingGuest = '';
    if (profile?.registeredCompanions) {
        try {
            const parsed =
                typeof profile.registeredCompanions === 'string'
                    ? JSON.parse(profile.registeredCompanions)
                    : profile.registeredCompanions;
            if (Array.isArray(parsed) && parsed.length > 0) {
                accompanyingGuest = parsed[0]?.fullName || '';
            }
        } catch {
            accompanyingGuest = '';
        }
    }

    const userCountryIso = ((authenticatedUser?.phoneCountryIso as string) || 'GB') as CountryIso2;

    const patronFormData: Partial<PatronFormData> = authenticatedUser
        ? {
              title: authenticatedUser.title || 'Mr',
              firstName: authenticatedUser.firstName || '',
              lastName: authenticatedUser.lastName || '',
              email: authenticatedUser.email || '',
              phoneCountryIso: userCountryIso,
              phoneNumber: authenticatedUser.phoneNumber ? authenticatedUser.phoneNumber.replace(/^\+\d+\s*/, '') : '',
              isPhoneValid: Boolean(authenticatedUser.phoneNumber && authenticatedUser.phoneNumber.length >= 7),
              countryOfResidence: authenticatedUser.nationality || 'GB',
              accompanyingGuestName: accompanyingGuest,
              selectedArrivalWindowId: 'window-standard',
              transportDesignation: 'Private Chauffeur from Naples Capodichino (NAP)',
              dietaryAndCellarNuances: dietaryDisplay,
          }
        : {
              selectedArrivalWindowId: 'window-standard',
              phoneCountryIso: 'GB',
              phoneNumber: '',
              countryOfResidence: 'GB',
          };

    const patronSectionData: PatronSectionData = {
        isAuthenticated,
        patronName: userFullName || undefined,
        patronFolioCode: authenticatedUser?.sovereignKeyNumber || undefined,
        initialFormValues: patronFormData,
        arrivalWindows: DEFAULT_ARRIVAL_WINDOWS,
    };

    // 8. Comfort & Add-Ons Details
    let resolvedPillowId: PillowOption['id'] = 'bespoke-goose-down';
    if (profile?.preferredPillowLeft) {
        const norm = profile.preferredPillowLeft.toLowerCase();
        if (norm.includes('latex') || norm.includes('wool')) {
            resolvedPillowId = 'organic-latex-wool';
        } else if (norm.includes('silk')) {
            resolvedPillowId = 'mulberry-silk-fill';
        }
    }

    const discountPercent =
        authenticatedUser?.sovereignTier === 'IMPERIAL_HONORARY'
            ? 20
            : authenticatedUser?.sovereignTier === 'SOVEREIGN_KEY'
            ? 15
            : authenticatedUser
            ? 10
            : 0;

    const baseTotalBeforeDiscount = nightlyRate * nightsCount;
    const sovereignDiscountAmount = (baseTotalBeforeDiscount * discountPercent) / 100;

    const sovereignVoucher: SovereignVoucherData | undefined = authenticatedUser
        ? {
              discountAmount: sovereignDiscountAmount,
              currencyCode,
              currencySymbol,
              promoCode: `SOV-${(authenticatedUser.sovereignKeyNumber || 'GUEST').slice(-4)}`,
              folioCode: authenticatedUser.sovereignKeyNumber || undefined,
          }
        : undefined;

    const comfortAndAddOnsData: ComfortAndAddOnsData = {
        pillowOptions: DEFAULT_PILLOW_OPTIONS,
        defaultPillowId: resolvedPillowId,
        initialTemperatureCelsius: Number(profile?.idealRoomTemperatureCelsius ?? 19.5),
        minTemperatureCelsius: 16,
        maxTemperatureCelsius: 24,
        temperatureStep: 0.5,
        addOns: addOnOptions,
        voucher: sovereignVoucher,
        currencyCode,
        currencySymbol,
        returnHref: `/accommodations/${selectedAccommodation.slug}`,
    };

    // 9. Build Reactive Stay Details
    const stayDetails: FolioStayDetails = {
        suiteId: selectedAccommodation.id,
        suiteName: selectedAccommodation.name,
        suiteSlug: selectedAccommodation.slug,
        sanctuaryName: sanctuary.name,
        sanctuaryLocation: `${sanctuary.city}, ${sanctuary.region}`,
        checkInDate: checkInDateStr,
        checkOutDate: checkOutDateStr,
        nightsCount,
        guestsCount: adultsCount,
        baseRateNightly: nightlyRate,
        currencyCode,
        currencySymbol,
        maxGuests: selectedAccommodation.maxOccupancy || 4,
    };

    // 10. Master initialData Object for CheckoutInteractive
    const initialData: CheckoutInteractiveInitialData = {
        header: headerData,
        patron: patronSectionData,
        comfortAndAddOns: comfortAndAddOnsData,
        stayDetails,
        currencyCode,
        currencySymbol,
        sanctuarySlug: sanctuary.slug,
        suiteSlug: selectedAccommodation.slug,
        isAuthenticated,
        sovereignTier: authenticatedUser?.sovereignTier || null,
        returnHref: `/accommodations/${selectedAccommodation.slug}`,
    };

    // 11. Booking Context Contract
    const bookingParams: AccommodationBookingContext = {
        sanctuaryId: sanctuary.id,
        sanctuarySlug: sanctuary.slug,
        sanctuaryName: sanctuary.name,
        sanctuaryCode: sanctuary.code,
        accommodationId: selectedAccommodation.id,
        suiteSlug: selectedAccommodation.slug,
        suiteName: selectedAccommodation.name,
        checkInDate: checkInDateStr,
        checkOutDate: checkOutDateStr,
        nightsCount,
        guestsCount: adultsCount,
        baseRateNightly: nightlyRate,
        currency: currencyCode,
        currencySymbol,
        sovereignDiscountPercent: discountPercent > 0 ? discountPercent : undefined,
    };

    return (
        <CheckoutPage
            bookingParams={bookingParams}
            initialData={initialData}
            onConfirmReservation={confirmReservationAction}
        />
    );
}
