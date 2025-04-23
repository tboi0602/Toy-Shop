shop-management/
│
├── backend/               # Node.js server (API)
│   ├── controllers/       # Xử lý logic của từng chức năng từ yêu cầu của routes
│   ├── routes/            # Tạo các đường dẫn API
│   ├── config/            # Cấu hình DB, Kết nối DB
│   ├── model/            # Xử lý dữ liệu DTB ( thêm sữa xóa). Dữ liệu từ controllers gửi đến
│   ├── server.js          # File khởi động server chính
│
├── frontend/              # ReactJS + TailwindCSS
│   ├── public/            # Static files (favicon, index.html,...)
│   │   ├── upload/        # Dùng để lưu ảnh khi user upload lên
│   ├── src/
│   │   ├── assets/        # Ảnh, icon,...
│   │   ├── components/    # Các component tái sử dụng
│   │   ├── pages/         # Các trang như Dashboard, ProductPage,...
│   │   ├── layouts/       # Layout tổng, layout admin,... Như các Menu, footer, header các thứ
│   │   ├── services/      # Gọi API (axios instance, gọi API product/user,...)
│   │   ├── App.jsx        # File App chính, khởi động thì file này chạy đầu tiên. 
│   │   ├── main.jsx       # Đừng đụng dô
│   │   └── index.css      # TailwindCSS chính
│
├── package.json           # Cấu hình chung, không đụng
├── README.md              # Mô tả dự án
