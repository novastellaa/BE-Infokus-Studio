---

# Backend Website Reservasi Infokus Studio

Backend untuk aplikasi reservasi foto studio di Infokus Studio yang terletak di Purwokerto, dibuat menggunakan Express.js dan MySQL database. Proyek ini memungkinkan pengelolaan jadwal, layanan, dan reservasi studio foto secara efisien.
Website dapat dilihat di [sini](https://www.infokus.my.id/)

## 📋 Fitur

- **Manajemen User**: Sistem login dan registrasi untuk pelanggan dan admin.
- **Reservasi**: Pelanggan dapat membuat, melihat, dan membatalkan reservasi.
- **Keamanan**: Autentikasi menggunakan JSON Web Token (JWT).
- **Database Relasional**: MySQL sebagai penyimpanan data.

## 🔍 Dokumentasi API

Dokuemetasi di publikasi menggunakan Postman Documentation, dapat dilihat di link berikut: 
[Dokumentasi Infokus Studio](https://documenter.getpostman.com/view/29673433/2sAYQWKDhv)

## ⚙️ Teknologi yang Digunakan

- **Node.js**: Platform server-side.
- **Express.js**: Framework backend.
- **MySQL**: Database relasional.
- **Sequelize**: ORM untuk MySQL.
- **JWT**: Untuk autentikasi.
- **dotenv**: Untuk manajemen konfigurasi.

## 🚀 Instalasi dan Pengaturan

1. **Clone Repository**

   ```bash
   git clone https://github.com/username/project-name.git
   cd project-name
   ```

2. **Instal Dependensi**

   Jalankan perintah berikut untuk menginstal semua dependensi:
   ```bash
   npm install
   ```

3. **Konfigurasi Lingkungan**

   Buat file `.env` di root proyek dan tambahkan konfigurasi berikut:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=fotostudio
   JWT_SECRET=your_jwt_secret
   ```

4. **Setup Database**

   Buat database MySQL menggunakan nama yang telah ditentukan di file `.env` (`DB_NAME`), lalu jalankan migrasi:
   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Jalankan Server**

   Jalankan server menggunakan perintah berikut:
   ```bash
   npm start
   ```
   Server akan berjalan di `http://localhost:3000`.

## 🛠️ API Endpoints

Berikut adalah beberapa endpoint utama yang tersedia:

### **Authentication**
- `POST /api/auth/register`: Mendaftarkan user baru.
- `POST /api/auth/login`: Login user.

### **Reservation**
- `GET /api/reservations`: Mendapatkan semua reservasi (admin).
- `POST /api/reservations`: Membuat reservasi baru.
- `DELETE /api/reservations/:id`: Membatalkan reservasi.


## 🛡️ Keamanan

Proyek ini menggunakan:
- **JWT** untuk otentikasi.

---

Jika Anda memiliki pertanyaan atau masukan, jangan ragu untuk menghubungi saya melalui [novastella210@gmail.com](mailto:nocastella210@gmail.com). 😊

--- 
