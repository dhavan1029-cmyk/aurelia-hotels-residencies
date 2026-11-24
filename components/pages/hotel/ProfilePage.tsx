'use client';

import React, { useState } from 'react';
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
} from '@/components/hotel/profile/ProfileOlfactorySection';
import {
    ProfileSleepAndEpicureanData,
    profileSleepDefaultData,
} from '@/components/hotel/profile/ProfileSleepAndEpicureanSection';
import {
    ProfileLogisticsData,
    profileLogisticsDefaultData,
} from '@/components/hotel/profile/ProfileLogisticsRail';
import { ProfileExtendedTabsViewModel } from '@/lib/hotel/mappers/profileDossierMapper';

export interface ProfilePageProps {
    dossierData: PatronDossierInfo;
    olfactoryData: ProfileOlfactorySectionData;
    sleepData: ProfileSleepAndEpicureanData;
    logisticsData: ProfileLogisticsData;
    extendedTabsData: ProfileExtendedTabsViewModel;
    className?: string;
}

export function ProfilePage({
    dossierData = profileDossierDefaultData,
    olfactoryData,
    sleepData = profileSleepDefaultData,
    logisticsData = profileLogisticsDefaultData,
    extendedTabsData,
    className = '',
}: ProfilePageProps) {
    const { upcomingStay, upcomingStays, cellarAllocations, securityData } = extendedTabsData;

    // Resolve list of all upcoming stays (array or fallback to single object)
    const allUpcomingStays =
        upcomingStays && upcomingStays.length > 0
            ? upcomingStays
            : upcomingStay
            ? [upcomingStay]
            : [];

    // setting year
    const year = new Date().getFullYear();

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
        sleepData.initialTargetTemperatureCelsius || 19.5
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

        setCompanionList((current) => [...current, newEntry]);
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

	// console.log(allUpcomingStays)

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

                {/* ============================================================= */}
                {/* TAB 2: UPCOMING STAYS & ITINERARIES VIEW (MULTI-STAY)         */}
                {/* ============================================================= */}
                {activeTab === 'upcoming-stays' && (
                    <section className="bg-white border border-[#ded9ce] p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
                        {allUpcomingStays.length > 0 ? (
                            <>
                                <div className="border-b border-[#eeeae2] pb-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                                    <div>
                                        <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8e763b] font-semibold block">
                                            ACTIVE SANCTUARY CONFIRMATION • {allUpcomingStays.length} {allUpcomingStays.length === 1 ? 'UPCOMING STAY' : 'UPCOMING STAYS'}
                                        </span>
                                        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1f1e1d] mt-1.5 tracking-tight">
                                            Upcoming Sanctuaries &amp; Itineraries
                                        </h2>
                                    </div>
                                    <span className="text-xs text-[#78756d] font-sans font-light">
                                        Synchronized with Private Majordomo Dispatch
                                    </span>
                                </div>

                                <div className="space-y-8">
                                    {allUpcomingStays.map(function (stay, index) {
                                        return (
                                            <article
                                                key={stay.bookingReference}
                                                className={`space-y-6 ${index > 0 ? 'pt-8 border-t border-[#eeeae2]' : ''}`}
                                            >
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-4 h-4 bg-[#1f1e1d] text-white flex items-center justify-center font-mono text-[9px] font-medium shrink-0">
                                                            {String(index + 1).padStart(2, '0')}
                                                        </span>
                                                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#8e763b] font-medium">
                                                            FOLIO #{stay.bookingReference} • {stay.enclaveLocation}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-serif text-2xl font-normal text-[#1f1e1d] mt-1 tracking-tight">
                                                        {stay.sanctuaryName}
                                                    </h3>
                                                    <p className="text-xs text-[#78756d] font-sans font-light mt-0.5">
                                                        {stay.suiteTitle} {stay.unitCode ? `(${stay.unitCode})` : ''} • {stay.dateRangeDisplay} ({stay.nightsCountDisplay})
                                                    </p>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
                                                    <div className="p-4 bg-[#fcf9f4] border border-[#ded9ce] space-y-1 shadow-2xs">
                                                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#8e763b] block font-semibold">
                                                            CHAUFFEUR &amp; TRANSFER
                                                        </span>
                                                        <span className="font-serif text-sm font-semibold text-[#1f1e1d] block">
                                                            {stay.chauffeurProtocol}
                                                        </span>
                                                        <p className="text-[11px] text-[#6d6961] font-light">
                                                            Naples Marina &amp; Heliport Rendezvous
                                                        </p>
                                                    </div>

                                                    <div className="p-4 bg-[#fcf9f4] border border-[#ded9ce] space-y-1 shadow-2xs">
                                                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#8e763b] block font-semibold">
                                                            SANCTUARY ACCESS
                                                        </span>
                                                        <span className="font-serif text-sm font-semibold text-[#1f1e1d] block">
                                                            {stay.sanctuaryAccessMethod}
                                                        </span>
                                                        <p className="text-[11px] text-[#6d6961] font-light">
                                                            Hardware &amp; Sea-Gate Slipway Clearance
                                                        </p>
                                                    </div>

                                                    <div className="p-4 bg-[#fcf9f4] border border-[#ded9ce] space-y-1 shadow-2xs">
                                                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#8e763b] block font-semibold">
                                                            ATTENDING HOST
                                                        </span>
                                                        <span className="font-serif text-sm font-semibold text-[#1f1e1d] block">
                                                            {stay.attendingHostName}
                                                        </span>
                                                        <p className="text-[11px] text-[#6d6961] font-light">
                                                            {stay.attendingHostRole}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                    <Link
                                                        href={`/confirmation?bookingRef=${encodeURIComponent(stay.bookingReference)}`}
                                                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-md active:translate-y-0.5"
                                                    >
                                                        <span>VIEW MASTER DIGITAL ITINERARY PASS</span>
                                                        <span>→</span>
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={function () {
                                                            setActiveTab('sensory-calibration');
                                                        }}
                                                        className="text-xs font-sans text-[#8e763b] hover:text-[#1f1e1d] underline transition-colors self-start sm:self-auto"
                                                    >
                                                        ← Calibrate In-Suite Sensory Details
                                                    </button>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            /* Empty state when patron has no upcoming stays */
                            <div className="p-8 text-center space-y-4">
                                <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#8e763b] font-semibold block">
                                    SOVEREIGN DOCKET CLEAR
                                </span>
                                <h3 className="font-serif text-2xl font-normal text-[#1f1e1d] tracking-tight">
                                    Awaiting Your Next Sanctuary Horizon
                                </h3>
                                <p className="text-xs text-[#6e6b64] font-sans font-light leading-relaxed max-w-md mx-auto">
                                    You currently hold no active sanctuary reservations. Explore unlisted oceanfront suites across Positano, St. Moritz, and Kyoto.
                                </p>
                                <div className="pt-2">
                                    <Link
                                        href="/accommodations"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-all"
                                    >
                                        <span>Explore Curated Sanctuaries</span>
                                        <span>→</span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* ============================================================= */}
                {/* TAB 3: PRIVATE CELLAR ALLOCATIONS VIEW                        */}
                {/* ============================================================= */}
                {activeTab === 'cellar-allocations' && (
                    <section className="bg-white border border-[#ded9ce] p-6 sm:p-10 lg:p-12 shadow-sm space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#eeeae2] pb-5">
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8e763b] font-semibold block">
                                    SUBTERRANEAN VOLCANIC VAULT ALLOCATION • {cellarAllocations.length} CRUS HELD
                                </span>
                                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1f1e1d] mt-1.5 tracking-tight">
                                    Private Sommelier Cellar Reserves
                                </h2>
                                <p className="text-xs text-[#78756d] font-sans font-light mt-1">
                                    Vintages stored at invariant 14.5°C in volcanic ash vaults, reserved for your exclusive allocation.
                                </p>
                            </div>

                            <span className="px-3 py-1 bg-[#f6f2ea] border border-[#ded9ce] text-[9px] font-mono uppercase tracking-wider text-[#8e763b] font-semibold shrink-0">
                                1,850 VAULT CRUS AVAILABLE
                            </span>
                        </div>

                        <div className="space-y-3">
                            {cellarAllocations.map(function (wine) {
                                return (
                                    <div
                                        key={wine.id}
                                        className="p-4 bg-[#fcf9f4] border border-[#ded9ce] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#8e763b]/60 transition-colors"
                                    >
                                        <div className="space-y-0.5">
                                            <h4 className="font-serif text-sm font-semibold text-[#1f1e1d]">
                                                {wine.cruName}
                                            </h4>
                                            <p className="text-[11px] text-[#78756d] font-sans font-light">
                                                {wine.quantityDisplay} • {wine.vaultLocation}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
                                            <span className="px-3 py-1 bg-white border border-[#ded9ce] text-[9px] font-mono uppercase text-[#8e763b] font-semibold">
                                                {wine.allocationStatus}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="pt-4 border-t border-[#eeeae2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans text-[#78756d]">
                            <span>Subterranean vault releases managed under Senior Sommelier Matteo Bellini.</span>
                            <a
                                href="tel:+39089875111"
                                className="text-[#8e763b] hover:text-[#1f1e1d] font-semibold uppercase tracking-wider underline text-[10px]"
                            >
                                Request Private Barrel Allocation →
                            </a>
                        </div>
                    </section>
                )}

                {/* ============================================================= */}
                {/* TAB 4: CONFIDENTIAL ACCESS & SECURITY PROTOCOLS               */}
                {/* ============================================================= */}
                {activeTab === 'security-access' && (
                    <section className="bg-white border border-[#ded9ce] p-6 sm:p-10 lg:p-12 shadow-sm space-y-6">
                        <div className="border-b border-[#eeeae2] pb-5">
                            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8e763b] font-semibold block">
                                {securityData.confidentialityLevel}
                            </span>
                            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1f1e1d] mt-1.5 tracking-tight">
                                Cryptographic Security &amp; Verbal Credentials
                            </h2>
                            <p className="text-xs text-[#78756d] font-sans font-light mt-1">
                                Manage high-assurance telephone verbal PINs and keyless hardware clearances.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                            <div className="p-5 bg-[#fcf9f4] border border-[#ded9ce] space-y-2.5 shadow-2xs">
                                <span className="text-[9px] font-mono uppercase text-[#8e763b] block font-semibold tracking-wider">
                                    VERBAL CONCIERGE TELEPHONE PIN
                                </span>
                                <div className="font-mono text-2xl tracking-[0.35em] text-[#1f1e1d] font-bold">
                                    {securityData.verbalConciergePin.split('').join(' ')}
                                </div>
                                <p className="text-[11px] text-[#6e6b64] font-light leading-relaxed">
                                    Required when requesting authorized Riva charters, helicopter flight corridors, or cellar releases over confidential estate telephone lines.
                                </p>
                            </div>

                            <div className="p-5 bg-[#fcf9f4] border border-[#ded9ce] space-y-2.5 shadow-2xs">
                                <span className="text-[9px] font-mono uppercase text-[#8e763b] block font-semibold tracking-wider">
                                    BIOMETRIC PASSKEY HARDWARE CLEARANCE
                                </span>
                                <div className="text-sm font-serif text-[#24633b] font-semibold flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#24633b]" />
                                    <span>{securityData.passkeyStatusText}</span>
                                </div>
                                <p className="text-[11px] text-[#6e6b64] font-light leading-relaxed">
                                    Authenticated token: <code className="font-mono text-[#1f1e1d]">{securityData.passkeyHardwareToken}</code>. Bound to Apple Secure Enclave &amp; FIDO2 WebAuthn standards.
                                </p>
                            </div>
                        </div>

                        <div className="p-4 bg-[#f6f2ea] border border-[#ded9ce] text-[11px] font-sans text-[#6e6b64] flex items-center gap-2">
                            <span className="text-[#8e763b] text-base leading-none">✦</span>
                            <span>All security records are encrypted with AES-256-GCM and governed by Swiss Federal Data Protection standards.</span>
                        </div>
                    </section>
                )}
            </div>

            {/* ============================================================= */}
            {/* ADD COMPANION MODAL DIALOG */}
            {/* ============================================================= */}
            {showAddCompanionModal && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#fcf9f4] border border-[#ded9ce] p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 text-[#1f1e1d]">
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
                                    className="w-full px-3.5 py-2.5 bg-white border border-[#ded9ce] text-xs outline-none focus:border-[#8e763b]"
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
                                    className="w-full px-3.5 py-2.5 bg-white border border-[#ded9ce] text-xs outline-none focus:border-[#8e763b]"
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
                                    className="px-4 py-2 bg-white border border-[#ded9ce] text-[#78756d] hover:text-[#1f1e1d]"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-[#1f1e1d] text-white font-semibold uppercase tracking-wider text-[10px]"
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
                            © {year} Aurelia Hotels &amp;
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

