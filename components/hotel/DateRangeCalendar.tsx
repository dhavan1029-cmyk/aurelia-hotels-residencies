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
    compact?: boolean;            // Single-month compact mode (ideal for sidebars & rails)
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
        (new Set(['check in', 'check out', 'add date'])).has(isoString.toLowerCase())
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
        normalized === 'add date' ||
        !value.includes('-')
    ) {
        return null;
    }

    return value;
}

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

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
    compact = false,
    className = '',
}: DateRangeCalendarProps) {
    const [pendingCheckIn, setPendingCheckIn] = useState<string | null>(function () {
        return normalizeDate(checkIn);
    });

    const [pendingCheckOut, setPendingCheckOut] = useState<string | null>(function () {
        return normalizeDate(checkOut);
    });

    const [activeField, setActiveField] = useState<SelectingField>(function () {
        const normalizedCheckIn = normalizeDate(checkIn);
        const normalizedCheckOut = normalizeDate(checkOut);

        return normalizedCheckIn && !normalizedCheckOut ? 'checkOut' : 'checkIn';
    });

    const [hoveredDate, setHoveredDate] = useState<string | null>(null);

    const [viewDate, setViewDate] = useState<Date>(function () {
        const normalizedCheckIn = normalizeDate(checkIn);

        if (normalizedCheckIn) {
            return parseISODate(normalizedCheckIn);
        }

        return initialMonth ?? new Date();
    });

    const popoverRef = useRef<HTMLDivElement>(null);

    // Sync external props when modal opens
    useEffect(
        function () {
            if (!isOpen) return;

            const normalizedCheckIn = normalizeDate(checkIn);
            const normalizedCheckOut = normalizeDate(checkOut);

            setPendingCheckIn(normalizedCheckIn);
            setPendingCheckOut(normalizedCheckOut);

            setActiveField(
                normalizedCheckIn && !normalizedCheckOut ? 'checkOut' : 'checkIn'
            );

            if (normalizedCheckIn) {
                setViewDate(parseISODate(normalizedCheckIn));
            } else {
                setViewDate(initialMonth ?? new Date());
            }
        },
        [isOpen, checkIn, checkOut, initialMonth]
    );

    // Handle escape key & click outside
    useEffect(
        function () {
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
        },
        [isOpen, onClose]
    );

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

    const month1 = useMemo(
        function () {
            return new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
        },
        [viewDate]
    );

    const month2 = useMemo(
        function () {
            return new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
        },
        [viewDate]
    );

    const isPrevDisabled = useMemo(
        function () {
            const currentMonthFirst = new Date(today.getFullYear(), today.getMonth(), 1);
            return month1 <= currentMonthFirst;
        },
        [month1, today]
    );

    const nightsCount = useMemo(
        function () {
            if (pendingCheckIn && pendingCheckOut) {
                return calculateNights(pendingCheckIn, pendingCheckOut);
            }
            return 0;
        },
        [pendingCheckIn, pendingCheckOut]
    );

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

        if (activeField === 'checkIn') {
            setPendingCheckIn(dateIso);
            if (pendingCheckOut && dateIso >= pendingCheckOut) {
                setPendingCheckOut(null);
            }
            setActiveField('checkOut');
            return;
        }

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
            setActiveField('checkIn')
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
            month: 'short',
            year: 'numeric',
        });

        const firstDayOfMonth = new Date(year, monthIndex, 1);
        const lastDayOfMonth = new Date(year, monthIndex + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();

        // Monday-based indexing: Sunday=0 -> 6, Monday=1 -> 0, etc.
        const startingDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;

        const cells = [];
        for (let i = 0; i < startingDayOfWeek; i++) {
            cells.push(<div key={`empty-${i}`} className="w-8 h-8 sm:w-8.5 sm:h-8.5" />);
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

            if (isCheckIn) {
                cellStyle = 'bg-[#8e763b] text-white font-semibold shadow-xs';
            } else if (isCheckOut) {
                cellStyle = 'bg-[#8e763b] text-white font-semibold shadow-xs';
            } else if (isInRange) {
                cellStyle = 'text-[#1f1e1d] font-medium';
                containerBg = 'bg-[#8e763b]/15';
            } else if (isToday) {
                cellStyle = 'text-[#8e763b] font-bold border border-[#8e763b]/40 hover:bg-[#eeeae2]';
            }

            if (isDisabled) {
                cellStyle = 'text-[#b3aba0] opacity-35 cursor-not-allowed hover:bg-transparent';
                containerBg = 'bg-transparent';
            }

            cells.push(
                <div
                    key={dateIso}
                    className={`relative flex items-center justify-center w-8 h-8 sm:w-8.5 sm:h-8.5 ${containerBg}`}
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
                        className={`w-7.5 h-7.5 sm:w-8 sm:h-8 flex items-center justify-center font-sans text-[11px] sm:text-xs transition-colors duration-150 cursor-pointer ${cellStyle}`}
                    >
                        <span>{day}</span>
                    </button>
                </div>
            );
        }

        return (
            <div className="w-full flex flex-col space-y-2.5">
                <div className="text-center">
                    <h4 className="font-serif text-sm sm:text-base font-medium text-[#1f1e1d] tracking-tight">
                        {monthTitle}
                    </h4>
                </div>

                <div className="grid grid-cols-7 gap-0.5 text-center border-b border-[#f2ede4] pb-1.5">
                    {WEEKDAYS.map(function (wd) {
                        return (
                            <span
                                key={wd}
                                className="text-[9px] font-sans font-medium uppercase tracking-wider text-[#78756e]"
                            >
                                {wd}
                            </span>
                        );
                    })}
                </div>

                <div className="grid grid-cols-7 gap-y-0.5 gap-x-0.5 justify-items-center">
                    {cells}
                </div>
            </div>
        );
    }

    if (!isOpen) return null;

    const containerWidthClass = compact
        ? 'w-full max-w-[340px]'
        : 'w-[320px] sm:w-[580px] lg:w-[620px] max-w-[92vw]';

    return (
        <div
            ref={popoverRef}
            role="dialog"
            aria-modal="true"
            aria-label="Date Range Calendar Selector"
            className={`${containerWidthClass} bg-white border border-[#ded9ce] p-4 sm:p-5 shadow-[0_20px_50px_rgba(31,30,29,0.18)] text-[#1f1e1d] animate-in fade-in-50 zoom-in-95 z-50 ${className}`}
        >
            {/* Header & Close */}
            <div className="flex items-start justify-between pb-3 border-b border-[#f2ede4]">
                <div className="space-y-0.5">
                    <span className="text-[8.5px] font-mono font-semibold uppercase tracking-[0.22em] text-[#8e763b] block">
                        RESERVATION HORIZON
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1f1e1d] tracking-tight leading-none">
                        Select Stay Dates
                    </h3>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close date picker"
                    className="p-1.5 text-[#78756e] hover:text-[#1f1e1d] hover:bg-[#f6f3ee] transition-colors cursor-pointer"
                >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>

            {/* Selection Tiles (Check-In / Check-Out) */}
            <div className="py-3 border-b border-[#f2ede4] space-y-2">
                <div className="grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={function () {
                            setActiveField('checkIn');
                        }}
                        className={`p-2.5 border text-left transition-all duration-200 cursor-pointer ${
                            activeField === 'checkIn'
                                ? 'bg-[#f6f3ee] border-[#8e763b] ring-1 ring-[#8e763b]/30'
                                : 'bg-white border-[#ded9ce] hover:border-[#8e763b]/50'
                        }`}
                    >
                        <span className="text-[8.5px] font-mono font-semibold uppercase tracking-[0.18em] text-[#8e763b] block">
                            CHECK-IN
                        </span>
                        <span className="font-serif text-xs sm:text-sm font-medium text-[#1f1e1d] block mt-0.5 truncate">
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
                        className={`p-2.5 border text-left transition-all duration-200 cursor-pointer ${
                            activeField === 'checkOut'
                                ? 'bg-[#f6f3ee] border-[#8e763b] ring-1 ring-[#8e763b]/30'
                                : 'bg-white border-[#ded9ce] hover:border-[#8e763b]/50'
                        }`}
                    >
                        <span className="text-[8.5px] font-mono font-semibold uppercase tracking-[0.18em] text-[#8e763b] block">
                            CHECK-OUT
                        </span>
                        <span className="font-serif text-xs sm:text-sm font-medium text-[#1f1e1d] block mt-0.5 truncate">
                            {formatDateDisplay(pendingCheckOut)}
                        </span>
                    </button>
                </div>

                <div className="flex items-center justify-between text-[11px] font-sans px-1">
                    {isValidRange ? (
                        <div className="flex items-center gap-1.5 text-[#1f1e1d]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b]" />
                            <span className="font-serif font-semibold text-[#8e763b]">{nightsCount}</span>
                            <span className="text-[#78756e]">
                                {nightsCount === 1 ? 'Night' : 'Nights'} stay direct
                            </span>
                        </div>
                    ) : (
                        <span className="text-[10px] text-[#78756e] italic">
                            {pendingCheckIn && !pendingCheckOut ? 'Now select departure date' : 'Select arrival date'}
                        </span>
                    )}
                </div>
            </div>

            {/* Navigation Strip */}
            <div className="flex items-center justify-between pt-2.5 pb-2 px-1">
                <button
                    type="button"
                    disabled={isPrevDisabled}
                    onClick={handlePrevMonth}
                    aria-label="Previous month"
                    className="p-1.5 bg-[#f6f3ee] hover:bg-[#eeeae2] border border-[#ded9ce] text-[#1f1e1d] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#78756e]">
                    {compact ? 'STAY CALENDAR' : 'CONSECUTIVE CALENDAR'}
                </div>

                <button
                    type="button"
                    onClick={handleNextMonth}
                    aria-label="Next month"
                    className="p-1.5 bg-[#f6f3ee] hover:bg-[#eeeae2] border border-[#ded9ce] text-[#1f1e1d] transition-colors cursor-pointer"
                >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>

            {/* Calendar Grids */}
            <div className={`py-1.5 ${compact ? 'block' : 'grid grid-cols-1 sm:grid-cols-2 gap-5'}`}>
                <div className="w-full flex justify-center">
                    {renderMonthGrid(month1)}
                </div>

                {!compact && (
                    <div className="hidden sm:flex sm:justify-center sm:pl-4 sm:border-l border-[#f2ede4]">
                        {renderMonthGrid(month2)}
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="mt-3 pt-3 border-t border-[#f2ede4] flex items-center justify-between gap-2">
                <button
                    type="button"
                    onClick={handleClear}
                    className="text-[11px] font-sans font-medium text-[#78756e] hover:text-[#1f1e1d] underline transition-colors cursor-pointer"
                >
                    Clear
                </button>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-3 py-1.5 bg-[#f6f3ee] hover:bg-[#eeeae2] border border-[#ded9ce] text-[#2c2a26] text-[11px] font-sans font-medium transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        disabled={!isValidRange}
                        onClick={handleApply}
                        className="px-4 py-1.5 bg-[#1f1e1d] hover:bg-[#343230] text-white disabled:opacity-40 disabled:cursor-not-allowed text-[10px] font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-200 shadow-sm cursor-pointer"
                    >
                        Apply {isValidRange ? `(${nightsCount}N)` : ''}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DateRangeCalendar;
