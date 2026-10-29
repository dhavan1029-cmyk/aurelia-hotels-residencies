'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname()

    return (
        <header className={`${(new Set(['/login', '/register', '/profile', '/login/verify', '/register/welcome'])).has(pathname) ? 'hidden' : 'sticky'} top-0 z-40 w-full bg-[#fcf9f4]/90 backdrop-blur-md border-b border-[#e8e4dc]`}>
            <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
               {/* Brand Monogram & Wordmark */}
                <Link href="/" className="flex flex-col items-center group text-center">
                    <Image src='/aurelia-logo-light.png' alt='aurelia logo' width={240} height={90}></Image>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-[12px] uppercase tracking-widest font-sans text-[#2f2e2c]">
                    <Link href="/accommodations" className={`transition-colors p-1 ${pathname.includes('/accommodations') ? 'font-semibold text-black bg-black/20' : 'hover:text-[#8e763b]'}`}>
                        Accommodations
                    </Link>
                    <Link href="/experiences" className={`transition-colors ${pathname.includes('/experiences') ? 'font-semibold text-black bg-black/20 p-1' : 'hover:text-[#8e763b]'}`}>
                        Gastronomy & Spa
                    </Link>
                    <Link href="/heritage" className={`transition-colors ${pathname.includes('/heritage') ? 'font-semibold text-black bg-black/20 p-1' : 'hover:text-[#8e763b]'}`}>
                        Heritage
                    </Link>
                    <Link href="/profile" className={`transition-colors ${pathname.includes('/profile') ? 'font-semibold text-black bg-black/20 p-1' : 'hover:text-[#8e763b]'}`}>
                        Sovereign Portal
                    </Link>
                    <Link
                        href="/accommodations"
                        className="px-5 py-2.5 bg-[#1f1e1d] text-[#fcf9f4] hover:bg-[#393735] transition-all text-[11px] tracking-[0.2em]"
                    >
                        Reserve
                    </Link>
                </nav>

                {/* Mobile Menu Trigger */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-xs uppercase tracking-widest font-sans text-[#1f1e1d] p-2"
                >
                    {mobileMenuOpen ? 'Close' : 'Menu'}
                </button>
            </div>

            {/* Mobile Drawer */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-[#fcf9f4] border-b border-[#e8e4dc] px-6 py-8 flex flex-col gap-6 text-sm uppercase tracking-widest font-sans">
                    <Link href="/accommodations" onClick={() => setMobileMenuOpen(false)}>
                        Accommodations
                    </Link>
                    <Link href="/experiences" onClick={() => setMobileMenuOpen(false)}>
                        Gastronomy & Spa
                    </Link>
                    <Link href="/heritage" onClick={() => setMobileMenuOpen(false)}>
                        Architecture & Heritage
                    </Link>
                    <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                        Sovereign Guest Portal
                    </Link>
                    <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-[#8e763b]"
                    >
                        Hotel Operations (PMS)
                    </Link>
                </div>
            )}
        </header>
    );
}
