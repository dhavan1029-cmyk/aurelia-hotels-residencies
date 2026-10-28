import Link from 'next/link';

import { Footer } from '@/components/layout/Footer';

// Phase 1: Header, Sanctuary Panorama & Digital Wallet Actions
import { ConfirmationHeaderAndHero } from '@/components/hotel/checkout/ConfirmationHeaderAndHero';
import {
	ConfirmationHeroData,
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
} from '@/components/hotel/checkout/ArrivalSensoryCalibrationSection';
import {
	ArrivalCalibrationData,
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
	voucherData = sovereignVoucherDefaultData,
	coordinatesData = arrivalCoordinatesDefaultData,
	className = '',
}: ConfirmationPageProps) {
	
	

	

	return (
		<div
			className={`min-h-screen bg-[#fcf9f4] text-[#1f1e1d] flex flex-col font-sans selection:bg-[#8e763b]/20 selection:text-[#1f1e1d] ${className}`}
		>


			{/* Master Content Workspace */}
			<main className="max-w-360 mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-16 sm:space-y-20 w-full flex-1">
				{/* Phase 1: Header, Verified Eyebrow, Panoramic Sanctuary & Action Strip */}
				<ConfirmationHeaderAndHero />

				{/* Phase 2: The Sovereign Residence Voucher Card */}
				<SovereignVoucherCard />

				{/* Phase 3: Tailor Your Arrival Experience (Sensory Calibrations & Riva Transfer) */}
				<ArrivalSensoryCalibrationSection />

				{/* Phase 4: Geographic Coordinates, Transit Guide & Dedicated Concierge Desk */}
				<ArrivalCoordinatesAndConciergeSection />

				{/* Return Navigation & Support Footer Callout */}
				<div className="pt-8 border-t border-[#eeeae2] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#78756d]">
					<div className="flex items-center gap-2">
						<span className="w-2 h-2 -full bg-[#8e763b]" />
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
