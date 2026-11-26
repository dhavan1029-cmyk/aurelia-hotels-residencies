
'use client';

import { useState, useTransition } from 'react';
import { CurrencyCode, getCurrencySymbol, formatTariff } from '@/lib/data/currencyCatalog';
import { Decimal } from '@/app/generated/prisma/internal/prismaNamespace';

// ============================================================================
// TYPE CONTRACTS
// ============================================================================

export type AddOnCategoryType =
    | 'NAUTICAL_CHARTER'
    | 'WELLNESS_SPA'
    | 'GASTRONOMY'
    | 'ENOLOGY'
    | 'TERROIR_CRAFT'
    | 'BESPOKE_TRANSFER'
    | 'CELLAR_PROVISION';

export interface PillowOption {
    id: string;
    title: string;
    description: string;
    badge?: string;
    loftTag?: string;
}

export interface AddOnItem {
    id: string;
    itemType: AddOnCategoryType;
    categoryGroup?: string;
    badge?: string;
    title: string;
    description: string;
    price: number;
    currencyCode?: CurrencyCode | string;
    currencySymbol?: string;
    pricingUnit?: string; // e.g. "per encounter", "per charter"
    durationOrSchedule?: string;
    defaultSelected?: boolean;
    isPriorityRecommendation?: boolean;
}

export interface SovereignVoucherData {
    discountAmount: number;
    currencyCode?: CurrencyCode | string;
    currencySymbol?: string;
    promoCode: string;
    folioCode?: string;
}

export interface ComfortAndAddOnsData {
    pillowOptions?: PillowOption[];
    defaultPillowId?: PillowOption['id'];
    initialTemperatureCelsius?: number | Decimal;
    minTemperatureCelsius?: number;
    maxTemperatureCelsius?: number;
    temperatureStep?: number;
    addOns?: AddOnItem[];
    voucher?: SovereignVoucherData;
    currencyCode?: CurrencyCode | string;
    currencySymbol?: string;
    returnHref?: string;
}

export interface ComfortAndAddOnsValues {
    selectedPillowId: PillowOption['id'];
    temperatureCelsius: number | Decimal;
    selectedAddOnIds: string[];
}

export interface ComfortAndAddOnsSectionProps {
    data?: ComfortAndAddOnsData;
    currencyCode?: CurrencyCode | string;
    currencySymbol?: string;
    onChange?: (values: ComfortAndAddOnsValues) => void;
    onSubmit?: () => void;
    className?: string;
}

export const checkoutComfortAndAddOnsDefaultData: ComfortAndAddOnsData = {
    pillowOptions: [
        {
            id: 'bespoke-goose-down',
            title: 'Bespoke Goose Down & Silk Casing',
            description: 'Triple-chambered Hungarian goose down wrapped in pure mulberry silk.',
            badge: 'SIGNATURE BASELINE',
            loftTag: 'ULTRA-SOFT • ORGANIC',
        },
        {
            id: 'organic-latex-wool',
            title: 'Organic Botanical Latex & Alpine Wool',
            description: 'Dual-density natural Talalay core with thermo-regulating virgin merino wool.',
            badge: 'ANATOMICAL SUPPORT',
            loftTag: 'MEDIUM CONTOUR • BREATHABLE',
        },
        {
            id: 'mulberry-silk-fill',
            title: 'Mulberry Silk Floss & Sea Salt Gel',
            description: 'Layered long-strand silk fiber infused with cooling crystalline sea minerals.',
            badge: 'DERMAL CELLULAR CALM',
            loftTag: 'CHILLED • HYPOALLERGENIC',
        },
    ],
    defaultPillowId: 'bespoke-goose-down',
    initialTemperatureCelsius: 19.5,
    minTemperatureCelsius: 16.0,
    maxTemperatureCelsius: 24.0,
    temperatureStep: 0.5,
    addOns: [
        {
            id: 'exp-riva-aquarama',
            itemType: 'NAUTICAL_CHARTER',
            categoryGroup: 'SIGNATURE_EXPERIENCE',
            badge: 'EXCLUSIVE MARITIME',
            title: 'Private Riva Aquarama Faraglioni & Capri Cruise',
            description: 'Half-day wooden tender navigation with vintage Dom Pérignon and secluded grotto swim.',
            price: 2850,
            pricingUnit: 'per cruise',
            durationOrSchedule: '4 HOURS',
            defaultSelected: true,
            isPriorityRecommendation: true,
        },
        {
            id: 'exp-caldarium-ritual',
            itemType: 'WELLNESS_SPA',
            categoryGroup: 'SIGNATURE_EXPERIENCE',
            badge: 'SUBTERRANEAN THERMAL',
            title: 'Subterranean Roman Caldarium & Ancient Oil Massage',
            description: 'Volcanic steam immersion and private mineral baths with cold-pressed Mediterranean botanicals.',
            price: 780,
            pricingUnit: 'per couple',
            durationOrSchedule: '150 MIN',
            defaultSelected: true,
            isPriorityRecommendation: true,
        },
        {
            id: 'exp-barolo-vault',
            itemType: 'ENOLOGY',
            categoryGroup: 'SIGNATURE_EXPERIENCE',
            badge: 'SOMMELIER RESERVE',
            title: 'Private Barolo & Brunello Caveau Tasting',
            description: 'Guided exploration of historic subterranean cellars with rare pre-phylloxera vintages.',
            price: 650,
            pricingUnit: 'per party',
            durationOrSchedule: '90 MIN',
            defaultSelected: false,
        },
    ],
    currencyCode: 'EUR',
    currencySymbol: '€',
};

// ============================================================================
// COMPONENT IMPLEMENTATION
// ============================================================================

export function ComfortAndAddOnsSection({
    data = checkoutComfortAndAddOnsDefaultData,
    currencyCode: propCurrencyCode,
    currencySymbol: propCurrencySymbol,
    onChange,
    onSubmit,
    className = '',
}: ComfortAndAddOnsSectionProps) {
    const rawCurrencyCode = propCurrencyCode || data.currencyCode || 'EUR';
    const currencyCode = rawCurrencyCode as CurrencyCode;
    const currencySymbol = propCurrencySymbol || data.currencySymbol || getCurrencySymbol(currencyCode);

const pillows = data.pillowOptions || checkoutComfortAndAddOnsDefaultData.pillowOptions || [];
const addOns = data.addOns || checkoutComfortAndAddOnsDefaultData.addOns || [];

const defaultPillow = data.defaultPillowId || pillows[0]?.id || 'bespoke-goose-down';
const [selectedPillowId, setSelectedPillowId] = useState<string>(defaultPillow);
const [temperature, setTemperature] = useState<number | Decimal>(data.initialTemperatureCelsius ?? 19.5);

const initialSelectedAddOns = addOns
    .filter(function (item) {
        return Boolean(item.defaultSelected);
    })
    .map(function (item) {
        return item.id;
    });

const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>(initialSelectedAddOns);

function notifyChange(updated: Partial<ComfortAndAddOnsValues>) {
    if (!onChange) return;
    onChange({
        selectedPillowId: updated.selectedPillowId ?? selectedPillowId,
        temperatureCelsius: updated.temperatureCelsius ?? temperature,
        selectedAddOnIds: updated.selectedAddOnIds ?? selectedAddOnIds,
    });
}

function handlePillowSelect(id: string) {
    setSelectedPillowId(id);
    notifyChange({ selectedPillowId: id });
}

function handleTemperatureChange(val: number) {
    setTemperature(val);
    notifyChange({ temperatureCelsius: val });
}

function toggleAddOn(id: string) {
    const next = selectedAddOnIds.includes(id)
        ? selectedAddOnIds.filter(function (itemId) {
              return itemId !== id;
          })
        : selectedAddOnIds.concat([id]);

    setSelectedAddOnIds(next);
    notifyChange({ selectedAddOnIds: next });
}

return (
    <div className={`space-y-10 ${className}`}>
        {/* 1. SECTION TITLE & PRE-ARRIVAL SANCTUARY STAGING */}
        <div className="border-b border-[#eeeae2] pb-4">
            <span className="text-[9px] font-mono uppercase tracking-[0.24em] text-[#8e763b] block">
                STAGE 02 • SENSORY & EXPERIENCES
            </span>
            <h2 className="font-serif text-2xl font-light text-[#1f1e1d] tracking-tight mt-0.5">
                Comfort Architecture &amp; Curated Encounters
            </h2>
            <p className="text-xs font-sans text-[#78756d] mt-1">
                Calibrate your in-suite atmosphere and reserve verified private maritime &amp; spa excursions.
            </p>
        </div>

        {/* 2. PILLOW SELECTION TILES */}
        <section aria-labelledby="pillow-architecture-title" className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 id="pillow-architecture-title" className="font-serif text-base font-normal text-[#1f1e1d]">
                        Sleep Chamber Pillow Composition
                    </h3>
                    <p className="text-xs font-sans text-[#78756d]">
                        Prepared with unbleached organic Italian linen prior to arrival.
                    </p>
                </div>
                <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-[#8e763b]">
                    COMPLIMENTARY PRIVILEGE
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {pillows.map(function (pillow) {
                    const isSelected = selectedPillowId === pillow.id;

                    return (
                        <button
                            key={pillow.id}
                            type="button"
                            onClick={function () {
                                handlePillowSelect(pillow.id);
                            }}
                            className={`text-left p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                                isSelected
                                    ? 'bg-white border-[#8e763b] ring-1 ring-[#8e763b]/30 shadow-xs'
                                    : 'bg-[#faf8f5] border-[#e8e4dc] hover:border-[#8e763b]/50'
                            }`}
                        >
                            <div className="space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                    <span className="text-[8.5px] font-mono uppercase tracking-wider text-[#8e763b]">
                                        {pillow.loftTag || 'BESPOKE LOFT'}
                                    </span>
                                    <div
                                        className={`w-3.5 h-3.5 border rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                            isSelected
                                                ? 'border-[#8e763b] bg-[#8e763b]'
                                                : 'border-[#ded9ce] bg-white'
                                        }`}
                                    >
                                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </div>
                                </div>
                                <h4 className="font-serif text-sm font-medium text-[#1f1e1d] leading-snug">
                                    {pillow.title}
                                </h4>
                                <p className="text-[11px] font-sans text-[#78756d] leading-relaxed">
                                    {pillow.description}
                                </p>
                            </div>

                            {pillow.badge && (
                                <div className="pt-3">
                                    <span className="text-[8px] font-mono uppercase tracking-widest text-[#a4a098]">
                                        {pillow.badge}
                                    </span>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </section>

        {/* 3. THERMO-REGULATION TEMPERATURE SLIDER */}
        <section aria-labelledby="temperature-regulation-title" className="p-5 sm:p-6 bg-[#faf8f5] border border-[#e8e4dc] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <h3 id="temperature-regulation-title" className="font-serif text-base font-normal text-[#1f1e1d]">
                        Pre-Arrival Suite Microclimate
                    </h3>
                    <p className="text-xs font-sans text-[#78756d]">
                        Discreet radiant stone HVAC synchronized 3 hours prior to docking.
                    </p>
                </div>
                <div className="flex items-baseline gap-2 self-start sm:self-auto">
                    <span className="font-serif text-2xl font-light text-[#1f1e1d]">
                        {temperature.toFixed(1)}°C
                    </span>
                    <span className="text-xs font-sans text-[#8e8a82]">
                        ({((Number(temperature) * 9) / 5 + 32).toFixed(1)}°F)
                    </span>
                </div>
            </div>

            <div className="space-y-2">
                <input
                    type="range"
                    min={data.minTemperatureCelsius ?? 16.0}
                    max={data.maxTemperatureCelsius ?? 24.0}
                    step={data.temperatureStep ?? 0.5}
                    value={Number(temperature)}
                    onChange={function (e) {
                        handleTemperatureChange(parseFloat(e.target.value));
                    }}
                    aria-label="Target Room Temperature in Celsius"
                    className="w-full h-1.5 bg-[#ded9ce] accent-[#8e763b] cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-[#8e8a82]">
                    <span>16.0°C (ALPINE REFRESH)</span>
                    <span>19.5°C (SIGNATURE BASELINE)</span>
                    <span>24.0°C (COASTAL WARMTH)</span>
                </div>
            </div>
        </section>

        {/* 4. CURATED SANCTUARY ADD-ON IMMERSIONS (WITH CURRENCY CATALOG INTEGRATION) */}
        <section aria-labelledby="curated-encounters-title" className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 id="curated-encounters-title" className="font-serif text-base font-normal text-[#1f1e1d]">
                        Signature Sanctuary Encounters
                    </h3>
                    <p className="text-xs font-sans text-[#78756d]">
                        Sealed upon folio ratification • Handled by your resident sommelier &amp; majordomo.
                    </p>
                </div>
                <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-[#8e763b]">
                    OPTIONAL ADD-ONS • {currencyCode}
                </span>
            </div>

            <div className="space-y-3">
                {addOns.map(function (item) {
                    const isSelected = selectedAddOnIds.includes(item.id);
                    const itemCurrency = (item.currencyCode || currencyCode) as CurrencyCode;

                    return (
                        <div
                            key={item.id}
                            onClick={function () {
                                toggleAddOn(item.id);
                            }}
                            className={`p-4 sm:p-5 border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                                isSelected
                                    ? 'bg-white border-[#8e763b] ring-1 ring-[#8e763b]/30 shadow-2xs'
                                    : 'bg-[#faf8f5] border-[#e8e4dc] hover:border-[#8e763b]/50'
                            }`}
                        >
                            <div className="space-y-1.5 max-w-xl">
                                <div className="flex items-center gap-2">
                                    <span className="text-[8.5px] font-mono uppercase tracking-[0.18em] text-[#8e763b]">
                                        {item.badge || 'BESPOKE ENCOUNTER'}
                                    </span>
                                    {item.durationOrSchedule && (
                                        <>
                                            <span className="text-[#a4a098] text-[9px]">•</span>
                                            <span className="text-[8.5px] font-mono uppercase tracking-wider text-[#78756d]">
                                                {item.durationOrSchedule}
                                            </span>
                                        </>
                                    )}
                                </div>

                                <h4 className="font-serif text-base font-normal text-[#1f1e1d]">
                                    {item.title}
                                </h4>
                                <p className="text-xs font-sans text-[#78756d] leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#eeeae2]">
                                <div className="text-left sm:text-right">
                                    <span className="font-serif text-lg font-normal text-[#1f1e1d]">
                                        {formatTariff(item.price, itemCurrency)}
                                    </span>
                                    <span className="block text-[10px] font-sans text-[#8e8a82]">
                                        {item.pricingUnit || 'per party'}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    aria-pressed={isSelected}
                                    className={`px-3 py-1.5 text-[9.5px] font-mono uppercase tracking-[0.16em] transition-colors cursor-pointer ${
                                        isSelected
                                            ? 'bg-[#8e763b] text-white font-medium'
                                            : 'bg-white border border-[#ded9ce] text-[#1f1e1d] hover:border-[#8e763b]'
                                    }`}
                                >
                                    {isSelected ? '✓ INCLUDED' : '+ RESERVE'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>

        {/* 5. SOVEREIGN VOUCHER OR COURTESY PRIVILEGE CARD */}
        {data.voucher && (
            <div className="p-4 bg-[#f2ede4] border border-[#ded9ce] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-[#ded9ce] flex items-center justify-center font-serif text-sm text-[#8e763b]">
                        ✦
                    </div>
                    <div>
                        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8e763b] block">
                            SOVEREIGN DIPLOMATIC ATTESTATION
                        </span>
                        <span className="font-serif text-sm text-[#1f1e1d]">
                            Folio Privilege {data.voucher.promoCode} Applied
                        </span>
                    </div>
                </div>
                <div className="text-right">
                    <span className="font-mono text-xs font-semibold text-[#8e763b]">
                        −{formatTariff(data.voucher.discountAmount, currencyCode)}
                    </span>
                    <span className="block text-[9.5px] font-sans text-[#78756d]">Courtesy Deducted</span>
                </div>
            </div>
        )}
    </div>
);

}

export default ComfortAndAddOnsSection;