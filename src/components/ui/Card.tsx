import type { ReactNode } from "react";
import { T } from "@/lib/tokens";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[var(--r)] ${className}`}
      style={{ background: T.surface }}
    >
      {children}
    </div>
  );
}
