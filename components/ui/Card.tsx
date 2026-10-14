import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    variant?: 'elevated' | 'flat' | 'bordered';
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
    children,
    variant = 'bordered',
    padding = 'md',
    className = '',
    ...props
}: CardProps) {
    const variantStyles = {
        bordered: 'bg-white border border-[#e8e4dc]',
        flat: 'bg-[#f6f3ee]',
        elevated: 'bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-[#e8e4dc]/60',
    }[variant];

    const paddingStyles = {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6 md:p-8',
        lg: 'p-8 md:p-12',
    }[padding];

    return (
        <div
            className={`transition-all duration-300 ${variantStyles} ${paddingStyles} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
