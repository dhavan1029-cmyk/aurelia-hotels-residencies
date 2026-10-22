
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface InvitationTokenFormProps {
    placeholder: string;
    buttonLabel: string;
}

export function InvitationTokenForm({
    placeholder,
    buttonLabel,
}: InvitationTokenFormProps) {
    const router = useRouter();
    const [token, setToken] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const normalizedToken = token.trim().toUpperCase();

        if (!normalizedToken || isSubmitting) return;

        setIsSubmitting(true);

        router.push(
            `/register?token=${encodeURIComponent(normalizedToken)}`
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                name="invitationToken"
                value={token}
                onChange={(event) =>
                    setToken(event.target.value.toUpperCase())
                }
                placeholder={placeholder}
                required
                autoCapitalize="characters"
                className="min-w-0 flex-1 px-3.5 py-2.5 rounded-xl
                           bg-white border border-[#ded9ce] font-mono
                           text-xs uppercase tracking-widest
                           text-[#1f1e1d] outline-none
                           focus:border-[#8e763b]
                           placeholder-[#a4a098]"
            />

            <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-[#8e763b]
                           hover:bg-[#78632f] text-white font-sans
                           text-[10px] font-semibold uppercase
                           tracking-[0.2em] transition-colors
                           shrink-0 shadow-xs disabled:opacity-70"
            >
                {isSubmitting ? 'Opening...' : buttonLabel}
            </button>
        </form>
    );
}
