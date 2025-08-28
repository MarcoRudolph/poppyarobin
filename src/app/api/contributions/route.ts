import { NextRequest, NextResponse } from 'next/server';
import { createContribution } from '../../../drizzle/actions';
import { db } from '../../../drizzle';
import { users } from '../../../drizzle/schema';
import { eq, and, gte } from 'drizzle-orm';
import { vorschlaege } from '../../../drizzle/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      themaId,
      title,
      content,
      token,
      userId: googleUserId,
      userEmail,
    } = body;

    let userId: number;

    // Check if we have Google OAuth user or Magic Link token
    if (googleUserId && userEmail) {
      // Google OAuth user - find or create user in our database
      let user = await db
        .select()
        .from(users)
        .where(eq(users.email, userEmail))
        .limit(1);

      if (user.length === 0) {
        // Create new user for Google OAuth
        const newUser = await db
          .insert(users)
          .values({
            email: userEmail,
            name: userEmail.split('@')[0], // Use email prefix as name
            token: googleUserId, // Use Google user ID as token
          })
          .returning();
        userId = newUser[0].id;
      } else {
        userId = user[0].id;
      }
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
      userId = user[0].id;
    } else {
      return NextResponse.json(
        { error: 'Authentifizierung erforderlich' },
        { status: 401 },
      );
    }

    // Validate input
    if (!themaId || !title || !content) {
      return NextResponse.json(
        { error: 'Alle Felder sind erforderlich' },
        { status: 400 },
      );
    }

    if (typeof themaId !== 'number' || themaId <= 0) {
      return NextResponse.json(
        { error: 'Ungültige Themen-ID' },
        { status: 400 },
      );
    }

    if (typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Titel ist erforderlich' },
        { status: 400 },
      );
    }

    if (typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Inhalt ist erforderlich' },
        { status: 400 },
      );
    }

    if (title.length > 100) {
      return NextResponse.json(
        { error: 'Titel darf maximal 100 Zeichen haben' },
        { status: 400 },
      );
    }

    if (content.length > 1000) {
      return NextResponse.json(
        { error: 'Inhalt darf maximal 1000 Zeichen haben' },
        { status: 400 },
      );
    }

    // Spam protection: Only 5 Vorschläge per user per day
    // For now, we'll rely on the client-side protection
    // TODO: Implement proper server-side date-based spam protection

    // Create the contribution
    const contributionId = await createContribution(
      themaId,
      title.trim(),
      content.trim(),
      userId,
    );

    return NextResponse.json(
      {
        success: true,
        contributionId,
        message: 'Beitrag erfolgreich erstellt',
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating contribution:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 },
    );
  }
}
