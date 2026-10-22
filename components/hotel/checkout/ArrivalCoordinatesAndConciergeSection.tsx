'use client'

import Image from 'next/image';

export interface TransitAccessMethod {
    id: string;
    title: string;
    distanceOrHorizon: string;
    description: string;
    badge: string;
    iconType: 'marine' | 'heliport' | 'airport' | 'chauffeur';
}

export interface SanctuaryEnclaveCoordinates {
    estateName: string;
    streetAddress: string;
    locality: string;
    postalCode: string;
    country: string;
    latitude: string;
    longitude: string;
    elevation: string;
    marineVhfChannel: string;
    satelliteMapImageUrl: string;
    satelliteMapAlt: string;
}

export interface DedicatedConciergeDesk {
    title: string;
    subtitle: string;
    liaisonName: string;
    liaisonRole: string;
    liaisonAvatarUrl: string;
    directHotlineDisplay: string;
    directHotlineTel: string;
    secureEmail: string;
    hoursNotice: string;
    encryptionBadge: string;
}

export interface ArrivalCoordinatesData {
    sectionEyebrow: string;
    heading: string;
    subheading: string;
    coordinates: SanctuaryEnclaveCoordinates;
    transitMethods: TransitAccessMethod[];
    conciergeDesk: DedicatedConciergeDesk;
    downloadDirectionsPdfUrl: string;
    googleMapsDirectionsUrl: string;

}

export const arrivalCoordinatesDefaultData: ArrivalCoordinatesData = {
    sectionEyebrow: 'ENCLAVE ACCESS & LIAISON',
    heading: 'Geographic Coordinates & Arrival Protocol',
    subheading: 'Accessing Aurelia Cliffside Villas via maritime tender, private heliport, or executive motorcoach.',
    coordinates: {
        estateName: 'Aurelia Cliffside Villas & Ocean Terraces',
        streetAddress: "Via Positanesi d'America 18",
        locality: 'Positano, Salerno (Amalfi Coast)',
        postalCode: '84017',
        country: 'Italy',
        latitude: "40°37'41.2\"N",
        longitude: "14°29'08.6\"E",
        elevation: '185m Above Mean Sea Level',
        marineVhfChannel: 'VHF Ch. 74 (Aurelia Water Gate)',
        satelliteMapImageUrl: '/images/maps/positano-enclave-satellite.jpg',
        satelliteMapAlt: 'Satellite architectural map of Aurelia Cliffside Villas and private Positano slipway',
    },
    transitMethods: [
        {
            id: 'marine-tender',
            title: 'Private Riva Maritime Slipway',
            distanceOrHorizon: '45 Min from Naples Mergellina',
            description: 'Direct deep-water private tender pontoon. Luggage valet boarding at slipway level.',
            badge: 'RECOMMENDED',
            iconType: 'marine',
        },
        {
            id: 'heliport-transit',
            title: 'Ravello / San Pietro Heliport',
            distanceOrHorizon: '15 Min Flight from Naples (NAP)',
            description: 'Private clifftop landing clearance followed by 7-minute Aurelia chauffeur transfer.',
            badge: 'VIP HELIPAD',
            iconType: 'heliport',
        },
        {
            id: 'airport-chauffeur',
            title: 'Executive Chauffeur Transfer',
            distanceOrHorizon: '65 km (approx. 75 Min)',
            description: 'Mercedes-Maybach or V-Class direct from Naples Capodichino International Airport.',
            badge: 'PRIVATE FLEET',
            iconType: 'chauffeur',
        },
    ],
    conciergeDesk: {
        title: '24-Hour Residential Concierge Desk',
        subtitle: 'Direct encrypted line for immediate itinerary calibrations, dining, and harbor transfers.',
        liaisonName: 'Matteo de Luca',
        liaisonRole: 'Head Majordomo & Portico Liaison',
        liaisonAvatarUrl: '/images/hosts/matteo-deluca.jpg',
        directHotlineDisplay: '+39 089 875 000',
        directHotlineTel: '+39089875000',
        secureEmail: 'concierge@aureliahotels.com',
        hoursNotice: 'Continuous standing watch across all European & Atlantic timezones.',
        encryptionBadge: '256-BIT ENCRYPTED CONCIERGE HOTLINE',
    },
    downloadDirectionsPdfUrl: '/api/documents/directions-positano-AUR-89240.pdf',
    googleMapsDirectionsUrl: 'https://maps.google.com/?q=40.628111,14.485722',
};


export interface ArrivalCoordinatesAndConciergeProps {
	data?: ArrivalCoordinatesData;
	onCallConcierge?: () => void;
	onEmailConcierge?: () => void;
	onDownloadDirections?: () => void;
	onOpenGoogleMaps?: () => void;
	className?: string;
}

export function ArrivalCoordinatesAndConciergeSection({
	data = arrivalCoordinatesDefaultData,
	onDownloadDirections,
	onOpenGoogleMaps,
	className = '',
}: ArrivalCoordinatesAndConciergeProps) {
	const {
		sectionEyebrow,
		heading,
		subheading,
		coordinates,
		transitMethods,
		conciergeDesk,
		downloadDirectionsPdfUrl,
		googleMapsDirectionsUrl,
	} = data;

	// Interactive Handlers for Phase 4 (Concierge Telephony & Transit)
	const handleCallConcierge = () => {
		console.log('Connecting hotline to Head Majordomo Matteo de Luca');
	};

	const handleEmailConcierge = () => {
		console.log('Dispatching encrypted email to concierge desk');
	};

	return (
		<section className={`w-full max-w-360 mx-auto space-y-8 ${className}`}>
			{/* Section Monograph Header */}
			<div className="text-center max-w-2xl mx-auto">
				<span className="block text-[10px] font-sans font-semibold uppercase tracking-[0.26em] text-[#8e763b] mb-2">
					{sectionEyebrow}
				</span>
				<h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#1f1e1d] tracking-tight leading-[1.2]">
					{heading}
				</h2>
				<p className="mt-2 text-xs sm:text-[13px] text-[#6e6b64] font-sans font-light leading-relaxed">
					{subheading}
				</p>
			</div>

			{/* 2-Column Split: Left Coordinates & Map (7 Cols) | Right Concierge Liaison (5 Cols) */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
				{/* LEFT 7 COLUMNS: Enclave Coordinates & Transit Grid */}
				<div className="lg:col-span-7 space-y-6">
					{/* Architectural Coordinates Card */}
					<article className="bg-white border border-[#e8e4dc] rounded-2xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(31,30,29,0.02)] space-y-5">
						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#eeeae2]">
							<div>
								<span className="block text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b] mb-1">
									ESTATE HORIZON
								</span>
								<h3 className="font-serif text-xl font-normal text-[#1f1e1d] tracking-tight">
									{coordinates.estateName}
								</h3>
								<p className="text-xs text-[#78756d] font-sans font-light mt-0.5">
									{coordinates.streetAddress}, {coordinates.locality}, {coordinates.country}
								</p>
							</div>
							<div className="flex items-center gap-2 self-start sm:self-auto">
								<a
									href={googleMapsDirectionsUrl}
									target="_blank"
									rel="noopener noreferrer"
									onClick={() =>
										window.open(
											googleMapsDirectionsUrl,
											'_blank',
										)
									}
									className="px-3 py-1.5 rounded-lg bg-white border border-[#ded9ce] text-[10px] font-sans font-semibold uppercase tracking-wider text-[#1f1e1d] hover:bg-[#f6f2ea] transition-colors shadow-2xs"
								>
									Google Maps
								</a>
							</div>
						</div>

						{/* Geo Telemetry Monograph Grid */}
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans">
							<div className="p-3 rounded-sm bg-white border border-[#ded9ce] shadow-2xs">
								<span className="text-[9px] uppercase tracking-wider text-[#8e8a82] block">
									LATITUDE
								</span>
								<span className="font-mono text-xs font-semibold text-[#1f1e1d] block mt-1">
									{coordinates.latitude}
								</span>
							</div>
							<div className="p-3 rounded-sm bg-white border border-[#ded9ce] shadow-2xs">
								<span className="text-[9px] uppercase tracking-wider text-[#8e8a82] block">
									LONGITUDE
								</span>
								<span className="font-mono text-xs font-semibold text-[#1f1e1d] block mt-1">
									{coordinates.longitude}
								</span>
							</div>
							<div className="p-3 rounded-sm bg-white border border-[#ded9ce] shadow-2xs">
								<span className="text-[9px] uppercase tracking-wider text-[#8e8a82] block">
									ELEVATION
								</span>
								<span className="font-mono text-xs font-semibold text-[#1f1e1d] block mt-1">
									185m AMSL
								</span>
							</div>
							<div className="p-3 rounded-sm bg-white border border-[#ded9ce] shadow-2xs">
								<span className="text-[9px] uppercase tracking-wider text-[#8e8a82] block">
									WATER GATE
								</span>
								<span className="font-mono text-xs font-semibold text-[#8e763b] block mt-1">
									VHF CH. 74
								</span>
							</div>
						</div>

						{/* Transit Ingress Protocols */}
						<div className="pt-2 space-y-3">
							<span className="block text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e8a82]">
								TRANSIT ACCESS PROTOCOLS
							</span>
							{transitMethods.map(function (method) {
								return (
									<div
										key={method.id}
										className="p-4 rounded-sm bg-white border border-[#ded9ce] shadow-2xs flex items-start gap-3.5 transition-all hover:border-[#8e763b]/50"
									>
										<div className="p-2 rounded-lg bg-[#f6f2ea] border border-[#e8e4dc] text-[#8e763b] shrink-0 mt-0.5">
											{method.iconType === 'marine' && (
												<svg
													className="w-4 h-4"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="1.8"
												>
													<path d="M3 15h18M3 9h18M5 19l2-4M19 19l-2-4M5 5l2 4M19 5l-2 4" />
												</svg>
											)}
											{method.iconType === 'heliport' && (
												<svg
													className="w-4 h-4"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="1.8"
												>
													<circle cx="12" cy="12" r="9" />
													<path d="M12 3v18M3 12h18M8 8l8 8M16 8l-8 8" />
												</svg>
											)}
											{method.iconType === 'chauffeur' && (
												<svg
													className="w-4 h-4"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="1.8"
												>
													<rect x="2" y="5" width="20" height="14" rx="2" />
													<line x1="2" y1="10" x2="22" y2="10" />
												</svg>
											)}
										</div>
										<div className="min-w-0 flex-1">
											<div className="flex items-center justify-between gap-2">
												<h4 className="font-serif text-sm font-semibold text-[#1f1e1d]">
													{method.title}
												</h4>
												<span className="text-[9px] font-sans font-semibold uppercase tracking-wider text-[#8e763b] bg-[#f6f2ea] px-2 py-0.5 rounded border border-[#ded9ce]">
													{method.badge}
												</span>
											</div>
											<span className="text-[10px] font-mono text-[#8e763b] block mt-0.5">
												{method.distanceOrHorizon}
											</span>
											<p className="text-[11px] font-sans text-[#6e6b64] font-light leading-relaxed mt-1">
												{method.description}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</article>
				</div>

				{/* RIGHT 5 COLUMNS: Dedicated Concierge Desk & Instant Actions */}
				<div className="lg:col-span-5 space-y-6">
					{/* Dark Monolithic Concierge Card */}
					<article className="bg-[#1f1e1d] text-[#fcf9f4] border border-[#383530] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
						<div>
							{/* Security Badge Pill */}
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-[#bfa76f] mb-4">
								<span className="w-1.5 h-1.5 rounded-full bg-[#bfa76f] animate-pulse" />
								<span>{conciergeDesk.encryptionBadge}</span>
							</div>

							<h3 className="font-serif text-xl sm:text-2xl font-normal text-white tracking-tight">
								{conciergeDesk.title}
							</h3>
							<p className="mt-1.5 text-xs text-[#a4a098] font-sans font-light leading-relaxed">
								{conciergeDesk.subtitle}
							</p>

							{/* Assigned Head Majordomo Profile */}
							<div className="mt-6 p-4 rounded-2xl bg-[#2a2826] border border-[#44403a] flex items-center gap-3.5 shadow-sm">
								<div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#bfa76f] bg-[#1f1e1d] shrink-0">
									{conciergeDesk.liaisonAvatarUrl ? (
										<Image
											src={conciergeDesk.liaisonAvatarUrl}
											alt={conciergeDesk.liaisonName}
											fill
											sizes="48px"
											className="object-cover object-center"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center font-serif text-xs font-bold text-[#bfa76f]">
											MD
										</div>
									)}
								</div>
								<div className="min-w-0">
									<span className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#bfa76f] block">
										ON-DUTY RESIDENCE MAJORDOMO
									</span>
									<h4 className="font-serif text-base font-normal text-white truncate">
										{conciergeDesk.liaisonName}
									</h4>
									<span className="text-[11px] text-[#a4a098] font-sans font-light truncate block">
										{conciergeDesk.liaisonRole}
									</span>
								</div>
							</div>

							{/* Hotline & Email Contact Buttons */}
							<div className="mt-6 space-y-3">
								<a
									href={`tel:${conciergeDesk.directHotlineTel}`}
									onClick={handleCallConcierge}
									className="w-full inline-flex items-center justify-between px-5 py-3.5 rounded-sm bg-[#bfa76f] hover:bg-[#aa935e] text-white font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-md active:translate-y-0.5"
								>
									<div className="flex items-center gap-2.5">
										<svg
											className="w-4 h-4 text-white"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
										</svg>
										<span>Direct Telephone Hotline</span>
									</div>
									<span className="font-mono text-xs">
										{conciergeDesk.directHotlineDisplay}
									</span>
								</a>

								<a
									href={`mailto:${conciergeDesk.secureEmail}`}
									onClick={handleEmailConcierge}
									className="w-full inline-flex items-center justify-between px-5 py-3.5 rounded-sm bg-[#2a2826] hover:bg-[#383530] border border-[#44403a] text-white font-sans text-xs font-medium uppercase tracking-[0.18em] transition-all"
								>
									<div className="flex items-center gap-2.5">
										<svg
											className="w-4 h-4 text-[#bfa76f]"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
											<polyline points="22,6 12,13 2,6" />
										</svg>
										<span>Encrypted Dispatch</span>
									</div>
									<span className="text-[11px] text-[#a4a098] font-sans lowercase truncate max-w-37.5">
										{conciergeDesk.secureEmail}
									</span>
								</a>
							</div>
						</div>

						{/* Notice & Download PDF */}
						<div className="pt-4 border-t border-[#383530] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans text-[#a4a098]">
							<span className="text-[10px] leading-tight max-w-50">
								{conciergeDesk.hoursNotice}
							</span>
							<a
								href={downloadDirectionsPdfUrl}
								onClick={() =>
									window.open(
										downloadDirectionsPdfUrl,
										'_blank',
									)
								}
								className="inline-flex items-center gap-1.5 text-[10px] uppercase font-semibold text-[#bfa76f] hover:text-white transition-colors"
							>
								<span>Directions PDF</span>
								<span>↓</span>
							</a>
						</div>
					</article>
				</div>
			</div>
		</section>
	);
}
