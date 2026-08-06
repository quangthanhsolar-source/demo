export const VALID_EMAIL = "admin@baoduy.com";
export const VALID_PASS = "admin123";
export const AUTH_COOKIE = "solar_auth";

export function validateCredentials(email: string, password: string): boolean {
  return email.trim() === VALID_EMAIL && password === VALID_PASS;
}
