'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';

export interface DateRangeCalendarProps {
    isOpen: boolean;
    onClose: () => void;
    checkIn: string | null;       // ISO format: 'YYYY-MM-DD'
    checkOut: string | null;      // ISO format: 'YYYY-MM-DD'
    onApplyDates: (range: { checkIn: string; checkOut: string; nights: number }) => void;
    onClearDates?: () => void;
    minStayNights?: number;       // default 1
    maxStayNights?: number;       // default 90
    initialMonth?: Date;          // default view month
    className?: string;
}

type SelectingField = 'checkIn' | 'checkOut';

export function parseISODate(iso: string): Date {
    const [year, month, day] = iso.split('-').map(Number);
    return new Date(year, month - 1, day);
}

export function toISODate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

export function formatDateDisplay(isoString: string | null): string {
    if (
        !isoString ||
        (new Set(['check in', 'check out'])).has(isoString.toLowerCase())
    ) return 'Add date';

    const [year, month, day] = isoString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export function calculateNights(startIso: string, endIso: string): number {
    const start = parseISODate(startIso);
    const end = parseISODate(endIso);
    const diffTime = end.getTime() - start.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
}


function normalizeDate(value: string | null): string | null {
    if (!value) return null;

    const normalized = value.trim().toLowerCase();

    if (
        normalized === 'check in' ||
        normalized === 'check out' ||
        normalized === 'add date'
    ) {
        return null;
    }

    return value;
}


const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function DateRangeCalendar({
    isOpen,
    onClose,
    checkIn,
    checkOut,
    onApplyDates,
    onClearDates,
    minStayNights = 1,
    maxStayNights = 90,
    initialMonth,
    className = '',
}: DateRangeCalendarProps) {
    // -------------------------------------------------------------
    // 1. Pending Local State (Staged until "Apply dates" is clicked)
    // -------------------------------------------------------------
    
    const [pendingCheckIn, setPendingCheckIn] = useState<string | null>(
        () => normalizeDate(checkIn)
    );

    const [pendingCheckOut, setPendingCheckOut] = useState<string | null>(
        () => normalizeDate(checkOut)
    );

    const [activeField, setActiveField] = useState<SelectingField>(() => {
        const normalizedCheckIn = normalizeDate(checkIn);
        const normalizedCheckOut = normalizeDate(checkOut);

        return normalizedCheckIn && !normalizedCheckOut
            ? 'checkOut'
            : 'checkIn';
    });

    const [hoveredDate, setHoveredDate] = useState<string | null>(null);

    // Initial base month: use checkIn if valid, else today / initialMonth
    
    const [viewDate, setViewDate] = useState<Date>(() => {
        const normalizedCheckIn = normalizeDate(checkIn);

        if (normalizedCheckIn) {
            return parseISODate(normalizedCheckIn);
        }

        return initialMonth ?? new Date();
    });


    const popoverRef = useRef<HTMLDivElement>(null);

    // Sync external props on open
    
    useEffect(() => {
        if (!isOpen) return;

        const normalizedCheckIn = normalizeDate(checkIn);
        const normalizedCheckOut = normalizeDate(checkOut);

        setPendingCheckIn(normalizedCheckIn);
        setPendingCheckOut(normalizedCheckOut);

        setActiveField(
            normalizedCheckIn && !normalizedCheckOut
                ? 'checkOut'
                : 'checkIn'
        );

        if (normalizedCheckIn) {
            setViewDate(parseISODate(normalizedCheckIn));
        } else {
            setViewDate(initialMonth ?? new Date());
        }
    }, [isOpen, checkIn, checkOut, initialMonth]);


    // Handle escape key & click outside
    useEffect(function () {
        if (!isOpen) return;
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose();
        }
        function handleClickOutside(e: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
                onClose();
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);
        return function () {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Month Navigation
    function handlePrevMonth() {
        setViewDate(function (curr) {
            return new Date(curr.getFullYear(), curr.getMonth() - 1, 1);
        });
    }

    function handleNextMonth() {
        setViewDate(function (curr) {
            return new Date(curr.getFullYear(), curr.getMonth() + 1, 1);
        });
    }

    // Baseline: Today at 00:00:00
    const today = useMemo(function () {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    const todayIso = toISODate(today);

    // Dual Consecutive Months (Month 1 & Month 2)
    const month1 = useMemo(function () {
        return new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    }, [viewDate]);

    const month2 = useMemo(function () {
        return new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
    }, [viewDate]);

    // Check if previous navigation is before current calendar month
    const isPrevDisabled = useMemo(function () {
        const currentMonthFirst = new Date(today.getFullYear(), today.getMonth(), 1);
        return month1 <= currentMonthFirst;
    }, [month1, today]);

    // Computed validation
    const nightsCount = useMemo(function () {
        if (pendingCheckIn && pendingCheckOut) {
            return calculateNights(pendingCheckIn, pendingCheckOut);
        }
        return 0;
    }, [pendingCheckIn, pendingCheckOut]);

    const isValidRange =
        pendingCheckIn &&
        pendingCheckOut &&
        nightsCount >= minStayNights &&
        nightsCount <= maxStayNights;

    function isDatePast(dateIso: string): boolean {
        return dateIso < todayIso;
    }

    function isDateExceedingMax(dateIso: string): boolean {
        if (!pendingCheckIn) return false;
        const nights = calculateNights(pendingCheckIn, dateIso);
        return nights > maxStayNights;
    }

    // Cell Click Interaction Protocol
    function handleDateClick(dateIso: string) {
        if (isDatePast(dateIso)) return;

        // Step 1: Picking Check-In
        if (activeField === 'checkIn') {
            setPendingCheckIn(dateIso);
            if (pendingCheckOut && dateIso >= pendingCheckOut) {
                setPendingCheckOut(null);
            }
            setActiveField('checkOut');
            return;
        }

        // Step 2: Picking Check-Out
        if (activeField === 'checkOut') {
            if (!pendingCheckIn) {
                setPendingCheckIn(dateIso);
                setActiveField('checkOut');
                return;
            }

            if (dateIso <= pendingCheckIn) {
                setPendingCheckIn(dateIso);
                setPendingCheckOut(null);
                setActiveField('checkOut');
                return;
            }

            if (isDateExceedingMax(dateIso)) {
                return;
            }

            setPendingCheckOut(dateIso);
        }
    }

    function handleClear() {
        setPendingCheckIn(null);
        setPendingCheckOut(null);
        setActiveField('checkIn');
        if (onClearDates) onClearDates();
    }

    function handleApply() {
        if (!isValidRange || !pendingCheckIn || !pendingCheckOut) return;

        onApplyDates({
            checkIn: pendingCheckIn,
            checkOut: pendingCheckOut,
            nights: nightsCount,
        });
        onClose();
    }

    // Render Month Calendar Grid
    function renderMonthGrid(monthDate: Date) {
        const year = monthDate.getFullYear();
        const monthIndex = monthDate.getMonth();
        const monthTitle = monthDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
        });

        const firstDayOfMonth = new Date(year, monthIndex, 1);
        const lastDayOfMonth = new Date(year, monthIndex + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();

        // Monday-based indexing: Sunday=0 -> 6, Monday=1 -> 0, etc.
        const startingDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;

        const cells = [];
        for (let i = 0; i < startingDayOfWeek; i++) {
            cells.push(<div key={`empty-${i}`} className="w-10 h-10 sm:w-11 sm:h-11" />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateObj = new Date(year, monthIndex, day);
            const dateIso = toISODate(dateObj);

            const isPast = isDatePast(dateIso);
            const isToday = dateIso === todayIso;
            const isCheckIn = dateIso === pendingCheckIn;
            const isCheckOut = dateIso === pendingCheckOut;
            const isExceedingMax = activeField === 'checkOut' && isDateExceedingMax(dateIso);

            const effectiveEnd =
                pendingCheckOut ||
                (activeField === 'checkOut' && hoveredDate && hoveredDate > (pendingCheckIn || '')
                    ? hoveredDate
                    : null);
            
            const isInRange =
                pendingCheckIn &&
                effectiveEnd &&
                dateIso > pendingCheckIn &&
                dateIso < effectiveEnd;

            const isDisabled = isPast || isExceedingMax;

            let cellStyle = 'text-[#1f1e1d] hover:bg-[#eeeae2]';
            let containerBg = 'bg-transparent';
            let shapeStyle = '-lg';

            if (isCheckIn) {
                cellStyle = 'bg-[#8e763b] text-white font-semibold shadow-xs';
                shapeStyle = '-l-lg -r-none';
                if (!pendingCheckOut && !hoveredDate) shapeStyle = '-lg';
            } else if (isCheckOut) {
                cellStyle = 'bg-[#8e763b] text-white font-semibold shadow-xs';
                shapeStyle = '-r-lg -l-none';
            } else if (isInRange) {
                cellStyle = 'text-[#1f1e1d] font-medium';
                containerBg = 'bg-[#8e763b]/12';
                shapeStyle = '-none';
            } else if (isToday) {
                cellStyle = 'text-[#8e763b] font-bold border border-[#8e763b]/40 hover:bg-[#eeeae2]';
            }

            if (isDisabled) {
                cellStyle = 'text-[#b3aba0] opacity-40 cursor-not-allowed hover:bg-transparent';
                containerBg = 'bg-transparent';
            }

            cells.push(
                <div
                    key={dateIso}
                    className={`relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 ${containerBg} ${shapeStyle}`}
                >
                    <button
                        type="button"
                        disabled={isDisabled}
                        onClick={function () {
                            handleDateClick(dateIso);
                        }}
                        onMouseEnter={function () {
                            if (!isDisabled && activeField === 'checkOut') {
                                setHoveredDate(dateIso);
                            }
                        }}
                        onMouseLeave={function () {
                            setHoveredDate(null);
                        }}
                        aria-label={`${dateObj.toLocaleDateString('en-US', { dateStyle: 'full' })}${
                            isCheckIn ? ' - Selected Check-in' : ''
                        }${isCheckOut ? ' - Selected Check-out' : ''}`}
                        className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center font-sans text-xs transition-colors duration-150 ${shapeStyle} ${cellStyle}`}
                    >
                        <span>{day}</span>
                    </button>
                </div>
            );
        }

        return (
            <div className="w-fit flex flex-col space-y-3.5">
                <div className="text-center">
                    <h4 className="font-serif text-base sm:text-lg font-medium text-[#1f1e1d] tracking-tight">
                        {monthTitle}
                    </h4>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center border-b border-[#f2ede4] pb-2">
                    {WEEKDAYS.map(function (wd) {
                        return (
                            <span
                                key={wd}
                                className="text-[10px] font-sans font-medium uppercase tracking-wider text-[#78756e]"
                            >
                                {wd}
                            </span>
                        );
                    })}
                </div>

                <div className="grid grid-cols-7 gap-y-1 gap-x-0.5 justify-items-center">
                    {cells}
                </div>
            </div>
        );
    }

    if (!isOpen) return null;

    return (
        <div
            ref={popoverRef}
            role="dialog"
            aria-modal="true"
            aria-label="Date Range Calendar Selector"
            className={`w-100 sm:w-150 md:w-200 lg:w-200 bg-white border border-[#ded9ce] -3xl p-5 sm:p-7 shadow-[0_20px_50px_rgba(31,30,29,0.14)] text-[#1f1e1d] animate-in fade-in-50 zoom-in-95 z-50 ${className}`}
        >
            {/* Header & Close */}
            <div className="flex items-start justify-between pb-4 border-b border-[#f2ede4]">
                <div className="space-y-0.5">
                    <span className="text-[9px] font-mono font-semibold uppercase tracking-[0.26em] text-[#8e763b] block">
                        YOUR STAY • RESERVATION HORIZON
                    </span>
                    <h3 className="font-serif text-2xl sm:text-[26px] font-normal text-[#1f1e1d] tracking-tight leading-none">
                        Select your dates
                    </h3>
                    <p className="text-xs text-[#78756e] font-sans font-light">
                        Choose your arrival and departure coordinates
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close date picker"
                    className="p-2 -xl text-[#78756e] hover:text-[#1f1e1d] hover:bg-[#f6f3ee] transition-colors"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>

            {/* Selection Tiles (Check-In / Check-Out) */}
            <div className="py-4 border-b border-[#f2ede4] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
                    <button
                        type="button"
                        onClick={function () {
                            setActiveField('checkIn');
                        }}
                        className={`p-3 -2xl border text-left transition-all duration-200 ${
                            activeField === 'checkIn'
                                ? 'bg-[#f6f3ee] border-[#8e763b] ring-1 ring-[#8e763b]/30'
                                : 'bg-white border-[#ded9ce] hover:border-[#8e763b]/50'
                        }`}
                    >
                        <span className="text-[9px] font-mono font-semibold uppercase tracking-[0.2em] text-[#8e763b] block">
                            CHECK-IN
                        </span>
                        <span className="font-serif text-sm sm:text-base font-medium text-[#1f1e1d] block mt-0.5 truncate">
                            {formatDateDisplay(pendingCheckIn)}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={function () {
                            if (pendingCheckIn) {
                                setActiveField('checkOut');
                            }
                        }}
                        className={`p-3 -2xl border text-left transition-all duration-200 ${
                            activeField === 'checkOut'
                                ? 'bg-[#f6f3ee] border-[#8e763b] ring-1 ring-[#8e763b]/30'
                                : 'bg-white border-[#ded9ce] hover:border-[#8e763b]/50'
                        }`}
                    >
                        <span className="text-[9px] font-mono font-semibold uppercase tracking-[0.2em] text-[#8e763b] block">
                            CHECK-OUT
                        </span>
                        <span className="font-serif text-sm sm:text-base font-medium text-[#1f1e1d] block mt-0.5 truncate">
                            {formatDateDisplay(pendingCheckOut)}
                        </span>
                    </button>
                </div>

                <div className="shrink-0 flex items-center justify-end sm:justify-start gap-2">
                    {isValidRange ? (
                        <div className="px-3.5 py-2 -xl bg-[#f6f3ee] border border-[#ded9ce] flex items-center gap-2 text-xs font-sans text-[#1f1e1d]">
                            <span className="w-1.5 h-1.5 -full bg-[#8e763b]" />
                            <span className="font-serif font-semibold text-sm text-[#8e763b]">{nightsCount}</span>
                            <span className="text-[#78756e] font-light">
                                {nightsCount === 1 ? 'Night Stay' : 'Nights Stay'}
                            </span>
                        </div>
                    ) : (
                        <div className="text-[11px] font-sans text-[#78756e] italic px-2">
                            {pendingCheckIn && !pendingCheckOut ? 'Select departure date' : 'Select arrival date'}
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Strip */}
            <div className="flex items-center justify-between pt-4 pb-2 px-1">
                <button
                    type="button"
                    disabled={isPrevDisabled}
                    onClick={handlePrevMonth}
                    aria-label="Previous month"
                    className="p-2 -xl bg-[#f6f3ee] hover:bg-[#eeeae2] border border-[#ded9ce] text-[#1f1e1d] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#78756e] hidden sm:block">
                    CONSECUTIVE CALENDAR HORIZON
                </div>

                <button
                    type="button"
                    onClick={handleNextMonth}
                    aria-label="Next month"
                    className="p-2 -xl bg-[#f6f3ee] hover:bg-[#eeeae2] border border-[#ded9ce] text-[#1f1e1d] transition-colors"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>

            {/* Calendar Grids */}
            <div className="py-2 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                <div className="w-fit pl-8 md:pl-4">
                    {renderMonthGrid(month1)}
                </div>

                <div className="hidden md:block w-fit pl-8 md:pl-4 md:border-l border-[#f2ede4]">
                    {renderMonthGrid(month2)}
                </div>
            </div>

            {/* Helper restriction note */}
            <div className="pt-3 text-[10px] font-sans text-[#78756e] flex items-center justify-between">
                <span>Maximum stay horizon: 90 consecutive nights direct.</span>
                {activeField === 'checkOut' && pendingCheckIn && (
                    <span className="text-[#8e763b] font-medium">Minimum stay: 1 night</span>
                )}
            </div>

            {/* Footer Actions */}
            <div className="mt-4 pt-4 border-t border-[#f2ede4] flex items-center justify-between gap-4">
                <button
                    type="button"
                    onClick={handleClear}
                    className="text-xs font-sans font-medium text-[#78756e] hover:text-[#1f1e1d] underline transition-colors"
                >
                    Clear dates
                </button>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2.5 -xl bg-[#f6f3ee] hover:bg-[#eeeae2] border border-[#ded9ce] text-[#2c2a26] text-xs font-sans font-medium transition-colors"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        disabled={!isValidRange}
                        onClick={handleApply}
                        className="px-6 py-2.5 -xl bg-[#1f1e1d] hover:bg-[#343230] text-white disabled:opacity-40 disabled:cursor-not-allowed text-xs font-sans font-semibold uppercase tracking-[0.18em] transition-all duration-200 shadow-sm"
                    >
                        Apply dates {isValidRange ? `(${nightsCount} ${nightsCount === 1 ? 'Night' : 'Nights'})` : ''}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DateRangeCalendar;
