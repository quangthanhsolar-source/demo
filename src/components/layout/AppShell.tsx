"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronRight,
  CircleUser,
  Contact,
  FileText,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  Sun,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { Topbar } from "@/components/layout/Topbar";
import { T } from "@/lib/tokens";

function NavItem({
  icon: Icon,
  label,
  active,
  hasChildren,
  expanded,
  onClick,
  href,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  hasChildren?: boolean;
  expanded?: boolean;
  onClick?: () => void;
  href?: string;
}) {
  const className =
    "w-full flex items-center gap-3 min-h-12 rounded-full px-3.5 text-sm transition-colors";
  const style = active
    ? { backgroundColor: T.lime, color: T.ink, fontWeight: 700 }
    : expanded
      ? { backgroundColor: T.surface, color: T.ink, fontWeight: 600 }
      : { color: T.ink2, fontWeight: 500 };

  const content = (
    <>
      <Icon className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2} />
      <span className="flex-1 text-left">{label}</span>
      {hasChildren && (
        <ChevronRight
          className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-90" : ""}`}
          style={{ color: T.muted2 }}
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className} style={style} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className} style={style}>
      {content}
    </button>
  );
}

function SubNavItem({
  label,
  active,
  href,
  onClick,
}: {
  label: string;
  active: boolean;
  href: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="w-full text-left pl-5 pr-3 py-2.5 min-h-11 rounded-full text-[13.5px] transition-colors block"
      style={
        active
          ? { backgroundColor: T.lime, color: T.ink, fontWeight: 700 }
          : { color: T.ink2, fontWeight: 500 }
      }
    >
      {label}
    </Link>
  );
}

const TITLE_MAP: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/bao-gia/tao": "Tạo báo giá",
  "/dashboard/bao-gia/danh-sach": "Danh sách báo giá",
  "/dashboard/khach-hang": "Khách hàng",
  "/dashboard/thiet-bi": "Thiết bị",
  "/dashboard/kho/ton-kho": "Tồn kho",
  "/dashboard/kho/nhap-xuat": "Nhập/Xuất kho",
  "/dashboard/kho/nha-cung-cap": "Nhà cung cấp",
  "/dashboard/bao-cao": "Báo cáo",
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [baoGiaManual, setBaoGiaManual] = useState<boolean | null>(null);
  const [khoManual, setKhoManual] = useState<boolean | null>(null);
  const [thietBiManual, setThietBiManual] = useState<boolean | null>(null);

  const baoGiaOpen =
    baoGiaManual ?? pathname.startsWith("/dashboard/bao-gia");
  const khoOpen = khoManual ?? pathname.startsWith("/dashboard/kho");
  const thietBiOpen =
    thietBiManual ?? pathname.startsWith("/dashboard/thiet-bi");

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const title = TITLE_MAP[pathname] ?? "Dashboard";

  return (
    <div className="min-h-screen w-full" style={{ background: T.canvas }}>
      <Topbar title={title} onMenu={() => setMobileOpen(true)} />

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[79] lg:hidden"
          style={{ background: "rgba(17,18,20,.42)", backdropFilter: "blur(2px)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-[80] flex flex-col bg-white transition-transform duration-200 ease-out w-[var(--sb)] ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        style={{
          boxShadow: mobileOpen ? "4px 0 32px rgba(17,18,20,.18)" : "none",
        }}
      >
        <div
          className="flex items-center gap-3 px-[18px] py-[18px] border-b"
          style={{ borderColor: T.line }}
        >
          <div
            className="w-10 h-10 rounded-[13px] grid place-items-center flex-none"
            style={{ background: T.ink, color: T.lime }}
          >
            <Sun className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <b className="block text-sm font-extrabold tracking-tight truncate">
              QUANG THANH SOLAR
            </b>
            <span
              className="text-[10px] uppercase tracking-[0.09em]"
              style={{ color: T.muted }}
            >
              VP HCM – NLMT
            </span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-2.5 px-2.5 space-y-0.5">
          <NavItem
            icon={LayoutDashboard}
            label="Dashboard"
            active={pathname === "/dashboard"}
            href="/dashboard"
            onClick={closeMobile}
          />

          <div>
            <NavItem
              icon={FileText}
              label="Tạo báo giá"
              hasChildren
              expanded={baoGiaOpen}
              active={pathname.startsWith("/dashboard/bao-gia") && !baoGiaOpen}
              onClick={() => setBaoGiaManual(!baoGiaOpen)}
            />
            {baoGiaOpen && (
              <div
                className="mt-0.5 ml-4 pl-3.5 space-y-0.5"
                style={{ borderLeft: `2px solid ${T.line}` }}
              >
                <SubNavItem
                  label="Tạo báo giá"
                  active={pathname === "/dashboard/bao-gia/tao"}
                  href="/dashboard/bao-gia/tao"
                  onClick={closeMobile}
                />
                <SubNavItem
                  label="Danh sách báo giá"
                  active={pathname === "/dashboard/bao-gia/danh-sach"}
                  href="/dashboard/bao-gia/danh-sach"
                  onClick={closeMobile}
                />
              </div>
            )}
          </div>

          <NavItem
            icon={Contact}
            label="Khách hàng"
            active={pathname === "/dashboard/khach-hang"}
            href="/dashboard/khach-hang"
            onClick={closeMobile}
          />

          <div>
            <NavItem
              icon={Zap}
              label="Thiết bị"
              hasChildren
              expanded={thietBiOpen}
              active={pathname.startsWith("/dashboard/thiet-bi") && !thietBiOpen}
              onClick={() => setThietBiManual(!thietBiOpen)}
            />
            {thietBiOpen && (
              <div
                className="mt-0.5 ml-4 pl-3.5 space-y-0.5"
                style={{ borderLeft: `2px solid ${T.line}` }}
              >
                <SubNavItem
                  label="Danh mục thiết bị"
                  active={pathname === "/dashboard/thiet-bi"}
                  href="/dashboard/thiet-bi"
                  onClick={closeMobile}
                />
              </div>
            )}
          </div>

          <div>
            <NavItem
              icon={Package}
              label="Kho hàng"
              hasChildren
              expanded={khoOpen}
              active={pathname.startsWith("/dashboard/kho") && !khoOpen}
              onClick={() => setKhoManual(!khoOpen)}
            />
            {khoOpen && (
              <div
                className="mt-0.5 ml-4 pl-3.5 space-y-0.5"
                style={{ borderLeft: `2px solid ${T.line}` }}
              >
                <SubNavItem
                  label="Tồn kho"
                  active={pathname === "/dashboard/kho/ton-kho"}
                  href="/dashboard/kho/ton-kho"
                  onClick={closeMobile}
                />
                <SubNavItem
                  label="Nhập/Xuất kho"
                  active={pathname === "/dashboard/kho/nhap-xuat"}
                  href="/dashboard/kho/nhap-xuat"
                  onClick={closeMobile}
                />
                <SubNavItem
                  label="Nhà cung cấp"
                  active={pathname === "/dashboard/kho/nha-cung-cap"}
                  href="/dashboard/kho/nha-cung-cap"
                  onClick={closeMobile}
                />
              </div>
            )}
          </div>

          <NavItem
            icon={Users}
            label="Người dùng"
            active={false}
            href="/dashboard"
            onClick={closeMobile}
          />
          <NavItem
            icon={Settings}
            label="Cài đặt"
            active={pathname === "/dashboard/bao-cao"}
            href="/dashboard/bao-cao"
            onClick={closeMobile}
          />
        </nav>

        <div
          className="px-3.5 py-4 border-t"
          style={{ borderColor: T.line2 }}
        >
          <div className="flex items-center gap-2.5 px-1">
            <div
              className="w-[38px] h-[38px] rounded-full grid place-items-center flex-none"
              style={{ background: T.ink, color: T.lime }}
            >
              <CircleUser className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-semibold truncate">
                Admin Quang Thanh
              </p>
              <p
                className="text-[10.5px] uppercase tracking-[0.07em]"
                style={{ color: T.muted }}
              >
                Admin
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="mt-2.5 w-full flex items-center gap-2.5 px-1 py-2.5 min-h-12 rounded-full text-[13px] font-semibold transition-colors"
            style={{ color: T.muted }}
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      <div
        className="hidden lg:block flex-shrink-0"
        style={{ width: "var(--sb)" }}
      />

      <main className="lg:ml-[var(--sb)] min-h-screen min-w-0">
        <div className="px-4 pt-[70px] pb-[calc(80px+env(safe-area-inset-bottom))] lg:px-7 lg:pt-7 lg:pb-8">
          {children}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
