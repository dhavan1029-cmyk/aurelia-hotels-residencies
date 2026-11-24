import type { AccommodationBookingContext } from '@/lib/hotel/mappers/AccommodationDetailsMapper';
import type { ConfirmReservationPayload, ConfirmReservationResult } from '@/lib/hotel/actions/checkout';
import CheckoutHeader, { checkoutHeaderDefaultData } from '@/components/hotel/checkout/Header';
import CheckoutInteractive, { CheckoutInteractiveInitialData } from '@/components/hotel/checkout/CheckoutInteractive';
import { Footer } from '@/components/layout/Footer';

export interface CheckoutPageProps {
    bookingParams?: AccommodationBookingContext;
    initialData?: CheckoutInteractiveInitialData;
    /** Server action bound from the Next.js Server Component */
    onConfirmReservation?: (payload: ConfirmReservationPayload) => Promise<ConfirmReservationResult>;
}

export function CheckoutPage({
    bookingParams,
    initialData,
    onConfirmReservation,
}: CheckoutPageProps) {
    const currencySymbol =
        initialData?.stayDetails?.currencySymbol ||
        bookingParams?.currencySymbol 

    const currencyCode =
        bookingParams?.currency 


    return (
        <div className="min-h-screen bg-[#fcf9f4] text-[#1f1e1d] flex flex-col font-sans selection:bg-[#8e763b]/20 selection:text-[#1f1e1d]">

            {/* Main Checkout Workspace: Left Columns (Phases 2 & 3) + Right Column (Phase 4 Sticky Rail) */}
            <main className="w-full flex-1">
                <CheckoutInteractive
                    initialData={initialData}
                    onConfirmReservation={onConfirmReservation}
                    showHeader={false}
                />
            </main>

            {/* Global Sanctuary Footer */}
            <Footer />
        </div>
    );
}

export default CheckoutPage;
