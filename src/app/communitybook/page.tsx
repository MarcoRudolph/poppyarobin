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
    // Import database modules when needed (runtime)
    const { fetchThemenList, getVorschlaegeByThemaWithUser } = await import(
      '../../drizzle/actions'
    );

    const themenList = await fetchThemenList();

    if (themenList.length > 0) {
      themenWithVorschlaege = await Promise.all(
        themenList.map(async (thema) => {
          const vorschlaege = await getVorschlaegeByThemaWithUser(thema.id);
          return { ...thema, vorschlaege };
        }),
      );
    }
  } catch (error) {
    console.error('Error loading communitybook data:', error);
  }

  return <CommunitybookClient themenList={themenWithVorschlaege} />;
}
