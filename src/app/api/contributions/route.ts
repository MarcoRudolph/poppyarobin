import { NextRequest, NextResponse } from 'next/server';
import { createContribution } from '../../../drizzle/actions';
import { getServerSession } from 'next-auth';

export async function POST(request: NextRequest) {
  try {
    // Get the session to verify the user is authenticated
    const session = await getServerSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Nicht authentifiziert' },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { themaId, title, content } = body;

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

    const userId = parseInt(session.user.id, 10);

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
