import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../drizzle';
import { userLikes, commentLikes, users } from '../../../../drizzle/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { userEmail, userId: googleUserId, token } = body;

    let dbUserId: number;

    // Check if we have Google OAuth user or Magic Link token
    if (googleUserId && userEmail) {
      // Google OAuth user - find user in our database
      const user = await db
        .select()
        .from(users)
        .where(eq(users.email, userEmail))
        .limit(1);

      if (user.length === 0) {
        return NextResponse.json(
          { error: 'Benutzer nicht gefunden' },
          { status: 404 },
        );
      }
      dbUserId = user[0].id;
    } else if (token) {
      // Magic Link user - find user by token
      const user = await db
        .select()
        .from(users)
        .where(eq(users.token, token))
        .limit(1);

      if (user.length === 0) {
        return NextResponse.json(
          { error: 'Nicht authentifiziert' },
          { status: 401 },
        );
      }
      dbUserId = user[0].id;
    } else {
      return NextResponse.json(
        { error: 'Authentifizierung erforderlich' },
        { status: 401 },
      );
    }

    // Delete all likes from this user (both vorschlag likes and comment likes)
    await db.delete(userLikes).where(eq(userLikes.userId, dbUserId));

    await db.delete(commentLikes).where(eq(commentLikes.userId, dbUserId));

    return NextResponse.json(
      {
        success: true,
        message: 'Alle Likes wurden gelöscht',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting likes:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 },
    );
  }
}
