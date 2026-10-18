import React from 'react';
import { AuthLoginPage } from '@/components/pages/hotel/AuthLoginPage';

export const metadata = {
    title: 'Patron Portal & Sovereign Access | Aurelia Hotels & Residences',
    description:
        'A private digital vestibule for verified patrons of Aurelia. Access your bespoke arrival coordinates, sensory suite staging calibrations, and confidential cellar allocations across all global enclaves.',
};

export default function Page() {
    return <AuthLoginPage />;
}