'use client';

import { useState, useEffect } from 'react';
import { setToken, removeToken, isAuthenticated as checkAuth } from '../lib/auth';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setAuthenticated(checkAuth());
  }, []);

  const login = (token: string) => {
    setToken(token);
    setAuthenticated(true);
    router.push('/admin');
  };

  const logout = () => {
    removeToken();
    setAuthenticated(false);
    router.push('/login');
  };

  return { isAuthenticated: authenticated, login, logout };
};