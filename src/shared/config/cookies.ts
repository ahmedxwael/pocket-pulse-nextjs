import { cookies as nextCookies } from "next/headers";
import { removeCookieAction, setCookieAction } from "../actions";

type CookieOptions = {
  value: any; // Consider being more specific than 'any'
  path?: string;
  expires?: Date;
  secure?: boolean;
  sameSite?: "none" | "lax" | "strict";
};

/**
 * Manages HTTP cookies for requests and responses
 */
export class CookieManager {
  protected _cookies?: Record<string, CookieOptions>;

  /**
   * Create a new cookie manager instance
   */
  public constructor() {}

  protected get cookies() {
    if (this._cookies) return this._cookies;

    this._cookies = {};

    return this._cookies;
  }

  public get data() {
    return this._cookies;
  }

  protected async parseCookies() {
    const cookiesStore = await nextCookies();
    this._cookies = {};

    for (const { name, value } of cookiesStore.getAll()) {
      this._cookies[name] = {
        value: decodeURIComponent(String(value)),
      };
    }

    return this._cookies;
  }

  /**
   * Get a cookie value by name
   */
  public async get(name: string) {
    if (!this._cookies) {
      await this.parseCookies();
    }

    const cookie = this.cookies[name];

    if (!cookie) return null;

    try {
      return JSON.parse(decodeURIComponent(cookie.value));
    } catch {
      return decodeURIComponent(cookie.value);
    }
  }

  /**
   * Set a cookie with the given name and value
   */
  public async set(
    name: string,
    value: any,
    cookieOptions: Omit<CookieOptions, "value"> = {
      path: "/",
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      secure: true,
      sameSite: "none",
    }
  ) {
    if (!this._cookies) {
      await this.parseCookies();
    }

    if (typeof value === "object" || Array.isArray(value)) {
      value = JSON.stringify(value);
    }

    const encodedValue = encodeURIComponent(value);
    const cookies = this.cookies;

    cookies[name] = {
      ...cookies[name],
      ...cookieOptions,
      value: encodedValue,
    };

    await setCookieAction(name, encodedValue);

    return cookies[name];
  }

  /**
   * Remove a cookie by name
   */
  public async remove(name: string) {
    delete this.cookies[name];
    await removeCookieAction(name);
  }

  protected transformCookieToResponse(name: string, options: CookieOptions) {
    const { path = "/", expires, sameSite = "None" } = options;
    const expiresDate = expires ? expires.toUTCString() : undefined;

    return `${name}=${options.value}; Path=${path}; Expires=${expiresDate}; HttpOnly; Secure; SameSite=${sameSite}`;
  }

  /**
   * Get response headers with cookies
   */
  public responseHeaders(headers = new Headers()) {
    for (const key in this.cookies) {
      headers.append(
        "Set-Cookie",
        this.transformCookieToResponse(key, this.cookies[key])
      );
    }

    headers.append("X-Cookie-Count", String(Object.keys(this.cookies).length));

    return headers;
  }
}

export function cookies() {
  return new CookieManager();
}
