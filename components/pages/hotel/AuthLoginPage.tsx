'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AuthEditorialMasthead } from '@/components/hotel/auth/AuthEditorialMasthead';
import { AuthLoginForm } from '@/components/hotel/auth/AuthLoginForm';
import {
    AuthMastheadData,
    authMastheadDefaultData,
} from '@/components/hotel/auth/AuthEditorialMasthead';
import {
    AuthLoginFormData,
    authLoginFormDefaultData,
} from '@/components/hotel/auth/AuthLoginForm';

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
    const router = useRouter();

    function handleAuthenticate(credentials: {
        identifier: string;
        passkey: string;
        remember: boolean;
    }) {
        console.log('Authenticating Sovereign Patron Credentials:', {
            identifier: credentials.identifier,
            remember: credentials.remember,
        });

        // Simulate secure session establishment & redirect to Sovereign Profile
        setTimeout(function () {
            router.push('/profile');
        }, 600);
    }

    function handleRedeemInvitation(token: string) {
        console.log('Validating Curatorial VIP Invitation Token:', token);
        // Route to registration flow with pre-populated token
        setTimeout(function () {
            router.push(`/register?token=${encodeURIComponent(token)}`);
        }, 400);
    }

    function handleAppleSignIn() {
        console.log('Initiating Apple Sovereign ID biometric authentication');
        router.push('/profile');
    }

    function handleConciergeCodeSignIn() {
        console.log('Initiating Concierge Direct Passcode modal verification');
    }

    function handleExploreBrand() {
        router.push('/');
    }

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
                    onExploreBrand={handleExploreBrand}
                />
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* PHASE 2: Right Split Authentication Form Container (58% width)   */}
            {/* ----------------------------------------------------------------- */}
            <div className="w-full lg:w-[58%] min-h-screen flex items-center justify-center py-10 sm:py-16 px-4 sm:px-8 lg:px-14 bg-[#fcf9f4]">
                <AuthLoginForm
                    data={formData}
                    onAuthenticate={handleAuthenticate}
                    onRedeemInvitation={handleRedeemInvitation}
                    onAppleSignIn={handleAppleSignIn}
                    onConciergeCodeSignIn={handleConciergeCodeSignIn}
                />
            </div>
        </main>
    );
}

export default AuthLoginPage;