'use client';

import React, { useState, useTransition } from 'react';

export interface GazetteSubscribeFormProps {
    placeholder?: string;
    buttonLabel?: string;
}

export function GazetteSubscribeForm({
    placeholder = 'PATRON@ESTATE.COM',
    buttonLabel = 'INSCRIBE',
}: GazetteSubscribeFormProps) {
    const [email, setEmail] = useState<string>('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isPending, startTransition] = useTransition();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const trimmed = email.trim();

        if (!trimmed || !trimmed.includes('@')) {
            setStatus('error');
            return;
        }

        startTransition(async function () {
            // Replace with your Server Action / API route for Gazette inscription
            await new Promise(function (resolve) {
                setTimeout(resolve, 350);
            });
            setStatus('success');
            setEmail('');
        });
    }

    if (status === 'success') {
        return (
            <div className="flex items-center gap-2.5 border border-[#8e763b]/40 bg-[#191817] px-4 py-3 text-[11px] font-mono tracking-[0.16em] text-[#bfa76f] uppercase">
                <span>✦</span>
                <span>INSCRIBED TO THE AURELIA GAZETTE</span>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={function (e) {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                    }}
                    placeholder={placeholder}
                    aria-label="Email address for Aurelia Gazette"
                    disabled={isPending}
                    className="flex-1 bg-[#1f1e1d] border border-[#3a3632] focus:border-[#bfa76f] outline-none px-4 py-3 text-[11px] font-mono tracking-[0.14em] text-[#fcf9f4] placeholder:text-[#7c756c] transition-colors"
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-[#bfa76f] hover:bg-[#d1ba83] text-[#191817] font-mono text-[10.5px] font-semibold tracking-[0.18em] uppercase px-6 py-3 transition-colors disabled:opacity-60 shrink-0"
                >
                    {isPending ? 'INSCRIBING...' : buttonLabel}
                </button>
            </div>
            {status === 'error' && (
                <p className="text-[10px] font-mono tracking-[0.12em] text-[#d9826c] uppercase">
                    Please enter a valid patron email address.
                </p>
            )}
        </form>
    );
}

export default GazetteSubscribeForm;
