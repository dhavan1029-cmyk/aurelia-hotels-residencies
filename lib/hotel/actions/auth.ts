"use server";

import { randomInt, createHmac, timingSafeEqual, randomBytes, createHash } from "node:crypto";
import { Resend } from "resend";
import { cookies } from "next/headers";
import { prisma } from "@/lib/config/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendOtpState {
    success: boolean;
    message: string;
}

export async function sendOtp(
    prevState: SendOtpState,
    formData: FormData
): Promise<SendOtpState> {
    try {
        // 1. Extract and validate form data
        const identifier = formData.get("identifier");

        if (
            typeof identifier !== "string" ||
            !identifier.trim()
        ) {
            return {
                success: false,
                message: "Please enter your email or Sovereign ID.",
            };
        }

        const normalizedIdentifier = identifier.trim();

        // 2. Find user using email or Sovereign ID
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
                message: "Invalid credentials. Please check your details.",
            };
        }


        // 4. Generate a six-digit OTP
        const otp = randomInt(100000, 1000000).toString();

        // 5. Hash the OTP before storing it
        const otpHashSecret = process.env.OTP_HASH_SECRET;

        if (!otpHashSecret) {
            throw new Error("OTP_HASH_SECRET is not configured.");
        }

        const tokenHash = createHmac("sha256", otpHashSecret)
            .update(otp)
            .digest("hex");

        // 6. Set OTP expiration (5 minutes)
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        // 7. Remove previous OTP challenges for this user
        await prisma.otpChallenge.deleteMany({
            where: {
                identifier: user.email,
            },
        });

        // 8. Store the new OTP challenge
        const challenge = await prisma.otpChallenge.create({
            data: {
                identifier: user.email,
                userId: user.id,
                tokenHash,
                attempts: 0,
                expiresAt,
            },
        });

        // 9. Send OTP to the user's registered email
        const { error } = await resend.emails.send({
            from: process.env.EMAIL_FROM!,
            to: [user.email],
            subject: "Your Aurelia verification code",
            text: `Your Aurelia verification code is ${otp}. It expires in 5 minutes.`,
        });

        if (error) {
            // Remove the challenge if email delivery fails
            await prisma.otpChallenge.deleteMany({
                where: {
                    id: challenge.id,
                },
            });

            throw new Error("Unable to send verification email.");
        }

        const cookieStore = await cookies();

        cookieStore.set("aurelia-pending-otp", challenge.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: expiresAt,
            path: "/",
        });

        // 10. Return success state
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

const MAX_OTP_ATTEMPTS = 5;

export async function verifyOtp(otp: string) {
    try {
        // Basic format validation
        if (!/^\d{6}$/.test(otp)) {
            return {
                success: false,
                message: "Please enter a valid six-digit verification code.",
            };
        }

        // Get the OTP challenge ID from the HTTP-only cookie
        const cookieStore = await cookies();

        const challengeId = cookieStore
            .get("aurelia-pending-otp")
            ?.value;

        if (!challengeId) {
            return {
                success: false,
                message: "Your verification session has expired. Please log in again.",
            };
        }

        // Find the challenge
        const challenge = await prisma.otpChallenge.findUnique({
            where: {
                id: challengeId,
            },
        });

        if (!challenge) {
            cookieStore.delete("aurelia-pending-otp");

            return {
                success: false,
                message: "Your verification session has expired. Please log in again.",
            };
        }

        // Check whether the OTP has expired
        if (challenge.expiresAt <= new Date()) {
            await prisma.otpChallenge.delete({
                where: {
                    id: challenge.id,
                },
            });

            cookieStore.delete("aurelia-pending-otp");

            return {
                success: false,
                message: "This verification code has expired. Please log in again.",
            };
        }

        // Check the attempt limit
        if (challenge.attempts >= MAX_OTP_ATTEMPTS) {
            await prisma.otpChallenge.delete({
                where: {
                    id: challenge.id,
                },
            });

            cookieStore.delete("aurelia-pending-otp");

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

        // Hash the submitted OTP using the same method as sendOtp
        const submittedHash = createHmac("sha256", secret)
            .update(otp)
            .digest();

        const storedHash = Buffer.from(
            challenge.tokenHash,
            "hex"
        );

        const isValid =
            storedHash.length === submittedHash.length &&
            timingSafeEqual(storedHash, submittedHash);

        // Handle an incorrect OTP
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

        // The OTP is valid. Consume it so it cannot be reused.
        await prisma.otpChallenge.delete({
            where: {
                id: challenge.id,
            },
        });

        // Remove the temporary OTP cookie.
        cookieStore.delete("aurelia-pending-otp");

        // challenge.identifier contains the user ID.
        const userId = challenge.userId;

        await createUserSession(userId);

        return {
            success: true,
            message: "Verification successful.",
            userId,
        };
    } catch (error) {
        console.error("verifyOtp error:", error);

        return {
            success: false,
            message: "Something went wrong. Please try again.",
        };
    }
}

export async function createUserSession(userId: string) {
    const sessionToken = randomBytes(32).toString("hex");

    const tokenHash = createHash("sha256")
        .update(sessionToken)
        .digest("hex");

    const expiresAt = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
    );

    await prisma.userSession.create({
        data: {
            userId,
            tokenHash,
            expiresAt,
        },
    });

    const cookieStore = await cookies();

    cookieStore.set("aurelia-session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: expiresAt,
        path: "/",
    });
}

export async function getPendingUser(): Promise<{email: string, status: boolean, attempts: number}> {
    const cookieStore = await cookies();

    const challengeId = cookieStore.get("aurelia-pending-otp")?.value;

    if (!challengeId) {
        return {
            status: false, email: '', attempts: 0
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

    if (!challenge) {
        cookieStore.delete("aurelia-pending-otp");
        return {
            status: false, email: '', attempts: 0
        };;
    }

    if (
        challenge.expiresAt <= new Date() ||
        challenge.attempts >= 5
    ) {
        cookieStore.delete("aurelia-pending-otp");
        return {
            status: false, email: '', attempts: 0
        };;
    }

    return {
        status: true,
        email: challenge.identifier,
        attempts: challenge.attempts
    };
}

