"use server";

import { randomInt, createHmac, timingSafeEqual, randomBytes, createHash } from "node:crypto";
import { Resend } from "resend";
import { cookies } from "next/headers";
import { prisma } from "@/lib/config/prisma";
import type { CountryIso2 } from "@/lib/data/phoneValidator";
import type { PatronSectionData, PatronFormData } from "@/components/hotel/checkout/PatronAndLogistics";
import { Prisma } from "@/app/generated/prisma/client";

const resend = new Resend(process.env.RESEND_API_KEY);
const MAX_OTP_ATTEMPTS = 5;
const SESSION_COOKIE_NAME = "aurelia-session";
const PENDING_OTP_COOKIE_NAME = "aurelia-pending-otp";

export interface SendOtpState {
    success: boolean;
    message: string;
}

export interface VerifyOtpResult {
    success: boolean;
    message: string;
    expired?: boolean;
    userId?: string;
    sovereignKeyNumber?: string | null;
}

export interface PendingUserStatus {
    status: boolean;
    email: string;
    attempts: number;
    expiresAt: string;
}

// ============================================================================
// 1. SEND OTP ACTION
// ============================================================================

export async function sendOtp(
    prevState: SendOtpState,
    formData: FormData
): Promise<SendOtpState> {
    try {
        const identifier = formData.get("identifier");
        const remember = formData.get("remember");

        if (typeof identifier !== "string" || !identifier.trim()) {
            return {
                success: false,
                message: "Please enter your email or Sovereign ID.",
            };
        }

        const normalizedIdentifier = identifier.trim();

        // 1. Locate user
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: {
                            equals: normalizedIdentifier,
                            mode: "insensitive",
                        },
                    },
                    {
                        sovereignKeyNumber: {
                            equals: normalizedIdentifier.toUpperCase(),
                        },
                    },
                ],
            },
        });

        if (!user) {
            return {
                success: false,
                message: "User not found with those credentials.",
            };
        }

        // 2. Generate 6-digit OTP
        const otp = randomInt(100000, 1000000).toString();

        const otpHashSecret = process.env.OTP_HASH_SECRET;
        if (!otpHashSecret) {
            throw new Error("OTP_HASH_SECRET is not configured in environment variables.");
        }

        const tokenHash = createHmac("sha256", otpHashSecret)
            .update(otp)
            .digest("hex");

        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5-minute validity

        // 3. Purge older challenges
        await prisma.otpChallenge.deleteMany({
            where: {
                identifier: user.email,
            },
        });

        // 4. Create fresh challenge
        const challenge = await prisma.otpChallenge.create({
            data: {
                identifier: user.email,
                userId: user.id,
                tokenHash,
                attempts: 0,
                expiresAt,
                remember: remember ? true : false,
                metadata: {},
            },
        });

        // 5. Dispatch email via Resend
        const { error } = await resend.emails.send({
            from: process.env.EMAIL_FROM || "concierge@aureliahotels.com",
            to: [user.email],
            subject: "Aurelia Sovereign Inscription — Your Verification Cipher",
            text: `Welcome, ${user.title || "Patron"} ${user.lastName}.\n\nYour confidential 6-digit verification cipher is: ${otp}\n\nThis token will expire in 5 minutes. Enter this code to access your Sovereign Patron Folio.\n\nWith unhurried regards,\nAurelia Hotels & Residences Curatorial Council`,
        });

        if (error) {
            await prisma.otpChallenge.deleteMany({
                where: {
                    id: challenge.id,
                },
            });
            throw new Error("Unable to dispatch verification email.");
        }

        const cookieStore = await cookies();
        cookieStore.set(PENDING_OTP_COOKIE_NAME, challenge.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: expiresAt,
            path: "/",
        });

        return {
            success: true,
            message: "A verification code has been sent to your registered email.",
        };
    } catch (error) {
        console.error("sendOtp error:", error);
        return {
            success: false,
            message: "Something went wrong. Please try again.",
        };
    }
}

// ============================================================================
// 2. VERIFY OTP ACTION
// ============================================================================

export async function verifyOtp(otp: string): Promise<VerifyOtpResult> {
    try {
        if (!/^\d{6}$/.test(otp)) {
            return {
                success: false,
                message: "Please enter a valid six-digit verification code.",
            };
        }

        const cookieStore = await cookies();
        const challengeId = cookieStore.get(PENDING_OTP_COOKIE_NAME)?.value;

        if (!challengeId) {
            return {
                success: false,
                message: "Your verification session has expired. Please log in again.",
            };
        }

        const challenge = await prisma.otpChallenge.findUnique({
            where: {
                id: challengeId,
            },
        });

        if (!challenge) {
            cookieStore.delete(PENDING_OTP_COOKIE_NAME);
            return {
                success: false,
                message: "Your verification session has expired. Please log in again.",
            };
        }

        if (challenge.expiresAt <= new Date()) {
            await prisma.otpChallenge.delete({ where: { id: challenge.id } });
            cookieStore.delete(PENDING_OTP_COOKIE_NAME);
            return {
                expired: true,
                success: false,
                message: "This verification code has expired. Please log in again.",
            };
        }

        if (challenge.attempts >= MAX_OTP_ATTEMPTS) {
            await prisma.otpChallenge.delete({
                where: {
                    id: challenge.id,
                },
            });
            cookieStore.delete(PENDING_OTP_COOKIE_NAME);
            return {
                expired: true,
                success: false,
                message: "Too many incorrect attempts. Please log in again.",
            };
        }

        const secret = process.env.OTP_HASH_SECRET;
        if (!secret) {
            throw new Error("OTP_HASH_SECRET is not configured.");
        }

        const submittedHash = createHmac("sha256", secret).update(otp).digest();
        const storedHash = Buffer.from(challenge.tokenHash, "hex");

        const isValid =
            storedHash.length === submittedHash.length &&
            timingSafeEqual(storedHash, submittedHash);

        if (!isValid) {
            await prisma.otpChallenge.update({
                where: {
                    id: challenge.id,
                },
                data: {
                    attempts: {
                        increment: 1,
                    },
                },
            });

            return {
                success: false,
                message: "That verification code is incorrect.",
            };
        }

        await prisma.otpChallenge.delete({
            where: {
                id: challenge.id,
            },
        });

        cookieStore.delete(PENDING_OTP_COOKIE_NAME);

        const { userId, remember } = challenge;
        if (!userId) {
            return {
                success: false,
                message: "User ID not found for this challenge. Please log in again.",
            };
        }

        await createUserSession(userId, remember);

        const patron = await prisma.user.findUnique({
            where: { id: userId },
            select: { sovereignKeyNumber: true },
        });

        return {
            success: true,
            message: "Verification successful.",
            userId,
            sovereignKeyNumber: patron?.sovereignKeyNumber || null,
        };
    } catch (error) {
        console.error("verifyOtp error:", error);
        return {
            success: false,
            message: "Something went wrong. Please try again.",
        };
    }
}

// ============================================================================
// 3. USER SESSION CREATION
// ============================================================================

export async function createUserSession(userId: string, remember: boolean): Promise<string> {
    const sessionToken = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(sessionToken).digest("hex");

    const expiresAt = new Date(
        Date.now() + (remember ? 30 : 7) * 24 * 60 * 60 * 1000
    );

    await prisma.userSession.create({
        data: {
            userId,
            tokenHash,
            expiresAt,
        },
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: expiresAt,
        path: "/",
    });

    return sessionToken;
}

// ============================================================================
// 4. GET PENDING USER CHALLENGE STATUS
// ============================================================================

export async function getPendingUser(): Promise<PendingUserStatus> {
    const cookieStore = await cookies();
    const challengeId = cookieStore.get(PENDING_OTP_COOKIE_NAME)?.value;

    if (!challengeId) {
        return {
            status: false,
            email: "",
            attempts: 0,
            expiresAt: "",
        };
    }

    const challenge = await prisma.otpChallenge.findUnique({
        where: {
            id: challengeId,
        },
        select: {
            identifier: true,
            expiresAt: true,
            attempts: true,
        },
    });

    if (!challenge || challenge.expiresAt <= new Date() || challenge.attempts >= MAX_OTP_ATTEMPTS) {
        cookieStore.delete(PENDING_OTP_COOKIE_NAME);
        return {
            status: false,
            email: "",
            attempts: 0,
            expiresAt: "",
        };
    }

    return {
        status: true,
        email: challenge.identifier,
        attempts: challenge.attempts,
        expiresAt: challenge.expiresAt.toISOString(),
    };
}

// ============================================================================
// 5. GET AUTHENTICATED USER
// ============================================================================

type LightweightUser = Prisma.UserGetPayload<{
    select: {
        id: true;
        email: true;
        title: true;
        firstName: true;
        lastName: true;
        phoneNumber: true;
        phoneCountryIso: true;
        sovereignKeyNumber: true;
        sovereignTier: true;
    };
}>;

type FullUser = Prisma.UserGetPayload<{
    include: {
        profile: true;
        primaryMajordomo: true;
        bookings: {
            where: {
                status: {
                    in: ["CONFIRMED", "CHECKED_IN", "GUARANTEED"];
                };
            };
            include: {
                sanctuary: true;
                accommodationCategory: true;
                roomUnit: true;
                assignedMajordomo: true;
                folio: true;
            };
            orderBy: {
                checkInDate: "asc";
            };
            take: 1;
        };
    };
}>;


export async function getAuthenticatedUser(
    options: { lightweight: true }
): Promise<LightweightUser | null>;

export async function getAuthenticatedUser(
    options?: { lightweight?: false }
): Promise<FullUser | null>;

export async function getAuthenticatedUser(
    options?: { lightweight?: boolean }
): Promise<LightweightUser | FullUser | null> {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

        if (!sessionToken) {
            return null;
        }

        const tokenHash = createHash("sha256")
            .update(sessionToken)
            .digest("hex");

        if (options?.lightweight) {
            const session = await prisma.userSession.findUnique({
                where: { tokenHash },
                select: {
                    expiresAt: true,
                    user: {
                        select: {
                            id: true,
                            email: true,
                            title: true,
                            firstName: true,
                            lastName: true,
                            phoneNumber: true,
                            phoneCountryIso: true,
                            sovereignKeyNumber: true,
                            sovereignTier: true,
                        },
                    },
                },
            });

            if (!session || session.expiresAt <= new Date()) {
                return null;
            }

            return session.user;
        }

        const session = await prisma.userSession.findUnique({
            where: { tokenHash },
            include: {
                user: {
                    include: {
                        profile: true,
                        primaryMajordomo: true,
                        bookings: {
                            where: {
                                status: {
                                    in: ["CONFIRMED", "CHECKED_IN", "GUARANTEED"],
                                },
                            },
                            include: {
                                sanctuary: true,
                                accommodationCategory: true,
                                roomUnit: true,
                                assignedMajordomo: true,
                                folio: true,
                            },
                            orderBy: {
                                checkInDate: "asc",
                            },                        
                        },
                    },
                },
            },
        });

        if (!session || session.expiresAt <= new Date() || !session.user) {
            return null;
        }

        return session.user;
    } catch (error) {
        console.error("getAuthenticatedUser error:", error);
        return null;
    }
}


// ============================================================================
// 6. SPECIALIZED CHECKOUT PATRON SESSION RESOLVER
// ============================================================================

export async function getAuthenticatedPatronCheckoutData(): Promise<PatronSectionData> {
    try {
        const user = await getAuthenticatedUser({ lightweight: false });

        if (!user) {
            return {
                isAuthenticated: false,
                initialFormValues: undefined,
            };
        }

        const profile = user.profile;

        const dietaryDisplay =
            profile?.dietaryRestrictions && profile.dietaryRestrictions.length > 0
                ? profile.dietaryRestrictions.filter(function (d) {
                      return d !== "None";
                  }).join(", ")
                : "";

        let accompanyingGuest = "";
        if (profile?.registeredCompanions) {
            try {
                const parsed =
                    typeof profile.registeredCompanions === "string"
                        ? JSON.parse(profile.registeredCompanions)
                        : profile.registeredCompanions;
                if (Array.isArray(parsed) && parsed.length > 0) {
                    accompanyingGuest = parsed[0]?.name || parsed[0]?.fullName || "";
                }
            } catch {
                accompanyingGuest = "";
            }
        }

        const rawPhone = user.phoneNumber || "";
        const cleanPhone = rawPhone.replace(/^\+\d+\s*/, "");

        const populatedValues: Partial<PatronFormData> = {
            title: user.title || "Mr",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phoneCountryIso: (user.phoneCountryIso as CountryIso2) || "GB",
            phoneNumber: cleanPhone,
            isPhoneValid: cleanPhone.length >= 7,
            accompanyingGuestName: accompanyingGuest,
            dietaryAndCellarNuances: dietaryDisplay,
        };

        const fullName = `${user.title ? user.title + " " : ""}${user.firstName} ${user.lastName}`.trim();

        return {
            isAuthenticated: true,
            patronName: fullName || "Patron",
            patronFolioCode: user.sovereignKeyNumber || undefined,
            initialFormValues: populatedValues,
        };
    } catch (error) {
        console.error("getAuthenticatedPatronCheckoutData error:", error);
        return {
            isAuthenticated: false,
        };
    }
}

// ============================================================================
// 7. LOGOUT ACTION
// ============================================================================

export async function logoutUser() {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

        if (sessionToken) {
            const tokenHash = createHash("sha256").update(sessionToken).digest("hex");

            await prisma.userSession.deleteMany({
                where: {
                    tokenHash,
                },
            });

            cookieStore.delete(SESSION_COOKIE_NAME);
        }

        return { success: true };
    } catch (error) {
        console.error("logoutUser error:", error);
        return { success: false };
    }
}
