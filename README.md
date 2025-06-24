# Bitrix24 Frontend - ReactJS + Vite

Đây là frontend của ứng dụng kết nối với Bitrix24, được phát triển bằng ReactJS sử dụng Vite.

---

## 1. Yêu cầu hệ thống

- Node.js 20+  
- npm hoặc yarn 

---

## 2. Clone project

```bash
git clone <URL_REPO_FRONTEND>
cd frontend
```
## 3. Cấu hình môi trường

Trước khi chạy dự án, bạn cần tạo file .env tại thư mục gốc của frontend:

frontend/.env

Nội dung mẫu .env:
```
VITE_APP_NAME="Bitrix24App"
VITE_FRONTEND_PORT=5174

VITE_API_URL= # your backend API URL exposed to ngrok
# e.g. https://kangaroo-cute-halibut.ngrok-free.app

VITE_DOMAIN= # your Bitrix24 domain
# e.g. https://duyphong.bitrix24.vn

VITE_CLIENT_ID= # your Bitrix24 client ID
# e.g. local.xxxxxxx.xxxxxxx
```
Lưu ý: Đảm bảo backend đã được khởi động và ngrok đang chạy để frontend có thể kết nối qua VITE_API_URL.

## 4. Cài đặt dependencies
cho `npm`
```
npm install
```
hoặc cho `yarn`
```
yarn
```

## 5. Chạy ứng dụng
cho `npm`
```
npm run dev
```
hoặc cho `yarn`
```
yarn dev
```
Ứng dụng sẽ chạy tại:

http://localhost:5174

## 6. Sử dụng ứng dụng

    Truy cập địa chỉ: http://localhost:5174

    Giao diện người dùng sẽ thực hiện xác thực và gọi API đến backend đang chạy qua địa chỉ VITE_API_URL.

## 7. Ghi chú

    Đảm bảo frontend và backend đang chạy trên các port khớp với file .env và application.yml.

    Nếu gặp lỗi CORS, kiểm tra cấu hình trên backend để đảm bảo đã bật CORS cho origin của frontend.

## 8. Liên hệ

Mọi thắc mắc hoặc lỗi phát sinh, vui lòng liên hệ qua email khi nộp bài: phongpd109.work@gmail.com
