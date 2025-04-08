// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const userAgent = request.headers.get('user-agent') || '';
  const isMobile = /Mobile|Android|iP(hone|od)|IEMobile/.test(userAgent);

  // Skip if already correct route
  if (
    url.pathname.startsWith('/mobile') ||
    url.pathname.startsWith('/desktop')
  ) {
    return NextResponse.next();
  }

  // Rewrite to device-specific route
  url.pathname = `/${isMobile ? 'mobile' : 'desktop'}${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
