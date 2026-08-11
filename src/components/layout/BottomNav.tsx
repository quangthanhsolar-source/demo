"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Plus } from "lucide-react";
import { T } from "@/lib/tokens";

export function BottomNav() {
  const pathname = usePathname();
  const isDash = pathname === "/dashboard";
  const isKho = pathname.startsWith("/dashboard/kho");

  return (
    <nav
      className="app-bottom-nav lg:hidden fixed bottom-0 left-0 right-0 z-[60] flex items-end bg-white border-t px-0 pt-1.5 pb-[max(8px,env(safe-area-inset-bottom))]"
      style={{
        borderColor: T.line,
        boxShadow: "0 -2px 12px rgba(17,18,20,.06)",
      }}
    >
      <Link
        href="/dashboard"
        className="flex-1 flex flex-col items-center gap-0.5 py-1.5 px-1 min-h-12 justify-center text-[10px] font-semibold"
        style={{ color: isDash ? T.ink : T.muted }}
      >
        <LayoutDashboard className="w-[22px] h-[22px]" strokeWidth={2} />
        <span>Dashboard</span>
        {isDash && (
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: T.lime }}
          />
        )}
      </Link>

      <Link
        href="/dashboard/bao-gia/tao"
        className="flex-none w-[54px] h-[54px] rounded-full grid place-items-center -mt-3.5 shadow-lg"
        style={{ background: T.ink, color: T.lime }}
        title="Tạo báo giá"
      >
        <Plus className="w-6 h-6" strokeWidth={2.5} />
      </Link>

      <Link
        href="/dashboard/kho/ton-kho"
        className="flex-1 flex flex-col items-center gap-0.5 py-1.5 px-1 min-h-12 justify-center text-[10px] font-semibold"
        style={{ color: isKho ? T.ink : T.muted }}
      >
        <Package className="w-[22px] h-[22px]" strokeWidth={2} />
        <span>Kho</span>
        {isKho && (
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: T.lime }}
          />
        )}
      </Link>
    </nav>
  );
}
