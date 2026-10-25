import { prisma } from '@/lib/prisma';
import { SuiteCard } from '@/components/hotel/SuiteCard';
import {
    mapAccommodationCategoriesToSuiteCards,
} from '@/lib/hotel/mappers/accommodationsMapper';

export default async function AccommodationListings() {
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

    return (
        <div className="max-w-340 mx-auto space-y-12 sm:space-y-16">
            <SuiteCard
                {...masterSuite}
                variant="master-featured"
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
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}