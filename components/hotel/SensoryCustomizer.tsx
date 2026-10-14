'use client'

import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export interface SensoryPreferencesState {
    pillowType: string;
    firmness: string;
    aromaBlend: string;
    circadianWakeHour: string;
    roomTemperature: number;
    soakingSalts: string;
}

export function SensoryCustomizer() {
    const [prefs, setPrefs] = useState<SensoryPreferencesState>({
        pillowType: 'ORGANIC_GOOSE_DOWN',
        firmness: 'PLUSH',
        aromaBlend: 'AMALFI_NEROLI_BERGAMOT',
        circadianWakeHour: '07:30',
        roomTemperature: 20.5,
        soakingSalts: 'SICILIAN_SEA_SALT_LAVENDER',
    });

    const [isSaved, setIsSaved] = useState(false);

    function handleSave() {
        setIsSaved(true);
        setTimeout(function () {
            setIsSaved(false);
        }, 3000);
    }

    return (
        <Card variant="bordered" padding="lg" className="bg-[#fcf9f4]">
            <div className="border-b border-[#e8e4dc] pb-6 mb-8">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8e763b] block">
                    Sovereign Profile Calibrations
                </span>

                <h2 className="font-serif text-2xl text-[#1f1e1d] mt-1">
                    In-Room Sensory Architecture
                </h2>

                <p className="text-xs text-[#6e6b64] font-sans mt-2 max-w-2xl leading-relaxed">
                    Calibrate your arrival atmosphere. Your majordomo will adjust circadian illumination, natural stone baths, and pillow firmness 2 hours prior to arrival.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pillow & Sleep */}
                <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-widest text-[#55524d] font-sans">
                        Pillow Formulation
                    </label>

                    <select
                        value={prefs.pillowType}
                        onChange={function (e) {
                            setPrefs({
                                ...prefs,
                                pillowType: e.target.value,
                            });
                        }}
                        className="w-full px-4 py-3 bg-white border border-[#dcdad5] text-xs font-sans text-[#1f1e1d] outline-none"
                    >
                        <option value="ORGANIC_GOOSE_DOWN">
                            Organic Hungarian Goose Down
                        </option>
                        <option value="HYPOALLERGENIC_MEMORY">
                            Hypoallergenic Memory Foam Core
                        </option>
                        <option value="SILK_LATEX">
                            Mulberry Silk & Natural Talalay Latex
                        </option>
                        <option value="BUCKWHEAT">
                            Organic Buckwheat Ergonomic Hull
                        </option>
                    </select>
                </div>

                {/* Aroma Diffuser */}
                <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-widest text-[#55524d] font-sans">
                        Signature Room Aroma
                    </label>

                    <select
                        value={prefs.aromaBlend}
                        onChange={function (e) {
                            setPrefs({
                                ...prefs,
                                aromaBlend: e.target.value,
                            });
                        }}
                        className="w-full px-4 py-3 bg-white border border-[#dcdad5] text-xs font-sans text-[#1f1e1d] outline-none"
                    >
                        <option value="AMALFI_NEROLI_BERGAMOT">
                            Amalfi Neroli, Bergamot & Sea Salt
                        </option>
                        <option value="TUSCAN_CYPRESS_CEDAR">
                            Tuscan Cypress, Smoked Cedar & Herb
                        </option>
                        <option value="ALPINE_JUNIPER">
                            Engadin Juniper & Wild Mint
                        </option>
                        <option value="UNSCENTED">
                            Pure Neutralized Ozone (Unscented)
                        </option>
                    </select>
                </div>

                {/* Circadian Dimming */}
                <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-widest text-[#55524d] font-sans">
                        Circadian Sunrise Awaken Hour
                    </label>

                    <input
                        type="time"
                        value={prefs.circadianWakeHour}
                        onChange={function (e) {
                            setPrefs({
                                ...prefs,
                                circadianWakeHour: e.target.value,
                            });
                        }}
                        className="w-full px-4 py-3 bg-white border border-[#dcdad5] text-xs font-sans text-[#1f1e1d] outline-none"
                    />
                </div>

                {/* Temperature */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <label className="text-[11px] uppercase tracking-widest text-[#55524d] font-sans">
                            Ambient Temperature
                        </label>

                        <span className="text-xs font-serif text-[#1f1e1d]">
                            {prefs.roomTemperature}°C
                        </span>
                    </div>

                    <input
                        type="range"
                        min="18"
                        max="24"
                        step="0.5"
                        value={prefs.roomTemperature}
                        onChange={function (e) {
                            setPrefs({
                                ...prefs,
                                roomTemperature: parseFloat(e.target.value),
                            });
                        }}
                        className="accent-[#1f1e1d] cursor-pointer mt-2"
                    />
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#e8e4dc] flex items-center justify-between">
                {isSaved ? (
                    <span className="text-xs text-[#24633b] uppercase tracking-wider font-sans">
                        ✓ Preferences synchronized to your majordomo folio
                    </span>
                ) : (
                    <span className="text-[11px] text-[#8e8a82] font-sans">
                        Active for all future Aurelia enclave bookings
                    </span>
                )}

                <Button
                    variant="primary"
                    size="md"
                    onClick={handleSave}
                >
                    Save Calibrations
                </Button>
            </div>
        </Card>
    );
}
