"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { ProductIcon } from "@/components/ProductIcon";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { SearchInput } from "@/components/ui/SearchInput";
import { formatVND } from "@/lib/helpers";
import { equipment, equipmentCategories } from "@/lib/mock-data";
import { T } from "@/lib/tokens";

export function EquipmentPage() {
  const [cat, setCat] = useState("Tất cả");
  const [q, setQ] = useState("");
  const filtered = equipment.filter(
    (e) =>
      (cat === "Tất cả" || e.cat === cat) &&
      e.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="max-w-[1200px] mx-auto space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2">
        <Zap className="w-5 h-5" style={{ color: T.primary }} /> Danh mục Thiết
        bị
      </h1>
      <FilterTabs
        options={equipmentCategories}
        active={cat}
        onChange={setCat}
      />
      <SearchInput value={q} onChange={setQ} placeholder="Tìm thiết bị..." />
      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b"
              style={{ backgroundColor: T.mutedBg, borderColor: T.border }}
            >
              <th className="p-3 text-center w-14">Ảnh</th>
              <th className="p-3 text-left">Mã SP</th>
              <th className="p-3 text-left">Tên sản phẩm</th>
              <th className="p-3 text-left">Thương hiệu</th>
              <th className="p-3 text-left">Thông số kỹ thuật</th>
              <th className="p-3 text-right">Giá niêm yết</th>
              <th className="p-3 text-center">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr
                key={e.id}
                className="border-b hover:bg-slate-50"
                style={{ borderColor: T.border }}
              >
                <td className="p-3">
                  <div
                    className="w-10 h-10 mx-auto rounded-md overflow-hidden"
                    style={{ border: `1px solid ${T.border}` }}
                  >
                    <ProductIcon type={e.icon} />
                  </div>
                </td>
                <td className="p-3 font-medium" style={{ color: T.primary }}>
                  {e.id}
                </td>
                <td className="p-3 font-medium whitespace-nowrap">{e.name}</td>
                <td className="p-3" style={{ color: T.muted }}>
                  {e.brand}
                </td>
                <td className="p-3" style={{ color: T.muted }}>
                  {e.specs}
                </td>
                <td className="p-3 text-right font-semibold">
                  {formatVND(e.price)}
                </td>
                <td className="p-3 text-center">
                  <Badge
                    label={e.status}
                    colors={
                      e.status === "Còn hàng"
                        ? { bg: "#D1FAE5", text: "#047857" }
                        : { bg: "#FEF3C7", text: "#B45309" }
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
