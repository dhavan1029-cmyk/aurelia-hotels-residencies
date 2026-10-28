
import { Footer } from '@/components/layout/Footer';

// Phase 1: Header & Residential Protocol Strip
import { CheckoutHeader } from '@/components/hotel/checkout/Header';

// Phase 2, 3 and 4
import { CheckoutInteractive } from '@/components/hotel/checkout/CheckoutInteractive';

import { AccommodationBookingContext } from '@/lib/hotel/mappers/AccommodationDetailsMapper'; 

interface PageProps {
    bookingParams: AccommodationBookingContext
}

export function CheckoutPage({ bookingParams } : PageProps) {
    
    return (
        <div className={`min-h-screen bg-[#fcf9f4] text-[#1f1e1d] flex flex-col font-sans selection:bg-[#8e763b]/20 selection:text-[#1f1e1d]`}>
            {/* Phase 1: Header, Brand Wordmark, Stepper & Verification Bar */}
            <CheckoutHeader/>

            {/* Main Checkout Workspace: Left 8 Columns (Phases 2 & 3) + Right 4 Columns (Phase 4 Sticky Rail) */}
            <main className="max-w-340 mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-12 w-full flex-1">
                <CheckoutInteractive />
            </main>

            {/* Global Sanctuary Footer */}
            <Footer />
        </div>
    );
}

export default CheckoutPage;