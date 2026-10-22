import { Footer } from '@/components/layout/Footer';

// Phase 1: Cinematic Hero & Architectural Manifesto
import { HeritageHeroAndManifestoSection } from '@/components/hotel/heritage/HeritageHeroAndManifestoSection';
import { heritageHeroDefaultData } from '@/components/hotel/heritage/HeritageHeroAndManifestoSection';

// Phase 2: Three Pillars of Aurelia Craftsmanship
import { HeritageCraftsmanshipPillarsSection } from '@/components/hotel/heritage/HeritageCraftsmanshipPillarsSection'; //from '@/components/hotel/heritage/HeritageCraftsmanshipPillarsSection';
import { heritagePillarsDefaultData } from '@/components/hotel/heritage/HeritageCraftsmanshipPillarsSection';

// Phase 3: Precision in Stone & Sunlight & Environmental Stewardship
import { HeritageArchitecturalExcerptsSection } from '@/components/hotel/heritage/HeritageArchitecturalExcerptsSection';
import { heritageExcerptsDefaultData } from '@/components/hotel/heritage/HeritageArchitecturalExcerptsSection';

// Phase 4: The Aurelia Sanctuaries Timeline & Cartography Grid
import { HeritageSanctuariesTimelineSection } from '@/components/hotel/heritage/HeritageSanctuariesTimelineSection';
import { heritageTimelineDefaultData } from '@/components/hotel/heritage/HeritageSanctuariesTimelineSection';

// Phase 5: Sovereign Solitude Inquiries & Master Charter Ledger
import { HeritageCharterLedgerStrip } from '@/components/hotel/heritage/HeritageCharterLedgerStrip';
import { HeritageSovereignInquiryBanner } from '@/components/hotel/heritage/HeritageSovereignInquiryBanner';
import { heritageVipDefaultData } from '@/components/hotel/heritage/HeritageCharterLedgerStrip';

export interface HeritagePageProps {
	className?: string;
}

export function HeritagePage({ className = '' }: HeritagePageProps) {

	return (
		<div
			className={`min-h-screen bg-[#fcf9f4] text-[#1f1e1d] flex flex-col font-sans selection:bg-[#8e763b]/20 selection:text-[#1f1e1d] ${className}`}
		>

			{/* PHASE 1: Full-Bleed Cinematic Hero Monograph & Architectural Manifesto */}
			<HeritageHeroAndManifestoSection
				data={heritageHeroDefaultData}
			/>

			{/* Main Architectural Dossier Workspace */}
			<main className="w-full flex-1">
				{/* PHASE 2: Three Pillars of Aurelia Craftsmanship Bento Rail */}
				<HeritageCraftsmanshipPillarsSection
					data={heritagePillarsDefaultData}
				/>

				{/* PHASE 3: Precision in Stone & Sunlight & Environmental Stewardship */}
				<HeritageArchitecturalExcerptsSection
					data={heritageExcerptsDefaultData}
				/>

				{/* PHASE 4: The Aurelia Sanctuaries Chronological Timeline & Cartography Grid */}
				<HeritageSanctuariesTimelineSection
					data={heritageTimelineDefaultData}
				/>

				{/* PHASE 5A: Dark Monolithic Sovereign Solitude Buyout & Architectural Inquiry Card */}
				<HeritageSovereignInquiryBanner
					data={heritageVipDefaultData.inquiry}
				/>

				{/* PHASE 5B: Monolithic Charter Ratification & Archive Ledger Strip */}
				<HeritageCharterLedgerStrip
					data={heritageVipDefaultData.ledger}
				/>
			</main>

			{/* Global Sanctuary Footer */}
			<Footer />
		</div>
	);
}

export default HeritagePage;