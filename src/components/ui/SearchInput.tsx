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
        className="w-[17px] h-[17px] absolute left-4 top-1/2 -translate-y-1/2"
        style={{ color: T.muted }}
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 pl-[46px] pr-4 rounded-full text-[15px] border border-transparent focus:outline-none focus:border-[var(--ink)] focus:bg-white"
        style={{ background: T.surface }}
      />
    </div>
  );
}
