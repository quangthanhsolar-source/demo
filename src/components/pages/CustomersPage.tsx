"use client";

import { useState } from "react";
import { Contact, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { FormField, inputCls } from "@/components/ui/FormField";
import { Modal } from "@/components/ui/Modal";
import { SearchInput } from "@/components/ui/SearchInput";
import { careStatusColor, initialCustomers } from "@/lib/mock-data";
import { T } from "@/lib/tokens";

export function CustomersPage() {
  const [q, setQ] = useState("");
  const [list, setList] = useState(initialCustomers);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    system: "Hybrid",
  });

  const filtered = list.filter((c) =>
    c.name.toLowerCase().includes(q.toLowerCase()),
  );

  const submit = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) return;
    const nextId = "KH-0" + (232 + list.length);
    setList((prev) => [{ id: nextId, ...form, care: "Mới" as const }, ...prev]);
    setForm({ name: "", phone: "", address: "", system: "Hybrid" });
    setShowModal(false);
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Contact className="w-5 h-5" style={{ color: T.primary }} /> Quản lý
          Khách hàng
        </h1>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90"
          style={{ backgroundColor: T.primary }}
        >
          <Plus className="w-4 h-4" /> Thêm khách hàng mới
        </button>
      </div>
      <SearchInput value={q} onChange={setQ} placeholder="Tìm khách hàng..." />
      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b"
              style={{ backgroundColor: T.mutedBg, borderColor: T.border }}
            >
              <th className="p-3 text-left">Mã KH</th>
              <th className="p-3 text-left">Tên khách hàng</th>
              <th className="p-3 text-left">Số điện thoại</th>
              <th className="p-3 text-left">Địa chỉ lắp đặt</th>
              <th className="p-3 text-center">Loại hệ thống</th>
              <th className="p-3 text-center">Trạng thái chăm sóc</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.id}
                className="border-b hover:bg-slate-50"
                style={{ borderColor: T.border }}
              >
                <td className="p-3 font-medium" style={{ color: T.primary }}>
                  {c.id}
                </td>
                <td className="p-3 font-medium">{c.name}</td>
                <td className="p-3">{c.phone}</td>
                <td className="p-3" style={{ color: T.muted }}>
                  {c.address}
                </td>
                <td className="p-3 text-center">{c.system}</td>
                <td className="p-3 text-center">
                  <Badge label={c.care} colors={careStatusColor[c.care]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {showModal && (
        <Modal title="Thêm khách hàng mới" onClose={() => setShowModal(false)}>
          <div>
            <FormField label="Tên khách hàng">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputCls}
                style={{ borderColor: T.border }}
              />
            </FormField>
            <FormField label="Số điện thoại">
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputCls}
                style={{ borderColor: T.border }}
              />
            </FormField>
            <FormField label="Địa chỉ lắp đặt">
              <input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className={inputCls}
                style={{ borderColor: T.border }}
              />
            </FormField>
            <FormField label="Loại hệ thống quan tâm">
              <select
                value={form.system}
                onChange={(e) => setForm({ ...form, system: e.target.value })}
                className={inputCls}
                style={{ borderColor: T.border }}
              >
                <option>Hybrid</option>
                <option>Hòa lưới</option>
                <option>Lưu trữ</option>
              </select>
            </FormField>
            <button
              type="button"
              onClick={submit}
              className="w-full mt-2 py-2.5 rounded-lg text-white text-sm font-semibold hover:opacity-90"
              style={{ backgroundColor: T.primary }}
            >
              Lưu khách hàng
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
