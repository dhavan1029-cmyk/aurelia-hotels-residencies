import { Metadata } from 'next';
import VerifyPage from '@/components/pages/hotel/VerifyPage';

export const metadata: Metadata = {
    title: 'Sovereign Verification & Passkey Challenge | Aurelia Hotels & Residences',
    description:
        'Cryptographic hardware attestation and two-step verification vestibule for authenticated sovereign patrons of Aurelia Private Estates.',
};

export default function Page(){
    return <VerifyPage />
}