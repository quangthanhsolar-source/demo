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
      className={`bg-white rounded-xl shadow-sm border ${className}`}
      style={{ borderColor: T.border }}
    >
      {children}
    </div>
  );
}
