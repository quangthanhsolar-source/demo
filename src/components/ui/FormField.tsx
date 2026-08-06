import type { ReactNode } from "react";
import { T } from "@/lib/tokens";

export function FormField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-3">
      <label
        className="text-xs font-medium block mb-1"
        style={{ color: T.muted }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export const inputCls =
  "w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2";
