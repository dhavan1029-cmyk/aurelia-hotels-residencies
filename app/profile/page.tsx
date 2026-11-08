import { ProfilePage } from '@/components/pages/hotel/ProfilePage';
// import { mapProfileDatabaseRecord } from '@/lib/hotel/mappers/profileMapper';
import { prisma } from '@/lib/config/prisma'
import { mapDossierHeaderData } from '@/lib/hotel/mappers/profileDossierMapper';
import { mapToProfileLogisticsData } from '@/lib/hotel/mappers/profileLogisticsMapper';
import { mapToProfileOlfactorySectionData } from '@/lib/hotel/mappers/profileOlfactoryMapper';
import { mapToProfileSleepAndEpicureanData } from '@/lib/hotel/mappers/profileSleepAndEpicureanMapper';

export const metadata = {
	title: 'Sovereign Patron Dossier & Sensory Calibrations | Aurelia Hotels & Residences',
	description:
		'Personal luxury sanctum for verified patrons. Pre-arrival IoT cold nebulization scent formulation, geothermal circadian sleep microclimate, and personal majordomo dispatch across all global sanctuaries.',
};

export default async function Page() {

	const userData = await prisma.guestProfile.findUnique({
		where: {
			id: 'prof-claire-2210'
		}, 
    	include: {
        user: {
            include: {
                primaryMajordomo: true,
                bookings: {
                    include: {
                        sanctuary: true,
                        accommodationCategory: true,
                        roomUnit: true,
                        folio: true
                    }
                }
            }
        }
    }
	})

	if (!userData) {
	    throw new Error("Guest profile not found");
	}

	// const {dossier, logistics, olfactory, sleep} = mapProfileDatabaseRecord(userData)

	const dossier = mapDossierHeaderData(userData)
	const logistics = mapToProfileLogisticsData(userData)
	const olfactory = mapToProfileOlfactorySectionData(userData)
	const sleep = mapToProfileSleepAndEpicureanData(userData)

	return (
		<ProfilePage 
			dossierData={dossier}
			olfactoryData={olfactory}
			sleepData={sleep}
			logisticsData={logistics}
		/>
	);
}