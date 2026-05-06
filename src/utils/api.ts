// src/lib/api.ts
import { BASE_URL } from './Setting';

let isRefreshing = false;
let failedQueue: Array<{ resolve: () => void; reject: (err: any) => void }> =
  [];

const processQueue = (error: any) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve()));
  failedQueue = [];
};

const forceLogout = async () => {
  const { store } = await import('@/libs/store');
  const { logout } = await import('@/features/authslice');
  store.dispatch(logout());
  window.location.href = '/login';
};

// Routes that should NEVER trigger silent refresh
const SKIP_REFRESH_ROUTES = ['/auth/refresh', '/auth/me', '/auth/login'];

export async function api(
  path: string,
  options: RequestInit & { _retry?: boolean } = {},
  body?: any,
) {
  const { _retry, ...fetchOptions } = options;
  const shouldSkipRefresh = SKIP_REFRESH_ROUTES.some((r) => path.includes(r));

  const res = await fetch(`${BASE_URL}${path}`, {
    ...fetchOptions,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // Silent refresh on 401 — but not for auth routes or retried requests
  if (res.status === 401 && !_retry && !shouldSkipRefresh) {
    if (isRefreshing) {
      await new Promise<void>((resolve, reject) =>
        failedQueue.push({ resolve, reject }),
      );
      return api(path, { ...options, _retry: true }, body);
    }

    isRefreshing = true;
    try {
      const refreshRes = await fetch(`${BASE_URL}/user/api/refreshtoken`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!refreshRes.ok) throw new Error('Refresh failed');

      processQueue(null);
      return api(path, { ...options, _retry: true }, body);
    } catch (err) {
      processQueue(err);
      await forceLogout();
      throw err;
    } finally {
      isRefreshing = false;
    }
  }

  try {
    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
}

export const GET = (p: string, o: RequestInit = {}) =>
  api(p, { method: 'GET', ...o });
export const POST = (p: string, body?: any, o: RequestInit = {}) =>
  api(p, { method: 'POST', ...o }, body);
export const PUT = (p: string, body?: any, o: RequestInit = {}) =>
  api(p, { method: 'PUT', ...o }, body);
export const DELETE_REQ = (p: string, o: RequestInit = {}) =>
  api(p, { method: 'DELETE', ...o });
