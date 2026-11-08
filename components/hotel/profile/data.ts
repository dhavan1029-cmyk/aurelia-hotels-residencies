// ============================================================================
// 1. DOMAIN ENUM DEFINITIONS & UI SPECIFICATION CONTRACTS
// ============================================================================

export type PillowTypeCode =
    | 'ORGANIC_GOOSE_DOWN'
    | 'BUCKWHEAT'
    | 'SILK_LATEX'
    | 'HYPOALLERGENIC_MEMORY';

export type MattressTypeCode =
    | 'NATURAL_LATEX_COIR'
    | 'ORGANIC_WOOL_HORSEHAIR'
    | 'VISCOELASTIC_DUAL_ZONE'
    | 'PLUSH_HYBRID_POCKET_SPRING';

export type AromaBlendCode =
    | 'AMALFI_NEROLI_BERGAMOT'
    | 'TUSCAN_CYPRESS_CEDAR'
    | 'ALPINE_JUNIPER'
    | 'UNSCENTED';

export type TurndownTeaCode =
    | 'WILD_CHAMOMILE'
    | 'LEMON_VERBENA'
    | 'PEPPERMINT'
    | 'NONE';

export type SoakingSaltsCode =
    | 'SICILIAN_SEA_SALT_LAVENDER'
    | 'VOLCANIC_SULFUR_MINERAL'
    | 'UNSCENTED_EPSOM';

export interface OptionCatalogItem<T extends string = string> {
    code: T;
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    details: Record<string, string>;
}

// ============================================================================
// 2. FRONT-END PREFERENCE CATALOG DICTIONARIES (Titles, Descriptions & Specs)
// ============================================================================

//1. Pillow Architecture & Ergonomics Catalog
export const PILLOW_PREFERENCE_CATALOG: Record<PillowTypeCode, OptionCatalogItem<PillowTypeCode>> = {
    ORGANIC_GOOSE_DOWN: {
        code: 'ORGANIC_GOOSE_DOWN',
        title: 'Siberian White Goose Down',
        subtitle: 'Ultra-Soft 850 Fill Power • Cloud Ergonomics',
        description:
            'Hand-selected 100% ethically harvested Arctic goose down dressed inside a dual-chamber baffle box. Provides zero-pressure sinking comfort with continuous thermal breathability.',
        badge: 'SIGNATURE ENCLAVE LOFT',
        details: {
            loft: 'Ultra-Soft • 850 Fill Power',
            casing: '400TC Egyptian Giza Long-Staple Cotton Batiste',
            baffleType: 'Dual-Chamber Baffle Box with Silken Gusset',
            bestFor: 'Stomach & Back Sleepers seeking weightless cervical cradle',
        },
    },
    BUCKWHEAT: {
        code: 'BUCKWHEAT',
        title: 'Organic Buckwheat & Mulberry Silk Hull',
        subtitle: 'Anatomical Cervical Contour • Heat Dissipation',
        description:
            'Organic roasted buckwheat hulls offering rigid, orthopedic cervical alignment. The natural faceted hulls circulate airflow freely, dissipating nocturnal facial warmth.',
        badge: 'ORTHOPEDIC ALIGNMENT',
        details: {
            loft: 'Structured Firm • Anatomical Cervical Contour',
            casing: 'Raw Mulberry Silk & Unbleached Flax Canvas',
            baffleType: 'Internal Baffle Cylinder with Micro-Zipper Tuning',
            bestFor: 'Back & Side Sleepers requiring rigid spinal alignment',
        },
    },
    SILK_LATEX: {
        code: 'SILK_LATEX',
        title: 'Mulberry Silk & Talalay Latex',
        subtitle: 'Medium Plump • Botanical Resilient Rebound',
        description:
            'Aerated organic Talalay latex core wrapped in carded long-strand mulberry silk batting. Responsive buoyant lift that never collapses or requires middle-of-the-night fluffing.',
        badge: 'BOTANICAL REBOUND',
        details: {
            loft: 'Medium Plump • 650 Equivalent Density',
            casing: 'Raw Mulberry Silk & Italian Percale Weave',
            baffleType: 'Continuous Latex Core with Carded Silk Wrap',
            bestFor: 'Restless Sleepers needing continuous buoyant bounce',
        },
    },
    HYPOALLERGENIC_MEMORY: {
        code: 'HYPOALLERGENIC_MEMORY',
        title: 'Hypoallergenic Cervical Contour Matrix',
        subtitle: 'Temperature-Neutral Viscoelastic Open-Cell Matrix',
        description:
            'Medical-grade viscoelastic polymer engineered with open-cell pinholes. Absorbs ambient body heat while distributing head mass evenly across zero pressure points.',
        badge: 'CLINICAL HYPOALLERGENIC',
        details: {
            loft: 'Adaptive Orthopedic Contour',
            casing: 'Cooling Tencel Botanical Jacquard Knit',
            baffleType: 'Contoured Neck Roll with Shoulder Cutout Groove',
            bestFor: 'Sensitive Patrons with dust-mite or natural feather allergies',
        },
    },
};

// 2. Mattress Architecture Catalog
 
export const MATTRESS_PREFERENCE_CATALOG: Record<MattressTypeCode, OptionCatalogItem<MattressTypeCode>> = {
    NATURAL_LATEX_COIR: {
        code: 'NATURAL_LATEX_COIR',
        title: 'Organic Natural Latex & Coconut Coir',
        subtitle: 'Botanical Firmness • Monolithic Core Stability',
        description:
            'Layered sustainable Sri Lankan coconut fiber bonded with pure botanical Hevea milk. Naturally impervious to moisture and vibration, providing a quiet, earthy foundation.',
        badge: 'MEDITERRANEAN MONOLITH',
        details: {
            firmness: 'Medium-Firm (7.5 / 10)',
            materials: 'Vulcanized Organic Latex & Steamed Coconut Coir',
            coolingMethod: 'Open-Cell Vertical Air Chambers',
            quilt: 'Hand-Tufted Organic Belgian Damask Linen',
        },
    },
    ORGANIC_WOOL_HORSEHAIR: {
        code: 'ORGANIC_WOOL_HORSEHAIR',
        title: 'Sovereign Organic Wool & Braided Horsehair',
        subtitle: 'Traditional Savile Row Hand-Craft • Microclimate Control',
        description:
            'Layered carded alpine wool and needle-punched curled horsetail hair. Naturally repels perspiration and wicks humidity for an invariant thermal sleeping microclimate.',
        badge: 'SAVILE ROW HAND-TUFTED',
        details: {
            firmness: 'Medium Plush Adaptive (6.0 / 10)',
            materials: 'Carded Alpine Fleece & Curled Tail Hair',
            coolingMethod: 'Natural Keratin Capillary Moisture Dissipation',
            quilt: 'Hand-Stitched Double-Twisted Flax Rosettes',
        },
    },
    VISCOELASTIC_DUAL_ZONE: {
        code: 'VISCOELASTIC_DUAL_ZONE',
        title: 'Dual-Zone Viscoelastic Acoustic Matrix',
        subtitle: 'Zero Motion Transfer • Independent Left/Right Comfort',
        description:
            'Dual-core configuration allowing companion patrons independent firmness calibration without central crevice sag. Completely decouples companion movements.',
        badge: 'ZERO MOTION TRANSFER',
        details: {
            firmness: 'Independent Split (Plush Left / Firm Right)',
            materials: 'High-Density Breathable Viscoelastic Polymers',
            coolingMethod: 'Geothermal Subterranean Radiant Coil Integration',
            quilt: 'Thermally Conductive Graphite Botanical Jacquard',
        },
    },
    PLUSH_HYBRID_POCKET_SPRING: {
        code: 'PLUSH_HYBRID_POCKET_SPRING',
        title: 'Calico Pocket-Spring & Cashmere Hybrid',
        subtitle: 'Traditional British Deep Loft • 3,200 Micro-Coils',
        description:
            'Over 3,200 hand-nested calico cotton pocket springs layered beneath combed Mongolian cashmere and soft downy lamb fleece for deep, enveloping cradling.',
        badge: 'ROYAL HERITAGE LOFT',
        details: {
            firmness: 'Sumptuous Ultra-Plush (4.5 / 10)',
            materials: 'Mongolian Cashmere & Hand-Nested Calico Coils',
            coolingMethod: 'Perimeter Brass Ventilation Eyelets',
            quilt: 'Hand-Tied English Rosette Wool Puffs',
        },
    },
};

// 3. Olfactory Compositions & Cold-Atomization Scent Catalog
export const AROMA_BLEND_CATALOG: Record<AromaBlendCode, OptionCatalogItem<AromaBlendCode>> = {
    AMALFI_NEROLI_BERGAMOT: {
        code: 'AMALFI_NEROLI_BERGAMOT',
        title: 'Amalfi Neroli, Bergamot & Coastal Sea Salt',
        subtitle: 'Sunlit Citrus Groves • Bitter Orange Blossoms • Saline Mist',
        description:
            'Hand-harvested bitter orange blossoms from century-old Ravello pergolas blended with sunlit Calabrian bergamot and oceanic ambergris.',
        badge: 'SIGNATURE FLAGSHIP BLEND',
        details: {
            topNotes: 'Calabrian Bergamot Rind, Bitter Orange Petals',
            heartNotes: 'Amalfi Neroli Blossoms, Crushed Mint Leaf',
            baseNotes: 'Sun-Bleached Driftwood, Coastal Saline Ambergris',
            atomizationProtocol: 'Dispersed 2h prior to arrival at 25% micro-vapor equilibrium',
        },
    },
    TUSCAN_CYPRESS_CEDAR: {
        code: 'TUSCAN_CYPRESS_CEDAR',
        title: 'Tuscan Cypress, Smoked Atlas Cedar & Herb',
        subtitle: 'Ancient Stone Woodlands • Crushed Rosemary • Warm Resin',
        description:
            'Monolithic woodland heartwood extracted via steam distillation. Calming aromatherapeutic alpha-pinene terpenes cultivate deep somatic relaxation.',
        badge: 'MEDITERRANEAN ARBORETUM',
        details: {
            topNotes: 'Crushed Wild Rosemary, Wild Thyme Needles',
            heartNotes: 'Tuscan Columnar Cypress, Maritime Pine Resin',
            baseNotes: 'Smoked Atlas Cedar, Ancient Volcanic Frankincense',
            atomizationProtocol: 'Dispersed 2h prior to arrival at 30% concentration',
        },
    },
    ALPINE_JUNIPER: {
        code: 'ALPINE_JUNIPER',
        title: 'Engadin Juniper, High Glacier Ozone & Mountain Mint',
        subtitle: 'Sub-Zero Glacier Vapor • Frosted Pine Needles • Wild Spearmint',
        description:
            'Captured from high-altitude Swiss larch forests and sub-zero glacial moraines. Opens airways and accelerates nocturnal oxygen saturation.',
        badge: 'HIGH ALPINE REFUGE',
        details: {
            topNotes: 'Glacier Ozone Mist, High-Altitude Spearmint',
            heartNotes: 'Engadin Juniper Berries, Arolla Pine Sap',
            baseNotes: 'Sub-Zero Mountain Lichen, Chilled Alpine Granite',
            atomizationProtocol: 'Dispersed 1h prior to arrival at 20% concentration',
        },
    },
    UNSCENTED: {
        code: 'UNSCENTED',
        title: 'Pure Catalytic Neutralized Ozone (Unscented)',
        subtitle: 'Hospital-Grade Catalytic Carbon Scrubbing • 0.0 PPM Traces',
        description:
            'Medical-grade catalytic ionization scrubbers eliminate all botanical, essential oil, and aerosol traces for complete hypoallergenic calm.',
        badge: 'HYPOALLERGENIC ZERO-TRACE',
        details: {
            topNotes: 'None (Catalytic Carbon Filtered)',
            heartNotes: 'None (Ultra-Pure Hydrothermal Air)',
            baseNotes: 'None (0.0 PPM Aromatic Trace)',
            atomizationProtocol: 'Continuous catalytic ionization with neutral humidity balance',
        },
    },
};

/**





4. Turndown Evening Herbal Infusions Catalog
 */
export const TURNDOWN_TEA_CATALOG: Record<TurndownTeaCode, OptionCatalogItem<TurndownTeaCode>> = {
    WILD_CHAMOMILE: {
        code: 'WILD_CHAMOMILE',
        title: 'Wild Tuscan Chamomile & Lavender Flower',
        subtitle: 'Whole Flower Heads • Valerian Root • Organic Blossom Honey',
        description:
            'Hand-gathered wild chamomile blossoms from Maremma meadows infused with Bulgarian lavender and raw citrus flower nectar.',
        badge: 'SOVEREIGN CALM',
        details: {
            botanicals: 'Whole Chamomile Flowers, Lavender Petals, Valerian Root',
            steepingTime: '7 Minutes at 92°C in handmade ceramic pot',
            pairing: 'Served with warm organic lavender shortbread thins',
        },
    },
    LEMON_VERBENA: {
        code: 'LEMON_VERBENA',
        title: 'Campanian Lemon Verbena & Mountain Mint',
        subtitle: 'Centennial Citrus Grove Harvest • High Essential Oil Content',
        description:
            'Crisp, digestion-soothing lemon verbena leaves freshly clipped at dusk from the Positano terraced pergolas, balanced with mountain spear-mint.',
        badge: 'DIGESTIVE SERENITY',
        details: {
            botanicals: 'Organic Lemon Verbena, Spearmint, Lemon Balm Leaf',
            steepingTime: '5 Minutes at 95°C with lemon peel spiral',
            pairing: 'Accompanied by candied Amalfi lemon peel thins',
        },
    },
    PEPPERMINT: {
        code: 'PEPPERMINT',
        title: 'High-Altitude Alpine Peppermint',
        subtitle: 'Engadin Glacier Valley Growth • Pure Menthol Cleansing',
        description:
            'Potent wild peppermint harvested from high Swiss alpine pastures, clearing respiratory pathways and cooling internal body temperature.',
        badge: 'RESPIRATORY CLARITY',
        details: {
            botanicals: 'High-Altitude Mentha Piperita, Cornflower Petals',
            steepingTime: '6 Minutes at 96°C in mouth-blown glass infuser',
            pairing: 'Served with 85% single-origin Venezuelan dark cacao',
        },
    },
    NONE: {
        code: 'NONE',
        title: 'No Evening Infusion Requested',
        subtitle: 'Sanctuary Chamber Nightstand Left Clear',
        description:
            'Housekeeping will prepare the nightstand with chilled mineral water and clean crystal only, withholding warm tea service.',
        badge: 'UNINTERRUPTED STILLNESS',
        details: {
            botanicals: 'None',
            steepingTime: 'N/A',
            pairing: 'Sub-zero crystal water tumbler only',
        },
    },
};

/**





5. Volcanic Bath & Thermal Soaking Mineral Salts Catalog
 */
export const SOAKING_SALTS_CATALOG: Record<SoakingSaltsCode, OptionCatalogItem<SoakingSaltsCode>> = {
    SICILIAN_SEA_SALT_LAVENDER: {
        code: 'SICILIAN_SEA_SALT_LAVENDER',
        title: 'Sicilian Solar Sea Salt & Crushed Lavender Petals',
        subtitle: 'Trapani Saline Harvest • Magnesium Rich • Skin Hydration',
        description:
            'Unrefined solar-evaporated sea crystals from ancient Trapani salt pans, infused with organic essential lavender oil and wild chamomile flowers.',
        badge: 'HYDRATING MINERAL SOAK',
        details: {
            minerals: 'Magnesium Chloride, Potassium, Calcium Carbonate',
            tubStaging: 'Dissolved in 38.5°C carved travertine bath 30m prior to sleep',
            aromatherapy: 'French Organic Lavender & Wild Sweet Marjoram',
        },
    },
    VOLCANIC_SULFUR_MINERAL: {
        code: 'VOLCANIC_SULFUR_MINERAL',
        title: 'Ischian Volcanic Sulfur & Thermal Basin Minerals',
        subtitle: 'Natural Geothermal Cavern Extraction • Deep Muscle Decompression',
        description:
            'Bio-active volcanic minerals harvested from thermal basins in the Bay of Naples. Relieves deep muscle fascia tension and joint fatigue.',
        badge: 'GEOTHERMAL RECOVERY',
        details: {
            minerals: 'Elemental Sulfur, Iron Oxide, Silica, Bio-Active Thermal Mud Trace',
            tubStaging: 'Infused into 39.0°C deep stone soaking basin',
            aromatherapy: 'Mild therapeutic volcanic mineral character with neroli drop',
        },
    },
    UNSCENTED_EPSOM: {
        code: 'UNSCENTED_EPSOM',
        title: 'Neutral Pharmaceutical-Grade Magnesium Epsom Salts',
        subtitle: '99.9% Pure Magnesium Sulfate • Zero Botanical Additives',
        description:
            'Medical-grade crystallised magnesium sulfate with zero fragrance or botanical oils. Relaxes nervous pathways without any skin sensitization.',
        badge: 'PURE PHARMACEUTICAL',
        details: {
            minerals: '100% Pure Magnesium Sulfate Heptahydrate',
            tubStaging: 'Generously dissolved in deep neutral hot water bath',
            aromatherapy: 'Completely scent-free and hypoallergenic',
        },
    },
};

// ============================================================================
// 3. CURATED DEFAULT GUEST PROFILES (Ready for Seeds & UI State Initialization)
// ============================================================================

export interface CompanionPatron {
    id: string;
    fullName: string;
    relationshipTag: string;
    clearanceLevel: string;
    avatarUrl: string;
    avatarAlt: string;
}

export interface CompleteGuestProfileEntity {
    userId: string;
    patronName: string;
    honorific: string;
    tier: 'EXPLORER' | 'SOVEREIGN_KEY' | 'IMPERIAL_HONORARY';
    folioCode: string;
    confidentialityLevel: string;

    // Olfactory Architecture
    roomAromaBlend: AromaBlendCode;
    aromaIntensityPercent: number;
    atomizationProtocolActive: boolean;

    // Bedding & Sleep Architecture
    preferredMattress: MattressTypeCode;
    preferredPillowLeft: PillowTypeCode;
    preferredPillowRight: PillowTypeCode;
    idealRoomTemperatureCelsius: number;

    // Circadian Automations (2 Booleans)
    motorizedBlackoutLouverActive: boolean;
    amberDawnSequenceActive: boolean;
    circadianWakeHour: string;
    circadianWarmEveningDimHour: string;

    // Turndown & Bath Rituals
    turndownHerbalTea: TurndownTeaCode;
    preferredSoakingSalts: SoakingSaltsCode;

    // In-Suite Epicurean Staging
    preferredChampagneOrCru: string;
    arrivalMineralWater: string;
    morningBaristaRitual: string;
    baristaScheduleHour: string;
    dietaryRestrictions: string[];

    // Companions & Security Telemetry
    registeredCompanions: CompanionPatron[];
    verbalConciergePin: string;

}

export function getPillowsList(): Array<OptionCatalogItem<PillowTypeCode>> {
    return Object.values(PILLOW_PREFERENCE_CATALOG);
}

export function getMattressesList(): Array<OptionCatalogItem<MattressTypeCode>> {
    return Object.values(MATTRESS_PREFERENCE_CATALOG);
}

export function getAromasList(): Array<OptionCatalogItem<AromaBlendCode>> {
    return Object.values(AROMA_BLEND_CATALOG);
}

export function getTeasList(): Array<OptionCatalogItem<TurndownTeaCode>> {
    return Object.values(TURNDOWN_TEA_CATALOG);
}

export function getSaltsList(): Array<OptionCatalogItem<SoakingSaltsCode>> {
    return Object.values(SOAKING_SALTS_CATALOG);
}