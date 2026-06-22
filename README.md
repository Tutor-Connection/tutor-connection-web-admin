# TutorMatch Admin Workspace

TutorMatch Admin là hệ thống trung tâm quản trị toàn diện dành cho nền tảng gia sư trực tuyến TutorMatch. Dự án này được thiết kế với giao diện bảng điều khiển (Dashboard) kết hợp cùng hệ thống quản lý chuyên sâu (Console), mang lại trải nghiệm tối ưu cho đội ngũ Admin xử lý các nghiệp vụ cốt lõi.

## Công nghệ sử dụng (Tech Stack)
- **Framework:** React 19 + Vite
- **Ngôn ngữ:** TypeScript
- **CSS Framework:** TailwindCSS v4
- **Thư viện Icon:** Lucide React
- **Biểu đồ (Charts):** Recharts
- **Hoạt ảnh (Animation):** Framer Motion

## Cấu trúc thư mục dự án

Hệ thống mã nguồn được tổ chức theo cấu trúc tiêu chuẩn của một dự án React:

```text
tutormatch-admin/
├── src/
│   ├── components/            # Các View chức năng và Component tái sử dụng
│   │   ├── Sidebar.tsx        # Cột điều hướng chính tích hợp Console & Admin
│   │   ├── DashboardView.tsx  # Bảng điều khiển tổng quan
│   │   ├── PostManagement.tsx # Quản lý yêu cầu/bài đăng
│   │   ├── ...                # (Và hàng loạt component nghiệp vụ khác)
│   ├── data/
│   │   └── mockData.ts        # Cơ sở dữ liệu mẫu cho toàn bộ hệ thống
│   ├── App.tsx                # File trung tâm, xử lý Routing & State nội bộ
│   ├── types.ts               # Định nghĩa Data Models (Interfaces) bằng TS
│   ├── index.css              # File CSS chứa cấu hình Tailwind & Font
│   └── main.tsx               # Điểm khởi chạy của ứng dụng (Entry Point)
├── package.json               # Cấu hình dự án và dependencies
└── vite.config.ts             # Cấu hình Vite bundler
```

## Tính năng chính (Key Features)

Dự án là sự hợp nhất mạnh mẽ giữa 2 khối tính năng: **Tiện ích Hệ thống (Admin Core)** và **Bảng Chuyên môn (Admin Console)**:

### 1. Bảng Chuyên môn (Console Features)
- **Quản lý Bài đăng:** Duyệt, từ chối và theo dõi trạng thái các yêu cầu tìm gia sư.
- **Kiểm duyệt Nội dung:** Hệ thống rà soát tự động nhận diện từ khoá nhạy cảm, số điện thoại, đường link quảng cáo sai quy định.
- **Quản lý Đánh giá (Reviews):** Theo dõi nhận xét của học viên, đánh cờ (flag) các đánh giá có dấu hiệu spam hoặc công kích cá nhân.
- **Quản lý Lớp học:** Quản lý vòng đời của lớp học (Đang mở, Dạy thử, Hoàn thành, Huỷ bỏ).
- **Quản lý Doanh thu:** Kiểm soát các khoản hoa hồng thanh toán từ Gia sư (Pending, Paid, Overdue).
- **Quản lý Thông báo:** Xử lý và thống kê độ tương tác của các chiến dịch thông báo toàn hệ thống.

### 2. Tiện ích Hệ thống (Admin Core)
- **Dashboard Tổng quan:** Biểu đồ hoạt động và dữ liệu tăng trưởng.
- **Quản lý Người dùng & KYC:** Duyệt hồ sơ giấy tờ từ gia sư (CCCD, Thẻ sinh viên, Bằng cấp) để kích hoạt trạng thái tài khoản.
- **Hỗ trợ Người dùng (Tickets):** Xử lý khiếu nại và các vấn đề phát sinh.

## Hướng dẫn Cài đặt & Khởi chạy

**Yêu cầu hệ thống:**
- Node.js (phiên bản khuyến nghị >= 18.x)

**Các bước cài đặt:**

1. **Mở terminal tại thư mục gốc của dự án (`tutormatch-admin`)**
2. **Cài đặt các gói phụ thuộc (Dependencies):**
   ```bash
   npm install
   ```
3. **Khởi chạy môi trường phát triển (Development Server):**
   ```bash
   npm run dev
   ```
   *Ứng dụng sẽ chạy tại địa chỉ http://localhost:3000 (hoặc cổng có sẵn trên máy).*

## Hướng dẫn Kiến trúc dữ liệu

Hiện tại ứng dụng sử dụng bộ dữ liệu mẫu (Mock Data) đặt tại `src/data/mockData.ts`. Tất cả State được quản lý cục bộ tại `App.tsx` bằng `useState`, các component con nhận data thông qua dạng props từ `App.tsx`.

Nếu bạn muốn thay thế bằng API thật trong tương lai, hãy chuyển đổi các lệnh `useState` thành các truy vấn gọi API (như fetch/axios) tương ứng trên Component.
