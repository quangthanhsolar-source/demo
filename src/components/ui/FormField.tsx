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
    <div className="mb-3.5">
      <label
        className="text-[11px] font-bold uppercase tracking-[0.07em] block mb-1.5"
        style={{ color: T.muted }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export const inputCls =
  "w-full h-12 px-4 rounded-[14px] text-[15px] border border-transparent focus:outline-none focus:border-[var(--ink)] focus:bg-white bg-[var(--surface)]";
