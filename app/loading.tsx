'use client';

import React, { useEffect, useState } from 'react';

export default function Loading() {
    const statusMessages = [
        'Calibrating sanctuary chambers...',
        'Harmonizing diurnal light & temperature...',
        'Consulting subterranean cellar reserves...',
        'Aligning maritime coordinates...',
    ];

    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(function () {
        const interval = setInterval(function () {
            setMessageIndex(function (prev) {
                return (prev + 1) % statusMessages.length;
            });
        }, 2200);

        return function () {
            clearInterval(interval);
        };
    }, [statusMessages.length]);

    return (
        <main
            role="status"
            aria-live="polite"
            aria-label="Loading Aurelia Sanctuary"
            className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-[#fcf9f4] text-[#1f1e1d] font-sans selection:bg-[#8e763b]/20 selection:text-[#1f1e1d] p-6 sm:p-10 select-none overflow-hidden"
        >
            {/* 1. TOP ENCLAVE REGISTRY INDICATOR */}
            <div className="w-full max-w-340 mx-auto flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.22em] text-[#78756d] opacity-90">
                <div className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b] animate-pulse" />
                    <span>AURELIA REGISTRY • NODE ACTIVE</span>
                </div>

                <div className="hidden sm:inline-flex items-center gap-2 text-[#8e763b]">
                    <span>40°37&apos;40.2&quot;N • 14°29&apos;05.4&quot;E</span>
                </div>
            </div>

            {/* 2. CENTRAL EDITORIAL MONOGRAM & PULSE SEQUENCE */}
            <div className="flex flex-col items-center text-center my-auto space-y-7 sm:space-y-8 max-w-md px-4">
                {/* Architectural Circular Compass Insignia */}
                <div className="relative flex items-center justify-center">
                    {/* Ambient Breathing Gold Halo */}
                    <div
                        className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#bfa76f]/15 blur-xl animate-pulse pointer-events-none"
                        style={{ animationDuration: '3s' }}
                    />

                    {/* Vector Emblem */}
                    <svg
                        className="w-16 h-16 sm:w-20 sm:h-20 text-[#8e763b] drop-shadow-xs transition-transform duration-700 ease-out"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Outer Precision Ring */}
                        <circle
                            cx="50"
                            cy="50"
                            r="44"
                            stroke="#8e763b"
                            strokeWidth="1.75"
                            className="opacity-80"
                        />

                        {/* Inner Dashed Dial */}
                        <circle
                            cx="50"
                            cy="50"
                            r="37"
                            stroke="#8e763b"
                            strokeWidth="1"
                            strokeDasharray="3 3"
                            className="opacity-60"
                        />

                        {/* Compass Axes */}
                        <line
                            x1="50"
                            y1="4"
                            x2="50"
                            y2="96"
                            stroke="#8e763b"
                            strokeWidth="0.8"
                            className="opacity-45"
                        />
                        <line
                            x1="4"
                            y1="50"
                            x2="96"
                            y2="50"
                            stroke="#8e763b"
                            strokeWidth="0.8"
                            className="opacity-45"
                        />

                        {/* Monogram 'A' */}
                        <path
                            d="M50 25L28 75M50 25L72 75M34 58H66"
                            stroke="#1f1e1d"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Center Gold Crosshair Diamond */}
                        <polygon
                            points="50,45 54,50 50,55 46,50"
                            fill="#8e763b"
                        />
                    </svg>
                </div>

                {/* Brand Monogram Wordmark Lockup */}
                <div className="space-y-1.5">
                    <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.26em] text-[#1f1e1d] uppercase leading-none">
                        Aurelia
                    </h1>
                    <span className="block text-[8px] sm:text-[9px] font-sans font-semibold tracking-[0.34em] text-[#8e763b] uppercase leading-none">
                        Hotels &amp; Residences
                    </span>
                </div>

                {/* Micro Linear Horizon Bar */}
                <div className="w-36 sm:w-44 h-px bg-[#e8e4dc] relative overflow-hidden">
                    <div
                        className="absolute top-0 bottom-0 w-1/3 bg-linear-to-r from-transparent via-[#8e763b] to-transparent animate-[shimmer_2s_infinite]"
                        style={{
                            animation: 'shimmer 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                        }}
                    />
                </div>

                {/* Dynamic Status Monograph Ticker */}
                <div className="min-h-5 flex items-center justify-center">
                    <p className="font-serif italic text-xs sm:text-[13px] text-[#55524d] font-light tracking-tight transition-opacity duration-500 ease-in-out">
                        &ldquo;{statusMessages[messageIndex]}&rdquo;
                    </p>
                </div>
            </div>

            {/* 3. BOTTOM SOVEREIGN PROTOCOL STRIP */}
            <div className="w-full max-w-340 mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[8.5px] sm:text-[9px] font-mono uppercase tracking-[0.24em] text-[#8e8a82] text-center sm:text-left">
                <span>EST. 1928 • QUIET EDITORIAL LUXURY</span>
                <span className="text-[#8e763b] flex items-center gap-1.5">
                    <span>✦</span>
                    <span>MONOLITHIC CONCORD PROTOCOL</span>
                </span>
            </div>

            {/* Shimmer Keyframe Support */}
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-150%);
                    }
                    100% {
                        transform: translateX(350%);
                    }
                }
            `}</style>
        </main>
    );
}