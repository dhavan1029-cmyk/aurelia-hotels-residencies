import Link from 'next/link';
import { VerificationPageData } from './VerificationHeader';
import { VerificationForm } from './VerificationForm';
import { redirect } from 'next/navigation';
import { getPendingUser } from '@/lib/hotel/actions/auth';

export interface VerificationFormSectionProps {
    data: VerificationPageData['verificationForm'];
    className?: string;
}

export function maskEmail(email: string): string {
    const [localPart, domain] = email.trim().split('@');

    if (!localPart || !domain) {
        return email;
    }

    const visibleCharacters = localPart.length <= 2 ? 1 : 2;
    const maskedLocalPart =
        localPart.slice(0, visibleCharacters) +
        '*'.repeat(Math.max(localPart.length - visibleCharacters, 1));

    return `${maskedLocalPart}@${domain}`;
}

export async function VerificationFormSection({
    data,
    className = '',
}: VerificationFormSectionProps) {

    const {
        phaseEyebrow,
        title,
        descriptionPrefix,
        returnLinkText,
        returnLinkHref,
        lostKeyText,
        lostKeyHref,
        compliancePills,
    } = data;

    const { email, attempts } = await getPendingUser()
    
    const maskedEmail = maskEmail(email)

    return (
        <section
            aria-label="Two-Step Verification Form"
            className={`w-full max-w-xl flex flex-col justify-between space-y-7 ${className}`}
        >
            {/* 1. Master Editorial Heading */}
            <div className="space-y-3">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.24em] text-[#8e763b] block">
                    {phaseEyebrow}
                </span>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#1f1e1d] tracking-tight leading-[1.12]">
                    {title}
                </h1>

                <p className="text-xs sm:text-[13px] text-[#55524d] font-sans font-light leading-relaxed max-w-lg">
                    {descriptionPrefix}{' '}
                    <strong className="font-mono text-[#1f1e1d] font-semibold">
                        {maskedEmail}
                    </strong>{' '}
                    {/* and terminal mobile{' '}
                    <strong className="font-mono text-[#1f1e1d] font-semibold">
                        {maskedMobile}
                    </strong> */}
                </p>
            </div>

            {/* 2. Form With Leaf Client Inputs */}
            <VerificationForm data={data} attempts={attempts} />

            {/* 3. Navigation Recovery & Return Links */}
            <div className="flex items-center justify-between text-xs font-sans text-[#78756d] pt-2 border-t border-[#eeeae2]">
                <Link
                    href={returnLinkHref}
                    className="inline-flex items-center gap-1 text-[#1f1e1d] hover:text-[#8e763b] transition-colors uppercase tracking-[0.16em] text-[11px] font-semibold"
                >
                    <span>←</span>
                    <span>{returnLinkText}</span>
                </Link>

                <Link
                    href={lostKeyHref}
                    className="text-[#8e763b] hover:text-[#1f1e1d] transition-colors underline text-[11px]"
                >
                    {lostKeyText}
                </Link>
            </div>

            {/* 4. Compliance & FINMA Clearance Pills */}
            <div className="bg-[#f6f2ea] border border-[#ded9ce] rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px] font-mono text-[#6e6b64]">
                <div className="flex items-center gap-2">
                    <svg
                        className="w-3.5 h-3.5 text-[#8e763b] shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                        />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>

                    <span>{compliancePills[0].label}</span>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto text-[#1f1e1d]">
                    <span className="font-semibold">
                        {compliancePills[0].value}
                    </span>

                    <span className="text-[#ded9ce]">•</span>

                    <span>FINMA {compliancePills[1].value}</span>
                </div>
            </div>
        </section>
    );
}
