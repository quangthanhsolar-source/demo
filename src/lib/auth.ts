export const VALID_EMAIL = "admin@quangthanhsolar.com";
export const VALID_PASS = "admin123";
export const AUTH_COOKIE = "solar_auth";

export function validateCredentials(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === VALID_EMAIL && password === VALID_PASS
  );
}
