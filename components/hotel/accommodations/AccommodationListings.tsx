import { prisma } from '@/lib/config/prisma';
import { SuiteCard } from '@/components/hotel/SuiteCard';
import { mapAccommodationCategoriesToSuiteCards } from '@/lib/hotel/mappers/accommodationsMapper';
import type { AccommodationBookingContext } from '@/lib/hotel/mappers/AccommodationDetailsMapper';
import { SearchParamsValues } from '@/components/pages/hotel/Accommdations';

interface PageProps {
    searchParams: SearchParamsValues | Promise<SearchParamsValues>;
}

function parseISODate(iso: string): Date {
    if (!iso || !iso.includes('-')) {
        return new Date();
    }
    const [year, month, day] = iso.split('-').map(Number);
    return new Date(year, month - 1, day);
}

function calculateNights(startIso: string, endIso: string): number {
    if (!startIso || !endIso) return 0;
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

export default async function AccommodationListings({ searchParams }: PageProps) {
    // 1. Resolve searchParams (supports both Promise & object inputs across Next.js 15/16)
    const resolvedParams =
        searchParams instanceof Promise ? await searchParams : searchParams || {};

    const {
        checkIn = '',
        checkOut = '',
        guests = '2',
        sanctuary: sanctuarySlug,
        sortBy = 'curated',
    } = resolvedParams;

    const guestsCount = Number(guests || 2);
    const nightsCount = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 5;

    // 2. Query Active Accommodation Categories from Prisma with optional category & destination filtering
    const accommodations = await prisma.accommodationCategory.findMany({
        where: {
            ...(sanctuarySlug
                ? {
                      sanctuary: {
                          slug: sanctuarySlug,
                      },
                  }
                : {}),
        },
        include: {
            sanctuary: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    currency: true,
                    code: true,
                },
            },
        },
        orderBy:
            sortBy === 'price-asc'
                ? { basePriceNightly: 'asc' }
                : sortBy === 'price-desc'
                ? { basePriceNightly: 'desc' }
                : sortBy === 'area-desc'
                ? { squareMeters: 'desc' }
                : { basePriceNightly: 'desc' },
    });

    // 3. Map Database Entities to UI ViewModels
    const { masterSuite, coastalSuites } = mapAccommodationCategoriesToSuiteCards(accommodations);

    // 4. Shared Booking Context Payload
    const commonBookingParams = {
        checkInDate: checkIn,
        checkOutDate: checkOut,
        nightsCount: nightsCount > 0 ? nightsCount : 5,
        guestsCount,
    };

    // 5. Empty State Fallback
    if (!masterSuite && (!coastalSuites || coastalSuites.length === 0)) {
        return (
            <div className="max-w-7xl mx-auto py-16 px-4 text-center">
                <div className="p-12 border border-[#e8e4dc] bg-[#fbf9f4] rounded-2xl shadow-xs">
                    <span className="text-[10px] font-mono tracking-widest text-[#8e763b] uppercase block mb-3">
                        ✦ SANCTUARY CATALOG CALIBRATION
                    </span>
                    <h3 className="font-serif text-2xl text-[#1f1e1d] font-normal mb-2">
                        No Sanctuaries Currently Available
                    </h3>
                    <p className="text-xs text-[#78756d] font-sans max-w-md mx-auto">
                        Please adjust your stay dates, sanctuary enclave, or party composition to view reserved estates and suites.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 px-4 sm:px-6 lg:px-8">
            {/* Master Featured Suite Card */}
            {masterSuite && (
                <SuiteCard
                    {...masterSuite}
                    variant="master-featured"
                    bookingParams={{
                        ...commonBookingParams,
                        accommodationId: masterSuite.id,
                        suiteSlug: masterSuite.slug,
                        suiteName: masterSuite.name,
                        sanctuaryId: masterSuite.sanctuaryId,
                        currency: masterSuite.currency,
                        sanctuaryName: masterSuite.sanctuaryName,
                        sanctuarySlug: masterSuite.sanctuarySlug,
                        baseRateNightly: masterSuite.pricePerNight,
                    }}
                />
            )}

            {/* Coastal & Garden Enclave Grid */}
            {coastalSuites && coastalSuites.length > 0 && (
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#eeeae2] pb-4">
                        <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e763b]">
                            ADDITIONAL RESONANCES • CLIFFSIDE &amp; GARDEN ESTATES
                        </span>

                        <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-[#8e8a82]">
                            ALL SANCTUARIES INCLUDE PRIVATE BREAKFAST &amp; VALET SERVICE
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                        {coastalSuites.map(function (suite) {
                            return (
                                <SuiteCard
                                    key={suite.id}
                                    {...suite}
                                    variant="coastal-grid"
                                    bookingParams={{
                                        ...commonBookingParams,
                                        accommodationId: suite.id,
                                        suiteSlug: suite.slug,
                                        suiteName: suite.name,
                                        sanctuaryId: suite.sanctuaryId,
                                        currency: suite.currency,
                                        sanctuaryName: suite.sanctuaryName,
                                        sanctuarySlug: suite.sanctuarySlug,
                                        baseRateNightly: suite.pricePerNight,
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

