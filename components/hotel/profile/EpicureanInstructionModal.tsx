'use client';

import React, { useState, useEffect } from 'react';
import { EpicureanProvisionsItem } from './ProfileSleepAndEpicureanSection';

export interface EpicureanModificationValues {
    itemId: string;
    categoryType: 'cellar' | 'water' | 'coffee' | 'tea';
    timingOrSchedule: string;
    temperatureCelsius?: number;
    serviceLocation?: string;
    customizationSelection?: string;
    specialInstructions: string;
}

export interface EpicureanInstructionModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: EpicureanProvisionsItem | null;
    sommelierName?: string;
    onSaveInstructions?: (updated: EpicureanModificationValues) => Promise<void> | void;
    className?: string;
}

export function EpicureanInstructionModal({
    isOpen,
    onClose,
    item,
    sommelierName = 'Senior Sommelier Matteo Bellini',
    onSaveInstructions,
    className = '',
}: EpicureanInstructionModalProps) {

    const [timingOrSchedule, setTimingOrSchedule] = useState('');
    const [temperatureCelsius, setTemperatureCelsius] = useState<number>(16.5);
    const [serviceLocation, setServiceLocation] = useState('LOGGIA');
    const [customizationSelection, setCustomizationSelection] = useState('');
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(function () {
        if (!item) return;

        if (item.iconType === 'cellar') {
            const parsedTemp = parseFloat(item.temperatureOrTimingDisplay);
            setTimingOrSchedule('90_MIN_PRIOR');
            setTemperatureCelsius(!isNaN(parsedTemp) ? parsedTemp : 16.5);
            setCustomizationSelection('RIEDEL_AMADEO');
            setSpecialInstructions(item.serviceProtocol || 'Decanted into Riedel crystal decanter.');
        } else if (item.iconType === 'coffee') {
            const matchTime = item.temperatureOrTimingDisplay.match(/\d{2}:\d{2}/);
            setTimingOrSchedule(matchTime ? matchTime[0] : '08:30');
            setServiceLocation('LOGGIA');
            setCustomizationSelection('V60_CERAMIC');
            setSpecialInstructions('Warm organic oat emulsion served on the side with raw Demerara sugar.');
        } else if (item.iconType === 'tea') {
            const matchTime = item.temperatureOrTimingDisplay.match(/\d{2}:\d{2}/);
            setTimingOrSchedule(matchTime ? matchTime[0] : '22:30');
            setServiceLocation('NIGHTSTAND');
            setCustomizationSelection('WILD_CHAMOMILE');
            setSpecialInstructions('Steep whole flowers at 92°C with raw Positano citrus blossom honey.');
        } else {
            setTimingOrSchedule('IMMEDIATE');
            setSpecialInstructions(item.serviceProtocol || '');
        }
    }, [item]);

    useEffect(function () {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        }

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }

        return function () {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !item) {
        return null;
    }

    async function handleFormSubmit(e: React.FormEvent) {        
        e.preventDefault();
        if(!item) return

        setIsSaving(true);

        const payload: EpicureanModificationValues = {
            itemId: item.id,
            categoryType: item.iconType,
            timingOrSchedule,
            temperatureCelsius: item?.iconType === 'cellar' ? temperatureCelsius : undefined,
            serviceLocation: item?.iconType === 'coffee' || item?.iconType === 'tea' ? serviceLocation : undefined,
            customizationSelection,
            specialInstructions: specialInstructions.trim(),
        };

        try {
            if (onSaveInstructions) {
                await onSaveInstructions(payload);
            }
            onClose();
        } catch (error) {
            console.error('Failed to update epicurean staging protocol:', error);
        } finally {
            setIsSaving(false);
        }
    }

    function renderHeaderIcon() {
        switch (item?.iconType) {
            case 'cellar':
                return (
                    <svg className="w-4 h-4 text-[#8e763b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 22h8" />
                        <path d="M12 11v11" />
                        <path d="M19 3l-7 8-7-8h14z" />
                    </svg>
                );
            case 'coffee':
                return (
                    <svg className="w-4 h-4 text-[#8e763b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                        <line x1="6" y1="1" x2="6" y2="4" />
                        <line x1="10" y1="1" x2="10" y2="4" />
                        <line x1="14" y1="1" x2="14" y2="4" />
                    </svg>
                );
            case 'tea':
                return (
                    <svg className="w-4 h-4 text-[#8e763b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
                        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
                        <line x1="6" y1="2" x2="6" y2="4" />
                        <line x1="10" y1="2" x2="10" y2="4" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-4 h-4 text-[#8e763b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 14 14" />
                    </svg>
                );
        }
    }

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="epicurean-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            <div
                className={`relative w-full max-w-2xl bg-[#fcf9f4] border border-[#ded9ce] shadow-2xl z-10 overflow-hidden my-auto select-none ${className}`}
            >
                {/* 1. Header */}
                <div className="bg-[#f6f2ea] border-b border-[#ded9ce] px-6 sm:px-8 py-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                        <div className="p-2.5 bg-white border border-[#ded9ce] shadow-2xs shrink-0">
                            {renderHeaderIcon()}
                        </div>
                        <div className="min-w-0">
                            <span className="text-[9px] font-mono font-semibold uppercase tracking-[0.24em] text-[#8e763b] block truncate">
                                {item.categoryTag} • BESPOKE PROTOCOL
                            </span>
                            <h3
                                id="epicurean-modal-title"
                                className="font-serif text-xl sm:text-2xl font-normal text-[#1f1e1d] tracking-tight truncate mt-0.5"
                            >
                                Modify Staging Protocol
                            </h3>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 bg-white hover:bg-[#eeeae2] border border-[#ded9ce] text-[#78756d] hover:text-[#1f1e1d] flex items-center justify-center text-xs font-mono transition-colors shrink-0 shadow-2xs"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                </div>

                {/* 2. Provision Monograph Summary */}
                <div className="px-6 sm:px-8 pt-5 pb-4 border-b border-[#eeeae2] bg-white/60">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-sans">
                        <div>
                            <span className="font-serif text-base font-semibold text-[#1f1e1d] block">
                                {item.title}
                            </span>
                            <span className="text-[11px] text-[#78756d] font-light">
                                {item.provenance}
                            </span>
                        </div>

                        <div className="text-left sm:text-right shrink-0">
                            <span className="px-2.5 py-1 bg-[#f6f2ea] border border-[#ded9ce] text-[9.5px] font-mono uppercase tracking-wider text-[#8e763b] font-semibold">
                                {item.temperatureOrTimingDisplay}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 3. Form Body */}
                <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-6 max-h-[68vh] overflow-y-auto">
                    {/* A. CELLAR VINTAGE MODE */}
                    {item.iconType === 'cellar' && (
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#6d6961]">
                                    DECANTING TIMING & AERATION WINDOW *
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                    {[
                                        { id: '90_MIN_PRIOR', title: '90 Min Prior', subtitle: 'Sommelier Recommended' },
                                        { id: 'UPON_ENTRY', title: 'Upon Arrival', subtitle: 'Uncorked In Your Presence' },
                                        { id: 'DINNER_2000', title: 'Dinner (20:00 CET)', subtitle: 'Staged For Evening Meal' },
                                    ].map(function (opt) {
                                        const isSelected = timingOrSchedule === opt.id;
                                        return (
                                            <div
                                                key={opt.id}
                                                onClick={function () {
                                                    setTimingOrSchedule(opt.id);
                                                }}
                                                className={`p-3 border cursor-pointer transition-all ${
                                                    isSelected
                                                        ? 'bg-[#f7f2e7] border-[#8e763b] shadow-2xs'
                                                        : 'bg-white hover:bg-[#faf8f5] border-[#ded9ce]'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-serif text-xs font-semibold text-[#1f1e1d]">
                                                        {opt.title}
                                                    </span>
                                                    <span className={`w-3.5 h-3.5 border flex items-center justify-center ${
                                                        isSelected ? 'border-[#8e763b] bg-[#8e763b]' : 'border-[#ded9ce]'
                                                    }`}>
                                                        {isSelected && <span className="w-1.5 h-1.5 bg-white" />}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] font-sans text-[#78756d] block mt-1">
                                                    {opt.subtitle}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="p-4 bg-[#f6f2ea] border border-[#ded9ce] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div>
                                    <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b] block">
                                        CELLAR EQUILIBRIUM TEMPERATURE
                                    </span>
                                    <span className="text-xs text-[#55524b] font-sans font-light">
                                        Calibrated to preserve primary fruit tannins and coastal cedar bouquet.
                                    </span>
                                </div>

                                <div className="flex items-center gap-2.5 bg-white border border-[#ded9ce] px-3 py-1.5 shadow-2xs self-start sm:self-auto">
                                    <button
                                        type="button"
                                        onClick={function () {
                                            setTemperatureCelsius(function (prev) {
                                                return Math.max(14.0, Math.round((prev - 0.5) * 10) / 10);
                                            });
                                        }}
                                        className="w-7 h-7 bg-[#f6f2ea] hover:bg-[#eeeae2] font-mono text-sm text-[#1f1e1d] font-semibold transition-colors flex items-center justify-center"
                                        aria-label="Decrease temperature"
                                    >
                                        −
                                    </button>
                                    <span className="font-serif text-base font-bold text-[#1f1e1d] min-w-13.75 text-center">
                                        {temperatureCelsius.toFixed(1)}°C
                                    </span>
                                    <button
                                        type="button"
                                        onClick={function () {
                                            setTemperatureCelsius(function (prev) {
                                                return Math.min(18.5, Math.round((prev + 0.5) * 10) / 10);
                                            });
                                        }}
                                        className="w-7 h-7 bg-[#f6f2ea] hover:bg-[#eeeae2] font-mono text-sm text-[#1f1e1d] font-semibold transition-colors flex items-center justify-center"
                                        aria-label="Increase temperature"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#6d6961]">
                                    CRYSTAL DECANTER SELECTION
                                </label>
                                <select
                                    value={customizationSelection}
                                    onChange={function (e) {
                                        setCustomizationSelection(e.target.value);
                                    }}
                                    className="w-full px-4 py-3 bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] shadow-2xs"
                                >
                                    <option value="RIEDEL_AMADEO">Riedel Amadeo Lyre Decanter (Classic Bolgheri Aeration)</option>
                                    <option value="RIEDEL_BLACK_TIE">Riedel Black Tie Touch Magnum Decanter</option>
                                    <option value="SOMMELIER_CARAFE">Hand-Carved Volcanic Basalt Cooled Carafe</option>
                                    <option value="ORIGINAL_CELLAR_BOTTLE">Serve Direct From Bottle (Cellar Vault Equilibrium)</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* B. MORNING BARISTA MODE */}
                    {item.iconType === 'coffee' && (
                        <div className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#6d6961]">
                                        MAJORDOMO SCHEDULE HOUR *
                                    </label>
                                    <input
                                        type="time"
                                        required
                                        value={timingOrSchedule}
                                        onChange={function (e) {
                                            setTimingOrSchedule(e.target.value);
                                        }}
                                        className="w-full px-4 py-3 bg-white border border-[#ded9ce] font-mono text-xs text-[#1f1e1d] outline-none focus:border-[#8e763b] shadow-2xs"
                                    />
                                    <span className="block text-[9.5px] font-sans text-[#8e8a82]">
                                        Quiet delivery coordinated without doorbell chime.
                                    </span>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#6d6961]">
                                        SERVICE LOCATION DESTINATION *
                                    </label>
                                    <select
                                        value={serviceLocation}
                                        onChange={function (e) {
                                            setServiceLocation(e.target.value);
                                        }}
                                        className="w-full px-4 py-3 bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] shadow-2xs"
                                    >
                                        <option value="LOGGIA">Private Oceanfront Loggia (Sunset Terrace)</option>
                                        <option value="BEDSIDE_SALON">Bedside Travertine Credenza</option>
                                        <option value="PERGOLA">Citrus Pergola Garden Table</option>
                                        <option value="DESK_SALON">Monolithic Study Desk</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#6d6961]">
                                    SINGLE-ORIGIN BREWING METHOD
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                    {[
                                        { id: 'V60_CERAMIC', title: 'V60 Ceramic Pour-Over', note: 'Silky Floral Extraction' },
                                        { id: 'DOUBLE_ESPRESSO', title: 'Doppio Ristretto', note: 'Dense Volcanic Crema' },
                                        { id: 'COLD_JAPANESE_DRIP', title: 'Slow Cold Kyoto Drip', note: 'Zero Acidity Glacial' },
                                    ].map(function (method) {
                                        const isSelected = customizationSelection === method.id;
                                        return (
                                            <div
                                                key={method.id}
                                                onClick={function () {
                                                    setCustomizationSelection(method.id);
                                                }}
                                                className={`p-3 border cursor-pointer transition-all ${
                                                    isSelected
                                                        ? 'bg-[#f7f2e7] border-[#8e763b] shadow-2xs'
                                                        : 'bg-white hover:bg-[#faf8f5] border-[#ded9ce]'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-serif text-xs font-semibold text-[#1f1e1d]">
                                                        {method.title}
                                                    </span>
                                                    <span className={`w-3.5 h-3.5 border flex items-center justify-center ${
                                                        isSelected ? 'border-[#8e763b] bg-[#8e763b]' : 'border-[#ded9ce]'
                                                    }`}>
                                                        {isSelected && <span className="w-1.5 h-1.5 bg-white" />}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] font-sans text-[#78756d] block mt-1">
                                                    {method.note}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* C. TURNDOWN TEA MODE */}
                    {item.iconType === 'tea' && (
                        <div className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#6d6961]">
                                        TURNDOWN TRAY DELIVERY HOUR *
                                    </label>
                                    <input
                                        type="time"
                                        required
                                        value={timingOrSchedule}
                                        onChange={function (e) {
                                            setTimingOrSchedule(e.target.value);
                                        }}
                                        className="w-full px-4 py-3 bg-white border border-[#ded9ce] font-mono text-xs text-[#1f1e1d] outline-none focus:border-[#8e763b] shadow-2xs"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#6d6961]">
                                        BOTANICAL HERBAL FORMULATION *
                                    </label>
                                    <select
                                        value={customizationSelection}
                                        onChange={function (e) {
                                            setCustomizationSelection(e.target.value);
                                        }}
                                        className="w-full px-4 py-3 bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] shadow-2xs"
                                    >
                                        <option value="WILD_CHAMOMILE">Wild Tuscan Chamomile & Lavender Flower (Maremma Harvest)</option>
                                        <option value="LEMON_VERBENA">Campanian Lemon Verbena & Mountain Mint (Positano Terraces)</option>
                                        <option value="PEPPERMINT">High-Altitude Alpine Peppermint (Engadin Glacial Valley)</option>
                                        <option value="NEUTRAL_WATER">Neutral Turndown (Sub-Zero Crystal Tumblers Only)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* D. SHARED NOTES TEXTAREA */}
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#6d6961]">
                            CONFIDENTIAL MAJORDOMO INSTRUCTIONS & DIETARY NUANCES
                        </label>
                        <textarea
                            rows={3}
                            value={specialInstructions}
                            onChange={function (e) {
                                setSpecialInstructions(e.target.value);
                            }}
                            placeholder="Add specific serving notes for the Butler desk (e.g. dairy emulsion preference, crystal glassware style, companion service)..."
                            className="w-full px-4 py-3 bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs placeholder-[#a4a098]"
                        />
                    </div>

                    {/* 4. CONCIERGE ASSURANCE */}
                    <div className="p-3.5 bg-[#f6f2ea] border border-[#ded9ce] flex items-center justify-between text-xs font-sans text-[#6e6b64]">
                        <div className="flex items-center gap-2">
                            <span className="text-[#8e763b] text-base leading-none">✦</span>
                            <span className="text-[11px] font-light">
                                Dispatched directly to {sommelierName} via encrypted 256-bit TLS relay.
                            </span>
                        </div>
                    </div>

                    {/* 5. MODAL ACTIONS */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-end gap-3 border-t border-[#eeeae2]">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-3 bg-white hover:bg-[#f6f2ea] border border-[#ded9ce] text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-[#6d6961] transition-colors shadow-2xs"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-7 py-3 bg-[#1f1e1d] hover:bg-[#343230] text-white text-[11px] font-sans font-semibold uppercase tracking-[0.22em] transition-all shadow-md active:translate-y-0.5 disabled:opacity-75 flex items-center justify-center gap-2"
                        >
                            <span>{isSaving ? 'Inscribing Protocol...' : 'Confirm Staging Instruction'}</span>
                            <span>→</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EpicureanInstructionModal