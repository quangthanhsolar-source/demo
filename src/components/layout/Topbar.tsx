"use client";

import Link from "next/link";
import { Menu, Plus, Sun } from "lucide-react";
import { T } from "@/lib/tokens";

export function Topbar({
  title,
  onMenu,
}: {
  title: string;
  onMenu: () => void;
}) {
  return (
    <header
      className="app-topbar lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center gap-2.5 px-4 min-h-14 bg-white border-b"
      style={{
        borderColor: T.line,
        boxShadow: T.shadow,
        paddingLeft: "max(16px, env(safe-area-inset-left))",
      }}
    >
      <button
        type="button"
        onClick={onMenu}
        className="w-10 h-10 rounded-full grid place-items-center flex-none"
        style={{ background: T.surface }}
        aria-label="Mở menu"
      >
        <Menu className="w-[18px] h-[18px]" style={{ color: T.ink2 }} />
      </button>
      <div
        className="w-9 h-9 rounded-[11px] grid place-items-center flex-none"
        style={{ background: T.ink, color: T.lime }}
      >
        <Sun className="w-[18px] h-[18px]" />
      </div>
      <div className="flex-1 min-w-0 font-display text-base font-bold tracking-tight truncate">
        {title}
      </div>
      <Link
        href="/dashboard/bao-gia/tao"
        className="h-[38px] px-3.5 rounded-full inline-flex items-center gap-1 text-[12.5px] font-bold flex-none"
        style={{ background: T.lime, color: T.ink }}
      >
        <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
        Tạo báo giá
      </Link>
    </header>
  );
}
