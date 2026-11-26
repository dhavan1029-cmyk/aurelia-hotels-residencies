import { Decimal } from '@/app/generated/prisma/internal/prismaNamespace';
import { CurrencyCode } from '@/lib/data/currencyCatalog';

// ============================================================================
// 1. HEADER & WAYFINDING TYPES
// ============================================================================

export type CheckoutStepId = 'guest-details' | 'bespoke-staging' | 'ratification';

export interface CheckoutStepItem {
    id: CheckoutStepId;
    stepNumber: string;
    label: string;
    isActive: boolean;
    isCompleted: boolean;
}

export interface ConciergeHostInfo {
    name: string;
    roleTag: string;
    avatarUrl: string;
    phoneDisplay: string;
    phoneTel: string;
}

export interface CheckoutHeaderData {
    folioReferenceCode: string;
    currencyCode: CurrencyCode | string;
    currencySymbol?: string;
    concierge?: ConciergeHostInfo;
}

// ============================================================================
// 2. PATRON & LOGISTICS TYPES (SECTIONS 1 & 2)
// ============================================================================

export interface HonorificOption {
    label: string;
    value: string;
}

export interface ArrivalWindowOption {
    id: string;
    title: string;
    description: string;
}

export interface PatronFormData {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneCallingCode: string;
    phoneNumber: string;
    countryOfResidence: string;
    accompanyingGuestName?: string;
    selectedArrivalWindowId: string;
    transportDesignation?: string;
    dietaryAndCellarNuances?: string;
}

// ============================================================================
// 3. COMFORT & ADD-ONS TYPES (SECTIONS 3 & 4)
// ============================================================================

export interface PillowOption {
    id: string;
    title: string;
    description: string;
    tag?: string;
}

export interface CuratedAddOnItem {
    id: string;
    badge: string;
    title: string;
    description: string;
    price: number;
    currencyCode?: CurrencyCode | string;
    defaultSelected?: boolean;
}

export interface ComfortAndAddOnsValues {
    selectedPillowId: string;
    temperatureCelsius: number | Decimal;
    selectedAddOnIds: string[];
}

export interface SovereignPrivilegeSummary {
    isVerified: boolean;
    label: string;
    discountPercent: number;
    discountAmount: number;
}

// ============================================================================
// 4. FOLIO LEDGER & SUMMARY TYPES
// ============================================================================

export interface FolioStaySummary {
    residenceTierTag: string;
    suiteName: string;
    suiteSlug: string;
    sanctuaryName: string;
    sanctuaryLocation: string;
    suiteImageUrl: string;
    checkInDateDisplay: string;
    checkOutDateDisplay: string;
    nightsCount: number;
    guestsCount: number;
    baseRateNightly: number;
    currencyCode?: CurrencyCode | string;
    currencySymbol?: string;
}

export interface PatronHostCardData {
    name: string;
    roleTag: string;
    statusText: string;
    avatarUrl: string;
    phoneDisplay: string;
    phoneTel: string;
}
