"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  FileText,
  Pencil,
  Plus,
  Printer,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { SearchInput } from "@/components/ui/SearchInput";
import { formatVND } from "@/lib/helpers";
import { quotationList, quoteStatusColor } from "@/lib/mock-data";
import { T } from "@/lib/tokens";

export function QuoteListPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("Tất cả");
  const filtered = quotationList.filter(
    (x) =>
      (status === "Tất cả" || x.status === status) &&
      (x.customer.toLowerCase().includes(q.toLowerCase()) ||
        x.id.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div className="max-w-[1200px] mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <h1 className="font-display text-[26px] font-bold leading-tight flex items-center gap-2">
          <FileText className="w-5 h-5" /> Danh sách báo giá
        </h1>
        <Link
          href="/dashboard/bao-gia/tao"
          className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full text-white text-sm font-bold"
          style={{ backgroundColor: T.ink }}
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} /> Tạo báo giá mới
        </Link>
      </div>
      <SearchInput
        value={q}
        onChange={setQ}
        placeholder="Tìm theo mã báo giá hoặc khách hàng..."
      />
      <FilterTabs
        options={["Tất cả", "Đang chờ", "Đã chốt", "Đã hủy"]}
        active={status}
        onChange={setStatus}
      />
      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b"
              style={{ backgroundColor: T.mutedBg, borderColor: T.border }}
            >
              <th className="p-3 text-left">Mã báo giá</th>
              <th className="p-3 text-left">Tên khách hàng</th>
              <th className="p-3 text-left">Số điện thoại</th>
              <th className="p-3 text-right">Tổng giá trị</th>
              <th className="p-3 text-left">Ngày tạo</th>
              <th className="p-3 text-center">Trạng thái</th>
              <th className="p-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((q2) => (
              <tr
                key={q2.id}
                className="border-b hover:bg-slate-50"
                style={{ borderColor: T.border }}
              >
                <td className="p-3 font-medium" style={{ color: T.quoteHeader }}>
                  {q2.id}
                </td>
                <td className="p-3">{q2.customer}</td>
                <td className="p-3" style={{ color: T.muted }}>
                  {q2.phone}
                </td>
                <td className="p-3 text-right font-semibold">
                  {formatVND(q2.total)}
                </td>
                <td className="p-3" style={{ color: T.muted }}>
                  {q2.date}
                </td>
                <td className="p-3 text-center">
                  <Badge
                    label={q2.status}
                    colors={quoteStatusColor[q2.status]}
                  />
                </td>
                <td className="p-3">
                  <div
                    className="flex items-center justify-center gap-2"
                    style={{ color: T.muted }}
                  >
                    <button type="button" className="hover:text-slate-700" title="Xem">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button type="button" className="hover:text-slate-700" title="In PDF">
                      <Printer className="w-4 h-4" />
                    </button>
                    <button type="button" className="hover:text-blue-600" title="Sửa">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button type="button" className="hover:text-red-500" title="Xóa">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center"
                  style={{ color: T.muted }}
                >
                  Không tìm thấy báo giá phù hợp
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
