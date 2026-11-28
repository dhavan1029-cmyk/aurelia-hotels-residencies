// import type { Sanctuary, Experience, DiningVenue } from '@prisma/client';
import type {
    ExperiencesTelemetryData,
    ExperiencesEditorialData,
    ExperienceCategoryOption,
    ExperienceCategoryId,
} from '@/components/hotel/experiences/ExperiencesHeader';
import type {
    ExpeditionSpecItem,
    FeaturedExpeditionData,
} from '@/components/hotel/experiences/FeaturedExpeditionHeroSection';
import type {
    DiningVenueMetric,
    GastronomicVenueData,
} from '@/components/hotel/experiences/GastronomicSanctuariesSection';
import type {
    SignatureEncounterItem,
    EncounterMetricPill,
    SanctuaryCredentialMetric,
} from '@/components/hotel/experiences/CuratedEncountersSection';
import type { SovereignPrivatizationData } from '@/components/hotel/experiences/SovereignPrivatizationSection';
import { DiningVenue, Experience, Sanctuary } from '@/app/generated/prisma/client';

// ============================================================================
// 1. JSONB SCHEMA CONTRACTS (Matching Seed Data Payloads)
// ============================================================================

export interface SanctuaryMediaDataJson {
    heroImage?: string;
    heroAlt?: string;
    gallery?: string[];
    panoramas?: Array<{ label: string; url: string }>;
}

export interface SanctuaryEditorialJson {
    eyebrow?: string;
    manifesto?: string;
    architect?: string;
    accolades?: string[];
}

export interface SanctuaryArrivalGuideJson {
    helipadCoordinates?: string;
    seaDockVhfChannel?: string;
    privateJetAirport?: string;
    chauffeurNotice?: string;
}

export interface ExperienceMediaDataJson {
    imageUrl?: string;
    imageAlt?: string;
    badgePrimary?: string;
    badgeSecondary?: string;
    tariffFormatted?: string;
    priceUnit?: string;
    circuitLabel?: string;
    isFlagship?: boolean;
    displayOrder?: number;
    inclusionFootnote?: string;
    badgeCategory?: string;
}

export interface ExperienceNarrativeJson {
    shortDescription?: string;
    fullMonograph?: string;
    inclusions?: string[];
    crewDescription?: string;
}

export interface ExperienceScheduleDataJson {
    operatingDays?: string[];
    departureTime?: string;
    returnTime?: string;
    meetingPoint?: string;
    weatherPolicy?: string;
    seatings?: string[];
    metrics?: Array<{
        label?: string;
        value?: string;
        icon?: string;
        primary?: string;
        sublabel?: string;
    }>;
}

export interface DiningVenueMediaDataJson {
    slug?: string;
    badgeLabel?: string;
    subBadgeLabel?: string;
    imageUrl?: string;
    imageAlt?: string;
    cuisineSubtitle?: string;
    narrative?: string;
    seatings?: string;
    cellarFocus?: string;
    sommelierInAttendance?: string;
    footnoteLabel?: string;
    ctaLabel?: string;
    ctaHref?: string;
    isPrimaryCta?: boolean;
    metrics?: Array<{ label: string; value: string }>;
}

// ============================================================================
// 2. HELPER UTILITIES
// ============================================================================

function parseJson<T>(raw: unknown, fallback: T): T {
    if (!raw) return fallback;
    if (typeof raw === 'object') return raw as T;
    if (typeof raw === 'string') {
        try {
            return JSON.parse(raw) as T;
        } catch {
            return fallback;
        }
    }
    return fallback;
}

function formatCoordinates(lat: number, lng: number): string {
    const latDir = lat >= 0 ? 'N' : 'S';
    const lngDir = lng >= 0 ? 'E' : 'W';
    return `${Math.abs(lat).toFixed(4)}°${latDir}, ${Math.abs(lng).toFixed(4)}°${lngDir}`;
}

// ============================================================================
// 3. PHASE 1 MAPPERS: Telemetry, Editorial Header, and Category Counts
// ============================================================================

export function mapSanctuaryToTelemetry(sanctuary?: Sanctuary | null): ExperiencesTelemetryData {
    if (!sanctuary) {
        return {
            sanctuaryName: 'SANCTUARY POSITANO',
            regionSubtitle: 'AMALFI COASTLINE, ITALY',
            coordinatesDisplay: '40.6281°N, 14.4850°E',
            majordomoPhoneDisplay: '+39 089 875 111',
            majordomoPhoneTel: '+39089875111',
            dossierCode: 'POS-01 • MMXV-VII',
        };
    }

    const cleanTel = sanctuary.contactPhone.replace(/\s+/g, '');
    const coordinatesDisplay = formatCoordinates(sanctuary.latitude, sanctuary.longitude);

    return {
        sanctuaryName: sanctuary.name.toUpperCase(),
        regionSubtitle: `${sanctuary.region.toUpperCase()}, ${sanctuary.country.toUpperCase()}`,
        coordinatesDisplay,
        majordomoPhoneDisplay: sanctuary.contactPhone,
        majordomoPhoneTel: cleanTel,
        dossierCode: `${sanctuary.code} • SOVEREIGN KEY`,
    };
}

export function mapSanctuaryToEditorialHeader(sanctuary?: Sanctuary | null): ExperiencesEditorialData {
    if (!sanctuary) {
        return {
            folioLabel: 'FOLIO NO. IV • CURATED ITINERARIES & CELLAR ARCHIVES',
            headline: 'Curated Escapes & Sensory Gastronomy',
            narrativeMonograph:
                'Suspended between sheer limestone cliffs and the Tyrrhenian abyss, each encounter is an unhurried, private rite curated exclusively for the patrons of Sanctuary Positano.',
        };
    }

    const editorial = parseJson<SanctuaryEditorialJson>(sanctuary.editorial, {});

    return {
        folioLabel: editorial.eyebrow || `FOLIO ${sanctuary.code} • CURATED ITINERARIES & CELLAR ARCHIVES`,
        headline: sanctuary.tagline || 'Curated Escapes & Sensory Gastronomy',
        narrativeMonograph:
            editorial.manifesto ||
            sanctuary.description ||
            `Chiseled directly into the cliffs, each encounter is an unhurried, private rite curated exclusively for patrons of ${sanctuary.name}.`,
    };
}

export function mapCategoryFilterOptions(
    categoryCounts: Record<string, number>,
    totalCount: number
): ExperienceCategoryOption[] {
    return [
        { id: 'all', label: 'All Encounters', count: totalCount },
        { id: 'marine-charters', label: 'Marine Charters', count: categoryCounts['marine-charters'] || 0 },
        { id: 'thermal-wellness', label: 'Thermal Wellness', count: categoryCounts['thermal-wellness'] || 0 },
        { id: 'gastronomy-dining', label: 'Gastronomy & Dining', count: categoryCounts['gastronomy-dining'] || 0 },
        { id: 'terroir-masterclasses', label: 'Terroir & Masterclasses', count: categoryCounts['terroir-masterclasses'] || 0 },
    ];
}

// ============================================================================
// 4. PHASE 2 MAPPER: Flagship Expedition Hero Section
// ============================================================================

export function mapToFeaturedExpeditionData(
    experience: Experience,
    sanctuary?: Sanctuary | null
): FeaturedExpeditionData {
    const id = experience.id;
    const media = parseJson<ExperienceMediaDataJson>(experience.mediaData, {});
    const narrative = parseJson<ExperienceNarrativeJson>(experience.narrative, {});
    const schedule = parseJson<ExperienceScheduleDataJson>(experience.scheduleData, {});

    // Map schedule metrics into ExpeditionSpec items
    const defaultSpecs: ExpeditionSpecItem[] = [
        {
            id,
            label: 'DURATION',
            value: `${Math.round(experience.durationMinutes / 60)} Hours (${experience.durationMinutes} Min)`,
            iconType: 'duration',
        },
        {
            id,
            label: 'PARTY ALLOTMENT',
            value: `Up to ${experience.maxPartySize} Patrons`,
            iconType: 'party',
        },
        {
            id,
            label: 'MASTER CREW',
            value: narrative.crewDescription?.split('&')[0]?.replace('Commanded by', '').trim() || 'Skipper & Sommelier',
            iconType: 'crew',
        },
        {
            id,
            label: 'CULINARY PROVISIONS',
            value: 'In-Cove Crudo Feast',
            iconType: 'culinary',
        },
    ];

    let specs = defaultSpecs;
    if (Array.isArray(schedule.metrics) && schedule.metrics.length > 0) {
        specs = schedule.metrics.map(function (m, idx) {
            return {
                id,
                label: m.label || defaultSpecs[idx]?.label || 'SPECIFICATION',
                value: m.value || defaultSpecs[idx]?.value || '',
                iconType: (m.icon as ExpeditionSpecItem['iconType']) || defaultSpecs[idx]?.iconType || 'duration',
            };
        });
    }

    const inclusions = Array.isArray(narrative.inclusions) && narrative.inclusions.length > 0
        ? narrative.inclusions
        : [
              'Private tender transfers directly from Sanctuary Cliffside Pontoon',
              'Dom Pérignon allocation & wild Mediterranean sea urchin crudo',
              'Sub-surface motorized Seabob exploration units & customized bath linens',
          ];

    const priceFormatted = media.tariffFormatted || `${experience.currency === 'EUR' ? '€' : experience.currency + ' '}${experience.pricePerPerson.toLocaleString()}`;

    return {
        id: experience.id,
        slug: experience.slug,
        badgePrimary: media.badgePrimary || 'FLAGSHIP EXPEDITION',
        badgeSecondary: media.badgeSecondary || experience.tagline.toUpperCase(),
        imageUrl: media.imageUrl || '/images/experiences/riva-aquarama-capri.jpg',
        imageAlt: media.imageAlt || experience.title,
        circuitLabel: media.circuitLabel || experience.tagline.toUpperCase(),
        imageHeadline: experience.title,
        categoryEyebrow: `${experience.category.toUpperCase().replace('-', ' ')} • EXPEDITION`,
        title: experience.title,
        tariffLabel: 'TARIFF / GUEST',
        priceFormatted,
        description: narrative.fullMonograph || narrative.shortDescription || experience.tagline,
        specs,
        inclusions,
        // ctaLabel: 'RESERVE CHARTER',
        // ctaHref: `/checkout?experienceId=${encodeURIComponent(experience.id)}&slug=${encodeURIComponent(experience.slug)}`,
    };
}

// ============================================================================
// 5. PHASE 3 MAPPER: Gastronomic Sanctuaries & Michelin Dining Venues
// ============================================================================

export function mapDiningVenueToViewModel(venue: DiningVenue): GastronomicVenueData {
    const media = parseJson<DiningVenueMediaDataJson>(venue.mediaData, {});

    const metrics: DiningVenueMetric[] = [
        { label: 'SEATINGS', value: media.seatings || venue.hours },
        { label: 'DRESS CODE', value: venue.dressCode },
        { label: 'CELLAR FOCUS', value: media.cellarFocus || 'Curated Regional Labels' },
    ];

    return {
        id: venue.id,
        slug: media.slug || venue.id,
        badgeLabel: media.badgeLabel || (venue.michelinStars ? `${venue.michelinStars === 3 ? 'THREE' : venue.michelinStars === 2 ? 'TWO' : 'ONE'} MICHELIN STAR${venue.michelinStars > 1 ? 'S' : ''}` : undefined),
        michelinStars: venue.michelinStars || undefined,
        subBadgeLabel: media.subBadgeLabel || undefined,
        imageUrl: media.imageUrl || '/images/dining/il-belvedere-cliffside.jpg',
        imageAlt: media.imageAlt || venue.name,
        cuisineSubtitle: media.cuisineSubtitle || venue.cuisineType.toUpperCase(),
        name: venue.name,
        narrative: media.narrative || `${venue.name} presents an unhurried exploration of regional culinary craftsmanship.`,
        metrics,
        footnoteLabel: media.footnoteLabel || 'Private Table Reservation Mandate',
        ctaLabel: media.ctaLabel || 'REQUEST TABLE',
        ctaHref: media.ctaHref || `/contact?subject=dining-${encodeURIComponent(venue.id)}`,
        isPrimaryCta: media.isPrimaryCta !== false,
    };
}

// ============================================================================
// 6. PHASE 4 MAPPER: Curated Signature Encounters & Institutional Credentials
// ============================================================================

export function mapExperienceToSignatureEncounter(experience: Experience): SignatureEncounterItem {
    const media = parseJson<ExperienceMediaDataJson>(experience.mediaData, {});
    const narrative = parseJson<ExperienceNarrativeJson>(experience.narrative, {});
    const schedule = parseJson<ExperienceScheduleDataJson>(experience.scheduleData, {});

    // Metrics Pill Extraction
    let metrics: EncounterMetricPill[] = [
        { primary: `${experience.durationMinutes} MIN`, sublabel: `MAX ${experience.maxPartySize} GUESTS` },
        { primary: 'EXCLUSIVE', sublabel: 'SANCTUARY ACCESS' },
    ];

    if (Array.isArray(schedule.metrics) && schedule.metrics.length > 0) {
        metrics = schedule.metrics.slice(0, 2).map(function (m) {
            return {
                primary: m.primary || m.value || `${experience.durationMinutes} MIN`,
                sublabel: m.sublabel || m.label || 'DETAILS',
            };
        });
    }

    const priceFormatted = media.tariffFormatted || `${experience.currency === 'EUR' ? '€' : experience.currency + ' '}${experience.pricePerPerson.toLocaleString()}`;

    return {
        id: experience.id,
        slug: experience.slug,
        badgeCategory: media.badgeCategory || experience.category.toUpperCase().replace('-', ' '),
        imageUrl: media.imageUrl || '/images/experiences/roman-caldarium-bath.jpg',
        imageAlt: media.imageAlt || experience.title,
        priceFormatted,
        priceUnit: media.priceUnit || 'PER GUEST',
        metrics,
        title: experience.title,
        description: narrative.shortDescription || narrative.fullMonograph || experience.tagline,
        inclusionFootnote: media.inclusionFootnote || 'PRIVATIZED ACCESS',
        ctaLabel: 'Inquire Session',
        ctaHref: `/contact?subject=experience-${encodeURIComponent(experience.slug)}`,
    };
}

export function buildDefaultSanctuaryCredentials(): SanctuaryCredentialMetric[] {
    return [
        {
            id: 'cred-fleet',
            iconType: 'fleet',
            eyebrow: 'MARITIME FLEET',
            value: '3 Vessels',
            description: 'Riva Aquarama, Wally 48, Gozzo Sorrentino',
        },
        {
            id: 'cred-cellar',
            iconType: 'cellar',
            eyebrow: 'CELLAR VINTAGE SPAN',
            value: '1947 – 2021',
            description: 'Over 4,200 curated and temperature-governed labels',
        },
        {
            id: 'cred-spring',
            iconType: 'spring',
            eyebrow: 'CALDARIUM SOURCE',
            value: '38.4°C Natural',
            description: 'Mineral volcanic spring bubbling from granite fault',
        },
        {
            id: 'cred-majordomo',
            iconType: 'majordomo',
            eyebrow: 'MAJORDOMO RATIO',
            value: '1:1 Dedicated',
            description: 'Personal itinerary planning and private transfer steward',
        },
    ];
}

// ============================================================================
// 7. PHASE 5 MAPPER: Sovereign Privatization Section Data
// ============================================================================

export function mapSanctuaryToPrivatizationData(sanctuary?: Sanctuary | null): SovereignPrivatizationData {
    const estateName = sanctuary?.name || 'Sanctuary Positano';
    const cleanPhone = sanctuary?.contactPhone || '+39 089 875 111';
    const tel = cleanPhone.replace(/\s+/g, '');

    return {
        eyebrow: 'ENTIRE FLEET & ESTATE BUYOUTS • SOVEREIGN CHARTER',
        headline: `Commission a Private ${estateName} Privatization`,
        narrative: `For diplomatic summits, multi-generational gatherings, or unannounced coastal retreats, the entire ${estateName} cliffside enclave, maritime fleet, and Michelin culinary brigade may be reserved under a single confidentiality seal.`,
        primaryCtaLabel: 'REQUEST PRIVATIZATION DOSSIER',
        primaryCtaHref: `/contact?subject=privatization-${encodeURIComponent(sanctuary?.slug || 'positano')}`,
        secondaryCtaLabel: 'SPEAK WITH MAJORDOMO DESK',
        secondaryCtaHref: `tel:${tel}`,
        gazetteEyebrow: 'THE AURELIA GAZETTE • SEASONAL DISPATCH',
        gazetteDescription:
            'Receive private invitations to unreleased cellar allocations, seasonal maritime routes, and off-calendar sanctuary openings.',
    };
}

