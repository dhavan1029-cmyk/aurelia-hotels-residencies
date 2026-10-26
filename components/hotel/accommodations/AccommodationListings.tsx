import { prisma } from '@/lib/prisma';
import { SuiteCard } from '@/components/hotel/SuiteCard';
import {
    mapAccommodationCategoriesToSuiteCards,
} from '@/lib/hotel/mappers/accommodationsMapper';
import { SearchParamsValues } from '@/components/pages/hotel/Accommdations';

interface PageProps {
    searchParams: SearchParamsValues
}

function parseISODate(iso: string): Date {
    const [year, month, day] = iso.split('-').map(Number);
    return new Date(year, month - 1, day);
}

function calculateNights(startIso: string, endIso: string): number {
    const start = parseISODate(startIso);
    const end = parseISODate(endIso);
    const diffTime = end.getTime() - start.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

export default async function AccommodationListings({searchParams} : PageProps) {
    const accommodations =
        await prisma.accommodationCategory.findMany({
            orderBy: {
                basePriceNightly: 'desc',
            },
        });

    const {
        masterSuite,
        coastalSuites,
    } = mapAccommodationCategoriesToSuiteCards(
        accommodations,
        'azure-master-ocean-suite',
    );

    const {checkIn, checkOut, guests} = searchParams

    const nightsCount = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0

    return (
        <div className="max-w-340 mx-auto space-y-12 sm:space-y-16">
            <SuiteCard
                {...masterSuite}
                variant="master-featured"
                bookingParams={{
                    checkInDate: checkIn, checkOutDate: checkOut, nightsCount, guestsCount: Number(guests)
                }}
            />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e763b]">
                        ADDITIONAL RESONANCES • CLIFFSIDE & GARDEN ESTATES
                    </span>

                    <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-[#8e8a82]">
                        ALL SANCTUARIES INCLUDE PRIVATE BREAKFAST & VALET SERVICE
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    {coastalSuites.map((suite) => (
                        <SuiteCard
                            key={suite.id}
                            {...suite}
                            variant="coastal-grid"
                            bookingParams={{
                                checkInDate: checkIn, checkOutDate: checkOut, nightsCount, guestsCount: Number(guests)
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}