// The one place that talks to the server.
// The browser calls /api/... on its own address: the Vite proxy (development) or the server itself (production)
// forwards it to the API, which lives under /api.

const BASE = "/api";

// a plain object describes every failed call
export interface ApiFailure {
  status: number; // 0 means the server could not be reached
  message: string;
}

export function isApiFailure(value: unknown): value is ApiFailure {
  return typeof value === "object" && value !== null && "status" in value && "message" in value;
}

// the sentence to show when a call failed: the server's own message, or a general one
export function errorMessage(error: unknown): string {
  return isApiFailure(error) ? error.message : "Something went wrong. Please try again.";
}

// the auth code registers these two, so the API client can report session news
interface SessionHandlers {
  onRefreshed: (accessExpiresAt: number) => void;
  onExpired: () => void;
}

let handlers: SessionHandlers | null = null;

export function setSessionHandlers(next: SessionHandlers | null): void {
  handlers = next;
}

async function send(method: string, path: string, body?: unknown): Promise<Response> {
  try {
    return await fetch(`${BASE}${path}`, {
      method,
      credentials: "include", // sends the HttpOnly cookies
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    const failure: ApiFailure = { status: 0, message: "Cannot reach the server. Check your connection." };
    throw failure;
  }
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function messageFrom(data: unknown, status: number): string {
  if (typeof data === "object" && data !== null && "message" in data) {
    const message = (data as { message: unknown }).message;
    if (typeof message === "string") return message;
  }
  return `Request failed (${status})`;
}

// several calls may need a refresh at the same moment; they share one refresh request
let refreshing: Promise<number | null> | null = null;

// gets a new access token; returns when it ends (milliseconds since 1970), or null if it failed
export function refreshSession(): Promise<number | null> {
  if (!refreshing) {
    refreshing = doRefresh().finally(() => {
      refreshing = null;
    });
  }
  return refreshing;
}

async function doRefresh(): Promise<number | null> {
  try {
    const response = await send("POST", "/auth/refresh");
    if (!response.ok) {
      handlers?.onExpired();
      return null;
    }

    const data = (await readJson(response)) as { accessExpiresAt?: unknown } | null;
    if (typeof data?.accessExpiresAt !== "number") return null;

    handlers?.onRefreshed(data.accessExpiresAt);
    return data.accessExpiresAt;
  } catch {
    return null; // the server could not be reached
  }
}

// a 401 on these paths is a real answer (a wrong password), not an expired session
const NO_REFRESH_PATHS = ["/auth/login", "/auth/signup", "/auth/refresh"];

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  let response = await send(method, path, body);

  // an expired access token: refresh once, then repeat the call
  if (response.status === 401 && !NO_REFRESH_PATHS.includes(path)) {
    if ((await refreshSession()) !== null) {
      response = await send(method, path, body);
    }
  }

  const data = await readJson(response);
  if (!response.ok) {
    const failure: ApiFailure = { status: response.status, message: messageFrom(data, response.status) };
    throw failure;
  }
  return data as T;
}

export const api = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
  put: <T>(path: string, body?: unknown) => request<T>("PUT", path, body),
  patch: <T>(path: string, body?: unknown) => request<T>("PATCH", path, body),
  delete: <T>(path: string) => request<T>("DELETE", path),
};
