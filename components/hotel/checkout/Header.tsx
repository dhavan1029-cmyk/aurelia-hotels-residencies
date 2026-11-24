import Link from 'next/link';
import Image from 'next/image';
import { CurrencyCode, getCurrencySymbol } from '@/lib/data/currencyCatalog';

export type CheckoutStepId = 'guest-details' | 'bespoke-addons' | 'payment-guarantee';

export interface CheckoutStepItem {
    id: CheckoutStepId;
    stepNumber: string;
    label: string;
    isCompleted?: boolean;
    isActive?: boolean;
}

export interface CheckoutHeaderUser {
    fullName: string;
    tierLabel: string;
    avatarUrl?: string;
}

export interface CheckoutHeaderData {
    currencySymbol?: string;
    currencyCode?: CurrencyCode | string;
    conciergePhone?: string;
    sanctuaryFolioCode?: string;
    currentUser?: CheckoutHeaderUser;
    steps?: CheckoutStepItem[];
}

export const checkoutHeaderDefaultSteps: CheckoutStepItem[] = [
    {
        id: 'guest-details',
        stepNumber: '01',
        label: 'Patron Identity & Logistics',
        isCompleted: false,
        isActive: true,
    },
    {
        id: 'bespoke-addons',
        stepNumber: '02',
        label: 'Comfort & Curated Encounters',
        isCompleted: false,
        isActive: false,
    },
    {
        id: 'payment-guarantee',
        stepNumber: '03',
        label: 'Sovereign Folio Guarantee',
        isCompleted: false,
        isActive: false,
    },
];

export const checkoutHeaderDefaultData: CheckoutHeaderData = {
    currencySymbol: '€',
    currencyCode: 'EUR',
    conciergePhone: '+39 089 875 111',
    sanctuaryFolioCode: 'AUR-SVR-FOLIO',
    steps: checkoutHeaderDefaultSteps,
};

export interface CheckoutHeaderProps {
    data?: CheckoutHeaderData;
    activeStepId?: CheckoutStepId;
    onStepClick?: (stepId: CheckoutStepId) => void;
    className?: string;
}

export function CheckoutHeader({
    data = checkoutHeaderDefaultData,
    activeStepId = 'guest-details',
    onStepClick,
    className = '',
}: CheckoutHeaderProps) {
    const currencyCode = data.currencyCode || 'EUR';
    const currencySymbol = data.currencySymbol || getCurrencySymbol(currencyCode);
    const steps = data.steps || checkoutHeaderDefaultSteps;

return (
    <header
        aria-label="Checkout Header & Sovereign Progress"
        className={`w-full bg-[#1f1e1d] text-[#fcf9f4] border-b border-[#343230] ${className}`}
    >
        {/* Top Sovereign Institutional Bar */}
        <div className="border-b border-[#2d2b29] px-4 sm:px-8 lg:px-12 py-2.5 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#a4a098] uppercase">
            <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-[#bfa76f]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bfa76f] animate-pulse" />
                    ENCRYPTED SANCTUARY FOLIO
                </span>
                <span className="hidden sm:inline text-[#4a4744]">|</span>
                <span className="hidden sm:inline">SWISS FADP &amp; DIPLOMATIC ATTESTATION</span>
            </div>

            <div className="flex items-center gap-4">
                <span className="hidden md:inline">
                    CURRENCY: <strong className="text-[#fcf9f4] font-medium">{currencyCode} ({currencySymbol})</strong>
                </span>
                <span className="text-[#4a4744] hidden md:inline">|</span>
                <a
                    href={`tel:${data.conciergePhone?.replace(/\s+/g, '') || '+39089875111'}`}
                    className="hover:text-[#bfa76f] transition-colors"
                >
                    HEAD MAJORDOMO DESK: <span className="text-[#fcf9f4] underline underline-offset-2">{data.conciergePhone || '+39 089 875 111'}</span>
                </a>
            </div>
        </div>

        {/* Main Brand & Wayfinding Masthead */}
        <div className="max-w-340 mx-auto px-4 sm:px-8 lg:px-12 py-0 sm:py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Brand Identity Wordmark */}
            <div className="space-y-1">
                <Link href="/" className="inline-block group">
                    <Image
                        src="/aurelia-logo-dark.png"
                        alt="Aurelia Hotels & Residencies"
                        width={300}
                        height={40}
                    />
                </Link>
            </div>

            {/* Stepper Navigation */}
            <nav aria-label="Checkout Progress Steps" className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 md:pb-0">
                {steps.map(function (step, index) {
                    const isActive = step.id === activeStepId;
                    const isPast = steps.findIndex(function (s) { return s.id === activeStepId; }) > index;

                    return (
                        <button
                            key={step.id}
                            type="button"
                            onClick={function () {
                                if (onStepClick) onStepClick(step.id);
                            }}
                            disabled={!onStepClick}
                            className={`flex items-center gap-2.5 px-3 py-1.5 transition-all text-left group ${
                                isActive
                                    ? 'bg-[#2a2826] border border-[#bfa76f]/50'
                                    : 'hover:bg-[#252321] border border-transparent'
                            }`}
                        >
                            <span
                                className={`w-5 h-5 flex items-center justify-center font-mono text-[10px] ${
                                    isPast
                                        ? 'bg-[#bfa76f] text-[#1f1e1d] font-bold'
                                        : isActive
                                        ? 'bg-transparent border border-[#bfa76f] text-[#bfa76f]'
                                        : 'border border-[#4a4744] text-[#78756d]'
                                }`}
                            >
                                {isPast ? '✓' : step.stepNumber}
                            </span>
                            <span
                                className={`text-[11px] font-sans uppercase tracking-wider whitespace-nowrap ${
                                    isActive
                                        ? 'text-[#fcf9f4] font-medium'
                                        : 'text-[#8e8a82] group-hover:text-[#fcf9f4]'
                                }`}
                            >
                                {step.label}
                            </span>
                        </button>
                    );
                })}
            </nav>
        </div>
    </header>
);

}

export default CheckoutHeader;