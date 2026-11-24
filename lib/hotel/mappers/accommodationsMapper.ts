import { Prisma } from "@/app/generated/prisma/client";
import type {
    SuiteCardProps,
    SuiteAmenityItem,
    SuiteFeatureItem,
    SuitePrivilegeItem,
} from '@/components/hotel/SuiteCard';
import type { AccommodationBookingContext } from '@/lib/hotel/mappers/AccommodationDetailsMapper';
import { JsonObject } from '../types';

// ============================================================================
// 1. DATA CONTRACTS & VIEWMODEL SHAPES
// ============================================================================

export interface AccommodationSuiteCards {
    masterSuite: SuiteCardProps;
    coastalSuites: SuiteCardProps[];
    bookingParams?: Partial<AccommodationBookingContext>;
}

export type AccommodationWithSanctuary = Prisma.AccommodationCategoryGetPayload<{
    include: {
        sanctuary: {
            select: {
                id: true;
                name: true;
                slug: true;
                currency: true;
                code?: true;
            };
        };
    };
}>;

// ============================================================================
// 2. DEFENSIVE PARSING & FORMATTING UTILITIES
// ============================================================================

function asObject(value: unknown): JsonObject {
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        return value as JsonObject;
    }
    return {};
}

function asArray(value: unknown): unknown[] {
    return Array.isArray(value) ? value : [];
}

function getString(object: JsonObject, key: string, fallback = ''): string {
    const value = object[key];
    return typeof value === 'string' ? value : fallback;
}

function getNumber(object: JsonObject, key: string, fallback = 0): number {
    const value = object[key];
    return typeof value === 'number' ? value : fallback;
}

function formatCategory(category: string): string {
    return category ? category.replaceAll('_', ' ').toUpperCase() : 'SUITE';
}

function formatCurrency(currency?: string): string {
    const symbols: Record<string, string> = {
        EUR: '€',
        USD: '$',
        GBP: '£',
        CHF: 'CHF',
        JPY: '¥',
    };
    return (currency && symbols[currency]) ?? (currency || '€');
}

function cleanTagName(tag: string): string {
    return tag
        .replaceAll('_', ' ')
        .toLowerCase()
        .replace(/\b\w/g, function (char) {
            return char.toUpperCase();
        });
}

function formatSpecs(acc: AccommodationWithSanctuary): string {
    return [
        `${acc.squareMeters} m² / ${acc.squareFeet} sq ft`,
        `${acc.bedroomsCount} ${acc.bedroomsCount === 1 ? 'Bedroom' : 'Bedrooms'}`,
        `${acc.bathroomsCount} ${acc.bathroomsCount === 1 ? 'Bathroom' : 'Bathrooms'}`,
        `Max ${acc.maxOccupancy} Guests`,
    ].join(' • ');
}

// ============================================================================
// 3. SINGLE ENTITY MAPPER (AccommodationCategory -> SuiteCardProps)
// ============================================================================

export function mapAccommodationCategoryToSuiteCard(
    accommodation: AccommodationWithSanctuary,
    bookingContextOverride?: Partial<AccommodationBookingContext>,
): SuiteCardProps {
    const media = asObject(accommodation.mediaData);
    const narrative = asObject(accommodation.narrative);
    const sensory = asObject(accommodation.sensoryCapabilities);

    const categoryLabel = formatCategory(accommodation.category);
    const currencyCode = accommodation.sanctuary?.currency || accommodation.currency || 'EUR';
    const currencySymbol = formatCurrency(currencyCode);

    // 1. Parse Narrative Headings and Paragraphs
    const headline = getString(narrative, 'headline', accommodation.tagline);
    const rawParagraphs = asArray(narrative.paragraphs);
    const paragraphs = rawParagraphs.filter(function (p): p is string {
        return typeof p === 'string';
    });
    const description = paragraphs[0] ?? accommodation.tagline;

    // 2. Parse Amenities Array of Objects [{ name, iconClass, label }]
    const rawAmenities = asArray(accommodation.amenityTags);
    const amenities: SuiteAmenityItem[] = rawAmenities
        .map(function (item) {
            if (typeof item === 'string') {
                return {
                    name: item,
                    label: cleanTagName(item),
                };
            }
            if (item !== null && typeof item === 'object') {
                const obj = item as JsonObject;
                const name = getString(obj, 'name');
                return {
                    name,
                    label: cleanTagName(name),
                    iconClass: getString(obj, 'iconClass'),
                };
            }
            return null;
        })
        .filter(function (item): item is SuiteAmenityItem {
            return Boolean(item && item.name);
        });

    // 3. Parse Features Array of Objects [{ icon, title, description }]
    const rawFeatures = asArray(accommodation.features);
    const features: SuiteFeatureItem[] = rawFeatures
        .map(function (item): SuiteFeatureItem | null {
            if (item === null || typeof item !== 'object' || Array.isArray(item)) {
                return null;
            }
            const obj = item as JsonObject;
            const title = getString(obj, 'title');
            if (!title) {
                return null;
            }
            return {
                icon: getString(obj, 'icon'),
                title,
                description: getString(obj, 'description'),
            };
        })
        .filter(function (item): item is SuiteFeatureItem {
            return item !== null;
        });

    // 4. Parse Privileges Array of Objects [{ badge, title, description }]
    const rawPrivileges = asArray(accommodation.privileges);
    const privileges: SuitePrivilegeItem[] = rawPrivileges
        .map(function (item): SuitePrivilegeItem | null {
            if (item === null || typeof item !== 'object' || Array.isArray(item)) {
                return null;
            }
            const obj = item as JsonObject;
            const title = getString(obj, 'title');
            if (!title) {
                return null;
            }
            return {
                badge: getString(obj, 'badge'),
                title,
                description: getString(obj, 'description'),
            };
        })
        .filter(function (item): item is SuitePrivilegeItem {
            return item !== null;
        });

    // 5. Derive Highlight Tag & Sensory Badges
    const sensoryBadges: string[] = [];
    if (sensory.hasPrivatePlungePool) {
        const temp = getNumber(sensory, 'plungePoolTempCelsius', 32);
        sensoryBadges.push(`Heated Plunge (${temp}°C)`);
    }
    if (sensory.hasTravertineSoakingTub) {
        sensoryBadges.push('Travertine Tub');
    }
    if (sensory.acousticSoundIsolation) {
        sensoryBadges.push('Acoustic <14dB');
    }
    if (sensory.hasCircadianLighting) {
        sensoryBadges.push('Circadian Amber');
    }

    const highlightTag = sensoryBadges[0] ?? accommodation.viewOrientation ?? 'Panoramic Sea View';

    // 6. Photo count from mediaData.viewsCount or gallery length
    const gallery = asArray(media.gallery);
    const photoCount = getNumber(media, 'viewsCount', gallery.length || 6);

    const privilegeNotice =
        privileges.length > 0
            ? `${privileges[0].title} Included`
            : 'Private Butler Included';

    // 7. Contextual Booking Parameters
    const bookingParams: AccommodationBookingContext = {
        sanctuaryId: accommodation.sanctuaryId,
        sanctuaryName: accommodation.sanctuary?.name || 'Aurelia Sanctuary',
        sanctuarySlug: accommodation.sanctuary?.slug || 'positano-amalfi',
        sanctuaryCode: (accommodation.sanctuary as { code?: string })?.code || 'AUR-POS',
        accommodationId: accommodation.id,
        suiteSlug: accommodation.slug,
        suiteName: accommodation.name,
        baseRateNightly: accommodation.basePriceNightly,
        currency: currencyCode,
        currencySymbol,
        nightsCount: bookingContextOverride?.nightsCount ?? 5,
        guestsCount: bookingContextOverride?.guestsCount ?? 2,
        checkInDate: bookingContextOverride?.checkInDate ?? '',
        checkOutDate: bookingContextOverride?.checkOutDate ?? '',
        ...bookingContextOverride,
    };

    return {
        id: accommodation.id,
        sanctuaryId: accommodation.sanctuaryId,
        sanctuaryName: accommodation.sanctuary?.name,
        sanctuarySlug: accommodation.sanctuary?.slug,
        currency: currencyCode,
        slug: accommodation.slug,
        name: accommodation.name,
        category: categoryLabel,
        badgeLabel: categoryLabel,
        elevationTag: accommodation.viewOrientation,
        highlightTag,
        metaEyebrow: `${accommodation.squareMeters} M² • ${categoryLabel}`,
        headline,
        description,
        paragraphs,

        squareMeters: accommodation.squareMeters,
        squareFeet: accommodation.squareFeet,
        bedroomsCount: accommodation.bedroomsCount,
        bathroomsCount: accommodation.bathroomsCount,
        maxOccupancy: accommodation.maxOccupancy,
        bedConfiguration: accommodation.bedConfiguration,
        viewOrientation: accommodation.viewOrientation,

        pricePerNight: accommodation.basePriceNightly,
        currencySymbol,
        pricePeriodSuffix: '/ night',
        minStayNotice:
            accommodation.minStayNights > 1
                ? `${accommodation.minStayNights}-Night Minimum`
                : undefined,
        specsText: formatSpecs(accommodation),

        heroImageUrl: getString(
            media,
            'heroImage',
            '/limestone-villa.png',
        ),
        photoCount,

        privilegeNotice,
        privileges,
        features,
        amenities,
        sensoryBadges,

        bookingParams,

        primaryCtaLabel: 'Reserve Suite',
        secondaryCtaLabel: 'Floorplan & Details',
    };
}

// ============================================================================
// 4. COLLECTION MAPPER (Listings & Homepage Bento Groupings)
// ============================================================================

export function mapAccommodationCategoriesToSuiteCards(
    accommodations: AccommodationWithSanctuary[],
    featuredSlug = 'azure-master-ocean-suite',
    initialBookingParams?: Partial<AccommodationBookingContext>,
): AccommodationSuiteCards {
    if (!accommodations || accommodations.length === 0) {
        return {
            masterSuite: null as unknown as SuiteCardProps,
            coastalSuites: [],
            bookingParams: initialBookingParams,
        };
    }

    const cards: SuiteCardProps[] = accommodations.map(function (acc) {
        return mapAccommodationCategoryToSuiteCard(acc, initialBookingParams);
    });

    const masterSuite =
        cards.find(function (card) {
            return card.slug === featuredSlug;
        }) ?? cards[0];

    const coastalSuites: SuiteCardProps[] = cards
        .filter(function (card) {
            return card.slug !== masterSuite.slug;
        })
        .map(function (card) {
            return {
                ...card,
                variant: 'coastal-grid' as const,
            };
        });

    const featuredCard: SuiteCardProps = {
        ...masterSuite,
        variant: 'master-featured' as const,
    };

    return {
        masterSuite: featuredCard,
        coastalSuites,
        bookingParams: initialBookingParams,
    };
}

export default mapAccommodationCategoriesToSuiteCards;
