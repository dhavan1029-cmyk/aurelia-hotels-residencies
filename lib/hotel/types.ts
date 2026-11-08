// import { Prisma } from '@/app/generated/prisma/client';
import type { Prisma } from "@/app/generated/prisma/browser";
import { PatronDossierInfo } from '@/components/hotel/profile/ProfileDossierHeader';
import { ProfileLogisticsData } from '@/components/hotel/profile/ProfileLogisticsRail';
import { ProfileOlfactorySectionData } from '@/components/hotel/profile/ProfileOlfactorySection';
import { ProfileSleepAndEpicureanData } from '@/components/hotel/profile/ProfileSleepAndEpicureanSection';


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

export type ProfileDatabaseRecord = Prisma.GuestProfileGetPayload<{
    include: {
        user: {
            select: {
                id: true;
                title: true;
                firstName: true;
                lastName: true;
                avatarUrl: true;
            };
        };
    };
}>;

export interface ProfileMapperResult {
    dossier: PatronDossierInfo;
    logistics: ProfileLogisticsData;
    olfactory: ProfileOlfactorySectionData;
    sleep: ProfileSleepAndEpicureanData;
}

export type PillowType = 
    | 'ORGANIC_GOOSE_DOWN' 
    | 'BUCKWHEAT' 
    | 'SILK_LATEX' 
    | 'HYPOALLERGENIC_MEMORY';

export type AromaBlend = 
    | 'AMALFI_NEROLI_BERGAMOT' 
    | 'TUSCAN_CYPRESS_CEDAR' 
    | 'ALPINE_JUNIPER' 
    | 'UNSCENTED';

export type TurndownTea = 
    | 'WILD_CHAMOMILE' 
    | 'LEMON_VERBENA' 
    | 'PEPPERMINT' 
    | 'NONE';

export type SoakingSalts = 
    | 'SICILIAN_SEA_SALT_LAVENDER' 
    | 'VOLCANIC_SULFUR_MINERAL' 
    | 'UNSCENTED_EPSOM';
