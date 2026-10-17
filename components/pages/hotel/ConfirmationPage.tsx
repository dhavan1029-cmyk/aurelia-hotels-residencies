'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Phase 1: Header, Sanctuary Panorama & Digital Wallet Actions
import { ConfirmationHeaderAndHero } from '@/components/hotel/checkout/ConfirmationHeaderAndHero';
import {
	ConfirmationHeroData,
	confirmationHeroDefaultData,
} from '@/components/hotel/checkout/ConfirmationHeaderAndHero';

// Phase 2: Official Sovereign Residence Voucher Card
import { SovereignVoucherCard } from '@/components/hotel/checkout/SovereignVoucherCard';
import {
	SovereignVoucherCardData,
	sovereignVoucherDefaultData,
} from '@/components/hotel/checkout/SovereignVoucherCard';

// Phase 3: Tailor Your Arrival Experience (Sensory & Transfer Calibration)
import {
	ArrivalSensoryCalibrationSection,
	ArrivalCalibrationValues,
} from '@/components/hotel/checkout/ArrivalSensoryCalibrationSection';
import {
	ArrivalCalibrationData,
	arrivalCalibrationDefaultData,
} from '@/components/hotel/checkout/ArrivalSensoryCalibrationSection';

// Phase 4: Geographic Coordinates, Transit Guide & Dedicated Concierge Desk
import { ArrivalCoordinatesAndConciergeSection } from '@/components/hotel/checkout/ArrivalCoordinatesAndConciergeSection';
import {
	ArrivalCoordinatesData,
	arrivalCoordinatesDefaultData,
} from '@/components/hotel/checkout/ArrivalCoordinatesAndConciergeSection';

export interface ConfirmationPageProps {
	heroData?: ConfirmationHeroData;
	voucherData?: SovereignVoucherCardData;
	calibrationData?: ArrivalCalibrationData;
	coordinatesData?: ArrivalCoordinatesData;
	className?: string;
}

export function ConfirmationPage({
	heroData = confirmationHeroDefaultData,
	voucherData = sovereignVoucherDefaultData,
	calibrationData = arrivalCalibrationDefaultData,
	coordinatesData = arrivalCoordinatesDefaultData,
	className = '',
}: ConfirmationPageProps) {
	// 1. Sensory & Arrival Preferences State (Phase 3)
	const [arrivalPreferences, setArrivalPreferences] =
		useState<ArrivalCalibrationValues>({
			beverageId: calibrationData.defaultBeverageId,
			olfactoryId: calibrationData.defaultOlfactoryId,
			harborId: calibrationData.defaultHarborId,
			timeSlotId: calibrationData.defaultTimeSlotId,
		});

	// 2. Interactive Handlers for Phase 1 (Digital Wallet & Documents)
	const handleAddToWallet = () => {
		console.log(
			'Downloading Apple Wallet cryptographic pass (.pkpass)...',
			heroData.appleWalletPassUrl,
		);
		window.open(heroData.appleWalletPassUrl, '_blank');
	};

	const handleDownloadItineraryPdf = () => {
		console.log(
			'Generating high-resolution official itinerary PDF...',
			heroData.itineraryPdfUrl,
		);
		window.open(heroData.itineraryPdfUrl, '_blank');
	};

	const handleSyncCalendar = () => {
		console.log(
			'Dispatching iCalendar (.ics) stay horizon file...',
			heroData.calendarIcsUrl,
		);
		window.open(heroData.calendarIcsUrl, '_blank');
	};

	const handlePrintFolio = () => {
		window.print();
	};

	// 3. Interactive Handlers for Phase 2 (Voucher & VAT Invoice)
	const handleViewInvoice = () => {
		console.log(
			'Opening official VAT invoice modal dialog:',
			voucherData.accounting.vatInvoiceNumber,
		);
		alert(
			`Accessing Official VAT Folio: ${voucherData.accounting.vatInvoiceNumber}`,
		);
	};

	// 4. Interactive Handlers for Phase 3 (Arrival Calibration Updates)
	const handleCalibrationChange = (updated: ArrivalCalibrationValues) => {
		setArrivalPreferences(updated);
		console.log(
			'Synchronized arrival sensory calibrations with guest profile:',
			updated,
		);
	};

	const handleConfirmTransfer = (finalValues: ArrivalCalibrationValues) => {
		console.log(
			'Confirmed maritime tender booking with Positano slipway master:',
			finalValues,
		);
		alert(
			`Maritime tender rendezvous confirmed at ${finalValues.timeSlotId.toUpperCase()} from harbor slip.`,
		);
	};

	// 5. Interactive Handlers for Phase 4 (Concierge Telephony & Transit)
	const handleCallConcierge = () => {
		console.log('Connecting hotline to Head Majordomo Matteo de Luca');
	};

	const handleEmailConcierge = () => {
		console.log('Dispatching encrypted email to concierge desk');
	};

	return (
		<div
			className={`min-h-screen bg-[#fcf9f4] text-[#1f1e1d] flex flex-col font-sans selection:bg-[#8e763b]/20 selection:text-[#1f1e1d] ${className}`}
		>


			{/* Master Content Workspace */}
			<main className="max-w-360 mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-16 sm:space-y-20 w-full flex-1">
				{/* Phase 1: Header, Verified Eyebrow, Panoramic Sanctuary & Action Strip */}
				<ConfirmationHeaderAndHero
					data={heroData}
					onAddToWallet={handleAddToWallet}
					onDownloadPdf={handleDownloadItineraryPdf}
					onSyncCalendar={handleSyncCalendar}
					onPrintFolio={handlePrintFolio}
				/>

				{/* Phase 2: The Sovereign Residence Voucher Card */}
				<SovereignVoucherCard
					data={voucherData}
					onViewInvoice={handleViewInvoice}
				/>

				{/* Phase 3: Tailor Your Arrival Experience (Sensory Calibrations & Riva Transfer) */}
				<ArrivalSensoryCalibrationSection
					data={calibrationData}
					onChange={handleCalibrationChange}
					onConfirmTransfer={handleConfirmTransfer}
				/>

				{/* Phase 4: Geographic Coordinates, Transit Guide & Dedicated Concierge Desk */}
				<ArrivalCoordinatesAndConciergeSection
					data={coordinatesData}
					onCallConcierge={handleCallConcierge}
					onEmailConcierge={handleEmailConcierge}
					onDownloadDirections={() =>
						window.open(
							coordinatesData.downloadDirectionsPdfUrl,
							'_blank',
						)
					}
					onOpenGoogleMaps={() =>
						window.open(
							coordinatesData.googleMapsDirectionsUrl,
							'_blank',
						)
					}
				/>

				{/* Return Navigation & Support Footer Callout */}
				<div className="pt-8 border-t border-[#eeeae2] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#78756d]">
					<div className="flex items-center gap-2">
						<span className="w-2 h-2 rounded-full bg-[#8e763b]" />
						<span>
							Aurelia Sanctuary Positano • All reservations secured under Sovereign Key Protocol.
						</span>
					</div>

					<div className="flex items-center gap-6">
						<Link
							href="/profile"
							className="text-[#1f1e1d] hover:text-[#8e763b] font-medium uppercase tracking-wider transition-colors"
						>
							Guest Profile & Sensory Portal →
						</Link>
						<Link
							href="/"
							className="text-[#1f1e1d] hover:text-[#8e763b] font-medium uppercase tracking-wider transition-colors"
						>
							Sanctuary Homepage
						</Link>
					</div>
				</div>
			</main>

			{/* Global Sanctuary Footer */}
			<Footer />
		</div>
	);
}

export default ConfirmationPage;
