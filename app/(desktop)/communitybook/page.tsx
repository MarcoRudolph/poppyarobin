import Communitybook from "@/components/Communitybook";
import { fetchThemenList, getVorschlaegeByThema } from "@/drizzle/actions";

export default async function CommunitybookPage() {
  // Fetch themen list
  const themenList = await fetchThemenList();

  // Fetch vorschlaege for each thema
  const themenWithVorschlaege = await Promise.all(
    themenList.map(async (thema) => {
      const vorschlaege = await getVorschlaegeByThema(thema.id);
      return { ...thema, vorschlaege };
    })
  );

  return <Communitybook themenList={themenWithVorschlaege} />;
}