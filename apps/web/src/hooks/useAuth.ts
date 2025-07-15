import { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function getSession() {
      try {
        const session = await authClient.getSession();
        
        if (mounted) {
          if (session.data?.user) {
            setUser(session.data.user as User);
          } else {
            setUser(null);
          }
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          console.error('Failed to get session:', err);
          setError('Failed to load user session');
          setUser(null);
          setLoading(false);
        }
      }
    }

    getSession();

    return () => {
      mounted = false;
    };
  }, []);

  const signOut = async () => {
    try {
      await authClient.signOut();
      setUser(null);
    } catch (err) {
      console.error('Failed to sign out:', err);
      setError('Failed to sign out');
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await authClient.signIn.email({
        email,
        password,
      });
      
      if (result.data?.user) {
        setUser(result.data.user as User);
        return { success: true };
      } else {
        setError('Invalid credentials');
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign in failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });
      
      if (result.data?.user) {
        setUser(result.data.user as User);
        return { success: true };
      } else {
        setError('Registration failed');
        return { success: false, error: 'Registration failed' };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  };
}
