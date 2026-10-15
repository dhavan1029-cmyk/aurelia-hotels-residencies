'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Footer() {

    const [year, setYear] = useState<number | null>(null)

    useEffect(() => {
        setYear(new Date().getFullYear())
    })

    return (
        <footer className="bg-[#1f1e1d] bottom-0 text-[#e8e4dc] pt-20 pb-12 border-t border-[#343230]">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-[#343230]">
                {/* Monograph Column */}
                <div className="md:col-span-1 flex flex-col gap-4">
                    <h4 className="font-serif text-2xl tracking-[0.2em] text-[#fcf9f4] uppercase font-light">
                        Aurelia
                    </h4>

                    <p className="text-xs text-[#a39f97] leading-relaxed font-sans">
                        Monolithic travertine sanctuaries and restorative coastal enclaves across the Mediterranean, Alps, and East Asia.
                    </p>

                    <span className="text-[10px] tracking-widest text-[#bfa76f] uppercase mt-2">
                        Sovereign Key Membership Desk
                    </span>
                </div>

                {/* Sanctuaries Navigation */}
                <div className="flex flex-col gap-3 font-sans text-xs">
                    <span className="text-[11px] uppercase tracking-widest text-[#fcf9f4] font-medium mb-2">
                        Sanctuaries
                    </span>

                    <Link
                        href="/suites?sanctuary=positano"
                        className="text-[#a39f97] hover:text-[#fcf9f4]"
                    >
                        Positano, Amalfi Coast
                    </Link>

                    <Link
                        href="/suites?sanctuary=cap-d-antibes"
                        className="text-[#a39f97] hover:text-[#fcf9f4]"
                    >
                        Cap d'Antibes, Côte d'Azur
                    </Link>

                    <Link
                        href="/suites?sanctuary=st-moritz"
                        className="text-[#a39f97] hover:text-[#fcf9f4]"
                    >
                        St. Moritz, Engadin
                    </Link>

                    <Link
                        href="/suites?sanctuary=kyoto"
                        className="text-[#a39f97] hover:text-[#fcf9f4]"
                    >
                        Higashiyama, Kyoto
                    </Link>
                </div>

                {/* Curation Navigation */}
                <div className="flex flex-col gap-3 font-sans text-xs">
                    <span className="text-[11px] uppercase tracking-widest text-[#fcf9f4] font-medium mb-2">
                        Pillars
                    </span>

                    <Link
                        href="/suites"
                        className="text-[#a39f97] hover:text-[#fcf9f4]"
                    >
                        Suites & Sovereign Villas
                    </Link>

                    <Link
                        href="/experiences"
                        className="text-[#a39f97] hover:text-[#fcf9f4]"
                    >
                        Roman Thermal Spa Circuit
                    </Link>

                    <Link
                        href="/experiences#wine"
                        className="text-[#a39f97] hover:text-[#fcf9f4]"
                    >
                        Subterranean Wine Vault
                    </Link>

                    <Link
                        href="/heritage"
                        className="text-[#a39f97] hover:text-[#fcf9f4]"
                    >
                        Architectural Monographs
                    </Link>
                </div>

                {/* Concierge & PMS Quick Link */}
                <div className="flex flex-col gap-3 font-sans text-xs">
                    <span className="text-[11px] uppercase tracking-widest text-[#fcf9f4] font-medium mb-2">
                        Concierge & PMS
                    </span>

                    <p className="text-[#a39f97]">
                        concierge@aureliahotels.com
                    </p>

                    <p className="text-[#a39f97]">
                        +39 089 875 000
                    </p>

                    <Link
                        href="/dashboard"
                        className="text-[#bfa76f] hover:underline mt-4 text-[11px] tracking-widest uppercase"
                    >
                        Internal Operations Portal →
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#7a7770] font-sans">
                <p>
                    © {year} Aurelia Hotels & Residences S.p.A. All rights reserved.
                </p>

                <div className="flex gap-6 mt-4 md:mt-0">
                    <Link href="/not-found" className="hover:text-[#a39f97]">
                        Privacy Disclosures
                    </Link>

                    <Link href="/not-found" className="hover:text-[#a39f97]">
                        Sovereign Key Terms
                    </Link>

                    <Link href="/not-found" className="hover:text-[#a39f97]">
                        Architectural Dossier
                    </Link>
                </div>
            </div>
        </footer>
    );
}
