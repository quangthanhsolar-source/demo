import type { StatusColors } from "@/lib/types";

export function Badge({
  label,
  colors,
}: {
  label: string;
  colors: StatusColors;
}) {
  return (
    <span
      className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full font-bold whitespace-nowrap"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {label}
    </span>
  );
}
