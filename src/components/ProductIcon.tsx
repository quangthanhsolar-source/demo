import {
  BatteryFull,
  Cable,
  CircuitBoard,
  Frame,
  Package,
  PanelsTopLeft,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { T } from "@/lib/tokens";

const map: Record<
  string,
  { bg: string; Icon: LucideIcon; color: string }
> = {
  inverter: { bg: "#F8FAFC", Icon: CircuitBoard, color: T.primary },
  panel: { bg: "#0F172A", Icon: PanelsTopLeft, color: "#7DD3FC" },
  battery: { bg: "#F8FAFC", Icon: BatteryFull, color: T.green },
  panelboard: { bg: "#F8FAFC", Icon: Zap, color: T.amber },
  cable: { bg: "#F8FAFC", Icon: Cable, color: "#7C3AED" },
  frame: { bg: "#F8FAFC", Icon: Frame, color: "#0891B2" },
  default: { bg: "#F8FAFC", Icon: Package, color: "#94A3B8" },
};

export function ProductIcon({ type }: { type: string }) {
  const { bg, Icon, color } = map[type] || map.default;
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ backgroundColor: bg }}
    >
      <Icon className="w-8 h-8" style={{ color }} strokeWidth={1.5} />
    </div>
  );
}
