import { prisma } from '@/lib/prisma';
import { connection } from 'next/server';

export default async function Page() {
  await connection();

  try {
    const accommodations =
      await prisma.user.findMany({});

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