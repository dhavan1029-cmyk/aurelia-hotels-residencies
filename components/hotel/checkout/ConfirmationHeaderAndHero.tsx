'use client'

import Image from 'next/image';

export interface SanctuaryPanoramaLocation {
    estateName: string;
    streetAddress: string;
    suiteUnitBadge: string;
    marineAccessBadge: string;
    heroImageUrl: string;
    heroImageAlt: string;
}

export interface ConfirmationHeroData {
    statusBadgeText: string;
    headline: string;
    bookingReference: string;
    guaranteeText: string;
    panorama: SanctuaryPanoramaLocation;
    appleWalletPassUrl: string;
    itineraryPdfUrl: string;
    calendarIcsUrl: string;
    printFolioUrl: string;
}

export const confirmationHeroDefaultData: ConfirmationHeroData = {
    statusBadgeText: 'CONFIRMED SOVEREIGN PRIVILEGE BOOKING • PRE-ARRIVAL CONCIERGE ASSIGNED',
    headline: 'Your Sanctuary Awaits on the Cliffs of Positano',
    bookingReference: 'AUR-89240-POS',
    guaranteeText: 'Confirmed & Guaranteed',
    panorama: {
        estateName: 'Aurelia Cliffside Villas & Ocean Terraces',
        streetAddress: "Via Positanesi d'America 18, 84017 Positano SA, Italy",
        suiteUnitBadge: 'Villa 402',
        marineAccessBadge: 'Private Riva Access',
        heroImageUrl: '/limestone-villa.png',
        heroImageAlt: 'Aurelia Cliffside Villas & Ocean Terraces perched over Positano bay at golden hour sunset',
    },
    appleWalletPassUrl: '/api/passes/AUR-89240-POS.pkpass',
    itineraryPdfUrl: '/api/documents/itinerary-AUR-89240-POS.pdf',
    calendarIcsUrl: '/api/calendar/AUR-89240-POS.ics',
    printFolioUrl: '/folio/print?ref=AUR-89240-POS',
};

export function ConfirmationHeaderAndHero() {

    const data = confirmationHeroDefaultData

    const {
        statusBadgeText,
        headline,
        bookingReference,
        guaranteeText,
        panorama,
    } = data;

    const handleAddToWallet = () => {
        console.log(
            'Downloading Apple Wallet cryptographic pass (.pkpass)...',
            data.appleWalletPassUrl,
        );
        window.open(data.appleWalletPassUrl, '_blank');
    };

    const handleDownloadItineraryPdf = () => {
        console.log(
            'Generating high-resolution official itinerary PDF...',
            data.itineraryPdfUrl,
        );
        window.open(data.itineraryPdfUrl, '_blank');
    };

    const handleSyncCalendar = () => {
        console.log(
            'Dispatching iCalendar (.ics) stay horizon file...',
            data.calendarIcsUrl,
        );
        window.open(data.calendarIcsUrl, '_blank');
    };

    const handlePrintFolio = () => {
        window.print();
    };

    return (
        <section className={`w-full text-center`}>
            {/* Top Monogram Seal Insignia Pill */}
            <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#f6f2ea] border border-[#ded9ce] flex items-center justify-center text-[#8e763b] shadow-xs">
                    <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <polyline points="9 12 11 14 15 10" />
                    </svg>
                </div>
            </div>

            {/* Status Eyebrow with Pulsing Gold Indicator */}
            <div className="inline-flex items-center gap-2 mb-3.5 px-3.5 py-1.5 rounded-full bg-[#f6f2ea] border border-[#ebe5d8]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b] animate-pulse" />
                <span className="text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.24em] text-[#8e763b]">
                    {statusBadgeText}
                </span>
            </div>

            {/* Master Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-normal text-[#1f1e1d] tracking-tight leading-[1.12] max-w-4xl mx-auto">
                {headline}
            </h1>

            {/* Booking Reference Pill Subtitle */}
            <p className="mt-3.5 text-xs sm:text-[13px] font-sans text-[#6e6b64] font-light tracking-wide">
                <span>Reservation Reference: </span>
                <span className="font-mono font-semibold text-[#1f1e1d] tracking-wider">
                    {bookingReference}
                </span>
                <span className="mx-2.5 text-[#ded9ce]">•</span>
                <span className="text-[#8e763b] font-medium">
                    {guaranteeText}
                </span>
            </p>

            {/* Cinematic Panoramic Enclave Card */}
            <div className="mt-8 sm:mt-10 max-w-340 mx-auto relative aspect-21/9 sm:aspect-16/7 w-full rounded-sm overflow-hidden shadow-[0_16px_48px_rgba(31,30,29,0.08)] bg-[#eeeae2] border border-[#e8e4dc]">
                <Image
                    src={panorama.heroImageUrl}
                    alt={panorama.heroImageAlt}
                    fill
                    priority
                    sizes="(max-width: 1200px) 100vw, 1120px"
                    className="object-cover object-center transform scale-[1.01]"
                />

                {/* Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/10 pointer-events-none" />

                {/* Bottom Left Estate Coordinates */}
                <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-8 z-10 text-left text-white max-w-lg">
                    <span className="block text-[9px] font-sans font-semibold uppercase tracking-[0.24em] text-[#bfa76f] mb-1">
                        SANCTUARY ENCLAVE
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl lg:text-[28px] font-normal tracking-tight text-white/95">
                        {panorama.estateName}
                    </h3>
                    <p className="text-[11px] font-sans text-[#dcdad5] font-light mt-0.5 tracking-wide">
                        {panorama.streetAddress}
                    </p>
                </div>

                {/* Bottom Right Suite & Marine Access Badges */}
                <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8 z-10 flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-white font-sans text-[10px] font-semibold uppercase tracking-[0.18em]">
                        {panorama.suiteUnitBadge}
                    </span>
                    <span className="px-3 py-1.5 rounded-md bg-[#8e763b]/90 backdrop-blur-md border border-[#bfa76f]/40 text-white font-sans text-[10px] font-semibold uppercase tracking-[0.18em]">
                        {panorama.marineAccessBadge}
                    </span>
                </div>
            </div>

            {/* Quick Action Button Strip (Apple Wallet, PDF, Calendar, Print) */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto px-4">
                {/* Add to Apple Wallet */}
                <button
                    type="button"
                    onClick={handleAddToWallet}
                    className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-sm bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-[11px] font-semibold uppercase tracking-[0.18em] transition-all shadow-sm active:translate-y-0.5"
                >
                    <svg
                        className="w-4 h-4 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.67-.82 1.13-1.96.99-3.11-.99.04-2.17.67-2.86 1.48-.61.71-1.14 1.88-1 3 .1.01.21.02.31.02.9 0 2.03-.57 2.56-1.39z" />
                    </svg>
                    <span>Add to Apple Wallet</span>
                </button>

                {/* Download Itinerary PDF */}
                <button
                    type="button"
                    onClick={handleDownloadItineraryPdf}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-white hover:bg-[#f6f2ea] border border-[#ded9ce] text-[#1f1e1d] font-sans text-[11px] font-medium uppercase tracking-[0.18em] transition-all shadow-2xs active:translate-y-0.5"
                >
                    <svg
                        className="w-4 h-4 text-[#8e763b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>Download Itinerary PDF</span>
                </button>

                {/* Sync to Calendar */}
                <button
                    type="button"
                    onClick={handleSyncCalendar}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-white hover:bg-[#f6f2ea] border border-[#ded9ce] text-[#1f1e1d] font-sans text-[11px] font-medium uppercase tracking-[0.18em] transition-all shadow-2xs active:translate-y-0.5"
                >
                    <svg
                        className="w-4 h-4 text-[#8e763b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>Sync to Calendar</span>
                </button>

                {/* Print Guest Folio */}
                <button
                    type="button"
                    onClick={handlePrintFolio}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-white hover:bg-[#f6f2ea] border border-[#ded9ce] text-[#1f1e1d] font-sans text-[11px] font-medium uppercase tracking-[0.18em] transition-all shadow-2xs active:translate-y-0.5"
                >
                    <svg
                        className="w-4 h-4 text-[#8e763b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="6 9 6 2 18 2 18 9" />
                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                        <rect x="6" y="14" width="12" height="8" />
                    </svg>
                    <span>Print Guest Folio</span>
                </button>
            </div>
        </section>
    );
}
