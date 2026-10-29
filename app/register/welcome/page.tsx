import InscriptionWelcomePage from '@/components/pages/hotel/WelcomePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sovereign Folio Inscription Welcome | Aurelia Hotels & Residences',
    description:
        'Confidential patron dossier ratification and biometric key pass issuance for Sovereign Patrons of Aurelia Private Estates.',
};

export default function Page(){
    return <InscriptionWelcomePage></InscriptionWelcomePage>
}