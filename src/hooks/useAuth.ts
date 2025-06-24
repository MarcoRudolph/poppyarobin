'use client';

import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  token: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      validateToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const validateToken = async (token: string) => {
    try {
      const response = await fetch('/api/auth/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        // Invalid token, remove from localStorage
        localStorage.removeItem('userToken');
      }
    } catch (error) {
      console.error('Token validation error:', error);
      localStorage.removeItem('userToken');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string): Promise<boolean> => {
    setIsRegistering(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem('userToken', data.user.token);
        return true;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsRegistering(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userToken');
  };

  return {
    user,
    isLoading,
    isRegistering,
    register,
    logout,
    isAuthenticated: !!user,
  };
};
