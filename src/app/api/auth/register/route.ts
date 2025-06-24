import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../drizzle';
import { users } from '../../../../drizzle/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Generate a unique token
    const token = crypto.randomBytes(32).toString('hex');

    // Check if user with this name already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.name, name.trim()))
      .limit(1);

    let userId: number;
    let userToken: string;

    if (existingUser.length > 0) {
      // Update existing user's token
      const updatedUser = await db
        .update(users)
        .set({ token: token })
        .where(eq(users.id, existingUser[0].id))
        .returning({ id: users.id, token: users.token });

      userId = updatedUser[0].id;
      userToken = updatedUser[0].token!;
    } else {
      // Create new user
      const newUser = await db
        .insert(users)
        .values({
          name: name.trim(),
          email: null,
          token: token,
          image: null,
        })
        .returning({ id: users.id, token: users.token });

      userId = newUser[0].id;
      userToken = newUser[0].token!;
    }

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        name: name.trim(),
        token: userToken,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
