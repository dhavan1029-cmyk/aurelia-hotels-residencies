import { CircadianAutomationToggle, EpicureanProvisionsItem, PillowConfiguration, ProfileSleepAndEpicureanData } from "@/components/hotel/profile/ProfileSleepAndEpicureanSection";
import { FullGuestProfileWithUserAndBookings } from "./profileDossierMapper";


export interface SleepAndEpicureanMapperOptions {
    /**
     * Optional manual override of sommelier or attendant name
     */
    sommelierName?: string;
    /**
     * Optional tea staging infusion inclusion
     */
    includeEveningTeaStaging?: boolean;
}

// ============================================================================
// 3. MASTER CANONICAL CATALOGS (PILLOWS, TEAS, PROVISIONS)
// ============================================================================

export interface PillowCatalogItem {
    name: string;
    loft: string;
    fillingDescription: string;
    casingMaterial: string;
}

export const CANONICAL_PILLOW_CATALOG: Record<string, PillowCatalogItem> = {
    ORGANIC_GOOSE_DOWN: {
        name: 'Siberian White Goose Down',
        loft: 'Ultra-Soft 850 Fill Power',
        fillingDescription: '100% ethically harvested Arctic goose down dressed inside a dual-chamber internal baffle box.',
        casingMaterial: '400TC Egyptian Giza Long-Staple Cotton Batiste',
    },
    BUCKWHEAT: {
        name: 'Organic Buckwheat & Mulberry Silk Hull',
        loft: 'Anatomical Cervical Contour',
        fillingDescription: 'Organic roasted buckwheat hulls offering rigid orthopedic cervical alignment and rapid heat dispersal.',
        casingMaterial: 'Raw Mulberry Silk & Unbleached Flax Canvas',
    },
    SILK_LATEX: {
        name: 'Mulberry Silk & Talalay Latex',
        loft: 'Medium Plump • Botanical Resilient Rebound',
        fillingDescription: 'Aerated organic Talalay latex core wrapped in carded long-strand mulberry silk batting.',
        casingMaterial: 'Raw Mulberry Silk & Italian Percale Weave',
    },
    HYPOALLERGENIC_MEMORY: {
        name: 'Hypoallergenic Cervical Contour Matrix',
        loft: 'Adaptive Orthopedic Contour',
        fillingDescription: 'Medical-grade viscoelastic polymer engineered with open-cell pinholes for zero pressure points.',
        casingMaterial: 'Cooling Tencel Botanical Jacquard Knit',
    },
};

export const CANONICAL_TEA_LABELS: Record<string, { title: string; notes: string }> = {
    WILD_CHAMOMILE: {
        title: 'Wild Tuscan Chamomile & Lavender Blossom Infusion',
        notes: 'Hand-gathered whole chamomile flowers from Maremma meadows steeped at 92°C with raw citrus blossom honey.',
    },
    LEMON_VERBENA: {
        title: 'Campanian Lemon Verbena & Wild Mountain Mint',
        notes: 'Freshly clipped dusk citrus leaves from Positano pergolas promoting smooth somatic digestion.',
    },
    PEPPERMINT: {
        title: 'High-Altitude Alpine Peppermint',
        notes: 'Glacier valley Mentha Piperita harvested to open nocturnal respiratory pathways.',
    },
    NONE: {
        title: 'Neutral Nightstand Preparation (No Herbal Infusion)',
        notes: 'Nightstand set with chilled glacial crystal tumblers only.',
    },
};

// ============================================================================
// 4. DEFENSIVE NORMALIZERS
// ============================================================================

function normalizePillowCode(rawCode?: string | null, fallback: keyof typeof CANONICAL_PILLOW_CATALOG = 'ORGANIC_GOOSE_DOWN'): string {
    if (!rawCode) return fallback;
    const upper = rawCode.trim().toUpperCase().replace(/[-\s]/g, '_');

    if (upper.includes('DOWN') || upper.includes('GOOSE')) return 'ORGANIC_GOOSE_DOWN';
    if (upper.includes('BUCKWHEAT') || upper.includes('HULL')) return 'BUCKWHEAT';
    if (upper.includes('SILK') || upper.includes('LATEX')) return 'SILK_LATEX';
    if (upper.includes('MEMORY') || upper.includes('HYPO')) return 'HYPOALLERGENIC_MEMORY';

    return CANONICAL_PILLOW_CATALOG[upper] ? upper : fallback;
}

function normalizeTeaCode(rawCode?: string | null): string {
    if (!rawCode) return 'WILD_CHAMOMILE';
    const upper = rawCode.trim().toUpperCase().replace(/[-\s]/g, '_');

    if (upper.includes('VERBENA') || upper.includes('LEMON')) return 'LEMON_VERBENA';
    if (upper.includes('PEPPERMINT') || upper.includes('MINT')) return 'PEPPERMINT';
    if (upper.includes('NONE') || upper.includes('NO_TEA')) return 'NONE';

    return 'WILD_CHAMOMILE';
}

// ============================================================================
// 5. MASTER SLEEP & EPICUREAN MAPPER FUNCTION
// ============================================================================

/**
 * Maps PostgreSQL / Prisma guestProfile and relational user/majordomo models
 * strictly into the target ProfileSleepAndEpicureanData interface contract.
 */
export function mapToProfileSleepAndEpicureanData(
    guestProfile: FullGuestProfileWithUserAndBookings,
    options: SleepAndEpicureanMapperOptions = {}
): ProfileSleepAndEpicureanData {
    const user = guestProfile.user;

    // ------------------------------------------------------------------------
    // A. INITIAL TARGET SLEEP TEMPERATURE
    // ------------------------------------------------------------------------
    const initialTargetTemperatureCelsius =
        guestProfile.idealRoomTemperatureCelsius !== null &&
        guestProfile.idealRoomTemperatureCelsius !== undefined
            ? Number(guestProfile.idealRoomTemperatureCelsius)
            : 19.5;

    // ------------------------------------------------------------------------
    // B. PILLOW CONFIGURATION (LEFT & RIGHT CHAMBERS)
    // ------------------------------------------------------------------------
    const leftPillowKey = normalizePillowCode(guestProfile.preferredPillowLeft, 'ORGANIC_GOOSE_DOWN');
    const rightPillowKey = normalizePillowCode(guestProfile.preferredPillowRight, 'BUCKWHEAT');

    const leftCatalog = CANONICAL_PILLOW_CATALOG[leftPillowKey] || CANONICAL_PILLOW_CATALOG.ORGANIC_GOOSE_DOWN;
    const rightCatalog = CANONICAL_PILLOW_CATALOG[rightPillowKey] || CANONICAL_PILLOW_CATALOG.BUCKWHEAT;

    const pillows: PillowConfiguration[] = [
        {
            id: 'pillow-left',
            position: 'LEFT',
            name: leftCatalog.name,
            loft: leftCatalog.loft,
            fillingDescription: leftCatalog.fillingDescription,
            casingMaterial: leftCatalog.casingMaterial,
        },
        {
            id: 'pillow-right',
            position: 'RIGHT',
            name: rightCatalog.name,
            loft: rightCatalog.loft,
            fillingDescription: rightCatalog.fillingDescription,
            casingMaterial: rightCatalog.casingMaterial,
        },
    ];

    // ------------------------------------------------------------------------
    // C. CIRCADIAN LIGHT & NOCTURNAL AUTOMATIONS
    // ------------------------------------------------------------------------
    const isLouverActive = guestProfile.motorizedBlackoutLouverActive ?? true;
    const isDawnActive = guestProfile.amberDawnSequenceActive ?? true;
    const dimHour = guestProfile.circadianWarmEveningDimHour || '22:30';
    const wakeHour = guestProfile.circadianWakeHour || '07:15';

    const circadianAutomations: CircadianAutomationToggle[] = [
        {
            id: 'full-blackout',
            title: 'Automated Travertine Louver Blackout',
            subtitle: isLouverActive
                ? `100% optical seal scheduled at ${dimHour} CET`
                : 'Manual stone embrasure mode (moonlight admitted)',
            enabled: isLouverActive,
            specNote: 'Silent motorized stone embrasures decouple moonlight & marine glow',
        },
        {
            id: 'dawn-awakening',
            title: 'Diurnal Amber Dawn Awaken Sequence',
            subtitle: isDawnActive
                ? `30-minute progressive spectrum starting ${wakeHour} CET`
                : 'Dawn automation bypassed (unassisted awakening)',
            enabled: isDawnActive,
            specNote: 'Gradually shifts from 1800K candlelight to 3200K morning sunshine',
        },
    ];

    // ------------------------------------------------------------------------
    // D. EPICUREAN PROVISIONS (CELLAR, WATER, COFFEE & OPTIONAL EVENING TEA)
    // ------------------------------------------------------------------------
    const wineTitle =
        guestProfile.preferredChampagneOrCru ||
        "2016 Tenuta dell'Ornellaia Bolgheri Superiore";

    const waterTitle =
        guestProfile.arrivalMineralWater ||
        'Suntory Minami-Alps Glacial & Lurisia Stille';

    const coffeeTitle =
        guestProfile.morningBaristaRitual ||
        'Panama Geisha Natural Lot #04';

    const baristaHour = guestProfile.baristaScheduleHour || '08:30';

    const epicureanItems: EpicureanProvisionsItem[] = [
        {
            id: 'arrival-vintage-ornellaia',
            categoryTag: 'ARRIVAL CELLAR ALLOCATION',
            title: wineTitle,
            provenance: 'Tuscan Coast • Cellar Vault Reserve #AUR-2016-ORN',
            serviceProtocol:
                'Decanted into mouth-blown Riedel Amadeo decanter precisely 90 minutes prior to coordinates arrival. Served at cellar equilibrium.',
            temperatureOrTimingDisplay: '16.5°C • DECANTED 90M PRIOR',
            iconType: 'cellar',
            isCustomizable: true,
        },
        {
            id: 'hydration-library',
            categoryTag: 'PURIFIED MINERAL WATER RESERVE',
            title: waterTitle,
            provenance: 'Japanese Alps Snowmelt & Maritime Piedmont Springs',
            serviceProtocol:
                'Chilled in suite sub-zero stone credenza alongside organic Calabrian bergamot slices and sea-mineral electrolyte infusions.',
            temperatureOrTimingDisplay: '7.0°C • GLACIAL SERVE',
            iconType: 'water',
            isCustomizable: false,
        },
        {
            id: 'awakening-barista',
            categoryTag: 'MAJORDOMO MORNING BARISTA',
            title: coffeeTitle,
            provenance: 'Hacienda La Esmeralda • Micro-Lot Single Origin',
            serviceProtocol:
                `Manual V60 ceramic pour-over served quietly on your clifftop oceanfront loggia with warm organic oat emulsion at ${baristaHour} CET.`,
            temperatureOrTimingDisplay: `${baristaHour} CET • PRIVATE LOGGIA`,
            iconType: 'coffee',
            isCustomizable: true,
        },
    ];

    // Optional Evening Turndown Tea Staging (if specified by guest preference)
    const teaCode = normalizeTeaCode(guestProfile.turndownHerbalTea);
    if (teaCode !== 'NONE' || options.includeEveningTeaStaging) {
        const teaMeta = CANONICAL_TEA_LABELS[teaCode] || CANONICAL_TEA_LABELS.WILD_CHAMOMILE;
        epicureanItems.push({
            id: 'turndown-tea-staging',
            categoryTag: 'TURNDOWN APOTHECARY INFUSION',
            title: teaMeta.title,
            provenance: 'Maremma Wild Meadows & Positano Clifftop Terraces',
            serviceProtocol: teaMeta.notes,
            temperatureOrTimingDisplay: `${dimHour} CET • NIGHTSTAND TRAY`,
            iconType: 'tea',
            isCustomizable: true,
        });
    }

    return {
        initialTargetTemperatureCelsius,
        pillows,
        circadianAutomations,
        epicureanItems,
        preferredMatress: guestProfile.preferredMattress
    };
}
