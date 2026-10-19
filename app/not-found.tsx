import React from 'react';
import { NotFoundPage } from '@/components/pages/hotel/NotFoundPage';

export const metadata = {
    title: 'A Moment of Unintended Stillness • 404 | Aurelia Hotels & Residences',
    description:
        'The sanctuary or docket you seek has receded into unmapped waters, or is undergoing architectural calibration for the upcoming season. Allow our concierge to escort you back to active grounds.',
};

export default function NotFound() {
    return <NotFoundPage />;
}