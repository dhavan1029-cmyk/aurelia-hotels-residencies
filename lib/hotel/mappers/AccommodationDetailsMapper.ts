import React from 'react';
import {
    Waves,
    Bed,
    Maximize2,
    Eye,
} from 'lucide-react';

import type { Prisma } from '@/app/generated/prisma/client';

import type { AccommodationDetailsData } from '../types';

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

import {asArray, asJsonObject, formatCategoryTitle, formatCurrencySymbol, getNumber, getString, isJsonObject, renderFeatureIcon, renderPrivilegeIcon} from '@/lib/utils/accommodationUtils'
import { getCurrencySymbol } from '@/lib/data/currencyCatalog';

// ============================================================================
// INPUT TYPES
// ============================================================================

export type JsonObject = Record<string, unknown>;

export type AccommodationCategoryWithRoomUnits = Prisma.AccommodationCategoryGetPayload<{
    include: {
        roomUnits: true;
    };
}>;

export type AccommodationRoomUnit =
    AccommodationCategoryWithRoomUnits['roomUnits'][number];

export interface AccommodationBookingContext {
    // ------------------------------------------------------------------------
    // 1. DATES, HORIZON & PARTY OCCUPANCY
    // ------------------------------------------------------------------------
    checkInDate: string;                    // ISO date string 'YYYY-MM-DD'
    checkOutDate: string;                   // ISO date string 'YYYY-MM-DD'
    nightsCount: number;                    // Calculated night duration                   // Number of adult patrons
    childrenCount?: number;                 // Optional youth guests
    guestsCount: number;                   // Total party count (convenience alias)

    // ------------------------------------------------------------------------
    // 2. SANCTUARY DESTINATION IDENTITY
    // ------------------------------------------------------------------------
    sanctuaryId: string;                    // Prisma Sanctuary CUID
    sanctuarySlug: string;                  // e.g. 'positano-amalfi'
    sanctuaryName: string;                  // e.g. 'Aurelia Sanctuary Positano'
    sanctuaryCode?: string;                 // e.g. 'AUR-POS'

    // ------------------------------------------------------------------------
    // 3. SUITE & ROOM SPECIFICATION
    // ------------------------------------------------------------------------
    accommodationId: string;                // Prisma AccommodationCategory CUID
    suiteSlug: string;                      // e.g. 'azure-master-ocean-suite'
    suiteName: string;                      // e.g. 'The Azure Master Ocean Suite'
    roomUnitId?: string;                    // Optional allocated physical room unit CUID
    roomNumber?: string;                    // e.g. 'Suite 402'
    elevationTag?: string;                  // e.g. 'Upper Cliffside Pavilion'

    // ------------------------------------------------------------------------
    // 4. FINANCIAL & CURRENCY BREAKDOWN
    // ------------------------------------------------------------------------
    baseRateNightly: number;                // Nightly suite rate (e.g. 3450)
    currency: string;                       // e.g. 'EUR'
    currencySymbol?: string;                // e.g. '€'
    sovereignDiscountPercent?: number;      // e.g. 15 (for Sovereign Key / Explorer)
    estimatedTaxAndService?: number;        // Environmental & heritage tariff

    // ------------------------------------------------------------------------
    // 5. SELECTED EXPERIENCES & ADD-ONS (OPTIONAL)
    // ------------------------------------------------------------------------
    selectedAddOnIds?: string[];            // Selected Experience / Service CUIDs
}

export interface BasicAccommodationBookingParams {
    checkOutDate?: string, 
    checkInDate?: string, 
    nightsCount: number, 
    guestsCount: number
}

export interface AccommodationMapperOptions {
    roomUnitId?: string;
    bookingContext?: {checkOutDate?: string, checkInDate?: string, nightsCount: number, guestsCount: number};
}


interface PrivilegeEnrichment {
    description: string;
    badge: string;
    iconKey: string;
}


export function parseISODate(iso: string): Date {
    const [year, month, day] = iso.split('-').map(Number);
    return new Date(year, month - 1, day);
}

export function calculateNights(startIso: string, endIso: string): number {
    const start = parseISODate(startIso);
    const end = parseISODate(endIso);
    const diffTime = end.getTime() - start.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
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
            ? `${accommodation.category} ${roomUnit.unitCode}`
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

            const detail = getString(
                item,
                'detail',
                '',
            );

            return {
                icon: renderFeatureIcon(iconKey),
                title,
                detail,
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

function resolvePrivilegeEnrichment(title: string): PrivilegeEnrichment {
    const lower = title.toLowerCase();

    if (/majordomo|butler/i.test(lower)) {
        return {
            description:
                'Discreet, personalized butler service attending to wardrobe unpacking, evening turndown calibrations, and private in-suite dining.',
            badge: 'BESPOKE SERVICE',
            iconKey: 'majordomo',
        };
    }

    if (/tender|riva|yacht|boat|arrival/i.test(lower)) {
        return {
            description:
                'Complimentary private maritime transfer from coastal docks directly to the sanctuary private funicular pier.',
            badge: 'HARBOR TRANSIT',
            iconKey: 'waves',
        };
    }

    if (/thermal|caldarium|spa|bath|pool/i.test(lower)) {
        return {
            description:
                'Daily private access to the volcanic stone Caldarium and mineral hydrotherapy pools, chiseled directly into bedrock.',
            badge: 'UNLIMITED ACCESS',
            iconKey: 'waves',
        };
    }

    if (/cellar|aperitivo|sommelier|wine/i.test(lower)) {
        return {
            description:
                'Curated reserve vintage pours and regional cicchetti served at twilight overlooking the coastal horizon.',
            badge: 'DAILY TWILIGHT',
            iconKey: 'wine',
        };
    }

    if (/breakfast|orchard|dining|chef/i.test(lower)) {
        return {
            description:
                'Served privately on your oceanfront loggia or terrace, featuring fresh local citrus, baked brioche, and farm preserves.',
            badge: 'IN-SUITE SERVED',
            iconKey: 'orchard',
        };
    }

    if (/helicopter|heli/i.test(lower)) {
        return {
            description:
                'Direct helipad arrival and luggage clearance on the private coastal promontory pad.',
            badge: 'AVIATION CLEARANCE',
            iconKey: 'waves',
        };
    }

    return {
        description:
            'Dedicated sanctuary privilege and personalized courtesies provided throughout your stay.',
        badge: 'SANCTUARY INCLUSION',
        iconKey: 'majordomo',
    };
}

// ============================================================================
// 2. HELPER UTILITIES
// ============================================================================

function capitalizeFirstLetter(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// ============================================================================
// 3. MASTER MAPPER FUNCTION
// ============================================================================

export function mapPrivilegesAndPolicies(
    accommodation: AccommodationCategoryWithRoomUnits,
    roomUnit?: AccommodationRoomUnit,
): PrivilegesAndPoliciesData {
    const rawPrivileges = Array.isArray(accommodation.privileges)
        ? (accommodation.privileges as unknown[])
        : [];

    const privilegesList: PrivilegeItem[] = rawPrivileges
        .map((item, index): PrivilegeItem | null => {
            if (!item) return null;

            // ----------------------------------------------------------------
            // CASE A: Privilege is a String (Current DB Schema Array)
            // ----------------------------------------------------------------
            if (typeof item === 'string') {
                const title = item.trim();
                if (!title) return null;

                const enrichment = resolvePrivilegeEnrichment(title);

                return {
                    id: `privilege-${index + 1}`,
                    icon: renderPrivilegeIcon(enrichment.iconKey),
                    title,
                    description: enrichment.description,
                    badge: enrichment.badge,
                };
            }

            // ----------------------------------------------------------------
            // CASE B: Privilege is an Object (Legacy / Extended JSON format)
            // ----------------------------------------------------------------
            if (typeof item === 'object') {
                const title = (item as any).title || `Privilege ${index + 1}`;
                const enrichment = resolvePrivilegeEnrichment(title);
                const description = (item as any).description || enrichment.description;
                const badge = (item as any).badge || enrichment.badge;

                let iconKey = enrichment.iconKey;
                if (/thermal|bath|caldarium/i.test(title)) {
                    iconKey = 'waves';
                } else if (/breakfast|orchard|dining/i.test(title)) {
                    iconKey = 'orchard';
                } else if (/sommelier|wine|aperitivo/i.test(title)) {
                    iconKey = 'wine';
                }

                return {
                    id: `privilege-${index + 1}`,
                    icon: renderPrivilegeIcon(iconKey),
                    title,
                    description,
                    badge,
                };
            }

            return null;
        })
        .filter((item): item is PrivilegeItem => item !== null);

    // Dynamic policies using database fields (maxOccupancy, bedroomsCount, minStayNights)
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
                `Accommodates up to ${accommodation.maxOccupancy} guests with tailored linen daybed arrangements. Minimum stay: ${accommodation.minStayNights || 1} ${(accommodation.minStayNights || 1) === 1 ? 'night' : 'nights'}.`,
        },
    ];

    const formattedCategory = capitalizeFirstLetter(accommodation.category || 'Suite');

    return {
        privilegesEyebrow: 'EXCLUSIVE SANCTUARY INCLUSIONS',
        privilegesHeading: roomUnit
            ? `Curated Privileges of ${formattedCategory} ${roomUnit.unitCode}`
            : `Curated Privileges of ${accommodation.name}`,
        privilegesDescription:
            'Every reservation within this residence includes dedicated bespoke accommodations, restorative wellness access, and direct concierge privileges.',
        privilegesList,
        policiesEyebrow: 'SANCTUARY PROTOCOLS & COURTESY',
        policiesHeading: 'Arrival, Stay Horizon & Sanctuary Etiquette',
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
    bookingContext?: BasicAccommodationBookingParams,
): AccommodationRateBreakdown {
    const nights = Math.max(
        accommodation.minStayNights,
        bookingContext?.nightsCount ?? accommodation.minStayNights,
    );

    const guests = Math.min(
        accommodation.maxOccupancy,
        Math.max(1, bookingContext?.guestsCount ?? 2),
    );

    const today = new Date()
    const [year, month, date] = [today.getFullYear(), today.getMonth() + 1, today.getDate()]

    const checkIn = bookingContext?.checkInDate ?? `${year}-${month}-${date}`;
    const checkOut = bookingContext?.checkOutDate ?? `${year}-${month + 1}-${date}`;

    return {
        baseRateNightly: accommodation.basePriceNightly,
        currency: accommodation.currency,
        currencySymbol: formatCurrencySymbol(
            accommodation.currency,
        ),
        checkInDate: checkIn,
        checkOutDate: checkOut,
        nightsCount: nights || calculateNights(checkIn, checkOut),
        guestsCount: guests || 2,
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


function resolveCurrencySymbol(currency: string = 'EUR'): string {
    if (!currency) return '€';
    const symbol = getCurrencySymbol ? getCurrencySymbol(currency) : null;
    if (symbol) return symbol;

    switch (currency.toUpperCase()) {
        case 'USD':
            return '$';
        case 'GBP':
            return '£';
        case 'CHF':
            return 'CHF ';
        case 'JPY':
            return '¥';
        case 'EUR':
        default:
            return '€';
    }
}

/**
 * Maps alternative accommodation categories (within the same sanctuary or sister enclaves).
 * Excludes the currently viewed category to showcase distinct architectural alternatives.
 */
export function mapAccommodationSiblings(
    siblingCategories: (AccommodationCategoryWithRoomUnits & {
        sanctuary?: { name?: string; slug?: string };
    })[],
    currentAccommodationIdOrSlug?: string,
    currentSanctuaryName?: string,
): SiblingAccommodationItem[] {
    if (!Array.isArray(siblingCategories)) {
        return [];
    }

    return siblingCategories
        .filter(function (category) {
            if (!currentAccommodationIdOrSlug) return true;
            return (
                category.id !== currentAccommodationIdOrSlug &&
                category.slug !== currentAccommodationIdOrSlug
            );
        })
        .map(function (category) {
            const media = asJsonObject(category.mediaData);
            const rawFeatures = asArray(category.features);
            const rawPrivileges = asArray(category.privileges);

            // 1. Feature tags (up to 3 concise tags)
            const features = rawFeatures
                .map(function (feat): string {
                    if (typeof feat === 'string') return feat.trim();
                    if (feat && typeof feat === 'object') {
                        const featObj = feat as Record<string, unknown>;
                        return (
                            getString(featObj, 'title') ||
                            getString(featObj, 'name') ||
                            getString(featObj, 'detail')
                        );
                    }
                    return '';
                })
                .filter(function (feat) {
                    return feat.length > 0;
                })
                .slice(0, 3);

            // 2. Primary Privilege Preview
            let privilegeText = 'Dedicated 24-Hour Majordomo & Private Riva Access';
            if (rawPrivileges.length > 0) {
                const first = rawPrivileges[0];
                if (typeof first === 'string' && first.trim().length > 0) {
                    privilegeText = first.trim();
                } else if (first && typeof first === 'object') {
                    const firstObj = first as Record<string, unknown>;
                    privilegeText =
                        getString(firstObj, 'title') ||
                        getString(firstObj, 'description') ||
                        privilegeText;
                }
            }

            // 3. Category & Elevation Badges
            const formattedCategory = formatCategoryTitle(category.category);
            const badge = getString(
                media,
                'badge',
                category.viewOrientation
                    ? category.viewOrientation.split(' ')[0]
                    : formattedCategory
            );

            const elevationTag = getString(
                media,
                'elevationTag',
                category.viewOrientation || 'Panoramic Seclusion'
            );

            const heroImageUrl = getString(
                media,
                'heroImage',
                '/limestone-villa.png'
            );

            // 4. Estate context tag (shows if it's in the same estate or sister enclave)
            const sanctuaryLabel =
                category.sanctuary?.name || currentSanctuaryName || 'Estate';

            return {
                id: category.slug || category.id,
                slug: category.slug,
                name: category.name,
                category: formattedCategory,
                badge: badge.toUpperCase(),
                squareMeters: category.squareMeters,
                elevationTag: elevationTag.toUpperCase(),
                tagline: category.tagline,
                basePriceNightly: category.basePriceNightly,
                currencySymbol: resolveCurrencySymbol(category.currency),
                heroImageUrl,
                privilegeText,
                features,
                sanctuaryName: sanctuaryLabel,
                totalUnitsCount: category.roomUnits ? category.roomUnits.length : 1,
            };
        });
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
