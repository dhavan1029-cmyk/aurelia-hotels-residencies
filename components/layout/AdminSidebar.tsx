'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface AdminSidebarProps {
    activePath?: string
}

export default function AdminSidebar({activePath} : AdminSidebarProps){

    const pathname = usePathname();
    const current = activePath || pathname;
    const links = [
        { label: 'Tape Chart & Calendar', href: '/dashboard', icon: '▦' },
        { label: 'Housekeeping Matrix', href: '/dashboard/housekeeping', icon: '❖' },
        { label: 'Guest CRM Directory', href: '/dashboard/guests', icon: '◷' },
        { label: 'Dynamic Yield & Pricing', href: '/dashboard/pricing', icon: '▲' },
    ];

    return <aside className="w-full lg:w-64 bg-[#1f1e1d] text-[#e8e4dc] shrink-0 flex flex-col justify-between p-6">
        <div>
            <div className="mb-10">
                <Image src='/screen.png' alt='aurelia logo' width={240} height={90}></Image>
            </div>

            <nav className="flex flex-col gap-2">
                {links.map((link) => {
                    const isActive = current === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest transition-all ${
                                isActive
                                    ? 'bg-[#343230] text-[#fcf9f4] font-medium border-l-2 border-[#bfa76f]'
                                    : 'text-[#9c9890] hover:text-[#fcf9f4] hover:bg-[#2a2826]'
                            }`}
                        >
                            <span className="text-sm opacity-60">
                                {link.icon}
                            </span>
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
        </div>

        <div className="pt-8 border-t border-[#343230] text-[11px] text-[#8e8a82]">
            <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-[#fcf9f4]">G.M. Roberto C.</span>
            </div>

            <p className="text-[10px] text-[#716e67]">
                Positano Enclave • PMS v4.2
            </p>

            <Link
                href="/"
                className="block mt-4 text-[10px] uppercase tracking-wider text-[#bfa76f] hover:underline"
            >
                ← Guest Experience
            </Link>
        </div>
    </aside>
}