import type {
  Customer,
  Equipment,
  InventoryItem,
  Quotation,
  QuoteItem,
  StatusColors,
  StockLog,
  Supplier,
} from "@/lib/types";

export const initialQuoteItems: QuoteItem[] = [
  {
    id: 1,
    title: "Biến tần Hybrid SVE 6K Plus",
    icon: "inverter",
    specs: ["Công suất: 6kW", "Loại: Hybrid", "Bảo hành: 5 năm"],
    sl: 1,
    donGia: 14152000,
    linked: false,
  },
  {
    id: 2,
    title: "Tấm pin Năng Lượng Mặt Trời AKIO 630W",
    icon: "panel",
    specs: [
      "Thương hiệu: AKIO",
      "Công suất: 630W",
      "Công nghệ: N-type Mono-crystalline",
      "Tấm Pin 2 mặt kính",
      "Bảo hành: 12 năm vật lý - 30 năm hiệu suất",
    ],
    sl: 12,
    donGia: 2600000,
    linked: true,
  },
  {
    id: 3,
    title: "Pin Lưu Trữ Lithium ZETATECH 16kWh",
    icon: "battery",
    specs: [
      "Cell Ganfeng A+: 8,000 chu kỳ, tuổi thọ trên 15 năm.",
      "Hiệu suất: Xả sâu 95%",
      "Điện áp: 51.2V",
      "Giao tiếp: CAN/RS485",
      "Chống cháy: cảm biến nhiệt dập cháy tự động.",
      "BH: 10 năm - Bảo hiểm : PVI lên đến 5 tỷ.",
    ],
    sl: 1,
    donGia: 38000000,
    linked: false,
  },
  {
    id: 4,
    title: "Tủ điện NLMT nhỏ - 1 pha",
    icon: "panelboard",
    specs: ["ATS tự động", "Aptomat DC, AC", "Bảo hành 1 năm"],
    sl: 1,
    donGia: 3500000,
    linked: false,
  },
];

export const quotationList: Quotation[] = [
  {
    id: "BG-2026-0142",
    customer: "Nguyễn Văn An",
    phone: "0908 123 456",
    total: 86852000,
    date: "24/07/2026",
    status: "Đang chờ",
  },
  {
    id: "BG-2026-0141",
    customer: "Cty TNHH Minh Phát",
    phone: "028 3822 1190",
    total: 245300000,
    date: "22/07/2026",
    status: "Đã chốt",
  },
  {
    id: "BG-2026-0140",
    customer: "Trần Thị Bích",
    phone: "0912 555 789",
    total: 52180000,
    date: "19/07/2026",
    status: "Đang chờ",
  },
  {
    id: "BG-2026-0139",
    customer: "Lê Hoàng Sơn",
    phone: "0977 234 111",
    total: 118400000,
    date: "15/07/2026",
    status: "Đã chốt",
  },
  {
    id: "BG-2026-0138",
    customer: "Cty CP Đại Phát",
    phone: "028 3999 4820",
    total: 412750000,
    date: "10/07/2026",
    status: "Đã hủy",
  },
];

export const quoteStatusColor: Record<string, StatusColors> = {
  "Đang chờ": { bg: "#FEF3C7", text: "#B45309" },
  "Đã chốt": { bg: "#D1FAE5", text: "#047857" },
  "Đã hủy": { bg: "#FEE2E2", text: "#B91C1C" },
};

export const careStatusColor: Record<string, StatusColors> = {
  "Mới": { bg: "#DBEAFE", text: "#1D4ED8" },
  "Đã tư vấn": { bg: "#EDE9FE", text: "#6D28D9" },
  "Khảo sát": { bg: "#FEF3C7", text: "#B45309" },
  "Đã ký hợp đồng": { bg: "#D1FAE5", text: "#047857" },
};

export const initialCustomers: Customer[] = [
  {
    id: "KH-0231",
    name: "Nguyễn Văn An",
    phone: "0908 123 456",
    address: "Q.7, TP.HCM",
    system: "Hybrid",
    care: "Đã ký hợp đồng",
  },
  {
    id: "KH-0230",
    name: "Cty TNHH Minh Phát",
    phone: "028 3822 1190",
    address: "Q.1, TP.HCM",
    system: "Hòa lưới",
    care: "Đã tư vấn",
  },
  {
    id: "KH-0229",
    name: "Trần Thị Bích",
    phone: "0912 555 789",
    address: "Thủ Đức, TP.HCM",
    system: "Lưu trữ",
    care: "Khảo sát",
  },
  {
    id: "KH-0228",
    name: "Lê Hoàng Sơn",
    phone: "0977 234 111",
    address: "Biên Hòa, Đồng Nai",
    system: "Hybrid",
    care: "Mới",
  },
  {
    id: "KH-0227",
    name: "Cty CP Đại Phát",
    phone: "028 3999 4820",
    address: "Q.3, TP.HCM",
    system: "Hòa lưới",
    care: "Đã ký hợp đồng",
  },
];

export const equipmentCategories = [
  "Tất cả",
  "Biến tần",
  "Tấm pin",
  "Pin lưu trữ",
  "Vật tư phụ",
];

export const equipment: Equipment[] = [
  {
    id: "SP-001",
    name: "Biến tần Hybrid SVE 6K Plus",
    cat: "Biến tần",
    icon: "inverter",
    brand: "SVE",
    specs: "6kW · Hybrid",
    price: 14152000,
    status: "Còn hàng",
  },
  {
    id: "SP-002",
    name: "Biến tần On-grid GOODWE 5K",
    cat: "Biến tần",
    icon: "inverter",
    brand: "GOODWE",
    specs: "5kW · On-grid",
    price: 9350000,
    status: "Còn hàng",
  },
  {
    id: "SP-003",
    name: "Tấm pin AKIO 630W",
    cat: "Tấm pin",
    icon: "panel",
    brand: "AKIO",
    specs: "630W · N-type Mono",
    price: 2600000,
    status: "Sắp hết",
  },
  {
    id: "SP-004",
    name: "Pin Lithium ZETATECH 16kWh",
    cat: "Pin lưu trữ",
    icon: "battery",
    brand: "ZETATECH",
    specs: "16kWh · 51.2V",
    price: 38000000,
    status: "Sắp hết",
  },
  {
    id: "SP-005",
    name: "Tủ điện NLMT 1 pha",
    cat: "Vật tư phụ",
    icon: "panelboard",
    brand: "Quang Thanh",
    specs: "ATS tự động",
    price: 3500000,
    status: "Còn hàng",
  },
  {
    id: "SP-006",
    name: "Dây cáp DC 4mm² (cuộn 100m)",
    cat: "Vật tư phụ",
    icon: "cable",
    brand: "Cadivi",
    specs: "4mm² · chống UV",
    price: 1850000,
    status: "Còn hàng",
  },
  {
    id: "SP-007",
    name: "Khung nhôm giá đỡ mái tôn",
    cat: "Vật tư phụ",
    icon: "frame",
    brand: "Quang Thanh",
    specs: "Bộ 10 tấm",
    price: 2200000,
    status: "Còn hàng",
  },
];

export const inventoryLocations = [
  "Tất cả kho",
  "Thủ Đức",
  "Nha Trang",
  "Bình Định",
];

export const inventoryItems: InventoryItem[] = [
  {
    id: 1,
    name: "Biến tần Hybrid SVE 6K Plus",
    stock: 14,
    unit: "cái",
    location: "Thủ Đức",
    low: false,
  },
  {
    id: 2,
    name: "Tấm pin AKIO 630W",
    stock: 6,
    unit: "tấm",
    location: "Thủ Đức",
    low: true,
  },
  {
    id: 3,
    name: "Pin Lithium ZETATECH 16kWh",
    stock: 3,
    unit: "bộ",
    location: "Nha Trang",
    low: true,
  },
  {
    id: 4,
    name: "Tủ điện NLMT 1 pha",
    stock: 22,
    unit: "cái",
    location: "Thủ Đức",
    low: false,
  },
  {
    id: 5,
    name: "Dây cáp DC 4mm²",
    stock: 8,
    unit: "cuộn",
    location: "Bình Định",
    low: true,
  },
  {
    id: 6,
    name: "Khung nhôm giá đỡ",
    stock: 40,
    unit: "bộ",
    location: "Nha Trang",
    low: false,
  },
];

export const stockLogs: StockLog[] = [
  {
    id: "PN-0087",
    type: "Nhập",
    item: "Tấm pin AKIO 630W",
    qty: 50,
    person: "Nguyễn Văn Tâm",
    project: "Kho tổng Thủ Đức",
    date: "24/07/2026",
  },
  {
    id: "PX-0212",
    type: "Xuất",
    item: "Biến tần Hybrid SVE 6K Plus",
    qty: 2,
    person: "Trần Minh Khoa",
    project: "Dự án nhà anh An - Q.7",
    date: "23/07/2026",
  },
  {
    id: "PX-0211",
    type: "Xuất",
    item: "Pin Lithium ZETATECH 16kWh",
    qty: 1,
    person: "Trần Minh Khoa",
    project: "Dự án Cty Minh Phát",
    date: "22/07/2026",
  },
  {
    id: "PN-0086",
    type: "Nhập",
    item: "Dây cáp DC 4mm²",
    qty: 30,
    person: "Lê Thị Hoa",
    project: "Kho Bình Định",
    date: "20/07/2026",
  },
  {
    id: "PX-0210",
    type: "Xuất",
    item: "Tủ điện NLMT 1 pha",
    qty: 3,
    person: "Nguyễn Văn Tâm",
    project: "Dự án Lê Hoàng Sơn",
    date: "18/07/2026",
  },
];

export const stockTypeColor: Record<string, StatusColors> = {
  "Nhập": { bg: "#D1FAE5", text: "#047857" },
  "Xuất": { bg: "#FFEDD5", text: "#C2410C" },
};

export const suppliers: Supplier[] = [
  {
    id: 1,
    name: "Axitec",
    category: "Tấm pin",
    contact: "Mr. Trung",
    phone: "090 111 2233",
    address: "Q.Tân Bình, TP.HCM",
  },
  {
    id: 2,
    name: "Sungrow",
    category: "Biến tần",
    contact: "Ms. Hằng",
    phone: "090 222 3344",
    address: "Q.2, TP.HCM",
  },
  {
    id: 3,
    name: "Luxpower",
    category: "Biến tần",
    contact: "Mr. Khải",
    phone: "090 333 4455",
    address: "Bình Dương",
  },
  {
    id: 4,
    name: "Zetatech",
    category: "Pin lưu trữ",
    contact: "Mr. Đức",
    phone: "090 444 5566",
    address: "Q.Thủ Đức, TP.HCM",
  },
  {
    id: 5,
    name: "AKIO",
    category: "Tấm pin",
    contact: "Ms. Lan",
    phone: "090 555 6677",
    address: "Đồng Nai",
  },
];

export const revenueByMonth = [
  { month: "T2", revenue: 620 },
  { month: "T3", revenue: 780 },
  { month: "T4", revenue: 540 },
  { month: "T5", revenue: 910 },
  { month: "T6", revenue: 1050 },
  { month: "T7", revenue: 1245 },
];

export const closeRateData = [
  { name: "Đã chốt", value: 42 },
  { name: "Đang chờ / khác", value: 58 },
];
