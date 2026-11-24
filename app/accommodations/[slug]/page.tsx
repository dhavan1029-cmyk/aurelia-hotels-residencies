import { notFound } from 'next/navigation';
import { AccommodationDetailsPage } from '@/components/pages/hotel/AccommodationDetails';
import type { AccommodationBookingContext } from '@/lib/hotel/mappers/AccommodationDetailsMapper';

export interface AccommodationDetailsPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{
        checkIn?: string;
        checkInDate?: string;
        checkOut?: string;
        checkOutDate?: string;
        nights?: string;
        nightsCount?: string;
        guests?: string;
        guestsCount?: string;
        adults?: string;
    }>;
}

function parseISODate(iso: string): Date {
    const [year, month, day] = iso.split('-').map(Number);
    return new Date(year, month - 1, day);
}

function calculateNights(startIso: string, endIso: string): number {
    if (!startIso || !endIso || !startIso.includes('-') || !endIso.includes('-')) {
        return 0;
    }
    try {
        const start = parseISODate(startIso);
        const end = parseISODate(endIso);
        const diffTime = end.getTime() - start.getTime();
        const nights = Math.round(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(1, nights);
    } catch {
        return 0;
    }
}

async function resolveBookingParams(
    rawSearchParams: Promise<{
        checkIn?: string;
        checkInDate?: string;
        checkOut?: string;
        checkOutDate?: string;
        nights?: string;
        nightsCount?: string;
        guestsCount?: string;
        adults?: string;
    }>
 ) {
    const resolved = await rawSearchParams;

    // Gracefully normalize either naming convention across Aurelia components
    const checkInDate = resolved.checkInDate ||  '';
    const checkOutDate = resolved.checkOutDate ||  '';

    // Determine patron party size (defaulting to 2)
    const rawGuests = resolved.guestsCount || resolved.adults;
    const guestsCount = rawGuests && !isNaN(Number(rawGuests)) ? Math.max(1, Number(rawGuests)) : 2;

    // Determine nights: compute from ISO dates if available, fallback to query param or default 5 nights
    let nightsCount = 5;
    if (checkInDate && checkOutDate) {
        const computed = calculateNights(checkInDate, checkOutDate);
        if (computed > 0) {
            nightsCount = computed;
        }
    } else {
        const rawNights = resolved.nightsCount;
        if (rawNights && !isNaN(Number(rawNights))) {
            nightsCount = Math.max(1, Number(rawNights));
        }
    }

    return {
        checkInDate: checkInDate || undefined,
        checkOutDate: checkOutDate || undefined,
        nightsCount,
        guestsCount,
    };
}

export default async function AccommodationDetails({
    params,
    searchParams,
}: AccommodationDetailsPageProps) {
    const { slug } = await params;

    if (!slug) {
        notFound();
    }

    const bookingParams = await resolveBookingParams(searchParams);

    return (
        <AccommodationDetailsPage
            slug={slug}
            bookingParams={bookingParams}
        />
    );
}
