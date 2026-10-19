'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProfileDossierHeader } from '@/components/hotel/profile/ProfileDossierHeader';
import { ProfileOlfactorySection } from '@/components/hotel/profile/ProfileOlfactorySection';
import { ProfileSleepAndEpicureanSection } from '@/components/hotel/profile/ProfileSleepAndEpicureanSection';
import { ProfileLogisticsRail } from '@/components/hotel/profile/ProfileLogisticsRail';
import {
	PatronDossierInfo,
	ProfileNavTabId,
	profileDossierDefaultData,
} from '@/components/hotel/profile/ProfileDossierHeader';
import {
	ProfileOlfactorySectionData,
	OlfactoryIntensityLevel,
	profileOlfactoryDefaultData,
} from '@/components/hotel/profile/ProfileOlfactorySection';
import {
	ProfileSleepAndEpicureanData,
	profileSleepDefaultData,
} from '@/components/hotel/profile/ProfileSleepAndEpicureanSection';
import {
	ProfileLogisticsData,
	profileLogisticsDefaultData,
} from '@/components/hotel/profile/ProfileLogisticsRail';

export interface ProfilePageProps {
	dossierData?: PatronDossierInfo;
	olfactoryData?: ProfileOlfactorySectionData;
	sleepData?: ProfileSleepAndEpicureanData;
	logisticsData?: ProfileLogisticsData;
	className?: string;
}

export function ProfilePage({
	dossierData = profileDossierDefaultData,
	olfactoryData = profileOlfactoryDefaultData,
	sleepData = profileSleepDefaultData,
	logisticsData = profileLogisticsDefaultData,
	className = '',
}: ProfilePageProps) {

	// setting year
	const [year, setYear] = useState<number | null>(null)
	
		useEffect(() => {
			setYear(new Date().getFullYear())
		})

	// 1. Interactive Navigation Tab State
	const [activeTab, setActiveTab] = useState<ProfileNavTabId>(
		'sensory-calibration'
	);

	// 2. Active Sensory Calibrations State
	const [selectedAromaId, setSelectedAromaId] = useState<string>(
		olfactoryData.activeComposition.id
	);
	const [vaporIntensity, setVaporIntensity] =
		useState<OlfactoryIntensityLevel>(25);
	const [atomizationActive, setAtomizationActive] =
		useState<boolean>(true);
	const [targetSleepTemp, setTargetSleepTemp] = useState<number>(
		sleepData.initialTargetTemperatureCelsius
	);

	// 3. Companion & Archive State
	const [companionList, setCompanionList] = useState(
		logisticsData.companions
	);
	const [showAddCompanionModal, setShowAddCompanionModal] =
		useState(false);
	const [newCompanionName, setNewCompanionName] = useState('');
	const [newCompanionRelationship, setNewCompanionRelationship] =
		useState('GUEST');

	// Tab Transition Router
	function handleTabChange(tabId: ProfileNavTabId) {
		setActiveTab(tabId);
	}

	// Direct Hotline Dispatch
	function handleContactMajordomo() {
		console.log(
			'Dispatching direct line to Senior Majordomo Matteo Bellini (+39 089 875 111)'
		);
		window.location.href = `tel:${dossierData.majordomo.phoneTel}`;
	}

	// Olfactory Handlers
	function handleSelectComposition(compositionId: string) {
		setSelectedAromaId(compositionId);
		console.log('Selected Suite Aroma Formulation:', compositionId);
	}

	function handleSelectIntensity(level: OlfactoryIntensityLevel) {
		setVaporIntensity(level);
		console.log('Calibrated Vapor Saturation Level:', `${level}%`);
	}

	function handleToggleAtomization(enabled: boolean) {
		setAtomizationActive(enabled);
		console.log(
			'Pre-Arrival Atomization Protocol:',
			enabled ? 'ENABLED' : 'SUSPENDED'
		);
	}

	// Sleep Temperature Stepper Handler
	function handleUpdateSleepTemperature(tempCelsius: number) {
		setTargetSleepTemp(tempCelsius);
		console.log(
			'Updated Geothermal Target Sleep Ambient:',
			`${tempCelsius}°C`
		);
	}

	// Companion Modals & State Handlers
	function handleOpenAddCompanion() {
		setShowAddCompanionModal(true);
	}

	function handleSaveCompanion(e: React.FormEvent) {
		e.preventDefault();

		if (!newCompanionName.trim()) return;

		const newEntry = {
			id: `comp-${Date.now()}`,
			fullName: newCompanionName.trim(),
			relationshipTag: newCompanionRelationship.toUpperCase(),
			clearanceLevel: 'Full Villa Access & Thermal Spa Privileges',
			avatarUrl: '/garden-pavillion.png',
			avatarAlt: `Portrait of companion ${newCompanionName}`,
		};

		setCompanionList([...companionList, newEntry]);
		setNewCompanionName('');
		setShowAddCompanionModal(false);
	}

	// Folio PDF Download Handler
	function handleDownloadFolioPdf(folioCode: string) {
		console.log('Downloading encrypted PDF ledger folio:', folioCode);
	}

	// Master Transmit to Majordomo State Synchronizer
	function handleTransmitToMajordomo() {
		console.log(
			'Transmitting Calibrations to Majordomo Matteo Bellini:',
			{
				folio: dossierData.folioNumber,
				patron: dossierData.fullName,
				roomAroma: selectedAromaId,
				vaporIntensity: `${vaporIntensity}%`,
				atomizationEnabled: atomizationActive,
				sleepTemperature: `${targetSleepTemp}°C`,
				companions: companionList.map(function (c) {
					return c.fullName;
				}),
			}
		);
	}

	return (
		<main
			className={`min-h-screen w-full bg-[#fcf9f4] text-[#1f1e1d] flex flex-col font-sans selection:bg-[#8e763b]/20 selection:text-[#1f1e1d] ${className}`}
		>
			{/* ============================================================= */}
			{/* PHASE 1: TOP GLOBAL NAV, PATRON DOSSIER & MAJORDOMO LOCKUP */}
			{/* ============================================================= */}
			<ProfileDossierHeader
				data={{
					...dossierData,
					activeTabId: activeTab,
				}}
				onTabChange={handleTabChange}
				onContactMajordomo={handleContactMajordomo}
			/>

			{/* ============================================================= */}
			{/* MAIN SPLIT PROFILE WORKSPACE */}
			{/* ============================================================= */}
			<div className="max-w-360 mx-auto w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-12 flex-1">
				{activeTab === 'sensory-calibration' && (
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
						{/* LEFT COLUMN: PRIMARY CALIBRATIONS (8 cols) */}
						<div className="lg:col-span-8 space-y-10 lg:space-y-12">
							{/* PHASE 2: Section 01 — Atmosphere & Olfactory Calibration */}
							<ProfileOlfactorySection
								data={olfactoryData}
								onSelectComposition={handleSelectComposition}
								onSelectIntensity={handleSelectIntensity}
								onToggleAtomizationProtocol={
									handleToggleAtomization
								}
							/>

							{/* PHASE 3: Section 02 (Sleep Architecture) & Section 03 (Epicurean Staging) */}
							<ProfileSleepAndEpicureanSection
								data={sleepData}
								onUpdateSleepTemperature={
									handleUpdateSleepTemperature
								}
								onToggleCircadianAutomation={function (
									id,
									enabled
								) {
									console.log(
										'Toggled Circadian Automation:',
										id,
										enabled
									);
								}}
								onCustomizeEpicureanItem={function (itemId) {
									console.log(
										'Modifying Epicurean Staging Instruction:',
										itemId
									);
								}}
							/>
						</div>

						{/* RIGHT COLUMN: LOGISTICS RAIL (4 cols sticky) */}
						<div className="lg:col-span-4 sticky top-6 lg:top-8">
							<ProfileLogisticsRail
								data={{
									...logisticsData,
									companions: companionList,
								}}
								onTransmitToMajordomo={
									handleTransmitToMajordomo
								}
								onAddCompanion={handleOpenAddCompanion}
								onDownloadFolioPdf={handleDownloadFolioPdf}
							/>
						</div>
					</div>
				)}

				{/* TAB 2: UPCOMING STAYS & ITINERARIES VIEW */}
				{activeTab === 'upcoming-stays' && (
					<section className="bg-white border border-[#ded9ce] rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
						<div className="border-b border-[#eeeae2] pb-4">
							<span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8e763b] font-semibold block">
								ACTIVE SANCTUARY CONFIRMATION • 1 UPCOMING
							</span>
							<h2 className="font-serif text-3xl font-normal text-[#1f1e1d] mt-1">
								Aurelia Sanctuary Positano — Villa Il Sogno
							</h2>
							<p className="text-xs text-[#78756d] font-sans font-light mt-1">
								Master Ocean Suite 402 • Sept 28 — Oct 05,
								2025 (7 Nights Horizon)
							</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
							<div className="p-4 rounded-2xl bg-[#fcf9f4] border border-[#ded9ce] space-y-1">
								<span className="text-[9px] font-mono uppercase text-[#8e763b] block">
									CHAUFFEUR
								</span>
								<span className="font-semibold text-[#1f1e1d] block">
									Maybach S680 Dispatch
								</span>
								<p className="text-[11px] text-[#6d6961]">
									Naples Heliport Rendezvous
								</p>
							</div>

							<div className="p-4 rounded-2xl bg-[#fcf9f4] border border-[#ded9ce] space-y-1">
								<span className="text-[9px] font-mono uppercase text-[#8e763b] block">
									SANCTUARY ACCESS
								</span>
								<span className="font-semibold text-[#1f1e1d] block">
									Keyless Sovereign Folio
								</span>
								<p className="text-[11px] text-[#6d6961]">
									Biometric NFC Door Folio
								</p>
							</div>

							<div className="p-4 rounded-2xl bg-[#fcf9f4] border border-[#ded9ce] space-y-1">
								<span className="text-[9px] font-mono uppercase text-[#8e763b] block">
									ATTENDING HOST
								</span>
								<span className="font-semibold text-[#1f1e1d] block">
									Matteo Bellini
								</span>
								<p className="text-[11px] text-[#6d6961]">
									Senior Majordomo &amp; Sommelier
								</p>
							</div>
						</div>

						<div className="pt-4 flex items-center justify-between">
							<Link
								href="/confirmation?bookingRef=AUR-8911-POS"
								className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
							>
								<span>VIEW MASTER DIGITAL ITINERARY PASS</span>
								<span>→</span>
							</Link>

							<button
								type="button"
								onClick={function () {
									setActiveTab('sensory-calibration');
								}}
								className="text-xs font-sans text-[#8e763b] hover:text-[#1f1e1d] underline"
							>
								← Calibrate In-Suite Sensory Details
							</button>
						</div>
					</section>
				)}

				{/* TAB 3: PRIVATE CELLAR ALLOCATIONS VIEW */}
				{activeTab === 'cellar-allocations' && (
					<section className="bg-white border border-[#ded9ce] rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
						<div className="border-b border-[#eeeae2] pb-4">
							<span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8e763b] font-semibold block">
								SUBTERRANEAN VOLCANIC VAULT ALLOCATION • 6 CRUS HELD
							</span>
							<h2 className="font-serif text-3xl font-normal text-[#1f1e1d] mt-1">
								Private Sommelier Cellar Reserves
							</h2>
							<p className="text-xs text-[#78756d] font-sans font-light mt-1">
								Vintages stored at invariant 14.5°C in volcanic
								ash vaults, reserved for Lady Katherine V.
								Beaumont.
							</p>
						</div>

						<div className="space-y-3">
							{[
								{
									cru: "2016 Tenuta dell'Ornellaia Bolgheri Superiore",
									bottles: '2 Bottles',
									vault: 'Vault Shelf #AUR-ORN-16',
									status: 'STAGED FOR ARRIVAL',
								},
								{
									cru: '2015 Domaine de la Romanée-Conti Échézeaux Grand Cru',
									bottles: '1 Bottle',
									vault: 'Vault Shelf #AUR-DRC-15',
									status: 'HELD IN BOND',
								},
								{
									cru: '2008 Dom Pérignon Rosé Vintage Brut',
									bottles: '3 Bottles',
									vault: 'Vault Shelf #AUR-DOM-08',
									status: 'HELD IN BOND',
								},
							].map(function (wine, idx) {
								return (
									<div
										key={idx}
										className="p-4 rounded-2xl bg-[#fcf9f4] border border-[#ded9ce] flex items-center justify-between text-xs font-sans"
									>
										<div className="space-y-0.5">
											<h4 className="font-serif text-sm font-semibold text-[#1f1e1d]">
												{wine.cru}
											</h4>
											<p className="text-[11px] text-[#78756d] font-light">
												{wine.bottles} • {wine.vault}
											</p>
										</div>

										<span className="px-3 py-1 rounded-sm bg-[#f6f2ea] border border-[#ded9ce] text-[9px] font-mono uppercase text-[#8e763b] font-semibold">
											{wine.status}
										</span>
									</div>
								);
							})}
						</div>
					</section>
				)}

				{/* TAB 4: CONFIDENTIAL ACCESS & SECURITY PROTOCOLS */}
				{activeTab === 'security-access' && (
					<section className="bg-white border border-[#ded9ce] rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
						<div className="border-b border-[#eeeae2] pb-4">
							<span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8e763b] font-semibold block">
								SWISS DATA CONFIDENTIALITY PROTOCOL LEVEL IV
							</span>
							<h2 className="font-serif text-3xl font-normal text-[#1f1e1d] mt-1">
								Cryptographic Security &amp; Verbal Credentials
							</h2>
							<p className="text-xs text-[#78756d] font-sans font-light mt-1">
								Manage high-assurance telephone verbal PINs and
								keyless hardware clearances.
							</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
							<div className="p-5 rounded-2xl bg-[#fcf9f4] border border-[#ded9ce] space-y-2">
								<span className="text-[9px] font-mono uppercase text-[#8e763b] block font-semibold">
									VERBAL CONCIERGE PIN
								</span>
								<div className="font-mono text-xl tracking-[0.25em] text-[#1f1e1d]">
									8 8 2 9
								</div>
								<p className="text-[11px] text-[#6e6b64]">
									Required for authorized Riva charters,
									helicopter flight plans, and cellar
									releases.
								</p>
							</div>

							<div className="p-5 rounded-2xl bg-[#fcf9f4] border border-[#ded9ce] space-y-2">
								<span className="text-[9px] font-mono uppercase text-[#8e763b] block font-semibold">
									BIOMETRIC PASSKEY STATUS
								</span>
								<div className="text-sm font-serif text-[#24633b] font-semibold">
									✓ Apple Sovereign ID Active
								</div>
								<p className="text-[11px] text-[#6e6b64]">
									Bound to Secure Enclave hardware token
									#SE-8911-Beaumont.
								</p>
							</div>
						</div>
					</section>
				)}
			</div>

			{/* ============================================================= */}
			{/* ADD COMPANION MODAL DIALOG */}
			{/* ============================================================= */}
			{showAddCompanionModal && (
				<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
					<div className="bg-[#fcf9f4] border border-[#ded9ce] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 text-[#1f1e1d]">
						<div className="border-b border-[#eeeae2] pb-3">
							<span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8e763b] font-semibold block">
								DISCRETION PROTOCOL ALPHA
							</span>
							<h3 className="font-serif text-xl font-normal text-[#1f1e1d] mt-1">
								Register Verified Companion
							</h3>
						</div>

						<form
							onSubmit={handleSaveCompanion}
							className="space-y-4 text-xs font-sans"
						>
							<div className="space-y-1">
								<label className="block text-[10px] font-mono uppercase tracking-wider text-[#6d6961]">
									Full Legal Name
								</label>
								<input
									type="text"
									required
									value={newCompanionName}
									onChange={function (e) {
										setNewCompanionName(e.target.value);
									}}
									placeholder="e.g. Lord Arthur Beaumont"
									className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#ded9ce] text-xs outline-none focus:border-[#8e763b]"
								/>
							</div>

							<div className="space-y-1">
								<label className="block text-[10px] font-mono uppercase tracking-wider text-[#6d6961]">
									Clearance Relationship
								</label>
								<select
									value={newCompanionRelationship}
									onChange={function (e) {
										setNewCompanionRelationship(
											e.target.value
										);
									}}
									className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#ded9ce] text-xs outline-none focus:border-[#8e763b]"
								>
									<option value="SPOUSE">
										Spouse • Full Villa &amp; Thermal Spa
										Access
									</option>
									<option value="FAMILY">
										Family Member • Standard Residence
										Access
									</option>
									<option value="ATTACHÉ">
										Personal Attaché / Private Valet •
										Service Clearance
									</option>
								</select>
							</div>

							<div className="pt-2 flex items-center justify-end gap-3">
								<button
									type="button"
									onClick={function () {
										setShowAddCompanionModal(false);
									}}
									className="px-4 py-2 rounded-xl bg-white border border-[#ded9ce] text-[#78756d] hover:text-[#1f1e1d]"
								>
									Cancel
								</button>

								<button
									type="submit"
									className="px-5 py-2 rounded-xl bg-[#1f1e1d] text-white font-semibold uppercase tracking-wider text-[10px]"
								>
									Inscribe Companion
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* ============================================================= */}
			{/* BOTTOM SOVEREIGN FOOTER PROTOCOL STRIP */}
			{/* ============================================================= */}
			<footer className="w-full bg-[#181716] text-[#dcdad5] border-t border-[#2e2c29] py-8 px-4 sm:px-8 lg:px-12 text-[10px] font-sans">
				<div className="max-w-360 mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
					<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
						<span className="text-[#8e763b] font-semibold tracking-widest uppercase">
							AURELIA SOVEREIGN CONCIERGE
						</span>
						<span className="hidden sm:inline text-white/20">
							•
						</span>
						<span className="text-white/60">
							© {year} Aurelia Hotels &
							Residences S.p.A. All rights reserved.
						</span>
					</div>

					<div className="flex items-center gap-6 uppercase tracking-wider text-[9px] text-[#a4a098]">
						<Link
							href="/not-found"
							className="hover:text-white transition-colors"
						>
							Privacy Mandate
						</Link>
						<Link
							href="/not-found"
							className="hover:text-white transition-colors"
						>
							Terms of Residence
						</Link>
						<a
							href={`tel:${dossierData.majordomo.phoneTel}`}
							className="text-[#8e763b] hover:text-white transition-colors"
						>
							Majordomo Hotline (
							{dossierData.majordomo.phoneDisplay})
						</a>
					</div>
				</div>
			</footer>
		</main>
	);
}

export default ProfilePage;