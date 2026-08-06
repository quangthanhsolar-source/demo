"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  CircleUser,
  Contact,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { T } from "@/lib/tokens";

function NavItem({
  icon: Icon,
  label,
  active,
  hasChildren,
  expanded,
  onClick,
  href,
  collapsed,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  hasChildren?: boolean;
  expanded?: boolean;
  onClick?: () => void;
  href?: string;
  collapsed: boolean;
}) {
  const className = `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
    active ? "font-medium" : "hover:bg-slate-100"
  }`;
  const style = active
    ? { backgroundColor: T.primarySoft, color: T.primary }
    : { color: T.muted };

  const content = (
    <>
      <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
      {!collapsed && <span className="flex-1 text-left">{label}</span>}
      {!collapsed &&
        hasChildren &&
        (expanded ? (
          <ChevronDown className="w-3 h-3" />
        ) : (
          <ChevronRight className="w-3 h-3" />
        ))}
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
      className="w-full text-left pl-11 pr-3 py-1.5 rounded-lg text-[13px] transition-colors block"
      style={
        active
          ? {
              backgroundColor: T.primarySoft,
              color: T.primary,
              fontWeight: 600,
            }
          : { color: "#94A3B8" }
      }
    >
      {label}
    </Link>
  );
}

export function Sidebar({
  collapsed = false,
}: {
  collapsed?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [baoGiaManual, setBaoGiaManual] = useState<boolean | null>(null);
  const [khoManual, setKhoManual] = useState<boolean | null>(null);

  const baoGiaOpen =
    baoGiaManual ?? pathname.startsWith("/dashboard/bao-gia");
  const khoOpen = khoManual ?? pathname.startsWith("/dashboard/kho");

  const closeMobile = () => setMobileOpen(false);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-3 left-3 z-50 p-2 rounded-lg bg-white border shadow-md"
        style={{ borderColor: T.border }}
        onClick={() => setMobileOpen((v) => !v)}
      >
        <Menu className="w-5 h-5" />
      </button>

      <aside
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ${
          collapsed ? "w-[76px]" : "w-64"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        style={{
          backgroundColor: T.sidebarBg,
          borderRight: `1px solid ${T.border}`,
        }}
      >
        <div className="flex flex-col h-full">
          <div
            className="p-4"
            style={{ borderBottom: `1px solid ${T.border}` }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg,#FBBF24,#F97316)",
                }}
              >
                <Sun className="w-5 h-5 text-white" />
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <h2 className="text-sm font-bold truncate">
                    QUANG THANH SOLAR
                  </h2>
                  <p className="text-xs truncate" style={{ color: T.muted }}>
                    VP HCM – NLMT
                  </p>
                </div>
              )}
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
            <NavItem
              icon={LayoutDashboard}
              label="Dashboard"
              active={pathname === "/dashboard"}
              collapsed={collapsed}
              href="/dashboard"
              onClick={closeMobile}
            />

            <div>
              <NavItem
                icon={FileText}
                label="Báo giá NLMT"
                hasChildren
                expanded={baoGiaOpen}
                collapsed={collapsed}
                onClick={() => setBaoGiaManual(!baoGiaOpen)}
              />
              {!collapsed && baoGiaOpen && (
                <div className="mt-1 space-y-1">
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
              collapsed={collapsed}
              href="/dashboard/khach-hang"
              onClick={closeMobile}
            />
            <NavItem
              icon={Zap}
              label="Thiết bị"
              active={pathname === "/dashboard/thiet-bi"}
              collapsed={collapsed}
              href="/dashboard/thiet-bi"
              onClick={closeMobile}
            />

            <div>
              <NavItem
                icon={Package}
                label="Kho hàng"
                hasChildren
                expanded={khoOpen}
                collapsed={collapsed}
                onClick={() => setKhoManual(!khoOpen)}
              />
              {!collapsed && khoOpen && (
                <div className="mt-1 space-y-1">
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
              icon={BarChart3}
              label="Báo cáo"
              active={pathname === "/dashboard/bao-cao"}
              collapsed={collapsed}
              href="/dashboard/bao-cao"
              onClick={closeMobile}
            />
          </nav>

          <div className="p-3" style={{ borderTop: `1px solid ${T.border}` }}>
            <div className="flex items-center gap-3 px-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: T.primarySoft }}
              >
                <CircleUser className="w-5 h-5" style={{ color: T.primary }} />
              </div>
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">
                    Admin Quang Thanh
                  </p>
                  <p className="text-xs truncate" style={{ color: T.muted }}>
                    Admin
                  </p>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={logout}
              className="mt-2 w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-red-50"
              style={{ color: T.destructive }}
            >
              <LogOut className="w-4 h-4" />
              {!collapsed && <span>Đăng xuất</span>}
            </button>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
