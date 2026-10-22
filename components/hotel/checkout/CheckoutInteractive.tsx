'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

// Phase 2: Primary Patron & Arrival Logistics
import { PatronAndLogisticsSection, PatronSectionData } from '@/components/hotel/checkout/PatronAndLogistics';
import {
    PatronFormData,
    checkoutPatronDefaultData,
} from '@/components/hotel/checkout/PatronAndLogistics';

// Phase 3: Sanctuary Comfort & Curated Add-Ons
import {
    ComfortAndAddOnsData,
    ComfortAndAddOnsSection,
    ComfortAndAddOnsValues,
} from '@/components/hotel/checkout/ComfortAndAddOns';
import {
    checkoutComfortAndAddOnsDefaultData,
} from '@/components/hotel/checkout/ComfortAndAddOns';

// Phase 4: Sticky Sovereign Folio Ledger & Patron Host Rail
import { CheckoutFolioRail, CheckoutFolioRailData } from '@/components/hotel/checkout/CheckoutFolioRail';
import {
    checkoutFolioDefaultData,
} from '@/components/hotel/checkout/CheckoutFolioRail';

export interface CheckoutInteractiveProps {
    patronData?: PatronSectionData;
    comfortData?: ComfortAndAddOnsData;
    folioData?: CheckoutFolioRailData;
    className?: string;
}

export function CheckoutInteractive({
    patronData = checkoutPatronDefaultData,
    comfortData = checkoutComfortAndAddOnsDefaultData,
    folioData = checkoutFolioDefaultData,
}: CheckoutInteractiveProps){
    const router = useRouter();

    // Patron Information Form State (Phase 2)
    const [patronFormData, setPatronFormData] = useState<PatronFormData>(
        patronData.initialFormValues
    );

    // Comfort & Selected Add-Ons State (Phase 3)
    const [comfortValues, setComfortValues] = useState<ComfortAndAddOnsValues>({
        selectedPillowId: comfortData.defaultPillowId,
        temperatureCelsius: comfortData.initialTemperatureCelsius,
        selectedAddOnIds: comfortData.addOns
            .filter(function (item) {
                return item.defaultSelected;
            })
            .map(function (item) {
                return item.id;
            }),
    });

    // Derive Active Add-On Line Items for Phase 4 Sticky Ledger
    const activeAddOnItems = comfortData.addOns
        .filter(function (addOn) {
            return comfortValues.selectedAddOnIds.includes(addOn.id);
        })
        .map(function (addOn) {
            return {
                id: addOn.id,
                title: addOn.title,
                price: addOn.price,
            };
        });



    // Handle Patron Form Updates
    const handlePatronFormChange = (updated: PatronFormData) => {
        setPatronFormData(updated);
    };

    // Handle Comfort & Add-On Updates (auto-syncs to folio ledger)
    const handleComfortChange = (updated: ComfortAndAddOnsValues) => {
        setComfortValues(updated);
    };

    // Handle Form Final Submission -> Transmit to Confirmation Screen
    const handleProceedToConfirmation = (finalComfortValues: ComfortAndAddOnsValues) => {
        console.log('Finalizing Sovereign Patron Reservation...', {
            patron: patronFormData,
            comfort: finalComfortValues,
            selectedAddOns: activeAddOnItems,
        });

        // Navigate to booking confirmation & digital key voucher pass
        router.push('/confirmation?bookingRef=AUR-8829-CAP');
    };

    return <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT 8 COLUMNS: Patron Form, Logistics, Comfort & Curated Add-Ons */}
        <div className="lg:col-span-8 space-y-10 lg:space-y-12">
            {/* Phase 2: Editorial Monograph, Section 1 (Patron Details) & Section 2 (Arrival Logistics) */}
            <PatronAndLogisticsSection
                data={patronData}
                onChange={handlePatronFormChange}
            />

            {/* Phase 3: Section 3 (Pillow Architecture & Staging Temp) + Section 4 (Curated Add-Ons) + Voucher */}
            <ComfortAndAddOnsSection
                data={comfortData}
                onChange={handleComfortChange}
                onSubmit={handleProceedToConfirmation}
            />
        </div>

        {/* RIGHT 4 COLUMNS: Sticky Itemized Folio Ledger & On-Duty Host Card */}
        <div className="lg:col-span-4 sticky top-6 lg:top-8">
            <CheckoutFolioRail
                data={folioData}
                selectedAddOns={activeAddOnItems}
                onCallHost={function () {
                    console.log('Dialing Patron Host Matteo de Luca');
                }}
                onMessageHost={function () {
                    console.log('Dispatching encrypted email to Matteo de Luca');
                }}
            />
        </div>
    </div>
}