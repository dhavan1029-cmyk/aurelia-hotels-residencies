'use server';

import { cookies } from 'next/headers';
import {
    createHmac,
    randomBytes,
    randomInt,
    scryptSync,
    timingSafeEqual,
} from 'node:crypto';
import { Resend } from 'resend';
import { prisma } from '@/lib/config/prisma';
import { createUserSession } from './auth';
import {
    CountryIso2,
    validatePhoneNumberStrict,
    StrictValidationResult,
} from '@/lib/hotel/phoneValidator';

const resend = new Resend(process.env.RESEND_API_KEY);
const COOLDOWN_SECONDS = 60;
const OTP_EXPIRY_MINUTES = 5;
const MAX_OTP_ATTEMPTS = 5;

// ============================================================================
// 1. DATA CONTRACTS & METADATA INTERFACES
// ============================================================================

export interface InitiateRegisterPayload {
    honorific: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneCountryCode?: string;
    phoneNumber: string;
    selectedCountryIso?: CountryIso2 | string;
    passkey: string;
    conciergePin: string;
    selectedSanctuaryIds?: string[];
    selectedAromaId?: string;
    selectedCellarId?: string;
    invitationToken?: string;
    agreeSwissPrivacy: boolean;
    agreeSensorySync?: boolean;
    rememberDevice?: boolean;
}

export interface InitiateRegisterResult {
    success: boolean;
    message: string;
    fieldErrors?: Partial<Record<keyof InitiateRegisterPayload, string>>;
    challengeId?: string;
    expiresAt?: string;
    cooldownSeconds?: number;
}

export interface VerifyRegisterResult {
    success: boolean;
    message: string;
    expired?: boolean;
    remainingAttempts?: number;
    userId?: string;
    sovereignKeyNumber?: string;
}

export interface ResendRegisterOtpResult {
    success: boolean;
    message: string;
    cooldownSeconds?: number;
}

export interface PendingRegistrationDraft {
    honorific: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string; // Formatted international string (e.g. "+44 7911 882901")
    phoneNationalDigits: string;
    phoneCallingCode: string;
    phoneCountryIso: string;
    passwordHash: string;
    conciergePin: string;
    selectedSanctuaryIds: string[];
    selectedAromaId: string;
    selectedCellarId: string;
    invitationToken: string;
    sovereignTier: 'SOVEREIGN_KEY' | 'EXPLORER';
    confidentialityLevel: string;
    initiatedAt: string;
}

// ============================================================================
// 2. CRYPTOGRAPHIC PRIMITIVES
// ============================================================================

function hashPasskey(passkey: string): string {
    const salt = randomBytes(16).toString('hex');
    const derivedKey = scryptSync(passkey, salt, 64).toString('hex');
    return `${salt}:${derivedKey}`;
}

function hashOtpCipher(otp: string, secret: string): string {
    return createHmac('sha256', secret)
        .update(otp)
        .digest('hex');
}

function verifyOtpCipher(otp: string, storedTokenHashHex: string, secret: string): boolean {
    const submittedHash = createHmac('sha256', secret)
        .update(otp)
        .digest();

    const storedHash = Buffer.from(storedTokenHashHex, 'hex');

    if (storedHash.length !== submittedHash.length) {
        return false;
    }

    return timingSafeEqual(storedHash, submittedHash);
}

export type sovereignTierType = 'EXP' | 'SVR' | 'IMP'

async function generateUniqueSovereignKey(sovereignTier: sovereignTierType): Promise<string> {
    let key = '';
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 10) {
        attempts++;
        const randomSeq = Math.floor(1000 + Math.random() * 9000);
        key = `AUR-${randomSeq}-${sovereignTier}`;

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

// ============================================================================
// 3. SERVER ACTION: INITIATE REGISTRATION
// ============================================================================

export async function initiateRegistrationAction(
    payload: InitiateRegisterPayload
): Promise<InitiateRegisterResult> {
    try {
        const {
            honorific = 'Lady',
            firstName,
            lastName,
            email,
            phoneNumber,
            selectedCountryIso = 'GB',
            passkey,
            conciergePin,
            selectedSanctuaryIds = [],
            selectedAromaId,
            selectedCellarId,
            invitationToken,
            agreeSwissPrivacy,
            rememberDevice,
        } = payload;

        // Defensive field validation
        const fieldErrors: Partial<Record<keyof InitiateRegisterPayload, string>> = {};

        if (!firstName?.trim()) {
            fieldErrors.firstName = 'Given name is required for diplomatic correspondence.';
        }

        if (!lastName?.trim()) {
            fieldErrors.lastName = 'Family surname is required for folio inscription.';
        }

        if (!email?.trim() || !email.includes('@')) {
            fieldErrors.email = 'A valid correspondence email address is required.';
        }

        // Strict ITU-T National Numbering Validation via phoneValidator.ts
        const phoneValidation: StrictValidationResult = validatePhoneNumberStrict(
            phoneNumber,
            selectedCountryIso as CountryIso2
        );

        if (!phoneValidation.isValid) {
            fieldErrors.phoneNumber = phoneValidation.errorMessage || 'Invalid telephone number for selected nation.';
        }

        // NIST SP 800-63B passkey checks
        const trimmedPasskey = (passkey || '').trim();
        const hasMinLength = trimmedPasskey.length >= 12;
        const hasUppercase = /[A-Z]/.test(passkey || '');
        const hasLowercase = /[a-z]/.test(passkey || '');
        const hasNumber = /[0-9]/.test(passkey || '');
        const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(passkey || '');

        if (!hasMinLength) {
            fieldErrors.passkey = 'Sovereign passkey must contain at least 12 glyphs (excluding padding spaces).';
        } else if (!hasUppercase || !hasLowercase || !hasNumber || !hasSymbol) {
            fieldErrors.passkey = 'Passkey must contain uppercase, lowercase, numeric, and symbol glyphs (excluding spaces).';
        }

        const cleanPin = (conciergePin || '').replace(/\D/g, '');
        if (!cleanPin || cleanPin.length !== 4) {
            fieldErrors.conciergePin = 'A 4-digit verbal concierge PIN is mandatory for telephone dispatch.';
        }

        if (!agreeSwissPrivacy) {
            fieldErrors.agreeSwissPrivacy = 'Agreement to the Swiss Confidentiality Protocol is mandatory.';
        }

        if (Object.keys(fieldErrors).length > 0) {

            let message = ''

            if(fieldErrors.passkey) message = 'Set a strong password'

            return {
                success: false,
                message,
                fieldErrors,
            };
        }

        const normalizedEmail = email.trim().toLowerCase();
        // const formattedE164Phone = phoneValidation.displayFormatted; // e.g. "+44 7911 882901"
        const cleanNationalDigits = phoneValidation.cleanNationalDigits;

        // Duplicate conflict checks: Email
        const existingEmailUser = await prisma.user.findFirst({
            where: {
                email: {
                    equals: normalizedEmail,
                    mode: 'insensitive',
                },
            },
            select: { id: true, sovereignKeyNumber: true },
        });

        if (existingEmailUser) {
            return {
                success: false,
                message: 'An active Sovereign Folio is already registered with this email address.',
                fieldErrors: {
                    email: 'Correspondence address already inscribed. Please authenticate via the Patron Portal.',
                },
            };
        }

        // Duplicate conflict checks: Direct Telephone (checking national significant suffix)
        const checkSuffix = cleanNationalDigits.length >= 7 
            ? cleanNationalDigits.slice(-7) 
            : cleanNationalDigits;

        const existingPhoneUser = await prisma.user.findFirst({
            where: {
                phoneNumber: {
                    contains: checkSuffix,
                },
            },
            select: { id: true },
        });

        if (existingPhoneUser) {
            return {
                success: false,
                message: 'A folio with this telephone contact already exists in our registry.',
                fieldErrors: {
                    phoneNumber: 'Direct mobile number is already assigned to a registered folio.',
                },
            };
        }

        // Rate limiting check
        const recentChallenge = await prisma.otpChallenge.findFirst({
            where: { identifier: normalizedEmail },
            orderBy: { createdAt: 'desc' },
        });

        if (recentChallenge) {
            const elapsedSeconds = Math.floor((Date.now() - new Date(recentChallenge.createdAt).getTime()) / 1000);
            if (elapsedSeconds < COOLDOWN_SECONDS) {
                const remaining = COOLDOWN_SECONDS - elapsedSeconds;
                return {
                    success: false,
                    message: `Verification code was recently dispatched. Please wait ${remaining}s before requesting a new cipher.`,
                    cooldownSeconds: remaining,
                };
            }
        }

        // Prepare draft metadata
        const cleanToken = (invitationToken || '').trim().toUpperCase();
        const isSponsorToken = cleanToken.startsWith('AUR-') || cleanToken.startsWith('LUX-');
        const sovereignTier = isSponsorToken ? 'SOVEREIGN_KEY' : 'EXPLORER';
        const confidentialityLevel = isSponsorToken
            ? 'Level IV Swiss Banking Privacy Protocol'
            : 'Standard Swiss Banking Secrecy Protocol Level III';

        const passwordHash = hashPasskey(trimmedPasskey);

        // console.log(phoneNumber)

        const draftMetadata: PendingRegistrationDraft = {
            honorific: honorific.trim(),
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: normalizedEmail,
            phoneNumber: phoneValidation.callingCode + phoneNumber,
            phoneNationalDigits: cleanNationalDigits,
            phoneCallingCode: phoneValidation.callingCode,
            phoneCountryIso: phoneValidation.countryIso,
            passwordHash,
            conciergePin: cleanPin,
            selectedSanctuaryIds,
            selectedAromaId: selectedAromaId || 'AMALFI_NEROLI_BERGAMOT',
            selectedCellarId: selectedCellarId || 'SUPER_TUSCAN_RESERVE',
            invitationToken: cleanToken,
            sovereignTier,
            confidentialityLevel,
            initiatedAt: new Date().toISOString(),
        };

        const rawOtp = randomInt(100000, 1000000).toString();
        const otpHashSecret = process.env.OTP_HASH_SECRET;

        if (!otpHashSecret) {
            throw new Error('OTP_HASH_SECRET environment variable is not configured.');
        }

        const tokenHash = hashOtpCipher(rawOtp, otpHashSecret);
        const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

        await prisma.otpChallenge.deleteMany({
            where: { identifier: normalizedEmail },
        });

        const challenge = await prisma.otpChallenge.create({
            data: {
                identifier: normalizedEmail,
                userId: 'pending_registration',
                tokenHash,
                attempts: 0,
                remember: Boolean(rememberDevice),
                metadata: draftMetadata as any,
                expiresAt,
            },
        });

        const emailFrom = process.env.EMAIL_FROM || 'concierge@aureliahotels.com';

        const emailResult = await resend.emails.send({
            from: emailFrom,
            to: [normalizedEmail],
            subject: 'Aurelia Sovereign Inscription — Your Verification Cipher',
            text: `Welcome, ${honorific} ${lastName}.\n\nYour confidential 6-digit registration cipher is: ${rawOtp}\n\nThis token will expire in ${OTP_EXPIRY_MINUTES} minutes. Enter this code to seal your Sovereign Patron Folio.\n\nWith unhurried regards,\nAurelia Hotels & Residences Curatorial Council`,
        });

        if (emailResult.error) {
            await prisma.otpChallenge.delete({ where: { id: challenge.id } });
            console.error('Resend dispatch error in initiateRegistrationAction:', emailResult.error);
            return {
                success: false,
                message: 'Unable to deliver verification cipher to correspondence address. Please check your email.',
            };
        }

        const cookieStore = await cookies();
        cookieStore.set('aurelia-pending-otp', challenge.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: expiresAt,
            path: '/',
        });

        return {
            success: true,
            message: 'Your confidential verification cipher has been dispatched.',
            challengeId: challenge.id,
            expiresAt: expiresAt.toISOString(),
            cooldownSeconds: COOLDOWN_SECONDS,
        };
    } catch (error: any) {
        console.error('initiateRegistrationAction error:', error);
        return {
            success: false,
            message: 'An unexpected cryptographic error occurred during registration. Please consult the Concierge Desk.',
        };
    }
}

// ============================================================================
// 4. SERVER ACTION: VERIFY OTP CIPHER & ATOMICALLY INSCRIBE USER
// ============================================================================

export async function verifyRegisterOtpAction(
    otp: string
): Promise<VerifyRegisterResult> {
    try {
        const cleanOtp = (otp || '').replace(/\D/g, '');

        if (!/^\d{6}$/.test(cleanOtp)) {
            return {
                success: false,
                message: 'Please enter a valid six-digit verification cipher.',
            };
        }

        const cookieStore = await cookies();
        const challengeId = cookieStore.get('aurelia-pending-otp')?.value;

        if (!challengeId) {
            return {
                success: false,
                expired: true,
                message: 'Your registration session has expired. Please resubmit your dossier credentials.',
            };
        }

        const challenge = await prisma.otpChallenge.findUnique({
            where: { id: challengeId },
        });

        if (!challenge) {
            cookieStore.delete('aurelia-pending-otp');
            return {
                success: false,
                expired: true,
                message: 'Your verification docket was not found. Please initiate registration again.',
            };
        }

        if (challenge.expiresAt <= new Date()) {
            await prisma.otpChallenge.delete({ where: { id: challenge.id } });
            cookieStore.delete('aurelia-pending-otp');
            return {
                success: false,
                expired: true,
                message: 'Your confidential verification cipher has expired. Please initiate registration again.',
            };
        }

        if (challenge.attempts >= MAX_OTP_ATTEMPTS) {
            await prisma.otpChallenge.delete({ where: { id: challenge.id } });
            cookieStore.delete('aurelia-pending-otp');
            return {
                success: false,
                expired: true,
                remainingAttempts: 0,
                message: 'Too many incorrect attempts. Registration session terminated for security.',
            };
        }

        const secret = process.env.OTP_HASH_SECRET;
        if (!secret) {
            throw new Error('OTP_HASH_SECRET is not configured.');
        }

        const isValid = verifyOtpCipher(cleanOtp, challenge.tokenHash, secret);

        if (!isValid) {
            const nextAttempts = challenge.attempts + 1;
            const remaining = MAX_OTP_ATTEMPTS - nextAttempts;

            if (nextAttempts >= MAX_OTP_ATTEMPTS) {
                await prisma.otpChallenge.delete({ where: { id: challenge.id } });
                cookieStore.delete('aurelia-pending-otp');
                return {
                    success: false,
                    expired: true,
                    remainingAttempts: 0,
                    message: 'Too many incorrect attempts. Please re-enter your registration credentials.',
                };
            }

            await prisma.otpChallenge.update({
                where: { id: challenge.id },
                data: { attempts: { increment: 1 } },
            });

            return {
                success: false,
                remainingAttempts: remaining,
                message: `That verification cipher is incorrect. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`,
            };
        }

        const draft = (challenge.metadata as unknown as PendingRegistrationDraft) || ({} as PendingRegistrationDraft);

        if (!draft.email || !draft.firstName || !draft.lastName || !draft.passwordHash) {
            await prisma.otpChallenge.delete({ where: { id: challenge.id } });
            cookieStore.delete('aurelia-pending-otp');
            return {
                success: false,
                expired: true,
                message: 'Registration dossier metadata is incomplete. Please submit your registration again.',
            };
        }

        const sovereignKeyNumber = await generateUniqueSovereignKey('EXP');

        let preferredChampagneOrCru = "2016 Tenuta dell'Ornellaia Bolgheri Superiore";
        if (draft.selectedCellarId === 'BURGUNDY_GRAND_CRU') {
            preferredChampagneOrCru = 'Domaine de la Romanée-Conti Grand Cru Allocation';
        } else if (draft.selectedCellarId === 'BIODYNAMIC_MINERAL') {
            preferredChampagneOrCru = 'Etna & Jura Amphora Natural Crus';
        }

        const sensoryDirectives = ['Sensory sync authorized across global enclaves'];
        if (Array.isArray(draft.selectedSanctuaryIds) && draft.selectedSanctuaryIds.length > 0) {
            sensoryDirectives.push(`Primary prospective enclaves: ${draft.selectedSanctuaryIds.join(', ')}`);
        }

        // Atomic commit: User + remodeled GuestProfile
        const createdUser = await prisma.$transaction(async function (tx) {
            const newUser = await tx.user.create({
                data: {
                    email: draft.email,
                    passwordHash: draft.passwordHash,
                    phoneNumber: draft.phoneNumber,
                    title: draft.honorific || 'Lady',
                    firstName: draft.firstName,
                    lastName: draft.lastName,
                    avatarUrl: '/garden-pavillion.png',
                    role: 'GUEST',
                    sovereignTier: draft.sovereignTier || 'SOVEREIGN_KEY',
                    sovereignKeyNumber,
                    lifetimeStaysCount: 0,
                    lifetimeSpendTotal: 0.0,
                },
            });

            await tx.guestProfile.create({
                data: {
                    userId: newUser.id,
                    roomAromaBlend: (draft.selectedAromaId as any) || 'AMALFI_NEROLI_BERGAMOT',
                    aromaIntensityPercent: 25,
                    atomizationProtocolActive: true,
                    preferredMattress: 'NATURAL_LATEX_COIR',
                    preferredPillowLeft: 'ORGANIC_GOOSE_DOWN',
                    preferredPillowRight: 'BUCKWHEAT',
                    idealRoomTemperatureCelsius: 19.5,
                    motorizedBlackoutLouverActive: true,
                    amberDawnSequenceActive: true,
                    circadianWakeHour: '07:15',
                    circadianWarmEveningDimHour: '22:30',
                    turndownHerbalTea: 'WILD_CHAMOMILE',
                    preferredSoakingSalts: 'VOLCANIC_SULFUR_MINERAL',
                    preferredChampagneOrCru,
                    arrivalMineralWater: 'Suntory Minami-Alps Glacial & Lurisia Stille',
                    morningBaristaRitual: 'Panama Geisha Natural Lot #04',
                    baristaScheduleHour: '08:30',
                    dietaryRestrictions: sensoryDirectives,
                    verbalConciergePin: draft.conciergePin || '8829',
                    confidentialityLevel: draft.confidentialityLevel || 'Level IV Swiss Banking Privacy Protocol',
                    registeredCompanions: [],
                },
            });

            return newUser;
        });

        await prisma.otpChallenge.delete({ where: { id: challenge.id } });
        cookieStore.delete('aurelia-pending-otp');

        // Establish session cookie for seamless induction
        await createUserSession(createdUser.id, challenge.remember);

        return {
            success: true,
            message: 'Sovereign folio inscribed and authenticated successfully.',
            userId: createdUser.id,
            sovereignKeyNumber,
        };
    } catch (error) {
        console.error('verifyRegisterOtpAction error:', error);
        return {
            success: false,
            message: 'A cryptographic error occurred while verifying the cipher. Please consult the Concierge Desk.',
        };
    }
}

// ============================================================================
// 5. SERVER ACTION: RESEND OTP CIPHER (SAFE COOLDOWN)
// ============================================================================

export async function resendRegisterOtpAction(): Promise<ResendRegisterOtpResult> {
    try {
        const cookieStore = await cookies();
        const challengeId = cookieStore.get('aurelia-pending-otp')?.value;

        if (!challengeId) {
            return {
                success: false,
                message: 'Your registration session has expired. Please re-enter your dossier credentials.',
            };
        }

        const challenge = await prisma.otpChallenge.findUnique({
            where: { id: challengeId },
        });

        if (!challenge) {
            cookieStore.delete('aurelia-pending-otp');
            return {
                success: false,
                message: 'Verification docket not found. Please initiate registration again.',
            };
        }

        // Generate fresh 6-digit cryptographic OTP cipher unconditionally
        const rawOtp = randomInt(100000, 1000000).toString();
        const otpHashSecret = process.env.OTP_HASH_SECRET;

        if (!otpHashSecret) {
            throw new Error('OTP_HASH_SECRET environment variable is not configured.');
        }

        const newHash = hashOtpCipher(rawOtp, otpHashSecret);
        // Reset full expiration timer from right now
        const newExpiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

        // Update docket: reset attempts to 0, refresh cipher hash and expiry timer
        await prisma.otpChallenge.update({
            where: { id: challenge.id },
            data: {
                tokenHash: newHash,
                attempts: 0,
                expiresAt: newExpiresAt,
            },
        });

        const draft = (challenge.metadata as unknown as PendingRegistrationDraft) || ({} as PendingRegistrationDraft);
        const recipientEmail = challenge.identifier;
        const patronName = draft.lastName
            ? `${draft.honorific || 'Patron'} ${draft.lastName}`
            : 'Patron';

        const emailFrom = process.env.EMAIL_FROM || 'concierge@aureliahotels.com';

        const emailResult = await resend.emails.send({
            from: emailFrom,
            to: [recipientEmail],
            subject: 'Aurelia Sovereign Inscription — Fresh Verification Cipher',
            text: `Salutations, ${patronName}.\n\nYour new 6-digit confidential registration cipher is: ${rawOtp}\n\nThis code will expire in ${OTP_EXPIRY_MINUTES} minutes. Enter this cipher to ratify your Sovereign Patron Folio.\n\nWith unhurried regards,\nAurelia Hotels & Residences Curatorial Council`,
        });

        if (emailResult.error) {
            console.error('Resend dispatch error in resendRegisterOtpAction:', emailResult.error);
            return {
                success: false,
                message: 'Unable to deliver the cipher email. Please verify your internet connection or email address.',
            };
        }

        // Re-arm the session cookie with the refreshed expiration timestamp
        cookieStore.set('aurelia-pending-otp', challenge.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: newExpiresAt,
            path: '/',
        });

        return {
            success: true,
            cooldownSeconds: COOLDOWN_SECONDS,
            message: 'A fresh confidential verification cipher has been dispatched.',
        };
    } catch (error) {
        console.error('resendRegisterOtpAction error:', error);
        return {
            success: false,
            message: 'A cryptographic error occurred while regenerating the cipher. Please consult the Concierge Desk.',
        };
    }
}


