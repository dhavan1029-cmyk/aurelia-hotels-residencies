export interface SanctuaryEnclaveSpec {
    id: string;
    slug: string;
    code: string;
    name: string;
    regionTag: string;
    country: string;
    tagline: string;
    coordinatesDisplay: string;
    elevation: string;
    climateNote: string;
    heroImage: string;
    heroAlt: string;
    majordomoDirectPhone: string;
    monographShort: string;
    seasonalityTag: string;
    curatedSuitesCount: number;
    michelinDining: string;
    signatureEncounter: string;
}

export const SANCTUARIES_CATALOG: SanctuaryEnclaveSpec[] = [
    {
        id: 'sanctuary_positano_01',
        slug: 'positano',
        code: 'POS-01',
        name: 'Sanctuary Positano',
        regionTag: 'Amalfi Coast',
        country: 'Italy',
        tagline: 'Cliffside Enclave & Tyrrhenian Monolith',
        coordinatesDisplay: '40.6281°N, 14.4850°E',
        elevation: '180m Above Sea Level',
        climateNote: 'Mediterranean Salt Air & Citrus Terraces',
        heroImage: '/sanctuaries/positano.png',
        heroAlt: 'Dramatic monolithic limestone cliffs of Sanctuary Positano overlooking the Tyrrhenian Sea at golden hour',
        majordomoDirectPhone: '+39 089 875 111',
        monographShort: 'Chiseled directly into sheer limestone cliffs 180 meters above the Tyrrhenian Sea, an unhurried monolithic sanctuary of natural stone, Roman thermal caverns, and Riva maritime access.',
        seasonalityTag: 'APRIL – NOVEMBER REVELATION',
        curatedSuitesCount: 14,
        michelinDining: 'Ristorante Il Belvedere (3 Michelin Stars)',
        signatureEncounter: 'Riva Heritage Coastal Odyssey & Nerano In-Cove Feasts',
    },
    {
        id: 'sanctuary_engadin_02',
        slug: 'sanctuary-engadin',
        code: 'ENG-02',
        name: 'Sanctuary Engadin & Piz Palü',
        regionTag: 'St. Moritz',
        country: 'Switzerland',
        tagline: 'High Alpine Glacial Stone Retreat',
        coordinatesDisplay: '46.4908°N, 9.8355°E',
        elevation: '1,856m High Alpine Glacial Shelf',
        climateNote: 'Sub-Zero Crisp Champagne Air & Stone Pine Silence',
        heroImage: '/sanctuaries/sanctuary-engadin.png',
        heroAlt: 'Snow-draped Valser quartzite stone retreat of Sanctuary Engadin overlooking Lake St. Moritz at dusk',
        majordomoDirectPhone: '+41 81 838 21 00',
        monographShort: 'Perched high in the Engadin valley amidst centuries-old stone pines, raw Valser quartzite monolithic pavilions harmonize with private glacial spring plunge pools and woodfire hearth gastronomy.',
        seasonalityTag: 'DECEMBER – APRIL WINTER & HIGH SUMMER',
        curatedSuitesCount: 18,
        michelinDining: 'Chesa Arpiglia Hearth (2 Michelin Stars)',
        signatureEncounter: 'Airbus H130 Morteratsch Glacier Heli-Tasting',
    },
    {
        id: 'sanctuary_antibes_03',
        slug: 'cap-d-antibes',
        code: 'ANT-03',
        name: 'Aurelia Enclave Cap d\'Antibes',
        regionTag: 'Côte d\'Azur',
        country: 'France',
        tagline: 'Maritime Riviera Villa & Botanical Solarium',
        coordinatesDisplay: '43.5528°N, 7.1278°E',
        elevation: '12m Coastal Cliffside Shoreline',
        climateNote: 'Warm Azure Mist & Hundred-Year Umbrella Pines',
        heroImage: '/sanctuaries/cap-d-antibes.png',
        heroAlt: 'Aurelia Enclave Cap d\'Antibes limestone estate and infinity pool set within coastal umbrella pines overlooking azure sea',
        majordomoDirectPhone: '+33 4 93 61 00 00',
        monographShort: 'Nestled on the sun-drenched tip of Cap d\'Antibes among ancient umbrella pines and fragrant jasmine gardens, offering privatized pontoon moorings and discreet Riviera seclusion.',
        seasonalityTag: 'MAY – OCTOBER HIGH MEDITERRANEAN',
        curatedSuitesCount: 12,
        michelinDining: 'Le Pavillon d\'Azur (2 Michelin Stars)',
        signatureEncounter: 'Private Wally 48 Sunset Sail to Îles de Lérins',
    },
];

export function getSanctuaryBySlug(slug?: string): SanctuaryEnclaveSpec {
    if (!slug) return SANCTUARIES_CATALOG[0];
    const match = SANCTUARIES_CATALOG.find(function(s) {
        return s.slug.toLowerCase() === slug.toLowerCase() || s.id.toLowerCase() === slug.toLowerCase();
    });
    return match || SANCTUARIES_CATALOG[0];
}

