import Link from 'next/link';
import { AuthProviderButtons } from './AuthProviderButtons';
import { InvitationTokenForm } from '../InvitationTokenForm';
import { AuthLoginFormData } from '../../types/auth';
import { AuthLoginCredentialsForm } from './AuthLoginCredentialsForm';

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
    forgotPasswordText: 'Forgot password?',
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
}

export function AuthLoginForm({
    data = authLoginFormDefaultData,
    className = '',
}: AuthLoginFormProps) {

    return (
        <section
            className={`w-full max-w-xl mx-auto flex flex-col justify-between
                        p-6 sm:p-10 lg:p-12 text-[#1f1e1d] ${className}`}
        >
            <div className="space-y-8 sm:space-y-10">
                {/* Header */}
                <header className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 -full bg-[#8e763b]" />
                            <span className="text-[10px] font-sans font-semibold
                                             uppercase tracking-[0.28em]
                                             text-[#8e763b]">
                                {data.eyebrow}
                            </span>
                        </div>

                        <div className="inline-flex items-center gap-1.5
                                        px-2.5 py-1 -full
                                        bg-[#f6f2ea] border border-[#ded9ce]
                                        text-[9px] font-mono uppercase
                                        tracking-[0.18em] text-[#24633b]">
                            <span className="w-1.5 h-1.5 -full
                                             bg-emerald-500 animate-pulse" />
                            {data.securityBadge}
                        </div>
                    </div>

                    <h1 className="font-serif text-3xl sm:text-4xl
                                   lg:text-[44px] font-normal tracking-tight
                                   leading-[1.12]">
                        {data.headline}
                    </h1>

                    <p className="text-xs sm:text-[13px] text-[#5f5c56]
                                  font-sans font-light leading-relaxed max-w-lg">
                        {data.subheadline}
                    </p>
                </header>

                {/* Navigation */}
                <nav className="flex items-center border-b border-[#e8e4dc]
                                text-xs font-sans">
                    <span
                        aria-current="page"
                        className="pb-3.5 px-1 font-semibold uppercase
                                   tracking-[0.2em] border-b-2
                                   border-[#1f1e1d]"
                    >
                        {data.signInTabLabel}
                    </span>

                    <Link
                        href="/register"
                        className="pb-3.5 px-6 font-light uppercase
                                   tracking-[0.2em] text-[#78756d]
                                   hover:text-[#1f1e1d] transition-colors"
                    >
                        {data.signUpTabLabel}
                    </Link>
                </nav>

                {/* Login form */}
                <AuthLoginCredentialsForm data={data} />

                {/* Alternative authentication providers */}
                <div className="space-y-4">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#e8e4dc]" />
                        </div>

                        <span className="relative px-3 bg-[#fcf9f4]
                                         text-[9px] font-mono uppercase
                                         tracking-[0.2em] text-[#8e8a82]">
                            {data.dividerText}
                        </span>
                    </div>

                    <AuthProviderButtons
                        appleLabel={data.appleAuthLabel}
                        conciergeLabel={data.conciergeAuthLabel}
                    />
                </div>

                {/* Invitation redemption */}
                <div className="p-5 sm:p-6 -2xl
                                bg-[#f6f2ea]/90 border border-[#ded9ce]
                                space-y-3.5 shadow-2xs">
                    <div className="flex items-center gap-2">
                        <span className="p-1 -md bg-white
                                         border border-[#ded9ce]
                                         text-[#8e763b]">
                            <svg
                                aria-hidden="true"
                                className="w-3.5 h-3.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="8" cy="8" r="6" />
                                <path d="M18.09 10.37A6 6 0 1 1 10.34 18.1" />
                                <path d="m14 14 4 4" />
                                <path d="m17 17 2-2" />
                            </svg>
                        </span>

                        <span className="text-[9px] font-sans font-semibold
                                         uppercase tracking-[0.2em]
                                         text-[#8e763b]">
                            {data.invitationBadge}
                        </span>
                    </div>

                    <div>
                        <h2 className="font-serif text-base font-normal
                                       tracking-tight">
                            {data.invitationHeadline}
                        </h2>

                        <p className="text-[11px] text-[#6e6b64] font-sans
                                      font-light leading-relaxed mt-0.5">
                            {data.invitationSubheadline}
                        </p>
                    </div>

                    <InvitationTokenForm
                        placeholder={data.invitationPlaceholder}
                        buttonLabel={data.invitationButtonLabel}
                    />
                </div>
            </div>

            {/* Footer */}
            <footer className="pt-8 mt-8 border-t border-[#e8e4dc]
                               space-y-2 text-[10px] font-sans
                               text-[#8e8a82]">
                <div className="flex items-center gap-2">
                    <svg
                        aria-hidden="true"
                        className="w-3.5 h-3.5 text-[#8e763b] shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>

                    <span>{data.securityFooterNotice}</span>
                </div>

                <div className="flex items-center justify-between
                                text-[10px] pt-1 text-[#78756d]">
                    <a
                        href="tel:+39089875000"
                        className="hover:text-[#1f1e1d] underline
                                   transition-colors"
                    >
                        {data.conciergeDeskLabel} (+39 089 875 000)
                    </a>

                    <Link
                        href="/not-found"
                        className="hover:text-[#1f1e1d] underline
                                   transition-colors"
                    >
                        {data.legalSanctuaryLabel}
                    </Link>
                </div>
            </footer>
        </section>
    );
}
