# LamarLog — Product Requirements Document

## 1. Ringkasan Produk

LamarLog adalah aplikasi web pribadi milik Muhammad Wahyu Pratama untuk mencatat, mengatur, dan memantau seluruh proses lamaran pekerjaan.

Aplikasi ini membantu pengguna mengetahui:

- Perusahaan dan posisi apa saja yang sudah dilamar.
- Lamaran mana yang masih menunggu respons.
- Lamaran mana yang sudah masuk tahap interview atau technical test.
- Kapan harus melakukan follow-up.
- Riwayat perkembangan setiap lamaran.

Aplikasi menggunakan backend dan database agar data dapat diakses dari berbagai device seperti laptop dan HP.

## 2. Tujuan Produk

### Tujuan utama

Membuat proses job hunting lebih terstruktur, mudah dipantau, dan tidak ada lamaran penting yang terlupakan.

### Tujuan teknis

- Membuat aplikasi full-stack yang benar-benar digunakan sehari-hari.
- Menerapkan autentikasi dan ownership data.
- Melatih React, Express.js, Sequelize, PostgreSQL, REST API, testing, dan deployment.
- Menyediakan fondasi yang dapat dikembangkan menjadi aplikasi multi-user di masa depan.

## 3. Target Pengguna

### MVP

Satu pengguna utama: Muhammad Wahyu Pratama.

Walaupun hanya digunakan oleh satu orang, setiap data tetap terhubung ke `user_id` agar keamanan dan struktur aplikasinya baik.

## 4. Teknologi yang Digunakan

## 4.1 Repositori

Project dipisahkan menjadi dua repositori private:

| Repository | Fungsi | Visibility |
|---|---|---|
| `lamarlog-web` | Frontend React | Private |
| `lamarlog-api` | Backend Express dan PostgreSQL integration | Private |

Kedua repository tidak dibuka untuk publik karena LamarLog memuat data job hunting dan informasi kontak pribadi pengguna.

## 4.2 Frontend — `lamarlog-web`

- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Fetch API

## 4.3 Backend — `lamarlog-api`

- Node.js
- Express.js
- Sequelize ORM
- JWT authentication
- Bcrypt untuk hashing password

## 4.4 Database dan deployment

- PostgreSQL
- Database migration menggunakan Sequelize CLI
- Frontend di-deploy ke Vercel
- Backend di-deploy ke layanan cloud yang mendukung Node.js
- PostgreSQL di-deploy ke layanan database cloud

## 5. Ruang Lingkup MVP

### Termasuk dalam MVP

1. Register akun.
2. Login dan logout.
3. Menampilkan dashboard ringkasan lamaran.
4. Menambah data lamaran pekerjaan.
5. Melihat daftar lamaran.
6. Melihat detail lamaran.
7. Mengubah data lamaran.
8. Menghapus lamaran.
9. Mengubah status lamaran.
10. Mencatat riwayat perubahan status.
11. Search berdasarkan nama perusahaan atau posisi.
12. Filter berdasarkan status.
13. Filter berdasarkan tanggal follow-up.
14. Menambahkan catatan pribadi.
15. Menampilkan lamaran yang perlu di-follow-up.

### Tidak termasuk dalam MVP

- Email reminder otomatis.
- Upload CV atau dokumen.
- Integrasi LinkedIn, Glints, Jobstreet, atau platform lainnya.
- Sinkronisasi kalender.
- Multi-user collaboration.
- Notifikasi push.
- Import otomatis dari email.
- Analisis AI terhadap lowongan pekerjaan.

## 6. Status Lamaran

Status yang tersedia:

1. `APPLIED` — Lamaran baru dikirim.
2. `SCREENING` — Sedang dalam tahap screening HR.
3. `INTERVIEW` — Sudah masuk tahap interview.
4. `TECHNICAL_TEST` — Mendapatkan technical test atau assignment.
5. `USER_INTERVIEW` — Interview dengan user atau hiring manager.
6. `OFFER` — Mendapatkan offering.
7. `ACCEPTED` — Lamaran diterima dan pekerjaan diambil.
8. `REJECTED` — Lamaran ditolak.
9. `WITHDRAWN` — Lamaran dibatalkan atau tidak dilanjutkan oleh pengguna.

## 7. User Flow

### Authentication flow

```text
Register → Login → Dashboard
                 ↓
               Logout
```

### Lamaran flow

```text
Tambah Lamaran → APPLIED → SCREENING → INTERVIEW
                                      ↓
                              TECHNICAL_TEST
                                      ↓
                              USER_INTERVIEW
                                      ↓
                         OFFER / ACCEPTED / REJECTED
```

### Follow-up flow

```text
Tambah tanggal follow-up
          ↓
Muncul di daftar "Perlu Follow-up"
          ↓
Pengguna menghubungi recruiter
          ↓
Update status atau tanggal follow-up berikutnya
```

## 8. Halaman Aplikasi

### 8.1 Register

Field:

- Nama.
- Email.
- Password.
- Konfirmasi password.

Validasi:

- Nama wajib diisi.
- Email harus valid dan unik.
- Password minimal 8 karakter.
- Konfirmasi password harus sama.

### 8.2 Login

Field:

- Email.
- Password.

Fitur:

- Menampilkan pesan error jika kredensial salah.
- Redirect ke dashboard setelah berhasil login.
- Redirect ke login jika token tidak valid atau sudah expired.

### 8.3 Dashboard

Menampilkan:

- Total seluruh lamaran.
- Jumlah lamaran aktif.
- Jumlah lamaran yang sedang interview.
- Jumlah lamaran yang memerlukan follow-up.
- Jumlah lamaran diterima.
- Jumlah lamaran ditolak.
- Daftar follow-up terdekat.
- Daftar lamaran terbaru.

### 8.4 Daftar Lamaran

Fitur:

- Menampilkan semua lamaran milik pengguna.
- Search perusahaan atau posisi.
- Filter status.
- Filter tanggal follow-up.
- Sorting berdasarkan tanggal apply atau update terakhir.
- Tombol tambah lamaran.
- Tombol lihat detail, edit, dan hapus.

### 8.5 Tambah Lamaran

Field utama:

- Nama perusahaan — wajib.
- Posisi — wajib.
- Lokasi.
- Tipe kerja: `WFO`, `WFH`, atau `HYBRID`.
- Sumber lowongan: LinkedIn, Jobstreet, Glints, website perusahaan, referral, atau lainnya.
- URL lowongan.
- Tanggal apply — wajib.
- Status — default `APPLIED`.
- Rentang gaji.
- Nama kontak atau recruiter.
- Email kontak.
- Tanggal follow-up berikutnya.
- Catatan.

### 8.6 Detail Lamaran

Menampilkan:

- Seluruh informasi lamaran.
- Status saat ini.
- Riwayat perubahan status.
- Catatan.
- Tanggal follow-up berikutnya.
- Waktu terakhir data diperbarui.

Action:

- Edit lamaran.
- Ubah status.
- Tambah catatan.
- Tandai follow-up sudah dilakukan.
- Hapus lamaran.

## 9. Struktur Data

### 9.1 Tabel `users`

| Field | Tipe | Keterangan |
|---|---|---|
| id | UUID / integer | Primary key |
| name | varchar | Nama pengguna |
| email | varchar | Email unik |
| password_hash | varchar | Password yang sudah di-hash |
| created_at | timestamp | Waktu dibuat |
| updated_at | timestamp | Waktu diperbarui |

### 9.2 Tabel `job_applications`

| Field | Tipe | Keterangan |
|---|---|---|
| id | UUID / integer | Primary key |
| user_id | UUID / integer | Foreign key ke `users` |
| company_name | varchar | Nama perusahaan |
| job_title | varchar | Nama posisi |
| location | varchar nullable | Lokasi pekerjaan |
| work_type | enum | WFO, WFH, atau HYBRID |
| source | varchar nullable | Sumber lowongan |
| application_url | text nullable | Link lowongan |
| applied_at | date | Tanggal melamar |
| status | enum | Status lamaran |
| salary_range | varchar nullable | Rentang gaji |
| contact_name | varchar nullable | Nama recruiter/kontak |
| contact_email | varchar nullable | Email recruiter |
| next_follow_up_at | date nullable | Jadwal follow-up |
| notes | text nullable | Catatan pengguna |
| created_at | timestamp | Waktu dibuat |
| updated_at | timestamp | Waktu diperbarui |

### 9.3 Tabel `application_status_histories`

| Field | Tipe | Keterangan |
|---|---|---|
| id | UUID / integer | Primary key |
| application_id | UUID / integer | Foreign key ke `job_applications` |
| old_status | enum nullable | Status sebelumnya |
| new_status | enum | Status baru |
| note | text nullable | Catatan perubahan |
| created_at | timestamp | Waktu perubahan |

Relasi:

```text
users 1 ──── * job_applications
job_applications 1 ──── * application_status_histories
```

## 10. Rancangan API MVP

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Job applications

```text
POST   /api/applications
GET    /api/applications
GET    /api/applications/:id
PATCH  /api/applications/:id
DELETE /api/applications/:id
```

### Status history

```text
GET  /api/applications/:id/history
POST /api/applications/:id/status
```

### Dashboard

```text
GET /api/dashboard/summary
GET /api/dashboard/follow-ups
```

Semua endpoint aplikasi dan dashboard wajib menggunakan authentication middleware serta hanya boleh mengakses data milik user yang sedang login.

## 11. Aturan Bisnis

1. Email pengguna harus unik.
2. Password tidak boleh disimpan dalam bentuk plain text.
3. Setiap lamaran harus memiliki perusahaan, posisi, tanggal apply, dan status.
4. Status awal lamaran adalah `APPLIED`.
5. Setiap perubahan status harus dicatat ke `application_status_histories`.
6. Pengguna hanya boleh melihat, mengubah, dan menghapus lamaran miliknya sendiri.
7. Lamaran dengan status `ACCEPTED`, `REJECTED`, atau `WITHDRAWN` dianggap tidak aktif.
8. Follow-up yang tanggalnya sama dengan hari ini masuk kategori “Follow-up Hari Ini”.
9. Follow-up yang tanggalnya sudah lewat masuk kategori “Terlambat Di-follow-up”.
10. Menghapus lamaran harus meminta konfirmasi pengguna.

## 12. Non-Functional Requirements

- Responsive untuk desktop dan mobile.
- UI sederhana, bersih, dan mudah dibaca.
- API mengembalikan response JSON yang konsisten.
- Password di-hash menggunakan Bcrypt.
- Endpoint privat dilindungi authentication middleware.
- Validasi input dilakukan di backend dan frontend.
- Error dari API ditampilkan dengan pesan yang mudah dipahami.
- Database menggunakan migration.
- Environment variable digunakan untuk secret dan konfigurasi database.
- Aplikasi dapat dijalankan secara lokal menggunakan Docker PostgreSQL.
- Project memiliki README dan dokumentasi endpoint.
- Fitur inti memiliki unit test atau integration test.

## 13. Acceptance Criteria MVP

MVP dianggap selesai jika:

1. Pengguna dapat membuat akun.
2. Pengguna dapat login dan logout.
3. Pengguna dapat membuka aplikasi dari device berbeda dan melihat data yang sama.
4. Pengguna dapat menambahkan lamaran baru.
5. Lamaran baru otomatis memiliki status `APPLIED` jika status tidak dipilih.
6. Pengguna dapat mengedit dan menghapus lamaran.
7. Pengguna dapat mengubah status lamaran.
8. Riwayat perubahan status tersimpan dan tampil di halaman detail.
9. Pengguna dapat mencari lamaran berdasarkan perusahaan atau posisi.
10. Pengguna dapat memfilter lamaran berdasarkan status.
11. Dashboard menampilkan statistik yang sesuai dengan data database.
12. Dashboard menampilkan daftar follow-up hari ini dan follow-up yang terlambat.
13. User tidak dapat mengakses data user lain melalui URL atau API.
14. Aplikasi dapat di-deploy dan diakses melalui URL publik.

## 14. Tahapan Pengerjaan

### Phase 1 — Project setup

- Setup frontend dan backend.
- Setup PostgreSQL dengan Docker.
- Setup Sequelize.
- Setup environment variable.
- Setup struktur folder.
- Setup linting dan basic error handler.

### Phase 2 — Authentication

- Migration dan model `users`.
- Register.
- Login.
- Logout.
- Authentication middleware.
- Endpoint `me`.
- Protected route frontend.

### Phase 3 — Job applications

- Migration dan model `job_applications`.
- Create application.
- List application.
- Detail application.
- Update application.
- Delete application.
- Search dan filter.

### Phase 4 — Status history dan dashboard

- Migration dan model `application_status_histories`.
- Update status beserta riwayat.
- Dashboard summary.
- Follow-up list.

### Phase 5 — UI polish dan testing

- Responsive layout.
- Loading state.
- Empty state.
- Error state.
- Toast notification.
- Backend testing.
- Frontend flow testing.

### Phase 6 — Deployment

- Deploy database.
- Deploy backend API.
- Deploy frontend.
- Set environment variables production.
- CORS production.
- Test login dan CRUD dari device berbeda.

## 15. Pengembangan Setelah MVP

Fitur yang dapat ditambahkan setelah MVP stabil:

- Reminder melalui email atau push notification.
- Upload CV dan dokumen pendukung.
- Template catatan interview.
- Kalender interview.
- Statistik conversion rate lamaran ke interview.
- Export ke CSV atau PDF.
- Dark mode.
- PWA agar dapat di-install di HP.

## 16. Keputusan Produk

Versi pertama menggunakan backend dan PostgreSQL karena kebutuhan utama adalah sinkronisasi data lintas device. Aplikasi tetap dibuat sederhana dan personal, tetapi struktur `user_id`, autentikasi, dan ownership data diterapkan sejak awal agar data aman serta project mudah dikembangkan.
