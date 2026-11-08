// 'use server';

// import { revalidatePath } from 'next/cache';
// import { PillowType, AromaBlend, TurndownTea, SoakingSalts } from '../types';
// import { prisma } from'../../config/prisma'


// // ============================================================================
// // RESPONSE & PAYLOAD CONTRACTS
// // ============================================================================

// export interface ActionResponse<T = unknown> {
//     success: boolean;
//     data?: T;
//     error?: string;
// }

// export interface UpdateSleepTemperaturePayload {
//     userId: string;
//     temperatureCelsius: number;
// }

// export interface ToggleCircadianAutomationPayload {
//     userId: string;
//     automationKey: 'motorizedBlackoutLouverActive' | 'amberDawnSequenceActive';
//     enabled: boolean;
// }

// export interface UpdatePillowEnsemblePayload {
//     userId: string;
//     pillowLeft: PillowType;
//     pillowRight: PillowType;
// }

// export interface UpdateOlfactoryAromaPayload {
//     userId: string;
//     aromaBlend: AromaBlend;
//     aromaIntensityPercent?: number;
//     atomizationProtocolActive?: boolean;
// }

// export interface UpdateEpicureanProvisionPayload {
//     userId: string;
//     itemId: 'arrival-vintage-ornellaia' | 'awakening-barista' | 'hydration-library';
//     customizedInstruction: string;
// }

// export interface UpdateTurndownRitualsPayload {
//     userId: string;
//     turndownHerbalTea: TurndownTea;
//     preferredSoakingSalts: SoakingSalts;
// }

// // ============================================================================
// // 1. SLEEP TEMPERATURE MUTATION ACTION
// // ============================================================================

// /**
//  * Persists the patron's ideal nocturnal sleep ambient temperature in PostgreSQL.
//  * Constrained between 16.0°C and 24.0°C to match subterranean geothermal coils.
//  */
// export async function updateSleepTemperatureAction(
//     payload: UpdateSleepTemperaturePayload
// ): Promise<ActionResponse<{ temperatureCelsius: number }>> {
//     try {
//         const { userId, temperatureCelsius } = payload;

//         if (!userId || typeof userId !== 'string') {
//             return { success: false, error: 'A valid patron identifier is required.' };
//         }

//         // Clamp & round to single decimal precision
//         const roundedTemp = Math.round(temperatureCelsius * 10) / 10;
//         if (roundedTemp < 16.0 || roundedTemp > 24.0) {
//             return {
//                 success: false,
//                 error: 'Temperature must be calibrated between 16.0°C and 24.0°C.',
//             };
//         }

//         const updatedProfile = await prisma.guestProfile.update({
//             where: { userId },
//             data: {
//                 idealRoomTemperatureCelsius: roundedTemp,
//             },
//             select: {
//                 idealRoomTemperatureCelsius: true,
//             },
//         });

//         revalidatePath('/profile');
//         return {
//             success: true,
//             data: { temperatureCelsius: updatedProfile.idealRoomTemperatureCelsius },
//         };
//     } catch (error) {
//         console.error('Failed to persist sleep temperature to PostgreSQL:', error);
//         return {
//             success: false,
//             error: 'Failed to synchronize geothermal climate with sanctuary ledger.',
//         };
//     }
// }

// // ============================================================================
// // 2. CIRCADIAN AUTOMATION TOGGLE ACTION
// // ============================================================================

// /**
//  * Toggles automated stone blackout louvers or the 1800K amber dawn progression.
//  */
// export async function toggleCircadianAutomationAction(
//     payload: ToggleCircadianAutomationPayload
// ): Promise<ActionResponse<{ automationKey: string; enabled: boolean }>> {
//     try {
//         const { userId, automationKey, enabled } = payload;

//         if (!userId || !automationKey) {
//             return { success: false, error: 'Patron ID and automation key are required.' };
//         }

//         const allowedKeys = ['motorizedBlackoutLouverActive', 'amberDawnSequenceActive'];
//         if (!allowedKeys.includes(automationKey)) {
//             return { success: false, error: 'Invalid circadian automation key specified.' };
//         }

//         const updatedProfile = await prisma.guestProfile.update({
//             where: { userId },
//             data: {
//                 [automationKey]: enabled,
//             },
//             select: {
//                 [automationKey]: true,
//             },
//         });

//         revalidatePath('/profile');
//         return {
//             success: true,
//             data: {
//                 automationKey,
//                 enabled: Boolean(updatedProfile[automationKey]),
//             },
//         };
//     } catch (error) {
//         console.error('Failed to toggle circadian automation in PostgreSQL:', error);
//         return {
//             success: false,
//             error: 'Failed to write circadian protocol state to patron profile.',
//         };
//     }
// }

// // ============================================================================
// // 3. PILLOW ENSEMBLE SPECIFICATION ACTION
// // ============================================================================

// /**
//  * Updates left and right chamber pillow allocations for Elena Rossi & housekeeping.
//  */
// export async function updatePillowEnsembleAction(
//     payload: UpdatePillowEnsemblePayload
// ): Promise<ActionResponse<{ pillowLeft: PillowType; pillowRight: PillowType }>> {
//     try {
//         const { userId, pillowLeft, pillowRight } = payload;

//         if (!userId) {
//             return { success: false, error: 'Patron identifier is required.' };
//         }

//         const updatedProfile = await prisma.guestProfile.update({
//             where: { userId },
//             data: {
//                 preferredPillowLeft: pillowLeft,
//                 preferredPillowRight: pillowRight,
//             },
//             select: {
//                 preferredPillowLeft: true,
//                 preferredPillowRight: true,
//             },
//         });

//         revalidatePath('/profile');
//         return {
//             success: true,
//             data: {
//                 pillowLeft: updatedProfile.preferredPillowLeft,
//                 pillowRight: updatedProfile.preferredPillowRight,
//             },
//         };
//     } catch (error) {
//         console.error('Failed to update pillow ensemble in PostgreSQL:', error);
//         return {
//             success: false,
//             error: 'Failed to stage pillow ensemble in housekeeping docket.',
//         };
//     }
// }

// // ============================================================================
// // 4. OLFACTORY ATELIER AROMA ACTION
// // ============================================================================

// /**
//  * Calibrates pre-arrival cold atomization diffusers with botanicals.
//  */
// export async function updateOlfactoryAromaAction(
//     payload: UpdateOlfactoryAromaPayload
// ): Promise<ActionResponse<{ aromaBlend: AromaBlend; aromaIntensityPercent: number }>> {
//     try {
//         const { userId, aromaBlend, aromaIntensityPercent = 25, atomizationProtocolActive = true } = payload;

//         if (!userId) {
//             return { success: false, error: 'Patron identifier is required.' };
//         }

//         const clampedIntensity = Math.min(Math.max(aromaIntensityPercent, 10), 100);

//         const updatedProfile = await prisma.guestProfile.update({
//             where: { userId },
//             data: {
//                 roomAromaBlend: aromaBlend,
//                 aromaIntensityPercent: clampedIntensity,
//                 atomizationProtocolActive,
//             },
//             select: {
//                 roomAromaBlend: true,
//                 aromaIntensityPercent: true,
//             },
//         });

//         revalidatePath('/profile');
//         return {
//             success: true,
//             data: {
//                 aromaBlend: updatedProfile.roomAromaBlend,
//                 aromaIntensityPercent: updatedProfile.aromaIntensityPercent,
//             },
//         };
//     } catch (error) {
//         console.error('Failed to calibrate room olfactory blend in PostgreSQL:', error);
//         return {
//             success: false,
//             error: 'Apothecary dispensary synchronization failed.',
//         };
//     }
// }

// // ============================================================================
// // 5. EPICUREAN & SOMMELIER STAGING ACTION
// // ============================================================================

// /**
//  * Updates pre-arrival cellar allocations or private loggia barista rituals.
//  */
// export async function updateEpicureanProvisionAction(
//     payload: UpdateEpicureanProvisionPayload
// ): Promise<ActionResponse<{ itemId: string; customizedInstruction: string }>> {
//     try {
//         const { userId, itemId, customizedInstruction } = payload;

//         if (!userId || !itemId) {
//             return { success: false, error: 'Patron ID and provision ID are required.' };
//         }

//         const trimmed = customizedInstruction.trim();
//         if (trimmed.length === 0 || trimmed.length > 250) {
//             return {
//                 success: false,
//                 error: 'Instruction specification must be between 1 and 250 characters.',
//             };
//         }

//         let updateData: Record<string, string> = {};

//         if (itemId === 'arrival-vintage-ornellaia') {
//             updateData = { preferredChampagneOrCru: trimmed };
//         } else if (itemId === 'awakening-barista') {
//             updateData = { morningBaristaRitual: trimmed };
//         } else if (itemId === 'hydration-library') {
//             updateData = { arrivalMineralWater: trimmed };
//         } else {
//             return { success: false, error: 'Unrecognized epicurean provision identifier.' };
//         }

//         await prisma.guestProfile.update({
//             where: { userId },
//             data: updateData,
//         });

//         revalidatePath('/profile');
//         return {
//             success: true,
//             data: { itemId, customizedInstruction: trimmed },
//         };
//     } catch (error) {
//         console.error('Failed to dispatch epicurean provision to PostgreSQL:', error);
//         return {
//             success: false,
//             error: 'Failed to record sommelier docket in subterranean cellar ledger.',
//         };
//     }
// }

// // ============================================================================
// // 6. TURNDOWN TEA & BATH SALTS ACTION
// // ============================================================================

// /**
//  * Updates herbal infusions and thermal soaking mineral salts.
//  */
// export async function updateTurndownRitualsAction(
//     payload: UpdateTurndownRitualsPayload
// ): Promise<ActionResponse<{ tea: TurndownTea; salts: SoakingSalts }>> {
//     try {
//         const { userId, turndownHerbalTea, preferredSoakingSalts } = payload;

//         if (!userId) {
//             return { success: false, error: 'Patron identifier is required.' };
//         }

//         const updatedProfile = await prisma.guestProfile.update({
//             where: { userId },
//             data: {
//                 turndownHerbalTea,
//                 preferredSoakingSalts,
//             },
//             select: {
//                 turndownHerbalTea: true,
//                 preferredSoakingSalts: true,
//             },
//         });

//         revalidatePath('/profile');
//         return {
//             success: true,
//             data: {
//                 tea: updatedProfile.turndownHerbalTea,
//                 salts: updatedProfile.preferredSoakingSalts,
//             },
//         };
//     } catch (error) {
//         console.error('Failed to update turndown rituals in PostgreSQL:', error);
//         return {
//             success: false,
//             error: 'Turndown ritual preparation failed to register.',
//         };
//     }
// }
