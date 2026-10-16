import { CheckoutPage } from '@/components/pages/hotel/CheckoutPage';
import { checkoutHeaderDefaultData } from '@/components/hotel/checkout/Header';
import { checkoutPatronDefaultData } from '@/components/hotel/checkout/PatronAndLogistics';
import { checkoutComfortAndAddOnsDefaultData } from '@/components/hotel/checkout/ComfortAndAddOns';
import { checkoutFolioDefaultData } from '@/components/hotel/checkout/CheckoutFolioRail';

export const metadata = {
    title: 'Bespoke Guest Checkout & Sovereign Reservation | Aurelia Hotels & Residences',
    description:
        'Complete encrypted sanctuary reservation, diplomatic harbor arrival coordination, and bespoke comfort calibrations for Room 402 — Azure Master Ocean Suite.',
};

export default function Page() {
    return (
        <CheckoutPage
            headerData={checkoutHeaderDefaultData}
            patronData={checkoutPatronDefaultData}
            comfortData={checkoutComfortAndAddOnsDefaultData}
            folioData={checkoutFolioDefaultData}
        />
    );
}