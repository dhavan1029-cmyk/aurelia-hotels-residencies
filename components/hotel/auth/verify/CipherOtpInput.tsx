'use client';

import React, { useRef, useState } from 'react';

export interface CipherOtpInputProps {
    initialDigits?: string[];
    onCodeChange?: (code: string) => void;
    className?: string;
}

export function CipherOtpInput({
    initialDigits = ['8', '8', '2', '9', '', ''],
    onCodeChange,
    className = '',
}: CipherOtpInputProps) {
    const [digits, setDigits] = useState<string[]>(initialDigits);
    const [activeIndex, setActiveIndex] = useState<number>(4);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    function handleDigitChange(index: number, value: string) {
        const cleaned = value.replace(/\D/g, '').slice(-1);
        const updated = [...digits];
        updated[index] = cleaned;
        setDigits(updated);

        if (onCodeChange) {
            onCodeChange(updated.join(''));
        }

        if (cleaned && index < 5) {
            inputRefs.current[index + 1]?.focus();
            setActiveIndex(index + 1);
        }
    }

    function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Backspace' && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
            setActiveIndex(index - 1);
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
            setActiveIndex(index - 1);
        } else if (e.key === 'ArrowRight' && index < 5) {
            inputRefs.current[index + 1]?.focus();
            setActiveIndex(index + 1);
        }
    }

    function handlePaste(e: React.ClipboardEvent) {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (!pasted) return;

        const updated = [...digits];
        for (let i = 0; i < 6; i++) {
            updated[i] = pasted[i] || '';
        }
        setDigits(updated);

        if (onCodeChange) {
            onCodeChange(updated.join(''));
        }

        const nextFocus = Math.min(pasted.length, 5);
        inputRefs.current[nextFocus]?.focus();
        setActiveIndex(nextFocus);
    }

    return (
        <div className={`space-y-3 ${className}`}>
            <div className="flex items-center justify-between text-[10px] font-sans uppercase tracking-[0.18em] text-[#78756d]">
                <span>ONE-TIME CRYPTOGRAPHIC TOKEN</span>
                <span className="font-mono text-[9px] text-[#8e763b]">Hardware Enclave Sync</span>
            </div>

            {/* 6 Discrete Ceramic Cells */}
            <div
                onPaste={handlePaste}
                className="grid grid-cols-6 gap-2 sm:gap-3"
            >
                {digits.map((digit, index) => {
                    const isFocused = activeIndex === index;

                    return (
                        <div
                            key={index}
                            className={`relative aspect-square sm:aspect-4/5 rounded-xl flex items-center justify-center border transition-all duration-200 ${
                                isFocused
                                    ? 'bg-white border-[#8e763b] ring-2 ring-[#8e763b]/20 shadow-xs'
                                    : digit
                                    ? 'bg-white border-[#ded9ce]'
                                    : 'bg-[#f6f2ea]/70 border-[#ded9ce]'
                            }`}
                        >
                            <input
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                value={digit}
                                onFocus={() => setActiveIndex(index)}
                                onChange={(e) => handleDigitChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-full h-full text-center font-serif text-2xl sm:text-3xl text-[#1f1e1d] bg-transparent outline-none select-all"
                                aria-label={`Cryptographic Token Digit ${index + 1}`}
                            />
                            {/* Subtle baseline gold indicator */}
                            <span
                                className={`absolute bottom-2.5 w-4 h-0.5 transition-colors ${
                                    digit ? 'bg-[#8e763b]' : 'bg-[#ded9ce]'
                                }`}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
