import type { AccommodationCategory } from '@/app/generated/prisma/client';
import type {
    SuiteCardProps,
    SuiteAmenityItem,
    SuiteFeatureItem,
    SuitePrivilegeItem,
} from '@/components/hotel/SuiteCard';
import { JsonObject } from '../types/accommodations';

export interface AccommodationSuiteCards {
    masterSuite: SuiteCardProps;
    coastalSuites: SuiteCardProps[];
}


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
    return category.replaceAll('_', ' ').toUpperCase();
}

function formatCurrency(currency: string): string {
    const symbols: Record<string, string> = {
        EUR: '€',
        USD: '$',
        GBP: '£',
        CHF: 'CHF',
        JPY: '¥',
    };
    return symbols[currency] ?? currency;
}

function cleanTagName(tag: string): string {
    return tag
        .replaceAll('_', ' ')
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatSpecs(acc: AccommodationCategory): string {
    return [
        `${acc.squareMeters} m² / ${acc.squareFeet} sq ft`,
        `${acc.bedroomsCount} ${acc.bedroomsCount === 1 ? 'Bedroom' : 'Bedrooms'}`,
        `${acc.bathroomsCount} ${acc.bathroomsCount === 1 ? 'Bathroom' : 'Bathrooms'}`,
        `Max ${acc.maxOccupancy} Guests`,
    ].join(' • ');
}

export function mapAccommodationCategoryToSuiteCard(
    accommodation: AccommodationCategory,
): SuiteCardProps {
    const media = asObject(accommodation.mediaData);
    const narrative = asObject(accommodation.narrative);
    const sensory = asObject(accommodation.sensoryCapabilities);

    const categoryLabel = formatCategory(accommodation.category);
    const currencySymbol = formatCurrency(accommodation.currency);

    // 1. Parse Narrative Headings and Paragraphs
    const headline = getString(narrative, 'headline', accommodation.tagline);
    const rawParagraphs = asArray(narrative.paragraphs);
    const paragraphs = rawParagraphs.filter(
        (p): p is string => typeof p === 'string',
    );
    const description = paragraphs[0] ?? accommodation.tagline;

    // 2. Parse Amenities Array of Objects [{ name, iconClass }]
    const rawAmenities = asArray(accommodation.amenityTags);
    const amenities: SuiteAmenityItem[] = rawAmenities
        .map((item) => {
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
        .filter((item): item is SuiteAmenityItem => Boolean(item && item.name));

    // 3. Parse Features Array of Objects [{ icon, title, description }]
    
    // 3. Parse Features Array of Objects [{ icon, title, description }]
    const rawFeatures = asArray(accommodation.features);

    const features: SuiteFeatureItem[] = rawFeatures
        .map((item): SuiteFeatureItem | null => {
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
                description: getString(obj, 'description') ,
            };
        })
        .filter((item): item is SuiteFeatureItem => item !== null);


    // 4. Parse Privileges Array of Objects [{ badge, title, description }]
    
    // 4. Parse Privileges Array of Objects [{ badge, title, description }]
    const rawPrivileges = asArray(accommodation.privileges);

    const privileges: SuitePrivilegeItem[] = rawPrivileges
        .map((item): SuitePrivilegeItem | null => {
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
        .filter((item): item is SuitePrivilegeItem => item !== null);

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

    const highlightTag = sensoryBadges[0] ?? accommodation.viewOrientation;

    // 6. Photo count from mediaData.viewsCount or gallery length
    const gallery = asArray(media.gallery);
    const photoCount = getNumber(media, 'viewsCount', gallery.length || 6);

    const privilegeNotice =
        privileges.length > 0
            ? `${privileges[0].title} Included`
            : 'Private Butler Included';

    return {
        id: accommodation.id,
        slug: accommodation.slug,
        name: accommodation.name,
        category: categoryLabel,
        badgeLabel: categoryLabel,
        elevationTag: accommodation.viewOrientation,
        highlightTag,
        metaEyebrow: `${accommodation.squareMeters} M² • ${formatCategory(accommodation.category)}`,
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
            '/images/accommodations/default-suite.jpg',
        ),
        photoCount,

        privilegeNotice,
        privileges,
        features,
        amenities,
        sensoryBadges,

        primaryCtaLabel: 'Reserve Suite',
        secondaryCtaLabel: 'Floorplan & Details',
    };
}

export function mapAccommodationCategoriesToSuiteCards(
    accommodations: AccommodationCategory[],
    featuredSlug = 'azure-master-ocean-suite',
): AccommodationSuiteCards {
    const cards: SuiteCardProps[] = accommodations.map(
        mapAccommodationCategoryToSuiteCard,
    );

    const masterSuite =
        cards.find((card) => card.slug === featuredSlug) ?? cards[0];

    const coastalSuites: SuiteCardProps[] = cards
        .filter((card) => card.slug !== masterSuite.slug)
        .map((card) => ({
            ...card,
            variant: 'compact-horizontal',
        }));

    const featuredCard: SuiteCardProps = {
        ...masterSuite,
        variant: 'featured',
    };

    return {
        masterSuite: featuredCard,
        coastalSuites,
    };
}