'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const MAGIC_LINK_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

export default function MagicLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>(
    'pending',
  );
  const [message, setMessage] = useState<string>('');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Only process login after hydration is complete
    if (!isHydrated) return;

    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      setStatus('error');
      setMessage('Ungültiger Link. Bitte fordere einen neuen Magic Link an.');
      return;
    }

    try {
      // Store in localStorage with timestamp
      const now = Date.now();
      localStorage.setItem('magiclink_email', email);
      localStorage.setItem('magiclink_token', token);
      localStorage.setItem('magiclink_timestamp', now.toString());

      setStatus('success');
      setMessage('Login erfolgreich! Du wirst weitergeleitet...');

      setTimeout(() => {
        router.replace('/communitybook');
      }, 2000);
    } catch (error) {
      console.error('Error during magic login:', error);
      setStatus('error');
      setMessage('Fehler beim Login. Bitte versuche es erneut.');
    }
  }, [searchParams, router, isHydrated]);

  // Show loading state until hydration is complete
  if (!isHydrated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white rounded-xl shadow-lg p-8 mt-20">
          <h1 className="text-3xl font-bold mb-4">Magic Login</h1>
          <p>Lade...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8 mt-20">
        <h1 className="text-3xl font-bold mb-4">Magic Login</h1>
        {status === 'pending' && <p>Bitte warten...</p>}
        {status === 'success' && <p className="text-green-600">{message}</p>}
        {status === 'error' && <p className="text-red-600">{message}</p>}
      </div>
    </div>
  );
}
