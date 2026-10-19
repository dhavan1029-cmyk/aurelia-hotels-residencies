'use client';

import { useState } from 'react';

export type OlfactoryIntensityLevel = 10 | 25 | 50 | 75;

export interface OlfactoryFormulaNotes {
	top: string;
	heart: string;
	base: string;
}

export interface SignatureAromaComposition {
	id: string;
	reserveCode: string;
	title: string;
	terroir: string;
	summary: string;
	notes: OlfactoryFormulaNotes;
	isPrimaryActive?: boolean;
}

export interface VaporIntensityTier {
	level: OlfactoryIntensityLevel;
	label: string;
	description: string;
	cycleSchedule: string;
}

export interface PreArrivalAtomizationNotice {
	countdownDisplay: string;
	leadTimeMinutes: number;
	arrivalLocation: string;
	attendantName: string;
	protocolText: string;
}

export interface ProfileOlfactorySectionData {
	sectionNumber: string;
	sectionEyebrow: string;
	statusBadge: string;
	heading: string;
	description: string;
	activeComposition: SignatureAromaComposition;
	intensityTiers: VaporIntensityTier[];
	alternativeCompositions: SignatureAromaComposition[];
	atomizationNotice: PreArrivalAtomizationNotice;
}

export const profileOlfactoryDefaultData: ProfileOlfactorySectionData = {
	sectionNumber: '01',
	sectionEyebrow: 'IN-SUITE AMBIANCE PROTOCOL',
	statusBadge: 'ACTIVE DIFFUSION PROFILE',
	heading: 'Atmosphere & Olfactory Calibration',
	description:
		'Aurelia sanctuaries feature bespoke subterranean cold-air nebulizers integrated invisibly into room stone joinery. Calibrate your sensory arrival scent profile below.',

	activeComposition: {
		id: 'amalfi-neroli-bergamot',
		reserveCode: 'ATELIER NO. 07',
		title: 'Amalfi Neroli, Fig Leaf & Wild Bergamot',
		terroir:
			'Positano Coastal Cliffside Harvest • Cold-Pressed Volcanic Extraction',
		summary:
			'A luminous opening of sun-drenched coastal citrus transitioning into verdant fig foliage and petrified cedarwood, formulated to evoke the morning sea breeze across travertine terraces.',
		notes: {
			top: 'Cold-Pressed Calabrian Bergamot Rind, Sea Salt Mist & Bitter Orange Petals',
			heart: 'Sun-Bleached Wild Green Fig Leaf, Coastal Neroli Blossom & Crushed Rosemary',
			base: 'Petrified Amalfi Cedarwood, Sun-Warmed Limestone Ashlar & Golden Ambergris',
		},
		isPrimaryActive: true,
	},

	intensityTiers: [
		{
			level: 10,
			label: 'Whisper (10%)',
			description:
				'Transient botanical trace. 3 minutes diffusion every 60 minutes.',
			cycleSchedule: 'Cycle: 3m ON / 57m OFF',
		},
		{
			level: 25,
			label: 'Subtle (25%)',
			description:
				'Aurelia master default. Elegant background presence without sensory fatigue.',
			cycleSchedule: 'Cycle: 5m ON / 25m OFF',
		},
		{
			level: 50,
			label: 'Ambient (50%)',
			description:
				'Enveloping botanical warmth across all interconnected salon chambers.',
			cycleSchedule: 'Cycle: 10m ON / 15m OFF',
		},
		{
			level: 75,
			label: 'Full Bloom (75%)',
			description:
				'Immediate deep olfactory immersion upon arrival and post-seawater bathing.',
			cycleSchedule: 'Cycle: 15m ON / 5m OFF',
		},
	],

	alternativeCompositions: [
		{
			id: 'tuscan-cypress-stone',
			reserveCode: 'RESERVE NO. 04',
			title: 'Tuscan Cypress & Warm Stone',
			terroir: 'San Gimignano Woodland & Tivoli Quarry Travertine',
			summary: 'Dry resinous heartwood, sun-baked earth, and wild rosemary.',
			notes: {
				top: 'Crushed Wild Rosemary & Florentine Lemon Peel',
				heart: 'Aged Tuscan Cypress Cones & Mountain Pine Resin',
				base: 'Honed Tivoli Travertine Ashlar & Smoked Cedar Heartwood',
			},
		},
		{
			id: 'kyoto-hinoki-shiso',
			reserveCode: 'RESERVE NO. 09',
			title: 'Kyoto Hinoki & Crisp Shiso',
			terroir: 'Higashiyama Bamboo Groves & Yoshino Cedar Spring',
			summary:
				'Meditative sacred cedar, mineral vapor, and cool crushed herbs.',
			notes: {
				top: 'Red Shiso Leaf, Morning Glacial Mist & White Peppercorn',
				heart: 'Japanese Hinoki Heartwood & Tamba River Pebble Vapor',
				base: 'Aged Vetiver Root, Sacred Incense Smoke & Dried Moss',
			},
		},
		{
			id: 'florentine-orris-cashmere',
			reserveCode: 'RESERVE NO. 12',
			title: 'Florentine Orris & Cashmere',
			terroir: 'Chianti Hills Aged Rhizome Atelier',
			summary:
				'Subtle powdery iris root, combed Italian wool, and amber resin.',
			notes: {
				top: 'Violet Leaf Infusion & Bitter Almond Kernel',
				heart: 'Five-Year Aged Florentine Orris Root & Wild Heliotrope',
				base: 'White Ambergris, Combed Cashmere Wool & Sandalwood Bark',
			},
		},
	],

	atomizationNotice: {
		countdownDisplay: 'T - 3.0 HOURS',
		leadTimeMinutes: 180,
		arrivalLocation: 'Positano Cliffside Helipad & Villa Il Sogno Portico',
		attendantName: 'Senior Majordomo Matteo Bellini',
		protocolText:
			'Ultrasonic cold diffusion commences precisely 180 minutes prior to your coordinates arrival to guarantee steady atmospheric saturation without airborne moisture residue.',
	},
};

export interface ProfileOlfactorySectionProps {
	data?: ProfileOlfactorySectionData;
	className?: string;
	onSelectComposition?: (compositionId: string) => void;
	onSelectIntensity?: (level: OlfactoryIntensityLevel) => void;
	onToggleAtomizationProtocol?: (enabled: boolean) => void;
}

export function ProfileOlfactorySection({
	data = profileOlfactoryDefaultData,
	className = '',
	onSelectComposition,
	onSelectIntensity,
	onToggleAtomizationProtocol,
}: ProfileOlfactorySectionProps) {
	const {
		sectionNumber,
		sectionEyebrow,
		statusBadge,
		heading,
		description,
		activeComposition,
		intensityTiers,
		alternativeCompositions,
		atomizationNotice,
	} = data;

	// Component Local Interactive State
	const [selectedAromaId, setSelectedAromaId] = useState<string>(
		activeComposition.id,
	);
	const [selectedIntensity, setSelectedIntensity] =
		useState<OlfactoryIntensityLevel>(25);
	const [isSpecsOpen, setIsSpecsOpen] = useState(false);
	const [atomizationActive, setAtomizationActive] = useState(true);

	function handleAromaClick(aromaId: string) {
		setSelectedAromaId(aromaId);

		if (onSelectComposition) {
			onSelectComposition(aromaId);
		}
	}

	function handleIntensityClick(level: OlfactoryIntensityLevel) {
		setSelectedIntensity(level);

		if (onSelectIntensity) {
			onSelectIntensity(level);
		}
	}

	function handleAtomizationToggle() {
		const nextState = !atomizationActive;

		setAtomizationActive(nextState);

		if (onToggleAtomizationProtocol) {
			onToggleAtomizationProtocol(nextState);
		}
	}

	// Find currently active aroma data object
	const currentAroma =
		selectedAromaId === activeComposition.id
			? activeComposition
			: alternativeCompositions.find(function (composition) {
					return composition.id === selectedAromaId;
				}) || activeComposition;

	return (
		<section
			id="olfactory-calibration"
			className={`w-full bg-[#fcf9f4] border border-[#e8e4dc] rounded-3xl p-6 sm:p-9 lg:p-11 shadow-[0_4px_24px_rgba(31,30,29,0.03)] space-y-8 lg:space-y-10 ${className}`}
		>
			{/* ------------------------------------------------------------- */}
			{/* 1. SECTION EDITORIAL HEADER & PROTOCOL STATUS BADGES */}
			{/* ------------------------------------------------------------- */}

			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#eeeae2]">
				<div className="space-y-1.5">
					<div className="flex items-center gap-2">
						<span className="w-5 h-5 rounded-full bg-[#1f1e1d] text-white flex items-center justify-center font-mono text-[10px] font-semibold">
							{sectionNumber}
						</span>

						<span className="text-[10px] font-sans font-semibold uppercase tracking-[0.24em] text-[#8e763b]">
							{sectionEyebrow}
						</span>
					</div>

					<h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#1f1e1d] tracking-tight leading-[1.12]">
						{heading}
					</h2>

					<p className="text-xs sm:text-[13px] text-[#636058] font-sans font-light leading-relaxed max-w-2xl">
						{description}
					</p>
				</div>

				<div className="self-start sm:self-auto shrink-0">
					<span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f6f2ea] border border-[#ded9ce] text-[9px] font-mono uppercase tracking-[0.2em] text-[#24633b] shadow-2xs">
						<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
						<span>{statusBadge}</span>
					</span>
				</div>
			</div>

			{/* ------------------------------------------------------------- */}
			{/* 2. PRIMARY COMMISSIONED FORMULATION SHOWCASE CARD */}
			{/* ------------------------------------------------------------- */}

			<article className="bg-[#f6f2ea]/80 border border-[#ded9ce] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs relative overflow-hidden">
				<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<span className="px-2.5 py-0.5 rounded-xs bg-[#1f1e1d] text-white text-[9px] font-mono uppercase tracking-[0.2em] shadow-2xs">
								{currentAroma.reserveCode}
							</span>

							<span className="text-[10px] font-sans font-medium uppercase tracking-[0.18em] text-[#8e763b]">
								{currentAroma.terroir}
							</span>
						</div>

						<h3 className="font-serif text-xl sm:text-2xl lg:text-[26px] font-normal text-[#1f1e1d] tracking-tight">
							{currentAroma.title}
						</h3>

						<p className="text-xs sm:text-[13px] text-[#55524b] font-sans font-light leading-relaxed max-w-2xl">
							{currentAroma.summary}
						</p>
					</div>

					<button
						type="button"
						onClick={function () {
							setIsSpecsOpen(!isSpecsOpen);
						}}
						className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#fcfaf7] border border-[#ded9ce] text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#1f1e1d] transition-colors shadow-2xs self-start sm:self-auto shrink-0"
					>
						<span>
							{isSpecsOpen ? 'CONCEAL FORMULA' : 'FORMULA SPECS'}
						</span>

						<span className="text-xs">
							{isSpecsOpen ? '↑' : '↓'}
						</span>
					</button>
				</div>

				{/* Botanical Notes Tri-Fold Architecture */}

				<div
					className={`grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-5 border-t border-[#ded9ce]/80 transition-all ${
						isSpecsOpen ? 'block' : 'block'
					}`}
				>
					{/* Top Note */}

					<div className="p-3.5 rounded-xl bg-white border border-[#ded9ce] shadow-2xs space-y-1">
						<span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8e763b] block">
							TOP HEAD NOTES
						</span>

						<p className="text-xs font-serif text-[#1f1e1d] leading-snug">
							{currentAroma.notes.top}
						</p>
					</div>

					{/* Heart Note */}

					<div className="p-3.5 rounded-xl bg-white border border-[#ded9ce] shadow-2xs space-y-1">
						<span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8e763b] block">
							HEART CORPOREAL
						</span>

						<p className="text-xs font-serif text-[#1f1e1d] leading-snug">
							{currentAroma.notes.heart}
						</p>
					</div>

					{/* Base Note */}

					<div className="p-3.5 rounded-xl bg-white border border-[#ded9ce] shadow-2xs space-y-1">
						<span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8e763b] block">
							BASE RESIN & STONE
						</span>

						<p className="text-xs font-serif text-[#1f1e1d] leading-snug">
							{currentAroma.notes.base}
						</p>
					</div>
				</div>
			</article>

			{/* ------------------------------------------------------------- */}
			{/* 3. VAPOR SATURATION DENSITY SCALE (INTERACTIVE 4-TIER) */}
			{/* ------------------------------------------------------------- */}

			<div className="space-y-4">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#eeeae2]">
					<div>
						<span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e763b] block">
							ULTRASONIC VAPOR SATURATION
						</span>

						<h4 className="font-serif text-lg sm:text-xl font-normal text-[#1f1e1d] tracking-tight">
							Diffusion Density & Micro-Nebulizer Cadence
						</h4>
					</div>

					<span className="text-[10px] font-mono text-[#8e8a82] uppercase tracking-wider">
						COLD AEROSOLIZATION • ZERO HEAT RESIDUE
					</span>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
					{intensityTiers.map(function (tier) {
						const isChosen = selectedIntensity === tier.level;

						return (
							<div
								key={tier.level}
								onClick={function () {
									handleIntensityClick(tier.level);
								}}
								className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 ${
									isChosen
										? 'bg-[#1f1e1d] text-white border-[#1f1e1d] shadow-md scale-[1.01]'
										: 'bg-white hover:bg-[#faf7f0] border-[#ded9ce] text-[#1f1e1d]'
								}`}
							>
								<div className="space-y-1">
									<div className="flex items-center justify-between">
										<span
											className={`font-mono text-[10px] font-semibold ${
												isChosen
													? 'text-[#bfa76f]'
													: 'text-[#8e763b]'
											}`}
										>
											{tier.level}% VOLUME
										</span>

										<span
											className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[9px] ${
												isChosen
													? 'border-[#bfa76f] bg-[#bfa76f] text-[#1f1e1d]'
													: 'border-[#ded9ce]'
											}`}
										>
											{isChosen ? '✓' : ''}
										</span>
									</div>

									<h5 className="font-serif text-sm font-semibold tracking-tight">
										{tier.label}
									</h5>

									<p
										className={`text-[11px] font-sans font-light leading-snug ${
											isChosen
												? 'text-white/80'
												: 'text-[#6e6b64]'
										}`}
									>
										{tier.description}
									</p>
								</div>

								<div
									className={`pt-2 border-t text-[9px] font-mono tracking-wider ${
										isChosen
											? 'border-white/15 text-[#dcdad5]'
											: 'border-[#eeeae2] text-[#8e8a82]'
									}`}
								>
									{tier.cycleSchedule}
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* ------------------------------------------------------------- */}
			{/* 4. ALTERNATIVE SIGNATURE COMPOSITIONS SELECTOR */}
			{/* ------------------------------------------------------------- */}

			<div className="space-y-4">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#eeeae2]">
					<div>
						<span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e763b] block">
							PORTFOLIO HARMONIES
						</span>

						<h4 className="font-serif text-lg sm:text-xl font-normal text-[#1f1e1d] tracking-tight">
							Alternative Curated Sanctuary Formulations
						</h4>
					</div>

					<span className="text-[10px] font-sans text-[#8e8a82]">
						Click to activate as arrival ambiance
					</span>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{/* Primary Option Card */}

					<div
						onClick={function () {
							handleAromaClick(activeComposition.id);
						}}
						className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
							selectedAromaId === activeComposition.id
								? 'bg-[#f7f2e7] border-[#8e763b] shadow-xs'
								: 'bg-white hover:bg-[#faf8f5] border-[#ded9ce]'
						}`}
					>
						<div className="space-y-1">
							<div className="flex items-center justify-between">
								<span className="text-[9px] font-mono text-[#8e763b] uppercase tracking-wider font-semibold">
									{activeComposition.reserveCode} • POSITANO
								</span>

								<span
									className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
										selectedAromaId === activeComposition.id
											? 'border-[#8e763b] bg-[#8e763b]'
											: 'border-[#ded9ce]'
									}`}
								>
									{selectedAromaId === activeComposition.id && (
										<span className="w-1.5 h-1.5 rounded-full bg-white" />
									)}
								</span>
							</div>

							<h5 className="font-serif text-sm font-semibold text-[#1f1e1d]">
								{activeComposition.title}
							</h5>

							<p className="text-[11px] font-sans text-[#6e6b64] font-light leading-snug line-clamp-2">
								{activeComposition.summary}
							</p>
						</div>

						<div className="pt-2 border-t border-[#ded9ce] flex items-center justify-between text-[9px] font-mono uppercase tracking-wider text-[#8e8a82]">
							<span>PRIMARY SELECTION</span>
							<span className="text-[#8e763b]">ACTIVE</span>
						</div>
					</div>

					{/* 3 Alternative Cards */}

					{alternativeCompositions.map(function (comp) {
						const isChosen = selectedAromaId === comp.id;

						return (
							<div
								key={comp.id}
								onClick={function () {
									handleAromaClick(comp.id);
								}}
								className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
									isChosen
										? 'bg-[#f7f2e7] border-[#8e763b] shadow-xs'
										: 'bg-white hover:bg-[#faf8f5] border-[#ded9ce]'
								}`}
							>
								<div className="space-y-1">
									<div className="flex items-center justify-between">
										<span className="text-[9px] font-mono text-[#8e763b] uppercase tracking-wider font-semibold">
											{comp.reserveCode}
										</span>

										<span
											className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
												isChosen
													? 'border-[#8e763b] bg-[#8e763b]'
													: 'border-[#ded9ce]'
											}`}
										>
											{isChosen && (
												<span className="w-1.5 h-1.5 rounded-full bg-white" />
											)}
										</span>
									</div>

									<h5 className="font-serif text-sm font-semibold text-[#1f1e1d]">
										{comp.title}
									</h5>

									<p className="text-[11px] font-sans text-[#6e6b64] font-light leading-snug line-clamp-2">
										{comp.summary}
									</p>
								</div>

								<div className="pt-2 border-t border-[#ded9ce] flex items-center justify-between text-[9px] font-mono uppercase tracking-wider text-[#8e8a82]">
									<span className="truncate pr-1">
										{comp.terroir}
									</span>

									<span className="text-[#8e763b] shrink-0">
										{isChosen ? 'CHOSEN' : 'SELECT'}
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* ------------------------------------------------------------- */}
			{/* 5. PRE-ARRIVAL ATOMIZATION SCHEDULE TICKER */}
			{/* ------------------------------------------------------------- */}

			<div className="bg-[#191817] text-[#fcf9f4] border border-[#34322e] rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-5">
				<div className="space-y-1.5 max-w-2xl">
					<div className="flex items-center gap-2">
						<span className="px-2.5 py-0.5 rounded-xs bg-[#8e763b] text-white font-mono text-[9px] font-semibold uppercase tracking-wider shadow-2xs">
							{atomizationNotice.countdownDisplay}
						</span>

						<span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#bfa76f]">
							PRE-ARRIVAL ATOMIZATION DISPATCH
						</span>
					</div>

					<p className="text-xs text-[#dcdad5] font-sans font-light leading-relaxed">
						{atomizationNotice.protocolText}
					</p>

					<div className="text-[10px] font-mono text-[#a4a098] pt-1">
						ATTENDING:{' '}
						<span className="text-white">
							{atomizationNotice.attendantName}
						</span>{' '}
						• COORDINATES:{' '}
						<span className="text-[#bfa76f]">
							{atomizationNotice.arrivalLocation}
						</span>
					</div>
				</div>

				<div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/10">
					<button
						type="button"
						onClick={handleAtomizationToggle}
						className={`px-4 py-2.5 rounded-xl font-sans text-[10px] font-semibold uppercase tracking-[0.18em] transition-all shadow-2xs ${
							atomizationActive
								? 'bg-[#bfa76f] hover:bg-[#aa935e] text-[#191817]'
								: 'bg-white/10 hover:bg-white/15 text-white border border-white/20'
						}`}
					>
						{atomizationActive
							? 'AUTOMATION ACTIVE ✓'
							: 'SUSPEND DIFFUSION'}
					</button>
				</div>
			</div>
		</section>
	);
}