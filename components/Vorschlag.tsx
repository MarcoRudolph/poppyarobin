// components/Vorschlag.tsx
import { VorschlagType } from "@/util/types";
import React, { useState, useEffect } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { db } from "../drizzle";
import { userLikes, vorschlaege } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";
import { useSession } from "next-auth/react";
import { sql } from "drizzle-orm";

interface VorschlagProps {
  vorschlag: VorschlagType;
}

const Vorschlag: React.FC<VorschlagProps> = ({ vorschlag }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(vorschlag.likes);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const checkIfLiked = async () => {
      if (userId) {
        const result = await db
          .select()
          .from(userLikes)
          .where(
            and(
              eq(userLikes.userId, userId),
              eq(userLikes.vorschlagId, vorschlag.id),
            ),
          );

        setLiked(result.length > 0);
      }
    };

    checkIfLiked();
  }, [userId, vorschlag.id]);

  const likeVorschlag = async () => {
    if (!userId) {
      alert("Bitte logge dich ein, um zu liken.");
      return;
    }

    if (liked) {
      // Like entfernen
      await db
        .delete(userLikes)
        .where(
          and(
            eq(userLikes.userId, userId),
            eq(userLikes.vorschlagId, vorschlag.id),
          ),
        );

      await db
        .update(vorschlaege)
        .set({ likes: sql`${vorschlaege.likes} - 1` })
        .where(eq(vorschlaege.id, vorschlag.id));

      setLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      // Like hinzufügen
      await db.insert(userLikes).values({
        userId,
        vorschlagId: vorschlag.id,
      });

      await db
        .update(vorschlaege)
        .set({ likes: sql`${vorschlaege.likes} + 1` })
        .where(eq(vorschlaege.id, vorschlag.id));

      setLiked(true);
      setLikeCount(likeCount + 1);
    }
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <div className="flex flex-row items-start justify-center">
          <p className="text-left text-2xl">
            {likeCount} Likes | {vorschlag.comments} Kommentare
          </p>
        </div>
        <div>
          <p className="text-left text-2xl">{vorschlag.text}</p>
        </div>
      </div>
      <div>
        <button className="text-4xl" onClick={likeVorschlag}>
          {liked ? <FcLike /> : <FcLikePlaceholder />}
        </button>
      </div>
    </div>
  );
};

export default Vorschlag;
