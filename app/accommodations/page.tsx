import Accommodations from '@/components/pages/hotel/Accommdations';

interface PageProps {
    searchParams: Promise<{
        sanctuary?: string;
        checkIn?: string;
        checkOut?: string;
        guests?: string;
        suites?: string;
        sortBy?: string;
        category?: string;
    }>;
}

export default function Page({
    searchParams,
}: PageProps) {
    return (
        <Accommodations searchParams={searchParams} />
    );
}