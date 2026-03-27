# 🛒 FizhStore - Pokémon E-Commerce Platform

**FizhStore** là một ứng dụng thương mại điện tử full-stack hiện đại, cho phép người dùng khám phá và mua sắm các sản phẩm lấy cảm hứng từ thế giới Pokémon. Dự án được xây dựng nhằm tối ưu hóa việc quản lý kho hàng (Stock), hệ thống danh mục linh hoạt và trải nghiệm mua sắm mượt mà.

---

## 🚀 Tính năng chính

### 👤 Đối với Người dùng (Customer)
* **Duyệt sản phẩm:** Xem danh sách Pokémon với hình ảnh chất lượng cao và mô tả chi tiết.
* **Giỏ hàng (Cart):** Thêm, xóa, tăng/giảm số lượng sản phẩm. Dữ liệu được đồng bộ hóa với `LocalStorage`.
* **Kiểm soát tồn kho:** Tự động chặn hoặc cảnh báo khi người dùng chọn số lượng vượt quá mức `stock` hiện có.
* **Thanh toán (Checkout):** Đặt hàng an toàn, tích hợp xử lý gửi dữ liệu sang Backend.

### 🛠️ Đối với Quản trị viên (Admin)
* **Quản lý Sản phẩm:** CRUD (Thêm, Sửa, Xóa) sản phẩm. Hỗ trợ cập nhật số lượng tồn kho và mô tả chi tiết.
* **Quản lý Danh mục:** CRUD danh mục Pokémon (Hệ Electric, Water, Ghost...).
* **Bảo mật:** Tích hợp **Spring Security** để bảo vệ các route `/api/admin/**`.

---

## 🏗️ Kiến trúc Công nghệ

### **Backend (Java Spring Boot)**
* **Framework:** Spring Boot 3.x
* **Security:** Spring Security & JWT/Session
* **Database Access:** Spring Data JPA (Hibernate)
* **API:** RESTful Web Services (JSON)
* **Validation:** Xử lý lỗi `HttpMessageNotReadableException` cho các trường dữ liệu nguyên thủy.

### **Frontend (React.js)**
* **Build Tool:** Vite
* **UI Framework:** React Bootstrap 5
* **HTTP Client:** Axios (kết nối API)
* **State Management:** React Hooks (`useState`, `useEffect`)

### **Database**
* **Engine:** MySQL 8.0
* **Model:** Quan hệ một-nhiều (1-N) giữa `Category` và `Product`.

---

## 📦 Hướng dẫn Cài đặt & Chạy dự án

### 1. Cấu hình Backend
1. Đảm bảo đã cài đặt **JDK 17+** và **MySQL**.
2. Tạo Database:
   ```sql
   CREATE DATABASE fizhstore;
   ```
3. Cấu hình file `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/fizhstore
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update

   # Cho phép nạp giá trị null vào kiểu dữ liệu int/double cơ bản
   spring.jackson.deserialization.fail-on-null-for-primitives=false
   ```
4. Chạy ứng dụng: `./mvnw spring-boot:run` hoặc chạy file main trong IDE.

### 2. Cấu hình Frontend
1. Truy cập thư mục frontend: `cd client`
2. Cài đặt thư viện:
   ```bash
   npm install
   ```
3. Chạy dự án:
   ```bash
   npm run dev
   ```

---

## 🧪 Dữ liệu mẫu (SQL)

Sau khi khởi động Backend, chạy file `database_sample.sql` để nạp dữ liệu mẫu vào database:

```bash
mysql -u your_username -p fizhstore < database_sample.sql
```

File bao gồm dữ liệu mẫu cho: roles, users và products (Gengar, Pikachu, Mimikyu, Charizard, Kyogre...).

---

## 🤝 Liên hệ & Đóng góp

Dự án được phát triển bởi **HE194009**. Mọi đóng góp vui lòng tạo Pull Request hoặc liên hệ qua Github.
