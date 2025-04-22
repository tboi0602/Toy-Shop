shop-management/
│
├── backend/               # Node.js server (API)
│   ├── controllers/       # Xử lý logic của từng chức năng
│   ├── models/            # Định nghĩa cấu trúc dữ liệu (MongoDB/MySQL)
│   ├── routes/            # Tạo các đường dẫn API
│   ├── config/            # Cấu hình DB, Kết nối DB
│   ├── server.js          # File khởi động server chính
│
├── frontend/              # ReactJS + TailwindCSS
│   ├── public/            # Static files (favicon, index.html,...)
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
