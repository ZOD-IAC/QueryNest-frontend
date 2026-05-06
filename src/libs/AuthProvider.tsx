// src/providers/AuthProvider.tsx
'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '@/features/authslice';
import { GET } from '@/utils/api';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            dispatch(setLoading(true));
            try {
                const data = await GET('/user/me');
                dispatch(setUser({ user: data.ok ? data.user : null }));
            } catch {
                dispatch(setUser({ user: null }));
            }
        };
        checkAuth();
    }, []);

    return <>{children}</>;
}