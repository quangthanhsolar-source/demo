"use client";

import { T } from "@/lib/tokens";

export function FilterTabs({
  options,
  active,
  onChange,
}: {
  options: string[];
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border"
          style={
            active === o
              ? {
                  backgroundColor: T.primary,
                  color: "#fff",
                  borderColor: T.primary,
                }
              : {
                  backgroundColor: "#fff",
                  color: T.muted,
                  borderColor: T.border,
                }
          }
        >
          {o}
        </button>
      ))}
    </div>
  );
}
