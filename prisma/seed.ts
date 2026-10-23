import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL is not defined in your environment.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🏛️  Initiating Aurelia Hotels & Residences Database Seed...\n');

    // =========================================================================
    // 0. CLEAN EXISTING RECORDS IN TOPOLOGICAL ORDER
    // =========================================================================
    console.log('🧹 Purging previous database records...');
    await prisma.paymentFolio.deleteMany();
    await prisma.bookingLineItem.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.housekeepingTask.deleteMany();
    await prisma.roomUnit.deleteMany();
    await prisma.rateRule.deleteMany();
    await prisma.accommodationCategory.deleteMany();
    await prisma.experience.deleteMany();
    await prisma.diningVenue.deleteMany();
    await prisma.staffMember.deleteMany();
    await prisma.sanctuary.deleteMany();
    await prisma.guestProfile.deleteMany();
    await prisma.user.deleteMany();
    console.log('✓ Database cleaned.\n');

    // =========================================================================
    // 1. SEED SANCTUARIES (DESTINATION ENCLAVES)
    // =========================================================================
    console.log('📍 Seeding Sanctuaries (Enclaves)...');

    const sanctuaryPositano = await prisma.sanctuary.create({
        data: {
            slug: 'amalfi-positano',
            code: 'AMA',
            name: 'Aurelia Sanctuary Positano',
            tagline: 'Monolithic Coastal Travertine Retreat',
            city: 'Positano',
            region: 'Amalfi Coastline',
            country: 'Italy',
            latitude: 40.6278,
            longitude: 14.4848,
            mapUrl: 'https://maps.google.com/?q=40.6278,14.4848',
            timezone: 'Europe/Rome',
            currency: 'EUR',
            status: 'ACTIVE',
            contactEmail: 'concierge.positano@aureliahotels.com',
            contactPhone: '+39 089 875 000',
            mediaData: {
                heroImage: '/limestone-villa.png',
                gallery: [
                    '/limestone-villa.png',
                    '/garden-pavillion.png',
                ],
            },
            editorial: {
                headline: 'Monolithic Limestone, Eternal Horizon',
                summary:
                    'Conceived as an extraction of sanctuary from within living bedrock. 18 oceanfront chambers carved 200m above the Tyrrhenian surf.',
                architecturalProvenance:
                    'Extracted from continuous stratum of Tivoli dolomitic limestone and volcanic tuff. Unfilled stone brushed with slaked lime.',
                seasonalityGuide:
                    'Temperate Mediterranean microclimate. Geothermal hydrothermal convection coils active year-round.',
            },
            arrivalGuide: {
                nearestAirport: 'Naples International Airport (NAP) • 65 km',
                helipadAvailable: true,
                privateRivaDocking: true,
                chauffeurServiceAvailable: true,
                maritimeCoordinates: "40°37'40.2\"N • 14°29'05.4\"E",
            },
        },
    });

    const sanctuaryKyoto = await prisma.sanctuary.create({
        data: {
            slug: 'kyoto-higashiyama',
            code: 'KYO',
            name: 'Higashiyama Onsen Pavilions',
            tagline: 'Yoshino Cedar & Volcanic Hot Spring Sanctuary',
            city: 'Kyoto',
            region: 'Historic Higashiyama',
            country: 'Japan',
            latitude: 34.9978,
            longitude: 135.7791,
            timezone: 'Asia/Tokyo',
            currency: 'JPY',
            status: 'ACTIVE',
            contactEmail: 'concierge.kyoto@aureliahotels.com',
            contactPhone: '+81 75 551 0000',
            mediaData: {
                heroImage: '/garden-pavillion.png',
                gallery: ['/garden-pavillion.png'],
            },
            editorial: {
                headline: 'Whispering Bamboo & Geothermal Onsen Caverns',
                summary: 'Twelve secluded timber and Tamba river-stone pavilions centered around ancient hot springs.',
                architecturalProvenance: 'Yoshino mountain cedar joined with traditional chiseled joinery without nails.',
                seasonalityGuide: 'Spring cherry blossoms and deep autumn maple foliage.',
            },
            arrivalGuide: {
                nearestAirport: 'Kansai International Airport (KIX) • 95 km',
                helipadAvailable: false,
                privateRivaDocking: false,
                chauffeurServiceAvailable: true,
            },
        },
    });

    const sanctuaryEngadin = await prisma.sanctuary.create({
        data: {
            slug: 'st-moritz-engadin',
            code: 'STM',
            name: 'Engadin Alpine Refuge',
            tagline: 'High Glacier Granite & Arolla Pine Monolith',
            city: 'St. Moritz',
            region: 'Upper Engadin Valley',
            country: 'Switzerland',
            latitude: 46.4973,
            longitude: 9.8385,
            timezone: 'Europe/Zurich',
            currency: 'CHF',
            status: 'ACTIVE',
            contactEmail: 'concierge.engadin@aureliahotels.com',
            contactPhone: '+41 81 837 0000',
            mediaData: {
                heroImage: '/limestone-villa.png',
                gallery: ['/limestone-villa.png'],
            },
            editorial: {
                headline: 'Glacial Stillness at 1,822 Meters Elevation',
                summary: 'Suspended over pristine glacier moraines with private sub-zero cryogenic grottos.',
                architecturalProvenance: 'Andeer green granite and hand-rubbed alpine larch.',
                seasonalityGuide: 'Ski-in ski-out winter sanctuary and dry alpine summer hiking.',
            },
            arrivalGuide: {
                nearestAirport: 'Samedan Private Airport (SMV) • 7 km',
                helipadAvailable: true,
                privateRivaDocking: false,
                chauffeurServiceAvailable: true,
            },
        },
    });
    console.log('✓ 3 Sanctuaries created (Positano, Kyoto, Engadin).\n');

    // =========================================================================
    // 2. SEED STAFF MEMBERS (CONCIERGE & MAJORDOMOS)
    // =========================================================================
    console.log('👔 Seeding Staff Members & Majordomos...');

    const staffMatteoBellini = await prisma.staffMember.create({
        data: {
            sanctuaryId: sanctuaryPositano.id,
            name: 'Matteo Bellini',
            role: 'MAJORDOMO',
            email: 'm.bellini@aureliahotels.com',
            phone: '+39 089 875 111',
            isActive: true,
            avatarUrl: '/limestone-villa.png',
        },
    });

    const staffMatteoDeLuca = await prisma.staffMember.create({
        data: {
            sanctuaryId: sanctuaryPositano.id,
            name: 'Matteo de Luca',
            role: 'GENERAL_MANAGER',
            email: 'm.deluca@aureliahotels.com',
            phone: '+39 089 875 000',
            isActive: true,
            avatarUrl: '/limestone-villa.png',
        },
    });

    const staffElenaRossi = await prisma.staffMember.create({
        data: {
            sanctuaryId: sanctuaryPositano.id,
            name: 'Elena Rossi',
            role: 'HEAD_HOUSEKEEPER',
            email: 'e.rossi@aureliahotels.com',
            phone: '+39 089 875 222',
            isActive: true,
            avatarUrl: '/garden-pavillion.png',
        },
    });

    const staffMatteoMoretti = await prisma.staffMember.create({
        data: {
            sanctuaryId: sanctuaryPositano.id,
            name: 'Matteo Moretti',
            role: 'SOMMELIER',
            email: 'm.moretti@aureliahotels.com',
            phone: '+39 089 875 333',
            isActive: true,
            avatarUrl: '/limestone-villa.png',
        },
    });
    console.log('✓ Staff created (Matteo Bellini, Matteo de Luca, Elena Rossi, Matteo Moretti).\n');

    // =========================================================================
    // 3. SEED ACCOMMODATION CATEGORIES
    // =========================================================================
    console.log('🛏️  Seeding Accommodation Categories...');

    const catAzureSuite = await prisma.accommodationCategory.create({
        data: {
            sanctuaryId: sanctuaryPositano.id,
            slug: 'azure-master-ocean-suite',
            name: 'The Azure Master Ocean Suite',
            category: 'SUITE',
            tagline: 'Cliffside Sanctuary with Heated Basalt Plunge Pool',
            squareMeters: 132.0,
            squareFeet: 1420.0,
            maxOccupancy: 3,
            bedroomsCount: 1,
            bathroomsCount: 2,
            bedConfiguration: 'Custom Raw Silk Emperor King + Optional Majordomo Daybed',
            viewOrientation: '180° Uninterrupted Tyrrhenian Sunset Horizon',
            basePriceNightly: 1450.0,
            currency: 'EUR',
            cleaningFee: 0.0,
            cityTaxPerGuest: 5.0,
            vatRate: 10.0,
            minStayNights: 2,
            mediaData: {
                heroImage: '/limestone-villa.png',
                gallery: [
                    '/limestone-villa.png',
                    '/garden-pavillion.png',
                ],
                viewsCount: 12,
            },
            narrative: {
                headline: 'Warm travertine, cedar grain, and unhurried coastal stillness.',
                paragraphs: [
                    'Perched atop the southern cliffline, Suite 402 is an acoustic retreat calibrated for restorative peace. Honed ivory travertine remains soothingly cool beneath bare feet.',
                    'Floor-to-ceiling retractable glass merges the living salon with the boundless horizon. Here, light shifts continuously across chalky lime-washed walls.',
                ],
            },
            features: [
                { title: 'South Exposure', description: 'Optimal diurnal warmth and horizon sunset flare', icon: 'sun' },
                { title: 'Triple Glazing', description: 'Acoustic decoupling under 14dB ambient noise', icon: 'shield' },
                { title: 'Sommelier Vault', description: 'In-suite temperature-controlled micro-cellar', icon: 'cellar' },
            ],
            privileges: [
                { title: 'Dedicated Majordomo', description: 'Discreet 24-hour attendance and unpacking ritual', badge: 'BESPOKE' },
                { title: 'Thermal Circuit Pass', description: 'Unlimited private Caldarium grotto access', badge: 'UNLIMITED' },
                { title: 'Orchard Breakfast', description: 'Served in-suite on ocean loggia daily', badge: 'INCLUDED' },
            ],
            amenityTags: [
                'HEATED_BASALT_PLUNGE',
                'ROMAN_TRAVERTINE_TUB',
                'PRIVATE_OCEAN_LOGGIA',
                'SOMMELIER_BAR',
                'CIRCADIAN_LIGHTING',
            ],
            sensoryCapabilities: {
                hasCircadianLighting: true,
                hasTravertineSoakingTub: true,
                hasPrivatePlungePool: true,
                plungePoolTempCelsius: 32.0,
                customAromaDiffuser: true,
                acousticSoundIsolation: true,
            },
        },
    });

    const catLimestoneVilla = await prisma.accommodationCategory.create({
        data: {
            sanctuaryId: sanctuaryPositano.id,
            slug: 'the-limestone-villa',
            name: 'The Limestone Villa',
            category: 'VILLA',
            tagline: 'Multi-Level Cliff Estate with Private Riva Mooring & Infinity Pool',
            squareMeters: 210.0,
            squareFeet: 2260.0,
            maxOccupancy: 5,
            bedroomsCount: 2,
            bathroomsCount: 3,
            bedConfiguration: '2 Master Emperor King Suites + Private Staff Quarters',
            viewOrientation: 'Sheer Cliffside Panorama & Capri Sea-Stacks',
            basePriceNightly: 2850.0,
            currency: 'EUR',
            cleaningFee: 0.0,
            cityTaxPerGuest: 5.0,
            vatRate: 10.0,
            minStayNights: 3,
            mediaData: {
                heroImage: '/limestone-villa.png',
                gallery: ['/limestone-villa.png'],
            },
            narrative: {
                headline: 'Private monolithic sovereignty hewn into limestone precipices.',
                paragraphs: [
                    'Multi-level independent estate carved directly into the bedrock with a heated saltwater infinity plunge pool and private sea-gate slipway.',
                ],
            },
            features: [
                { title: 'Private Riva Mooring', description: 'Direct maritime tender slipway entry', icon: 'yacht' },
                { title: 'Infinity Plunge', description: 'Saltwater infinity pool hewn into cliff edge', icon: 'pool' },
            ],
            privileges: [
                { title: 'Dedicated 24/7 Majordomo', description: 'Full private estate service', badge: 'VIP' },
            ],
            amenityTags: ['PRIVATE_POOL', 'RIVA_MOORING', 'HEPATIC_SAUNA', 'FULL_CELLAR'],
            sensoryCapabilities: {
                hasCircadianLighting: true,
                hasTravertineSoakingTub: true,
                hasPrivatePlungePool: true,
                plungePoolTempCelsius: 30.0,
                customAromaDiffuser: true,
                acousticSoundIsolation: true,
            },
        },
    });

    const catGardenPavilion = await prisma.accommodationCategory.create({
        data: {
            sanctuaryId: sanctuaryPositano.id,
            slug: 'lemon-grove-garden-pavilion',
            name: 'Lemon Grove Garden Pavilion',
            category: 'PAVILION',
            tagline: 'Secluded Glass & Timber Sanctuary in Two-Century Citrus Orchard',
            squareMeters: 85.0,
            squareFeet: 915.0,
            maxOccupancy: 2,
            bedroomsCount: 1,
            bathroomsCount: 1,
            bedConfiguration: 'Emperor Linen King',
            viewOrientation: 'Century Citrus Orchards & Azure Sea Glint',
            basePriceNightly: 920.0,
            currency: 'EUR',
            cleaningFee: 0.0,
            cityTaxPerGuest: 5.0,
            vatRate: 10.0,
            minStayNights: 1,
            mediaData: {
                heroImage: '/garden-pavillion.png',
                gallery: ['/garden-pavillion.png'],
            },
            narrative: {
                headline: 'Botanical stillness amidst ancient terraced citrus groves.',
                paragraphs: [
                    'Nestled in private wild olive and lemon groves with an open-air rainfall bathroom and sweet orange orchard patio.',
                ],
            },
            features: [
                { title: 'Citrus Solarium', description: 'Sunken marble bath overlooking groves', icon: 'orchard' },
            ],
            privileges: [
                { title: 'Courtyard Breakfast', description: 'Artisan morning collation', badge: 'INCLUDED' },
            ],
            amenityTags: ['MARBLE_TUB', 'GARDEN_SOLARIUM', 'ORGANIC_AROMA'],
            sensoryCapabilities: {
                hasCircadianLighting: true,
                hasTravertineSoakingTub: true,
                hasPrivatePlungePool: false,
                customAromaDiffuser: true,
                acousticSoundIsolation: true,
            },
        },
    });
    console.log('✓ Accommodation categories created (Azure Suite, Limestone Villa, Garden Pavilion).\n');

    // =========================================================================
    // 4. SEED PHYSICAL ROOM UNITS
    // =========================================================================
    console.log('🚪 Seeding Physical Room Units...');

    const unit402 = await prisma.roomUnit.create({
        data: {
            sanctuaryId: sanctuaryPositano.id,
            accommodationId: catAzureSuite.id,
            unitCode: '402',
            floorLevel: 'Level IV',
            wing: 'Cliffside West Wing',
            status: 'CLEAN_INSPECTED',
            isOccupied: false,
            maintenanceFlag: false,
            assignedStaffId: staffElenaRossi.id,
            lastInspectedAt: new Date(),
        },
    });

    const unit401 = await prisma.roomUnit.create({
        data: {
            sanctuaryId: sanctuaryPositano.id,
            accommodationId: catAzureSuite.id,
            unitCode: '401',
            floorLevel: 'Level IV',
            wing: 'Cliffside West Wing',
            status: 'CLEAN_INSPECTED',
            isOccupied: false,
            maintenanceFlag: false,
            assignedStaffId: staffElenaRossi.id,
        },
    });

    const unitVilla101 = await prisma.roomUnit.create({
        data: {
            sanctuaryId: sanctuaryPositano.id,
            accommodationId: catLimestoneVilla.id,
            unitCode: 'Villa 101',
            floorLevel: 'Level I Waterfront',
            wing: 'Marine Gate Enclave',
            status: 'CLEAN_INSPECTED',
            isOccupied: false,
            maintenanceFlag: false,
            assignedStaffId: staffMatteoBellini.id,
        },
    });

    const unitPavilion201 = await prisma.roomUnit.create({
        data: {
            sanctuaryId: sanctuaryPositano.id,
            accommodationId: catGardenPavilion.id,
            unitCode: 'Pavilion 201',
            floorLevel: 'Upper Terraces',
            wing: 'Citrus Grove Pergola',
            status: 'CLEAN_INSPECTED',
            isOccupied: false,
            maintenanceFlag: false,
            assignedStaffId: staffElenaRossi.id,
        },
    });
    console.log('✓ Physical units created (Suite 402, Suite 401, Villa 101, Pavilion 201).\n');

    // =========================================================================
    // 5. SEED HOUSEKEEPING TASKS
    // =========================================================================
    console.log('🧹 Seeding Housekeeping & Inspection Tasks...');

    await prisma.housekeepingTask.create({
        data: {
            sanctuaryId: sanctuaryPositano.id,
            roomUnitId: unit402.id,
            taskType: 'SENSORY_PREPARATION',
            priority: 'VIP_URGENT',
            status: 'IN_PROGRESS',
            assignedStaffId: staffElenaRossi.id,
            scheduledFor: new Date(),
            notes: 'Stage Hungarian goose down pillows, pre-cool suite to 20.5°C, atomize Amalfi Neroli.',
            checklistData: [
                { label: 'Geothermal HVAC calibrated to 20.5°C', isDone: true },
                { label: 'Bespoke goose down pillows staged on left chamber', isDone: true },
                { label: 'Cold-atomized Neroli botanical diffuser initialized', isDone: false },
                { label: '2016 Ornellaia decanted into Riedel crystal', isDone: false },
            ],
        },
    });
    console.log('✓ Housekeeping tasks registered.\n');

    // =========================================================================
    // 6. SEED DYNAMIC RATE RULES
    // =========================================================================
    console.log('📈 Seeding Rate Rules & Surge Pricing...');

    await prisma.rateRule.create({
        data: {
            sanctuaryId: sanctuaryPositano.id,
            accommodationId: catAzureSuite.id,
            name: 'Mid-Season Sanctuary Tariff',
            startDate: new Date('2025-01-01'),
            endDate: new Date('2025-12-31'),
            multiplier: 1.0,
            minimumStayNights: 2,
            closedForArrival: false,
            closedForDeparture: false,
            sovereignKeyDiscount: 15.0,
            isActive: true,
        },
    });

    await prisma.rateRule.create({
        data: {
            sanctuaryId: sanctuaryPositano.id,
            accommodationId: catAzureSuite.id,
            name: 'August High Summer Solstice Surge',
            startDate: new Date('2025-08-01'),
            endDate: new Date('2025-08-31'),
            multiplier: 1.25,
            minimumStayNights: 3,
            sovereignKeyDiscount: 10.0,
            isActive: true,
        },
    });
    console.log('✓ Rate rules inscribed.\n');

    // =========================================================================
    // 7. SEED EXPERIENCES & DINING VENUES
    // =========================================================================
    console.log('🍷 Seeding Curated Experiences & Dining Venues...');

    await prisma.experience.create({
        data: {
            sanctuaryId: sanctuaryPositano.id,
            slug: 'private-riva-aquarama-faraglioni-capri',
            title: 'Private Riva Aquarama Faraglioni & Capri Expedition',
            category: 'NAUTICAL_CHARTER',
            tagline: 'Master-Restored 1968 Riva Aquarama Super Cruise',
            durationMinutes: 480,
            pricePerPerson: 1850.0,
            currency: 'EUR',
            maxPartySize: 6,
            mediaData: {
                heroImage: '/limestone-villa.png',
                gallery: ['/limestone-villa.png'],
            },
            narrative: {
                headline: 'Glide across the sapphire Tyrrhenian along sheer limestone cliffs.',
                description:
                    'Private captain, vintage Dom Pérignon collation, secluded grottos, and La Fontelina tender access.',
                highlights: [
                    'Master-restored 1968 classic mahogany hull',
                    'Dom Pérignon Vintage champagne & seasonal Campanian cicchetti',
                    'Direct boarding from Aurelia sea gate',
                ],
            },
            scheduleData: {
                departureTimes: ['09:30', '14:30'],
                daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
            },
        },
    });

    await prisma.experience.create({
        data: {
            sanctuaryId: sanctuaryPositano.id,
            slug: 'subterranean-roman-thermal-grotto',
            title: 'Subterranean Roman Thermal Grotto Circuit & Caldarium Ritual',
            category: 'WELLNESS_SPA',
            tagline: 'Natural Volcanic Cavern Hydrothermal Immersion',
            durationMinutes: 90,
            pricePerPerson: 240.0,
            currency: 'EUR',
            maxPartySize: 2,
            mediaData: {
                heroImage: '/garden-pavillion.png',
                gallery: ['/garden-pavillion.png'],
            },
            narrative: {
                headline: '90-minute private hydrothermal immersion through volcanic limestone.',
                description:
                    'Caldarium, Tepidarium, Frigidarium, and warm neroli oil fascia release for two.',
                highlights: [
                    'Natural geothermal mineral veins at 34.2°C',
                    'Acoustically isolated basalt stone chamber',
                    'Wild botanical herbal infusion',
                ],
            },
            scheduleData: {
                departureTimes: ['10:00', '14:00', '16:30', '19:00'],
                daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
            },
        },
    });

    await prisma.experience.create({
        data: {
            sanctuaryId: sanctuaryPositano.id,
            slug: 'historic-barolo-vault-tasting',
            title: 'Historic Subterranean Barolo & Super Tuscan Vault Tasting',
            category: 'GASTRONOMY',
            tagline: 'Sommelier-Guided Flight Through 19th-Century Volcanic Cellars',
            durationMinutes: 75,
            pricePerPerson: 180.0,
            currency: 'EUR',
            maxPartySize: 6,
            mediaData: {
                heroImage: '/limestone-villa.png',
                gallery: ['/limestone-villa.png'],
            },
            narrative: {
                headline: 'Rare library verticals of Sassicaia, Ornellaia, and aged Monfortino.',
                description: 'Guided by Senior Sommelier Matteo Bellini in monolithic tuff cellars.',
                highlights: [
                    'Six historic cru allocations',
                    'Artisan cave-aged Campanian cheeses',
                    'Pre-arrival cellar allocation reserve privileges',
                ],
            },
            scheduleData: {
                departureTimes: ['17:30', '19:30'],
                daysOfWeek: [2, 3, 4, 5, 6, 7],
            },
        },
    });

    await prisma.diningVenue.create({
        data: {
            sanctuaryId: sanctuaryPositano.id,
            name: 'Ristorante Il Belvedere',
            cuisineType: 'Campanian Coastal Catch & Century Citrus Terroir',
            michelinStars: 3,
            dressCode: 'Quiet Editorial Elegance • Bespoke Casual',
            hours: 'Dinner: 19:30 – 23:30',
            mediaData: {
                heroImage: '/limestone-villa.png',
                terraceViewImage: '/limestone-villa.png',
            },
        },
    });
    console.log('✓ Experiences & Dining venues created (Riva Charter, Caldarium Spa, Barolo Vault, Il Belvedere).\n');

    // =========================================================================
    // 8. SEED USERS & SOVEREIGN PROFILES (PATRONS)
    // =========================================================================
    console.log('👑 Seeding Sovereign Patrons & Profiles...');

    const userKatherine = await prisma.user.create({
        data: {
            email: 'k.vane-tempest@sovereign-holdings.co.uk',
            title: 'Lady',
            firstName: 'Katherine',
            lastName: 'Vane-Tempest',
            phoneNumber: '+44 7911 882901',
            role: 'GUEST',
            sovereignTier: 'SOVEREIGN_KEY',
            sovereignKeyNumber: 'AUR-8911-S',
            lifetimeStaysCount: 14,
            lifetimeSpendTotal: 184500.0,
            avatarUrl: '/garden-pavillion.png',
            profile: {
                create: {
                    passportData: {
                        nationality: 'GB',
                        passportNumberMasked: '******8829',
                        issuingCountry: 'United Kingdom',
                    },
                    preferences: {
                        dietaryRestrictions: ['Shellfish Intolerance for companion', 'Gluten-conscious'],
                        preferredChampagne: 'Dom Pérignon 2012 Vintage',
                        arrivalBeverage: 'Cold-Pressed Calabrian Bergamot Tonic',
                        verbalConciergePin: '8829',
                        invitationToken: 'AUR-8829-SVR',
                        enclavesOfInterest: ['amalfi-positano', 'kyoto-higashiyama'],
                    },
                    sensoryPreferences: {
                        preferredPillowType: 'ORGANIC_GOOSE_DOWN',
                        preferredFirmness: 'PLUSH',
                        roomAromaBlend: 'AMALFI_NEROLI_BERGAMOT',
                        circadianWakeHour: '07:30',
                        circadianWarmEveningDimHour: '21:00',
                        idealRoomTemperatureCelsius: 20.5,
                        turndownHerbalTea: 'WILD_CHAMOMILE',
                        preferredSoakingSalts: 'VOLCANIC_SULFUR_MINERAL',
                    },
                },
            },
        },
    });

    const userJulian = await prisma.user.create({
        data: {
            email: 'j.vane-tempest@sovereign-holdings.co.uk',
            title: 'Lord',
            firstName: 'Julian',
            lastName: 'Vane-Tempest',
            phoneNumber: '+44 7911 123456',
            role: 'GUEST',
            sovereignTier: 'SOVEREIGN_KEY',
            sovereignKeyNumber: 'AUR-8829-VIP',
            lifetimeStaysCount: 18,
            lifetimeSpendTotal: 242000.0,
            avatarUrl: '/limestone-villa.png',
            profile: {
                create: {
                    passportData: {
                        nationality: 'GB',
                        passportNumberMasked: '******9014',
                        issuingCountry: 'United Kingdom',
                    },
                    preferences: {
                        dietaryRestrictions: ['Campania whites & biodynamic pressings preference'],
                        preferredChampagne: 'Giulio Ferrari Riserva del Fondatore 2008',
                        arrivalBeverage: 'Suntory Minami-Alps Glacial Water chilled to 7°C',
                        verbalConciergePin: '8829',
                    },
                    sensoryPreferences: {
                        preferredPillowType: 'ORGANIC_GOOSE_DOWN',
                        preferredFirmness: 'MEDIUM_SOFT',
                        roomAromaBlend: 'AMALFI_NEROLI_BERGAMOT',
                        circadianWakeHour: '07:15',
                        circadianWarmEveningDimHour: '22:30',
                        idealRoomTemperatureCelsius: 19.5,
                        turndownHerbalTea: 'LEMON_VERBENA',
                        preferredSoakingSalts: 'SICILIAN_SEA_SALT_LAVENDER',
                    },
                },
            },
        },
    });
    console.log('✓ Patrons seeded (Lady Katherine Vane-Tempest, Lord Julian Vane-Tempest).\n');

    // =========================================================================
    // 9. SEED ACTIVE BOOKING, LINE ITEMS & FINANCIAL FOLIO
    // =========================================================================
    console.log('📑 Seeding Active Booking & Sovereign Folio Ledger...');

    const checkIn = new Date('2025-10-14T14:00:00Z');
    const checkOut = new Date('2025-10-19T12:00:00Z');
    const nights = 5;
    const nightlyRate = 980.0;
    const roomSubtotal = nightlyRate * nights; // €4,900.00
    const sovereignDiscount = 735.0; // 15% discount
    const rivaTransferFee = 480.0;
    const thermalGrottoFee = 240.0;
    const experiencesTotal = rivaTransferFee + thermalGrottoFee; // €720.00
    const unescoDues = 442.5; // Statutory taxes
    const cityTax = 5.0 * 2 * nights; // €50.00
    const grandTotal = roomSubtotal - sovereignDiscount + experiencesTotal + unescoDues; // €5,327.50

    const bookingRef = 'AUR-2025-9014';

    const activeBooking = await prisma.booking.create({
        data: {
            bookingReference: bookingRef,
            userId: userKatherine.id,
            sanctuaryId: sanctuaryPositano.id,
            accommodationId: catAzureSuite.id,
            roomUnitId: unit402.id,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            numberOfNights: nights,
            adultsCount: 2,
            childrenCount: 0,
            specialRequests:
                'Arriving via NetJets Citation Latitude NJE849 into Naples Marina. Direct Riva sea-gate tender coordinated with dock master.',
            status: 'CONFIRMED',
            currency: 'EUR',
            roomNightlyTotal: roomSubtotal,
            experiencesTotal: experiencesTotal,
            taxesAndServiceTotal: unescoDues,
            cityTaxTotal: cityTax,
            grandTotal: grandTotal,
            depositPaid: grandTotal,
            balanceDueAtCheckIn: 0.0,
            qrCodeData: `AURELIA://${bookingRef}/KEYLESS-PASS/SUITE-402`,
            lineItems: {
                create: [
                    {
                        itemType: 'ROOM_STAY',
                        title: 'The Azure Master Ocean Suite (5 Nights)',
                        description: 'Suite 402 • Guaranteed Direct Rate with 15% Sovereign Courtesy',
                        quantity: 5,
                        unitPrice: nightlyRate,
                        currency: 'EUR',
                    },
                    {
                        itemType: 'BESPOKE_TRANSFER',
                        title: 'Private Riva Aquarama Harbor Tender Transfer',
                        description: 'Naples Marina Molo Beverello directly to Aurelia private dock slipway',
                        quantity: 1,
                        unitPrice: rivaTransferFee,
                        currency: 'EUR',
                        scheduledTime: checkIn,
                    },
                    {
                        itemType: 'SPA_TREATMENT',
                        title: 'Subterranean Roman Thermal Grotto Circuit & Caldarium Ritual',
                        description: 'Couples 90-minute volcanic basalt soak & neroli fascia release',
                        quantity: 1,
                        unitPrice: thermalGrottoFee,
                        currency: 'EUR',
                        scheduledTime: new Date('2025-10-15T16:00:00Z'),
                    },
                ],
            },
            folio: {
                create: {
                    status: 'SETTLED',
                    currency: 'EUR',
                    payments: [
                        {
                            transactionId: 'TXN-AUR-99014-AMEX',
                            amount: grandTotal,
                            currency: 'EUR',
                            type: 'DEPOSIT',
                            paymentMethod: 'CREDIT_CARD',
                            cardLastFour: '9014',
                            settledAt: new Date().toISOString(),
                        },
                    ],
                },
            },
        },
    });

    // Mark unit 402 as linked to current booking
    await prisma.roomUnit.update({
        where: { id: unit402.id },
        data: { currentBookingId: activeBooking.id },
    });

    console.log(`✓ Active booking created (#${bookingRef} for Lady Katherine in Suite 402).\n`);

    console.log('=========================================================================');
    console.log('✨ Aurelia Hotels & Residences Database Seeding Complete!');
    console.log('   • 3 Sanctuaries (Positano, Kyoto, St. Moritz)');
    console.log('   • 4 Staff Members & Majordomos (Matteo Bellini, Matteo de Luca, etc.)');
    console.log('   • 3 Accommodations (Azure Suite, Limestone Villa, Garden Pavilion)');
    console.log('   • 4 Physical Units (Suite 402, 401, Villa 101, Pavilion 201)');
    console.log('   • 3 Curated Experiences + 1 Three-Michelin Dining Venue');
    console.log('   • 2 Sovereign Patrons with Sensory Profiles (Lady Katherine, Lord Julian)');
    console.log('   • 1 Confirmed Booking (#AUR-2025-9014) with Settled Folio & QR Pass');
    console.log('=========================================================================\n');
}

main()
    .catch((e) => {
        console.error('❌ Error executing database seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });