
import React from 'react';
import type { LucideIcon } from 'lucide-react';

import {
    Shield,
    Wine,
    Ship,
    Waves,
    Bath,
    Sprout,
    Flower2,
    Thermometer,
    Sparkles,
    UserCheck,
    Calendar,
    Compass,
    Bed,
    Maximize2,
    Eye,
} from 'lucide-react';

import type { Prisma } from '@/app/generated/prisma/client';

import type { AccommodationDetailsData } from '../types/accommodations';

import type {
    AccommodationGalleryData,
    AccommodationNarrativeAndFloorplanData,
    AccommodationRateBreakdown,
    ArchitecturalFeature,
    GalleryMediaItem,
    PrivilegeItem,
    PrivilegesAndPoliciesData,
    SanctuaryPolicyItem,
    SiblingAccommodationItem,
    SpatialMetric,
} from '@/components/hotel/types/accommodations';

// ============================================================================
// INPUT TYPES
// ============================================================================

export type JsonObject = Record<string, unknown>;

export type AccommodationCategoryWithRoomUnits =
    Prisma.AccommodationCategoryGetPayload<{
        include: {
            roomUnits: true;
        };
    }>;

export type AccommodationRoomUnit =
    AccommodationCategoryWithRoomUnits['roomUnits'][number];

export interface AccommodationBookingContext {
    checkInDate?: string;
    checkOutDate?: string;
    nightsCount?: number;
    guestsCount?: number;
}

export interface AccommodationMapperOptions {
    roomUnitId?: string;
    bookingContext?: AccommodationBookingContext;
}

// ============================================================================
// TYPE GUARDS & SAFE JSON PARSING UTILITIES
// ============================================================================

function isJsonObject(value: unknown): value is JsonObject {
    return (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value)
    );
}

function asJsonObject(value: unknown): JsonObject {
    return isJsonObject(value) ? value : {};
}

function asArray(value: unknown): unknown[] {
    return Array.isArray(value) ? value : [];
}

function getString(
    object: JsonObject,
    key: string,
    fallback = '',
): string {
    const value = object[key];

    return typeof value === 'string' ? value : fallback;
}

function getNumber(
    object: JsonObject,
    key: string,
    fallback = 0,
): number {
    const value = object[key];

    return typeof value === 'number' && Number.isFinite(value)
        ? value
        : fallback;
}

function formatCurrencySymbol(currency: string): string {
    const symbols: Record<string, string> = {
        EUR: '€',
        USD: '$',
        GBP: '£',
        CHF: 'CHF',
        JPY: '¥',
    };

    return symbols[currency] ?? currency;
}

function formatCategoryTitle(category: string): string {
    return category
        .replaceAll('_', ' ')
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

// ============================================================================
// ICON RESOLUTION REGISTRY
// ============================================================================

const iconMap: Record<string, LucideIcon> = {
    shield: Shield,
    cellar: Wine,
    wine: Wine,
    yacht: Ship,
    ship: Ship,
    pool: Waves,
    waves: Waves,
    bath: Bath,
    tub: Bath,
    orchard: Sprout,
    sprout: Sprout,
    flower: Flower2,
    temperature: Thermometer,
    sparkles: Sparkles,
    majordomo: UserCheck,
    calendar: Calendar,
    compass: Compass,
    bed: Bed,
    maximize: Maximize2,
    eye: Eye,
};

function renderFeatureIcon(iconKey: string): React.ReactNode {
    const IconComponent = iconMap[iconKey.toLowerCase()] ?? Compass;

    return React.createElement(IconComponent, {
        size: 16,
        strokeWidth: 1.6,
        className: 'text-[#8e763b] shrink-0',
        'aria-hidden': true,
    });
}

function renderPrivilegeIcon(iconKey: string): React.ReactNode {
    const IconComponent = iconMap[iconKey.toLowerCase()] ?? UserCheck;

    return React.createElement(IconComponent, {
        size: 20,
        strokeWidth: 1.6,
        className: 'text-[#8e763b] shrink-0',
        'aria-hidden': true,
    });
}

// ============================================================================
// ROOM UNIT SELECTION
// ============================================================================

function selectRoomUnit(
    accommodation: AccommodationCategoryWithRoomUnits,
    roomUnitId?: string,
): AccommodationRoomUnit | undefined {
    if (!roomUnitId) {
        return accommodation.roomUnits[0];
    }

    const roomUnit = accommodation.roomUnits.find(
        (unit) => unit.id === roomUnitId,
    );

    if (!roomUnit) {
        throw new Error(
            `Room unit "${roomUnitId}" does not belong to accommodation "${accommodation.slug}".`,
        );
    }

    return roomUnit;
}

// ============================================================================
// GALLERY
// ============================================================================

function makeSuiteTitle(
    accommodation: AccommodationCategoryWithRoomUnits,
    roomUnit?: AccommodationRoomUnit,
): string {
    const categoryName = formatCategoryTitle(
        accommodation.category,
    );

    if (!roomUnit) {
        return accommodation.name;
    }

    return `${categoryName} ${roomUnit.unitCode} — ${accommodation.name}`;
}

function mapGalleryData(
    accommodation: AccommodationCategoryWithRoomUnits,
    roomUnit?: AccommodationRoomUnit,
): AccommodationGalleryData {
    const media = asJsonObject(accommodation.mediaData);
    const galleryList = asArray(media.gallery);

    const heroUrl = getString(
        media,
        'heroImage',
        '/limestone-villa.png',
    );

    const secondaryTopUrl =
        typeof galleryList[0] === 'string'
            ? galleryList[0]
            : heroUrl;

    const secondaryBottomUrl =
        typeof galleryList[1] === 'string'
            ? galleryList[1]
            : secondaryTopUrl;

    const heroImage: GalleryMediaItem = {
        url: heroUrl,
        alt: `${accommodation.name} — Primary Chamber Horizon View`,
        title: getString(
            asJsonObject(accommodation.narrative),
            'headline',
            accommodation.tagline,
        ),
        badge: roomUnit
            ? `${accommodation.viewOrientation} • ${roomUnit.floorLevel}`
            : accommodation.viewOrientation,
        actionLabel: `${getNumber(
            media,
            'viewsCount',
            galleryList.length || 8,
        )} Curated Views`,
    };

    const secondaryTopImage: GalleryMediaItem = {
        url: secondaryTopUrl,
        alt: `${accommodation.name} — En-Suite Travertine Soaking Bath`,
        title: 'Honed Travertine Bath',
        badge: 'EN-SUITE SPA',
    };

    const secondaryBottomImage: GalleryMediaItem = {
        url: secondaryBottomUrl,
        alt: `${accommodation.name} — Private Plunge Terrace`,
        title: 'Heated Basalt Plunge Deck',
        badge: 'PRIVATE TERRACE',
        actionLabel: 'Explore Gallery',
    };


    return {
        sanctuaryEyebrow: roomUnit
            ? `SANCTUARY ${roomUnit.unitCode}`
            : 'SANCTUARY',
        wingSubtitle: roomUnit?.wing ?? null,
        suiteTitle: makeSuiteTitle(accommodation, roomUnit),
        ratingScore: 4.98,
        appraisalsCount: 48,
        patronReserveTier: 'Virtuoso Private Reserve',
        heroImage,
        secondaryTopImage,
        secondaryBottomImage,
    };
}

// ============================================================================
// SPATIAL METRICS
// ============================================================================

function mapSpatialMetrics(
    accommodation: AccommodationCategoryWithRoomUnits,
): SpatialMetric[] {
    const sensory = asJsonObject(
        accommodation.sensoryCapabilities,
    );

    const hasPlunge = Boolean(sensory.hasPrivatePlungePool);

    const plungeTemp = getNumber(
        sensory,
        'plungePoolTempCelsius',
        32,
    );

    return [
        {
            label: `${accommodation.squareMeters} m²`,
            sublabel: 'INTERIOR & DECK AREA',
            icon: React.createElement(Maximize2, {
                size: 20,
                strokeWidth: 1.6,
                className: 'text-[#8e763b]',
                'aria-hidden': true,
            }),
        },
        {
            label:
                accommodation.bedroomsCount === 1
                    ? 'King Bed'
                    : `${accommodation.bedroomsCount} Bedrooms`,
            sublabel: accommodation.bedConfiguration,
            icon: React.createElement(Bed, {
                size: 20,
                strokeWidth: 1.6,
                className: 'text-[#8e763b]',
                'aria-hidden': true,
            }),
        },
        {
            label: hasPlunge
                ? `${plungeTemp}°C Water`
                : 'Travertine Bath',
            sublabel: hasPlunge
                ? 'HEATED BASALT PLUNGE'
                : 'FREESTANDING SPA TUB',
            icon: React.createElement(Waves, {
                size: 20,
                strokeWidth: 1.6,
                className: 'text-[#8e763b]',
                'aria-hidden': true,
            }),
        },
        {
            label: '180° Open',
            sublabel: accommodation.viewOrientation.toUpperCase(),
            icon: React.createElement(Eye, {
                size: 20,
                strokeWidth: 1.6,
                className: 'text-[#8e763b]',
                'aria-hidden': true,
            }),
        },
    ];
}

// ============================================================================
// NARRATIVE & FLOORPLAN
// ============================================================================

function mapNarrativeAndFloorplan(
    accommodation: AccommodationCategoryWithRoomUnits,
): AccommodationNarrativeAndFloorplanData {
    const narrative = asJsonObject(accommodation.narrative);
    const rawParagraphs = asArray(narrative.paragraphs);

    const paragraphs: string[] = rawParagraphs.filter(
        (paragraph): paragraph is string =>
            typeof paragraph === 'string' &&
            paragraph.trim().length > 0,
    );

    if (paragraphs.length === 0) {
        paragraphs.push(accommodation.tagline);
    }

    const rawFeatures = asArray(accommodation.features);

    const features: ArchitecturalFeature[] = rawFeatures
        .map((item, index): ArchitecturalFeature | null => {
            if (!isJsonObject(item)) {
                return null;
            }

            const iconKey = getString(item, 'icon', 'compass');

            const title = getString(
                item,
                'title',
                `Feature ${index + 1}`,
            );

            const description = getString(
                item,
                'description',
                '',
            );

            return {
                icon: renderFeatureIcon(iconKey),
                title,
                description,
            };
        })
        .filter(
            (item): item is ArchitecturalFeature =>
                item !== null,
        );

    const interiorMeters = Math.max(
        30,
        Math.round(accommodation.squareMeters * 0.67),
    );

    const deckMeters = Math.max(
        10,
        Math.round(
            accommodation.squareMeters - interiorMeters,
        ),
    );

    return {
        spatialMetrics: mapSpatialMetrics(accommodation),
        sectionEyebrow: 'ATMOSPHERIC RESONANCE & NARRATIVE',
        headline: getString(
            narrative,
            'headline',
            accommodation.tagline,
        ),
        paragraphs,
        features,
        floorplanEyebrow: 'ARCHITECTURAL COMPOSITION',
        floorplanTitle: '1:50 Spatial Floorplan',
        grossFootprint:
            `GROSS FOOTPRINT: ${accommodation.squareMeters} M²`,
        deckArea: `DECK: ${deckMeters} M²`,
        legendItems: [
            {
                colorClass: 'bg-[#bfa76f]',
                label: 'Basalt Mineral Plunge Pool',
            },
            {
                colorClass: 'bg-[#ded9ce]',
                label: 'Travertine Soaking Bath En-suite',
            },
            {
                colorClass: 'bg-[#e5e0d4]',
                label: 'Artisan Walnut & Oak Living Salon',
            },
        ],
    };
}

// ============================================================================
// PRIVILEGES & POLICIES
// ============================================================================

function mapPrivilegesAndPolicies(
    accommodation: AccommodationCategoryWithRoomUnits,
    roomUnit?: AccommodationRoomUnit,
): PrivilegesAndPoliciesData {
    const rawPrivileges = asArray(accommodation.privileges);

    const privilegesList: PrivilegeItem[] = rawPrivileges
        .map((item, index): PrivilegeItem | null => {
            if (!isJsonObject(item)) {
                return null;
            }

            const title = getString(
                item,
                'title',
                `Privilege ${index + 1}`,
            );

            const description = getString(
                item,
                'description',
                '',
            );

            const badge = getString(item, 'badge');

            let iconKey = 'majordomo';

            if (/thermal|bath|caldarium/i.test(title)) {
                iconKey = 'waves';
            } else if (/breakfast|orchard|dining/i.test(title)) {
                iconKey = 'orchard';
            } else if (/sommelier|wine|aperitivo/i.test(title)) {
                iconKey = 'wine';
            }

            const privilege: PrivilegeItem = {
                id: `privilege-${index + 1}`,
                icon: renderPrivilegeIcon(iconKey),
                title,
                description,
            };

            if (badge) {
                privilege.badge = badge;
            }

            return privilege;
        })
        .filter(
            (item): item is PrivilegeItem =>
                item !== null,
        );

    const policies: SanctuaryPolicyItem[] = [
        {
            label: 'Check-In Protocol',
            value: 'From 15:00',
            details:
                'Early arrival honored with private luggage reception and garden salon welcome.',
        },
        {
            label: 'Departure Protocol',
            value: 'Until 12:00',
            details:
                'Late checkout subject to seasonal availability upon majordomo request.',
        },
        {
            label: 'Guaranteed Cancellation',
            value: 'Flexible 14-Day Courtesy',
            details:
                'Full folio return when notified at least 14 days prior to confirmed arrival date.',
        },
        {
            label: 'Patron Composition',
            value:
                `Max ${accommodation.maxOccupancy} Patrons ` +
                `(${accommodation.bedroomsCount} ${
                    accommodation.bedroomsCount === 1
                        ? 'Bedroom'
                        : 'Bedrooms'
                })`,
            details:
                `Accommodates up to ${accommodation.maxOccupancy} guests with tailored linen daybed arrangements.`,
        },
    ];

    return {
        privilegesEyebrow: 'EXCLUSIVE SANCTUARY INCLUSIONS',
        privilegesHeading: roomUnit
            ? `Curated Privileges of Suite ${roomUnit.unitCode}`
            : `Curated Privileges of ${accommodation.name}`,
        privilegesDescription:
            'Every reservation within this residence includes dedicated bespoke accommodations, restorative wellness access, and direct concierge privileges.',
        privilegesList,
        policiesEyebrow: 'SANCTUARY PROTOCOLS & COURTESY',
        policiesHeading:
            'Arrival, Stay Horizon & Sanctuary Etiquette',
        policies,
        conciergeNotice:
            'All arrivals via Riva yacht or private helicopter must provide coordinate notice 48 hours in advance to guarantee slip and helipad clearance.',
    };
}

// ============================================================================
// RATE BREAKDOWN
// ============================================================================

function mapRateBreakdown(
    accommodation: AccommodationCategoryWithRoomUnits,
    bookingContext?: AccommodationBookingContext,
): AccommodationRateBreakdown {
    const nights = Math.max(
        accommodation.minStayNights,
        bookingContext?.nightsCount ?? accommodation.minStayNights,
    );

    const guests = Math.min(
        accommodation.maxOccupancy,
        Math.max(1, bookingContext?.guestsCount ?? 2),
    );

    const checkIn = bookingContext?.checkInDate ?? '';
    const checkOut = bookingContext?.checkOutDate ?? '';

    return {
        baseRateNightly: accommodation.basePriceNightly,
        currency: accommodation.currency,
        currencySymbol: formatCurrencySymbol(
            accommodation.currency,
        ),
        checkInDate: checkIn,
        checkOutDate: checkOut,
        nightsCount: nights,
        guestsCount: guests,
        maxGuests: accommodation.maxOccupancy,
        vatRatePercentage: accommodation.vatRate,
        cityTaxPerGuestNight: accommodation.cityTaxPerGuest,
        bestRateGuaranteeText:
            'DIRECT PATRON PRIVILEGE • BEST SOVEREIGN TARIFF',
        complimentaryTransferHeadline:
            'Complimentary Coastal Arrival',
        complimentaryTransferDetails:
            'Includes private Riva yacht transfer or helicopter helipad transit directly to the South Wing portico.',
    };
}

// ============================================================================
// ACCOMMODATION SIBLINGS MAPPER
// ============================================================================

export function mapAccommodationSiblings(
    accommodations: AccommodationCategoryWithRoomUnits[],
    currentAccommodationId?: string,
): SiblingAccommodationItem[] {
    const siblings: SiblingAccommodationItem[] = accommodations
        .filter(
            (accommodation) =>
                accommodation.id !== currentAccommodationId,
        )
        .map((accommodation) => {
            const media = asJsonObject(accommodation.mediaData);
            const rawFeatures = asArray(accommodation.features);
            const rawPrivileges = asArray(accommodation.privileges);

            const features = rawFeatures
                .map((feature) => {
                    if (typeof feature === 'string') {
                        return feature;
                    }

                    if (isJsonObject(feature)) {
                        return getString(
                            feature,
                            'title',
                            getString(feature, 'name'),
                        );
                    }

                    return '';
                })
                .filter((feature) => feature.trim().length > 0);

            const firstPrivilege = rawPrivileges.find(isJsonObject);

            const privilegeText = firstPrivilege
                ? getString(
                    firstPrivilege,
                    'description',
                    getString(firstPrivilege, 'title'),
                )
                : 'Discover the privileges of this sanctuary.';

            return {
                id: accommodation.id,
                slug: accommodation.slug,
                name: accommodation.name,
                category: formatCategoryTitle(
                    accommodation.category,
                ),
                badge: getString(
                    media,
                    'badge',
                    formatCategoryTitle(accommodation.category),
                ),
                squareMeters: accommodation.squareMeters,
                elevationTag: getString(
                    media,
                    'elevationTag',
                    accommodation.viewOrientation,
                ),
                tagline: accommodation.tagline,
                basePriceNightly: accommodation.basePriceNightly,
                currencySymbol: formatCurrencySymbol(
                    accommodation.currency,
                ),
                heroImageUrl: getString(
                    media,
                    'heroImage',
                    '/limestone-villa.png',
                ),
                privilegeText,
                features,
            };
        });

    return siblings
    //  {
    //     eyebrow: 'EXPLORE OUR COLLECTION',
    //     heading: 'Other Exceptional Sanctuaries',
    //     description:
    //         'Discover other distinctive residences, each thoughtfully designed to offer its own expression of comfort and refinement.',
    //     viewAllHref: '/accommodations',
    // };
}

// ============================================================================
// PRIMARY EXPORTED MAPPER
// ============================================================================

export function mapAccommodationDetails(
    accommodation: AccommodationCategoryWithRoomUnits,
    options: AccommodationMapperOptions = {},
): AccommodationDetailsData {
    const roomUnit = selectRoomUnit(
        accommodation,
        options.roomUnitId,
    );

    return {
        id: accommodation.id,
        slug: accommodation.slug,
        name: accommodation.name,
        tagline: accommodation.tagline,
        gallery: mapGalleryData(accommodation, roomUnit),
        narrativeAndFloorplan:
            mapNarrativeAndFloorplan(accommodation),
        privilegesAndPolicies:
            mapPrivilegesAndPolicies(accommodation, roomUnit),
        rateBreakdown: mapRateBreakdown(
            accommodation,
            options.bookingContext,
        ),
    };
}
