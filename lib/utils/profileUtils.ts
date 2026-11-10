/**
 * Formats Sovereign membership tier and badge according to the database enum
 */
export function formatTierMetadata(sovereignTier?: string | null): {
    membershipTier: string;
    tierBadge: string;
} {
    const tier = (sovereignTier || 'EXPLORER').toUpperCase();

    if (tier === 'IMPERIAL_HONORARY') {
        return {
            membershipTier: 'SOVEREIGN PATRON • IMPERIAL HONORARY',
            tierBadge: 'Imperial Honorary Fellow',
        };
    }

    if (tier === 'SOVEREIGN_KEY') {
        return {
            membershipTier: 'SOVEREIGN PATRON • TIER I',
            tierBadge: 'Tier I Sovereign Fellow',
        };
    }

    return {
        membershipTier: 'RESIDENT PATRON • EXPLORER TIER',
        tierBadge: 'Explorer Circle',
    };
}

export interface DateRangeFormatOptions {
    /**
     * Month style: 'short' ('Sept', 'Oct') or 'long' ('September', 'October')
     * Defaults to 'short'.
     */
    monthFormat?: 'short' | 'long';
    /**
     * En-dash separator with spacing
     * Defaults to ' — '
     */
    separator?: string;
    /**
     * Fallback string if dates are invalid or null
     * Defaults to 'Sept 28 — Oct 05, 2025'
     */
    fallback?: string;
}

/**
 * Normalizes Date instances, ISO strings, or timestamp inputs into a valid Date object.
 * Returns null if the value is missing or represents an invalid timestamp.
 */
function toSafeDate(value: Date | string | number | null | undefined): Date | null {
    if (!value) return null;
    if (value instanceof Date) {
        return isNaN(value.getTime()) ? null : value;
    }
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Pads day digits to two places if required by specific vouchers
 */
function padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
}

/**
 * Maps standard short month names to Aurelia's Quiet Editorial convention
 * (e.g. "Sep" -> "Sept")
 */
function formatMonthName(date: Date, format: 'short' | 'long' = 'short'): string {
    if (format === 'long') {
        return date.toLocaleDateString('en-US', { month: 'long' });
    }
    const shortMonth = date.toLocaleDateString('en-US', { month: 'short' });
    return shortMonth === 'Sep' ? 'Sept' : shortMonth;
}

/**
 * Formats check-in and check-out dates into an elegant luxury horizon string:
 * - Same month:        "Oct 14 — 19, 2025"
 * - Different months:  "Sept 28 — Oct 05, 2025"
 * - Cross-year stays:  "Dec 29, 2025 — Jan 04, 2026"
 */
export function formatDateRange(
    checkInDate: Date | string | number | null | undefined,
    checkOutDate: Date | string | number | null | undefined,
    options: DateRangeFormatOptions = {}
): string {
    const {
        monthFormat = 'short',
        separator = ' — ',
        fallback = 'Sept 28 — Oct 05, 2025',
    } = options;

    const inDate = toSafeDate(checkInDate);
    const outDate = toSafeDate(checkOutDate);

    // Defensive fallback if either date is invalid
    if (!inDate || !outDate) {
        return fallback;
    }

    const inYear = inDate.getFullYear();
    const outYear = outDate.getFullYear();
    const inMonth = formatMonthName(inDate, monthFormat);
    const outMonth = formatMonthName(outDate, monthFormat);
    const inDay = inDate.getDate();
    const outDay = outDate.getDate();

    // 1. Cross-year boundary (e.g., Dec 28, 2025 — Jan 03, 2026)
    if (inYear !== outYear) {
        return `${inMonth} ${padZero(inDay)}, ${inYear}${separator}${outMonth} ${padZero(outDay)}, ${outYear}`;
    }

    // 2. Same month & same year (e.g., Oct 14 — 19, 2025)
    if (inMonth === outMonth) {
        return `${inMonth} ${padZero(inDay)}${separator}${padZero(outDay)}, ${outYear}`;
    }

    // 3. Different months within the same year (e.g., Sept 28 — Oct 05, 2025)
    return `${inMonth} ${padZero(inDay)}${separator}${outMonth} ${padZero(outDay)}, ${outYear}`;
}

/**
 * Formats calculated night duration into an editorial horizon label:
 * e.g. "7 Nights Horizon", "1 Night Residency"
 */
export function formatNightsHorizon(
    checkInDate: Date | string | number | null | undefined,
    checkOutDate: Date | string | number | null | undefined,
    fallbackNights = 7
): {
    nightsCount: number;
    nightsCountDisplay: string;
} {
    const inDate = toSafeDate(checkInDate);
    const outDate = toSafeDate(checkOutDate);

    let nights = fallbackNights;
    if (inDate && outDate) {
        const diffMs = outDate.getTime() - inDate.getTime();
        const computed = Math.round(diffMs / (1000 * 60 * 60 * 24));
        if (computed > 0) {
            nights = computed;
        }
    }

    const nightsCountDisplay = `${nights} ${nights === 1 ? 'Night' : 'Nights'} Horizon`;

    return {
        nightsCount: nights,
        nightsCountDisplay,
    };
}

export function computeNightsCount(
    checkIn: Date | string | null | undefined,
    checkOut: Date | string | null | undefined,
    fallbackNights = 7
): { count: number; display: string } {
    const inDate = toSafeDate(checkIn);
    const outDate = toSafeDate(checkOut);

    let count = fallbackNights;
    if (inDate && outDate) {
        const diffMs = outDate.getTime() - inDate.getTime();
        const computed = Math.round(diffMs / (1000 * 60 * 60 * 24));
        if (computed > 0) {
            count = computed;
        }
    }

    return {
        count,
        display: `${count} ${count === 1 ? 'Night' : 'Nights'} Horizon`,
    };
}

export function resolveHostLiaisonByTier(
    tier: string = 'EXPLORER',
    assignedStaff?: { name: string; role: string; phone?: string | null } | null
): {
    hostBadge: string;
    hostName: string;
    hostRole: string;
    phoneDisplay: string;
    phoneTel: string;
    isDedicatedMajordomo: boolean;
} {
    const normalized = (tier || 'EXPLORER').toUpperCase();
    const isSovereign = normalized.includes('SOVEREIGN') || normalized.includes('IMPERIAL');

    if (isSovereign && assignedStaff) {
        const phone = assignedStaff.phone || '+39 089 875 111';
        return {
            hostBadge: 'ASSIGNED PERSONAL MAJORDOMO',
            hostName: assignedStaff.name,
            hostRole: assignedStaff.role === 'MAJORDOMO'
                ? 'Senior Majordomo & Sommelier'
                : 'Personal Residence Intendant',
            phoneDisplay: phone,
            phoneTel: phone.replace(/\s+/g, ''),
            isDedicatedMajordomo: true,
        };
    }

    if (isSovereign) {
        return {
            hostBadge: 'ASSIGNED SENIOR MAJORDOMO',
            hostName: 'Matteo Bellini',
            hostRole: 'Senior Majordomo & Sommelier',
            phoneDisplay: '+39 089 875 111',
            phoneTel: '+39089875111',
            isDedicatedMajordomo: true,
        };
    }

    return {
        hostBadge: 'RESIDENT CONCIERGE LIAISON',
        hostName: 'Central Concierge Desk',
        hostRole: 'Resident Guest Service Relay',
        phoneDisplay: '+39 089 875 000',
        phoneTel: '+39089875000',
        isDedicatedMajordomo: false,
    };
}