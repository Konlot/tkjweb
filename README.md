# TKJ ISP Command Center — Vercel + GitHub

Website toolkit teknisi TKJ/ISP dengan AI Assistant melalui OpenAI Responses API.

## Struktur
- `public/index.html` — frontend
- `api/chat.js` — Vercel Serverless Function yang memanggil OpenAI
- `package.json` — dependency
- `.env.example` — contoh environment variable

## Deploy lewat GitHub → Vercel

1. Buat repository GitHub baru, misalnya `tkj-isp-ai-command-center`.
2. Upload semua file/folder proyek ini ke repository.
3. Di Vercel pilih **Add New → Project → Import Git Repository**.
4. Pilih repository tersebut lalu Deploy.
5. Setelah project dibuat, buka **Settings → Environment Variables**.
6. Tambahkan:
   - Name: `OPENAI_API_KEY`
   - Value: API key OpenAI milikmu
   - Environment: Production (dan Preview jika memang ingin AI bekerja di preview)
7. Tambahkan `OPENAI_MODEL` dengan nilai `gpt-5.6-luna` bila ingin memakai model tersebut.
8. Redeploy setelah environment variable disimpan.

## Membuat website private

Untuk website pribadi/internal, gunakan Vercel Deployment Protection.

Pada Vercel saat ini, **Vercel Authentication** dapat melindungi semua deployment termasuk production pada semua plan. Pilih:
**Project → Settings → Security → Deployment Protection → Vercel Authentication → All Deployments**.

Dengan pengaturan ini, pengunjung harus login dengan akun Vercel yang memiliki akses ke project. Jangan memberikan akses project kepada orang yang tidak ingin kamu izinkan.

Catatan: Password Protection adalah fitur berbeda dan ketersediaannya/biayanya bergantung pada plan. Vercel Authentication adalah pilihan yang lebih cocok untuk website pribadi milikmu.

## Keamanan API
Jangan pernah menaruh `OPENAI_API_KEY` di `public/index.html`, JavaScript browser, atau repository GitHub.

API key hanya dibaca oleh `api/chat.js` melalui `process.env.OPENAI_API_KEY`.

## Penting soal biaya
Semua chat yang berhasil melewati backend akan menggunakan API key milikmu dan dapat menimbulkan biaya API. Karena itu:
- aktifkan Deployment Protection;
- jangan membagikan URL/proyek kepada orang yang tidak diberi akses;
- batasi panjang input (sudah ada 4000 karakter);
- pantau penggunaan API;
- bila nanti dibuka untuk banyak orang, tambahkan autentikasi aplikasi + rate limiting berbasis database/Redis sebelum menjadikannya publik.

## Git
Setelah upload ke GitHub, setiap push ke branch production yang terhubung akan dapat memicu deployment baru di Vercel.
