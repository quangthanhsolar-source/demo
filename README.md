# Quang Thanh Solar ERP

Hệ thống quản lý báo giá NLMT (Next.js App Router) — tách từ prototype SolarERP một file.

## Chạy dự án

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) — App Router với design lime/ink (mobile-first).

Tài khoản demo:

- Email: `admin@quangthanhsolar.com`
- Mật khẩu: `admin123`

Prototype HTML tham chiếu: [`public/erp.html`](public/erp.html).

Auth hiện dùng cookie tạm (`solar_auth`), chưa có backend thật.

## Cấu trúc

```
src/
  app/
    login/page.tsx
    dashboard/
      page.tsx
      bao-gia/tao/page.tsx
      bao-gia/danh-sach/page.tsx
      khach-hang/page.tsx
      thiet-bi/page.tsx
      kho/ton-kho/page.tsx
      kho/nhap-xuat/page.tsx
      kho/nha-cung-cap/page.tsx
      bao-cao/page.tsx
    api/auth/login|logout
  components/pages/   # UI từng trang
  components/layout/  # Sidebar
  components/ui/      # Card, Modal, Badge...
  lib/                # tokens, mock data, helpers, auth
  proxy.ts            # bảo vệ /dashboard
```

## Routes

| URL | Trang |
|---|---|
| `/login` | Đăng nhập |
| `/dashboard` | Dashboard |
| `/dashboard/bao-gia/tao` | Tạo báo giá |
| `/dashboard/bao-gia/danh-sach` | Danh sách báo giá |
| `/dashboard/khach-hang` | Khách hàng |
| `/dashboard/thiet-bi` | Thiết bị |
| `/dashboard/kho/ton-kho` | Tồn kho |
| `/dashboard/kho/nhap-xuat` | Nhập/Xuất kho |
| `/dashboard/kho/nha-cung-cap` | Nhà cung cấp |
| `/dashboard/bao-cao` | Báo cáo |

## Tiếp theo

- Nối database/API thật thay mock data trong `src/lib/mock-data.ts`
- Thay auth cookie cứng bằng auth backend thật
