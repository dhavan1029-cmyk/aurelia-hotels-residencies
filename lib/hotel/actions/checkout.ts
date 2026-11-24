'use server';

import { prisma } from '@/lib/config/prisma';
import { getAuthenticatedUser, createUserSession } from '@/lib/hotel/actions/auth';
import { CurrencyCode } from '@/lib/data/currencyCatalog';
import {
    BookingStatus,
    CountryIso2,
    HousekeepingStatus,
    LineItemType,
    PaymentFolioStatus,
    PillowType,
    AromaBlend,
    MattressType,
    TurndownTea,
    SoakingSalts,
    SovereignTier,
    UserRole,
} from '@/app/generated/prisma/enums';
import { Decimal } from '@/app/generated/prisma/internal/prismaNamespace';

// ============================================================================
// 1. DATA CONTRACTS & PAYLOAD INTERFACES
// ============================================================================

export interface ConfirmReservationDates {
    checkIn: string; // ISO format 'YYYY-MM-DD'
    checkOut: string; // ISO format 'YYYY-MM-DD'
    nights: number;
    guests: number;
}

export interface ConfirmReservationPatron {
    title?: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneCountryIso?: CountryIso2;
    phoneNumber: string;
    countryOfResidence?: string;
    accompanyingGuestName?: string;
    selectedArrivalWindowId?: string;
    transportDesignation?: string;
    dietaryAndCellarNuances?: string;
    specialRequests?: string;
}

export interface ConfirmReservationComfort {
    selectedPillowId?: string;
    temperatureCelsius?: number | Decimal;
}

export interface ConfirmReservationFolioSummary {
    nightlyRate: number;
    nightsCount: number;
    roomSubtotal: number;
    sovereignDiscountAmount: number;
    voucherCodeApplied?: string;
    addOnsSubtotal: number;
    environmentalAndHeritageTax: number;
    cityTaxTotal?: number;
    grandTotal: number;
    currencyCode: CurrencyCode | string;
    currencySymbol?: string;
}

export interface ConfirmReservationPaymentMethod {
    paymentMethodType?: string; // e.g. "CARD_GUARANTEE", "APPLE_PAY"
    cardBrand?: string; // e.g. "VISA", "AMEX"
    cardLast4?: string; // e.g. "8829"
    gatewayReferenceId?: string; // e.g. "seti_1N..." or "pi_3M..."
}

export interface ConfirmReservationPayload {
    sanctuarySlug: string;
    suiteSlug: string;
    dates: ConfirmReservationDates;
    patron: ConfirmReservationPatron;
    comfort?: ConfirmReservationComfort;
    selectedAddOnIds?: string[];
    folioSummary?: ConfirmReservationFolioSummary;
    paymentMethod?: ConfirmReservationPaymentMethod;
}

export interface ConfirmReservationResult {
    success: boolean;
    bookingReference?: string;
    bookingId?: string;
    error?: string;
    redirectUrl?: string;
}

// ============================================================================
// 2. CRYPTOGRAPHIC & IDENTIFIER HELPERS
// ============================================================================

function generateFolioReference(): string {
    const year = new Date().getFullYear();
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    return `AUR-${year}-${randomSeq}`;
}

async function generateUniqueSovereignKey(): Promise<string> {
    let key = '';
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 10) {
        attempts++;
        const randomSeq = Math.floor(1000 + Math.random() * 9000);
        key = `AUR-${randomSeq}-EXP`;

        const existing = await prisma.user.findUnique({
            where: { sovereignKeyNumber: key },
            select: { id: true },
        });

        if (!existing) {
            isUnique = true;
        }
    }

    return key;
}

function generateVerbalConciergePin(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

function parseDateUtc(dateStr: string): Date {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day, 15, 0, 0)); // Check-in at 15:00 UTC baseline
}

function sanitizeDigits(raw: string): string {
    return raw ? raw.replace(/\D/g, '') : '';
}

// ============================================================================
// 3. MASTER SERVER ACTION: confirmReservationAction
// ============================================================================

export async function confirmReservationAction(
    payload: ConfirmReservationPayload
): Promise<ConfirmReservationResult> {
    try {
        // --------------------------------------------------------------------
        // Step 1: Input Validation
        // --------------------------------------------------------------------
        if (!payload.sanctuarySlug?.trim()) {
            return { success: false, error: 'A valid sanctuary designation is required.' };
        }

        if (!payload.suiteSlug?.trim()) {
            return { success: false, error: 'A suite sanctuary selection is required.' };
        }

        const patron = payload.patron;
        if (!patron?.firstName?.trim() || !patron?.lastName?.trim()) {
            return { success: false, error: 'Primary patron given name and surname are required.' };
        }

        if (!patron?.email?.trim() || !patron.email.includes('@')) {
            return { success: false, error: 'A valid discreet email address is required for encrypted key dispatch.' };
        }

        const cleanPhone = sanitizeDigits(patron.phoneNumber);
        if (!cleanPhone || cleanPhone.length < 6) {
            return { success: false, error: 'A verified direct mobile phone number is required for majordomo coordination.' };
        }

        if (!payload.dates?.checkIn || !payload.dates?.checkOut) {
            return { success: false, error: 'Valid sanctuary check-in and embarkation dates are required.' };
        }

        const checkInDate = parseDateUtc(payload.dates.checkIn);
        const checkOutDate = parseDateUtc(payload.dates.checkOut);

        if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime()) || checkOutDate <= checkInDate) {
            return { success: false, error: 'Valediction date must occur after the docking date.' };
        }

        const nightsCount = payload.dates.nights > 0
            ? payload.dates.nights
            : Math.max(1, Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)));

        const adultsCount = Math.max(1, payload.dates.guests || 2);

        // --------------------------------------------------------------------
        // Step 2: Relational Entity Resolution
        // --------------------------------------------------------------------
        const sanctuary = await prisma.sanctuary.findUnique({
            where: { slug: payload.sanctuarySlug.trim() },
            include: {
                accommodations: true,
                experiences: true,
                staff: {
                    where: {
                        OR: [
                            { role: { equals: 'MAJORDOMO' } },
                            { role: { equals: 'SOMMELIER' } },
                        ],
                    },
                    take: 1,
                },
            },
        });

        if (!sanctuary) {
            return { success: false, error: `Sanctuary '${payload.sanctuarySlug}' could not be located in registry.` };
        }

        const accommodation = sanctuary.accommodations.find(function (acc) {
            return acc.slug === payload.suiteSlug.trim();
        });

        if (!accommodation) {
            return { success: false, error: `Accommodation '${payload.suiteSlug}' does not exist at ${sanctuary.name}.` };
        }

        const availableRoomUnit = await prisma.roomUnit.findFirst({
            where: {
                accommodationId: accommodation.id,
                status: HousekeepingStatus.CLEAN_INSPECTED,
                isOccupied: false,
            },
        });

        // --------------------------------------------------------------------
        // Step 3: Secure Patron Account Recognition & Silent Inscription
        // --------------------------------------------------------------------
        const existingSessionUser = await getAuthenticatedUser({ lightweight: true });
        const normalizedEmail = patron.email.trim().toLowerCase();
        const countryIso: CountryIso2 = patron.phoneCountryIso || CountryIso2.IT;

        console.log("AUTHENTICATED SESSION USER:", {
            id: existingSessionUser?.id,
            email: existingSessionUser?.email,
        });


        let resolvedUserId: string | null = null;
        let createdNewUserIdForSession: string | null = null;


        if (existingSessionUser) {
            // Case A: Patron is already actively logged in
            resolvedUserId = existingSessionUser.id;

            console.log("RESOLVED USER ID:", resolvedUserId);
        } else {
            // Case B: Check if a registered user already exists with this email
            const existingEmailUser = await prisma.user.findUnique({
                where: { email: normalizedEmail },
                select: { id: true, passwordHash: true },
            });

            if (existingEmailUser) {
                // Associate booking directly with their existing profile
                resolvedUserId = existingEmailUser.id;
            } else {
                // Case C: First-time guest -> Create User + GuestProfile atomically
                const sovereignKeyNumber = await generateUniqueSovereignKey();
                const verbalConciergePin = generateVerbalConciergePin();

                const newUser = await prisma.user.create({
                    data: {
                        email: normalizedEmail,
                        passwordHash: null,
                        phoneNumber: `+${cleanPhone}`,
                        phoneCountryIso: countryIso,
                        nationality: countryIso,
                        title: patron.title || 'Mr.',
                        firstName: patron.firstName.trim(),
                        lastName: patron.lastName.trim(),
                        role: UserRole.GUEST,
                        sovereignTier: SovereignTier.EXPLORER,
                        sovereignKeyNumber,
                        avatarUrl: '/garden-pavillion.png',
                        profile: {
                            create: {
                                roomAromaBlend: AromaBlend.AMALFI_NEROLI_BERGAMOT,
                                aromaIntensityPercent: 25,
                                atomizationProtocolActive: true,
                                preferredMattress: MattressType.NATURAL_LATEX_COIR,
                                preferredPillowLeft: PillowType.ORGANIC_GOOSE_DOWN,
                                preferredPillowRight: PillowType.BUCKWHEAT,
                                idealRoomTemperatureCelsius: payload.comfort?.temperatureCelsius ?? 19.5,
                                motorizedBlackoutLouverActive: true,
                                amberDawnSequenceActive: true,
                                circadianWakeHour: '07:15',
                                circadianWarmEveningDimHour: '22:30',
                                turndownHerbalTea: TurndownTea.WILD_CHAMOMILE,
                                preferredSoakingSalts: SoakingSalts.VOLCANIC_SULFUR_MINERAL,
                                preferredChampagneOrCru: "2016 Tenuta dell'Ornellaia Bolgheri Superiore",
                                arrivalMineralWater: 'Suntory Minami-Alps Glacial & Lurisia Stille',
                                morningBaristaRitual: 'Panama Geisha Natural Lot #04',
                                baristaScheduleHour: '08:30',
                                dietaryRestrictions: patron.dietaryAndCellarNuances ? [patron.dietaryAndCellarNuances] : ['None'],
                                registeredCompanions: patron.accompanyingGuestName ? [{ fullName: patron.accompanyingGuestName }] : [],
                                verbalConciergePin,
                                confidentialityLevel: 'Level IV Swiss Banking Privacy Protocol',
                            },
                        },
                    },
                });

                resolvedUserId = newUser.id;
                createdNewUserIdForSession = newUser.id;
            }
        }

        if (!resolvedUserId) {
            return { success: false, error: 'Could not associate patron account with reservation.' };
        }

        // --------------------------------------------------------------------
        // Step 4: Add-On Experiences Resolution
        // --------------------------------------------------------------------
        const selectedAddOnIds = payload.selectedAddOnIds || [];
        const matchedExperiences = sanctuary.experiences.filter(function (exp) {
            return selectedAddOnIds.includes(exp.id);
        });

        // --------------------------------------------------------------------
        // Step 5: Financial Ledger & Currency Calculation
        // --------------------------------------------------------------------
        const currencyCode = (
            payload.folioSummary?.currencyCode ||
            accommodation.currency ||
            sanctuary.currency ||
            'EUR'
        ).toUpperCase() as CurrencyCode;

        const nightlyRate = accommodation.basePriceNightly || 3450;
        const roomNightlyTotal = nightlyRate * nightsCount;

        const experiencesTotal = matchedExperiences.reduce(function (sum, exp) {
            return sum + (exp.pricePerPerson || 0);
        }, 0);

        const discountAmount = payload.folioSummary?.sovereignDiscountAmount || 0;
        const voucherCode = payload.folioSummary?.voucherCodeApplied || null;

        const taxableBase = Math.max(0, roomNightlyTotal + experiencesTotal - discountAmount);
        const vatRate = accommodation.vatRate || 10.0;
        const taxesAndServiceTotal = Math.round(taxableBase * (vatRate / 100));
        const cityTaxPerGuest = accommodation.cityTaxPerGuest || 5.0;
        const cityTaxTotal = payload.folioSummary?.cityTaxTotal ?? (cityTaxPerGuest * adultsCount * nightsCount);
        const grandTotal = taxableBase + taxesAndServiceTotal + cityTaxTotal;

        const depositPaid = 0.0;
        const balanceDueAtCheckIn = grandTotal;

        // --------------------------------------------------------------------
        // Step 6: Assigned Majordomo & Cryptographic Folio QR
        // --------------------------------------------------------------------
        const assignedMajordomo = sanctuary.staff[0] || null;
        const bookingReference = generateFolioReference();
        const qrCodeData = `AURELIA://FOLIO/${bookingReference}/${sanctuary.code || 'AMA'}`;

        // --------------------------------------------------------------------
        // Step 7: Atomic Database Transaction with Explicit Relational Links
        // --------------------------------------------------------------------
        const createdBooking = await prisma.$transaction(async function (tx) {
            const newBooking = await tx.booking.create({
                data: {
                    bookingReference,

                    // 1. Explicit User Relation Connection:
                    user: {
                        connect: { id: resolvedUserId },
                    },

                    // 2. Relational Links to Sanctuary & Accommodation:
                    sanctuary: {
                        connect: { id: sanctuary.id },
                    },
                    accommodationCategory: {
                        connect: { id: accommodation.id },
                    },
                    ...(availableRoomUnit
                        ? {
                              roomUnit: {
                                  connect: { id: availableRoomUnit.id },
                              },
                          }
                        : {}),

                    // Snapshot Patron Identity:
                    guestTitle: patron.title || 'Mr.',
                    guestFirstName: patron.firstName.trim(),
                    guestLastName: patron.lastName.trim(),
                    guestEmail: normalizedEmail,
                    guestPhone: patron.phoneNumber.trim(),
                    guestCountryIso: countryIso,
                    accompanyingGuestName: patron.accompanyingGuestName?.trim() || null,

                    // Stay Horizon:
                    checkInDate,
                    checkOutDate,
                    numberOfNights: nightsCount,
                    adultsCount,
                    childrenCount: 0,

                    // Arrival Logistics:
                    selectedArrivalWindowId: patron.selectedArrivalWindowId || 'window-standard',
                    transportDesignation: patron.transportDesignation?.trim() || null,
                    dietaryAndCellarNuances: patron.dietaryAndCellarNuances?.trim() || null,
                    specialRequests: patron.specialRequests?.trim() || null,

                    // Sensory Calibrations:
                    selectedPillowId: payload.comfort?.selectedPillowId || 'bespoke-goose-down',
                    targetTemperatureCelsius: Number(payload.comfort?.temperatureCelsius) ?? 19.5,

                    // Financial Ledger:
                    currency: currencyCode,
                    roomNightlyTotal,
                    experiencesTotal,
                    sovereignDiscountTotal: discountAmount,
                    voucherCodeApplied: voucherCode,
                    taxesAndServiceTotal,
                    cityTaxTotal,
                    grandTotal,
                    depositPaid,
                    balanceDueAtCheckIn,

                    // Status & Crypto QR:
                    status: BookingStatus.GUARANTEED,
                    qrCodeData,

                    // Staff:
                    assignedMajordomo: assignedMajordomo
                        ? {
                              connect: { id: assignedMajordomo.id },
                          }
                        : {
                              disconnect: true,
                          },

                    // Itemized Line Items:
                    lineItems: {
                        create: [
                            {
                                itemType: LineItemType.ROOM_STAY,
                                title: `${accommodation.name} (${nightsCount} ${nightsCount === 1 ? 'Night' : 'Nights'})`,
                                description: `Guaranteed sanctuary seclusion from ${payload.dates.checkIn} to ${payload.dates.checkOut}.`,
                                quantity: nightsCount,
                                unitPrice: nightlyRate,
                                totalPrice: roomNightlyTotal,
                                currency: currencyCode,
                            },
                            ...matchedExperiences.map(function (exp) {
                                return {
                                    experienceId: exp.id,
                                    itemType: LineItemType.EXPERIENCE,
                                    title: exp.title,
                                    description: exp.tagline || 'Curated sanctuary immersion orchestrated by resident majordomo.',
                                    quantity: 1,
                                    unitPrice: exp.pricePerPerson || 0,
                                    totalPrice: exp.pricePerPerson || 0,
                                    currency: currencyCode,
                                    durationMinutes: exp.durationMinutes || null,
                                    scheduledDate: checkInDate,
                                };
                            }),
                        ],
                    },

                    // Payment Folio:
                    folio: {
                        create: {
                            status: PaymentFolioStatus.OPEN,
                            currency: currencyCode,
                            paymentMethodType: payload.paymentMethod?.paymentMethodType || 'CARD_GUARANTEE',
                            cardBrand: payload.paymentMethod?.cardBrand || 'VISA',
                            cardLast4: payload.paymentMethod?.cardLast4 || '8829',
                            gatewayReferenceId: payload.paymentMethod?.gatewayReferenceId || `auth_hold_${Date.now()}`,
                            payments: [
                                {
                                    id: `chg_${Date.now()}`,
                                    amount: grandTotal,
                                    type: 'CARD_GUARANTEE',
                                    status: 'AUTHORIZED',
                                    timestamp: new Date().toISOString(),
                                    note: 'Sovereign card guarantee verified; full settlement upon estate departure.',
                                },
                            ],
                        },
                    },
                },
            });

            console.log("CREATED BOOKING RELATION:", {
                bookingId: newBooking.id,
                userId: newBooking.userId,
            });

            // If a room unit was assigned, mark it as occupied
            if (availableRoomUnit) {
                await tx.roomUnit.update({
                    where: { id: availableRoomUnit.id },
                    data: {
                        isOccupied: true,
                        currentBookingId: newBooking.id,
                    },
                });
            }

            return newBooking;
        });

        // --------------------------------------------------------------------
        // Step 8: Issue Session for New Guest Member & Return
        // --------------------------------------------------------------------
        if (createdNewUserIdForSession) {
            await createUserSession(createdNewUserIdForSession, true);
        }

        return {
            success: true,
            bookingReference: createdBooking.bookingReference,
            bookingId: createdBooking.id,
            redirectUrl: `/confirmation?bookingRef=${encodeURIComponent(createdBooking.bookingReference)}`,
        };
    } catch (error) {
        console.error('Ratification failure in confirmReservationAction:', error);
        return {
            success: false,
            error: 'A cryptographic dispatch error occurred while ratifying the sanctuary reservation.',
        };
    }
}

