'use client';
import { useRouter } from 'next/navigation';
import {
	HeritageSovereignInquiryData,
	heritageVipDefaultData,
} from './HeritageCharterLedgerStrip';

export interface HeritageSovereignInquiryBannerProps {
	data?: HeritageSovereignInquiryData;
	className?: string;
}

export function HeritageSovereignInquiryBanner({
	data = heritageVipDefaultData.inquiry,
	className = '',
}: HeritageSovereignInquiryBannerProps) {
	const {
		eyebrow,
		heading,
		description,
		curatorOfficeNotice,
		curatorHotlineDisplay,
		curatorHotlineTel,
		leadArchitectName,
		leadArchitectRole,
		primaryCtaLabel,
		secondaryCtaLabel,
		privatizationProtocols,
	} = data;

	const router = useRouter();
	
	// Sovereign Concierge Inquiries
	const handleRequestMonograph = () => {
		router.push('/checkout?inquiry=estate-monograph');
	};

	const handleConsultConcierge = () => {
		window.location.href = 'tel:+39089875000';
	};

	return (
		<section
			id="sovereign-inquiry"
			className={`w-full max-w-340 mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 ${className}`}
		>
			<div className="bg-[#191817] text-[#fcf9f4] border border-[#34322e] -lg p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
				{/* Subtle Radial Architectural Watermark */}
				<div
					className="absolute inset-0 opacity-[0.03] pointer-events-none"
					style={{
						backgroundImage:
							'radial-gradient(#bfa76f 1px, transparent 1px)',
						backgroundSize: '24px 24px',
					}}
				/>

				<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
					{/* Left Narrative Column (7 cols) */}
					<div className="lg:col-span-7 space-y-6">
						<div className="inline-flex items-center gap-2 px-3.5 py-1 -full bg-white/5 border border-white/10 text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.24em] text-[#bfa76f]">
							<span className="w-1.5 h-1.5 -full bg-[#bfa76f] animate-pulse" />
							<span>{eyebrow}</span>
						</div>

						<h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-white tracking-tight leading-[1.12]">
							{heading}
						</h2>

						<p className="text-xs sm:text-[13px] md:text-sm text-[#a4a098] font-sans font-light leading-relaxed max-w-xl">
							{description}
						</p>

						{/* 4 Architectural Privatization Protocol Highlights */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 border-t border-white/10 text-xs font-sans text-[#dcdad5]">
							{privatizationProtocols.map(function (item, idx) {
								return (
									<div
										key={idx}
										className="flex items-start gap-2.5"
									>
										<svg
											className="w-4 h-4 text-[#bfa76f] shrink-0 mt-0.5"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<polyline points="20 6 9 17 4 12" />
										</svg>

										<span className="font-light leading-relaxed">
											{item}
										</span>
									</div>
								);
							})}
						</div>
					</div>

					{/* Right Curatorial Desk Hotline & Action Card (5 cols) */}
					<div className="lg:col-span-5 bg-[#22201e] border border-[#3e3a35] -2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl">
						<div>
							<span className="block text-[9px] font-sans font-semibold uppercase tracking-[0.22em] text-[#bfa76f] mb-1">
								{curatorOfficeNotice}
							</span>

							<a
								href={`tel:${curatorHotlineTel}`}
								className="font-serif text-2xl sm:text-3xl font-normal text-white hover:text-[#bfa76f] transition-colors block tracking-tight"
							>
								{curatorHotlineDisplay}
							</a>

							<span className="text-[11px] text-[#8e8a82] font-sans mt-1 block">
								Liaison Desk: {leadArchitectName} ({leadArchitectRole})
							</span>
						</div>

						<div className="space-y-3 pt-4 border-t border-white/10">
							<button
								type="button"
								onClick={handleRequestMonograph}
								className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 -xl bg-[#bfa76f] hover:bg-[#aa935e] text-[#191817] font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all shadow-md active:translate-y-0.5 text-center group"
							>
								<span>{primaryCtaLabel}</span>

								<span className="transform transition-transform duration-300 group-hover:translate-x-1">
									→
								</span>
							</button>

							<button
								type="button"
								onClick={handleConsultConcierge}
								className="w-full inline-flex items-center justify-center px-6 py-3.5 -xl bg-transparent hover:bg-white/5 border border-white/20 text-white font-sans text-[10px] font-semibold uppercase tracking-[0.18em] transition-all text-center"
							>
								<span>{secondaryCtaLabel}</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}