import { BarChart3, FileText, LayoutDashboard, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatVND } from "@/lib/helpers";
import { quotationList, quoteStatusColor } from "@/lib/mock-data";
import { T } from "@/lib/tokens";

export function DashboardPage() {
  const stats = [
    { label: "Báo giá tháng này", value: "18", icon: FileText },
    { label: "Doanh thu dự kiến", value: formatVND(1245000000), icon: BarChart3 },
    { label: "Khách hàng mới", value: "7", icon: Users },
    { label: "Tỉ lệ chốt đơn", value: "42%", icon: BarChart3 },
  ];

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <h1 className="text-xl font-bold flex items-center gap-2">
        <LayoutDashboard className="w-5 h-5" style={{ color: T.primary }} />{" "}
        Dashboard
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: T.muted }}>
                {s.label}
              </span>
              <s.icon className="w-4 h-4" style={{ color: T.primary }} />
            </div>
            <div className="text-2xl font-bold mt-1" style={{ color: T.primary }}>
              {s.value}
            </div>
          </Card>
        ))}
      </div>
      <Card className="p-5">
        <h2 className="font-semibold mb-3 text-sm">Báo giá gần đây</h2>
        <div className="divide-y" style={{ borderColor: T.border }}>
          {quotationList.slice(0, 4).map((q) => (
            <div
              key={q.id}
              className="flex items-center justify-between py-2.5 text-sm"
            >
              <div>
                <div className="font-medium">{q.customer}</div>
                <div className="text-xs" style={{ color: T.muted }}>
                  {q.id} · {q.date}
                </div>
              </div>
              <div className="text-right flex items-center gap-2">
                <span className="font-semibold">{formatVND(q.total)}</span>
                <Badge label={q.status} colors={quoteStatusColor[q.status]} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
