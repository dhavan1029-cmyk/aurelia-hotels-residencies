import { AccommodationDetailsPage } from "@/components/pages/hotel/AccommodationDetails"

interface AccommodationDetailsProps {
    params: Promise<{slug: string}>,
    searchParams: Promise<{
        checkInDate?: string,
        checkOutDate?: string,
        nightsCount?: string,
        guestsCount?: string,
    }>
}

async function getSearchParams(searchParams: Promise<{
    checkInDate?: string,
    checkOutDate?: string,
    nightsCount?: string,
    guestsCount?: string,
}>){
    const {checkInDate, checkOutDate, guestsCount, nightsCount} = await searchParams
    return {checkInDate, checkOutDate, guestsCount, nightsCount}
}

export default async function AccommodationDetails({params, searchParams} : AccommodationDetailsProps){
    // 'use cache'

    const { slug } = await params

    const {checkInDate, checkOutDate, guestsCount, nightsCount} = await getSearchParams(searchParams)

    return <AccommodationDetailsPage slug={slug} bookingParams={{checkInDate, checkOutDate, nightsCount: Number(nightsCount), guestsCount: Number(guestsCount)}}/>
}