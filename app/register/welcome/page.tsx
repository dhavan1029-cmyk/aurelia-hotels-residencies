import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/config/prisma';
import { getAuthenticatedUser } from '@/lib/hotel/actions/auth';
import mapToInscriptionWelcomeData from '@/lib/hotel/mappers/inscriptionWelcomeMapper';
import InscriptionWelcomePage from '@/components/pages/hotel/WelcomePage';
// import { mapToInscriptionWelcomeData } from '@/lib/mappers/inscriptionWelcomeMapper';
// import { InscriptionWelcomePage } from '@/components/hotel/auth/welcome/InscriptionWelcomePage';

interface WelcomePageProps {
    searchParams: Promise<{
        folio?: string;
    }>;
}

/**
 * RegisterWelcomePage (Server Component)
 * Route: /register/welcome?folio=AUR-XXXX-S
 */
export default async function RegisterWelcomePage({ searchParams }: WelcomePageProps) {
    const { folio } = await searchParams;

    // 1. Resolve currently authenticated user session
    const sessionUser = await getAuthenticatedUser();

    // 2. Fetch User with relational GuestProfile and StaffMember (with relational Sanctuary)
    const user = sessionUser
        ? await prisma.user.findUnique({
              where: { id: sessionUser.id },
              include: {
                  profile: true,
                  primaryMajordomo: {
                      include: {
                          sanctuary: {
                              select: {
                                  name: true,
                              },
                          },
                      },
                  },
              },
          })
        : folio
        ? await prisma.user.findFirst({
              where: { sovereignKeyNumber: folio },
              include: {
                  profile: true,
                  primaryMajordomo: {
                      include: {
                          sanctuary: {
                              select: {
                                  name: true,
                              },
                          },
                      },
                  },
              },
          })
        : null;

    // 3. Fallback protection if no user or folio matches
    if (!user) {
        // If unauthenticated and no valid folio query was provided, send to login
        redirect('/login');
    }

    // 4. Transform relational Prisma data via the mapper
    const welcomeData = mapToInscriptionWelcomeData(user, {
        folioOverride: folio,
    });

    // 5. Render the decoupled master assembly
    return <InscriptionWelcomePage data={welcomeData} />;
}
