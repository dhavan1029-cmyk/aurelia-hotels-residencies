'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DateRangeCalendar from './DateRangeCalendar';

export interface SanctuaryOption {
	id: string;
	name: string;
	locationSub: string;
	badge: string;
	coordinates: string;
}

export interface PatronPartyConfig {
	guestsCount: number;
	suitesCount: number;
	suiteTypeLabel: string;
}

export interface BookingBarData {
	defaultSanctuaryId: string;
	sanctuaries: SanctuaryOption[];
	defaultGuests: number;
	defaultSuites: number;
	defaultPromoCode: string;
	residentDiscountLabel: string;
	guaranteeNotice: string;
	privilegePills: string[];
}

export const bookingBarDefaultData: BookingBarData = {
	defaultSanctuaryId: 'amalfi-positano',
	sanctuaries: [
		{
			id: 'amalfi-positano',
			name: 'Aurelia Sanctuary Positano',
			locationSub: 'Amalfi Coast • Tyrrhenian Sea • Italy',
			badge: 'FLAGSHIP MONOLITH',
			coordinates: "40°37'40.2\"N • 14°29'05.4\"E",
		},
		{
			id: 'cap-d-antibes',
			name: "Aurelia Cap d'Antibes",
			locationSub: "Côte d'Azur • French Riviera • France",
			badge: 'COASTAL RESIDENCE',
			coordinates: "43°33'02.1\"N • 07°07'45.8\"E",
		},
		{
			id: 'st-moritz',
			name: 'Aurelia Engadin Alpine',
			locationSub: 'Upper Engadin Valley • St. Moritz • Switzerland',
			badge: 'ALPINE REFUGE',
			coordinates: "46°29'50.3\"N • 09°50'18.7\"E",
		},
		{
			id: 'kyoto-higashiyama',
			name: 'Aurelia Higashiyama Pavilions',
			locationSub: 'Historic Higashiyama • Kyoto • Japan',
			badge: 'CEDAR ONSEN',
			coordinates: "34°59'52.1\"N • 135°46'44.8\"E",
		},
	],
	defaultGuests: 2,
	defaultSuites: 1,
	defaultPromoCode: 'AURELIA-PRIVILEGE',
	residentDiscountLabel: '15% Sovereign Courtesy Applied',
	guaranteeNotice:
		'Direct Reservation Protocol: Guaranteed Sovereign Rate & Private Riva Slip Berth',
	privilegePills: [
		'Subterranean Roman Caldarium Access',
		'Centennial Citrus Orchard Breakfast Daily',
		'Dedicated 24/7 Majordomo Reception',
	],
};

export interface BookingBarProps {
	data?: BookingBarData;
	className?: string;
	onSearchSubmit?: (query: {
		sanctuary: string;
		checkIn: string;
		checkOut: string;
		guests: number;
		suites: number;
		memberCode: string;
	}) => void;
}

export function BookingBar({
	data = bookingBarDefaultData,
	className = '',
	onSearchSubmit,
}: BookingBarProps) {
	const router = useRouter();

	// 1. Core Booking State
	const [selectedSanctuaryId, setSelectedSanctuaryId] = useState<string>(
		data.defaultSanctuaryId
	);
	const [checkInDate, setCheckInDate] = useState<string>(
		'Check In'
	);
	const [checkOutDate, setCheckOutDate] = useState<string>(
		'Check Out'
	);
	const [adultsCount, setAdultsCount] = useState<number>(
		data.defaultGuests
	);
	const [suitesCount, setSuitesCount] = useState<number>(
		data.defaultSuites
	);
	const [memberCode, setMemberCode] = useState<string>(
		data.defaultPromoCode
	);

	// 2. Interactive Dropdown Visibility State
	const [activeDropdown, setActiveDropdown] = useState<
		'sanctuary' | 'stay-dates' | 'party' | 'privilege' | null
	>(null);

	const [isCalendarOpen, setIsCalendarOpen] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);

	// Close dropdowns on outside click
	useEffect(() => {
		function handleOutsideClick(event: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setActiveDropdown(null);
			}
		}

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	// Derived active sanctuary data
	const activeSanctuary =
		data.sanctuaries.find((s) => s.id === selectedSanctuaryId) ||
		data.sanctuaries[0];

	// Compute nights count
	function calculateNights(startStr: string, endStr: string): number {
		try {
			const start = new Date(startStr);
			const end = new Date(endStr);
			const diffTime = end.getTime() - start.getTime();
			const diffDays = Math.ceil(
				diffTime / (1000 * 60 * 60 * 24)
			);

			return diffDays > 0 ? diffDays : 1;
		} catch {
			return 5;
		}
	}

	const nightsCount = calculateNights(checkInDate, checkOutDate);

	// Format human-readable date display
	function formatDateDisplay(dateStr: string): string {
		try {

			if(dateStr === 'Check In' || dateStr === 'Check Out') return dateStr

			const [year, month, day] = dateStr.split('-');
			const months = [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec',
			];

			return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
		} catch {
			return dateStr;
		}
	}

	// Form submission handler
	function handleSearch(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if(checkInDate === 'Check In' || checkOutDate === 'Check Out') return

		if (onSearchSubmit) {
			onSearchSubmit({
				sanctuary: selectedSanctuaryId,
				checkIn: checkInDate,
				checkOut: checkOutDate,
				guests: adultsCount,
				suites: suitesCount,
				memberCode,
			});
		}

		router.push(
			`/accommodations?sanctuary=${encodeURIComponent(
				selectedSanctuaryId
			)}&checkIn=${encodeURIComponent(
				checkInDate
			)}&checkOut=${encodeURIComponent(
				checkOutDate
			)}&guests=${encodeURIComponent(
				adultsCount
			)}&suites=${encodeURIComponent(
				suitesCount
			)}&code=${encodeURIComponent(memberCode)}`
		);
	}

	return (
		<div
			ref={containerRef}
			className={`w-full max-w-340 mx-auto bg-white/95 backdrop-blur-xl border border-[#ded9ce] rounded-3xl shadow-[0_16px_48px_rgba(31,30,29,0.12)] p-4 sm:p-5 lg:p-6 transition-all duration-300 ${className}`}
		>
			<form onSubmit={handleSearch} className="space-y-4">
				{/* Master 5-Column Responsive Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-3.5 items-stretch">
					{/* 1. SANCTUARY DESTINATION (4 cols on Desktop) */}
					<div className="relative lg:col-span-3">
						<button
							type="button"
							onClick={() =>
								setActiveDropdown(
									activeDropdown === 'sanctuary'
										? null
										: 'sanctuary'
								)
							}
							className={`w-full h-full text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between group ${
								activeDropdown === 'sanctuary'
									? 'bg-[#f7f2e7] border-[#8e763b] shadow-xs'
									: 'bg-[#fcfaf7] hover:bg-[#f6f2ea] border-[#e8e4dc]'
							}`}
						>
							<div className="flex items-center justify-between w-full mb-1">
								<div className="flex items-center gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-[#8e763b]" />
									<span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e763b]">
										SANCTUARY ENCLAVE
									</span>
								</div>

								<span className="px-2 py-0.5 rounded-sm bg-white border border-[#ded9ce] text-[9px] font-mono uppercase tracking-wider text-[#78756d]">
									{activeSanctuary.badge}
								</span>
							</div>

							<div>
								<span className="font-serif text-lg sm:text-[19px] font-normal text-[#1f1e1d] block tracking-tight leading-snug truncate">
									{activeSanctuary.name}
								</span>
								<span className="block text-[11px] font-sans text-[#78756d] font-light mt-0.5 truncate">
									{activeSanctuary.locationSub}
								</span>
							</div>
						</button>

						{/* Dropdown Overlay: Sanctuary Select */}
						{activeDropdown === 'sanctuary' && (
							<div className="absolute top-[calc(100%+8px)] left-0 w-full sm:w-95 bg-white border border-[#ded9ce] rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
								<div className="px-3.5 py-2 border-b border-[#f0ece3] flex items-center justify-between">
									<span className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b]">
										SELECT MONOLITHIC ENCLAVE
									</span>
									<span className="text-[9px] font-mono text-[#a4a098]">
										4 SANCTUARIES
									</span>
								</div>

								<div className="space-y-1 mt-1 max-h-75 overflow-y-auto">
									{data.sanctuaries.map((sanc) => {
										const isSelected =
											sanc.id === selectedSanctuaryId;

										return (
											<div
												key={sanc.id}
												onClick={() => {
													setSelectedSanctuaryId(
														sanc.id
													);
													setActiveDropdown(null);
												}}
												className={`p-3 rounded-xl cursor-pointer transition-colors flex items-center justify-between ${
													isSelected
														? 'bg-[#f7f2e7] text-[#1f1e1d]'
														: 'hover:bg-[#fcfaf7] text-[#4a4742]'
												}`}
											>
												<div>
													<div className="flex items-center gap-2">
														<span className="font-serif text-sm font-medium text-[#1f1e1d]">
															{sanc.name}
														</span>

														{isSelected && (
															<span className="text-[#8e763b] text-xs">
																✓
															</span>
														)}
													</div>

													<span className="block text-[10px] font-sans text-[#78756d] mt-0.5">
														{sanc.locationSub}
													</span>
												</div>

												<span className="text-[9px] font-mono text-[#8e763b] shrink-0">
													{sanc.badge}
												</span>
											</div>
										);
									})}
								</div>
							</div>
						)}
					</div>

					{/* 2. STAY HORIZON / DATES (3 cols on Desktop) */}
					<div className="relative lg:col-span-3">
					    <button
					        type="button"
					        onClick={() => setIsCalendarOpen(prev => !prev)}
					        className="w-full h-full text-left p-4 rounded-2xl border bg-[#fcfaf7] hover:bg-[#f6f2ea] border-[#e8e4dc]"
					    >
					        <div className="flex items-center justify-between w-full mb-1">
					            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e763b]">
					                STAY HORIZON
					            </span>
					            <span className="px-2 py-0.5 rounded-sm bg-white border border-[#ded9ce] text-[9px] font-mono text-[#8e763b]">
					                {nightsCount} NIGHTS
					            </span>
					        </div>
					        <span className="font-serif text-base sm:text-[17px] font-normal text-[#1f1e1d] block tracking-tight truncate">
					            {formatDateDisplay(checkInDate)} — {formatDateDisplay(checkOutDate)}
					        </span>
					    </button>

					    {/* Calendar Popover */}
					    {isCalendarOpen && (
					        <div className="absolute top-[calc(100%+8px)] left-0 lg:left-0 sm:-left-75 md:-left-100 z-50">
					            <DateRangeCalendar
					                isOpen={isCalendarOpen}
					                onClose={() => setIsCalendarOpen(false)}
					                checkIn={checkInDate}
					                checkOut={checkOutDate}
					                onApplyDates={(range) => {
					                    setCheckInDate(range.checkIn);
					                    setCheckOutDate(range.checkOut);
					                }}
					                onClearDates={() => {
					                    setCheckInDate('');
					                    setCheckOutDate('');
					                }}
					            />
					        </div>
					    )}
					</div>


					{/* 3. PATRONS & SUITE COMPOSITION (2.5 cols on Desktop) */}
					<div className="relative lg:col-span-2">
						<button
							type="button"
							onClick={() =>
								setActiveDropdown(
									activeDropdown === 'party' ? null : 'party'
								)
							}
							className={`w-full h-full text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between group ${
								activeDropdown === 'party'
									? 'bg-[#f7f2e7] border-[#8e763b] shadow-xs'
									: 'bg-[#fcfaf7] hover:bg-[#f6f2ea] border-[#e8e4dc]'
							}`}
						>
							<div className="flex items-center justify-between w-full mb-1">
								<div className="flex items-center gap-1.5">
									<svg
										className="w-3.5 h-3.5 text-[#8e763b]"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.8"
									>
										<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
										<circle cx="9" cy="7" r="4" />
									</svg>

									<span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e763b]">
										PATRONS
									</span>
								</div>
							</div>

							<div>
								<span className="font-serif text-base sm:text-[17px] font-normal text-[#1f1e1d] block tracking-tight truncate">
									{adultsCount}{' '}
									{adultsCount === 1 ? 'Guest' : 'Guests'}
								</span>
								<span className="block text-[11px] font-sans text-[#78756d] font-light mt-0.5 truncate">
									{suitesCount}{' '}
									{suitesCount === 1 ? 'Suite' : 'Suites'} •
									Master King
								</span>
							</div>
						</button>

						{/* Dropdown Overlay: Steppers */}
						{activeDropdown === 'party' && (
							<div className="absolute top-[calc(100%+8px)] left-0 w-full sm:w-70 bg-white border border-[#ded9ce] rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-4">
								<div className="border-b border-[#f0ece3] pb-2">
									<span className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b]">
										PATRON PARTY COMPOSITION
									</span>
								</div>

								<div className="space-y-3">
									{/* Adults Stepper */}
									<div className="flex items-center justify-between">
										<div>
											<span className="font-serif text-sm text-[#1f1e1d] block">
												Adult Patrons
											</span>
											<span className="text-[10px] text-[#8e8a82]">
												Ages 16 and above
											</span>
										</div>

										<div className="flex items-center gap-2 bg-[#fcfaf7] border border-[#ded9ce] rounded-lg px-2 py-1">
											<button
												type="button"
												onClick={() =>
													setAdultsCount(
														Math.max(
															1,
															adultsCount - 1
														)
													)
												}
												className="w-6 h-6 rounded flex items-center justify-center text-sm font-semibold hover:bg-[#eeeae2]"
											>
												−
											</button>

											<span className="font-mono text-sm w-5 text-center">
												{adultsCount}
											</span>

											<button
												type="button"
												onClick={() =>
													setAdultsCount(
														Math.min(
															8,
															adultsCount + 1
														)
													)
												}
												className="w-6 h-6 rounded flex items-center justify-center text-sm font-semibold hover:bg-[#eeeae2]"
											>
												+
											</button>
										</div>
									</div>

									{/* Suites Count Stepper */}
									<div className="flex items-center justify-between">
										<div>
											<span className="font-serif text-sm text-[#1f1e1d] block">
												Chambers / Suites
											</span>
											<span className="text-[10px] text-[#8e8a82]">
												Allocated footprint
											</span>
										</div>

										<div className="flex items-center gap-2 bg-[#fcfaf7] border border-[#ded9ce] rounded-lg px-2 py-1">
											<button
												type="button"
												onClick={() =>
													setSuitesCount(
														Math.max(
															1,
															suitesCount - 1
														)
													)
												}
												className="w-6 h-6 rounded flex items-center justify-center text-sm font-semibold hover:bg-[#eeeae2]"
											>
												−
											</button>

											<span className="font-mono text-sm w-5 text-center">
												{suitesCount}
											</span>

											<button
												type="button"
												onClick={() =>
													setSuitesCount(
														Math.min(
															4,
															suitesCount + 1
														)
													)
												}
												className="w-6 h-6 rounded flex items-center justify-center text-sm font-semibold hover:bg-[#eeeae2]"
											>
												+
											</button>
										</div>
									</div>
								</div>

								<div className="pt-2 border-t border-[#f0ece3] flex justify-end">
									<button
										type="button"
										onClick={() => setActiveDropdown(null)}
										className="px-4 py-2 rounded-xl bg-[#1f1e1d] text-white text-[10px] font-sans font-semibold uppercase tracking-[0.2em] hover:bg-[#343230]"
									>
										Confirm Party
									</button>
								</div>
							</div>
						)}
					</div>

					{/* 4. SOVEREIGN PRIVILEGE CODE (1.5 cols on Desktop) */}
					<div className="relative lg:col-span-2">
						<div className="h-full p-4 rounded-2xl bg-[#fcfaf7] border border-[#e8e4dc] flex flex-col justify-between">
							<div className="flex items-center justify-between mb-1">
								<span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8e763b]">
									SOVEREIGN CODE
								</span>
								<span className="text-[#8e763b] text-xs">
									✦
								</span>
							</div>

							<div>
								<input
									type="text"
									value={memberCode}
									onChange={(e) =>
										setMemberCode(
											e.target.value.toUpperCase()
										)
									}
									placeholder="CODE"
									className="w-full bg-transparent font-mono text-xs sm:text-[13px] font-semibold text-[#1f1e1d] outline-none uppercase tracking-wider"
								/>

								<span className="block text-[10px] font-sans text-[#8e763b] font-medium mt-0.5 truncate">
									-15% Verified
								</span>
							</div>
						</div>
					</div>

					{/* 5. PRIMARY CTA BUTTON (1.5 cols on Desktop) */}
					<div className="sm:col-span-2 flex items-stretch">
						<button
							type="submit"
							className="w-full min-h-14.5 sm:min-h-16 rounded-2xl bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-[11px] font-semibold uppercase tracking-[0.22em] transition-all shadow-md hover:shadow-lg active:translate-y-0.5 flex flex-col items-center justify-center gap-1 group text-center"
						>
							<span className="flex items-center gap-2">
								<span>Check Rates</span>
								<span className="transform transition-transform duration-300 group-hover:translate-x-1">
									→
								</span>
							</span>

							<span className="text-[9px] font-sans font-light tracking-widest text-[#dcdad5]/80 lowercase">
								direct guarantee
							</span>
						</button>
					</div>
				</div>

				{/* Sub-strip: Direct Reservation Privilege Protocol */}
				<div className="pt-3 border-t border-[#f0ece3] flex flex-col md:flex-row md:items-center justify-between gap-2.5 text-xs font-sans text-[#6e6b64]">
					<div className="flex items-center gap-2">
						<span className="p-1 rounded-full bg-[#f6f2ea] text-[#8e763b] shrink-0">
							<svg
								className="w-3.5 h-3.5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
								<polyline points="9 12 11 14 15 10" />
							</svg>
						</span>

						<span className="font-semibold text-[#1f1e1d]">
							Direct Sovereign Rate Protocol:
						</span>

						<span className="font-light">
							{data.residentDiscountLabel} • Guaranteed Direct
						</span>
					</div>

					<div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] font-sans uppercase tracking-wider text-[#8e8a82]">
						{data.privilegePills.map((pill, idx) => (
							<div
								key={idx}
								className="flex items-center gap-1.5"
							>
								<span className="w-1.5 h-1.5 rounded-full bg-[#8e763b]" />
								<span>{pill}</span>
							</div>
						))}
					</div>
				</div>
			</form>
		</div>
	);
}