/**
 * Aurelia Hotels & Residences — Global Currency & Symbol Catalog
 * File: data/currencyCatalog.ts
 *
 * Provides:
 * 1. ISO 4217 standard 3-letter currency codes mapped to canonical symbols and locale details.
 * 2. Typed CurrencyCode union and CurrencyMeta specification.
 * 3. Type-safe resolver and price formatting helper functions.
 */

export type CurrencyCode =
    | 'EUR' | 'USD' | 'GBP' | 'CHF' | 'JPY' | 'AED' | 'SAR' | 'QAR'
    | 'KWD' | 'BHD' | 'OMR' | 'SGD' | 'HKD' | 'CAD' | 'AUD' | 'NZD'
    | 'SEK' | 'NOK' | 'DKK' | 'INR' | 'CNY' | 'KRW' | 'BRL' | 'MXN'
    | 'ZAR' | 'TRY' | 'THB' | 'IDR' | 'MYR' | 'PHP' | 'VND' | 'EGP'
    | 'PLN' | 'CZK' | 'HUF' | 'ILS' | 'CLP' | 'COP' | 'ARS' | 'MAD';

export interface CurrencyMeta {
    code: CurrencyCode;
    symbol: string;
    name: string;
    minorUnitDecimals: number;
    symbolPosition: 'prefix' | 'suffix';
    locale: string;
}

/**
 * Direct lookup mapping 3-letter currency code directly to its display symbol.
 */
export const CURRENCY_SYMBOLS: Record<CurrencyCode | string, string> = {
    // Primary Luxury & European Bastions
    EUR: '€',
    USD: '$',
    GBP: '£',
    CHF: 'CHF',
    JPY: '¥',

    // Middle East & Gulf Currencies
    AED: 'AED',
    SAR: 'SAR',
    QAR: 'QAR',
    KWD: 'KD',
    BHD: 'BD',
    OMR: 'OMR',

    // Asia-Pacific & Australasia
    INR: '₹',
    SGD: 'S$',
    HKD: 'HK$',
    AUD: 'A$',
    NZD: 'NZ$',
    CNY: '¥',
    KRW: '₩',
    THB: '฿',
    IDR: 'Rp',
    MYR: 'RM',
    PHP: '₱',
    VND: '₫',

    // Americas
    CAD: 'CA$',
    BRL: 'R$',
    MXN: 'Mex$',
    CLP: 'CLP$',
    COP: 'COL$',
    ARS: 'AR$',

    // Nordic & Wider European
    SEK: 'kr',
    NOK: 'kr',
    DKK: 'kr.',
    PLN: 'zł',
    CZK: 'Kč',
    HUF: 'Ft',

    // Africa & Mediterranean Neighbors
    ZAR: 'R',
    TRY: '₺',
    ILS: '₪',
    EGP: 'E£',
    MAD: 'MAD',
};

/**
 * Detailed metadata catalog with locale and formatting nuances.
 */
export const CURRENCY_CATALOG: Record<CurrencyCode, CurrencyMeta> = {
    EUR: { code: 'EUR', symbol: '€', name: 'Euro', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'it-IT' },
    USD: { code: 'USD', symbol: '$', name: 'US Dollar', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'en-US' },
    GBP: { code: 'GBP', symbol: '£', name: 'British Pound Sterling', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'en-GB' },
    CHF: { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'de-CH' },
    JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'ja-JP' },

    AED: { code: 'AED', symbol: 'AED', name: 'UAE Dirham', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'ar-AE' },
    SAR: { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'ar-SA' },
    QAR: { code: 'QAR', symbol: 'QAR', name: 'Qatari Riyal', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'ar-QA' },
    KWD: { code: 'KWD', symbol: 'KD', name: 'Kuwaiti Dinar', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'ar-KW' },
    BHD: { code: 'BHD', symbol: 'BD', name: 'Bahraini Dinar', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'ar-BH' },
    OMR: { code: 'OMR', symbol: 'OMR', name: 'Omani Rial', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'ar-OM' },

    INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'en-IN' },
    SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'en-SG' },
    HKD: { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'zh-HK' },
    AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'en-AU' },
    NZD: { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'en-NZ' },
    CNY: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'zh-CN' },
    KRW: { code: 'KRW', symbol: '₩', name: 'South Korean Won', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'ko-KR' },
    THB: { code: 'THB', symbol: '฿', name: 'Thai Baht', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'th-TH' },
    IDR: { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'id-ID' },
    MYR: { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'ms-MY' },
    PHP: { code: 'PHP', symbol: '₱', name: 'Philippine Peso', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'en-PH' },
    VND: { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', minorUnitDecimals: 0, symbolPosition: 'suffix', locale: 'vi-VN' },

    CAD: { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'en-CA' },
    BRL: { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'pt-BR' },
    MXN: { code: 'MXN', symbol: 'Mex$', name: 'Mexican Peso', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'es-MX' },
    CLP: { code: 'CLP', symbol: 'CLP$', name: 'Chilean Peso', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'es-CL' },
    COP: { code: 'COP', symbol: 'COL$', name: 'Colombian Peso', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'es-CO' },
    ARS: { code: 'ARS', symbol: 'AR$', name: 'Argentine Peso', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'es-AR' },

    SEK: { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', minorUnitDecimals: 0, symbolPosition: 'suffix', locale: 'sv-SE' },
    NOK: { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', minorUnitDecimals: 0, symbolPosition: 'suffix', locale: 'nb-NO' },
    DKK: { code: 'DKK', symbol: 'kr.', name: 'Danish Krone', minorUnitDecimals: 0, symbolPosition: 'suffix', locale: 'da-DK' },
    PLN: { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', minorUnitDecimals: 0, symbolPosition: 'suffix', locale: 'pl-PL' },
    CZK: { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', minorUnitDecimals: 0, symbolPosition: 'suffix', locale: 'cs-CZ' },
    HUF: { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', minorUnitDecimals: 0, symbolPosition: 'suffix', locale: 'hu-HU' },

    ZAR: { code: 'ZAR', symbol: 'R', name: 'South African Rand', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'en-ZA' },
    TRY: { code: 'TRY', symbol: '₺', name: 'Turkish Lira', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'tr-TR' },
    ILS: { code: 'ILS', symbol: '₪', name: 'Israeli New Shekel', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'he-IL' },
    EGP: { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'ar-EG' },
    MAD: { code: 'MAD', symbol: 'MAD', name: 'Moroccan Dirham', minorUnitDecimals: 0, symbolPosition: 'prefix', locale: 'fr-MA' },
};

/**
 * Resolves symbol for any currency code with a safe luxury fallback (€).
 */
export function getCurrencySymbol(code?: string | null): string {
    if (!code) return '€';
    const normalized = code.trim().toUpperCase() as CurrencyCode;
    return CURRENCY_SYMBOLS[normalized];
}

/**
 * Formats a monetary amount with thousand-separators and luxury symbol placement.
 * E.g. formatTariff(3450, 'EUR') => "€3,450"
 *      formatTariff(85000, 'INR') => "₹85,000"
 *      formatTariff(24000, 'SEK') => "24,000 kr"
 */
export function formatTariff(amount: number, currencyCode: CurrencyCode | string = 'EUR'): string {
    const normalized = (currencyCode).trim().toUpperCase() as CurrencyCode;
    const meta = CURRENCY_CATALOG[normalized];
    const symbol = meta ? meta.symbol : (CURRENCY_SYMBOLS[normalized]);
    const formattedNum = Math.round(amount).toLocaleString('en-US');

    if (meta && meta.symbolPosition === 'suffix') {
        return `${formattedNum} ${symbol}`;
    }
    return `${symbol}${formattedNum}`;
}
