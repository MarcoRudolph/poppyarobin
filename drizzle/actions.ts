"use server"

import { db } from "@/drizzle";
import { themen,
  users,
  kommentare,
  commentLikes, } from "@/drizzle/schema";
import { userLikes, vorschlaege } from "@/drizzle/schema";
import { eq, and, sql } from "drizzle-orm";
import { CommentType } from "@/util/types"; // Adjust the import path
import { asc, desc } from "drizzle-orm";

export async function fetchThemenList() {
  const themenList = await db.select().from(themen);
  return themenList;
}

export async function getVorschlaegeByThema(themaId: number) {
  const result = await db
    .select()
    .from(vorschlaege)
    .where(eq(vorschlaege.themaId, themaId));
  return result;
}

export async function checkIfUserLiked(userId: number, vorschlagId: number) {
  const result = await db
    .select()
    .from(userLikes)
    .where(
      and(eq(userLikes.userId, userId), eq(userLikes.vorschlagId, vorschlagId)),
    );
  return result.length > 0;
}

export async function addLike(userId: number, vorschlagId: number) {
  await db.insert(userLikes).values({
    userId,
    vorschlagId,
  });

  await db
    .update(vorschlaege)
    .set({ likes: sql`${vorschlaege.likes} + 1` })
    .where(eq(vorschlaege.id, vorschlagId));
}

export async function removeLike(userId: number, vorschlagId: number) {
  await db
    .delete(userLikes)
    .where(
      and(eq(userLikes.userId, userId), eq(userLikes.vorschlagId, vorschlagId)),
    );

  await db
    .update(vorschlaege)
    .set({ likes: sql`${vorschlaege.likes} - 1` })
    .where(eq(vorschlaege.id, vorschlagId));
}

// Fetch comments for a given Vorschlag ID
export async function fetchComments(
  vorschlagId: number
): Promise<CommentType[]> {
  const comments = await db
    .select({
      id: kommentare.id,
      vorschlagId: kommentare.vorschlagId,
      userId: kommentare.userId,
      text: kommentare.text,
      likes: kommentare.likes,
      userName: users.name,
      userImage: users.image,
    })
    .from(kommentare)
    .leftJoin(users, eq(kommentare.userId, users.id))
    .where(eq(kommentare.vorschlagId, vorschlagId))
    .orderBy(asc(kommentare.id));

  return comments;
}

// Check if a user has liked a comment
export async function checkIfUserLikedComment(
  userId: number,
  commentId: number
): Promise<boolean> {
  const like = await db
    .select()
    .from(commentLikes)
    .where(
      and(
        eq(commentLikes.userId, userId),
        eq(commentLikes.commentId, commentId)
      )
    )
    .limit(1);

  return like.length > 0;
}

// Add a like to a comment
export async function addLikeToComment(
  userId: number,
  commentId: number
): Promise<void> {
  await db.transaction(async (trx) => {
    // Insert into commentLikes
    await trx.insert(commentLikes).values({
      userId,
      commentId,
    });

    // Increment the likes count
    await trx
      .update(kommentare)
      .set({ likes: sql`${kommentare.likes} + 1` })
      .where(eq(kommentare.id, commentId));
  });
}

// Remove a like from a comment
export async function removeLikeFromComment(
  userId: number,
  commentId: number
): Promise<void> {
  await db.transaction(async (trx) => {
    // Delete from commentLikes
    await trx
      .delete(commentLikes)
      .where(
        and(
          eq(commentLikes.userId, userId),
          eq(commentLikes.commentId, commentId)
        )
      );

    // Decrement the likes count safely
    await trx
      .update(kommentare)
      .set({
        likes: sql`CASE WHEN ${kommentare.likes} > 0 THEN ${kommentare.likes} - 1 ELSE 0 END`,
      })
      .where(eq(kommentare.id, commentId));
  });
}