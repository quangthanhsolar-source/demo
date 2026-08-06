# Quang Thanh Solar ERP

Hệ thống quản lý báo giá NLMT (Next.js App Router) — tách từ prototype SolarERP một file.

## Chạy dự án

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Deploy Vercel (tránh 404 NOT_FOUND)

Cấu trúc bắt buộc (đã đúng trong repo này):

- `package.json` ở **root** repo (không nằm trong thư mục con)
- App Router nằm ở **`src/app/`** (không phải `app/` ở root)
- Trang chủ: `src/app/page.tsx`

Trong Vercel Project Settings:

1. **Root Directory**: để trống / `.` (không đặt `src`, `app`, hay thư mục con khác)
2. **Framework Preset**: Next.js
3. **Production Branch**: `main`
4. Redeploy sau khi merge code mới

Nếu vẫn thấy `404 NOT_FOUND` kiểu trang trắng của Vercel: thường là Root Directory sai hoặc URL deployment cũ — vào Deployments → Redeploy bản mới nhất.

## Tài khoản test

- Email: `admin@baoduy.com`
- Mật khẩu: `admin123`

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
