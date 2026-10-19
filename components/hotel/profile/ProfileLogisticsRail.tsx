'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface LogisticsDetailItem {
	id: string;
	label: string;
	value: string;
	statusBadge?: string;
	iconType: 'chauffeur' | 'keyless' | 'luggage';
}

export interface NextSanctuaryReservation {
	countdownBadge: string;
	sanctuaryName: string;
	enclaveLocation: string;
	suiteName: string;
	roomUnit: string;
	dateRangeDisplay: string;
	nightsCount: number;
	logistics: LogisticsDetailItem[];
	itineraryHref: string;
}

export interface RegisteredCompanion {
	id: string;
	fullName: string;
	relationshipTag: string;
	clearanceLevel: string;
	avatarUrl: string;
	avatarAlt: string;
}

export interface HistoricalStayArchiveItem {
	id: string;
	sanctuaryName: string;
	chamberName: string;
	dateDisplay: string;
	folioCode: string;
	pdfDownloadUrl: string;
}

export interface ProfileLogisticsData {
	nextSanctuary: NextSanctuaryReservation;
	companionsSectionBadge: string;
	companionsHeading: string;
	companions: RegisteredCompanion[];
	archiveSectionBadge: string;
	archiveHeading: string;
	archiveItems: HistoricalStayArchiveItem[];
	transmitCtaLabel: string;
	securityProtocolNotice: string;
}

export const profileLogisticsDefaultData: ProfileLogisticsData = {
	nextSanctuary: {
		countdownBadge: 'T - 4 DAYS • CONFIRMED',
		sanctuaryName: 'Aurelia Sanctuary Positano',
		enclaveLocation: 'Amalfi Coastline • Cliffside Portico',
		suiteName: 'Villa Il Sogno',
		roomUnit: 'Master Ocean Suite 402',
		dateRangeDisplay: 'Sept 28 — Oct 05, 2025',
		nightsCount: 7,
		logistics: [
			{
				id: 'chauffeur',
				label: 'AIRPORT & HELIPAD CHAUFFEUR',
				value: 'Mercedes-Maybach S680 from Naples (NAP) or Capri Slip',
				statusBadge: 'COORDINATED',
				iconType: 'chauffeur',
			},
			{
				id: 'keyless',
				label: 'SANCTUARY ACCESS KEY',
				value: 'Biometric NFC Keyless Folio Active on Sovereign App',
				statusBadge: 'AUTHORIZED',
				iconType: 'keyless',
			},
			{
				id: 'luggage',
				label: 'LUGGAGE PRE-FORWARDING',
				value: '6 Registered Trunks Received & Unpacked by Attendants',
				statusBadge: 'IN SANCTUARY',
				iconType: 'luggage',
			},
		],
		itineraryHref: '/confirmation?bookingRef=AUR-8911-POS',
	},

	companionsSectionBadge: 'DISCRETION PROTOCOL ALPHA',
	companionsHeading: 'Registered Sanctuary Companions',

	companions: [
		{
			id: 'comp-arthur',
			fullName: 'Lord Arthur Beaumont',
			relationshipTag: 'SPOUSE • VERIFIED SOVEREIGN GUEST',
			clearanceLevel: 'Full Villa Access & Thermal Spa Privileges',
			avatarUrl: '/limestone-villa.png',
			avatarAlt: 'Portrait of verified companion Lord Arthur Beaumont',
		},
		{
			id: 'comp-elena',
			fullName: 'Elena Rossi',
			relationshipTag: 'PERSONAL ATTACHÉ & PRIVATE VALET',
			clearanceLevel: 'Ground Staff & Service Antechamber Clearance',
			avatarUrl: '/garden-pavillion.png',
			avatarAlt: 'Portrait of registered valet Elena Rossi',
		},
	],

	archiveSectionBadge: 'ENCRYPTED LEDGER ARCHIVE',
	archiveHeading: '14 Completed Residencies',

	archiveItems: [
		{
			id: 'stay-st-moritz',
			sanctuaryName: 'Aurelia St. Moritz Engadin',
			chamberName: 'Chalet Alta Glacier Suite',
			dateDisplay: 'March 14 — 21, 2025',
			folioCode: 'AUR-2025-STM-8801',
			pdfDownloadUrl: '#',
		},
		{
			id: 'stay-kyoto',
			sanctuaryName: 'Aurelia Higashiyama Kyoto',
			chamberName: 'Suian Bamboo Onsen Pavilion',
			dateDisplay: 'November 02 — 09, 2024',
			folioCode: 'AUR-2024-KYO-4912',
			pdfDownloadUrl: '#',
		},
		{
			id: 'stay-paris',
			sanctuaryName: 'Aurelia Paris Vendôme',
			chamberName: 'Penthouse Mansard Suite',
			dateDisplay: 'June 18 — 24, 2024',
			folioCode: 'AUR-2024-PAR-1109',
			pdfDownloadUrl: '#',
		},
	],

	transmitCtaLabel: 'Commit & Transmit to Majordomo Matteo',
	securityProtocolNotice:
		'Protected by Swiss Banking Secrecy Protocols & 256-bit Cryptographic Inscription',
};

export interface ProfileLogisticsRailProps {
	data?: ProfileLogisticsData;
	className?: string;
	onTransmitToMajordomo?: () => void;
	onAddCompanion?: () => void;
	onDownloadFolioPdf?: (folioCode: string) => void;
}

export function ProfileLogisticsRail({
	data = profileLogisticsDefaultData,
	className = '',
	onTransmitToMajordomo,
	onAddCompanion,
	onDownloadFolioPdf,
}: ProfileLogisticsRailProps) {
	const {
		nextSanctuary,
		companionsSectionBadge,
		companionsHeading,
		companions,
		archiveSectionBadge,
		archiveHeading,
		archiveItems,
		transmitCtaLabel,
		securityProtocolNotice,
	} = data;

	const [isTransmitting, setIsTransmitting] = useState(false);
	const [transmittedSuccess, setTransmittedSuccess] = useState(false);

	function handleTransmitClick() {
		setIsTransmitting(true);

		if (onTransmitToMajordomo) {
			onTransmitToMajordomo();
		}

		setTimeout(function () {
			setIsTransmitting(false);
			setTransmittedSuccess(true);

			setTimeout(function () {
				setTransmittedSuccess(false);
			}, 4000);
		}, 1200);
	}

	function renderLogisticsIcon(type: LogisticsDetailItem['iconType']) {
		switch (type) {
			case 'chauffeur':
				return (
					<svg
						className="w-4 h-4 text-[#8e763b]"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.8"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<rect x="2" y="7" width="20" height="13" rx="2" />
						<path d="M16 7V4a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v3" />
						<circle cx="7" cy="14" r="2" />
						<circle cx="17" cy="14" r="2" />
					</svg>
				);

			case 'keyless':
				return (
					<svg
						className="w-4 h-4 text-[#8e763b]"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.8"
						strokeLinecap="round"
						strokeLinejoin="round"
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
						<circle cx="12" cy="16" r="1" />
					</svg>
				);

			case 'luggage':
				return (
					<svg
						className="w-4 h-4 text-[#8e763b]"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.8"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<rect x="6" y="7" width="12" height="14" rx="2" />
						<path d="M9 7V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3" />
						<line x1="6" y1="12" x2="18" y2="12" />
					</svg>
				);

			default:
				return null;
		}
	}

	return (
		<aside
			className={`w-full space-y-6 lg:space-y-8 text-[#1f1e1d] ${className}`}
		>
			{/* ============================================================= */}
			{/* 1. NEXT CONFIRMED SANCTUARY CARD */}
			{/* ============================================================= */}

			<article className="bg-[#fcf9f4] border border-[#e8e4dc] rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(31,30,29,0.03)] space-y-5">
				<div className="flex items-center justify-between pb-3 border-b border-[#eeeae2]">
					<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f6f2ea] border border-[#ded9ce] text-[9px] font-mono uppercase tracking-[0.18em] text-[#24633b]">
						<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
						<span>{nextSanctuary.countdownBadge}</span>
					</span>

					<span className="text-[10px] font-mono text-[#8e8a82] uppercase">
						{nextSanctuary.nightsCount} NIGHTS HORIZON
					</span>
				</div>

				<div className="space-y-1">
					<span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b] block">
						{nextSanctuary.enclaveLocation}
					</span>

					<h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1f1e1d] tracking-tight">
						{nextSanctuary.sanctuaryName}
					</h3>

					<p className="text-xs text-[#55524b] font-sans font-light">
						{nextSanctuary.suiteName} • {nextSanctuary.roomUnit}
					</p>

					<span className="font-mono text-xs text-[#1f1e1d] font-semibold block pt-1">
						{nextSanctuary.dateRangeDisplay}
					</span>
				</div>

				{/* 3 Logistics Items Stack */}

				<div className="space-y-3 pt-2">
					{nextSanctuary.logistics.map(function (item) {
						return (
							<div
								key={item.id}
								className="p-3.5 rounded-2xl bg-white border border-[#ded9ce] shadow-2xs space-y-1"
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<span className="text-[#8e763b]">
											{renderLogisticsIcon(item.iconType)}
										</span>

										<span className="text-[8.5px] font-mono uppercase tracking-[0.18em] text-[#8e763b] font-semibold">
											{item.label}
										</span>
									</div>

									{item.statusBadge && (
										<span className="text-[8px] font-mono uppercase px-2 py-0.5 rounded-xs bg-[#f6f2ea] text-[#24633b] font-medium border border-[#ded9ce]">
											{item.statusBadge}
										</span>
									)}
								</div>

								<p className="text-[11px] font-sans text-[#4d4a44] font-light leading-snug pl-6">
									{item.value}
								</p>
							</div>
						);
					})}
				</div>

				<div className="pt-2">
					<Link
						href={nextSanctuary.itineraryHref}
						className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-[#faf8f5] border border-[#ded9ce] text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#1f1e1d] transition-colors shadow-2xs text-center"
					>
						<span>VIEW COMPREHENSIVE ITINERARY</span>
						<span>→</span>
					</Link>
				</div>
			</article>

			{/* ============================================================= */}
			{/* 2. REGISTERED SANCTUARY COMPANIONS CARD */}
			{/* ============================================================= */}

			<article className="bg-[#fcf9f4] border border-[#e8e4dc] rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(31,30,29,0.03)] space-y-4">
				<div className="flex items-center justify-between pb-3 border-b border-[#eeeae2]">
					<div>
						<span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8e763b] block font-semibold">
							{companionsSectionBadge}
						</span>

						<h4 className="font-serif text-base font-normal text-[#1f1e1d] tracking-tight mt-0.5">
							{companionsHeading}
						</h4>
					</div>

					<button
						type="button"
						onClick={onAddCompanion}
						className="text-[10px] font-sans font-semibold uppercase tracking-[0.16em] text-[#8e763b] hover:text-[#1f1e1d] transition-colors underline"
					>
						+ ADD GUEST
					</button>
				</div>

				<div className="space-y-3">
					{companions.map(function (companion) {
						return (
							<div
								key={companion.id}
								className="p-3.5 rounded-2xl bg-white border border-[#ded9ce] shadow-2xs flex items-center justify-between gap-3"
							>
								<div className="flex items-center gap-3 min-w-0">
									<div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#bfa76f] bg-[#f6f2ea] shrink-0">
										<Image
											src={companion.avatarUrl}
											alt={companion.avatarAlt}
											fill
											sizes="40px"
											className="object-cover object-center"
										/>
									</div>

									<div className="min-w-0 space-y-0.5">
										<h5 className="font-serif text-xs sm:text-sm font-semibold text-[#1f1e1d] tracking-tight truncate">
											{companion.fullName}
										</h5>

										<span className="text-[9px] font-mono uppercase tracking-wider text-[#8e763b] block truncate">
											{companion.relationshipTag}
										</span>

										<span className="text-[9.5px] font-sans text-[#78756d] font-light block truncate">
											{companion.clearanceLevel}
										</span>
									</div>
								</div>

								<span className="text-xs font-mono text-[#24633b] font-medium shrink-0">
									✓ CLEARED
								</span>
							</div>
						);
					})}
				</div>
			</article>

			{/* ============================================================= */}
			{/* 3. ENCRYPTED HISTORICAL ARCHIVE CARD */}
			{/* ============================================================= */}

			<article className="bg-[#fcf9f4] border border-[#e8e4dc] rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(31,30,29,0.03)] space-y-4">
				<div className="flex items-center justify-between pb-3 border-b border-[#eeeae2]">
					<div>
						<span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8e763b] block font-semibold">
							{archiveSectionBadge}
						</span>

						<h4 className="font-serif text-base font-normal text-[#1f1e1d] tracking-tight mt-0.5">
							{archiveHeading}
						</h4>
					</div>

					<span className="text-[9px] font-mono text-[#8e8a82]">
						SWISS VAULT REF: CH-8911
					</span>
				</div>

				<div className="space-y-2.5">
					{archiveItems.map(function (item) {
						return (
							<div
								key={item.id}
								className="p-3 rounded-2xl bg-white border border-[#ded9ce] shadow-2xs flex items-center justify-between gap-3 text-xs font-sans"
							>
								<div className="min-w-0 space-y-0.5">
									<h5 className="font-serif text-xs font-semibold text-[#1f1e1d] tracking-tight truncate">
										{item.sanctuaryName}
									</h5>

									<div className="flex items-center gap-1.5 text-[9.5px] text-[#78756d] font-light">
										<span className="truncate">
											{item.chamberName}
										</span>

										<span>•</span>

										<span className="shrink-0">
											{item.dateDisplay}
										</span>
									</div>
								</div>

								<button
									type="button"
									onClick={function () {
										if (onDownloadFolioPdf) {
											onDownloadFolioPdf(item.folioCode);
										}
									}}
									className="px-2.5 py-1.5 rounded-lg bg-[#f6f2ea] hover:bg-[#eeeae2] border border-[#ded9ce] text-[9px] font-mono uppercase tracking-wider text-[#1f1e1d] transition-colors shrink-0"
									title="Download Encrypted Folio PDF"
								>
									PDF ⤓
								</button>
							</div>
						);
					})}
				</div>
			</article>

			{/* ============================================================= */}
			{/* 4. MASTER TRANSMIT ACTION BUTTON & TRUST STRIP */}
			{/* ============================================================= */}

			<div className="space-y-3 pt-2">
				<button
					type="button"
					disabled={isTransmitting}
					onClick={handleTransmitClick}
					className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-xs font-semibold uppercase tracking-[0.22em] transition-all shadow-md active:translate-y-0.5 disabled:opacity-75 group"
				>
					<span>
						{isTransmitting
							? 'Transmitting Calibrations...'
							: transmittedSuccess
								? '✓ Calibrations Transmitted to Majordomo'
								: transmitCtaLabel}
					</span>

					{!isTransmitting && !transmittedSuccess && (
						<span className="text-sm font-normal transform transition-transform duration-300 group-hover:translate-x-1">
							→
						</span>
					)}
				</button>

				<div className="flex items-center justify-center gap-2 text-center text-[9px] font-mono uppercase tracking-wider text-[#8e8a82]">
					<svg
						className="w-3.5 h-3.5 text-[#8e763b]"
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

					<span>{securityProtocolNotice}</span>
				</div>
			</div>
		</aside>
	);
}