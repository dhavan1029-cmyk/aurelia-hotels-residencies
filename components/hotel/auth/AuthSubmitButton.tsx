
'use client';

import { useFormStatus } from 'react-dom';

export function AuthSubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full inline-flex items-center justify-center
                       gap-2 px-6 py-4 rounded-xl bg-[#1f1e1d]
                       hover:bg-[#343230] text-white font-sans
                       text-[11px] font-semibold uppercase
                       tracking-[0.22em] transition-all shadow-md
                       active:translate-y-0.5 disabled:opacity-75"
        >
            <span>
                {pending ? 'Verifying Sovereign Credentials...' : label}
            </span>

            <span aria-hidden="true">→</span>
        </button>
    );
}
