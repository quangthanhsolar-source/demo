"use client";

import { useState } from "react";
import { AlertTriangle, MapPin, Package } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { SearchInput } from "@/components/ui/SearchInput";
import { inventoryItems, inventoryLocations } from "@/lib/mock-data";
import { T } from "@/lib/tokens";

export function InventoryPage() {
  const [loc, setLoc] = useState("Tất cả kho");
  const [q, setQ] = useState("");
  const filtered = inventoryItems.filter(
    (i) =>
      (loc === "Tất cả kho" || i.location === loc) &&
      i.name.toLowerCase().includes(q.toLowerCase()),
  );
  const lowStockCount = inventoryItems.filter((i) => i.low).length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-xl font-bold flex items-center gap-2">
        <Package className="w-5 h-5" style={{ color: T.primary }} /> Quản lý
        Tồn kho
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm" style={{ color: T.muted }}>
            Tổng sản phẩm
          </div>
          <div className="text-2xl font-bold mt-1" style={{ color: T.primary }}>
            {inventoryItems.length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm" style={{ color: T.muted }}>
            Sắp hết hàng
          </div>
          <div
            className="text-2xl font-bold mt-1 flex items-center gap-1"
            style={{ color: T.amber }}
          >
            <AlertTriangle className="w-4 h-4" /> {lowStockCount}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm" style={{ color: T.muted }}>
            Kho hoạt động
          </div>
          <div className="text-2xl font-bold mt-1" style={{ color: T.primary }}>
            {inventoryLocations.length - 1}
          </div>
        </Card>
      </div>
      <FilterTabs
        options={inventoryLocations}
        active={loc}
        onChange={setLoc}
      />
      <SearchInput value={q} onChange={setQ} placeholder="Tìm sản phẩm..." />
      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b"
              style={{ backgroundColor: T.mutedBg, borderColor: T.border }}
            >
              <th className="p-3 text-left">Tên sản phẩm</th>
              <th className="p-3 text-center">Tồn kho</th>
              <th className="p-3 text-left">Đơn vị</th>
              <th className="p-3 text-left">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Vị trí kho
                </span>
              </th>
              <th className="p-3 text-center">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((it) => (
              <tr
                key={it.id}
                className="border-b hover:bg-slate-50"
                style={{ borderColor: T.border }}
              >
                <td className="p-3 font-medium">{it.name}</td>
                <td className="p-3 text-center font-semibold">{it.stock}</td>
                <td className="p-3">{it.unit}</td>
                <td className="p-3" style={{ color: T.muted }}>
                  {it.location}
                </td>
                <td className="p-3 text-center">
                  {it.low ? (
                    <Badge
                      label="Sắp hết"
                      colors={{ bg: "#FEF3C7", text: "#B45309" }}
                    />
                  ) : (
                    <Badge
                      label="Còn hàng"
                      colors={{ bg: "#D1FAE5", text: "#047857" }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
