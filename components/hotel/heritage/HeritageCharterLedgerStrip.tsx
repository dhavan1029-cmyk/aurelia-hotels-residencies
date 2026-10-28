'use client';

import Link from 'next/link';

export interface HeritageSovereignInquiryData {
	eyebrow: string;
	heading: string;
	description: string;
	curatorOfficeNotice: string;
	curatorHotlineDisplay: string;
	curatorHotlineTel: string;
	leadArchitectName: string;
	leadArchitectRole: string;
	primaryCtaLabel: string;
	secondaryCtaLabel: string;
	privatizationProtocols: string[];
}

export interface HeritageCharterLedgerData {
	charterSealCode: string;
	charterTitle: string;
	ratificationStatement: string;
	archiveCustodian: string;
	conservationGuild: string;
	downloadLabel: string;
	downloadHref: string;
}

export interface HeritageVipSectionData {
	inquiry: HeritageSovereignInquiryData;
	ledger: HeritageCharterLedgerData;
}

export const heritageVipDefaultData: HeritageVipSectionData = {
	inquiry: {
		eyebrow: 'EXCLUSIVE SOVEREIGN SOLITUDE',
		heading: 'Experience Monolithic Architecture in Absolute Solitude',
		description:
			'For whole-estate architectural privatizations, academic research monographs, or confidential private consultations with Lead Conservator Matteo Castiglione, our Curatorial Office provides sovereign arrangements.',
		curatorOfficeNotice:
			'STUDIO AURELIA CURATORIAL GUILD • CONSERVATION ARCHIVES',
		curatorHotlineDisplay: '+39 089 875 000',
		curatorHotlineTel: '+39089875000',
		leadArchitectName: 'Matteo Castiglione',
		leadArchitectRole:
			'Lead Architect & Historic Conservator • Studio Aurelia',
		primaryCtaLabel: 'REQUEST PRIVATE ESTATE MONOGRAPH',
		secondaryCtaLabel: 'CONSULT PATRON CONCIERGE',
		privatizationProtocols: [
			'Full enclave seasonal closure for uncompromised privacy',
			'Private architectural blueprint walking tours with Studio Aurelia',
			'Direct maritime Riva tender slipway and private helipad clearance',
			'Sovereign patron non-disclosure ratified under Italian heritage charter',
		],
	},
	ledger: {
		charterSealCode: 'CHARTER SEAL REF: AUR-MONOLITH-2021/2025',
		charterTitle:
			'The Monolithic Architectural Charter & Terroir Custodianship Protocol',
		ratificationStatement:
			'Ratified across Rome, Amalfi, St. Moritz, and Higashiyama. All structural interventions are pledged to minimum 200-year geological durability with zero synthetic polymers.',
		archiveCustodian: 'Matteo Castiglione • Archivist General',
		conservationGuild:
			'Istituto Nazionale di Archeologia e Conservazione Monumentale',
		downloadLabel: 'DOWNLOAD MONOLITHIC CHARTER (PDF • 14 MB)',
		downloadHref: '#charter-download',
	},
};

export interface HeritageCharterLedgerStripProps {
	data?: HeritageCharterLedgerData;
	className?: string;
}

export function HeritageCharterLedgerStrip({
	data = heritageVipDefaultData.ledger,
	className = '',
}: HeritageCharterLedgerStripProps) {
	const {
		charterSealCode,
		charterTitle,
		ratificationStatement,
		archiveCustodian,
		conservationGuild,
		downloadLabel,
		downloadHref,
	} = data;

	const handleDownloadCharter = () => {
		console.log('Downloading Aurelia Monolithic Architectural Charter (PDF)');
	};

	return (
		<section
			id="charter-ledger"
			className={`w-full bg-[#f4f0e6] border-t border-b border-[#e2ddd3] py-10 sm:py-14 px-4 sm:px-8 lg:px-12 text-[#1f1e1d] ${className}`}
		>
			<div className="max-w-340 mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-6">
				{/* Left: Seal & Ratification Statement */}
				<div className="max-w-3xl space-y-2">
					<div className="flex flex-wrap items-center gap-2.5">
						<span className="inline-flex items-center gap-1.5 px-3 py-1 -full bg-white border border-[#ded9ce] text-[9px] font-mono uppercase tracking-[0.2em] text-[#8e763b] shadow-2xs">
							<span className="w-1.5 h-1.5 -full bg-[#8e763b]" />
							<span>{charterSealCode}</span>
						</span>

						<span className="text-[10px] font-sans font-light text-[#78756d]">
							Custody of {archiveCustodian}
						</span>
					</div>

					<h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1f1e1d] tracking-tight">
						{charterTitle}
					</h3>

					<p className="text-xs text-[#5f5c56] font-sans font-light leading-relaxed">
						{ratificationStatement}
					</p>

					<span className="block text-[10px] font-mono text-[#8e8a82] uppercase tracking-wider pt-1">
						Ratified by {conservationGuild}
					</span>
				</div>

				{/* Right: Download Charter PDF Button */}
				<div className="shrink-0 self-start lg:self-center">
					<Link
						href={downloadHref}
						onClick={handleDownloadCharter}
						className="inline-flex items-center gap-2.5 px-6 py-4 -xl bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] transition-all shadow-md active:translate-y-0.5 whitespace-nowrap group"
					>
						<svg
							className="w-4 h-4 text-[#bfa76f] shrink-0"
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

						<span>{downloadLabel}</span>
					</Link>
				</div>
			</div>
		</section>
	);
}