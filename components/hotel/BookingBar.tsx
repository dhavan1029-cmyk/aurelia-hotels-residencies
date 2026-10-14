'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';

export interface BookingBarProps {
    className?: string;
}

export function BookingBar({ className = '' }: BookingBarProps) {
    const router = useRouter();

    const [sanctuary, setSanctuary] = useState('amalfi-positano');
    const [checkIn, setCheckIn] = useState('2025-10-14');
    const [checkOut, setCheckOut] = useState('2025-10-19');
    const [guests, setGuests] = useState('2 Guests');
    const [suiteType, setSuiteType] = useState('1 Suite • King');
    const [memberCode, setMemberCode] = useState('AURELIA-PRIVILEGE');

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        router.push(
            `/suites?sanctuary=${encodeURIComponent(sanctuary)}&checkIn=${encodeURIComponent(
                checkIn
            )}&checkOut=${encodeURIComponent(checkOut)}&guests=${encodeURIComponent(
                guests
            )}&code=${encodeURIComponent(memberCode)}`
        );
    }

    return (
        <div
            className={`w-full max-w-7xl mx-auto bg-white/95 backdrop-blur-md border border-[#e8e4dc] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.1)] p-4 md:p-6 transition-all ${className}`}
        >
            <form onSubmit={handleSearch}>
                {/* Main Filter Rail */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1.6fr_1fr_1.1fr_190px] gap-3.5 items-stretch">
                    {/* 1. Sanctuary Destination */}
                    <div className="relative group bg-[#faf8f4] hover:bg-[#f6f3ec] border border-[#e8e4dc] rounded-xl p-3.5 flex flex-col justify-between transition-colors">
                        <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#8e763b]">
                            <svg
                                className="w-3.5 h-3.5 text-[#8e763b]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            <span>Sanctuary Destination</span>
                        </div>

                        <div className="mt-1">
                            <select
                                value={sanctuary}
                                onChange={function (e) {
                                    setSanctuary(e.target.value);
                                }}
                                className="w-full bg-transparent font-serif text-[15px] font-semibold text-[#1f1e1d] outline-none cursor-pointer tracking-tight truncate"
                            >
                                <option value="amalfi-positano">Aurelia Positano Cliffside</option>
                                <option value="cap-d-antibes">Aurelia Cap d'Antibes Coastal</option>
                                <option value="st-moritz">Aurelia St. Moritz Alpine</option>
                                <option value="kyoto-higashiyama">Aurelia Higashiyama Kyoto</option>
                            </select>
                            <span className="block text-[11px] text-[#78756d] font-sans mt-0.5">
                                Campania Ridge, Italy
                            </span>
                        </div>
                    </div>

                    {/* 2. Dates of Stay */}
                    <div className="relative group bg-[#faf8f4] hover:bg-[#f6f3ec] border border-[#e8e4dc] rounded-xl p-3.5 flex flex-col justify-between transition-colors">
                        <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#8e763b]">
                            <svg
                                className="w-3.5 h-3.5 text-[#8e763b]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span>Dates of Stay</span>
                        </div>

                        <div className="mt-1">
                            <div className="flex items-baseline gap-1 font-serif text-[14px] font-semibold text-[#1f1e1d] tracking-tight">
                                <input
                                    type="date"
                                    value={checkIn}
                                    onChange={function (e) {
                                        setCheckIn(e.target.value);
                                    }}
                                    className="bg-transparent font-serif text-[13px] text-[#1f1e1d] outline-none cursor-pointer w-26.5"
                                />
                                <span className="text-[#a4a098]">—</span>
                                <input
                                    type="date"
                                    value={checkOut}
                                    onChange={function (e) {
                                        setCheckOut(e.target.value);
                                    }}
                                    className="bg-transparent font-serif text-[13px] text-[#1f1e1d] outline-none cursor-pointer w-26.5"
                                />
                            </div>
                            <span className="block text-[11px] text-[#78756d] font-sans mt-0.5">
                                5 Nights • Autumn Equinox
                            </span>
                        </div>
                    </div>

                    {/* 3. Accommodations / Guests */}
                    <div className="relative group bg-[#faf8f4] hover:bg-[#f6f3ec] border border-[#e8e4dc] rounded-xl p-3.5 flex flex-col justify-between transition-colors">
                        <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#8e763b]">
                            <svg
                                className="w-3.5 h-3.5 text-[#8e763b]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            <span>Accommodations</span>
                        </div>

                        <div className="mt-1">
                            <select
                                value={guests}
                                onChange={function (e) {
                                    setGuests(e.target.value);
                                }}
                                className="w-full bg-transparent font-serif text-[15px] font-semibold text-[#1f1e1d] outline-none cursor-pointer tracking-tight"
                            >
                                <option value="1 Guest">1 Guest</option>
                                <option value="2 Guests">2 Guests</option>
                                <option value="3 Guests">3 Guests</option>
                                <option value="4+ Guests">4+ Patrons (Villa)</option>
                            </select>
                            <span className="block text-[11px] text-[#78756d] font-sans mt-0.5">
                                {suiteType}
                            </span>
                        </div>
                    </div>

                    {/* 4. Sovereign Member Code */}
                    <div className="relative group bg-[#faf8f4] hover:bg-[#f6f3ec] border border-[#e8e4dc] rounded-xl p-3.5 flex flex-col justify-between transition-colors">
                        <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase font-semibold text-[#8e763b]">
                            <span>Member Code</span>
                            <span className="text-[#bfa76f]">✦</span>
                        </div>

                        <div className="mt-1">
                            <input
                                type="text"
                                value={memberCode}
                                onChange={function (e) {
                                    setMemberCode(e.target.value);
                                }}
                                placeholder="Code (e.g. AURELIA-VIP)"
                                className="w-full bg-transparent font-serif text-[14px] font-semibold text-[#1f1e1d] uppercase outline-none placeholder-[#a39f97] tracking-wider"
                            />
                            <span className="block text-[11px] text-[#8e763b] font-sans font-medium mt-0.5">
                                15% Resident Courtesy
                            </span>
                        </div>
                    </div>

                    {/* 5. CTA Trigger Button */}
                    <div className="flex items-center sm:col-span-2 lg:col-span-1">
                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            size="lg"
                            className="h-full min-h-14.5 rounded-xl text-[12px] tracking-[0.2em] flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:gap-3 transition-all"
                        >
                            <span>Check Rates</span>
                            <span className="text-sm">→</span>
                        </Button>
                    </div>

                </div>

                {/* Direct Reservation Privilege Perks Banner */}
                <div className="mt-4 pt-3.5 border-t border-[#f0ece3] flex flex-wrap items-center justify-between gap-y-2 text-[11px] font-sans text-[#78756d]">
                    <div className="flex items-center gap-2 text-[#5c5952]">
                        <span className="text-[#bfa76f]">🛡</span>
                        <span className="font-medium text-[#1f1e1d]">
                            Direct Reservation Privilege:
                        </span>
                        <span>Guaranteed Best Rate & Dedicated Chauffeur Transfer</span>
                    </div>

                    <div className="flex items-center gap-4 text-[#8a867e]">
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#bfa76f]" />
                            Thermal Spa Hydrotherapy Access
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#bfa76f]" />
                            Organic Artisanal Breakfast Daily
                        </span>
                    </div>
                </div>
            </form>
        </div>
    );
}