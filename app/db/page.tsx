import { prisma } from '@/lib/config/prisma';
import { connection } from 'next/server';

export default async function Page() {
  await connection();

  try {
    const accommodations =
      await prisma.guestProfile.findUnique({
		where: {
			id: 'prof-alexander-0402'
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

    return (
      <pre>
        {JSON.stringify(accommodations, null, 2)}
      </pre>
    );
  } catch (error) {
    console.error('Prisma diagnostic error:', error);

    return (
      <pre>
        {error instanceof Error
          ? error.message
          : String(error)}
      </pre>
    );
  }
}