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
      className="text-[11px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {label}
    </span>
  );
}
