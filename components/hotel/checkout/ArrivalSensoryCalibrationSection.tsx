'use client'

import React, { useState } from 'react';


export interface WelcomeBeverageOption {
    id: string;
    title: string;
    description: string;
    badge?: string;
}

export interface OlfactoryAmbianceOption {
    id: string;
    title: string;
    notesDescription: string;
    botanicalTag: string;
}

export interface HarborPickupPoint {
    id: string;
    name: string;
    dockLocation: string;
}

export interface ArrivalTimeSlot {
    id: string;
    timeLabel: string;
    departureDisplay: string;
    arrivalDisplay: string;
}

export interface ArrivalCalibrationData {
    sectionEyebrow: string;
    heading: string;
    subheading: string;
    
    // Step 01: Chilled Welcome Reserve
    stepOneNumber: string;
    stepOneTitle: string;
    stepOneSubtitle: string;
    beverageOptions: WelcomeBeverageOption[];
    defaultBeverageId: string;
    
    // Step 02: Suite Olfactory Ambiance
    stepTwoNumber: string;
    stepTwoTitle: string;
    stepTwoSubtitle: string;
    olfactoryOptions: OlfactoryAmbianceOption[];
    defaultOlfactoryId: string;
    
    // Step 03: Riva Tender Rendezvous
    stepThreeNumber: string;
    stepThreeTitle: string;
    stepThreeSubtitle: string;
    harbors: HarborPickupPoint[];
    defaultHarborId: string;
    timeSlots: ArrivalTimeSlot[];
    defaultTimeSlotId: string;
    skipperStatusText: string;
    confirmationNotice: string;
}

export const arrivalCalibrationDefaultData: ArrivalCalibrationData = {
    sectionEyebrow: 'BESPOKE PREPARATION',
    heading: 'Tailor Your Arrival Experience',
    subheading: 'Allow our estate team to prepare your personal quarters to your exact sensory preferences prior to docking.',
    
    stepOneNumber: '01',
    stepOneTitle: 'Chilled Welcome Reserve',
    stepOneSubtitle: 'Selected bottle awaiting uncorking on your ocean loggia upon arrival.',
    beverageOptions: [
        {
            id: 'franciacorta-brut',
            title: 'Vintage Franciacorta Brut',
            description: 'Lombardy, 2016 Estate Reserve • Chilled in hammered silver cooler',
            badge: 'ESTATE SOMMELIER SELECT',
        },
        {
            id: 'limoncello-infusion',
            title: 'Amalfi Limoncello Infusion',
            description: 'Handcrafted with Villa lemon orchards, artisanal Campanian tonic',
            badge: 'ORCHARD HARVEST',
        },
        {
            id: 'san-pellegrino-bergamot',
            title: 'San Pellegrino & Wild Bergamot',
            description: 'Non-alcoholic botanical essence, fresh mint & citrus pressings',
            badge: 'NATURAL BOTANICAL',
        },
    ],
    defaultBeverageId: 'franciacorta-brut',
    
    stepTwoNumber: '02',
    stepTwoTitle: 'Suite Olfactory Ambiance',
    stepTwoSubtitle: 'Discreet cold-mist diffusion calibrated 2 hours before your chamber entry.',
    olfactoryOptions: [
        {
            id: 'wild-fig-bitter-orange',
            title: 'Wild Fig & Bitter Orange',
            notesDescription: 'Warm, leafy, sun-baked cliffside notes with ripe green peel',
            botanicalTag: 'SUN-WARMED MEDITERRANEAN',
        },
        {
            id: 'aged-tuscan-cedarwood',
            title: 'Aged Tuscan Cedarwood',
            notesDescription: 'Deep resinous cedar, amber, dried rosemary & stone moss',
            botanicalTag: 'AROMATIC WOODLAND',
        },
        {
            id: 'sea-salt-sage',
            title: 'Tyrrhenian Sea Salt & Sage',
            notesDescription: 'Crisp oceanic mist, wild mountain sage, neroli bloom & thyme',
            botanicalTag: 'COASTAL SALINE',
        },
    ],
    defaultOlfactoryId: 'wild-fig-bitter-orange',
    
    stepThreeNumber: '03',
    stepThreeTitle: 'Riva Tender Rendezvous',
    stepThreeSubtitle: 'Coordinate your private maritime transfer directly to the Aurelia water gate.',
    harbors: [
        {
            id: 'mergellina-naples',
            name: 'Naples Mergellina Marina (Pier 4)',
            dockLocation: 'Direct rendezvous opposite Grand Hotel Vesuvio slipway',
        },
        {
            id: 'molo-beverello',
            name: 'Naples Molo Beverello (Private Tender Dock)',
            dockLocation: 'VIP terminal with direct chauffeur luggage transfer',
        },
        {
            id: 'capri-marina-grande',
            name: 'Capri Marina Grande (Quay B)',
            dockLocation: 'Private yacht tender pontoon beside Yacht Club Capri',
        },
        {
            id: 'amalfi-marina-coppola',
            name: 'Amalfi Marina Coppola',
            dockLocation: 'Central deep-water pontoon rendezvous',
        },
    ],
    defaultHarborId: 'mergellina-naples',
    timeSlots: [
        {
            id: 'slot-1400',
            timeLabel: '14:00 Departure (Arrival 14:45)',
            departureDisplay: '14:00 CET',
            arrivalDisplay: '14:45 CET',
        },
        {
            id: 'slot-1530',
            timeLabel: '15:30 Departure (Arrival 16:15)',
            departureDisplay: '15:30 CET',
            arrivalDisplay: '16:15 CET',
        },
        {
            id: 'slot-1700',
            timeLabel: '17:00 Departure • Sunset Transit (Arrival 17:45)',
            departureDisplay: '17:00 CET',
            arrivalDisplay: '17:45 CET',
        },
        {
            id: 'slot-custom',
            timeLabel: 'Custom Horizon (Coordinate with Majordomo)',
            departureDisplay: 'Flexible',
            arrivalDisplay: 'Coordinated',
        },
    ],
    defaultTimeSlotId: 'slot-1400',
    skipperStatusText: 'Skipper & Riva Aquarama on Standby',
    confirmationNotice: 'Flight delays are tracked in real-time. Tender departure automatically recalibrates.',
}

export interface ArrivalCalibrationValues {
    beverageId: string;
    olfactoryId: string;
    harborId: string;
    timeSlotId: string;
}

export interface ArrivalSensoryCalibrationProps {
    data?: ArrivalCalibrationData;
    onChange?: (values: ArrivalCalibrationValues) => void;
    onConfirmTransfer?: (values: ArrivalCalibrationValues) => void;
    className?: string;
}

export function ArrivalSensoryCalibrationSection() {

    const data = arrivalCalibrationDefaultData

    const {
        sectionEyebrow,
        heading,
        subheading,
        stepOneNumber,
        stepOneTitle,
        stepOneSubtitle,
        beverageOptions,
        defaultBeverageId,
        stepTwoNumber,
        stepTwoTitle,
        stepTwoSubtitle,
        olfactoryOptions,
        defaultOlfactoryId,
        stepThreeNumber,
        stepThreeTitle,
        stepThreeSubtitle,
        harbors,
        defaultHarborId,
        timeSlots,
        defaultTimeSlotId,
        skipperStatusText,
        confirmationNotice,
    } = data;

    const [arrivalPreferences, setArrivalPreferences] =
		useState<ArrivalCalibrationValues>({
			beverageId: data.defaultBeverageId,
			olfactoryId: data.defaultOlfactoryId,
			harborId: data.defaultHarborId,
			timeSlotId: data.defaultTimeSlotId,
		});

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

    // Component Local State
    const [selectedBeverageId, setSelectedBeverageId] = useState<string>(defaultBeverageId);
    const [selectedOlfactoryId, setSelectedOlfactoryId] = useState<string>(defaultOlfactoryId);
    const [selectedHarborId, setSelectedHarborId] = useState<string>(defaultHarborId);
    const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<string>(defaultTimeSlotId);
    const [isSavedFeedback, setIsSavedFeedback] = useState<boolean>(false);

    const triggerUpdate = (updated: Partial<ArrivalCalibrationValues>) => {
        const nextValues: ArrivalCalibrationValues = {
            beverageId: selectedBeverageId,
            olfactoryId: selectedOlfactoryId,
            harborId: selectedHarborId,
            timeSlotId: selectedTimeSlotId,
            ...updated,
        };

        handleCalibrationChange(nextValues)

        // Brief subtle auto-save confirmation
        setIsSavedFeedback(true);
        setTimeout(function () {
            setIsSavedFeedback(false);
        }, 2000);
    };

    const handleBeverageSelect = (id: string) => {
        setSelectedBeverageId(id);
        triggerUpdate({ beverageId: id });
    };

    const handleOlfactorySelect = (id: string) => {
        setSelectedOlfactoryId(id);
        triggerUpdate({ olfactoryId: id });
    };

    const handleHarborChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        setSelectedHarborId(id);
        triggerUpdate({ harborId: id });
    };

    const handleTimeSlotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        setSelectedTimeSlotId(id);
        triggerUpdate({ timeSlotId: id });
    };

    const handleConfirmTransferClick = () => {
        handleConfirmTransfer({
                beverageId: selectedBeverageId,
                olfactoryId: selectedOlfactoryId,
                harborId: selectedHarborId,
                timeSlotId: selectedTimeSlotId,
        });
    };

    

    return (
        <section className={`w-full max-w-360 mx-auto space-y-8`}>
            {/* Section Monograph Header */}
            <div className="text-center max-w-2xl mx-auto">
                <span className="block text-[10px] font-sans font-semibold uppercase tracking-[0.26em] text-[#8e763b] mb-2">
                    {sectionEyebrow}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#1f1e1d] tracking-tight leading-[1.2]">
                    {heading}
                </h2>
                <p className="mt-2 text-xs sm:text-[13px] text-[#6e6b64] font-sans font-light leading-relaxed">
                    {subheading}
                </p>

                {/* Subtle Auto-save indicator */}
                <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-sans text-[#78756d]">
                    <span className={`w-1.5 h-1.5 -full ${isSavedFeedback ? 'bg-emerald-500 animate-ping' : 'bg-[#8e763b]'}`} />
                    <span className="uppercase tracking-widest text-[9px]">
                        {isSavedFeedback ? 'Changes Synced to Residence Folio' : 'Preferences Saved Automatically'}
                    </span>
                </div>
            </div>

            {/* 3 Step Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                {/* STEP 01: Chilled Welcome Reserve */}
                <div className="bg-white border border-[#e8e4dc] -2xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(31,30,29,0.02)] flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between pb-3 border-b border-[#eeeae2] mb-4">
                            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b]">
                                STEP {stepOneNumber}
                            </span>
                            <span className="text-[9px] font-sans font-medium text-[#24633b] uppercase tracking-wider bg-[#e9f5ee] px-2 py-0.5  border border-[#badfca]">
                                PRE-ARRIVAL
                            </span>
                        </div>

                        <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1f1e1d] tracking-tight">
                            {stepOneTitle}
                        </h3>
                        <p className="mt-1 text-xs text-[#78756d] font-sans font-light leading-relaxed">
                            {stepOneSubtitle}
                        </p>

                        {/* Radio Selection Options */}
                        <div className="mt-5 space-y-2.5">
                            {beverageOptions.map(function (opt) {
                                const isSelected = selectedBeverageId === opt.id;

                                return (
                                    <div
                                        key={opt.id}
                                        onClick={function () {
                                            handleBeverageSelect(opt.id);
                                        }}
                                        className={`p-3.5 -sm border transition-all duration-200 cursor-pointer flex items-start gap-3 ${
                                            isSelected
                                                ? 'bg-[#f7f2e7] border-[#8e763b] shadow-2xs'
                                                : 'bg-white border-[#ded9ce] hover:border-[#8e763b]/50'
                                        }`}
                                    >
                                        <div
                                            className={`w-4 h-4 -full border mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
                                                isSelected
                                                    ? 'border-[#8e763b] bg-[#8e763b]'
                                                    : 'border-[#ded9ce] bg-white'
                                            }`}
                                        >
                                            {isSelected && (
                                                <span className="w-1.5 h-1.5 -full bg-white" />
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            {opt.badge && (
                                                <span className="block text-[8px] font-sans font-semibold uppercase tracking-[0.16em] text-[#8e763b] mb-0.5">
                                                    {opt.badge}
                                                </span>
                                            )}
                                            <span className="font-serif text-sm font-medium text-[#1f1e1d] block leading-snug">
                                                {opt.title}
                                            </span>
                                            <span className="text-[11px] font-sans text-[#6e6b64] font-light leading-snug block mt-0.5">
                                                {opt.description}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-6 pt-3.5 border-t border-[#eeeae2] flex items-center justify-between text-[10px] font-sans text-[#78756d]">
                        <span>Cellar allocation verified</span>
                        <span className="text-[#8e763b] font-medium uppercase tracking-wider">Included</span>
                    </div>
                </div>

                {/* STEP 02: Suite Olfactory Ambiance */}
                <div className="bg-white border border-[#e8e4dc] -2xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(31,30,29,0.02)] flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between pb-3 border-b border-[#eeeae2] mb-4">
                            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b]">
                                STEP {stepTwoNumber}
                            </span>
                            <span className="text-[9px] font-sans font-medium text-[#8e763b] uppercase tracking-wider bg-[#f6f2ea] px-2 py-0.5  border border-[#ded9ce]">
                                AROMA MIST
                            </span>
                        </div>

                        <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1f1e1d] tracking-tight">
                            {stepTwoTitle}
                        </h3>
                        <p className="mt-1 text-xs text-[#78756d] font-sans font-light leading-relaxed">
                            {stepTwoSubtitle}
                        </p>

                        {/* Radio Selection Options */}
                        <div className="mt-5 space-y-2.5">
                            {olfactoryOptions.map(function (opt) {
                                const isSelected = selectedOlfactoryId === opt.id;

                                return (
                                    <div
                                        key={opt.id}
                                        onClick={function () {
                                            handleOlfactorySelect(opt.id);
                                        }}
                                        className={`p-3.5 -sm border transition-all duration-200 cursor-pointer flex items-start gap-3 ${
                                            isSelected
                                                ? 'bg-[#f7f2e7] border-[#8e763b] shadow-2xs'
                                                : 'bg-white border-[#ded9ce] hover:border-[#8e763b]/50'
                                        }`}
                                    >
                                        <div
                                            className={`w-4 h-4 -full border mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
                                                isSelected
                                                    ? 'border-[#8e763b] bg-[#8e763b]'
                                                    : 'border-[#ded9ce] bg-white'
                                            }`}
                                        >
                                            {isSelected && (
                                                <span className="w-1.5 h-1.5 -full bg-white" />
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <span className="block text-[8px] font-sans font-semibold uppercase tracking-[0.16em] text-[#8e763b] mb-0.5">
                                                {opt.botanicalTag}
                                            </span>
                                            <span className="font-serif text-sm font-medium text-[#1f1e1d] block leading-snug">
                                                {opt.title}
                                            </span>
                                            <span className="text-[11px] font-sans text-[#6e6b64] font-light leading-snug block mt-0.5">
                                                {opt.notesDescription}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-6 pt-3.5 border-t border-[#eeeae2] flex items-center justify-between text-[10px] font-sans text-[#78756d]">
                        <span>Ultrasonic stone diffuser</span>
                        <span className="text-[#8e763b] font-medium uppercase tracking-wider">Ready</span>
                    </div>
                </div>

                {/* STEP 03: Riva Tender Rendezvous */}
                <div className="bg-white border border-[#e8e4dc] -2xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(31,30,29,0.02)] flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between pb-3 border-b border-[#eeeae2] mb-4">
                            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b]">
                                STEP {stepThreeNumber}
                            </span>
                            <span className="text-[9px] font-sans font-medium text-[#8e763b] uppercase tracking-wider bg-[#f6f2ea] px-2 py-0.5  border border-[#ded9ce]">
                                MARINA PIER
                            </span>
                        </div>

                        <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1f1e1d] tracking-tight">
                            {stepThreeTitle}
                        </h3>
                        <p className="mt-1 text-xs text-[#78756d] font-sans font-light leading-relaxed">
                            {stepThreeSubtitle}
                        </p>

                        {/* Harbor & Time Selectors */}
                        <div className="mt-5 space-y-4">
                            <div>
                                <label className="block text-[9px] font-sans font-semibold uppercase tracking-[0.18em] text-[#78756d] mb-1.5">
                                    EMBARKATION HARBOR
                                </label>
                                <select
                                    value={selectedHarborId}
                                    onChange={handleHarborChange}
                                    className="w-full px-3 py-2.5 -sm bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs"
                                >
                                    {harbors.map(function (harbor) {
                                        return (
                                            <option key={harbor.id} value={harbor.id}>
                                                {harbor.name}
                                            </option>
                                        );
                                    })}
                                </select>
                                <span className="block text-[10px] font-sans text-[#8e8a82] mt-1 leading-tight">
                                    {harbors.find((h) => h.id === selectedHarborId)?.dockLocation}
                                </span>
                            </div>

                            <div>
                                <label className="block text-[9px] font-sans font-semibold uppercase tracking-[0.18em] text-[#78756d] mb-1.5">
                                    PREFERRED TIME • TUE OCT 14
                                </label>
                                <select
                                    value={selectedTimeSlotId}
                                    onChange={handleTimeSlotChange}
                                    className="w-full px-3 py-2.5 -sm bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs"
                                >
                                    {timeSlots.map(function (slot) {
                                        return (
                                            <option key={slot.id} value={slot.id}>
                                                {slot.timeLabel}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            {/* Live Harbor Radar Pill */}
                            <div className="p-3 -sm bg-white border border-[#ded9ce] shadow-2xs flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 -full bg-emerald-500 animate-pulse" />
                                    <span className="text-[11px] font-sans font-medium text-[#1f1e1d]">
                                        {skipperStatusText}
                                    </span>
                                </div>
                                <span className="font-mono text-[9px] text-[#8e763b] uppercase">
                                    RIVA 38'
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-3.5 border-t border-[#eeeae2] space-y-3">
                        <button
                            type="button"
                            onClick={handleConfirmTransferClick}
                            className="w-full py-3 -sm bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-[11px] font-semibold uppercase tracking-[0.18em] transition-all shadow-sm active:translate-y-0.5 text-center"
                        >
                            Confirm Maritime Slipway
                        </button>

                        <p className="text-[9px] font-sans text-[#8e8a82] leading-tight text-center">
                            {confirmationNotice}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
