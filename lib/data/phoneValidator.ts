/**
 * Aurelia Hotels & Residences — Strict Sovereign Phone Validation Engine
 * File: lib/data/phoneValidator.ts
 *
 * Architecture:
 * 1. Global registry based on real ITU-T E.164 / national numbering plans.
 * 2. Strict per-country regular expressions testing authentic mobile & geographic allocation prefixes.
 * 3. Exact national digit boundaries, domestic trunk handling ('0' stripping), and strict non-zero leading digit rules.
 * 4. High-fidelity E.164 and international spaced formatting.
 * 5. Standards: 4-space indentation, standard function declarations, zero untyped any.
 */

// ============================================================================
// 1. DATA CONTRACTS & SPECIFICATION TYPES
// ============================================================================

export type CountryIso2 =
    | 'GB' | 'CH' | 'US' | 'CA' | 'IT' | 'FR' | 'DE' | 'AE' | 'MC' | 'ES'
    | 'JP' | 'SG' | 'HK' | 'AU' | 'IN' | 'CN' | 'SA' | 'QA' | 'KW' | 'BH'
    | 'NL' | 'BE' | 'AT' | 'SE' | 'NO' | 'DK' | 'PT' | 'GR' | 'IE' | 'LU'
    | 'KR' | 'BR' | 'MX' | 'ZA' | 'NZ' | 'TR' | 'EG' | 'ID' | 'TH' | 'MY'
    | 'AF' | 'AL' | 'DZ' | 'AD' | 'AO' | 'AR' | 'AM' | 'AZ' | 'BD' | 'BY'
    | 'BZ' | 'BJ' | 'BT' | 'BO' | 'BA' | 'BW' | 'BN' | 'BG' | 'BF' | 'BI'
    | 'KH' | 'CM' | 'CV' | 'CL' | 'CO' | 'KM' | 'CG' | 'CD' | 'CR' | 'HR'
    | 'CU' | 'CY' | 'CZ' | 'DJ' | 'DM' | 'DO' | 'EC' | 'SV' | 'EE' | 'ET'
    | 'FJ' | 'FI' | 'GA' | 'GM' | 'GE' | 'GH' | 'GT' | 'GN' | 'HU' | 'IS'
    | 'IR' | 'IQ' | 'IL' | 'JM' | 'JO' | 'KZ' | 'KE' | 'KG' | 'LA' | 'LV'
    | 'LB' | 'LY' | 'LI' | 'LT' | 'MO' | 'MG' | 'MW' | 'MV' | 'MT' | 'MN'
    | 'ME' | 'MA' | 'MZ' | 'MM' | 'NA' | 'NP' | 'NI' | 'NG' | 'OM' | 'PK'
    | 'PA' | 'PY' | 'PE' | 'PH' | 'PL' | 'RO' | 'RU' | 'SN' | 'RS' | 'SK'
    | 'SI' | 'LK' | 'TW' | 'TN' | 'UA' | 'UY' | 'UZ' | 'VE' | 'VN' | 'YE'
    | 'ZW';

export interface StrictCountryPlan {
    name: string;
    iso: CountryIso2;
    callingCode: string;
    /** National significant number length (minimum digits without country code or trunk 0) */
    minLen: number;
    /** National significant number length (maximum digits without country code or trunk 0) */
    maxLen: number;
    /** Human-friendly format example */
    example: string;
    /** Mask representation (X = digit) */
    mask: string;
    /** Strict RegExp testing the national significant digits */
    strictRegex: RegExp;
    /** Formats clean national significant digits into spaced groups */
    format: (nationalDigits: string) => string;
}

export interface StrictValidationResult {
    isValid: boolean;
    countryIso: CountryIso2;
    countryName: string;
    callingCode: string;
    rawInput: string;
    cleanNationalDigits: string;
    e164Formatted: string;
    displayFormatted: string;
    errorCode?: 'EMPTY' | 'INVALID_STARTING_DIGIT' | 'TOO_SHORT' | 'TOO_LONG' | 'INVALID_PREFIX_STRUCTURE';
    errorMessage?: string;
}

// ============================================================================
// 2. COMPREHENSIVE STRICT COUNTRY NUMBERING PLANS (ITU-T ALLOCATIONS)
// ============================================================================

export const STRICT_COUNTRY_PLANS: Record<CountryIso2, StrictCountryPlan> = {
    // UNITED KINGDOM (+44) — Mobile: 7[1-9]xx (10 digits). Fixed: 1xx, 2xx, 3xx
    GB: {
        name: 'United Kingdom',
        iso: 'GB',
        callingCode: '+44',
        minLen: 10,
        maxLen: 10,
        example: '7911 882901',
        mask: '7XXX XXXXXX',
        strictRegex: /^(?:7[1-9]\d{8}|1\d{9}|2\d{9}|3\d{9})$/,
        format: function (digits: string): string {
            if (digits.length === 10) {
                return `${digits.slice(0, 4)} ${digits.slice(4)}`;
            }
            return digits;
        },
    },

    // SWITZERLAND (+41) — Mobile: 7[5-9]x (9 digits). Fixed: 2x-6x, 8x, 9x
    CH: {
        name: 'Switzerland',
        iso: 'CH',
        callingCode: '+41',
        minLen: 9,
        maxLen: 9,
        example: '78 829 04 02',
        mask: '7X XXX XX XX',
        strictRegex: /^(?:7[5-9]\d{7}|[2-689]\d{8})$/,
        format: function (digits: string): string {
            if (digits.length === 9) {
                return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7)}`;
            }
            return digits;
        },
    },

    // UNITED STATES (+1) — NANP [2-9][0-8]\d[2-9]\d{6} (10 digits)
    US: {
        name: 'United States',
        iso: 'US',
        callingCode: '+1',
        minLen: 10,
        maxLen: 10,
        example: '212 555 0199',
        mask: '(NXX) NXX-XXXX',
        strictRegex: /^[2-9][0-8]\d[2-9]\d{6}$/,
        format: function (digits: string): string {
            if (digits.length === 10) {
                return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
            }
            return digits;
        },
    },

    // CANADA (+1) — NANP Plan matching US
    CA: {
        name: 'Canada',
        iso: 'CA',
        callingCode: '+1',
        minLen: 10,
        maxLen: 10,
        example: '416 555 0199',
        mask: '(NXX) NXX-XXXX',
        strictRegex: /^[2-9][0-8]\d[2-9]\d{6}$/,
        format: function (digits: string): string {
            if (digits.length === 10) {
                return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
            }
            return digits;
        },
    },

    // ITALY (+39) — Mobile: 3[1-9]x (9-10 digits). Fixed: 0[1-9]x (6-11 digits)
    IT: {
        name: 'Italy',
        iso: 'IT',
        callingCode: '+39',
        minLen: 9,
        maxLen: 10,
        example: '347 123 4567',
        mask: '3XX XXXXXXX',
        strictRegex: /^(?:3[1-9]\d{7,8}|0[1-9]\d{6,9})$/,
        format: function (digits: string): string {
            if (digits.length === 10 || digits.length === 9) {
                return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
            }
            return digits;
        },
    },

    // FRANCE (+33) — Mobile: 6, 7 (9 digits). Fixed: 1-5 (9 digits)
    FR: {
        name: 'France',
        iso: 'FR',
        callingCode: '+33',
        minLen: 9,
        maxLen: 9,
        example: '6 12 34 56 78',
        mask: '6/7 XX XX XX XX',
        strictRegex: /^[1-9]\d{8}$/,
        format: function (digits: string): string {
            if (digits.length === 9) {
                return `${digits.slice(0, 1)} ${digits.slice(1, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 7)} ${digits.slice(7)}`;
            }
            return digits;
        },
    },

    // GERMANY (+49) — Mobile: 15x, 16x, 17x (10-11 digits). Fixed: 2x-9x
    DE: {
        name: 'Germany',
        iso: 'DE',
        callingCode: '+49',
        minLen: 10,
        maxLen: 11,
        example: '171 1234567',
        mask: '1XX XXXXXXXX',
        strictRegex: /^(?:1[567]\d{8,9}|[2-9]\d{8,10})$/,
        format: function (digits: string): string {
            if (digits.length >= 10) {
                return `${digits.slice(0, 3)} ${digits.slice(3)}`;
            }
            return digits;
        },
    },

    // UNITED ARAB EMIRATES (+971) — Mobile: 5[024568] (9 digits). Fixed: [234679]
    AE: {
        name: 'United Arab Emirates',
        iso: 'AE',
        callingCode: '+971',
        minLen: 9,
        maxLen: 9,
        example: '50 123 4567',
        mask: '5X XXX XXXX',
        strictRegex: /^(?:5[024568]\d{7}|[234679]\d{7})$/,
        format: function (digits: string): string {
            if (digits.length === 9) {
                return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
            }
            return digits;
        },
    },

    // MONACO (+377) — Mobile: 4, 6 (8-9 digits). Fixed: 9 (8 digits)
    MC: {
        name: 'Monaco',
        iso: 'MC',
        callingCode: '+377',
        minLen: 8,
        maxLen: 9,
        example: '6 12 34 56 78',
        mask: 'X XX XX XX XX',
        strictRegex: /^(?:[46]\d{7,8}|9\d{7})$/,
        format: function (digits: string): string {
            if (digits.length === 9) {
                return `${digits.slice(0, 1)} ${digits.slice(1, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 7)} ${digits.slice(7)}`;
            }
            if (digits.length === 8) {
                return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6)}`;
            }
            return digits;
        },
    },

    // SPAIN (+34) — Mobile: 6, 7 (9 digits). Fixed: 8, 9 (9 digits)
    ES: {
        name: 'Spain',
        iso: 'ES',
        callingCode: '+34',
        minLen: 9,
        maxLen: 9,
        example: '612 345 678',
        mask: '6XX XXX XXX',
        strictRegex: /^[6789]\d{8}$/,
        format: function (digits: string): string {
            if (digits.length === 9) {
                return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
            }
            return digits;
        },
    },

    // JAPAN (+81) — Mobile: 70, 80, 90 (10 digits). Fixed: 1-6 (9-10 digits)
    JP: {
        name: 'Japan',
        iso: 'JP',
        callingCode: '+81',
        minLen: 10,
        maxLen: 10,
        example: '90 1234 5678',
        mask: 'X0 XXXX XXXX',
        strictRegex: /^(?:[789]0\d{8}|[1-9]\d{8,9})$/,
        format: function (digits: string): string {
            if (digits.length === 10) {
                return `${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`;
            }
            return digits;
        },
    },

    // SINGAPORE (+65) — Mobile: 8, 9 (8 digits). Fixed: 6 (8 digits)
    SG: {
        name: 'Singapore',
        iso: 'SG',
        callingCode: '+65',
        minLen: 8,
        maxLen: 8,
        example: '9123 4567',
        mask: 'XXXX XXXX',
        strictRegex: /^[689]\d{7}$/,
        format: function (digits: string): string {
            if (digits.length === 8) {
                return `${digits.slice(0, 4)} ${digits.slice(4)}`;
            }
            return digits;
        },
    },

    // HONG KONG (+852) — Mobile: 4, 5, 6, 7, 8, 9 (8 digits). Fixed: 2, 3 (8 digits)
    HK: {
        name: 'Hong Kong',
        iso: 'HK',
        callingCode: '+852',
        minLen: 8,
        maxLen: 8,
        example: '9123 4567',
        mask: 'XXXX XXXX',
        strictRegex: /^[2-9]\d{7}$/,
        format: function (digits: string): string {
            if (digits.length === 8) {
                return `${digits.slice(0, 4)} ${digits.slice(4)}`;
            }
            return digits;
        },
    },

    // AUSTRALIA (+61) — Mobile: 4xx (9 digits). Fixed: 2, 3, 7, 8 (9 digits)
    AU: {
        name: 'Australia',
        iso: 'AU',
        callingCode: '+61',
        minLen: 9,
        maxLen: 9,
        example: '412 345 678',
        mask: '4XX XXX XXX',
        strictRegex: /^(?:4\d{8}|[2378]\d{8})$/,
        format: function (digits: string): string {
            if (digits.length === 9) {
                return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
            }
            return digits;
        },
    },

    // INDIA (+91) — Mobile: 6, 7, 8, 9 (strictly 10 digits)
    IN: {
        name: 'India',
        iso: 'IN',
        callingCode: '+91',
        minLen: 10,
        maxLen: 10,
        example: '98201 12345',
        mask: 'XXXXX XXXXX',
        strictRegex: /^[6-9]\d{9}$/,
        format: function (digits: string): string {
            if (digits.length === 10) {
                return `${digits.slice(0, 5)} ${digits.slice(5)}`;
            }
            return digits;
        },
    },

    // CHINA (+86) — Mobile: 13-19 (11 digits)
    CN: {
        name: 'China',
        iso: 'CN',
        callingCode: '+86',
        minLen: 11,
        maxLen: 11,
        example: '138 0013 8000',
        mask: '1XX XXXX XXXX',
        strictRegex: /^1[3-9]\d{9}$/,
        format: function (digits: string): string {
            if (digits.length === 11) {
                return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
            }
            return digits;
        },
    },

    // SAUDI ARABIA (+966) — Mobile: 5x (9 digits). Fixed: 1x (9 digits)
    SA: {
        name: 'Saudi Arabia',
        iso: 'SA',
        callingCode: '+966',
        minLen: 9,
        maxLen: 9,
        example: '50 123 4567',
        mask: '5X XXX XXXX',
        strictRegex: /^(?:5\d{8}|1[1-7]\d{7})$/,
        format: function (digits: string): string {
            if (digits.length === 9) {
                return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
            }
            return digits;
        },
    },

    // QATAR (+974) — 8 digits starting with 3, 5, 6, 7
    QA: {
        name: 'Qatar',
        iso: 'QA',
        callingCode: '+974',
        minLen: 8,
        maxLen: 8,
        example: '3312 3456',
        mask: 'XXXX XXXX',
        strictRegex: /^[3567]\d{7}$/,
        format: function (digits: string): string {
            if (digits.length === 8) {
                return `${digits.slice(0, 4)} ${digits.slice(4)}`;
            }
            return digits;
        },
    },

    // KUWAIT (+965) — 8 digits starting with 2, 5, 6, 9
    KW: {
        name: 'Kuwait',
        iso: 'KW',
        callingCode: '+965',
        minLen: 8,
        maxLen: 8,
        example: '9912 3456',
        mask: 'XXXX XXXX',
        strictRegex: /^[2569]\d{7}$/,
        format: function (digits: string): string {
            if (digits.length === 8) {
                return `${digits.slice(0, 4)} ${digits.slice(4)}`;
            }
            return digits;
        },
    },

    // BAHRAIN (+973) — 8 digits starting with 1, 3, 6, 7
    BH: {
        name: 'Bahrain',
        iso: 'BH',
        callingCode: '+973',
        minLen: 8,
        maxLen: 8,
        example: '3912 3456',
        mask: 'XXXX XXXX',
        strictRegex: /^[1367]\d{7}$/,
        format: function (digits: string): string {
            if (digits.length === 8) {
                return `${digits.slice(0, 4)} ${digits.slice(4)}`;
            }
            return digits;
        },
    },

    // NETHERLANDS (+31) — Mobile: 6 (9 digits). Fixed: 1-5, 7-9 (9 digits)
    NL: {
        name: 'Netherlands',
        iso: 'NL',
        callingCode: '+31',
        minLen: 9,
        maxLen: 9,
        example: '6 12345678',
        mask: '6 XXXXXXXX',
        strictRegex: /^[1-9]\d{8}$/,
        format: function (digits: string): string {
            if (digits.length === 9) {
                return `${digits.slice(0, 1)} ${digits.slice(1)}`;
            }
            return digits;
        },
    },

    // BELGIUM (+32) — Mobile: 4[5-9] (9 digits). Fixed: [1-9] (8-9 digits)
    BE: {
        name: 'Belgium',
        iso: 'BE',
        callingCode: '+32',
        minLen: 8,
        maxLen: 9,
        example: '470 12 34 56',
        mask: '4XX XX XX XX',
        strictRegex: /^(?:4[5-9]\d{7}|[1-9]\d{7,8})$/,
        format: function (digits: string): string {
            if (digits.length === 9) {
                return `${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 7)} ${digits.slice(7)}`;
            }
            return digits;
        },
    },

    // AUSTRIA (+43) — Mobile: 6[5-9] (10-13 digits). Fixed: 1-5, 7-9
    AT: {
        name: 'Austria',
        iso: 'AT',
        callingCode: '+43',
        minLen: 7,
        maxLen: 13,
        example: '664 1234567',
        mask: '6XX XXXXXXX',
        strictRegex: /^(?:6\d{7,12}|[1-57-9]\d{6,12})$/,
        format: function (digits: string): string {
            if (digits.length >= 10) {
                return `${digits.slice(0, 3)} ${digits.slice(3)}`;
            }
            return digits;
        },
    },

    // SWEDEN (+46) — Mobile: 7[02369] (9 digits). Fixed: [1-9]
    SE: {
        name: 'Sweden',
        iso: 'SE',
        callingCode: '+46',
        minLen: 9,
        maxLen: 9,
        example: '70 123 45 67',
        mask: '7X XXX XX XX',
        strictRegex: /^(?:7[02369]\d{7}|[1-689]\d{7,8})$/,
        format: function (digits: string): string {
            if (digits.length === 9) {
                return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7)}`;
            }
            return digits;
        },
    },

    // NORWAY (+47) — 8 digits starting with 2-9
    NO: {
        name: 'Norway',
        iso: 'NO',
        callingCode: '+47',
        minLen: 8,
        maxLen: 8,
        example: '412 34 567',
        mask: 'XXX XX XXX',
        strictRegex: /^[2-9]\d{7}$/,
        format: function (digits: string): string {
            if (digits.length === 8) {
                return `${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5)}`;
            }
            return digits;
        },
    },

    // DENMARK (+45) — 8 digits starting with 2-9
    DK: {
        name: 'Denmark',
        iso: 'DK',
        callingCode: '+45',
        minLen: 8,
        maxLen: 8,
        example: '20 12 34 56',
        mask: 'XX XX XX XX',
        strictRegex: /^[2-9]\d{7}$/,
        format: function (digits: string): string {
            if (digits.length === 8) {
                return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6)}`;
            }
            return digits;
        },
    },

    // PORTUGAL (+351) — Mobile: 9[1236] (9 digits). Fixed: 2
    PT: {
        name: 'Portugal',
        iso: 'PT',
        callingCode: '+351',
        minLen: 9,
        maxLen: 9,
        example: '912 345 678',
        mask: '9XX XXX XXX',
        strictRegex: /^(?:9[1236]\d{7}|2\d{8})$/,
        format: function (digits: string): string {
            if (digits.length === 9) {
                return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
            }
            return digits;
        },
    },

    // GREECE (+30) — Mobile: 69x (10 digits). Fixed: 2x
    GR: {
        name: 'Greece',
        iso: 'GR',
        callingCode: '+30',
        minLen: 10,
        maxLen: 10,
        example: '691 234 5678',
        mask: '69X XXX XXXX',
        strictRegex: /^(?:69\d{8}|2\d{9})$/,
        format: function (digits: string): string {
            if (digits.length === 10) {
                return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
            }
            return digits;
        },
    },

    // IRELAND (+353) — Mobile: 8[35-9] (9 digits). Fixed: 1-7, 9
    IE: {
        name: 'Ireland',
        iso: 'IE',
        callingCode: '+353',
        minLen: 9,
        maxLen: 9,
        example: '87 123 4567',
        mask: '8X XXX XXXX',
        strictRegex: /^(?:8[35-9]\d{7}|[1-79]\d{7,8})$/,
        format: function (digits: string): string {
            if (digits.length === 9) {
                return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
            }
            return digits;
        },
    },

    // LUXEMBOURG (+352) — Mobile: 6[269]1 (8-9 digits)
    LU: {
        name: 'Luxembourg',
        iso: 'LU',
        callingCode: '+352',
        minLen: 8,
        maxLen: 9,
        example: '621 123 456',
        mask: '6XX XXX XXX',
        strictRegex: /^(?:6[269]1\d{6}|[2-57-9]\d{7,8})$/,
        format: function (digits: string): string {
            if (digits.length >= 8) {
                return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
            }
            return digits;
        },
    },

    // SOUTH KOREA (+82) — Mobile: 10 (9-10 digits). Fixed: 2-6
    KR: {
        name: 'South Korea',
        iso: 'KR',
        callingCode: '+82',
        minLen: 9,
        maxLen: 10,
        example: '10 1234 5678',
        mask: '10 XXXX XXXX',
        strictRegex: /^(?:10\d{7,8}|[2-6]\d{7,8})$/,
        format: function (digits: string): string {
            if (digits.length === 10) {
                return `${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`;
            }
            return digits;
        },
    },

    // BRAZIL (+55) — Area codes 11-99; Mobile: 9xxxx-xxxx (10-11 digits)
    BR: {
        name: 'Brazil',
        iso: 'BR',
        callingCode: '+55',
        minLen: 10,
        maxLen: 11,
        example: '11 98765 4321',
        mask: 'XX 9XXXX XXXX',
        strictRegex: /^[1-9]{2}9?[1-9]\d{7}$/,
        format: function (digits: string): string {
            if (digits.length === 11) {
                return `${digits.slice(0, 2)} ${digits.slice(2, 7)} ${digits.slice(7)}`;
            }
            return digits;
        },
    },

    // MEXICO (+52) — 10 digits starting with [1-9]
    MX: {
        name: 'Mexico',
        iso: 'MX',
        callingCode: '+52',
        minLen: 10,
        maxLen: 10,
        example: '55 1234 5678',
        mask: 'XX XXXX XXXX',
        strictRegex: /^[1-9]\d{9}$/,
        format: function (digits: string): string {
            if (digits.length === 10) {
                return `${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`;
            }
            return digits;
        },
    },

    // SOUTH AFRICA (+27) — Mobile: 6, 7, 8 (9 digits). Fixed: 1-5
    ZA: {
        name: 'South Africa',
        iso: 'ZA',
        callingCode: '+27',
        minLen: 9,
        maxLen: 9,
        example: '71 123 4567',
        mask: '7X XXX XXXX',
        strictRegex: /^[1-8]\d{8}$/,
        format: function (digits: string): string {
            if (digits.length === 9) {
                return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
            }
            return digits;
        },
    },

    // NEW ZEALAND (+64) — Mobile: 2x (8-10 digits). Fixed: 3, 4, 6, 7, 9
    NZ: {
        name: 'New Zealand',
        iso: 'NZ',
        callingCode: '+64',
        minLen: 8,
        maxLen: 10,
        example: '21 123 4567',
        mask: '2X XXX XXXX',
        strictRegex: /^(?:2[0-27-9]\d{6,8}|[34679]\d{7})$/,
        format: function (digits: string): string {
            if (digits.length >= 8) {
                return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
            }
            return digits;
        },
    },

    // TURKEY (+90) — Mobile: 5xx (10 digits). Fixed: 2xx-4xx
    TR: {
        name: 'Turkey',
        iso: 'TR',
        callingCode: '+90',
        minLen: 10,
        maxLen: 10,
        example: '532 123 4567',
        mask: '5XX XXX XXXX',
        strictRegex: /^[2-5]\d{9}$/,
        format: function (digits: string): string {
            if (digits.length === 10) {
                return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
            }
            return digits;
        },
    },

    // EGYPT (+20) — Mobile: 1[0125] (10 digits). Fixed: [2-9]
    EG: {
        name: 'Egypt',
        iso: 'EG',
        callingCode: '+20',
        minLen: 10,
        maxLen: 10,
        example: '10 1234 5678',
        mask: '1X XXXX XXXX',
        strictRegex: /^(?:1[0125]\d{8}|[2-9]\d{8})$/,
        format: function (digits: string): string {
            if (digits.length === 10) {
                return `${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`;
            }
            return digits;
        },
    },

    // INDONESIA (+62) — Mobile: 8xx (9-12 digits). Fixed: 2-9
    ID: {
        name: 'Indonesia',
        iso: 'ID',
        callingCode: '+62',
        minLen: 9,
        maxLen: 12,
        example: '812 3456 7890',
        mask: '8XX XXXX XXXX',
        strictRegex: /^(?:8[1-9]\d{7,10}|[2-9]\d{7,10})$/,
        format: function (digits: string): string {
            if (digits.length >= 9) {
                return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
            }
            return digits;
        },
    },

    // THAILAND (+66) — Mobile: 6, 8, 9 (9 digits). Fixed: 2, 3, 4, 5, 7
    TH: {
        name: 'Thailand',
        iso: 'TH',
        callingCode: '+66',
        minLen: 9,
        maxLen: 9,
        example: '81 234 5678',
        mask: '8X XXX XXXX',
        strictRegex: /^[2-9]\d{8}$/,
        format: function (digits: string): string {
            if (digits.length === 9) {
                return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
            }
            return digits;
        },
    },

    // MALAYSIA (+60) — Mobile: 1x (9-10 digits). Fixed: [3-9]
    MY: {
        name: 'Malaysia',
        iso: 'MY',
        callingCode: '+60',
        minLen: 9,
        maxLen: 10,
        example: '12 345 6789',
        mask: '1X XXX XXXX',
        strictRegex: /^(?:1[0-9]\d{7,8}|[3-9]\d{7,8})$/,
        format: function (digits: string): string {
            if (digits.length >= 9) {
                return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
            }
            return digits;
        },
    },

    // Additional Global Enclaves
    AF: { name: 'Afghanistan', iso: 'AF', callingCode: '+93', minLen: 9, maxLen: 9, example: '70 123 4567', mask: '7X XXX XXXX', strictRegex: /^7\d{8}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    AL: { name: 'Albania', iso: 'AL', callingCode: '+355', minLen: 8, maxLen: 9, example: '67 123 4567', mask: '6X XXX XXXX', strictRegex: /^6[7-9]\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    DZ: { name: 'Algeria', iso: 'DZ', callingCode: '+213', minLen: 9, maxLen: 9, example: '55 123 4567', mask: '5/6/7 XX XX XX', strictRegex: /^[567]\d{8}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    AD: { name: 'Andorra', iso: 'AD', callingCode: '+376', minLen: 6, maxLen: 6, example: '312 345', mask: 'XXX XXX', strictRegex: /^[3678]\d{5}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3)}` },
    AO: { name: 'Angola', iso: 'AO', callingCode: '+244', minLen: 9, maxLen: 9, example: '923 123 456', mask: '9XX XXX XXX', strictRegex: /^9\d{8}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}` },
    AR: { name: 'Argentina', iso: 'AR', callingCode: '+54', minLen: 10, maxLen: 11, example: '11 1234 5678', mask: 'XX XXXX XXXX', strictRegex: /^(?:9\d{10}|11\d{8}|[23]\d{9})$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 6)} ${d.slice(6)}` },
    AM: { name: 'Armenia', iso: 'AM', callingCode: '+374', minLen: 8, maxLen: 8, example: '91 123456', mask: 'XX XXXXXX', strictRegex: /^[1-9]\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2)}` },
    AZ: { name: 'Azerbaijan', iso: 'AZ', callingCode: '+994', minLen: 9, maxLen: 9, example: '50 123 45 67', mask: '5X XXX XX XX', strictRegex: /^[1-9]\d{8}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 7)} ${d.slice(7)}` },
    BD: { name: 'Bangladesh', iso: 'BD', callingCode: '+880', minLen: 10, maxLen: 10, example: '1712 345678', mask: '1XXX XXXXXX', strictRegex: /^1[3-9]\d{8}$/, format: (d) => `${d.slice(0, 4)} ${d.slice(4)}` },
    BY: { name: 'Belarus', iso: 'BY', callingCode: '+375', minLen: 9, maxLen: 9, example: '29 123 45 67', mask: 'XX XXX XX XX', strictRegex: /^(?:25|29|33|44)\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 7)} ${d.slice(7)}` } as StrictCountryPlan,
    BZ: { name: 'Belize', iso: 'BZ', callingCode: '+501', minLen: 7, maxLen: 7, example: '612 3456', mask: '6XX XXXX', strictRegex: /^[2-9]\d{6}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3)}` },
    BJ: { name: 'Benin', iso: 'BJ', callingCode: '+229', minLen: 8, maxLen: 8, example: '97 12 34 56', mask: 'XX XX XX XX', strictRegex: /^[2-9]\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 4)} ${d.slice(4, 6)} ${d.slice(6)}` },
    BT: { name: 'Bhutan', iso: 'BT', callingCode: '+975', minLen: 8, maxLen: 8, example: '17 12 34 56', mask: '17 XX XX XX', strictRegex: /^(?:17|77)\d{6}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 4)} ${d.slice(4, 6)} ${d.slice(6)}` },
    BO: { name: 'Bolivia', iso: 'BO', callingCode: '+591', minLen: 8, maxLen: 8, example: '71234567', mask: '7XXXXXXX', strictRegex: /^[67]\d{7}$/, format: (d) => d },
    BA: { name: 'Bosnia and Herzegovina', iso: 'BA', callingCode: '+387', minLen: 8, maxLen: 8, example: '61 123 456', mask: '6X XXX XXX', strictRegex: /^6[0-6]\d{6}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    BW: { name: 'Botswana', iso: 'BW', callingCode: '+267', minLen: 7, maxLen: 8, example: '71 123 456', mask: '7X XXX XXX', strictRegex: /^7[1-8]\d{6}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    BN: { name: 'Brunei', iso: 'BN', callingCode: '+673', minLen: 7, maxLen: 7, example: '712 3456', mask: 'XXX XXXX', strictRegex: /^[78]\d{6}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3)}` },
    BG: { name: 'Bulgaria', iso: 'BG', callingCode: '+359', minLen: 8, maxLen: 9, example: '88 123 4567', mask: '8X XXX XXXX', strictRegex: /^8[7-9]\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    BF: { name: 'Burkina Faso', iso: 'BF', callingCode: '+226', minLen: 8, maxLen: 8, example: '70 12 34 56', mask: 'XX XX XX XX', strictRegex: /^[567]\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 4)} ${d.slice(4, 6)} ${d.slice(6)}` },
    BI: { name: 'Burundi', iso: 'BI', callingCode: '+257', minLen: 8, maxLen: 8, example: '79 12 34 56', mask: 'XX XX XX XX', strictRegex: /^[67]\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 4)} ${d.slice(4, 6)} ${d.slice(6)}` },
    KH: { name: 'Cambodia', iso: 'KH', callingCode: '+855', minLen: 8, maxLen: 9, example: '12 345 678', mask: 'XX XXX XXX', strictRegex: /^[1-9]\d{7,8}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    CM: { name: 'Cameroon', iso: 'CM', callingCode: '+237', minLen: 8, maxLen: 9, example: '6 71 23 45 67', mask: '6 XX XX XX XX', strictRegex: /^6[5-9]\d{7}$/, format: (d) => `${d.slice(0, 1)} ${d.slice(1, 3)} ${d.slice(3, 5)} ${d.slice(5, 7)} ${d.slice(7)}` },
    CV: { name: 'Cape Verde', iso: 'CV', callingCode: '+238', minLen: 7, maxLen: 7, example: '991 23 45', mask: '9XX XX XX', strictRegex: /^9\d{6}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5)}` },
    CL: { name: 'Chile', iso: 'CL', callingCode: '+56', minLen: 9, maxLen: 9, example: '9 1234 5678', mask: '9 XXXX XXXX', strictRegex: /^9\d{8}$/, format: (d) => `${d.slice(0, 1)} ${d.slice(1, 5)} ${d.slice(5)}` },
    CO: { name: 'Colombia', iso: 'CO', callingCode: '+57', minLen: 10, maxLen: 10, example: '300 123 4567', mask: '3XX XXX XXXX', strictRegex: /^3\d{9}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}` },
    KM: { name: 'Comoros', iso: 'KM', callingCode: '+269', minLen: 7, maxLen: 7, example: '321 23 45', mask: 'XXX XX XX', strictRegex: /^[34]\d{6}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5)}` },
    CG: { name: 'Congo (Brazzaville)', iso: 'CG', callingCode: '+242', minLen: 9, maxLen: 9, example: '06 123 4567', mask: '06 XXX XXXX', strictRegex: /^0?[456]\d{7}$/, format: (d) => d },
    CD: { name: 'Congo (DRC)', iso: 'CD', callingCode: '+243', minLen: 9, maxLen: 9, example: '81 234 5678', mask: '8X XXX XXXX', strictRegex: /^[89]\d{8}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    CR: { name: 'Costa Rica', iso: 'CR', callingCode: '+506', minLen: 8, maxLen: 8, example: '8312 3456', mask: 'XXXX XXXX', strictRegex: /^[5-8]\d{7}$/, format: (d) => `${d.slice(0, 4)} ${d.slice(4)}` },
    HR: { name: 'Croatia', iso: 'HR', callingCode: '+385', minLen: 8, maxLen: 9, example: '91 123 4567', mask: '9X XXX XXXX', strictRegex: /^9\d{7,8}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    CU: { name: 'Cuba', iso: 'CU', callingCode: '+53', minLen: 8, maxLen: 8, example: '5 123 4567', mask: '5 XXX XXXX', strictRegex: /^5\d{7}$/, format: (d) => `${d.slice(0, 1)} ${d.slice(1, 4)} ${d.slice(4)}` },
    CY: { name: 'Cyprus', iso: 'CY', callingCode: '+357', minLen: 8, maxLen: 8, example: '96 123456', mask: '9X XXXXXX', strictRegex: /^9\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2)}` },
    CZ: { name: 'Czech Republic', iso: 'CZ', callingCode: '+420', minLen: 9, maxLen: 9, example: '601 123 456', mask: 'XXX XXX XXX', strictRegex: /^[67]\d{8}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}` },
    DJ: { name: 'Djibouti', iso: 'DJ', callingCode: '+253', minLen: 8, maxLen: 8, example: '77 12 34 56', mask: '77 XX XX XX', strictRegex: /^77\d{6}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 4)} ${d.slice(4, 6)} ${d.slice(6)}` },
    DM: { name: 'Dominica', iso: 'DM', callingCode: '+1767', minLen: 7, maxLen: 7, example: '275 1234', mask: 'NXX XXXX', strictRegex: /^[2-9]\d{6}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3)}` },
    DO: { name: 'Dominican Republic', iso: 'DO', callingCode: '+1', minLen: 10, maxLen: 10, example: '809 555 0123', mask: '8X9 NXX XXXX', strictRegex: /^(?:809|829|849)[2-9]\d{6}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}` },
    EC: { name: 'Ecuador', iso: 'EC', callingCode: '+593', minLen: 8, maxLen: 9, example: '99 123 4567', mask: '9X XXX XXXX', strictRegex: /^9\d{8}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    SV: { name: 'El Salvador', iso: 'SV', callingCode: '+503', minLen: 8, maxLen: 8, example: '7012 3456', mask: 'XXXX XXXX', strictRegex: /^[67]\d{7}$/, format: (d) => `${d.slice(0, 4)} ${d.slice(4)}` },
    EE: { name: 'Estonia', iso: 'EE', callingCode: '+372', minLen: 7, maxLen: 8, example: '5123 4567', mask: '5XXX XXXX', strictRegex: /^5\d{6,7}$/, format: (d) => `${d.slice(0, 4)} ${d.slice(4)}` },
    ET: { name: 'Ethiopia', iso: 'ET', callingCode: '+251', minLen: 9, maxLen: 9, example: '91 123 4567', mask: '9X XXX XXXX', strictRegex: /^9\d{8}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    FJ: { name: 'Fiji', iso: 'FJ', callingCode: '+679', minLen: 7, maxLen: 7, example: '701 2345', mask: '7XX XXXX', strictRegex: /^[79]\d{6}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3)}` },
    FI: { name: 'Finland', iso: 'FI', callingCode: '+358', minLen: 7, maxLen: 10, example: '40 123 4567', mask: '4X XXX XXXX', strictRegex: /^(?:4\d|50)\d{6,8}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    GA: { name: 'Gabon', iso: 'GA', callingCode: '+241', minLen: 7, maxLen: 8, example: '06 12 34 56', mask: '06 XX XX XX', strictRegex: /^0?[67]\d{7}$/, format: (d) => d },
    GM: { name: 'Gambia', iso: 'GM', callingCode: '+220', minLen: 7, maxLen: 7, example: '701 2345', mask: '7XX XXXX', strictRegex: /^[79]\d{6}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3)}` },
    GE: { name: 'Georgia', iso: 'GE', callingCode: '+995', minLen: 9, maxLen: 9, example: '591 12 34 56', mask: '5XX XX XX XX', strictRegex: /^5\d{8}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 7)} ${d.slice(7)}` },
    GH: { name: 'Ghana', iso: 'GH', callingCode: '+233', minLen: 9, maxLen: 9, example: '24 123 4567', mask: '2X XXX XXXX', strictRegex: /^[235]\d{8}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    GT: { name: 'Guatemala', iso: 'GT', callingCode: '+502', minLen: 8, maxLen: 8, example: '5123 4567', mask: 'XXXX XXXX', strictRegex: /^[3-5]\d{7}$/, format: (d) => `${d.slice(0, 4)} ${d.slice(4)}` },
    GN: { name: 'Guinea', iso: 'GN', callingCode: '+224', minLen: 8, maxLen: 9, example: '621 12 34 56', mask: '6XX XX XX XX', strictRegex: /^6\d{8}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 7)} ${d.slice(7)}` },
    HU: { name: 'Hungary', iso: 'HU', callingCode: '+36', minLen: 8, maxLen: 9, example: '20 123 4567', mask: '20/30/70 XXX XXXX', strictRegex: /^(?:20|30|70)\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    IS: { name: 'Iceland', iso: 'IS', callingCode: '+354', minLen: 7, maxLen: 7, example: '612 3456', mask: '6XX XXXX', strictRegex: /^[6-8]\d{6}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3)}` },
    IR: { name: 'Iran', iso: 'IR', callingCode: '+98', minLen: 10, maxLen: 10, example: '912 123 4567', mask: '9XX XXX XXXX', strictRegex: /^9\d{9}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}` },
    IQ: { name: 'Iraq', iso: 'IQ', callingCode: '+964', minLen: 10, maxLen: 10, example: '790 123 4567', mask: '7XX XXX XXXX', strictRegex: /^7\d{9}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}` },
    IL: { name: 'Israel', iso: 'IL', callingCode: '+972', minLen: 9, maxLen: 9, example: '50 123 4567', mask: '5X XXX XXXX', strictRegex: /^5\d{8}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    JM: { name: 'Jamaica', iso: 'JM', callingCode: '+1876', minLen: 7, maxLen: 7, example: '555 0123', mask: 'NXX XXXX', strictRegex: /^[2-9]\d{6}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3)}` },
    JO: { name: 'Jordan', iso: 'JO', callingCode: '+962', minLen: 9, maxLen: 9, example: '7 9012 3456', mask: '7 XXXX XXXX', strictRegex: /^7[789]\d{7}$/, format: (d) => `${d.slice(0, 1)} ${d.slice(1, 5)} ${d.slice(5)}` },
    KZ: { name: 'Kazakhstan', iso: 'KZ', callingCode: '+7', minLen: 10, maxLen: 10, example: '701 123 4567', mask: '7XX XXX XXXX', strictRegex: /^7[047]\d{8}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}` },
    KE: { name: 'Kenya', iso: 'KE', callingCode: '+254', minLen: 9, maxLen: 9, example: '712 345678', mask: '7XX XXXXXX', strictRegex: /^[17]\d{8}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3)}` },
    KG: { name: 'Kyrgyzstan', iso: 'KG', callingCode: '+996', minLen: 9, maxLen: 9, example: '700 123456', mask: '7XX XXXXXX', strictRegex: /^[57]\d{8}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3)}` },
    LA: { name: 'Laos', iso: 'LA', callingCode: '+856', minLen: 8, maxLen: 10, example: '20 55 123 456', mask: '20 XX XXX XXX', strictRegex: /^20\d{8}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 4)} ${d.slice(4, 7)} ${d.slice(7)}` },
    LV: { name: 'Latvia', iso: 'LV', callingCode: '+371', minLen: 8, maxLen: 8, example: '2123 4567', mask: '2XXX XXXX', strictRegex: /^2\d{7}$/, format: (d) => `${d.slice(0, 4)} ${d.slice(4)}` },
    LB: { name: 'Lebanon', iso: 'LB', callingCode: '+961', minLen: 7, maxLen: 8, example: '71 123 456', mask: '7X XXX XXX', strictRegex: /^[378]\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    LY: { name: 'Libya', iso: 'LY', callingCode: '+218', minLen: 9, maxLen: 9, example: '91 123 4567', mask: '9X XXX XXXX', strictRegex: /^9[1-6]\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    LI: { name: 'Liechtenstein', iso: 'LI', callingCode: '+423', minLen: 7, maxLen: 7, example: '660 1234', mask: '6XX XXXX', strictRegex: /^(?:66|7[7-9])\d{5}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3)}` },
    LT: { name: 'Lithuania', iso: 'LT', callingCode: '+370', minLen: 8, maxLen: 8, example: '612 34567', mask: '6XX XXXXX', strictRegex: /^6\d{7}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3)}` },
    MO: { name: 'Macau', iso: 'MO', callingCode: '+853', minLen: 8, maxLen: 8, example: '6612 3456', mask: '6XXX XXXX', strictRegex: /^6\d{7}$/, format: (d) => `${d.slice(0, 4)} ${d.slice(4)}` },
    MG: { name: 'Madagascar', iso: 'MG', callingCode: '+261', minLen: 9, maxLen: 9, example: '32 12 345 67', mask: '3X XX XXX XX', strictRegex: /^3[2-48]\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 4)} ${d.slice(4, 7)} ${d.slice(7)}` },
    MW: { name: 'Malawi', iso: 'MW', callingCode: '+265', minLen: 8, maxLen: 9, example: '991 23 45 67', mask: '9XX XX XX XX', strictRegex: /^[89]\d{8}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 7)} ${d.slice(7)}` },
    MV: { name: 'Maldives', iso: 'MV', callingCode: '+960', minLen: 7, maxLen: 7, example: '771 2345', mask: '7XX XXXX', strictRegex: /^[79]\d{6}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3)}` },
    MT: { name: 'Malta', iso: 'MT', callingCode: '+356', minLen: 8, maxLen: 8, example: '9912 3456', mask: '9XXX XXXX', strictRegex: /^[79]\d{7}$/, format: (d) => `${d.slice(0, 4)} ${d.slice(4)}` },
    MN: { name: 'Mongolia', iso: 'MN', callingCode: '+976', minLen: 8, maxLen: 8, example: '8812 3456', mask: '8XXX XXXX', strictRegex: /^[89]\d{7}$/, format: (d) => `${d.slice(0, 4)} ${d.slice(4)}` },
    ME: { name: 'Montenegro', iso: 'ME', callingCode: '+382', minLen: 8, maxLen: 8, example: '67 123 456', mask: '6X XXX XXX', strictRegex: /^6\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    MA: { name: 'Morocco', iso: 'MA', callingCode: '+212', minLen: 9, maxLen: 9, example: '612 34 56 78', mask: '6XX XX XX XX', strictRegex: /^[67]\d{8}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 7)} ${d.slice(7)}` },
    MZ: { name: 'Mozambique', iso: 'MZ', callingCode: '+258', minLen: 8, maxLen: 9, example: '84 123 4567', mask: '8X XXX XXXX', strictRegex: /^8[2-7]\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    MM: { name: 'Myanmar', iso: 'MM', callingCode: '+95', minLen: 8, maxLen: 10, example: '9 123 456 789', mask: '9 XXX XXX XXX', strictRegex: /^9\d{7,9}$/, format: (d) => `${d.slice(0, 1)} ${d.slice(1, 4)} ${d.slice(4, 7)} ${d.slice(7)}` },
    NA: { name: 'Namibia', iso: 'NA', callingCode: '+264', minLen: 8, maxLen: 9, example: '81 123 4567', mask: '8X XXX XXXX', strictRegex: /^8[125]\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    NP: { name: 'Nepal', iso: 'NP', callingCode: '+977', minLen: 10, maxLen: 10, example: '981 2345678', mask: '98X XXXXXXX', strictRegex: /^9[78]\d{8}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3)}` },
    NI: { name: 'Nicaragua', iso: 'NI', callingCode: '+505', minLen: 8, maxLen: 8, example: '8123 4567', mask: 'XXXX XXXX', strictRegex: /^[578]\d{7}$/, format: (d) => `${d.slice(0, 4)} ${d.slice(4)}` },
    NG: { name: 'Nigeria', iso: 'NG', callingCode: '+234', minLen: 10, maxLen: 10, example: '802 123 4567', mask: '8XX XXX XXXX', strictRegex: /^[789][01]\d{8}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}` },
    OM: { name: 'Oman', iso: 'OM', callingCode: '+968', minLen: 8, maxLen: 8, example: '9123 4567', mask: '9XXX XXXX', strictRegex: /^[79]\d{7}$/, format: (d) => `${d.slice(0, 4)} ${d.slice(4)}` },
    PK: { name: 'Pakistan', iso: 'PK', callingCode: '+92', minLen: 10, maxLen: 10, example: '300 1234567', mask: '3XX XXXXXXX', strictRegex: /^3\d{9}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3)}` },
    PA: { name: 'Panama', iso: 'PA', callingCode: '+507', minLen: 8, maxLen: 8, example: '6123 4567', mask: '6XXX XXXX', strictRegex: /^6\d{7}$/, format: (d) => `${d.slice(0, 4)} ${d.slice(4)}` },
    PY: { name: 'Paraguay', iso: 'PY', callingCode: '+595', minLen: 9, maxLen: 9, example: '981 123456', mask: '9XX XXXXXX', strictRegex: /^9[6-9]\d{7}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3)}` },
    PE: { name: 'Peru', iso: 'PE', callingCode: '+51', minLen: 9, maxLen: 9, example: '912 345 678', mask: '9XX XXX XXX', strictRegex: /^9\d{8}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}` },
    PH: { name: 'Philippines', iso: 'PH', callingCode: '+63', minLen: 10, maxLen: 10, example: '917 123 4567', mask: '9XX XXX XXXX', strictRegex: /^9\d{9}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}` },
    PL: { name: 'Poland', iso: 'PL', callingCode: '+48', minLen: 9, maxLen: 9, example: '512 345 678', mask: 'XXX XXX XXX', strictRegex: /^[4-9]\d{8}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}` },
    RO: { name: 'Romania', iso: 'RO', callingCode: '+40', minLen: 9, maxLen: 9, example: '712 345 678', mask: '7XX XXX XXX', strictRegex: /^7\d{8}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}` },
    RU: { name: 'Russia', iso: 'RU', callingCode: '+7', minLen: 10, maxLen: 10, example: '912 345 67 89', mask: '9XX XXX XX XX', strictRegex: /^9\d{9}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8)}` },
    SN: { name: 'Senegal', iso: 'SN', callingCode: '+221', minLen: 9, maxLen: 9, example: '77 123 45 67', mask: '7X XXX XX XX', strictRegex: /^7[0678]\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 7)} ${d.slice(7)}` },
    RS: { name: 'Serbia', iso: 'RS', callingCode: '+381', minLen: 8, maxLen: 9, example: '60 123 4567', mask: '6X XXX XXXX', strictRegex: /^6\d{7,8}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    SK: { name: 'Slovakia', iso: 'SK', callingCode: '+421', minLen: 9, maxLen: 9, example: '912 345 678', mask: '9XX XXX XXX', strictRegex: /^9\d{8}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}` },
    SI: { name: 'Slovenia', iso: 'SI', callingCode: '+386', minLen: 8, maxLen: 8, example: '31 234 567', mask: 'XX XXX XXX', strictRegex: /^[3-7]\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    LK: { name: 'Sri Lanka', iso: 'LK', callingCode: '+94', minLen: 9, maxLen: 9, example: '71 234 5678', mask: '7X XXX XXXX', strictRegex: /^7[0-8]\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    TW: { name: 'Taiwan', iso: 'TW', callingCode: '+886', minLen: 9, maxLen: 9, example: '912 345 678', mask: '9XX XXX XXX', strictRegex: /^9\d{8}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}` },
    TN: { name: 'Tunisia', iso: 'TN', callingCode: '+216', minLen: 8, maxLen: 8, example: '98 123 456', mask: 'XX XXX XXX', strictRegex: /^[2459]\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    UA: { name: 'Ukraine', iso: 'UA', callingCode: '+380', minLen: 9, maxLen: 9, example: '50 123 4567', mask: 'XX XXX XXXX', strictRegex: /^[3-9]\d{8}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    UY: { name: 'Uruguay', iso: 'UY', callingCode: '+598', minLen: 8, maxLen: 8, example: '99 123 456', mask: '9X XXX XXX', strictRegex: /^9\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    UZ: { name: 'Uzbekistan', iso: 'UZ', callingCode: '+998', minLen: 9, maxLen: 9, example: '90 123 45 67', mask: '9X XXX XX XX', strictRegex: /^[679]\d{8}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    VE: { name: 'Venezuela', iso: 'VE', callingCode: '+58', minLen: 10, maxLen: 10, example: '412 123 4567', mask: '4XX XXX XXXX', strictRegex: /^4\d{9}$/, format: (d) => `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}` },
    VN: { name: 'Vietnam', iso: 'VN', callingCode: '+84', minLen: 9, maxLen: 10, example: '91 234 5678', mask: '9X XXX XXXX', strictRegex: /^[35789]\d{8}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    YE: { name: 'Yemen', iso: 'YE', callingCode: '+967', minLen: 8, maxLen: 9, example: '71 123 4567', mask: '7X XXX XXXX', strictRegex: /^7[0137]\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
    ZW: { name: 'Zimbabwe', iso: 'ZW', callingCode: '+263', minLen: 9, maxLen: 9, example: '77 123 4567', mask: '7X XXX XXXX', strictRegex: /^7[1378]\d{7}$/, format: (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}` },
};

export const STRICT_COUNTRY_LIST: StrictCountryPlan[] = Object.values(STRICT_COUNTRY_PLANS).sort(
    function (a, b) {
        return a.name.localeCompare(b.name);
    }
);

// ============================================================================
// 3. DEFENSIVE STRIPPING & EXTRACTION
// ============================================================================

export function extractDigits(value: string): string {
    return (value || '').replace(/\D/g, '');
}

export function stripTrunk(digits: string, countryIso: CountryIso2): string {
    if (countryIso === 'IT' && digits.startsWith('0')) {
        return digits;
    }
    if ((countryIso === 'GA' || countryIso === 'CG') && digits.startsWith('0')) {
        return digits.slice(1);
    }
    return digits.startsWith('0') ? digits.slice(1) : digits;
}

// ============================================================================
// 4. MASTER STRICT VALIDATION FUNCTION
// ============================================================================

export function validatePhoneNumberStrict(
    rawPhone: string,
    countryIso: CountryIso2 | string = 'GB'
): StrictValidationResult {
    const rawInput = rawPhone || '';
    let digits = extractDigits(rawInput);
    const plan = STRICT_COUNTRY_PLANS[countryIso as CountryIso2] || STRICT_COUNTRY_PLANS.GB;

    // Check 1: Empty
    if (!digits) {
        return {
            isValid: false,
            countryIso: plan.iso,
            countryName: plan.name,
            callingCode: plan.callingCode,
            rawInput,
            cleanNationalDigits: '',
            e164Formatted: '',
            displayFormatted: '',
            errorCode: 'EMPTY',
            errorMessage: 'Telephone number is required for majordomo dispatch.',
        };
    }

    // Check 2: Strip calling code if user entered it
    const rawCallingDigits = plan.callingCode.replace('+', '');
    if (digits.startsWith(rawCallingDigits) && digits.length > plan.maxLen) {
        digits = digits.slice(rawCallingDigits.length);
    }

    // Check 3: Strip national trunk '0'
    const nationalDigits = stripTrunk(digits, plan.iso);
    const length = nationalDigits.length;

    // Check 4: Length bounds
    if (length < plan.minLen) {
        const expected = plan.minLen === plan.maxLen ? `${plan.minLen} digits` : `${plan.minLen}–${plan.maxLen} digits`;
        return {
            isValid: false,
            countryIso: plan.iso,
            countryName: plan.name,
            callingCode: plan.callingCode,
            rawInput,
            cleanNationalDigits: nationalDigits,
            e164Formatted: `${plan.callingCode} ${nationalDigits}`,
            displayFormatted: `${plan.callingCode} ${nationalDigits}`,
            errorCode: 'TOO_SHORT',
            errorMessage: `Incomplete telephone number for ${plan.name}. Requires at least ${expected} (entered ${length}).`,
        };
    }

    if (length > plan.maxLen) {
        return {
            isValid: false,
            countryIso: plan.iso,
            countryName: plan.name,
            callingCode: plan.callingCode,
            rawInput,
            cleanNationalDigits: nationalDigits,
            e164Formatted: `${plan.callingCode} ${nationalDigits}`,
            displayFormatted: `${plan.callingCode} ${nationalDigits}`,
            errorCode: 'TOO_LONG',
            errorMessage: `Telephone number exceeds maximum national length of ${plan.maxLen} digits for ${plan.name} (entered ${length}).`,
        };
    }

    // Check 5: Non-zero starting digit
    if (nationalDigits.startsWith('0') && plan.iso !== 'IT') {
        return {
            isValid: false,
            countryIso: plan.iso,
            countryName: plan.name,
            callingCode: plan.callingCode,
            rawInput,
            cleanNationalDigits: nationalDigits,
            e164Formatted: `${plan.callingCode} ${nationalDigits}`,
            displayFormatted: `${plan.callingCode} ${nationalDigits}`,
            errorCode: 'INVALID_STARTING_DIGIT',
            errorMessage: `Invalid starting digit for ${plan.name}. National phone numbers cannot begin with 0.`,
        };
    }

    // Check 6: Strict national prefix regex
    const matchesPrefix = plan.strictRegex.test(nationalDigits);
    if (!matchesPrefix) {
        return {
            isValid: false,
            countryIso: plan.iso,
            countryName: plan.name,
            callingCode: plan.callingCode,
            rawInput,
            cleanNationalDigits: nationalDigits,
            e164Formatted: `${plan.callingCode} ${nationalDigits}`,
            displayFormatted: `${plan.callingCode} ${nationalDigits}`,
            errorCode: 'INVALID_PREFIX_STRUCTURE',
            errorMessage: `Invalid mobile/geographic prefix for ${plan.name}. Expected format: ${plan.mask} (e.g. ${plan.example}).`,
        };
    }

    const formattedLocal = plan.format(nationalDigits);
    return {
        isValid: true,
        countryIso: plan.iso,
        countryName: plan.name,
        callingCode: plan.callingCode,
        rawInput,
        cleanNationalDigits: nationalDigits,
        e164Formatted: `${plan.callingCode} ${nationalDigits}`,
        displayFormatted: `${plan.callingCode} ${formattedLocal}`,
    };
}

export function formatToInternationalE164(
    rawPhone: string,
    countryIso: CountryIso2 | string = 'GB'
): string {
    const res = validatePhoneNumberStrict(rawPhone, countryIso);
    return res.displayFormatted || `${res.callingCode} ${res.cleanNationalDigits}`.trim();
}
