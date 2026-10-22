import Image from 'next/image';

export type CheckoutStepId = 'guest-details' | 'bespoke-addons' | 'payment-guarantee';

export interface CheckoutStepItem {
    id: CheckoutStepId;
    stepNumber: string; // e.g. "01"
    label: string;      // e.g. "Guest Details"
    isCompleted: boolean;
    isActive: boolean;
}

export interface CheckoutHeaderData {
    brandName: string;
    brandSub: string;
    securityBadgeText: string;
    currencySymbol: string;
    currencyCode: string;
    conciergePhone: string;
    conciergeLabel: string;
    currentUser: {
        avatarUrl?: string;
        fullName: string;
        tierLabel: string;
    };
    bookingRef: string;
    sanctuaryFolioCode: string;
    assuranceLeft: string;
    assuranceRight: string;
    steps: CheckoutStepItem[];
}

export const checkoutHeaderDefaultData: CheckoutHeaderData = {
    brandName: 'Aurelia',
    brandSub: 'HOTELS & RESIDENCES',
    securityBadgeText: 'GUARANTEED SECURE BOOKING',
    currencySymbol: '€',
    currencyCode: 'EUR',
    conciergePhone: '+39 089 875 000',
    conciergeLabel: 'PRIVATE CONCIERGE',
    currentUser: {
        avatarUrl: '/limestone-villa.png',
        fullName: 'Lord Julian Vane-Tempest',
        tierLabel: 'SOVEREIGN KEY MEMBER',
    },
    bookingRef: 'AUR-8829-CAP',
    sanctuaryFolioCode: 'AURELIA SANCTUARY FOLIO REF: AUR-8829-CAP',
    assuranceLeft: 'GUARANTEED DIRECT RATE',
    assuranceRight: '256-BIT SECURE RESERVATION',
    steps: [
        {
            id: 'guest-details',
            stepNumber: '01',
            label: 'Guest Details',
            isCompleted: false,
            isActive: true,
        },
        {
            id: 'bespoke-addons',
            stepNumber: '02',
            label: 'Bespoke Add-Ons',
            isCompleted: false,
            isActive: false,
        },
        {
            id: 'payment-guarantee',
            stepNumber: '03',
            label: 'Payment & Guarantee',
            isCompleted: false,
            isActive: false,
        },
    ],
};

export interface CheckoutHeaderProps {
    data?: CheckoutHeaderData;
    activeStepId?: CheckoutStepId;
    onStepClick?: (stepId: CheckoutStepId) => void;
    onConciergeCall?: () => void;
    onCurrencyChange?: (curr: string) => void;
    className?: string;
}

export function CheckoutHeader({
    data = checkoutHeaderDefaultData,
    onConciergeCall,
    onCurrencyChange,
    className = '',
}: CheckoutHeaderProps) {
    const {
        brandName,
        brandSub,
        securityBadgeText,
        currencySymbol,
        currencyCode,
        conciergePhone,
        conciergeLabel,
        currentUser,
        sanctuaryFolioCode,
        assuranceLeft,
        assuranceRight,
        steps,
    } = data;

    return (
        <header className={`w-full bg-[#fcf9f4] border-b border-[#e8e4dc] ${className}`}>
            {/* 1. Main Navigation & Protocol Header Bar */}
            <div className="max-w-340 mx-auto px-4 sm:px-8 lg:px-12 h-20 sm:h-22 flex items-center justify-between gap-4">
                {/* Left: Brand Monogram Wordmark & Secure Booking Indicator */}
                <div className="flex items-center gap-4 sm:gap-6">
                    <div className="hidden sm:inline-flex items-center gap-2 pl-4 border-l border-[#e8e4dc]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b] animate-pulse" />
                        <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.24em] text-[#78756d]">
                            {securityBadgeText}
                        </span>
                    </div>
                </div>

                {/* Right: Currency Selector, Private Concierge Trigger & Patron Avatar */}
                <div className="flex items-center gap-3 sm:gap-5">
                    {/* Currency Selector Pill */}
                    <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#ded9ce] text-[10px] font-sans font-medium text-[#1f1e1d]">
                        <span>{currencySymbol}</span>
                        <span>{currencyCode}</span>
                    </div>

                    {/* Private Concierge Hotline */}
                    <a
                        href={`tel:${conciergePhone.replace(/\s+/g, '')}`}
                        onClick={onConciergeCall}
                        className="hidden lg:inline-flex items-center gap-2 text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b] hover:text-[#1f1e1d] transition-colors py-1"
                    >
                        <svg
                            className="w-3.5 h-3.5 text-[#8e763b]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span>{conciergeLabel}</span>
                    </a>

                    {/* Patron Profile Monogram / Avatar */}
                    <div className="flex items-center gap-2 pl-2">
                        {currentUser.avatarUrl ? (
                            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#eeeae2] border border-[#dcdad5]">
                                <Image
                                    src={currentUser.avatarUrl}
                                    alt={currentUser.fullName}
                                    fill
                                    sizes="32px"
                                    className="object-cover object-center"
                                />
                            </div>
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-[#1f1e1d] text-white flex items-center justify-center font-serif text-xs font-semibold">
                                JV
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 2. Secondary Verification Sub-bar (Folio Ref & Guarantee Claims) */}
            <div className="w-full bg-[#f6f2ea] border-t border-[#ded9ce] py-2 px-4 sm:px-8 lg:px-12 text-[9px] sm:text-[10px] font-sans tracking-[0.2em] uppercase text-[#78756d]">
                <div className="max-w-340 mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
                    {/* Left: Folio ID */}
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b]" />
                        <span className="font-mono font-medium text-[#1f1e1d]">
                            {sanctuaryFolioCode}
                        </span>
                    </div>

                    {/* Right: Direct Rate & 256-Bit Encrypted Protocol */}
                    <div className="flex items-center gap-4 text-[#8e763b] font-medium">
                        <div className="flex items-center gap-1.5">
                            <svg className="w-3 h-3 text-[#8e763b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                <polyline points="9 12 11 14 15 10" />
                            </svg>
                            <span>{assuranceLeft}</span>
                        </div>
                        <span className="text-[#ded9ce]">•</span>
                        <div className="flex items-center gap-1.5">
                            <svg className="w-3 h-3 text-[#8e763b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <span>{assuranceRight}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}