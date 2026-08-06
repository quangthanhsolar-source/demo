export type QuoteItem = {
  id: number;
  title: string;
  icon: string;
  specs: string[];
  sl: number;
  donGia: number;
  linked: boolean;
};

export type Quotation = {
  id: string;
  customer: string;
  phone: string;
  total: number;
  date: string;
  status: "Đang chờ" | "Đã chốt" | "Đã hủy";
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  address: string;
  system: string;
  care: "Mới" | "Đã tư vấn" | "Khảo sát" | "Đã ký hợp đồng";
};

export type Equipment = {
  id: string;
  name: string;
  cat: string;
  icon: string;
  brand: string;
  specs: string;
  price: number;
  status: string;
};

export type InventoryItem = {
  id: number;
  name: string;
  stock: number;
  unit: string;
  location: string;
  low: boolean;
};

export type StockLog = {
  id: string;
  type: "Nhập" | "Xuất";
  item: string;
  qty: number;
  person: string;
  project: string;
  date: string;
};

export type Supplier = {
  id: number;
  name: string;
  category: string;
  contact: string;
  phone: string;
  address: string;
};

export type StatusColors = { bg: string; text: string };
