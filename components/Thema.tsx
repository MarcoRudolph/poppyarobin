// components/Thema.tsx
import React, { useEffect, useState } from "react";
import Vorschlag from "./Vorschlag";
import { VorschlagType } from "@/util/types";
import { db } from "../drizzle/";
import { vorschlaege } from "../drizzle/schema";
import { eq } from "drizzle-orm";

interface ThemaProps {
  themaId: number;
}

const Thema: React.FC<ThemaProps> = ({ themaId }) => {
  const [vorschlaegeList, setVorschlaegeList] = useState<VorschlagType[]>([]);

  useEffect(() => {
    const ladeVorschlaege = async () => {
      const result = await db
        .select()
        .from(vorschlaege)
        .where(eq(vorschlaege.themaId, themaId));

      setVorschlaegeList(result);
    };

    ladeVorschlaege();
  }, [themaId]);

  return (
    <div>
      {vorschlaegeList.map((v) => (
        <Vorschlag key={v.id} vorschlag={v} />
      ))}
    </div>
  );
};

export default Thema;
