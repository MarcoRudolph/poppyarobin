import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../drizzle';
import { users } from '../../../../drizzle/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    // Find user by token
    const user = await db
      .select()
      .from(users)
      .where(eq(users.token, token))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user[0].id,
        name: user[0].name,
        token: user[0].token,
      },
    });
  } catch (error) {
    console.error('Token validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
