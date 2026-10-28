
import { AuthEditorialMasthead } from '@/components/hotel/auth/login/AuthEditorialMasthead';
import { AuthLoginForm } from '@/components/hotel/auth/login/AuthLoginForm';
import {
    authMastheadDefaultData,
} from '@/components/hotel/auth/login/AuthEditorialMasthead';
import {
    authLoginFormDefaultData,
} from '@/components/hotel/auth/login/AuthLoginForm';
import { AuthLoginFormData, AuthMastheadData } from '@/components/hotel/types/auth';

export interface AuthLoginPageProps {
    mastheadData?: AuthMastheadData;
    formData?: AuthLoginFormData;
    className?: string;
}

export function AuthLoginPage({
    mastheadData = authMastheadDefaultData,
    formData = authLoginFormDefaultData,
    className = '',
}: AuthLoginPageProps) {

    return (
        <main
            className={`min-h-screen w-full bg-[#fcf9f4] flex flex-col lg:flex-row font-sans selection:bg-[#8e763b]/20 selection:text-[#1f1e1d] ${className}`}
        >
            {/* ----------------------------------------------------------------- */}
            {/* PHASE 1: Left Split Architectural Monograph Masthead (42% width) */}
            {/* ----------------------------------------------------------------- */}
            <div className="w-full lg:w-[42%] lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto shrink-0 shadow-xl z-10">
                <AuthEditorialMasthead
                    data={mastheadData}
                />
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* PHASE 2: Right Split Authentication Form Container (58% width)   */}
            {/* ----------------------------------------------------------------- */}
            <div className="w-full lg:w-[58%] min-h-screen flex items-center justify-center py-10 sm:py-16 px-4 sm:px-8 lg:px-14 bg-[#fcf9f4]">
                <AuthLoginForm />
            </div>
        </main>
    );
}

export default AuthLoginPage;