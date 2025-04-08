'use client';

// app/page.tsx (temporary debug page)
import { headers } from 'next/headers';

export default function DebugPage() {
  const headerList = headers();
  const userAgent = headerList.get('user-agent') || '';
  const isMobile = /Mobile|Android|iP(hone|od)|IEMobile/.test(userAgent);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Middleware Debug</h1>
      <div className="mt-4 space-y-2">
        <p>
          <strong>User Agent:</strong> {userAgent}
        </p>
        <p>
          <strong>Device Type:</strong> {isMobile ? 'Mobile' : 'Desktop'}
        </p>
        <p>
          <strong>Middleware Working:</strong>{' '}
          {isMobile ? 'Should show /mobile' : 'Should show /desktop'}
        </p>
      </div>
    </div>
  );
}
