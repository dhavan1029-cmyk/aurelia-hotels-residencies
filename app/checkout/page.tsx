import { CheckoutPage } from '@/components/pages/hotel/CheckoutPage';

export const metadata = {
    title: 'Bespoke Guest Checkout & Sovereign Reservation | Aurelia Hotels & Residences',
    description:
        'Complete encrypted sanctuary reservation, diplomatic harbor arrival coordination, and bespoke comfort calibrations for Room 402 — Azure Master Ocean Suite.',
};



export default function Page() {
    return (
        <CheckoutPage bookingParams={{}} />
    );
}