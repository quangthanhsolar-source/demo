"use client";

import Link from "next/link";
import {
  AlertTriangle,
  BarChart3,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Plus,
  Sun,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatVND } from "@/lib/helpers";
import { quotationList, quoteStatusColor } from "@/lib/mock-data";
import { T } from "@/lib/tokens";

function StatCard({
  icon: Icon,
  label,
  value,
  iconBg,
  iconColor,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="rounded-[var(--r)] p-4" style={{ background: T.surface }}>
      <div className="flex items-start gap-2.5">
        <div
          className="w-[38px] h-[38px] rounded-[11px] grid place-items-center flex-none"
          style={{ background: iconBg, color: iconColor }}
        >
          <Icon className="w-[17px] h-[17px]" strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <div
            className="text-[10px] font-semibold uppercase tracking-[0.07em] mb-1.5"
            style={{ color: T.muted }}
          >
            {label}
          </div>
          <div className="font-display mono text-2xl font-bold leading-none truncate">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}

function PeriodCard({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-[var(--r)] p-4" style={{ background: T.surface }}>
      <Icon className="w-5 h-5 mb-2.5 block" style={{ color: T.ink }} />
      <div className="font-display mono text-[26px] font-bold leading-none">
        {value}
      </div>
      <div
        className="text-[10px] font-semibold uppercase tracking-[0.07em] mt-1"
        style={{ color: T.muted }}
      >
        {label}
      </div>
    </div>
  );
}

function Donut({ accepted, draft }: { accepted: number; draft: number }) {
  const total = Math.max(accepted + draft, 1);
  const acceptedPct = (accepted / total) * 100;
  const r = 90;
  const c = 2 * Math.PI * r;
  const acceptedLen = (acceptedPct / 100) * c;

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="flex gap-3.5 text-[11.5px] font-semibold uppercase tracking-[0.06em] self-start"
        style={{ color: T.muted }}
      >
        <span className="inline-flex items-center">
          <i
            className="inline-block w-2.5 h-2.5 rounded-sm mr-1.5"
            style={{ background: T.lime }}
          />
          Chấp nhận
        </span>
        <span className="inline-flex items-center">
          <i
            className="inline-block w-2.5 h-2.5 rounded-sm mr-1.5"
            style={{ background: "#17181a" }}
          />
          Nháp
        </span>
      </div>
      <svg viewBox="0 0 240 240" className="w-full max-w-[270px]">
        <circle
          cx="120"
          cy="120"
          r={r}
          fill="none"
          stroke="#17181a"
          strokeWidth="28"
        />
        <circle
          cx="120"
          cy="120"
          r={r}
          fill="none"
          stroke={T.lime}
          strokeWidth="28"
          strokeDasharray={`${acceptedLen} ${c - acceptedLen}`}
          strokeDashoffset={c / 4}
          strokeLinecap="butt"
          transform="rotate(-90 120 120)"
        />
        <text
          x="120"
          y="118"
          textAnchor="middle"
          className="font-display"
          style={{ fontSize: 28, fontWeight: 700, fill: T.ink }}
        >
          {acceptedPct.toFixed(0)}%
        </text>
        <text
          x="120"
          y="142"
          textAnchor="middle"
          style={{ fontSize: 11, fill: T.muted, fontWeight: 600 }}
        >
          CHẤP NHẬN
        </text>
      </svg>
    </div>
  );
}

export function DashboardPage() {
  const accepted = quotationList.filter((q) => q.status === "Đã chốt").length;
  const draft = quotationList.length - accepted;
  const rate =
    quotationList.length > 0 ? (accepted / quotationList.length) * 100 : 0;
  const totalValue = quotationList.reduce((s, q) => s + q.total, 0);
  const customers = new Set(quotationList.map((q) => q.customer)).size;

  return (
    <div className="max-w-[1200px] mx-auto space-y-[18px]">
      <div className="flex flex-col gap-3.5">
        <div>
          <h1 className="font-display text-[26px] lg:text-[30px] font-bold leading-tight flex items-center gap-2 flex-wrap">
            <span
              className="inline-grid place-items-center w-9 h-9 rounded-full flex-none"
              style={{ background: T.lime }}
            >
              <Sun className="w-[18px] h-[18px]" style={{ color: T.ink }} />
            </span>
            Xin chào, Admin Quang Thanh
          </h1>
          <p className="text-[13px] mt-1" style={{ color: T.muted }}>
            Tổng quan hệ thống báo giá năng lượng mặt trời
          </p>
        </div>
        <Link
          href="/dashboard/bao-gia/tao"
          className="h-12 px-5 rounded-full inline-flex items-center justify-center gap-2 text-sm font-bold text-white w-full sm:w-auto self-start"
          style={{ background: T.ink }}
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          Tạo báo giá mới
        </Link>
      </div>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          icon={FileText}
          label="Tổng báo giá"
          value={String(quotationList.length)}
          iconBg="#ffffff"
          iconColor={T.ink}
        />
        <StatCard
          icon={Users}
          label="Khách hàng"
          value={String(customers)}
          iconBg="#ffffff"
          iconColor={T.ink}
        />
        <StatCard
          icon={TrendingUp}
          label="Tỷ lệ chuyển đổi"
          value={`${rate.toFixed(1)}%`}
          iconBg={T.lime}
          iconColor={T.ink}
        />
        <StatCard
          icon={DollarSign}
          label="Tổng giá trị"
          value={formatVND(totalValue)}
          iconBg={T.ink}
          iconColor={T.lime}
        />
        <StatCard
          icon={AlertTriangle}
          label="Kho sắp hết"
          value="0"
          iconBg="#ffffff"
          iconColor={T.orange}
        />
      </div>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
        <PeriodCard icon={Calendar} value="0" label="Hôm nay" />
        <PeriodCard icon={Clock} value="0" label="Tuần này" />
        <PeriodCard icon={BarChart3} value="0" label="Tháng này" />
      </div>

      <div className="rounded-[var(--r)] p-[18px_16px]" style={{ background: T.surface }}>
        <div className="text-xs font-bold uppercase tracking-[0.06em] flex items-center gap-2 mb-4">
          <span
            className="w-2.5 h-2.5 rounded-[3px] flex-none"
            style={{ background: T.lime }}
          />
          Thống kê tình trạng báo giá
        </div>
        <Donut accepted={accepted} draft={draft} />
      </div>

      <div className="rounded-[var(--r)] overflow-hidden" style={{ background: T.surface }}>
        <div className="px-4 pt-4 pb-2 text-xs font-bold uppercase tracking-[0.06em] flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-[3px] flex-none"
            style={{ background: T.lime }}
          />
          Báo giá gần đây
        </div>
        <div className="divide-y" style={{ borderColor: T.line2 }}>
          {quotationList.slice(0, 5).map((q) => (
            <div
              key={q.id}
              className="flex items-center justify-between gap-3 px-4 py-3.5 text-sm"
            >
              <div className="min-w-0">
                <div className="font-semibold truncate">{q.customer}</div>
                <div className="text-xs mono mt-0.5" style={{ color: T.muted }}>
                  {q.id} · {q.date}
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-1.5 flex-none">
                <span className="font-bold mono text-[13px]">
                  {formatVND(q.total)}
                </span>
                <Badge label={q.status} colors={quoteStatusColor[q.status]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
