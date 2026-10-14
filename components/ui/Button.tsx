import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export function Button({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    children,
    ...props
} : ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center font-sans tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed select-none';
  
    const sizeStyles = {
        sm: 'text-[11px] px-3.5 py-2 font-medium',
        md: 'text-[12px] px-6 py-3 font-medium',
        lg: 'text-[13px] px-8 py-4 font-semibold tracking-[0.2em]',
    }[size];

    const variantStyles = {
        primary: 'bg-[#1f1e1d] text-[#fcf9f4] hover:bg-[#343230] border border-[#1f1e1d] shadow-sm',
        secondary: 'bg-[#f6f3ee] text-[#1f1e1d] hover:bg-[#eeeae2] border border-[#dcdad5]',
        outline: 'bg-transparent text-[#1f1e1d] border border-[#1f1e1d]/30 hover:border-[#1f1e1d] hover:bg-[#1f1e1d]/5',
        ghost: 'bg-transparent text-[#1f1e1d]/80 hover:text-[#1f1e1d] hover:bg-black/5',
        gold: 'bg-[#bfa76f] text-white hover:bg-[#ad945c] border border-[#bfa76f] shadow-sm',
    }[variant];

    return (
        <button
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${fullWidth ? 'w-full' : ''} ${className}`}
        {...props}
        >
            {children}
        </button>
    );
};

