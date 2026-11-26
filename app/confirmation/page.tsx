import { connection } from "next/server";
import { prisma } from '@/lib/config/prisma';
import { ConfirmationPage } from '@/components/pages/hotel/ConfirmationPage';
import {
    mapBookingToConfirmationHero,
    mapBookingToSovereignVoucher,
    mapBookingToArrivalCalibration,
    mapBookingToArrivalCoordinates,
    DbBookingPayload,
} from '@/lib/hotel/mappers/confirmationMapper';

// ============================================================================
// PAGE PROPS CONTRACT
// ============================================================================

export interface ConfirmationRouteProps {
    searchParams: Promise<{
        bookingRef?: string;
    }>;
}

// ============================================================================
// SERVER PAGE COMPONENT IMPLEMENTATION
// ============================================================================

export default async function Page({ searchParams }: ConfirmationRouteProps) {

    await connection(); // Ensure the database connection is established before proceeding

    const params = await searchParams;
    const bookingRef = params.bookingRef;

    let dbBooking: DbBookingPayload | null = null;

    // 1. Primary Lookup: Retrieve specific booking by reference
    if (bookingRef) {
        try {
            const rawBooking = await prisma.booking.findFirst({
                where: {
                    bookingReference: bookingRef,
                },
                include: {
                    roomUnit: true,
                    accommodationCategory: {
                        include: {
                            sanctuary: true,
                        },
                    },
                    user: {
                        include: {
                            primaryMajordomo: true,
                        },
                    },
                    lineItems: true,
                },
            });

            if (rawBooking) {
                dbBooking = rawBooking;
            }
        } catch (err) {
            console.error('[Aurelia] Failed to retrieve booking docket:', err);
        }
    }

    // 2. Fallback Lookup: If no ref provided or lookup missed, fetch the most recent docket
    if (!dbBooking) {
        try {
            const latestBooking = await prisma.booking.findFirst({
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    roomUnit: true,
                    accommodation: {
                        include: {
                            sanctuary: true,
                        },
                    },
                    user: {
                        include: {
                            primaryMajordomo: true,
                        },
                    },
                    lineItems: true,
                },
            });

            if (latestBooking) {
                dbBooking = latestBooking;
            }
        } catch (err) {
            console.warn('[Aurelia] Fallback preview booking not available:', err);
        }
    }

    // 3. Transform Database Payload into Pure Dynamic ViewModels
    const heroData = dbBooking
        ? mapBookingToConfirmationHero(dbBooking)
        : undefined;

    const voucherData = dbBooking
        ? mapBookingToSovereignVoucher(dbBooking)
        : undefined;

    const calibrationData = dbBooking
        ? mapBookingToArrivalCalibration(dbBooking)
        : undefined;

    const coordinatesData = dbBooking
        ? mapBookingToArrivalCoordinates(dbBooking)
        : undefined;

    return (
        <ConfirmationPage
            heroData={heroData}
            voucherData={voucherData}
            calibrationData={calibrationData}
            coordinatesData={coordinatesData}
        />
    );
}

