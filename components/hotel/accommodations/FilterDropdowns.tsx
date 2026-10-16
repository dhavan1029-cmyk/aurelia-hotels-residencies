'use client'

import { useState } from 'react';

export interface DateRange {
    startDate: string; // ISO date 'YYYY-MM-DD'
    endDate: string;
    label: string;
    nights: number;
}

export interface DateRangeDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    onApplyDates: (range: DateRange) => void;
    initialStartDate?: string;
    initialEndDate?: string;
    className?: string
}

export interface PartyComposition {
    adults: number;
    children: number;
    suites: number;
    requiresButler: boolean;
    label: string;
}

export interface PartyCompositionDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    onApplyParty: (party: PartyComposition) => void;
    initialAdults?: number;
    initialChildren?: number;
    initialSuites?: number;
    className?: string
}

export function DateRangeDropdown({
    isOpen,
    onClose,
    onApplyDates,
    initialStartDate = '2025-10-14',
    initialEndDate = '2025-10-19',
    className
}: DateRangeDropdownProps) {
    const [start, setStart] = useState<string>(initialStartDate);
    const [end, setEnd] = useState<string>(initialEndDate);
    const [nights, setNights] = useState<number>(5);

    if (!isOpen) return null;

    // October 2025 Calendar Matrix (Starts on Wednesday)
    const daysInOctober = Array.from({ length: 31 }, function (_, i) {
        return i + 1;
    });
    const paddingDays = [null, null]; // Oct 1, 2025 is Wednesday (Mon, Tue empty)

    const handleDateClick = (day: number) => {
        const formattedDay = day < 10 ? `0${day}` : `${day}`;
        const clicked = `2025-10-${formattedDay}`;

        if (!start || (start && end)) {
            setStart(clicked);
            setEnd('');
            setNights(1);
        } else if (start && !end) {
            if (new Date(clicked) >= new Date(start)) {
                setEnd(clicked);
                const diffTime = Math.abs(new Date(clicked).getTime() - new Date(start).getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                setNights(diffDays || 1);
            } else {
                setStart(clicked);
                setEnd('');
                setNights(1);
            }
        }
    };

    const handleApply = () => {
        onApplyDates({
            startDate: start,
            endDate: end || start,
            label: `Oct ${start.split('-')[2]} – ${end ? end.split('-')[2] : start.split('-')[2]}, 2025 • ${nights} Nights`,
            nights: nights,
        });
        onClose();
    };

    const handlePresetSelect = (presetStart: number, presetEnd: number) => {
        const s = `2025-10-${presetStart < 10 ? '0' + presetStart : presetStart}`;
        const e = `2025-10-${presetEnd < 10 ? '0' + presetEnd : presetEnd}`;
        setStart(s);
        setEnd(e);
        setNights(presetEnd - presetStart);
    };

    if(isOpen){
        window.addEventListener('click', onClose)
    }else{
        window.removeEventListener('click', onClose)
    }

    return (
        <div 
            className={`absolute left-0 top-full mt-1 z-40 w-85 sm:w-95 bg-white border border-[#ded9ce] rounded-lg shadow-[0_16px_40px_rgba(31,30,29,0.12)] p-5 text-[#1f1e1d] animate-in fade-in zoom-in-95 duration-200 ${className}`}
            onClick={e => {
                e.stopPropagation()
            }}
        >
            {/* Header: Horizon Title & Live Counter */}
            <div className="flex items-center justify-between border-b border-[#f0ece3] pb-3 mb-4">
                <div>
                    <span className="block text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b]">
                        STAY HORIZON
                    </span>
                    <h4 className="font-serif text-lg font-normal text-[#1f1e1d] mt-0.5">
                        October 2025
                    </h4>
                </div>
                <div className="text-right">
                    <span className="inline-block px-2.5 py-1 bg-[#f6f2ea] text-[#8e763b] rounded-full text-[10px] font-sans font-semibold tracking-wider uppercase">
                        {nights} {nights === 1 ? 'Night' : 'Nights'}
                    </span>
                </div>
            </div>

            {/* Quick Horizon Presets Strip */}
            <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1 text-[10px] font-sans">
                <button
                    type="button"
                    onClick={function () {
                        handlePresetSelect(14, 19);
                    }}
                    className="px-2.5 py-1 bg-[#f6f3ee] hover:bg-[#eeeae2] border border-[#ded9ce] rounded-lg transition-colors whitespace-nowrap text-[#55524d]"
                >
                    Recommended (5 Nts)
                </button>
                <button
                    type="button"
                    onClick={function () {
                        handlePresetSelect(17, 19);
                    }}
                    className="px-2.5 py-1 bg-[#f6f3ee] hover:bg-[#eeeae2] border border-[#ded9ce] rounded-lg transition-colors whitespace-nowrap text-[#55524d]"
                >
                    Weekend (2 Nts)
                </button>
                <button
                    type="button"
                    onClick={function () {
                        handlePresetSelect(12, 19);
                    }}
                    className="px-2.5 py-1 bg-[#f6f3ee] hover:bg-[#eeeae2] border border-[#ded9ce] rounded-lg transition-colors whitespace-nowrap text-[#55524d]"
                >
                    Solstice (7 Nts)
                </button>
            </div>

            {/* Calendar Day Labels */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-sans font-semibold text-[#8e8a82] uppercase mb-2">
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
                <span>Su</span>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-xs font-sans">
                {paddingDays.map(function (_, idx) {
                    return <div key={`pad-${idx}`} className="h-9 w-full" />;
                })}
                {daysInOctober.map(function (day) {
                    const formatted = `2025-10-${day < 10 ? '0' + day : day}`;
                    const isStart = start === formatted;
                    const isEnd = end === formatted;
                    const inRange =
                        start &&
                        end &&
                        new Date(formatted) > new Date(start) &&
                        new Date(formatted) < new Date(end);

                    let dayStyle = 'hover:bg-[#f6f2ea] text-[#2c2a26]';
                    if (isStart || isEnd) {
                        dayStyle = 'bg-[#1f1e1d] text-white font-semibold shadow-xs';
                    } else if (inRange) {
                        dayStyle = 'bg-[#f4efe5] text-[#8e763b] font-medium';
                    }

                    return (
                        <button
                            key={day}
                            type="button"
                            onClick={function () {
                                handleDateClick(day);
                            }}
                            className={`h-9 w-full rounded-lg flex items-center justify-center transition-all ${dayStyle}`}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>

            {/* Direct Booking Privilege Micro-Notice */}
            <div className="mt-4 pt-3 border-t border-[#f0ece3] flex items-center justify-between text-[11px] font-sans">
                <span className="text-[#78756d] text-[10px]">
                    2-night minimum for oceanfront suites
                </span>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-3 py-1.5 text-xs text-[#78756d] hover:text-[#1f1e1d] uppercase tracking-wider font-semibold"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleApply}
                        className="px-4 py-1.5 bg-[#8e763b] hover:bg-[#7b6632] text-white text-[10px] font-semibold uppercase tracking-[0.18em] rounded-lg shadow-sm transition-all"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}

export function PartyCompositionDropdown({
    isOpen,
    onClose,
    onApplyParty,
    initialAdults = 2,
    initialChildren = 0,
    initialSuites = 1,
    className
}: PartyCompositionDropdownProps) {
    const [adults, setAdults] = useState<number>(initialAdults);
    const [children, setChildren] = useState<number>(initialChildren);
    const [suites, setSuites] = useState<number>(initialSuites);
    const [requiresButler, setRequiresButler] = useState<boolean>(true);

    if (!isOpen) return null;

    const handleApply = () => {
        const guestTotal = adults + children;
        const suiteText = suites === 1 ? '1 Suite' : `${suites} Suites`;
        const guestText = guestTotal === 1 ? '1 Guest' : `${guestTotal} Guests`;

        onApplyParty({
            adults,
            children,
            suites,
            requiresButler,
            label: `${guestText} • ${suiteText}`,
        });
        onClose();
    };

    if(isOpen){
        window.addEventListener('click', onClose)
    }else{
        window.removeEventListener('click', onClose)
    }

    return (
        <div 
            className={`absolute left-0 sm:left-auto sm:right-0 lg:left-0 top-full mt-1 z-40 w-[320px] sm:w-87.5 bg-white border border-[#ded9ce] rounded-lg shadow-[0_16px_40px_rgba(31,30,29,0.12)] p-5 text-[#1f1e1d] animate-in fade-in zoom-in-95 duration-200 ${className}`}
            onClick={e => {
                e.stopPropagation()
            }}
        >
            {/* Header */}
            <div className="border-b border-[#f0ece3] pb-3 mb-4">
                <span className="block text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b]">
                    PATRONS & ACCOMMODATIONS
                </span>
                <h4 className="font-serif text-lg font-normal text-[#1f1e1d] mt-0.5">
                    Party Composition
                </h4>
            </div>

            {/* Stepper Rows */}
            <div className="space-y-4 font-sans text-xs">
                {/* 1. Adults */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="font-medium text-[#1f1e1d] block">Adults</span>
                        <span className="text-[10px] text-[#8e8a82]">Age 13 and above</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <button
                            type="button"
                            disabled={adults <= 1}
                            onClick={function () {
                                setAdults(adults - 1);
                            }}
                            className="w-8 h-8 rounded-lg border border-[#ded9ce] bg-[#faf8f4] hover:bg-[#eeeae2] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-sm font-semibold text-[#1f1e1d] transition-colors"
                        >
                            −
                        </button>
                        <span className="w-5 text-center font-serif text-sm font-semibold">
                            {adults}
                        </span>
                        <button
                            type="button"
                            disabled={adults >= 8}
                            onClick={function () {
                                setAdults(adults + 1);
                            }}
                            className="w-8 h-8 rounded-lg border border-[#ded9ce] bg-[#faf8f4] hover:bg-[#eeeae2] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-sm font-semibold text-[#1f1e1d] transition-colors"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* 2. Children */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="font-medium text-[#1f1e1d] block">Children</span>
                        <span className="text-[10px] text-[#8e8a82]">Age 2 – 12 years</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <button
                            type="button"
                            disabled={children <= 0}
                            onClick={function () {
                                setChildren(children - 1);
                            }}
                            className="w-8 h-8 rounded-lg border border-[#ded9ce] bg-[#faf8f4] hover:bg-[#eeeae2] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-sm font-semibold text-[#1f1e1d] transition-colors"
                        >
                            −
                        </button>
                        <span className="w-5 text-center font-serif text-sm font-semibold">
                            {children}
                        </span>
                        <button
                            type="button"
                            disabled={children >= 4}
                            onClick={function () {
                                setChildren(children + 1);
                            }}
                            className="w-8 h-8 rounded-lg border border-[#ded9ce] bg-[#faf8f4] hover:bg-[#eeeae2] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-sm font-semibold text-[#1f1e1d] transition-colors"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* 3. Suites / Sanctuaries */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="font-medium text-[#1f1e1d] block">Suites / Villas</span>
                        <span className="text-[10px] text-[#8e8a82]">Independent keys</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <button
                            type="button"
                            disabled={suites <= 1}
                            onClick={function () {
                                setSuites(suites - 1);
                            }}
                            className="w-8 h-8 rounded-lg border border-[#ded9ce] bg-[#faf8f4] hover:bg-[#eeeae2] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-sm font-semibold text-[#1f1e1d] transition-colors"
                        >
                            −
                        </button>
                        <span className="w-5 text-center font-serif text-sm font-semibold">
                            {suites}
                        </span>
                        <button
                            type="button"
                            disabled={suites >= 4}
                            onClick={function () {
                                setSuites(suites + 1);
                            }}
                            className="w-8 h-8 rounded-lg border border-[#ded9ce] bg-[#faf8f4] hover:bg-[#eeeae2] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-sm font-semibold text-[#1f1e1d] transition-colors"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* 4. Luxury Majordomo Toggle Checkbox */}
                <label className="mt-2 pt-3 border-t border-[#f0ece3] flex items-start gap-2.5 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={requiresButler}
                        onChange={function (e) {
                            setRequiresButler(e.target.checked);
                        }}
                        className="mt-0.5 accent-[#8e763b] rounded cursor-pointer"
                    />
                    <div className="text-[11px] leading-tight">
                        <span className="text-[#1f1e1d] font-medium block">
                            Assigned Sovereign Majordomo
                        </span>
                        <span className="text-[10px] text-[#8e8a82]">
                            Included with all 2+ bedroom suites & cliffside villas
                        </span>
                    </div>
                </label>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 pt-3.5 border-t border-[#f0ece3] flex items-center justify-end gap-2 text-[11px] font-sans">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-1.5 text-xs text-[#78756d] hover:text-[#1f1e1d] uppercase tracking-wider font-semibold"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleApply}
                    className="px-4 py-1.5 bg-[#8e763b] hover:bg-[#7b6632] text-white text-[10px] font-semibold uppercase tracking-[0.18em] rounded-lg shadow-sm transition-all"
                >
                    Apply
                </button>
            </div>
        </div>
    );
}