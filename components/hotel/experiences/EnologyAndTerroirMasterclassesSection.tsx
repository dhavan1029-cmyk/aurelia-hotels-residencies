import Image from 'next/image';
import Link from 'next/link';

export interface MasterclassFeaturePill {
	iconType: 'vintage' | 'sommelier' | 'keepsake' | 'duration';
	label: string;
}

export interface EnologyExperienceCardData {
	id: string;
	slug: string;
	categoryBadge: string;
	curatorTag: string;
	title: string;
	tagline: string;
	narrative: string;
	tariffAmount: number;
	tariffUnit: string;
	currencySymbol: string;
	currencyCode: string;
	specs: MasterclassFeaturePill[];
	inclusionsSummary: string;
	primaryCtaLabel: string;
	secondaryCtaLabel: string;
	heroImageUrl: string;
	heroImageAlt: string;
}

export interface ExperiencesEnologySectionData {
	eyebrow: string;
	heading: string;
	description: string;
	curatorNote: string;
	experiences: [EnologyExperienceCardData, EnologyExperienceCardData];
}

export const experiencesEnologyDefaultData: ExperiencesEnologySectionData = {
	eyebrow: 'PRIVATE ENOLOGY & TERROIR',
	heading: 'Sanctuary Sommelier & Cellar Masterclasses',
	description:
		'Uncover the volcanic minerality and ancient agricultural soul of Campania through private cellar pours and cliff-terrace olive harvest walks.',
	curatorNote:
		'LED BY ESTATE HEAD SOMMELIER VALERIO GUZZI & MASTER AGRONOMIST',
	experiences: [
		{
			id: 'exp-barolo-vault-vertical',
			slug: 'subterranean-barolo-super-tuscan-vault',
			categoryBadge: 'CELLAR ARCHIVE • SOMMELIER DECK',
			curatorTag: 'LIMITED TO 6 GUESTS PER SEATING',
			title: 'Rare Barolo & Super Tuscan Vertical Vault Tasting',
			tagline:
				'Five Historic Cru Vintages in 400-Year-Old Chiseled Limestone Vaults',
			narrative:
				'Descend into the subterranean cellar cooled naturally by bedrock moisture. Head Sommelier Valerio Guzzi guides an intimate vertical exploration through rare museum reserves of Sassicaia, Masseto, and historic Monfortino Barolos, paired with 36-month cave-aged Pecorino and artisan truffles.',
			tariffAmount: 180,
			tariffUnit: 'per patron tasting',
			currencySymbol: '€',
			currencyCode: 'EUR',
			specs: [
				{
					iconType: 'duration',
					label: '120 Minutes',
				},
				{
					iconType: 'vintage',
					label: '5 Historic Vintages (1988–2016)',
				},
				{
					iconType: 'sommelier',
					label: 'Private Sommelier Masterclass',
				},
				{
					iconType: 'keepsake',
					label: 'Artisan Fromage & Truffle Flight',
				},
			],
			inclusionsSummary:
				'Includes Riedel Sommelier crystal service and bespoke cellar monograph keepsake.',
			primaryCtaLabel: 'INQUIRE FOR CELLAR PLACEMENT',
			secondaryCtaLabel: 'CELLAR DOSSIER →',
			heroImageUrl:
				'/limestone-villa.png',
			heroImageAlt:
				'Historic subterranean stone wine cellar vault with vintage bottles of Barolo, Riedel glasses, and sommelier',
		},
		{
			id: 'exp-olive-grove-harvest',
			slug: 'ancient-cliffside-olive-grove-harvest',
			categoryBadge: 'TERROIR AGRONOMY • GROVE HARVEST',
			curatorTag: 'CENTURY-OLD VOLCANIC SOIL',
			title: 'Cliffside Olive Grove Herb & Oil Masterclass',
			tagline:
				'Ancient Cultivar Pressings & Warm Hearth Stone Focaccia',
			narrative:
				'Stroll along centuries-old agricultural stone terraces perched high above the Mediterranean. Walk among 300-year-old gnarled olive trees alongside our resident agronomist, sampling freshly cold-pressed extra virgin oils infused with wild cliffside rosemary, wild thyme, and sea salt.',
			tariffAmount: 140,
			tariffUnit: 'per patron session',
			currencySymbol: '€',
			currencyCode: 'EUR',
			specs: [
				{
					iconType: 'duration',
					label: '90 Minutes',
				},
				{
					iconType: 'vintage',
					label: '4 Ancient Cultivars Pressed',
				},
				{
					iconType: 'sommelier',
					label: 'Master Agronomist Guided',
				},
				{
					iconType: 'keepsake',
					label: 'Monogrammed 500ml EVOO Bottle',
				},
			],
			inclusionsSummary:
				'Includes hearth-baked sourdough tasting and personalized wax-sealed harvest bottle.',
			primaryCtaLabel: 'RESERVE BOTANICAL SESSION',
			secondaryCtaLabel: 'TERROIR DOSSIER →',
			heroImageUrl:
				'/limestone-villa.png',
			heroImageAlt:
				'Sunny cliffside olive grove on the Amalfi Coast overlooking the Mediterranean with bottles of golden extra virgin olive oil',
		},
	],
};

export interface EnologyAndTerroirMasterclassesSectionProps {
	data?: ExperiencesEnologySectionData;
	onReserveMasterclass?: (experienceId: string) => void;
	onViewDossier?: (slug: string) => void;
	className?: string;
}

export function EnologyAndTerroirMasterclassesSection({
	data = experiencesEnologyDefaultData,
	className = '',
}: EnologyAndTerroirMasterclassesSectionProps) {
	const { eyebrow, heading, description, curatorNote, experiences } = data;

	const renderSpecIcon = (type: MasterclassFeaturePill['iconType']) => {
		switch (type) {
			case 'duration':
				return (
					<svg
						className="w-3.5 h-3.5 text-[#8e763b]"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.8"
					>
						<circle cx="12" cy="12" r="10" />
						<polyline points="12 6 12 12 16 14" />
					</svg>
				);

			case 'vintage':
				return (
					<svg
						className="w-3.5 h-3.5 text-[#8e763b]"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.8"
					>
						<path d="M8 22h8" />
						<path d="M12 11v11" />
						<path d="M19 3l-7 8-7-8h14z" />
					</svg>
				);

			case 'sommelier':
				return (
					<svg
						className="w-3.5 h-3.5 text-[#8e763b]"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.8"
					>
						<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
						<circle cx="9" cy="7" r="4" />
						<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
						<path d="M16 3.13a4 4 0 0 1 0 7.75" />
					</svg>
				);

			case 'keepsake':
				return (
					<svg
						className="w-3.5 h-3.5 text-[#8e763b]"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.8"
					>
						<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
					</svg>
				);

			default:
				return null;
		}
	};

	return (
		<section
			className={`w-full max-w-340 mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14 ${className}`}
		>
			{/* Section Header Monograph */}
			<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-8 sm:pb-10 border-b border-[#e8e4dc] mb-8 sm:mb-10">
				<div className="max-w-2xl">
					<span className="block text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8e763b] mb-2.5">
						{eyebrow}
					</span>

					<h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#1f1e1d] tracking-tight leading-[1.12]">
						{heading}
					</h2>

					<p className="mt-3 text-xs sm:text-[13px] md:text-sm text-[#5f5c56] font-sans font-light leading-relaxed">
						{description}
					</p>
				</div>

				<div className="shrink-0 self-start lg:self-auto">
					<span className="inline-flex items-center gap-2 px-3.5 py-1.5 -full bg-[#f6f2ea] border border-[#ded9ce] text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b] shadow-2xs">
						<span className="w-1.5 h-1.5 -full bg-[#8e763b]" />
						<span>{curatorNote}</span>
					</span>
				</div>
			</div>

			{/* Dual Compact Bento Masterclasses Grid (6 cols + 6 cols) */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
				{experiences.map(function (card) {
					return (
						<article
							key={card.id}
							className="bg-white border border-[#e8e4dc] -lg overflow-hidden shadow-[0_4px_24px_rgba(31,30,29,0.03)] hover:shadow-[0_16px_40px_rgba(31,30,29,0.08)] hover:border-[#8e763b]/40 transition-all duration-500 flex flex-col justify-between group"
						>
							{/* Card Media Container */}
							<div>
								<div className="relative aspect-16/10 w-full overflow-hidden bg-[#eeeae2]">
									<Image
										src={card.heroImageUrl}
										alt={card.heroImageAlt}
										fill
										sizes="(max-width: 1024px) 100vw, 50vw"
										className="object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105"
									/>

									<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

									{/* Top Left Badges */}
									<div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
										<span className="px-3 py-1 -sm bg-black/60 backdrop-blur-md text-white font-sans text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] shadow-sm">
											{card.categoryBadge}
										</span>

										<span className="px-2.5 py-1 -sm bg-white/90 backdrop-blur-md text-[#1f1e1d] font-sans text-[9px] font-semibold uppercase tracking-[0.16em] shadow-sm">
											{card.curatorTag}
										</span>
									</div>

									{/* Floating Bottom Right Tariff Badge */}
									<div className="absolute bottom-4 right-4 z-10 bg-white/95 backdrop-blur-md px-4 py-2 -xl shadow-md border border-[#e8e4dc] text-right">
										<div className="flex items-baseline gap-1">
											<span className="font-serif text-xl sm:text-2xl font-bold text-[#1f1e1d] leading-none">
												{card.currencySymbol}
												{card.tariffAmount.toLocaleString()}
											</span>

											<span className="text-[10px] font-sans text-[#78756d]">
												{card.tariffUnit}
											</span>
										</div>
									</div>
								</div>

								{/* Content Details Container */}
								<div className="p-6 sm:p-8">
									<span className="block text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b] mb-1.5">
										{card.tagline}
									</span>

									<h3 className="font-serif text-2xl sm:text-[26px] font-normal text-[#1f1e1d] tracking-tight leading-[1.2] group-hover:text-[#8e763b] transition-colors duration-300">
										{card.title}
									</h3>

									<p className="mt-3 text-xs sm:text-[13px] text-[#5f5c56] font-sans font-light leading-relaxed">
										{card.narrative}
									</p>

									{/* 4 Feature Specification Pills Grid */}
									<div className="grid grid-cols-2 gap-2.5 mt-6 pt-6 border-t border-[#f0ece3]">
										{card.specs.map(function (spec, idx) {
											return (
												<div
													key={idx}
													className="p-2.5 -xl bg-[#fcf9f4] border border-[#ded9ce] flex items-center gap-2 shadow-2xs"
												>
													<span className="p-1 -md bg-white border border-[#e8e4dc] shrink-0">
														{renderSpecIcon(spec.iconType)}
													</span>

													<span className="text-[11px] font-sans font-medium text-[#2c2a26] truncate">
														{spec.label}
													</span>
												</div>
											);
										})}
									</div>

									{/* Inclusions Annotation Footer */}
									<p className="mt-4 text-[11px] font-sans text-[#78756d] italic flex items-center gap-1.5">
										<span className="w-1.5 h-1.5 -full bg-[#8e763b] shrink-0" />
										<span>{card.inclusionsSummary}</span>
									</p>
								</div>
							</div>

							{/* Card Action Buttons Footer */}
							<div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#f0ece3] mt-2">
								<Link
									href={`/checkout?experience=${card.slug}`}
									className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 -xl bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all shadow-md active:translate-y-0.5 text-center group/btn"
								>
									<span>{card.primaryCtaLabel}</span>

									<span className="transform transition-transform duration-300 group-hover/btn:translate-x-1">
										→
									</span>
								</Link>
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
}
