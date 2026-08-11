import { redirect } from "next/navigation";

/** Open the interactive HTML prototype (source of truth for UI edits). */
export default function HomePage() {
  redirect("/erp.html");
}
