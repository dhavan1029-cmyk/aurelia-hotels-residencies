import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export interface DigitalPassProps {
    bookingReference: string;
    guestName: string;
    tier: string;
    sanctuaryName: string;
    suiteName: string;
    roomUnitCode: string;
    checkInDate: string;
    checkOutDate: string;
    majordomoName: string;
}

export function DigitalPassCard({
    bookingReference,
    guestName,
    tier,
    sanctuaryName,
    suiteName,
    roomUnitCode,
    checkInDate,
    checkOutDate,
    majordomoName,
}: DigitalPassProps) {
    return (
        <Card
            variant="bordered"
            padding="none"
            className="max-w-md mx-auto bg-[#1f1e1d] text-[#fcf9f4] overflow-hidden shadow-2xl"
        >
            {/* Top Pass Monogram Bar */}
            <div className="bg-[#2a2826] px-6 py-4 flex items-center justify-between border-b border-[#3b3834]">
                <div className="flex items-center gap-2">
                    <span className="font-serif tracking-[0.25em] text-sm uppercase">
                        Aurelia Pass
                    </span>
                </div>

                <Badge variant="gold">{tier}</Badge>
            </div>

            {/* Body Details */}
            <div className="p-8 flex flex-col gap-6">
                <div>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#a39f97] block">
                        Destination Enclave
                    </span>

                    <h3 className="font-serif text-2xl text-[#fcf9f4] mt-0.5">
                        {sanctuaryName}
                    </h3>

                    <p className="text-xs text-[#bfa76f] font-sans mt-1">
                        {suiteName} • {roomUnitCode}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#343230] text-xs font-sans">
                    <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#8a867f] block">
                            Guest Patron
                        </span>

                        <span className="text-[#fcf9f4] font-medium">
                            {guestName}
                        </span>
                    </div>

                    <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#8a867f] block">
                            Folio Ref
                        </span>

                        <span className="font-mono text-[#fcf9f4]">
                            {bookingReference}
                        </span>
                    </div>

                    <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#8a867f] block">
                            Check In
                        </span>

                        <span className="text-[#fcf9f4]">
                            {checkInDate}
                        </span>
                    </div>

                    <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#8a867f] block">
                            Personal Majordomo
                        </span>

                        <span className="text-[#fcf9f4]">
                            {majordomoName}
                        </span>
                    </div>
                </div>

                {/* Simulated QR Pass */}
                <div className="flex flex-col items-center gap-3 py-2">
                    <div className="w-36 h-36 bg-white p-3 flex items-center justify-center border border-[#dcdad5]">
                        {/* SVG QR Code Simulation */}
                        <div className="w-full h-full bg-[#1f1e1d] grid grid-cols-6 grid-rows-6 gap-1 p-1">
                            {Array.from({ length: 36 }).map(function (_, i) {
                                return (
                                    <div
                                        key={i}
                                        className={
                                            i % 2 === 0 || i % 5 === 0
                                                ? 'bg-white'
                                                : 'bg-transparent'
                                        }
                                    />
                                );
                            })}
                        </div>
                    </div>

                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#a39f97]">
                        Hold Near Sanctuary Smart Lock
                    </span>
                </div>
            </div>
        </Card>
    );
}
