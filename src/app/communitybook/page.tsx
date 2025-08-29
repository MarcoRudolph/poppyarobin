import CommunitybookClient from '../../components/CommunitybookClient';

// Force dynamic rendering to prevent build-time database access
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Fallback data for when database is not available
const fallbackThemen = [
  {
    id: 1,
    name: 'Romantasy',
    vorschlaege: [
      {
        id: 1,
        themaId: 1,
        ueberschrift: 'Willkommen bei Poppy & Robin',
        text: 'Lade Inhalte...',
        likes: 0,
        comments: 0,
        userId: 1,
        createdAt: new Date(),
        userName: 'Poppy & Robin' as string | null,
      },
    ],
  },
];

export default async function CommunitybookPage() {
  let themenWithVorschlaege = fallbackThemen;

  try {
    console.log('=== COMMUNITYBOOK DEBUG START ===');
    console.log('Environment check:');
    console.log('- DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('- POSTGRES_URL exists:', !!process.env.POSTGRES_URL);
    console.log(
      '- NEXT_PUBLIC_SUPABASE_URL exists:',
      !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    );
    console.log(
      '- NEXT_PUBLIC_SUPABASE_ANON_KEY exists:',
      !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );

    if (process.env.DATABASE_URL) {
      console.log(
        '- DATABASE_URL starts with:',
        process.env.DATABASE_URL.substring(0, 20) + '...',
      );
    }

    console.log('Loading communitybook data...');

    // Only import database modules when needed (runtime)
    const { fetchThemenList, getVorschlaegeByThemaWithUser } = await import(
      '../../drizzle/actions'
    );

    console.log('Database modules imported successfully');
    console.log('Fetching themen list...');

    const themenList = await fetchThemenList();
    console.log('Themen found:', themenList.length);
    console.log('Themen data:', themenList);

    if (themenList.length > 0) {
      console.log('Loading vorschlaege for each thema...');
      themenWithVorschlaege = await Promise.all(
        themenList.map(async (thema) => {
          const vorschlaege = await getVorschlaegeByThemaWithUser(thema.id);
          return { ...thema, vorschlaege };
        }),
      );
      console.log('Successfully loaded data from database');
    } else {
      console.log(
        'No themen found in database - database needs to be seeded manually',
      );
      console.log('Use the seed script or manually populate the database');
    }

    console.log('Final themenWithVorschlaege:', themenWithVorschlaege.length);
    console.log('=== COMMUNITYBOOK DEBUG END ===');
  } catch (error) {
    console.error('=== COMMUNITYBOOK ERROR ===');
    console.error('Error loading communitybook data:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : 'No stack trace',
    });
    console.log('Using fallback data due to database error');
    console.log('Check your database connection and ensure tables exist');
    console.log('=== COMMUNITYBOOK ERROR END ===');
  }

  return <CommunitybookClient themenList={themenWithVorschlaege} />;
}
