'use client';

import React, { useState, useTransition, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import CheckoutHeader, {
    CheckoutStepId,
    CheckoutHeaderData,
} from './Header';

import {
    PatronAndLogisticsSection,
    PatronFormData,
    PatronSectionData,
    checkoutPatronDefaultValues,
} from './PatronAndLogistics';

import {
    ComfortAndAddOnsSection,
    ComfortAndAddOnsData,
    ComfortAndAddOnsValues,
    PillowOption,
    checkoutComfortAndAddOnsDefaultData,
} from './ComfortAndAddOns';

import {
    CheckoutFolioRail,
    FolioStayDetails,
    FolioAddOnItem,
} from './CheckoutFolioRail';

import type {
    ConfirmReservationPayload,
    ConfirmReservationResult,
} from '@/lib/hotel/actions/checkout';

import { CurrencyCode, getCurrencySymbol } from '@/lib/data/currencyCatalog';
import { calculateNights } from '@/lib/hotel/mappers/AccommodationDetailsMapper';

// ============================================================================
// COMPREHENSIVE INTERACTIVE PROPS & DATA TYPES
// ============================================================================

export interface CheckoutInteractiveInitialData {
    header?: CheckoutHeaderData;
    patron?: PatronSectionData;
    patronDetails?: {
        honorific?: string;
        firstName?: string;
        lastName?: string;
        email?: string;
        phoneCallingCode?: string;
        phoneNumber?: string;
        countryIso?: string;
        specialRequests?: string;
        dietaryNotes?: string;
    };
    comfortAndAddOns?: ComfortAndAddOnsData;
    stayDetails?: FolioStayDetails;
    currencyCode?: CurrencyCode | string;
    currencySymbol?: string;
    sanctuarySlug?: string;
    suiteSlug?: string;
    isAuthenticated?: boolean;
    sovereignTier?: string | null;
    returnHref?: string;
}

export interface CheckoutSubmissionPayload {
    sanctuarySlug?: string;
    suiteSlug?: string;
    patron: PatronFormData;
    comfort: {
        selectedPillowId: PillowOption['id'];
        temperatureCelsius: number;
    };
    selectedAddOnIds: string[];
    folioSummary: {
        nightlyRate: number;
        nightsCount: number;
        roomSubtotal: number;
        sovereignDiscountAmount: number;
        addOnsSubtotal: number;
        environmentalAndHeritageTax: number;
        grandTotal: number;
        currencyCode: CurrencyCode | string;
        currencySymbol: string;
    };
}

export interface CheckoutInteractiveProps {
    initialData?: CheckoutInteractiveInitialData;
    onConfirmReservation?: (payload: ConfirmReservationPayload) => Promise<ConfirmReservationResult>;
    showHeader?: boolean;
    className?: string;
}

export function CheckoutInteractive({
    initialData = {},
    onConfirmReservation,
    className = '',
}: CheckoutInteractiveProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    // 0. Currency normalization via currencyCatalog
    const currencyCode = (initialData.currencyCode || initialData.stayDetails?.currencyCode || 'EUR') as CurrencyCode;
    const currencySymbol = initialData.currencySymbol || initialData.stayDetails?.currencySymbol || getCurrencySymbol(currencyCode);

    // 1. Reactive Stay & Horizon State (for in-place date & party changes)
    const [stayDetails, setStayDetails] = useState<FolioStayDetails>(function () {
        return (
            initialData.stayDetails || {
                suiteId: 'suite-402',
                suiteName: 'The Azure Master Ocean Suite',
                suiteSlug: initialData.suiteSlug || 'azure-master-ocean-suite',
                sanctuaryName: 'Aurelia Sanctuary Positano',
                sanctuaryLocation: 'Positano, Amalfi Coast',
                checkInDate: '2026-10-14',
                checkOutDate: '2026-10-19',
                nightsCount: 5,
                guestsCount: 2,
                baseRateNightly: 3450,
                currencyCode,
                currencySymbol,
                maxGuests: 4,
            }
        );
    });

    // 2. Unified State: Patron Particulars & Arrival Logistics
    const [patronFormData, setPatronFormData] = useState<PatronFormData>(function () {
        return {
            ...checkoutPatronDefaultValues,
            ...(initialData.patron?.initialFormValues || {}),
            firstName: initialData.patronDetails?.firstName || initialData.patron?.initialFormValues?.firstName || '',
            lastName: initialData.patronDetails?.lastName || initialData.patron?.initialFormValues?.lastName || '',
            email: initialData.patronDetails?.email || initialData.patron?.initialFormValues?.email || '',
            phoneNumber: initialData.patronDetails?.phoneNumber || initialData.patron?.initialFormValues?.phoneNumber || '',
            phoneCountryIso: (initialData.patronDetails?.countryIso as any) || initialData.patron?.initialFormValues?.phoneCountryIso || 'IT',
        };
    });

    // 3. Unified State: Comfort, Temperature & Add-On Selection
    const defaultAddOns =
        initialData.comfortAndAddOns?.addOns ||
        checkoutComfortAndAddOnsDefaultData.addOns ||
        [];

    const defaultSelectedAddOnIds = defaultAddOns
        .filter(function (a) {
            return Boolean(a.defaultSelected);
        })
        .map(function (a) {
            return a.id;
        });

    const [comfortValues, setComfortValues] = useState<ComfortAndAddOnsValues>(function () {
        return {
            selectedPillowId:
                initialData.comfortAndAddOns?.defaultPillowId || 'bespoke-goose-down',
            temperatureCelsius:
                initialData.comfortAndAddOns?.initialTemperatureCelsius ?? 19.5,
            selectedAddOnIds: defaultSelectedAddOnIds,
        };
    });

    // 4. UI Navigation & Step Anchoring
    const [activeStepId, setActiveStepId] = useState<CheckoutStepId>('guest-details');
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    // 5. Active Bespoke Add-Ons for Dynamic Folio Ledger Recalculation
    const selectedFolioAddOns: FolioAddOnItem[] = defaultAddOns
        .filter(function (item) {
            return comfortValues.selectedAddOnIds.includes(item.id);
        })
        .map(function (item) {
            return {
                id: item.id,
                title: item.title,
                cost: item.price,
                categoryTag: (item as any).categoryTag,
            };
        });

    // 6. Sovereign Discount Percentage Resolution
    const sovereignDiscountPercent = initialData.sovereignTier === 'IMPERIAL_HONORARY'
        ? 20
        : initialData.sovereignTier === 'SOVEREIGN_KEY'
        ? 15
        : initialData.sovereignTier === 'EXPLORER'
        ? 10
        : 0;

    // Financial Math Derived dynamically from reactive stayDetails & selected add-ons
    const nightlyRate = stayDetails.baseRateNightly;
    const nightsCount = stayDetails.nightsCount;

    const roomSubtotal = nightlyRate * nightsCount;
    const addOnsSubtotal = selectedFolioAddOns.reduce(function (sum, item) {
        return sum + item.cost;
    }, 0);

    const sovereignDiscountAmount = sovereignDiscountPercent > 0
        ? Math.round((roomSubtotal + addOnsSubtotal) * (sovereignDiscountPercent / 100))
        : 0;

    const taxableSubtotal = Math.max(0, roomSubtotal + addOnsSubtotal - sovereignDiscountAmount);
    const vatAmount = Math.round(taxableSubtotal * 0.10);
    const cityTaxTotal = 5 * stayDetails.guestsCount * nightsCount;
    const grandTotal = taxableSubtotal + vatAmount + cityTaxTotal;

    // ========================================================================
    // FOLIO DATE & PARTY MODIFICATION HANDLERS
    // ========================================================================

    const handleFolioDatesChange = useCallback(function (dates: {
        checkInDate: string;
        checkOutDate: string;
        nightsCount: number;
    }) {
        setStayDetails(function (prev) {
            return {
                ...prev,
                checkInDate: dates.checkInDate,
                checkOutDate: dates.checkOutDate,
                nightsCount: dates.nightsCount,
            };
        });
        setSubmissionError(null);
    }, []);

    const handleFolioPartyChange = useCallback(function (guestsCount: number) {
        setStayDetails(function (prev) {
            return {
                ...prev,
                guestsCount,
            };
        });
    }, []);

    // Form & Step Handlers
    const handlePatronFormChange = useCallback(function (updated: PatronFormData) {
        setPatronFormData(updated);
        setSubmissionError(null);
    }, []);

    const handleComfortChange = useCallback(function (updated: ComfortAndAddOnsValues) {
        setComfortValues(updated);
    }, []);

    const handleStepClick = useCallback(function (stepId: CheckoutStepId) {
        setActiveStepId(stepId);
        if (stepId === 'guest-details') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (stepId === 'bespoke-addons') {
            const el = document.getElementById('checkout-comfort-section');
            el?.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const handleAuthenticateClick = useCallback(function () {
        router.push('/login?callbackUrl=/checkout');
    }, [router]);

    // Master Ratification Submission
    const handleFinalSubmit = useCallback(
        async function (e?: React.FormEvent) {
            if (e) e.preventDefault();
            setSubmissionError(null);

            // Validation Guard: Ensure required patron identity
            if (!patronFormData.firstName?.trim() || !patronFormData.lastName?.trim()) {
                setSubmissionError('Primary patron given name and surname are required to issue the sanctuary voucher.');
                window.scrollTo({ top: 120, behavior: 'smooth' });
                return;
            }

            if (!patronFormData.email?.trim() || !patronFormData.email.includes('@')) {
                setSubmissionError('A valid discreet email address is required for encrypted key delivery.');
                window.scrollTo({ top: 120, behavior: 'smooth' });
                return;
            }

            if (!patronFormData.phoneNumber?.trim() || !patronFormData.isPhoneValid) {
                setSubmissionError('Please verify the direct mobile number format for majordomo SMS coordination.');
                window.scrollTo({ top: 220, behavior: 'smooth' });
                return;
            }

            // Build payload for server ratification
            const payload: ConfirmReservationPayload = {
                sanctuarySlug: initialData.sanctuarySlug || 'positano-amalfi',
                suiteSlug: stayDetails.suiteSlug || initialData.suiteSlug || 'azure-master-ocean-suite',
                dates: {
                    checkIn: stayDetails.checkInDate,
                    checkOut: stayDetails.checkOutDate,
                    guests: stayDetails.guestsCount,
                    nights: calculateNights(stayDetails.checkInDate, stayDetails.checkOutDate),
                },
                patron: {
                    title: patronFormData.title || 'Mr',
                    firstName: patronFormData.firstName.trim(),
                    lastName: patronFormData.lastName.trim(),
                    email: patronFormData.email.trim().toLowerCase(),
                    phoneCountryIso: patronFormData.phoneCountryIso,
                    phoneNumber: patronFormData.phoneNumber.trim(),
                    countryOfResidence: patronFormData.countryOfResidence,
                    accompanyingGuestName: patronFormData.accompanyingGuestName?.trim() || undefined,
                    selectedArrivalWindowId: patronFormData.selectedArrivalWindowId,
                    transportDesignation: patronFormData.transportDesignation?.trim() || undefined,
                    dietaryAndCellarNuances: patronFormData.dietaryAndCellarNuances?.trim() || undefined,
                },
                comfort: {
                    selectedPillowId: comfortValues.selectedPillowId,
                    temperatureCelsius: comfortValues.temperatureCelsius,
                },
                selectedAddOnIds: comfortValues.selectedAddOnIds,
                folioSummary: {
                    nightlyRate,
                    nightsCount,
                    roomSubtotal,
                    sovereignDiscountAmount,
                    addOnsSubtotal,
                    environmentalAndHeritageTax: vatAmount + cityTaxTotal,
                    grandTotal,
                    currencyCode,
                    currencySymbol,
                },
            };

            startTransition(async function () {
                try {
                    if (onConfirmReservation) {
                        const result = await onConfirmReservation(payload);

                        if (result.success && result.bookingReference) {
                            router.push(`/confirmation?bookingRef=${encodeURIComponent(result.bookingReference)}`);
                        } else {
                            setSubmissionError(
                                result.error || 'Sanctuary reservation could not be ratified. Please contact the Concierge.'
                            );
                            window.scrollTo({ top: 80, behavior: 'smooth' });
                        }
                    } else {
                        const sampleFolio = 'AUR-' + Math.floor(1000 + Math.random() * 9000) + '-CAP';
                        router.push(`/confirmation?bookingRef=${encodeURIComponent(sampleFolio)}`);
                    }
                } catch (err) {
                    console.error('Reservation confirmation failed:', err);
                    setSubmissionError('A cryptographic dispatch error occurred. Please verify your connection or retry.');
                    window.scrollTo({ top: 80, behavior: 'smooth' });
                }
            });
        },
        [
            patronFormData,
            comfortValues,
            stayDetails,
            initialData.sanctuarySlug,
            initialData.suiteSlug,
            nightlyRate,
            nightsCount,
            roomSubtotal,
            sovereignDiscountAmount,
            addOnsSubtotal,
            vatAmount,
            cityTaxTotal,
            grandTotal,
            currencyCode,
            currencySymbol,
            onConfirmReservation,
            router,
        ]
    );

    return (
        <div className={`w-full min-h-screen bg-[#fcf9f4] text-[#1f1e1d] ${className}`}>
            {/* Top Checkout Navigation Chrome */}
            <div className="w-screen border-b border-[#eeeae2] bg-[#fcf9f4]/95 backdrop-blur-md sticky top-0 z-40">
                <CheckoutHeader
                    data={{
                        ...(initialData.header || {}),
                        currencySymbol,
                        currencyCode,
                    }}
                    activeStepId={activeStepId}
                    onStepClick={handleStepClick}
                    className="w-full"
                />
            </div>

            {/* Main Checkout Workspace */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
                {/* Error Announcement Banner */}
                {submissionError && (
                    <div className="mb-8">
                        <div className="p-4 bg-[#ba1a1a]/10 border border-[#ba1a1a]/30 text-[#ba1a1a] flex items-center justify-between gap-3 text-xs font-sans">
                            <div className="flex items-center gap-2.5">
                                <span className="font-mono text-sm">⚠</span>
                                <span>{submissionError}</span>
                            </div>
                            <button
                                type="button"
                                onClick={function () {
                                    setSubmissionError(null);
                                }}
                                className="text-[#ba1a1a] font-bold text-sm px-2 cursor-pointer hover:opacity-80 transition-opacity"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}

                {/* Architectural Workspace Grid (7 cols form + 5 cols sticky folio) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
                    {/* Left Column: Sections 01 (Patron & Logistics) and 02 (Comfort & Add-Ons) */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-12">
                        <section id="checkout-patron-section">
                            <PatronAndLogisticsSection
                                data={initialData.patron}
                                onChange={handlePatronFormChange}
                                onAuthenticateClick={handleAuthenticateClick}
                            />
                        </section>

                        <section id="checkout-comfort-section">
                            <ComfortAndAddOnsSection
                                data={initialData.comfortAndAddOns}
                                currencyCode={currencyCode}
                                currencySymbol={currencySymbol}
                                onChange={handleComfortChange}
                                onSubmit={function () {
                                    handleFinalSubmit();
                                }}
                            />
                        </section>
                    </div>

                    {/* Right Column: Persistent Sovereign Folio Ledger with Live Dates & Party Modification */}
                    <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-4">
                        <CheckoutFolioRail
                            stayDetails={{
                                ...stayDetails,
                                currencyCode,
                                currencySymbol,
                            }}
                            selectedAddOns={selectedFolioAddOns}
                            sovereignCourtesyDiscountPercent={sovereignDiscountPercent}
                            returnHref={initialData.returnHref || `/accommodations/${stayDetails.suiteSlug}`}
                            onDatesChange={handleFolioDatesChange}
                            onPartyChange={handleFolioPartyChange}
                            isSubmitting={isPending}
                        />

                        {/* Master Submit Action Trigger */}
                        <div>
                            <button
                                type="button"
                                onClick={function () {
                                    handleFinalSubmit();
                                }}
                                disabled={isPending}
                                className="w-full py-4 bg-[#1f1e1d] hover:bg-[#8e763b] text-white font-sans text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 shadow-sm active:translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isPending ? (
                                    <>
                                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>RATIFYING RESERVATION...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>CONFIRM SOVEREIGN RESERVATION</span>
                                        <span className="text-sm font-normal">→</span>
                                    </>
                                )}
                            </button>
                            <span className="block text-center text-[10px] text-[#8e8a82] font-sans mt-2.5 tracking-wide">
                                Guaranteed direct reservation • Swiss FADP Encrypted • {currencyCode}
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default CheckoutInteractive;

