import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../drizzle';
import { users } from '../../../../drizzle/schema';
import { eq } from 'drizzle-orm';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

const SMTP_USER = 'info@poppyarobin.de';
const SMTP_PASS = process.env.POPPY_POSTFACH_PW!;
const SMTP_HOST = 'smtp.strato.de';
const SMTP_PORT = 465;
const SMTP_SECURE = true;
const SENDER_NAME = 'Poppy a. Robin';
const SENDER_EMAIL = 'info@poppyarobin.de';

const MAGIC_LINK_EXPIRY_DAYS = 7;

// Determine base URL based on environment
// For local development, use the IP address from environment variable
// For production, always use the production domain
const getBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // If we have a custom base URL (like local IP), use it
  if (envUrl && envUrl !== 'https://poppyarobin.de') {
    return envUrl;
  }

  // Otherwise, always use production domain for magic links
  return 'https://poppyarobin.de';
};

const BASE_URL = getBaseUrl();

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'E-Mail ist erforderlich.' },
        { status: 400 },
      );
    }
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Name ist erforderlich.' },
        { status: 400 },
      );
    }

    // Generate token and expiry
    const token = uuidv4();
    const now = new Date();
    const expiresAt = new Date(
      now.getTime() + MAGIC_LINK_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
    );

    // Check if user exists
    let user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (user.length === 0) {
      // Create user
      await db.insert(users).values({
        name,
        email,
        token,
        image: null,
        createdAt: now,
      });
    } else {
      // Update token and name if changed
      const updateData: any = { token };
      if (user[0].name !== name) {
        updateData.name = name;
      }
      await db.update(users).set(updateData).where(eq(users.email, email));
    }

    // Send email
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Always use production domain for magic links, so they work on smartphones
    const magicLink = `${BASE_URL}/magic-login?token=${token}&email=${encodeURIComponent(email)}`;
    const mailOptions = {
      from: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
      to: email,
      subject: 'Dein Magic Login-Link für Poppy a. Robin',
      html: `
        <h2>Willkommen bei Poppy a. Robin!</h2>
        <p>Hallo,</p>
        <p>mit diesem <b>Magic Link</b> kannst du dich ganz einfach und sicher anmelden:</p>
        <p><a href="${magicLink}" style="background:#a259e6;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-size:18px;">Jetzt einloggen</a></p>
        <p>Der Link ist <b>7 Tage gültig</b> und kann nur einmal verwendet werden.</p>
        <p>Falls du den Link nicht angefordert hast, kannst du diese E-Mail ignorieren.</p>
        <br>
        <p>Viel Spaß und kreative Grüße,<br>Poppy a. Robin</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Magic Link Error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Senden des Magic Links.' },
      { status: 500 },
    );
  }
}
