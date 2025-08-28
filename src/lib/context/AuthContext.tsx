'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  createClient,
  SupabaseClient,
  Session,
  User,
} from '@supabase/supabase-js';
import { SupabaseUser } from '../types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

interface SupabaseAuthContextType {
  user: SupabaseUser | null;
  isLoading: boolean;
  signInWithMagicLink: (email: string) => Promise<{ error: any } | void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const SupabaseAuthContext = createContext<SupabaseAuthContextType | undefined>(
  undefined,
);

export const SupabaseAuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({ id: session.user.id, email: session.user.email ?? null });
        } else {
          setUser(null);
        }
        setIsLoading(false);
      },
    );
    // Initial check
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUser({ id: data.user.id, email: data.user.email ?? null });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const signInWithMagicLink = async (email: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + '/communitybook',
        shouldCreateUser: true,
        // Magic link expiry is set in Supabase dashboard (default 1 week)
      },
    });
    setIsLoading(false);
    return { error };
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);

    try {
      // Determine redirect URL based on current location
      const isLocalhost = window.location.hostname.includes('localhost');
      const redirectUrl = isLocalhost
        ? 'http://localhost:3000/communitybook'
        : 'https://poppyarobin.de/communitybook';

      console.log('Starting Google OAuth with redirect:', redirectUrl);
      console.log('Current Supabase URL:', SUPABASE_URL);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        console.error('Google OAuth error:', error);
        throw error;
      }

      console.log('Google OAuth response:', data);

      // If we get here, the OAuth flow should have started
      // The user should be redirected to Google
    } catch (error) {
      console.error('Failed to start Google OAuth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setIsLoading(false);
  };

  return (
    <SupabaseAuthContext.Provider
      value={{
        user,
        isLoading,
        signInWithMagicLink,
        signInWithGoogle,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </SupabaseAuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  const context = useContext(SupabaseAuthContext);
  if (context === undefined) {
    throw new Error(
      'useSupabaseAuth must be used within a SupabaseAuthProvider',
    );
  }
  return context;
};
