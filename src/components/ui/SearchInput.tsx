"use client";

import { Search } from "lucide-react";
import { T } from "@/lib/tokens";

export function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <Search
        className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
        style={{ color: T.muted }}
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2"
        style={{ borderColor: T.border }}
      />
    </div>
  );
}
