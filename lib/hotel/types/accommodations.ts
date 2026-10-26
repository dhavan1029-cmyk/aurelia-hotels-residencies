import { Prisma } from '@/app/generated/prisma/client';


import type {
    AccommodationGalleryData,
    AccommodationNarrativeAndFloorplanData,
} from '@/components/hotel/types/accommodations';

import type {
    PrivilegesAndPoliciesData,
} from '@/components/hotel/types/accommodations';

import type {
    AccommodationRateBreakdown,
} from '@/components/hotel/types/accommodations';

export interface AccommodationDetailsData {
    id: string;
    slug: string;
    name: string;
    tagline: string;

    gallery: AccommodationGalleryData;

    narrativeAndFloorplan: AccommodationNarrativeAndFloorplanData;

    privilegesAndPolicies: PrivilegesAndPoliciesData;

    rateBreakdown: AccommodationRateBreakdown;
}


export type JsonObject = Record<string, unknown>;

export type RoomUnitWithAccommodation = Prisma.RoomUnitGetPayload<{
    include: {
        accommodationCategory: true;
    };
}>;
