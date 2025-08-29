import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../drizzle';
import {
  vorschlaege,
  userLikes,
  commentLikes,
  kommentare,
  users,
} from '../../../../drizzle/schema';
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

    // Instead of deleting data, anonymize the user by setting username to "gelöschter user"
    // This preserves the content while removing personal identification

    // 1. Update the user's name to "gelöschter user"
    await db
      .update(users)
      .set({ name: 'gelöschter user' })
      .where(eq(users.id, dbUserId));

    // 2. Clear sensitive user data (email, token) but keep the user record
    await db
      .update(users)
      .set({
        email: null,
        token: null,
      })
      .where(eq(users.id, dbUserId));

    return NextResponse.json(
      {
        success: true,
        message:
          'Deine persönlichen Daten wurden gelöscht. Deine Beiträge bleiben anonym erhalten.',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting account:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 },
    );
  }
}
