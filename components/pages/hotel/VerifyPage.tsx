import { VerificationEditorialHero } from '@/components/hotel/auth/verify/VerificationEditorialHero';
import { VerificationFooter } from '@/components/hotel/auth/verify/VerificationFooter';
import { VerificationFormSection } from '@/components/hotel/auth/verify/VerificationFormSection';
import { verificationDefaultData, VerificationHeader, VerificationPageData } from '@/components/hotel/auth/verify/VerificationHeader';

export interface VerifyPageProps {
    data?: VerificationPageData;
}

export default function VerifyPage({
    data = verificationDefaultData,
}: VerifyPageProps) {
    const { topBar, editorialHero, verificationForm, footer } = data;

    return (
        <main className="min-h-screen w-full bg-[#fcf9f4] text-[#1f1e1d] flex flex-col justify-between font-sans selection:bg-[#8e763b]/20 selection:text-[#1f1e1d]">
            {/* 1. TOP PROTOCOL & TELEMETRY HEADER (Server Component) */}
            <VerificationHeader data={topBar} />

            {/* 2. MAIN SPLIT EDITORIAL & AUTHENTICATION WORKSPACE */}
            <div className="max-w-360 mx-auto w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-14 flex-1 flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                    {/* LEFT COLUMN: Photographic Monograph & Protocol Card (5 cols - Pure Server Component) */}
                    <div className="lg:col-span-5 h-full">
                        <VerificationEditorialHero data={editorialHero} />
                    </div>

                    {/* RIGHT COLUMN: Two-Step Verification Form Container (7 cols - Coordinates minimal Leaf Client Components) */}
                    <div className="lg:col-span-7 flex justify-center lg:justify-end">
                        <VerificationFormSection data={verificationForm} />
                    </div>
                </div>
            </div>

            {/* 3. SWISS BANKING PRIVACY & FOOTER DISCLOSURES (Server Component) */}
            <VerificationFooter data={footer} />
        </main>
    );
}