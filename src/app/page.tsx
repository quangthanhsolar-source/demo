import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/pages/LoginForm";
import { AUTH_COOKIE } from "@/lib/auth";

/**
 * Root route for Vercel / production.
 * Renders the login UI at `/` so the deployment never looks like a bare 404.
 */
export default async function HomePage() {
  const cookieStore = await cookies();
  if (cookieStore.get(AUTH_COOKIE)?.value === "1") {
    redirect("/dashboard");
  }
  return <LoginForm />;
}
