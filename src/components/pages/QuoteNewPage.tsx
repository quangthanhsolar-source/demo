"use client";

import { useMemo, useState } from "react";
import { Download, FileText, Pencil, Plus, Trash2 } from "lucide-react";
import { ProductIcon } from "@/components/ProductIcon";
import { Card } from "@/components/ui/Card";
import { formatNumberInput, formatVND, parseNumberInput } from "@/lib/helpers";
import { initialQuoteItems } from "@/lib/mock-data";
import { T } from "@/lib/tokens";

export function QuoteNewPage() {
  const [items, setItems] = useState(initialQuoteItems);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draftSpecs, setDraftSpecs] = useState("");
  const [exporting, setExporting] = useState(false);

  const grandTotal = useMemo(
    () => items.reduce((sum, it) => sum + it.sl * it.donGia, 0),
    [items],
  );

  const updateItem = (id: number, patch: Partial<(typeof items)[number]>) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));

  const startEditSpecs = (item: (typeof items)[number]) => {
    setEditingId(item.id);
    setDraftSpecs(item.specs.join("\n"));
  };

  const commitEditSpecs = (id: number) => {
    const specs = draftSpecs
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    updateItem(id, { specs });
    setEditingId(null);
  };

  const removeItem = (id: number) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  const addItem = () => {
    const nextId = Math.max(0, ...items.map((i) => i.id)) + 1;
    setItems((prev) => [
      ...prev,
      {
        id: nextId,
        title: "Sản phẩm mới",
        icon: "default",
        specs: ["Nhấp đúp để chỉnh sửa"],
        sl: 1,
        donGia: 0,
        linked: false,
      },
    ]);
  };

  const exportPDF = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      window.print();
    }, 400);
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-5 h-5" style={{ color: T.primary }} /> Tạo
            báo giá
          </h1>
          <p className="text-sm mt-0.5" style={{ color: T.muted }}>
            {items.length} sản phẩm trong báo giá
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90"
            style={{ backgroundColor: T.quoteHeader }}
          >
            <Plus className="w-4 h-4" /> Thêm sản phẩm
          </button>
          <button
            type="button"
            onClick={exportPDF}
            disabled={exporting}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border hover:bg-slate-50 disabled:opacity-60"
            style={{ borderColor: T.border, color: T.muted }}
          >
            <Download className="w-4 h-4" />{" "}
            {exporting ? "Đang xuất..." : "Xuất PDF"}
          </button>
        </div>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr style={{ backgroundColor: T.quoteHeader }}>
              <th className="text-white font-bold py-3 px-3 text-center w-14">
                STT
              </th>
              <th className="text-white font-bold py-3 px-4 text-left">
                SẢN PHẨM
              </th>
              <th className="text-white font-bold py-3 px-3 text-center w-[110px]">
                HÌNH ẢNH
              </th>
              <th className="text-white font-bold py-3 px-3 text-center w-[90px]">
                SL
              </th>
              <th className="text-white font-bold py-3 px-3 text-center w-[150px]">
                ĐƠN GIÁ
              </th>
              <th className="text-white font-bold py-3 px-4 text-right w-[170px]">
                THÀNH TIỀN
              </th>
              <th className="w-11"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/60 align-top"
                style={{ borderTop: `1px solid ${T.border}` }}
              >
                <td className="py-4 px-3 text-center font-medium">{idx + 1}</td>
                <td className="py-4 px-4">
                  <div
                    className={`font-bold text-[14.5px] mb-1.5 ${
                      item.linked ? "cursor-pointer hover:underline" : ""
                    }`}
                    style={{
                      color: item.linked ? T.quoteHeader : "#1E293B",
                    }}
                  >
                    {item.title}
                  </div>
                  {editingId === item.id ? (
                    <div>
                      <textarea
                        autoFocus
                        value={draftSpecs}
                        onChange={(e) => setDraftSpecs(e.target.value)}
                        onBlur={() => commitEditSpecs(item.id)}
                        className="w-full min-h-[100px] text-[13px] rounded-md p-2 focus:outline-none focus:ring-2"
                        style={{ border: `1px solid ${T.quoteHeader}66` }}
                      />
                      <div
                        className="text-[11px] mt-1"
                        style={{ color: T.muted }}
                      >
                        Mỗi dòng là một thông số · Nhấp ra ngoài để lưu
                      </div>
                    </div>
                  ) : (
                    <div
                      onDoubleClick={() => startEditSpecs(item)}
                      className="cursor-pointer group"
                      title="Double-click để chỉnh sửa"
                    >
                      <ul
                        className="text-[13px] space-y-0.5 leading-relaxed"
                        style={{ color: T.muted }}
                      >
                        {item.specs.map((s, i) => (
                          <li key={i}>- {s}</li>
                        ))}
                      </ul>
                      <div
                        className="flex items-center gap-1 mt-1.5 text-[11.5px] opacity-80 group-hover:opacity-100"
                        style={{ color: T.amber }}
                      >
                        <Pencil className="w-3 h-3" /> Double-click để chỉnh sửa
                      </div>
                    </div>
                  )}
                </td>
                <td className="py-4 px-3">
                  <div
                    className="w-[84px] h-[84px] mx-auto rounded-lg overflow-hidden"
                    style={{ border: `1px solid ${T.border}` }}
                  >
                    <ProductIcon type={item.icon} />
                  </div>
                </td>
                <td className="py-4 px-3">
                  <input
                    type="number"
                    min={0}
                    value={item.sl}
                    onChange={(e) =>
                      updateItem(item.id, {
                        sl: Math.max(0, parseInt(e.target.value, 10) || 0),
                      })
                    }
                    className="w-full text-center rounded-md py-1.5 text-sm focus:outline-none focus:ring-2"
                    style={{ border: `1px solid ${T.border}` }}
                  />
                </td>
                <td className="py-4 px-3">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatNumberInput(item.donGia)}
                    onChange={(e) =>
                      updateItem(item.id, {
                        donGia: parseNumberInput(e.target.value),
                      })
                    }
                    className="w-full text-right rounded-md py-1.5 px-2 text-sm focus:outline-none focus:ring-2"
                    style={{ border: `1px solid ${T.border}` }}
                  />
                </td>
                <td className="py-4 px-4 text-right font-bold text-[14.5px] whitespace-nowrap">
                  {formatVND(item.sl * item.donGia)}
                </td>
                <td className="py-4 px-2 text-center">
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-slate-300 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="flex items-center justify-end gap-4 px-6 py-4"
          style={{
            borderTop: `1px solid ${T.border}`,
            backgroundColor: T.mutedBg,
          }}
        >
          <span className="text-sm font-semibold" style={{ color: T.muted }}>
            TỔNG CỘNG
          </span>
          <span
            className="text-lg font-extrabold"
            style={{ color: T.quoteHeader }}
          >
            {formatVND(grandTotal)}
          </span>
        </div>
      </Card>
    </div>
  );
}
