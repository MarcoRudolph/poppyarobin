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
import { useHydration } from '../../hooks/useHydration';

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
  const isHydrated = useHydration();

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
    if (!isHydrated) return { error: new Error('Not hydrated yet') };

    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://poppyarobin.de/communitybook',
        shouldCreateUser: true,
        // Magic link expiry is set in Supabase dashboard (default 1 week)
      },
    });
    setIsLoading(false);
    return { error };
  };

  const signInWithGoogle = async () => {
    if (!isHydrated) return;

    setIsLoading(true);

    try {
      // Get the current path to redirect back to the same page
      const currentPath =
        typeof window !== 'undefined'
          ? window.location.pathname
          : '/communitybook';

      // Use environment variable for local development, otherwise use production domain
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        ? process.env.NEXT_PUBLIC_BASE_URL
        : 'https://poppyarobin.de';

      const redirectUrl = `${baseUrl}${currentPath}`;

      console.log('Starting Google OAuth with redirect:', redirectUrl);
      console.log('Current path:', currentPath);
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
