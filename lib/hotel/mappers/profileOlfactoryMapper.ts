import type { Prisma } from '@/app/generated/prisma/client';
import type {
    OlfactoryIntensityLevel,
    PreArrivalAtomizationNotice,
    ProfileOlfactorySectionData,
    SignatureAromaComposition,
    VaporIntensityTier,
} from '@/components/hotel/profile/ProfileOlfactorySection';

// ============================================================================
// 1. PRIMARY INPUT PRISMA CONTRACT (USER AS ROOT ENTITY)
// ============================================================================

export type FullUserWithProfileAndBookings = Prisma.UserGetPayload<{
    include: {
        profile: true;
        primaryMajordomo?: true;
        bookings: {
            include: {
                sanctuary: true;
                accommodationCategory: true;
                roomUnit: true;
                folio: true;
                assignedMajordomo: true;
            };
        };
    };
}>;

export interface OlfactoryMapperOptions {
    /**
     * Optional manual override of active sanctuary / location name
     */
    arrivalLocation?: string;
    /**
     * Optional assigned attendant or housekeeper name override
     */
    attendantName?: string;
    /**
     * Optional lead time in minutes before guest coordinates arrival (defaults to 180 min)
     */
    leadTimeMinutes?: number;
    /**
     * Optional active check-in target time to dynamically calculate countdownDisplay
     */
    targetArrivalTime?: Date | string;
}

// ============================================================================
// 2. MASTER CANONICAL OLFACTORY CATALOG (ATELIER RESERVES)
// ============================================================================

export const CANONICAL_AROMA_COMPOSITIONS: Record<string, SignatureAromaComposition> = {
    AMALFI_NEROLI_BERGAMOT: {
        id: 'amalfi-neroli-bergamot',
        reserveCode: 'ATELIER NO. 07',
        title: 'Amalfi Neroli, Fig Leaf & Wild Bergamot',
        terroir: 'Positano Coastal Cliffside Harvest • Cold-Pressed Volcanic Extraction',
        summary:
            'A luminous opening of sun-drenched coastal citrus transitioning into verdant fig foliage and petrified cedarwood, formulated to evoke the morning sea breeze across travertine terraces.',
        notes: {
            top: 'Cold-Pressed Calabrian Bergamot Rind, Sea Salt Mist & Bitter Orange Petals',
            heart: 'Sun-Bleached Wild Green Fig Leaf, Coastal Neroli Blossom & Crushed Rosemary',
            base: 'Petrified Amalfi Cedarwood, Sun-Warmed Limestone Ashlar & Golden Ambergris',
        },
    },
    TUSCAN_CYPRESS_CEDAR: {
        id: 'tuscan-cypress-stone',
        reserveCode: 'RESERVE NO. 04',
        title: 'Tuscan Cypress & Warm Stone',
        terroir: 'San Gimignano Woodland & Tivoli Quarry Travertine',
        summary: 'Dry resinous heartwood, sun-baked earth, and wild rosemary.',
        notes: {
            top: 'Crushed Wild Rosemary & Florentine Lemon Peel',
            heart: 'Aged Tuscan Cypress Cones & Mountain Pine Resin',
            base: 'Honed Tivoli Travertine Ashlar & Smoked Cedar Heartwood',
        },
    },
    ALPINE_JUNIPER: {
        id: 'kyoto-hinoki-shiso',
        reserveCode: 'RESERVE NO. 09',
        title: 'Kyoto Hinoki & Crisp Shiso',
        terroir: 'Higashiyama Bamboo Groves & Yoshino Cedar Spring',
        summary: 'Meditative sacred cedar, mineral vapor, and cool crushed herbs.',
        notes: {
            top: 'Red Shiso Leaf, Morning Glacial Mist & White Peppercorn',
            heart: 'Japanese Hinoki Heartwood & Tamba River Pebble Vapor',
            base: 'Aged Vetiver Root, Sacred Incense Smoke & Dried Moss',
        },
    },
    UNSCENTED: {
        id: 'florentine-orris-cashmere',
        reserveCode: 'RESERVE NO. 12',
        title: 'Florentine Orris & Cashmere',
        terroir: 'Chianti Hills Aged Rhizome Atelier',
        summary: 'Subtle powdery iris root, combed Italian wool, and amber resin.',
        notes: {
            top: 'Violet Leaf Infusion & Bitter Almond Kernel',
            heart: 'Five-Year Aged Florentine Orris Root & Wild Heliotrope',
            base: 'White Ambergris, Combed Cashmere Wool & Sandalwood Bark',
        },
    },
};

export const STANDARD_INTENSITY_TIERS: VaporIntensityTier[] = [
    {
        level: 10,
        label: 'Whisper (10%)',
        description: 'Transient botanical trace. 3 minutes diffusion every 60 minutes.',
        cycleSchedule: 'Cycle: 3m ON / 57m OFF',
    },
    {
        level: 25,
        label: 'Subtle (25%)',
        description: 'Aurelia master default. Elegant background presence without sensory fatigue.',
        cycleSchedule: 'Cycle: 5m ON / 25m OFF',
    },
    {
        level: 50,
        label: 'Ambient (50%)',
        description: 'Enveloping botanical warmth across all interconnected salon chambers.',
        cycleSchedule: 'Cycle: 10m ON / 15m OFF',
    },
    {
        level: 75,
        label: 'Full Bloom (75%)',
        description: 'Immediate deep olfactory immersion upon arrival and post-seawater bathing.',
        cycleSchedule: 'Cycle: 15m ON / 5m OFF',
    },
];

// ============================================================================
// 3. DEFENSIVE STRING & TIME HELPERS
// ============================================================================

function normalizeAromaCode(rawCode?: string | null): string {
    if (!rawCode) return 'AMALFI_NEROLI_BERGAMOT';
    const upper = rawCode.trim().toUpperCase().replace(/[-\s]/g, '_');

    if (upper.includes('CYPRESS') || upper.includes('CEDAR') || upper.includes('TUSCAN')) {
        return 'TUSCAN_CYPRESS_CEDAR';
    }
    if (upper.includes('HINOKI') || upper.includes('SHISO') || upper.includes('JUNIPER') || upper.includes('KYOTO')) {
        return 'ALPINE_JUNIPER';
    }
    if (upper.includes('ORRIS') || upper.includes('CASHMERE') || upper.includes('UNSCENTED')) {
        return 'UNSCENTED';
    }
    return 'AMALFI_NEROLI_BERGAMOT';
}

function computeCountdownDisplay(targetTime?: Date | string | null, fallbackHours: number = 3.0): string {
    if (!targetTime) {
        return `T - ${fallbackHours.toFixed(1)} HOURS`;
    }
    const target = new Date(targetTime);
    if (isNaN(target.getTime())) {
        return `T - ${fallbackHours.toFixed(1)} HOURS`;
    }

    const now = new Date();
    const diffMs = target.getTime() - now.getTime();
    if (diffMs <= 0) {
        return 'IN RESIDENCE • CONTINUOUS DIFFUSION';
    }

    const diffHours = diffMs / (1000 * 60 * 60);
    if (diffHours < 1) {
        const diffMins = Math.max(1, Math.round(diffMs / (1000 * 60)));
        return `T - ${diffMins} MINUTES`;
    }

    return `T - ${diffHours.toFixed(1)} HOURS`;
}

function optAromaIntensity(percent?: number | null): OlfactoryIntensityLevel {
    if (percent === null || percent === undefined) return 25;

    if (percent <= 17.5) return 10;
    if (percent > 17.5 && percent <= 37.5) return 25;
    if (percent > 37.5 && percent <= 62.5) return 50;
    return 75;
}

// ============================================================================
// 4. MASTER OLFACTORY MAPPER FUNCTION (USER AS ROOT INPUT)
// ============================================================================

/**
 * Maps database User (with included profile and bookings) directly into
 * the target ProfileOlfactorySectionData interface contract.
 */
export function mapToProfileOlfactorySectionData(
    user: FullUserWithProfileAndBookings,
    options: OlfactoryMapperOptions = {}
): ProfileOlfactorySectionData {
    const profile = user.profile;

    // ------------------------------------------------------------------------
    // A. RESOLVE ACTIVE & ALTERNATIVE COMPOSITIONS
    // ------------------------------------------------------------------------
    const rawBlend = profile?.roomAromaBlend || 'AMALFI_NEROLI_BERGAMOT';
    const selectedKey = normalizeAromaCode(rawBlend);

    // Active composition item
    const baseActive =
        CANONICAL_AROMA_COMPOSITIONS[selectedKey] ||
        CANONICAL_AROMA_COMPOSITIONS.AMALFI_NEROLI_BERGAMOT;

    const activeComposition: SignatureAromaComposition = {
        ...baseActive,
        isPrimaryActive: true,
    };

    // Remaining compositions assigned to alternativeCompositions array
    const alternativeKeys = Object.keys(CANONICAL_AROMA_COMPOSITIONS).filter(
        (key) => key !== selectedKey
    );

    const alternativeCompositions: SignatureAromaComposition[] = alternativeKeys.map((key) => ({
        ...CANONICAL_AROMA_COMPOSITIONS[key],
        isPrimaryActive: false,
    }));

    // ------------------------------------------------------------------------
    // B. RESOLVE ATOMIZATION NOTICE TELEMETRY & ATTENDANT
    // ------------------------------------------------------------------------
    const leadTimeMinutes = options.leadTimeMinutes ?? 180;

    // Find upcoming confirmed booking if available
    const activeBooking = user.bookings?.find(
        (b) => b.status === 'CONFIRMED' || b.status === 'CHECKED_IN'
    );

    // Dynamic arrival location resolution
    const arrivalLocation =
        options.arrivalLocation ||
        (activeBooking
            ? `${activeBooking.sanctuary?.name || 'Aurelia Sanctuary Positano'} • ${
                  activeBooking.roomUnit?.unitCode ? `Suite ${activeBooking.roomUnit.unitCode}` : 'Suite 402'
              }`
            : 'Positano Cliffside Helipad & Villa Il Sogno Portico');

    // Dynamic attendant name resolution: booking assigned staff > permanent majordomo > fallback
    const attendantStaff = activeBooking?.assignedMajordomo || user.primaryMajordomo;
    const attendantName =
        options.attendantName ||
        (attendantStaff
            ? `Senior Majordomo ${attendantStaff.name}`
            : 'Senior Majordomo Matteo Bellini');

    // Dynamic countdown display
    const countdownDisplay = computeCountdownDisplay(
        options.targetArrivalTime || activeBooking?.checkInDate,
        leadTimeMinutes / 60
    );

    const protocolText =
        `Ultrasonic cold diffusion commences precisely ${leadTimeMinutes} minutes prior to your coordinates arrival to guarantee steady atmospheric saturation without airborne moisture residue.`;

    const atomizationNotice: PreArrivalAtomizationNotice = {
        countdownDisplay,
        leadTimeMinutes,
        arrivalLocation,
        attendantName,
        protocolText,
    };

    // ------------------------------------------------------------------------
    // C. ASSEMBLE MASTER ProfileOlfactorySectionData VIEWMODEL
    // ------------------------------------------------------------------------
    const isAtomizationActive = profile?.atomizationProtocolActive ?? true;
    const preferredIntensity = optAromaIntensity(profile?.aromaIntensityPercent);

    return {
        sectionNumber: '01',
        sectionEyebrow: 'IN-SUITE AMBIANCE PROTOCOL',
        statusBadge: isAtomizationActive
            ? 'ACTIVE DIFFUSION PROFILE'
            : 'DIFFUSION ON STANDBY • MANUAL RELEASE',
        heading: 'Atmosphere & Olfactory Calibration',
        description:
            'Aurelia sanctuaries feature bespoke subterranean cold-air nebulizers integrated invisibly into room stone joinery. Calibrate your sensory arrival scent profile below.',
        activeComposition,
        intensityTiers: STANDARD_INTENSITY_TIERS,
        alternativeCompositions,
        atomizationNotice,
        preferredIntensity,
    };
}
