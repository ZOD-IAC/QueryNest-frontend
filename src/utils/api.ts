import { BASE_URL } from './Setting';

export async function api(path: string, options: RequestInit = {}, body?: any) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
}

// ---- Convenience shortcuts ----

// GET → no body
export const GET = (p: string, options: RequestInit = {}) =>
  api(p, { method: 'GET', ...options });

// POST → has body
export const POST = (p: string, body?: any, options: RequestInit = {}) =>
  api(p, { method: 'POST', ...options }, body);

// PUT → has body
export const PUT = (p: string, body?: any, options: RequestInit = {}) =>
  api(p, { method: 'PUT', ...options }, body);

// DELETE → no body
export const DELETE_REQ = (p: string, options: RequestInit = {}) =>
  api(p, { method: 'DELETE', ...options });
