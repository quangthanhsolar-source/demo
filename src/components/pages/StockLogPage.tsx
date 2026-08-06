"use client";

import { useState } from "react";
import { ArrowDownToLine } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { stockLogs, stockTypeColor } from "@/lib/mock-data";
import { T } from "@/lib/tokens";

export function StockLogPage() {
  const [type, setType] = useState("Tất cả");
  const filtered = stockLogs.filter((l) => type === "Tất cả" || l.type === type);

  return (
    <div className="max-w-[1200px] mx-auto space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2">
        <ArrowDownToLine className="w-5 h-5" style={{ color: T.primary }} />{" "}
        Nhập / Xuất kho
      </h1>
      <FilterTabs
        options={["Tất cả", "Nhập", "Xuất"]}
        active={type}
        onChange={setType}
      />
      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b"
              style={{ backgroundColor: T.mutedBg, borderColor: T.border }}
            >
              <th className="p-3 text-left">Mã phiếu</th>
              <th className="p-3 text-center">Loại</th>
              <th className="p-3 text-left">Vật tư</th>
              <th className="p-3 text-center">SL</th>
              <th className="p-3 text-left">Người thực hiện</th>
              <th className="p-3 text-left">Dự án / Kho</th>
              <th className="p-3 text-left">Ngày</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr
                key={l.id}
                className="border-b hover:bg-slate-50"
                style={{ borderColor: T.border }}
              >
                <td className="p-3 font-medium" style={{ color: T.primary }}>
                  {l.id}
                </td>
                <td className="p-3 text-center">
                  <Badge label={l.type} colors={stockTypeColor[l.type]} />
                </td>
                <td className="p-3 font-medium">{l.item}</td>
                <td className="p-3 text-center font-semibold">{l.qty}</td>
                <td className="p-3">{l.person}</td>
                <td className="p-3" style={{ color: T.muted }}>
                  {l.project}
                </td>
                <td className="p-3" style={{ color: T.muted }}>
                  {l.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
