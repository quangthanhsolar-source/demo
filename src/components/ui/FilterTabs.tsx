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
    <div className="flex gap-2 flex-wrap">
      {options.map((opt) => {
        const isActive = opt === active;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className="h-9 px-4 rounded-full text-[13px] font-semibold transition-colors"
            style={
              isActive
                ? { background: T.ink, color: "#fff" }
                : { background: T.surface, color: T.ink2 }
            }
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
