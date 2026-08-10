"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calculator,
  CheckCircle2,
  Copy,
  FileDown,
  Grid3x3,
  ImageOff,
  MapPin,
  MessageSquare,
  Pencil,
  Phone,
  Plus,
  Save,
  Sun,
  TrendingUp,
  Trash2,
  User,
  Zap,
} from "lucide-react";
import { ProductIcon } from "@/components/ProductIcon";
import { Card } from "@/components/ui/Card";
import { formatNumberInput, formatVND, parseNumberInput } from "@/lib/helpers";
import { T } from "@/lib/tokens";

type Role =
  | "inverter"
  | "panel"
  | "battery"
  | "cabinet"
  | "combo"
  | "labor"
  | "service";

type Row = {
  id: number;
  role: Role;
  title: string;
  specs: string[];
  icon: string;
  sl: number;
  donGia: number;
  linked?: boolean;
  noImage?: boolean;
};

type EquipmentOption = {
  value: string;
  label: string;
  title: string;
  specs: string[];
  icon: string;
  donGia: number;
  watt?: number;
  linked?: boolean;
};

// ---- Thông số tính toán sản lượng / tiết kiệm ----
const SUN_HOURS = 3.6; // giờ nắng hiệu dụng / ngày
const DAYS_PER_MONTH = 30;
const ELECTRICITY_RATE = 3100; // đồng / kWh
const ROOF_AREA_PER_PANEL = 2.7; // m² / tấm

const inverterOptions: EquipmentOption[] = [
  {
    value: "sve-6k",
    label: "SVE - Hybrid SVE 6K Plus (6kW)",
    title: "Biến tần Hybrid SVE 6K Plus",
    specs: ["Công suất: 6kW", "Loại: Hybrid", "Bảo hành: 5 năm"],
    icon: "inverter",
    donGia: 14152000,
  },
  {
    value: "goodwe-5k",
    label: "GOODWE - On-grid GOODWE 5K (5kW)",
    title: "Biến tần On-grid GOODWE 5K",
    specs: ["Công suất: 5kW", "Loại: On-grid", "Bảo hành: 5 năm"],
    icon: "inverter",
    donGia: 9350000,
  },
];

const panelOptions: EquipmentOption[] = [
  {
    value: "akio-630",
    label: "AKIO - AKIO 630W",
    title: "Tấm pin Năng Lượng Mặt Trời AKIO 630W",
    specs: [
      "Thương hiệu: AKIO",
      "Công suất: 630W",
      "Công nghệ: N-type Mono-crystalline",
      "Tấm Pin 2 mặt kính",
      "Bảo hành: 12 năm vật lý - 30 năm hiệu suất",
    ],
    icon: "panel",
    donGia: 2600000,
    watt: 630,
  },
];

const batteryOptions: EquipmentOption[] = [
  {
    value: "zetatech-16",
    label: "ZETATECH 16kWh (16kWh)",
    title: "Pin Lưu Trữ Lithium ZETATECH 16kWh",
    specs: [
      "Cell Ganfeng A+: 8,000 chu kỳ, tuổi thọ trên 15 năm.",
      "Hiệu suất: Xả sâu 95%",
      "Điện áp: 51.2V",
      "Giao tiếp: CAN/RS485",
      "Chống cháy: cảm biến nhiệt dập cháy tự động.",
      "BH: 10 năm - Bảo hiểm : PVI lên đến 5 tỷ.",
    ],
    icon: "battery",
    donGia: 38000000,
    linked: true,
  },
];

const cabinetOptions: EquipmentOption[] = [
  {
    value: "tudien-1pha",
    label: "Tủ điện NLMT nhỏ - 1 pha",
    title: "Tủ điện NLMT nhỏ - 1 pha",
    specs: ["ATS tự động", "Aptomat DC, AC", "Bảo hành 1 năm"],
    icon: "panelboard",
    donGia: 3500000,
  },
];

const phaseOptions = ["1 pha", "3 pha"];
const voltageOptions = ["Áp thấp (LV)", "Áp cao (MV)"];
const powerOptions = ["— Tất cả —", "3kW", "5kW", "6kW", "8kW", "10kW"];

const comboRow: Row = {
  id: 5,
  role: "combo",
  title: "COMBO phụ kiện đi kèm lắp đặt",
  specs: [
    "Kẹp biên (End Clamp)",
    "Kẹp giữa (Mid Clamp)",
    "Bass Z / Chân L (L-feet)",
    "Jack kết nối MC4",
    "Ống gen/Máng cáp: Bảo vệ dây dẫn",
  ],
  icon: "cable",
  sl: 1,
  donGia: 3840000,
};

const laborRow: Row = {
  id: 6,
  role: "labor",
  title: "Nhân công lắp đặt",
  specs: [],
  icon: "labor",
  sl: 1,
  donGia: 5400000,
  noImage: true,
};

function optionToRow(id: number, role: Role, o: EquipmentOption, sl: number): Row {
  return {
    id,
    role,
    title: o.title,
    specs: o.specs,
    icon: o.icon,
    sl,
    donGia: o.donGia,
    linked: o.linked,
  };
}

const advantages = [
  {
    title: "Nguồn hàng sẵn có 3 miền:",
    text: "Kho hàng tại HN - ĐN - HCM giúp giao hàng và triển khai nhanh thần tốc.",
  },
  {
    title: "Hỗ trợ tận nơi:",
    text: "Hệ thống hơn 20 Văn Phòng Đại diện phủ sóng toàn quốc, an tâm tuyệt đối về khâu hậu mãi, bảo hành.",
  },
  {
    title: "Thi công chuyên nghiệp:",
    text: 'Tiêu chí "Nhanh - Gọn - Đồng bộ", đảm bảo chất lượng và thẩm mỹ công trình.',
  },
  {
    title: "Giá tốt nhất:",
    text: "Cam kết mức giá cạnh tranh nhất thị trường, báo giá toàn quốc.",
  },
];

const kwp = (n: number) =>
  n.toLocaleString("en-US", { maximumFractionDigits: 2 });
const kwh3 = (n: number) =>
  n.toLocaleString("en-US", { maximumFractionDigits: 3 });
const kwh1 = (n: number) =>
  n.toLocaleString("en-US", { maximumFractionDigits: 1 });
const saveVND = (n: number) =>
  new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 1 }).format(n) + " đ";

export function QuoteNewPage() {
  const router = useRouter();
  const captureRef = useRef<HTMLDivElement>(null);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  const [quoteType, setQuoteType] = useState<"install" | "ctv">("install");
  const [phase, setPhase] = useState(phaseOptions[0]);
  const [voltage, setVoltage] = useState(voltageOptions[0]);
  const [power, setPower] = useState(powerOptions[0]);

  const [inverter, setInverter] = useState(inverterOptions[0].value);
  const [panel, setPanel] = useState(panelOptions[0].value);
  const [battery, setBattery] = useState(batteryOptions[0].value);
  const [cabinet, setCabinet] = useState(cabinetOptions[0].value);

  const [items, setItems] = useState<Row[]>([
    optionToRow(1, "inverter", inverterOptions[0], 1),
    optionToRow(2, "panel", panelOptions[0], 12),
    optionToRow(3, "battery", batteryOptions[0], 1),
    optionToRow(4, "cabinet", cabinetOptions[0], 1),
    comboRow,
    laborRow,
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [draftSpecs, setDraftSpecs] = useState("");
  const [copying, setCopying] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 2500);
  };

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.sl * it.donGia, 0),
    [items],
  );
  const vat = subtotal * 0.08;
  const total = subtotal + vat;

  const panelRow = items.find((it) => it.role === "panel");
  const panelWatt =
    panelOptions.find((o) => o.value === panel)?.watt ?? 630;
  const panelCount = panelRow?.sl ?? 0;
  const kWp = (panelCount * panelWatt) / 1000;
  const kwhDay = kWp * SUN_HOURS;
  const kwhMonth = kwhDay * DAYS_PER_MONTH;
  const saveDay = kwhDay * ELECTRICITY_RATE;
  const saveMonth = kwhMonth * ELECTRICITY_RATE;
  const roof = Math.round(panelCount * ROOF_AREA_PER_PANEL);

  const updateItem = (id: number, patch: Partial<Row>) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));

  const replaceRoleRow = (role: Role, o: EquipmentOption) =>
    setItems((prev) =>
      prev.map((it) =>
        it.role === role
          ? {
              ...it,
              title: o.title,
              specs: o.specs,
              icon: o.icon,
              donGia: o.donGia,
              linked: o.linked,
            }
          : it,
      ),
    );

  const startEditSpecs = (item: Row) => {
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

  const addService = (title: string, donGia: number) =>
    setItems((prev) => [
      ...prev,
      {
        id: Math.max(0, ...prev.map((i) => i.id)) + 1,
        role: "service",
        title,
        specs: [],
        icon: "labor",
        sl: 1,
        donGia,
        noImage: true,
      },
    ]);

  const handleSave = () => {
    if (!customer.name || !customer.phone || !customer.address) {
      showToast("Vui lòng nhập Tên, SĐT và Địa chỉ khách hàng.");
      return;
    }
    try {
      const payload = { customer, quoteType, items, subtotal, vat, total };
      window.localStorage.setItem("qts-last-quote", JSON.stringify(payload));
    } catch {
      // ignore storage errors
    }
    showToast("Đã lưu báo giá.");
  };

  const handleExportPDF = () => window.print();

  const handleCopyImage = async () => {
    if (!captureRef.current) return;
    setCopying(true);
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
      });
      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/png"),
      );
      if (!blob) throw new Error("no blob");
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        showToast("Đã copy ảnh báo giá vào clipboard.");
      } catch {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "bao-gia.png";
        a.click();
        URL.revokeObjectURL(url);
        showToast("Đã tải ảnh báo giá (PNG).");
      }
    } catch {
      showToast("Không thể tạo ảnh. Vui lòng thử lại.");
    } finally {
      setCopying(false);
    }
  };

  const fieldWrap =
    "flex items-center gap-2 rounded-lg px-3 py-2.5 bg-white";
  const selectClass =
    "w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2";

  return (
    <div className="max-w-[1400px] mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-lg border hover:bg-slate-50"
            style={{ borderColor: T.border }}
            aria-label="Quay lại"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: T.muted }} />
          </button>
          <Sun className="w-6 h-6" style={{ color: T.amber }} />
          <h1 className="text-xl font-bold text-slate-800">Tạo báo giá mới</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90"
            style={{ backgroundColor: "#2563EB" }}
          >
            <Save className="w-4 h-4" /> Lưu
          </button>
          <button
            type="button"
            onClick={handleExportPDF}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90"
            style={{ backgroundColor: T.green }}
          >
            <FileDown className="w-4 h-4" /> Xuất PDF
          </button>
          <button
            type="button"
            onClick={handleCopyImage}
            disabled={copying}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: "#EA580C" }}
          >
            <Copy className="w-4 h-4" /> {copying ? "Đang tạo..." : "Copy ảnh"}
          </button>
        </div>
      </div>

      <div ref={captureRef} className="space-y-5">
        {/* Thông tin khách hàng */}
        <Card className="p-5">
          <h2 className="flex items-center gap-2 font-bold text-slate-800 mb-4">
            <User className="w-5 h-5" style={{ color: T.primary }} /> Thông tin
            khách hàng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-600">
                Tên khách hàng <span className="text-red-500">*</span>
              </label>
              <div
                className={`${fieldWrap} border mt-1`}
                style={{ borderColor: T.border }}
              >
                <User className="w-4 h-4" style={{ color: T.muted }} />
                <input
                  value={customer.name}
                  onChange={(e) =>
                    setCustomer((c) => ({ ...c, name: e.target.value }))
                  }
                  placeholder="Nhập tên"
                  className="w-full text-sm focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <div
                className={`${fieldWrap} border mt-1`}
                style={{ borderColor: T.border }}
              >
                <Phone className="w-4 h-4" style={{ color: T.muted }} />
                <input
                  value={customer.phone}
                  onChange={(e) =>
                    setCustomer((c) => ({ ...c, phone: e.target.value }))
                  }
                  placeholder="09xxxxxxxx"
                  className="w-full text-sm focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <div
                className={`${fieldWrap} border mt-1`}
                style={{ borderColor: T.border }}
              >
                <MapPin className="w-4 h-4" style={{ color: T.muted }} />
                <input
                  value={customer.address}
                  onChange={(e) =>
                    setCustomer((c) => ({ ...c, address: e.target.value }))
                  }
                  placeholder="Vd: Hà Nội"
                  className="w-full text-sm focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">
                Ghi chú
              </label>
              <div
                className={`${fieldWrap} border mt-1`}
                style={{ borderColor: T.border }}
              >
                <MessageSquare className="w-4 h-4" style={{ color: T.muted }} />
                <input
                  value={customer.note}
                  onChange={(e) =>
                    setCustomer((c) => ({ ...c, note: e.target.value }))
                  }
                  placeholder="Ghi chú"
                  className="w-full text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Toggle loại báo giá */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setQuoteType("install")}
            className="py-3 rounded-xl font-semibold text-sm transition"
            style={
              quoteType === "install"
                ? { backgroundColor: T.green, color: "#fff" }
                : { backgroundColor: T.mutedBg, color: T.muted }
            }
          >
            Báo giá lắp đặt
          </button>
          <button
            type="button"
            onClick={() => setQuoteType("ctv")}
            className="py-3 rounded-xl font-semibold text-sm transition"
            style={
              quoteType === "ctv"
                ? { backgroundColor: T.green, color: "#fff" }
                : { backgroundColor: T.mutedBg, color: T.muted }
            }
          >
            Báo giá CTV
          </button>
        </div>

        {/* Chọn thiết bị */}
        <Card className="p-5">
          <h2 className="flex items-center gap-2 font-bold text-slate-800 mb-4">
            <Zap className="w-5 h-5" style={{ color: T.primary }} /> Chọn thiết bị
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-600">
                Chọn Pha
              </label>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value)}
                className={`${selectClass} border mt-1`}
                style={{ borderColor: T.border }}
              >
                {phaseOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">
                Loại áp
              </label>
              <select
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                className={`${selectClass} border mt-1`}
                style={{ borderColor: T.border }}
              >
                {voltageOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">
                Công suất
              </label>
              <select
                value={power}
                onChange={(e) => setPower(e.target.value)}
                className={`${selectClass} border mt-1`}
                style={{ borderColor: T.border }}
              >
                {powerOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">
                Biến tần
              </label>
              <select
                value={inverter}
                onChange={(e) => {
                  setInverter(e.target.value);
                  const o = inverterOptions.find(
                    (x) => x.value === e.target.value,
                  );
                  if (o) replaceRoleRow("inverter", o);
                }}
                className={`${selectClass} border mt-1`}
                style={{ borderColor: T.border }}
              >
                {inverterOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="text-sm font-medium text-slate-600">
                Tấm pin NLMT
              </label>
              <select
                value={panel}
                onChange={(e) => {
                  setPanel(e.target.value);
                  const o = panelOptions.find(
                    (x) => x.value === e.target.value,
                  );
                  if (o) replaceRoleRow("panel", o);
                }}
                className={`${selectClass} border mt-1`}
                style={{ borderColor: T.border }}
              >
                {panelOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">
                Pin lưu trữ{" "}
                <span style={{ color: T.primary }}>(Áp thấp)</span>
              </label>
              <select
                value={battery}
                onChange={(e) => {
                  setBattery(e.target.value);
                  const o = batteryOptions.find(
                    (x) => x.value === e.target.value,
                  );
                  if (o) replaceRoleRow("battery", o);
                }}
                className={`${selectClass} border mt-1`}
                style={{ borderColor: T.border }}
              >
                {batteryOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">
                Tủ điện
              </label>
              <select
                value={cabinet}
                onChange={(e) => {
                  setCabinet(e.target.value);
                  const o = cabinetOptions.find(
                    (x) => x.value === e.target.value,
                  );
                  if (o) replaceRoleRow("cabinet", o);
                }}
                className={`${selectClass} border mt-1`}
                style={{ borderColor: T.border }}
              >
                {cabinetOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dịch vụ & Nhân công thêm */}
          <div className="mt-5">
            <div className="text-sm font-medium text-slate-500 mb-2">
              Dịch vụ &amp; Nhân công thêm
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { t: "Nhân công lắp đặt hệ thống", p: 5000000 },
                { t: "Nhân công lắp đặt pin lưu trữ", p: 2000000 },
                { t: "Vận chuyển thiết bị", p: 1500000 },
                { t: "Khảo sát & tư vấn", p: 0 },
              ].map((s) => (
                <button
                  key={s.t}
                  type="button"
                  onClick={() => addService(s.t, s.p)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border hover:bg-slate-50"
                  style={{ borderColor: T.border, color: "#334155" }}
                >
                  <Plus className="w-3.5 h-3.5" style={{ color: T.primary }} />
                  {s.t}
                  {s.p > 0 && (
                    <span style={{ color: T.muted }}>
                      ({formatVND(s.p)})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Thẻ thống kê */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <StatCard
            icon={<Grid3x3 className="w-5 h-5" style={{ color: T.primary }} />}
            value={String(panelCount)}
            label="Tấm pin"
          />
          <StatCard
            icon={<Zap className="w-5 h-5" style={{ color: T.primary }} />}
            value={`${kwh3(kwhDay)} kW`}
            label="kW/Ngày"
            sub={`Tiết kiệm: ${saveVND(saveDay)}`}
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5" style={{ color: T.primary }} />}
            value={`${kwh1(kwhMonth)} kW`}
            label="kW/Tháng"
            sub={`Tiết kiệm: ${saveVND(saveMonth)}`}
          />
          <StatCard
            icon={<Sun className="w-5 h-5" style={{ color: T.amber }} />}
            value={`${kwp(kWp)} kWp`}
            label="Công suất"
          />
          <StatCard
            icon={<Calculator className="w-5 h-5" style={{ color: T.primary }} />}
            value={`≈${roof}m²`}
            label="Mái"
          />
        </div>

        {/* Bảng sản phẩm + tổng + ghi chú + ưu điểm */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
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
                    <td className="py-4 px-3 text-center font-medium">
                      {idx + 1}
                    </td>
                    <td className="py-4 px-4">
                      <div
                        className="font-bold text-[14.5px] mb-1.5"
                        style={{ color: item.linked ? T.quoteHeader : "#1E293B" }}
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
                          {item.specs.length > 0 && (
                            <ul
                              className="text-[13px] space-y-0.5 leading-relaxed"
                              style={{ color: T.muted }}
                            >
                              {item.specs.map((s, i) => (
                                <li key={i}>- {s}</li>
                              ))}
                            </ul>
                          )}
                          <div
                            className="flex items-center gap-1 mt-1.5 text-[11.5px] opacity-70 group-hover:opacity-100"
                            style={{ color: T.amber }}
                          >
                            <Pencil className="w-3 h-3" /> Double-click để chỉnh
                            sửa
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-3">
                      <div
                        className="w-[84px] h-[84px] mx-auto rounded-lg overflow-hidden flex items-center justify-center"
                        style={{
                          border: `1px solid ${T.border}`,
                          backgroundColor: "#F8FAFC",
                        }}
                      >
                        {item.noImage ? (
                          <ImageOff
                            className="w-7 h-7"
                            style={{ color: "#CBD5E1" }}
                          />
                        ) : (
                          <ProductIcon type={item.icon} />
                        )}
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
                        aria-label="Xóa dòng"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tổng tiền */}
          <div
            className="px-6 py-4 space-y-2"
            style={{ borderTop: `1px solid ${T.border}` }}
          >
            <div className="flex justify-end items-center gap-6 text-sm">
              <span style={{ color: T.muted }}>Tạm tính:</span>
              <span className="font-semibold w-[160px] text-right">
                {formatVND(subtotal)}
              </span>
            </div>
            <div className="flex justify-end items-center gap-6 text-sm">
              <span style={{ color: T.muted }}>VAT (8%):</span>
              <span className="font-semibold w-[160px] text-right">
                {formatVND(vat)}
              </span>
            </div>
          </div>
          <div
            className="flex justify-between items-center px-6 py-3"
            style={{ backgroundColor: T.quoteHeader }}
          >
            <span className="text-white font-bold">TỔNG CỘNG:</span>
            <span className="text-white font-extrabold text-lg">
              {formatVND(total)}
            </span>
          </div>

          {/* Ghi chú + Ưu điểm */}
          <div className="p-6 space-y-5">
            <div>
              <p className="font-bold underline text-red-600 mb-2">
                Ghi chú báo giá này áp dụng thi công áp mái 1 tầng có phát sinh
                thêm các khoản :
              </p>
              <ul className="space-y-1 text-sm text-red-600">
                <li>
                  - Dây DC giá 18.000đ/mét, Dây AC, Vận chuyển vật tư về công
                  trình tùy điều kiện thực tế
                </li>
                <li>
                  - Đơn giá nhân công có thể thay đổi đối với mái nhà cao tầng
                  hoặc có độ dốc nguy hiểm
                </li>
                <li>
                  - Báo giá có hiệu lực trong vòng 3 ngày, chi phí phát sinh sẽ
                  thống nhất trước khi thực hiện
                </li>
              </ul>
            </div>
            <div>
              <p className="font-bold mb-2" style={{ color: T.primary }}>
                Ưu điểm khi lựa chọn Quang Thanh Solar:
              </p>
              <ul className="space-y-1.5 text-sm text-slate-700">
                {advantages.map((a) => (
                  <li key={a.title} className="flex items-start gap-2">
                    <CheckCircle2
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: T.green }}
                    />
                    <span>
                      <span className="font-semibold">{a.title}</span> {a.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-lg text-white text-sm shadow-lg"
          style={{ backgroundColor: "#1E293B" }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  sub,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  sub?: string;
}) {
  return (
    <Card className="p-4 text-center">
      <div className="flex justify-center mb-1.5">{icon}</div>
      <div className="text-xl font-extrabold text-slate-800">{value}</div>
      <div className="text-xs mt-0.5" style={{ color: T.muted }}>
        {label}
      </div>
      {sub && (
        <div className="text-[11px] mt-1 font-medium text-red-600">{sub}</div>
      )}
    </Card>
  );
}
