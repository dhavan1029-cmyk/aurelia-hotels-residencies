import { ProfilePage } from '@/components/pages/hotel/ProfilePage';
import { getAuthenticatedUser } from '@/lib/hotel/actions/auth';
import { mapDossierHeaderData, mapProfileExtendedTabsData } from '@/lib/hotel/mappers/profileDossierMapper';
import { mapToProfileLogisticsData } from '@/lib/hotel/mappers/profileLogisticsMapper';
import { mapToProfileOlfactorySectionData } from '@/lib/hotel/mappers/profileOlfactoryMapper';
import { mapToProfileSleepAndEpicureanData } from '@/lib/hotel/mappers/profileSleepAndEpicureanMapper';
import { redirect } from 'next/navigation';

export const metadata = {
	title: 'Sovereign Patron Dossier & Sensory Calibrations | Aurelia Hotels & Residences',
	description:
		'Personal luxury sanctum for verified patrons. Pre-arrival IoT cold nebulization scent formulation, geothermal circadian sleep microclimate, and personal majordomo dispatch across all global sanctuaries.',
};

export default async function Page() {

	const userData = await getAuthenticatedUser()

	if (!userData) {
	    redirect('/login')
	}

	// const {dossier, logistics, olfactory, sleep} = mapProfileDatabaseRecord(userData)

	const dossier = mapDossierHeaderData(userData)
	const logistics = mapToProfileLogisticsData(userData)
	const olfactory = mapToProfileOlfactorySectionData(userData)
	const sleep = mapToProfileSleepAndEpicureanData(userData)
	const extendedTabsData = mapProfileExtendedTabsData(userData)

	return (
		<ProfilePage 
			dossierData={dossier}
			olfactoryData={olfactory}
			sleepData={sleep}
			logisticsData={logistics}
			extendedTabsData={extendedTabsData}
		/>
	);
}