// api.ts
import { BASE_URL } from "./Setting";

export async function api(path: string, options: RequestInit = {}) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    });

    return await res.json();

  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
}

// Convenience shortcuts
export const GET = (p: string) => api(p);
export const POST = (p: string, body: any) =>
  api(p, { method: "POST", body: JSON.stringify(body) });
export const PUT = (p: string, body: any) =>
  api(p, { method: "PUT", body: JSON.stringify(body) });
export const DELETE_REQ = (p: string) =>
  api(p, { method: "DELETE" });