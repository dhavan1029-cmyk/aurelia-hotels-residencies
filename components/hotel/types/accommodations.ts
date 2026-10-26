export interface AccommodationRateBreakdown {
    baseRateNightly: number;
    currency: string;
    currencySymbol: string;
    checkInDate: string; // ISO format or display string
    checkOutDate: string;
    nightsCount: number;
    guestsCount: number;
    maxGuests: number;
    vatRatePercentage: number;
    cityTaxPerGuestNight: number;
    bestRateGuaranteeText: string;
    complimentaryTransferHeadline: string;
    complimentaryTransferDetails: string;
}

export interface PrivilegeItem {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    badge?: string;
}

export interface SanctuaryPolicyItem {
    label: string;
    value: string;
    details?: string;
}

export interface PrivilegesAndPoliciesData {
    // 1. Curated Privileges Section
    privilegesEyebrow: string;
    privilegesHeading: string;
    privilegesDescription: string;
    privilegesList: PrivilegeItem[];

    // 2. Sanctuary Policies & Courtesy Protocol
    policiesEyebrow: string;
    policiesHeading: string;
    policies: SanctuaryPolicyItem[];
    conciergeNotice: string;
}

export interface ArchitecturalFeature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export interface FloorplanZone {
    id: string;
    label: string;
    sublabel?: string;
    areaTag?: string;
    styleClass: string;
}

export interface SpatialMetric {
    label: string;
    sublabel: string;
    icon: React.ReactNode;
}

export interface AccommodationNarrativeAndFloorplanData {
    // 4 Spatial Specifications (maps to specs & sensoryCapabilities in AccommodationCategory)
    spatialMetrics: SpatialMetric[];

    // Narrative Section
    sectionEyebrow: string;
    headline: string;
    paragraphs: string[];
    features: ArchitecturalFeature[];

    // Spatial Floorplan Section
    floorplanEyebrow: string;
    floorplanTitle: string;
    grossFootprint: string;
    deckArea: string;
    legendItems: Array<{
        colorClass: string;
        label: string;
    }>;

}

export interface GalleryMediaItem {
    url: string;
    alt: string;
    title?: string;
    badge?: string;
    actionLabel?: string;
}

export interface AccommodationGalleryData {
    // Relational breadcrumbs and classification
    sanctuaryEyebrow: string;
    wingSubtitle: string | null;
    suiteTitle: string;
    ratingScore: number;
    appraisalsCount: number;
    patronReserveTier: string;

    // Gallery visual assets (maps to mediaData Json in AccommodationCategory)
    heroImage: GalleryMediaItem;
    secondaryTopImage: GalleryMediaItem;
    secondaryBottomImage: GalleryMediaItem;
}

export interface SiblingAccommodationItem {
    id: string;
    slug: string;
    name: string;
    category: string;
    badge: string;
    squareMeters: number;
    elevationTag: string;
    tagline: string;
    basePriceNightly: number;
    currencySymbol: string;
    heroImageUrl: string;
    privilegeText: string;
    features: string[];
}

export interface AccommodationSiblingsData {
    eyebrow: string;
    heading: string;
    description: string;
    viewAllHref: string;
    siblings: SiblingAccommodationItem[];
}