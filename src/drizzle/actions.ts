'use server';

import { db } from '../drizzle';
import { themen, users, kommentare, commentLikes } from '../drizzle/schema';
import { userLikes, vorschlaege } from '../drizzle/schema';
import { eq, and, sql } from 'drizzle-orm';
import { CommentType } from '../lib/types'; // Adjust the import path
import { asc, desc } from 'drizzle-orm';

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

export async function getVorschlaegeByThemaWithUser(themaId: number) {
  const result = await db
    .select({
      id: vorschlaege.id,
      themaId: vorschlaege.themaId,
      ueberschrift: vorschlaege.ueberschrift,
      text: vorschlaege.text,
      likes: vorschlaege.likes,
      comments: vorschlaege.comments,
      userId: vorschlaege.userId,
      createdAt: vorschlaege.createdAt,
      userName: users.name,
    })
    .from(vorschlaege)
    .leftJoin(users, eq(vorschlaege.userId, users.id))
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

// Updated version that handles session user IDs
export async function addLikeWithSession(
  sessionUserId: string,
  userName: string,
  vorschlagId: number,
) {
  const dbUserId = await ensureUserExists(sessionUserId, userName);
  await addLike(dbUserId, vorschlagId);
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

// Updated version that handles session user IDs
export async function removeLikeWithSession(
  sessionUserId: string,
  userName: string,
  vorschlagId: number,
) {
  const dbUserId = await ensureUserExists(sessionUserId, userName);
  await removeLike(dbUserId, vorschlagId);
}

// Updated version that handles session user IDs
export async function checkIfUserLikedWithSession(
  sessionUserId: string,
  userName: string,
  vorschlagId: number,
): Promise<boolean> {
  const dbUserId = await ensureUserExists(sessionUserId, userName);
  return checkIfUserLiked(dbUserId, vorschlagId);
}

// Fetch comments for a given Vorschlag ID
export async function fetchComments(
  vorschlagId: number,
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
  commentId: number,
): Promise<boolean> {
  const like = await db
    .select()
    .from(commentLikes)
    .where(
      and(
        eq(commentLikes.userId, userId),
        eq(commentLikes.commentId, commentId),
      ),
    )
    .limit(1);

  return like.length > 0;
}

// Add a like to a comment
export async function addLikeToComment(
  userId: number,
  commentId: number,
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
  commentId: number,
): Promise<void> {
  await db.transaction(async (trx) => {
    // Delete from commentLikes
    await trx
      .delete(commentLikes)
      .where(
        and(
          eq(commentLikes.userId, userId),
          eq(commentLikes.commentId, commentId),
        ),
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

// Create a new contribution (vorschlag)
export async function createContribution(
  themaId: number,
  title: string,
  content: string,
  userId: number,
): Promise<number> {
  const result = await db
    .insert(vorschlaege)
    .values({
      themaId,
      ueberschrift: title,
      text: content,
      likes: 0,
      comments: 0,
      userId, // Add the missing userId field
    })
    .returning({ id: vorschlaege.id });

  return result[0].id;
}

// Create a new comment
export async function createComment(
  vorschlagId: number,
  text: string,
  userId: number,
): Promise<number> {
  const result = await db
    .insert(kommentare)
    .values({
      vorschlagId,
      userId,
      text,
      likes: 0,
    })
    .returning({ id: kommentare.id });

  // Update comment count on vorschlag
  await db
    .update(vorschlaege)
    .set({ comments: sql`${vorschlaege.comments} + 1` })
    .where(eq(vorschlaege.id, vorschlagId));

  return result[0].id;
}

// Get current like count for a user on a vorschlag (for like limit tracking)
export async function getCurrentLikeCount(
  userId: number,
  vorschlagId: number,
): Promise<number> {
  const result = await db
    .select()
    .from(userLikes)
    .where(
      and(eq(userLikes.userId, userId), eq(userLikes.vorschlagId, vorschlagId)),
    );

  return result.length;
}

// Get current like count for a user on a comment (for like limit tracking)
export async function getCurrentCommentLikeCount(
  userId: number,
  commentId: number,
): Promise<number> {
  const result = await db
    .select()
    .from(commentLikes)
    .where(
      and(
        eq(commentLikes.userId, userId),
        eq(commentLikes.commentId, commentId),
      ),
    );

  return result.length;
}

// Hole die aktuelle Like-Anzahl eines Vorschlags
export async function getVorschlagLikes(vorschlagId: number): Promise<number> {
  const result = await db
    .select({ likes: vorschlaege.likes })
    .from(vorschlaege)
    .where(eq(vorschlaege.id, vorschlagId))
    .limit(1);
  return result.length > 0 ? result[0].likes : 0;
}

// Hole die aktuelle Kommentar-Anzahl eines Vorschlags
export async function getVorschlagCommentsCount(
  vorschlagId: number,
): Promise<number> {
  const result = await db
    .select()
    .from(kommentare)
    .where(eq(kommentare.vorschlagId, vorschlagId));
  return result.length;
}

// Update ensureUserExists to work with tokens
export async function ensureUserExists(
  sessionUserId: string,
  userName: string,
): Promise<number> {
  // First, try to find existing user by session ID (which is now the token)
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.token, sessionUserId))
    .limit(1);

  if (existingUser.length > 0) {
    return existingUser[0].id;
  }

  // If user doesn't exist, create new user
  const newUser = await db
    .insert(users)
    .values({
      name: userName,
      email: null,
      token: sessionUserId,
      image: null,
    })
    .returning({ id: users.id });

  return newUser[0].id;
}

// Session-aware comment like functions
export async function addLikeToCommentWithSession(
  sessionUserId: string,
  userName: string,
  commentId: number,
): Promise<void> {
  const dbUserId = await ensureUserExists(sessionUserId, userName);
  await addLikeToComment(dbUserId, commentId);
}

export async function removeLikeFromCommentWithSession(
  sessionUserId: string,
  userName: string,
  commentId: number,
): Promise<void> {
  const dbUserId = await ensureUserExists(sessionUserId, userName);
  await removeLikeFromComment(dbUserId, commentId);
}

export async function checkIfUserLikedCommentWithSession(
  sessionUserId: string,
  userName: string,
  commentId: number,
): Promise<boolean> {
  const dbUserId = await ensureUserExists(sessionUserId, userName);
  return checkIfUserLikedComment(dbUserId, commentId);
}

export async function createCommentWithSession(
  vorschlagId: number,
  text: string,
  sessionUserId: string,
  userName: string,
): Promise<number> {
  const dbUserId = await ensureUserExists(sessionUserId, userName);
  return createComment(vorschlagId, text, dbUserId);
}
