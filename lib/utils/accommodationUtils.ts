import type { LucideIcon } from 'lucide-react';

import {
    Shield,
    Wine,
    Ship,
    Waves,
    Bath,
    Sprout,
    Flower2,
    Thermometer,
    Sparkles,
    UserCheck,
    Calendar,
    Compass,
    Bed,
    Maximize2,
    Eye,
} from 'lucide-react';
import { JsonObject } from '../hotel/types';
import React from 'react';

// ============================================================================
// TYPE GUARDS & SAFE JSON PARSING UTILITIES
// ============================================================================

export function isJsonObject(value: unknown): value is JsonObject {
    return (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value)
    );
}

export function asJsonObject(value: unknown): JsonObject {
    return isJsonObject(value) ? value : {};
}

export function asArray(value: unknown): unknown[] {
    return Array.isArray(value) ? value : [];
}

export function getString(
    object: JsonObject,
    key: string,
    fallback = '',
): string {
    const value = object[key];

    return typeof value === 'string' ? value : fallback;
}

export function getNumber(
    object: JsonObject,
    key: string,
    fallback = 0,
): number {
    const value = object[key];

    return typeof value === 'number' && Number.isFinite(value)
        ? value
        : fallback;
}

export function formatCurrencySymbol(currency: string): string {
    const symbols: Record<string, string> = {
        EUR: '€',
        USD: '$',
        GBP: '£',
        CHF: 'CHF',
        JPY: '¥',
    };

    return symbols[currency] ?? currency;
}

export function formatCategoryTitle(category: string): string {
    return category
        .replaceAll('_', ' ')
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

// ============================================================================
// ICON RESOLUTION REGISTRY
// ============================================================================

export const iconMap: Record<string, LucideIcon> = {
    shield: Shield,
    cellar: Wine,
    wine: Wine,
    yacht: Ship,
    ship: Ship,
    pool: Waves,
    waves: Waves,
    bath: Bath,
    tub: Bath,
    orchard: Sprout,
    sprout: Sprout,
    flower: Flower2,
    temperature: Thermometer,
    sparkles: Sparkles,
    majordomo: UserCheck,
    calendar: Calendar,
    compass: Compass,
    bed: Bed,
    maximize: Maximize2,
    eye: Eye,
};

export function renderFeatureIcon(iconKey: string): React.ReactNode {
    const IconComponent = iconMap[iconKey.toLowerCase()] ?? Compass;

    return React.createElement(IconComponent, {
        size: 16,
        strokeWidth: 1.6,
        className: 'text-[#8e763b] shrink-0',
        'aria-hidden': true,
    });
}

export function renderPrivilegeIcon(iconKey: string): React.ReactNode {
    const IconComponent = iconMap[iconKey.toLowerCase()] ?? UserCheck;

    return React.createElement(IconComponent, {
        size: 20,
        strokeWidth: 1.6,
        className: 'text-[#8e763b] shrink-0',
        'aria-hidden': true,
    });
}