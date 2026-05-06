// src/providers/AuthProvider.tsx
'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '@/features/authslice';
import { GET } from '@/utils/api';
import { BASE_URL } from '@/utils/Setting';

async function fetchWithRefresh(url: string): Promise<Response> {
  // First attempt
  let res = await fetch(url, { credentials: 'include' });

  // If 401, try to refresh the access token once
  if (res.status === 401) {
    const refreshRes = await fetch(`${BASE_URL}/user/api/refreshtoken`, {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshRes.ok) {
      // Retry original request with new access token cookie
      res = await fetch(url, { credentials: 'include' });
    }
    // If refresh failed, return the 401 as-is → will log out
  }

  return res;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setLoading(true));
      try {
        const res = await fetchWithRefresh(`${BASE_URL}/user/me`);

        if (res.ok) {
          const data = await res.json();
          dispatch(setUser({ user: data.user }));
        } else {
          // Refresh also failed — genuinely not logged in
          dispatch(setUser({ user: null }));
        }
      } catch {
        dispatch(setUser({ user: null }));
      }
    };

    checkAuth();
  }, []);

  return <>{children}</>;
}
