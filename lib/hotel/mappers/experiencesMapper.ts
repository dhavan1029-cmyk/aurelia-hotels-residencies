import { getCurrencySymbol, CurrencyCode } from '@/lib/data/currencyCatalog';
import type { ExperiencesHeaderData } from '@/components/hotel/experiences/Header';
import type {
    FeaturedExpeditionData,
    ExpeditionSpecMetric,
} from '@/components/hotel/experiences/FeaturedExpeditionHeroSection';
import type {
    RhythmExperienceCardData,
    RhythmFeatureSpec,
} from '@/components/hotel/experiences/SignatureRhythmsDualBentoSection';
import type {
    EnologyExperienceCardData,
    MasterclassFeaturePill,
} from '@/components/hotel/experiences/EnologyAndTerroirMasterclassesSection';
import type { BespokeInquiryBannerData } from '@/components/hotel/experiences/BespokeConciergeInquiryBanner';

// ============================================================================
// 1. DATABASE ENTITY CONTRACTS (PRISMA RELATIONAL SHAPES)
// ============================================================================

export interface DbSanctuaryMediaData {
    heroImage?: string;
    gallery?: string[];
}

export interface DbStaffMemberPayload {
    id: string;
    sanctuaryId: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    isActive: boolean;
    avatarUrl?: string | null;
}

export interface DbDiningVenueMediaData {
    heroImage?: string;
    gallery?: string[];
}

export interface DbDiningVenuePayload {
    id: string;
    sanctuaryId: string;
    name: string;
    cuisineType: string;
    michelinStars?: number | null;
    dressCode: string;
    hours: string;
    mediaData?: DbDiningVenueMediaData | Record<string, unknown> | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface DbExperienceNarrative {
    body?: string;
    headline?: string;
    paragraphs?: string[];
    curatorNote?: string;
}

export interface DbExperienceMediaData {
    heroImage?: string;
    gallery?: string[];
}

export interface DbExperienceScheduleData {
    departureTime?: string;
    operatingDays?: string[];
    seatingTimes?: string[];
}

export interface DbExperiencePayload {
    id: string;
    sanctuaryId: string;
    slug: string;
    title: string;
    category: string;
    tagline: string;
    durationMinutes: number;
    pricePerPerson: number;
    currency: string;
    maxPartySize: number;
    mediaData?: DbExperienceMediaData | Record<string, unknown> | null;
    narrative?: DbExperienceNarrative | Record<string, unknown> | null;
    scheduleData?: DbExperienceScheduleData | Record<string, unknown> | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface DbSanctuaryWithExperiencesPayload {
    id: string;
    slug: string;
    code: string;
    name: string;
    tagline: string;
    city: string;
    region: string;
    country: string;
    latitude: number;
    longitude: number;
    mapUrl?: string | null;
    timezone: string;
    currency: string;
    status: string;
    contactEmail: string;
    contactPhone: string;
    mediaData?: DbSanctuaryMediaData | Record<string, unknown> | null;
    editorial?: Record<string, unknown> | null;
    arrivalGuide?: Record<string, unknown> | null;
    description?: string | null;
    experiences?: DbExperiencePayload[] | null;
    diningVenues?: DbDiningVenuePayload[] | null;
    staff?: DbStaffMemberPayload[] | null;
}

// ============================================================================
// 2. HELPER UTILITIES
// ============================================================================

function extractMediaHeroImage(media: unknown, fallback: string): string {
    if (!media || typeof media !== 'object') return fallback;
    const m = media as Record<string, unknown>;
    if (typeof m.heroImage === 'string' && m.heroImage.trim().length > 0) {
        return m.heroImage;
    }
    if (Array.isArray(m.gallery) && m.gallery.length > 0 && typeof m.gallery[0] === 'string') {
        return m.gallery[0];
    }
    return fallback;
}

function resolveMajordomo(staffList?: DbStaffMemberPayload[] | null): {
    name: string;
    phone: string;
    role: string;
} {
    if (staffList && staffList.length > 0) {
        const majordomo = staffList.find(function (s) {
            return s.role === 'MAJORDOMO' && s.isActive !== false;
        });
        if (majordomo) {
            return {
                name: majordomo.name,
                phone: majordomo.phone,
                role: majordomo.role,
            };
        }
        const activeStaff = staffList[0];
        return {
            name: activeStaff.name,
            phone: activeStaff.phone,
            role: activeStaff.role,
        };
    }

    return {
        name: 'Matteo de Luca',
        phone: '+39 089 875 000',
        role: 'Head Majordomo',
    };
}

function formatDurationHoursOrMinutes(durationMinutes: number): string {
    if (!durationMinutes || durationMinutes <= 0) return 'Flexible Horizon';
    if (durationMinutes >= 60) {
        const hours = durationMinutes / 60;
        return hours % 1 === 0 ? `${hours} Hours` : `${durationMinutes} Minutes`;
    }
    return `${durationMinutes} Minutes`;
}

// ============================================================================
// 3. MAPPER: SECTION 1 (ExperiencesHeaderSection)
// ============================================================================

export function mapSanctuaryToExperiencesHeader(
    sanctuary: DbSanctuaryWithExperiencesPayload
): ExperiencesHeaderData {
    const locationPill = `SANCTUARY ${sanctuary.city.toUpperCase()} • ${sanctuary.region.toUpperCase()}`;
    const majordomo = resolveMajordomo(sanctuary.staff);
    const phoneDisplay = sanctuary.contactPhone || majordomo.phone;
    const phoneTel = phoneDisplay.replace(/\s+/g, '');

    return {
        sanctuaryLocationPill: locationPill,
        majordomoName: majordomo.name,
        directDeskPhoneDisplay: phoneDisplay,
        directDeskPhoneTel: phoneTel,
    };
}

// ============================================================================
// 4. MAPPER: SECTION 2 (FeaturedExpeditionHeroSection)
// ============================================================================

export function mapExperiencesToFeaturedExpedition(
    experiences: DbExperiencePayload[],
    sanctuaryName: string = 'Aurelia Sanctuary Positano'
): FeaturedExpeditionData {
    // 1. Resolve preferred marine or highest-tariff charter experience
    const featured =
        experiences.find(function (exp) {
            const cat = exp.category.toUpperCase();
            return cat.includes('MARINE') || cat.includes('CHARTER') || exp.slug.includes('riva');
        }) ||
        experiences[0] || {
            id: 'exp-riva-aquarama-capri',
            slug: 'private-riva-aquarama-faraglioni-capri',
            title: 'Private Riva Aquarama Faraglioni & Capri Expedition',
            category: 'PRIVATE MARINE CHARTER • FULL DAY OR SUNSET CRUISE',
            tagline: 'Restored 1968 Classic Navigation',
            durationMinutes: 480,
            pricePerPerson: 1850,
            currency: 'EUR',
            maxPartySize: 6,
            mediaData: { heroImage: '/limestone-villa.png' },
            narrative: {
                paragraphs: [
                    `Embark directly from the ${sanctuaryName} private limestone slipway aboard our master-restored 1968 Riva Aquarama Super. Glide across the sapphire expanse toward the sheer sea-stacks of the Faraglioni, anchoring in secluded turquoise grottos inaccessible by terrestrial path.`,
                    'Each voyage is attended by our licensed senior skipper and dedicated steward. Enjoy cellar-chilled Franciacorta Gran Cuvée paired with artisan Campanian cicchetti, followed by an optional tender disembarkation at private cliff landings.',
                ],
            },
        };

    const currency = (featured.currency || 'EUR') as CurrencyCode;
    const currencySymbol = getCurrencySymbol(currency);
    const heroImageUrl = extractMediaHeroImage(featured.mediaData, '/limestone-villa.png');

    // Parse narrative paragraphs from json
    let narrativeParagraphs: string[] = [];
    if (featured.narrative && typeof featured.narrative === 'object') {
        const n = featured.narrative as Record<string, unknown>;
        if (Array.isArray(n.paragraphs) && n.paragraphs.length > 0) {
            narrativeParagraphs = n.paragraphs.filter(function (p): p is string {
                return typeof p === 'string';
            });
        } else if (typeof n.body === 'string') {
            narrativeParagraphs = [n.body];
        }
    }

    if (narrativeParagraphs.length === 0) {
        narrativeParagraphs = [
            `Embark directly from the ${sanctuaryName} private slipway for an unhurried, private coastal expedition.`,
            'Attended by certified estate crew, providing chilled cellar reserves and artisan culinary collations.',
        ];
    }

    const specMetrics: ExpeditionSpecMetric[] = [
        {
            label: formatDurationHoursOrMinutes(featured.durationMinutes),
            sublabel: 'EXPEDITION HORIZON',
            iconType: 'duration',
        },
        {
            label: `Up to ${featured.maxPartySize || 6} Patrons`,
            sublabel: 'EXCLUSIVE CAPACITY',
            iconType: 'party',
        },
        {
            label: 'Master & Steward',
            sublabel: 'DEDICATED CREW',
            iconType: 'crew',
        },
        {
            label: 'In-Cove Artisan Collation',
            sublabel: 'RESERVE SOMMELIER',
            iconType: 'catering',
        },
    ];

    const includedHighlights = [
        'Private captain, marine fuel, and maritime permits included',
        'Vintage champagne & seasonal orchard fruit collation',
        'Subsurface snorkel gear & underwater seabob immersion',
        'Seamless room-folio billing & complimentary helipad coordination',
    ];

    return {
        experienceId: featured.id,
        slug: featured.slug,
        heroBadge: 'FEATURED EXPEDITION',
        heritageBadge: featured.tagline?.toUpperCase() || 'RESTORED CLASSIC',
        categoryTag: featured.category.toUpperCase().split('_').join(' '),
        title: featured.title,
        tariffAmount: featured.pricePerPerson,
        tariffUnit: 'per charter voyage',
        currencySymbol,
        currencyCode: currency,
        narrative: narrativeParagraphs,
        specMetrics,
        includedHighlights,
        primaryCtaLabel: 'RESERVE CHARTER RENDEZVOUS',
        heroImageUrl,
        heroImageAlt: `${featured.title} — ${sanctuaryName}`,
    };
}

// ============================================================================
// 5. MAPPER: SECTION 3 (SignatureRhythmsDualBentoSection)
// ============================================================================

export function mapExperiencesAndDiningToSignatureRhythms(
    experiences: DbExperiencePayload[],
    diningVenues?: DbDiningVenuePayload[] | null
): RhythmExperienceCardData[] {
    const cards: RhythmExperienceCardData[] = [];

    // Card 1: Thermal / Wellness / Recovery Experience
    const thermalExp =
        experiences.find(function (e) {
            const c = (e.category || '').toUpperCase();
            return c.includes('THERMAL') || c.includes('WELLNESS') || e.slug.includes('caldarium');
        }) ||
        experiences.find(function (e) {
            return !e.category.toUpperCase().includes('MARINE');
        });

    if (thermalExp) {
        const currency = (thermalExp.currency || 'EUR') as CurrencyCode;
        const heroImageUrl = extractMediaHeroImage(thermalExp.mediaData, '/limestone-villa.png');

        let narrativeText = thermalExp.tagline;
        if (thermalExp.narrative && typeof thermalExp.narrative === 'object') {
            const n = thermalExp.narrative as Record<string, unknown>;
            if (typeof n.body === 'string') {
                narrativeText = n.body;
            } else if (Array.isArray(n.paragraphs) && n.paragraphs.length > 0) {
                narrativeText = n.paragraphs[0];
            }
        }

        const specs: RhythmFeatureSpec[] = [
            { iconType: 'clock', label: `${thermalExp.durationMinutes || 90} Minutes` },
            { iconType: 'patrons', label: `Max ${thermalExp.maxPartySize || 2} Patrons` },
            { iconType: 'curation', label: 'Volcanic Mineral Soak' },
            { iconType: 'sommelier', label: 'Botanical Herbal Infusion' },
        ];

        cards.push({
            id: thermalExp.id,
            slug: thermalExp.slug,
            categoryBadge: thermalExp.category.toUpperCase().split('_').join(' '),
            title: thermalExp.title,
            tagline: thermalExp.tagline,
            narrative: narrativeText,
            tariffAmount: thermalExp.pricePerPerson,
            tariffUnit: 'per patron ritual',
            currencySymbol: getCurrencySymbol(currency),
            currencyCode: currency,
            specs,
            primaryCtaLabel: 'RESERVE RITUAL',
            heroImageUrl,
            heroImageAlt: thermalExp.title,
            isMichelin: false,
        });
    }

    // Card 2: Signature Dining Venue or Gastronomy Experience
    const venue = diningVenues && diningVenues.length > 0 ? diningVenues[0] : null;

    if (venue) {
        const heroImageUrl = extractMediaHeroImage(venue.mediaData, '/limestone-villa.png');
        const michelin = venue.michelinStars && venue.michelinStars > 0 ? venue.michelinStars : undefined;

        const specs: RhythmFeatureSpec[] = [
            { iconType: 'clock', label: venue.hours || '19:30 or 21:00 Seating' },
            { iconType: 'patrons', label: '2 to 6 Patrons' },
            { iconType: 'curation', label: `${venue.cuisineType} Journey` },
            { iconType: 'sommelier', label: 'Sommelier Reserve Pairing' },
        ];

        cards.push({
            id: venue.id,
            slug: `dining-${venue.id}`,
            categoryBadge: `${venue.cuisineType.toUpperCase()} & WINE CELLAR`,
            title: venue.name,
            tagline: `Seven-Course Degustation & Rare Cellar Vintages • ${venue.dressCode}`,
            narrative: `Perched high above the Mediterranean surf on an open-air travertine terrace. Executive gastronomy presenting an unhurried multi-course tasting journey accompanied by rare cellar reserve cru pours.`,
            tariffAmount: 320,
            tariffUnit: 'per patron tasting',
            currencySymbol: '€',
            currencyCode: 'EUR',
            specs,
            primaryCtaLabel: 'REQUEST DINING TABLE',
            heroImageUrl,
            heroImageAlt: `${venue.name} fine dining presentation`,
            isMichelin: Boolean(michelin),
            michelinStars: michelin,
        });
    } else {
        // Fallback to secondary experience if no DiningVenue records exist
        const diningExp = experiences.find(function (e) {
            return (
                e.id !== cards[0]?.id &&
                (e.category.toUpperCase().includes('GASTRONOMY') || e.slug.includes('belvedere'))
            );
        }) || experiences[1];

        if (diningExp) {
            const currency = (diningExp.currency || 'EUR') as CurrencyCode;
            const heroImageUrl = extractMediaHeroImage(diningExp.mediaData, '/limestone-villa.png');

            cards.push({
                id: diningExp.id,
                slug: diningExp.slug,
                categoryBadge: diningExp.category.toUpperCase().split('_').join(' '),
                title: diningExp.title,
                tagline: diningExp.tagline,
                narrative: diningExp.tagline,
                tariffAmount: diningExp.pricePerPerson,
                tariffUnit: 'per patron tasting',
                currencySymbol: getCurrencySymbol(currency),
                currencyCode: currency,
                specs: [
                    { iconType: 'clock', label: `${diningExp.durationMinutes} Minutes` },
                    { iconType: 'patrons', label: `Max ${diningExp.maxPartySize} Patrons` },
                    { iconType: 'curation', label: 'Artisan Culinary Course' },
                    { iconType: 'sommelier', label: 'Sommelier Pours' },
                ],
                primaryCtaLabel: 'REQUEST DINING TABLE',
                heroImageUrl,
                heroImageAlt: diningExp.title,
                isMichelin: true,
                michelinStars: 3,
            });
        }
    }

    return cards;
}

// ============================================================================
// 6. MAPPER: SECTION 4 (EnologyAndTerroirMasterclassesSection)
// ============================================================================

export function mapExperiencesToEnologyMasterclasses(
    experiences: DbExperiencePayload[]
): EnologyExperienceCardData[] {
    // Filter for cellar, wine, agronomist, harvest, or tasting experiences
    const enologyExps = experiences.filter(function (e) {
        const text = `${e.category} ${e.title} ${e.slug}`.toUpperCase();
        return (
            text.includes('CELLAR') ||
            text.includes('WINE') ||
            text.includes('ENOLOGY') ||
            text.includes('BAROLO') ||
            text.includes('OLIVE') ||
            text.includes('HARVEST') ||
            text.includes('TASTING')
        );
    });

    const targetList = enologyExps.length > 0 ? enologyExps : experiences.slice(0, 3);

    return targetList.map(function (exp, index) {
        const currency = (exp.currency || 'EUR') as CurrencyCode;
        const heroImageUrl = extractMediaHeroImage(exp.mediaData, '/limestone-villa.png');

        let narrativeText = exp.tagline;
        if (exp.narrative && typeof exp.narrative === 'object') {
            const n = exp.narrative as Record<string, unknown>;
            if (typeof n.body === 'string') {
                narrativeText = n.body;
            } else if (Array.isArray(n.paragraphs) && n.paragraphs.length > 0) {
                narrativeText = n.paragraphs[0];
            }
        }

        const isWine = exp.title.toUpperCase().includes('BAROLO') || exp.title.toUpperCase().includes('WINE');
        const specs: MasterclassFeaturePill[] = [
            {
                iconType: 'duration',
                label: `${exp.durationMinutes || 90} Minutes`,
            },
            {
                iconType: 'vintage',
                label: isWine ? '5 Historic Vintages' : '4 Ancient Cultivars Pressed',
            },
            {
                iconType: 'sommelier',
                label: isWine ? 'Private Sommelier Masterclass' : 'Master Agronomist Guided',
            },
            {
                iconType: 'keepsake',
                label: isWine ? 'Artisan Fromage & Truffle Flight' : 'Monogrammed 500ml EVOO Bottle',
            },
        ];

        return {
            id: exp.id,
            slug: exp.slug,
            categoryBadge: exp.category.toUpperCase().split('_').join(' '),
            curatorTag: `LIMITED TO ${exp.maxPartySize || 6} GUESTS`,
            title: exp.title,
            tagline: exp.tagline,
            narrative: narrativeText,
            tariffAmount: exp.pricePerPerson,
            tariffUnit: 'per patron session',
            currencySymbol: getCurrencySymbol(currency),
            currencyCode: currency,
            specs,
            inclusionsSummary: isWine
                ? 'Includes Riedel Sommelier crystal service and bespoke cellar monograph keepsake.'
                : 'Includes hearth-baked sourdough tasting and personalized wax-sealed harvest bottle.',
            primaryCtaLabel: isWine ? 'INQUIRE FOR CELLAR PLACEMENT' : 'RESERVE BOTANICAL SESSION',
            heroImageUrl,
            heroImageAlt: exp.title,
        };
    });
}

// ============================================================================
// 7. MAPPER: SECTION 5 (BespokeConciergeInquiryBanner)
// ============================================================================

export function mapSanctuaryToConciergeInquiryBanner(
    sanctuary: DbSanctuaryWithExperiencesPayload
): BespokeInquiryBannerData {
    const majordomo = resolveMajordomo(sanctuary.staff);
    const phoneDisplay = sanctuary.contactPhone || majordomo.phone;
    const phoneTel = phoneDisplay.replace(/\s+/g, '');

    return {
        hotlineDisplay: phoneDisplay,
        hotlineTel: phoneTel,
        majordomoName: majordomo.name,
        highlights: [
            `Direct private Riva tender boarding from ${sanctuary.name} sea gate`,
            'Bespoke Michelin-starred in-cove tasting menu curation',
            'Full nautical liability, skipper, and fuel clearance',
            'Room-folio settlement and helipad rendezvous coordination',
        ],
    };
}
