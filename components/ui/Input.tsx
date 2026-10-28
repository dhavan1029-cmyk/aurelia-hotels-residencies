
'use client';

import { useId, useState, type ReactNode } from 'react';

interface FormInputProps {
    name: string;
    label?: string;
    type?: 'text' | 'email' | 'password' | 'tel';
    initialValue?: string;
    placeholder?: string;
    helpText?: string;
    required?: boolean;
    autoComplete?: string;
    maxLength?: number;
    uppercase?: boolean;
    numericOnly?: boolean;
    leadingIcon?: ReactNode;
    className?: string;
}

export function FormInput({
    name,
    label,
    type = 'text',
    initialValue = '',
    placeholder,
    helpText,
    required = false,
    autoComplete,
    maxLength,
    uppercase = false,
    numericOnly = false,
    leadingIcon,
    className = '',
}: FormInputProps) {
    const id = useId();
    const [value, setValue] = useState(initialValue);
    const [showPassword, setShowPassword] = useState(false);

    function handleChange(nextValue: string) {
        let normalizedValue = nextValue;

        if (uppercase) {
            normalizedValue = normalizedValue.toUpperCase();
        }

        if (numericOnly) {
            normalizedValue = normalizedValue.replace(/\D/g, '');
        }

        if (maxLength !== undefined) {
            normalizedValue = normalizedValue.slice(0, maxLength);
        }

        setValue(normalizedValue);
    }

    return (
        <div className={`space-y-1.5 ${className}`}>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-[10px] font-sans font-semibold
                               uppercase tracking-[0.18em] text-[#6d6961]"
                >
                    {label}
                    {required && !label.includes('*') && ' *'}
                </label>
            )}

            <div className="relative">
                <input
                    id={id}
                    name={name}
                    type={
                        type === 'password' && showPassword
                            ? 'text'
                            : type
                    }
                    value={value}
                    onChange={(event) =>
                        handleChange(event.target.value)
                    }
                    placeholder={placeholder}
                    required={required}
                    autoComplete={autoComplete}
                    maxLength={maxLength}
                    inputMode={numericOnly ? 'numeric' : undefined}
                    className={[
                        'w-full px-3.5 py-3.5 -xl bg-white',
                        'border border-[#ded9ce] text-xs font-sans',
                        'text-[#1f1e1d] outline-none',
                        'focus:border-[#8e763b] shadow-2xs',
                        'placeholder-[#a4a098]',
                        leadingIcon ? 'pl-10' : '',
                        type === 'password' ? 'pr-14' : '',
                        uppercase ? 'uppercase' : '',
                    ].join(' ')}
                />

                {leadingIcon && (
                    <span
                        aria-hidden="true"
                        className="absolute left-3.5 top-1/2
                                   -translate-y-1/2 text-[#8e763b]"
                    >
                        {leadingIcon}
                    </span>
                )}

                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword((previous) => !previous)
                        }
                        aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                        }
                        className="absolute right-3.5 top-1/2
                                   -translate-y-1/2 text-[10px]
                                   uppercase tracking-wider
                                   text-[#a4a098]"
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                )}
            </div>

            {helpText && (
                <p className="text-[10px] font-sans text-[#8e8a82]">
                    {helpText}
                </p>
            )}
        </div>
    );
}
