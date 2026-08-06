"use client";

import { BarChart3 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { closeRateData, revenueByMonth } from "@/lib/mock-data";
import { PIE_COLORS, T } from "@/lib/tokens";

export function ReportsPage() {
  const totalRevenue = revenueByMonth.reduce((s, m) => s + m.revenue, 0);

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <h1 className="text-xl font-bold flex items-center gap-2">
        <BarChart3 className="w-5 h-5" style={{ color: T.primary }} /> Báo cáo
        &amp; Thống kê
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm" style={{ color: T.muted }}>
            Tổng doanh số báo giá
          </div>
          <div className="text-2xl font-bold mt-1" style={{ color: T.primary }}>
            {totalRevenue.toLocaleString("vi-VN")} triệu đ
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm" style={{ color: T.muted }}>
            Số HĐ đã chốt
          </div>
          <div className="text-2xl font-bold mt-1" style={{ color: T.primary }}>
            27
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm" style={{ color: T.muted }}>
            Tổng công suất đã lắp
          </div>
          <div className="text-2xl font-bold mt-1" style={{ color: T.primary }}>
            318 kWp
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5 lg:col-span-2">
          <h2 className="font-semibold text-sm mb-4">
            Doanh thu theo tháng (triệu đ)
          </h2>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={revenueByMonth}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={T.border}
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: T.muted }}
                  axisLine={{ stroke: T.border }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: T.muted }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(v) => `${v} triệu đ`}
                  contentStyle={{
                    borderRadius: 8,
                    borderColor: T.border,
                    fontSize: 13,
                  }}
                />
                <Bar dataKey="revenue" fill={T.primary} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold text-sm mb-4">Tỷ lệ chốt hợp đồng</h2>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={closeRateData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {closeRateData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v) => `${v}%`}
                  contentStyle={{
                    borderRadius: 8,
                    borderColor: T.border,
                    fontSize: 13,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center -mt-4">
            <div className="text-2xl font-bold" style={{ color: T.primary }}>
              42%
            </div>
            <div className="text-xs" style={{ color: T.muted }}>
              đã chốt hợp đồng
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
