'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export type ExperienceCategoryId =
    | 'all'
    | 'marine-charters'
    | 'thermal-wellness'
    | 'gastronomy-dining'
    | 'terroir-masterclasses';

export interface ExperienceCategoryOption {
    id: ExperienceCategoryId;
    label: string;
    count?: number;
}

export const DEFAULT_EXPERIENCE_CATEGORIES: ExperienceCategoryOption[] = [
    { id: 'all', label: 'All Encounters', count: 8 },
    { id: 'marine-charters', label: 'Marine Charters' },
    { id: 'thermal-wellness', label: 'Thermal Wellness' },
    { id: 'gastronomy-dining', label: 'Gastronomy & Dining' },
    { id: 'terroir-masterclasses', label: 'Terroir & Masterclasses' },
];

export interface ExperienceCategoryFilterBarProps {
    categories?: ExperienceCategoryOption[];
    selectedCategory?: ExperienceCategoryId;
    baseRoute?: string;
    className?: string;
}

export function ExperienceCategoryFilterBar({
    categories = DEFAULT_EXPERIENCE_CATEGORIES,
    selectedCategory,
    baseRoute = '/experiences',
    className = '',
}: ExperienceCategoryFilterBarProps) {
    const searchParams = useSearchParams();
    const currentParam =
        (searchParams?.get('category') as ExperienceCategoryId) ||
        selectedCategory ||
        'all';

return (
    <nav
        aria-label="Experience Categories"
        className={`w-full px-4 sm:px-8 max-w-7xl mx-auto pb-8 sm:pb-10 ${className}`}
    >
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map(function (cat) {
                const isSelected = cat.id === currentParam;

                // Clone current search parameters to preserve `sanctuary`, dates, etc.
                const nextParams = new URLSearchParams(searchParams?.toString() || '');

                if (cat.id === 'all') {
                    nextParams.delete('category');
                } else {
                    nextParams.set('category', cat.id);
                }

                const queryString = nextParams.toString();
                const href = queryString ? `${baseRoute}?${queryString}` : baseRoute;

                return (
                    <Link
                        key={cat.id}
                        href={href}
                        scroll={false}
                        className={`shrink-0 px-4 py-2 text-[11px] font-mono tracking-[0.14em] uppercase transition-all duration-200 border ${
                            isSelected
                                ? 'bg-[#1f1e1d] text-[#fcf9f4] border-[#1f1e1d] shadow-[0_2px_8px_rgba(31,30,29,0.12)]'
                                : 'bg-white/80 text-[#5c564f] border-[#e8e4dc] hover:border-[#8e763b] hover:text-[#1f1e1d]'
                        }`}
                    >
                        <span>{cat.label}</span>
                        {cat.count !== undefined && (
                            <span
                                className={`ml-1.5 ${
                                    isSelected ? 'text-[#bfa76f]' : 'text-[#8e763b]'
                                }`}
                            >
                                ({cat.count})
                            </span>
                        )}
                    </Link>
                );
            })}
        </div>
    </nav>
);

}

export default ExperienceCategoryFilterBar;