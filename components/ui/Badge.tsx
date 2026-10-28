import React from 'react';

export interface BadgeProps {
    children: React.ReactNode;
    variant?: 'neutral' | 'gold' | 'emerald' | 'amber' | 'crimson';
    className?: string;
}

export function Badge({
    children,
    variant = 'neutral',
    className = '',
}: BadgeProps) {
    const variantStyles = {
        neutral: 'bg-[#f6f3ee] text-[#55524d] border-[#dcdad5]',
        gold: 'bg-[#bfa76f]/10 text-[#8e763b] border-[#bfa76f]/30',
        emerald: 'bg-[#e9f5ee] text-[#24633b] border-[#badfca]',
        amber: 'bg-[#fef7ea] text-[#935e16] border-[#f4dfb5]',
        crimson: 'bg-[#fbeeed] text-[#9b2c2c] border-[#f0c5c3]',
    }[variant];

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-widest font-medium border -full font-sans ${variantStyles} ${className}`}
        >
            {children}
        </span>
    );
}
