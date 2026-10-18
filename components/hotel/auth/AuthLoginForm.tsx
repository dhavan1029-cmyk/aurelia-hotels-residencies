'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface AuthLoginFormData {
    eyebrow: string;
    securityBadge: string;
    headline: string;
    subheadline: string;
    activeTab: 'sign-in' | 'sign-up';
    signInTabLabel: string;
    signUpTabLabel: string;
    identifierLabel: string;
    identifierPlaceholder: string;
    identifierHelpText: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    magicLinkText: string;
    rememberDeviceLabel: string;
    forgotPasswordText: string;
    submitButtonLabel: string;
    dividerText: string;
    appleAuthLabel: string;
    conciergeAuthLabel: string;
    invitationBadge: string;
    invitationHeadline: string;
    invitationSubheadline: string;
    invitationPlaceholder: string;
    invitationButtonLabel: string;
    securityFooterNotice: string;
    conciergeDeskLabel: string;
    legalSanctuaryLabel: string;
}

export const authLoginFormDefaultData: AuthLoginFormData = {
    eyebrow: 'PATRON PORTAL & SOVEREIGN ACCESS',
    securityBadge: 'ENCRYPTED TERMINAL',
    headline: 'Enter Your Sanctuary',
    subheadline:
        'Access your bespoke arrival itineraries, sensory suite settings, and sovereign cellar allocations.',
    activeTab: 'sign-in',
    signInTabLabel: 'Sign In',
    signUpTabLabel: 'Request Patronage / Sign Up',
    identifierLabel: 'SOVEREIGN IDENTIFIER OR CONFIDENTIAL EMAIL *',
    identifierPlaceholder: 'e.g. alistair.thorne@oxford.ac.uk or AUR-0492',
    identifierHelpText: 'Your verified Sovereign Key or registered correspondence address.',
    passwordLabel: 'SECURITY PASSKEY / PASSWORD *',
    passwordPlaceholder: '••••••••••••••••',
    magicLinkText: 'Use Magic Link instead',
    rememberDeviceLabel: 'Remember this confidential terminal for 30 days',
    forgotPasswordText: 'Forgot access credentials?',
    submitButtonLabel: 'Authenticate & Enter Sanctuary',
    dividerText: 'OR AUTHENTICATE VIA SOVEREIGN PROVIDER',
    appleAuthLabel: 'Apple Sovereign ID',
    conciergeAuthLabel: 'Concierge Direct Passcode',
    invitationBadge: 'CONFIDENTIAL INVITATION PROTOCOL',
    invitationHeadline: 'Holding a Sovereign Invitation Token?',
    invitationSubheadline:
        'Enter your bespoke 8-digit patron invitation code dispatched by our Curatorial Guild to activate your membership.',
    invitationPlaceholder: 'E.G. LUX-8821',
    invitationButtonLabel: 'REDEEM',
    securityFooterNotice: 'Protected by Aurelia 256-bit Swiss Banking Privacy Protocol',
    conciergeDeskLabel: 'Private Concierge Desk',
    legalSanctuaryLabel: 'Legal Sanctuary & Disclosures',
};

export interface AuthLoginFormProps {
    data?: AuthLoginFormData;
    className?: string;
    onAuthenticate?: (credentials: { identifier: string; passkey: string; remember: boolean }) => void;
    onRedeemInvitation?: (token: string) => void;
    onAppleSignIn?: () => void;
    onConciergeCodeSignIn?: () => void;
}

export function AuthLoginForm({
    data = authLoginFormDefaultData,
    className = '',
    onAuthenticate,
    onRedeemInvitation,
    onAppleSignIn,
    onConciergeCodeSignIn,
}: AuthLoginFormProps) {
    const router = useRouter();

    const {
        eyebrow,
        securityBadge,
        headline,
        subheadline,
        signInTabLabel,
        signUpTabLabel,
        identifierLabel,
        identifierPlaceholder,
        identifierHelpText,
        passwordLabel,
        passwordPlaceholder,
        magicLinkText,
        rememberDeviceLabel,
        forgotPasswordText,
        submitButtonLabel,
        dividerText,
        appleAuthLabel,
        conciergeAuthLabel,
        invitationBadge,
        invitationHeadline,
        invitationSubheadline,
        invitationPlaceholder,
        invitationButtonLabel,
        securityFooterNotice,
        conciergeDeskLabel,
        legalSanctuaryLabel,
    } = data;

    // Form inputs state
    const [identifier, setIdentifier] = useState('j.vane-tempest@sovereign-holdings.co.uk');
    const [password, setPassword] = useState('••••••••••••••••');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberDevice, setRememberDevice] = useState(true);
    const [invitationToken, setInvitationToken] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tokenSuccess, setTokenSuccess] = useState(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        if (onAuthenticate) {
            onAuthenticate({
                identifier,
                passkey: password,
                remember: rememberDevice,
            });
        }

        setTimeout(function () {
            setIsSubmitting(false);
            router.push('/profile');
        }, 800);
    }

    function handleRedeemTokenSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!invitationToken.trim()) return;

        if (onRedeemInvitation) {
            onRedeemInvitation(invitationToken.trim());
        }

        setTokenSuccess(true);
        setTimeout(function () {
            router.push(`/register?token=${encodeURIComponent(invitationToken.trim())}`);
        }, 600);
    }

    return (
        <section
            className={`w-full max-w-xl mx-auto flex flex-col justify-between p-6 sm:p-10 lg:p-12 text-[#1f1e1d] ${className}`}
        >
            <div className="space-y-8 sm:space-y-10">
                {/* 1. TOP HEADER & STATUS PILL */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8e763b]" />
                            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8e763b]">
                                {eyebrow}
                            </span>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f6f2ea] border border-[#ded9ce] text-[9px] font-mono uppercase tracking-[0.18em] text-[#24633b]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>{securityBadge}</span>
                        </div>
                    </div>

                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#1f1e1d] tracking-tight leading-[1.12]">
                        {headline}
                    </h1>

                    <p className="text-xs sm:text-[13px] text-[#5f5c56] font-sans font-light leading-relaxed max-w-lg">
                        {subheadline}
                    </p>
                </div>

                {/* 2. SEGMENTED NAVIGATION TABS (Sign In / Request Patronage) */}
                <div className="flex items-center border-b border-[#e8e4dc] text-xs font-sans">
                    <button
                        type="button"
                        className="pb-3.5 px-1 font-semibold uppercase tracking-[0.2em] text-[#1f1e1d] border-b-2 border-[#1f1e1d] transition-colors"
                    >
                        {signInTabLabel}
                    </button>

                    <Link
                        href="/register"
                        className="pb-3.5 px-6 font-light uppercase tracking-[0.2em] text-[#78756d] hover:text-[#1f1e1d] transition-colors"
                    >
                        {signUpTabLabel}
                    </Link>
                </div>

                {/* 3. PRIMARY AUTHENTICATION CREDENTIALS FORM */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Identifier Input */}
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#6d6961]">
                            {identifierLabel}
                        </label>

                        <div className="relative">
                            <input
                                type="text"
                                required
                                value={identifier}
                                onChange={function (e) {
                                    setIdentifier(e.target.value);
                                }}
                                placeholder={identifierPlaceholder}
                                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs placeholder-[#a4a098]"
                            />
                            {/* Key / Shield Insignia */}
                            <svg
                                className="w-4 h-4 text-[#8e763b] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>

                        <span className="block text-[10px] font-sans text-[#8e8a82]">
                            {identifierHelpText}
                        </span>
                    </div>

                    {/* Password / Passkey Input */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="block text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#6d6961]">
                                {passwordLabel}
                            </label>

                            <button
                                type="button"
                                onClick={function () {
                                    console.log('Dispatching sovereign magic link');
                                }}
                                className="text-[10px] font-sans font-medium text-[#8e763b] hover:text-[#1f1e1d] underline transition-colors"
                            >
                                {magicLinkText}
                            </button>
                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={password}
                                onChange={function (e) {
                                    setPassword(e.target.value);
                                }}
                                placeholder={passwordPlaceholder}
                                className="w-full pl-10 pr-12 py-3.5 rounded-xl bg-white border border-[#ded9ce] text-xs font-sans text-[#1f1e1d] outline-none focus:border-[#8e763b] transition-colors shadow-2xs placeholder-[#a4a098]"
                            />
                            {/* Vault Insignia */}
                            <svg
                                className="w-4 h-4 text-[#8e763b] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                                <path d="M12 12L2.5 7.5" />
                                <path d="M12 12v9.5" />
                            </svg>

                            {/* Visibility Eye Toggle */}
                            <button
                                type="button"
                                onClick={function () {
                                    setShowPassword(!showPassword);
                                }}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a4a098] hover:text-[#1f1e1d] text-[10px] font-sans uppercase tracking-wider"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? 'HIDE' : 'SHOW'}
                            </button>
                        </div>
                    </div>

                    {/* Remember Device & Forgot Credentials Strip */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1 text-xs font-sans">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={rememberDevice}
                                onChange={function (e) {
                                    setRememberDevice(e.target.checked);
                                }}
                                className="w-4 h-4 rounded border-[#ded9ce] text-[#8e763b] focus:ring-0 focus:ring-offset-0"
                            />
                            <span className="text-[11px] text-[#5c5952] font-light">
                                {rememberDeviceLabel}
                            </span>
                        </label>

                        <Link
                            href="/register#recovery"
                            className="text-[11px] text-[#8e763b] hover:text-[#1f1e1d] transition-colors self-start sm:self-auto"
                        >
                            {forgotPasswordText}
                        </Link>
                    </div>

                    {/* Primary Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#1f1e1d] hover:bg-[#343230] text-white font-sans text-[11px] font-semibold uppercase tracking-[0.22em] transition-all shadow-md active:translate-y-0.5 group disabled:opacity-75"
                    >
                        <span>{isSubmitting ? 'Verifying Sovereign Credentials...' : submitButtonLabel}</span>
                        <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </button>
                </form>

                {/* 4. ELEVATED PROVIDERS (Apple Sovereign ID & Concierge Direct Passcode) */}
                <div className="space-y-4">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#e8e4dc]" />
                        </div>
                        <span className="relative px-3 bg-[#fcf9f4] text-[9px] font-mono uppercase tracking-[0.2em] text-[#8e8a82]">
                            {dividerText}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                        {/* Apple Sovereign ID */}
                        <button
                            type="button"
                            onClick={onAppleSignIn}
                            className="p-3.5 rounded-xl bg-white hover:bg-[#f6f2ea] border border-[#ded9ce] flex items-center justify-center gap-2.5 transition-colors shadow-2xs group"
                        >
                            <svg className="w-4 h-4 fill-current text-[#1f1e1d]" viewBox="0 0 170 170">
                                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.7-7.94-12.04-14.58-6.19-9.49-11.03-20.25-14.52-32.27-3.48-12.02-5.23-23.47-5.23-34.34 0-14.15 3.53-26.02 10.59-35.61 7.06-9.59 16.03-14.48 26.92-14.67 4.93 0 10.42 1.34 16.48 4.02 6.06 2.68 10.1 4.09 12.12 4.23 1.83-.14 6.08-1.63 12.74-4.48 6.67-2.85 12.35-4.08 17.06-3.7 12.63.66 22.75 5.06 30.36 13.2-11.01 6.66-16.39 15.75-16.14 27.27.24 8.98 3.73 16.59 10.47 22.83 6.74 6.24 14.88 9.77 24.42 10.59-2.07 6.42-4.55 12.69-7.44 18.8zM119.22 33.15c0-7.23 2.66-14.11 7.98-20.64 5.32-6.53 11.89-10.7 19.71-12.51.55 1.5.83 3.03.83 4.59 0 7.23-2.73 14.22-8.19 20.97-5.46 6.75-12.06 10.87-19.8 12.36-.18-1.57-.27-3.13-.27-4.77z" />
                            </svg>
                            <span className="font-semibold uppercase tracking-wider text-[11px]">
                                {appleAuthLabel}
                            </span>
                        </button>

                        {/* Concierge Direct Passcode */}
                        <button
                            type="button"
                            onClick={onConciergeCodeSignIn}
                            className="p-3.5 rounded-xl bg-white hover:bg-[#f6f2ea] border border-[#ded9ce] flex items-center justify-center gap-2 transition-colors shadow-2xs group"
                        >
                            <span className="text-[#8e763b] text-base leading-none">☆</span>
                            <span className="font-semibold uppercase tracking-wider text-[11px] text-[#2c2a26]">
                                {conciergeAuthLabel}
                            </span>
                        </button>
                    </div>
                </div>

                {/* 5. SOVEREIGN INVITATION TOKEN REDEEM CARD */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#f6f2ea]/90 border border-[#ded9ce] space-y-3.5 shadow-2xs">
                    <div className="flex items-center gap-2">
                        <span className="p-1 rounded-md bg-white border border-[#ded9ce] text-[#8e763b]">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="8" cy="8" r="6" />
                                <path d="M18.09 10.37A6 6 0 1 1 10.34 18.1" />
                                <path d="m14 14 4 4" />
                                <path d="m17 17 2-2" />
                            </svg>
                        </span>
                        <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8e763b]">
                            {invitationBadge}
                        </span>
                    </div>

                    <div>
                        <h4 className="font-serif text-base font-normal text-[#1f1e1d] tracking-tight">
                            {invitationHeadline}
                        </h4>
                        <p className="text-[11px] text-[#6e6b64] font-sans font-light leading-relaxed mt-0.5">
                            {invitationSubheadline}
                        </p>
                    </div>

                    {tokenSuccess ? (
                        <div className="p-3 rounded-xl bg-white border border-[#ded9ce] text-center">
                            <span className="text-xs font-serif font-medium text-[#24633b]">
                                ✓ Token Validated — Transferring to Sovereign Inscription...
                            </span>
                        </div>
                    ) : (
                        <form onSubmit={handleRedeemTokenSubmit} className="flex gap-2">
                            <input
                                type="text"
                                value={invitationToken}
                                onChange={function (e) {
                                    setInvitationToken(e.target.value.toUpperCase());
                                }}
                                placeholder={invitationPlaceholder}
                                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-[#ded9ce] font-mono text-xs uppercase tracking-widest text-[#1f1e1d] outline-none focus:border-[#8e763b] placeholder-[#a4a098]"
                            />
                            <button
                                type="submit"
                                className="px-5 py-2.5 rounded-xl bg-[#8e763b] hover:bg-[#78632f] text-white font-sans text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors shrink-0 shadow-xs"
                            >
                                {invitationButtonLabel}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* 6. BOTTOM SECURITY NOTICE & CONCIERGE LIAISON STRIP */}
            <div className="pt-8 mt-8 border-t border-[#e8e4dc] space-y-2 text-[10px] font-sans text-[#8e8a82]">
                <div className="flex items-center gap-2">
                    <svg
                        className="w-3.5 h-3.5 text-[#8e763b] shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>{securityFooterNotice}</span>
                </div>

                <div className="flex items-center justify-between text-[10px] pt-1 text-[#78756d]">
                    <a
                        href="tel:+39089875000"
                        className="hover:text-[#1f1e1d] underline transition-colors"
                    >
                        {conciergeDeskLabel} (+39 089 875 000)
                    </a>

                    <Link
                        href="/not-found"
                        className="hover:text-[#1f1e1d] underline transition-colors"
                    >
                        {legalSanctuaryLabel}
                    </Link>
                </div>
            </div>
        </section>
    );
}