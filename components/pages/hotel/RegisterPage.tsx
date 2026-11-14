import Link from 'next/link';
import { RegisterDossierRail } from '@/components/hotel/auth/register/RegisterDossierRail';
import { RegisterEnrollmentFormCoordinator } from '@/components/hotel/auth/register/RegisterEnrollmentFormCoordinator';

export function RegisterPage() {
    return (
        <main className="min-h-screen w-full bg-[#fcf9f4] text-[#1f1e1d] font-sans selection:bg-[#8e763b]/20 selection:text-[#1f1e1d] overflow-x-hidden">
            {/* ------------------------------------------------------------- */}
            {/* MAIN SPLIT REGISTRATION WORKSPACE                             */}
            {/* ------------------------------------------------------------- */}
            <div className="w-full flex flex-col lg:flex-row items-stretch">
                {/* Left Split Architectural Dossier Rail (42% width - Fixed to screen height) */}
                <aside 
                    aria-label="Sovereign Dossier Rail"
                    className="w-full lg:w-[42%] lg:h-screen lg:sticky lg:top-0 shrink-0 z-20 shadow-2xl border-r border-[#262422] overflow-hidden"
                >
                    <RegisterDossierRail />
                </aside>

                {/* Right Split Sovereign Patron Registration Form (58% width - Independently Scrollable) */}
                <div className="w-full lg:w-[58%] lg:h-screen lg:overflow-y-auto flex flex-col justify-between">
                    <div className="w-full max-w-3xl mx-auto py-8 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-14 flex-1 flex items-center justify-center">
                        <RegisterEnrollmentFormCoordinator />
                    </div>

                    {/* Sovereign Protocol Footer */}
                    <footer
                        aria-label="Sovereign Protocol Footer"
                        className="w-full bg-[#181716] text-[#dcdad5] border-t border-[#2e2c29] py-8 px-4 sm:px-8 lg:px-12 text-[10px] font-sans select-none"
                    >
                        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-center sm:text-left">
                                <span className="text-[#8e763b] font-semibold tracking-widest uppercase">
                                    AURELIA DIPLOMATIC IMMUNITY
                                </span>
                                <span className="hidden sm:inline text-white/20">•</span>
                                <span className="text-white/60">
                                    © 2026 Aurelia Hotels &amp; Residences S.p.A.
                                </span>
                            </div>

                            <div className="flex items-center gap-5 uppercase tracking-wider text-[9px] text-[#a4a098]">
                                <Link href="/not-found" className="hover:text-white transition-colors">
                                    Privacy Mandate
                                </Link>
                                <Link href="/not-found" className="hover:text-white transition-colors">
                                    Terms
                                </Link>
                                <a href="tel:+39089875111" className="text-[#8e763b] hover:text-white transition-colors">
                                    Concierge (+39 089 875 111)
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </main>
    );
}

export default RegisterPage;

