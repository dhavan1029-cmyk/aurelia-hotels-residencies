import { Card } from '../ui/Card';

export interface CheckoutSummaryProps {
    suiteName: string;
    sanctuaryName: string;
    checkInDate: string;
    checkOutDate: string;
    nightsCount: number;
    roomNightlyRate: number;
    roomTotal: number;
    addOns: Array<{ title: string; price: number }>;
    vatAmount: number;
    cityTaxAmount: number;
    grandTotal: number;
    currency: string;
}

export function CheckoutSummary({
    suiteName,
    sanctuaryName,
    checkInDate,
    checkOutDate,
    nightsCount,
    roomNightlyRate,
    roomTotal,
    addOns,
    vatAmount,
    cityTaxAmount,
    grandTotal,
    currency = 'EUR',
}: CheckoutSummaryProps) {
    const sym = currency === 'EUR' ? '€' : currency;

    return (
        <Card
            variant="bordered"
            padding="lg"
            className="bg-[#fcf9f4]"
        >
            <div className="border-b border-[#e8e4dc] pb-4 mb-6">
                <span className="text-[10px] tracking-[0.25em] text-[#8e763b] uppercase block">
                    Reservation Summary
                </span>

                <h3 className="font-serif text-2xl text-[#1f1e1d] mt-1">
                    {suiteName}
                </h3>

                <p className="text-xs text-[#716e67] font-sans mt-0.5">
                    {sanctuaryName}
                </p>
            </div>

            <div className="space-y-3 text-xs font-sans text-[#4a4742] pb-6 border-b border-[#e8e4dc]">
                <div className="flex justify-between">
                    <span className="text-[#8c8881]">Horizon</span>

                    <span>
                        {checkInDate} → {checkOutDate} ({nightsCount} Nights)
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-[#8c8881]">
                        Suite Base ({nightsCount} × {sym}
                        {roomNightlyRate.toLocaleString()})
                    </span>

                    <span>
                        {sym}
                        {roomTotal.toLocaleString()}
                    </span>
                </div>

                {addOns.length > 0 && (
                    <div className="pt-2 border-t border-[#f0ede6] space-y-2">
                        <span className="text-[10px] uppercase tracking-widest text-[#8e763b] block">
                            Curated Add-Ons
                        </span>

                        {addOns.map(function (add, i) {
                            return (
                                <div
                                    key={i}
                                    className="flex justify-between pl-2"
                                >
                                    <span className="text-[#6e6b64]">
                                        + {add.title}
                                    </span>

                                    <span>
                                        {sym}
                                        {add.price.toLocaleString()}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="pt-2 border-t border-[#f0ede6] space-y-1.5">
                    <div className="flex justify-between text-[#7a7770]">
                        <span>Italian Hospitality VAT (10%)</span>

                        <span>
                            {sym}
                            {vatAmount.toLocaleString()}
                        </span>
                    </div>

                    <div className="flex justify-between text-[#7a7770]">
                        <span>Municipal Tourism Enclave Surcharge</span>

                        <span>
                            {sym}
                            {cityTaxAmount.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            <div className="pt-6 flex justify-between items-end">
                <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8c8881] block">
                        Total Guaranteed Folio
                    </span>

                    <span className="text-[11px] text-[#24633b] font-medium">
                        Bespoke Majordomo Included
                    </span>
                </div>

                <div className="text-right">
                    <span className="font-serif text-3xl text-[#1f1e1d] font-normal">
                        {sym}
                        {grandTotal.toLocaleString()}
                    </span>

                    <span className="block text-[10px] text-[#8c8881] uppercase">
                        Includes all statutory dues
                    </span>
                </div>
            </div>
        </Card>
    );
}
