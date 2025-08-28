import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../drizzle';
import { users } from '../../../../drizzle/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Token erforderlich.' }, { status: 400 });
  }
  const user = await db
    .select()
    .from(users)
    .where(eq(users.token, token))
    .limit(1);
  if (user.length === 0) {
    return NextResponse.json(
      { error: 'User nicht gefunden.' },
      { status: 404 },
    );
  }
  return NextResponse.json({ name: user[0].name });
}
