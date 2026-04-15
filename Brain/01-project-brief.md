# Project Brief: ImanifestApp – AI-Powered Spiritual Productivity Platform

**Version:** 1.0  
**Status:** Final — Ready for Development  
**Stack:** Turborepo + Expo (mobile-web) + NestJS + PostgreSQL + Zhipu GLM-5 + Quran Foundation API

---

## Problem Statement

Muslims who want to align their daily goals and intentions with their faith have no structured tool to do so. Existing productivity apps are entirely secular. Existing Islamic apps are devotional-only — they don't help users translate spiritual intentions into actionable steps.

The result: people make duas without follow-through, set goals without grounding them in Quranic guidance, and have no way to track the connection between their spiritual state and their daily actions.

## The Founder's Story (Project Inspiration)

Proyek ini lahir dari pengalaman pribadi sang pendiri yang baru saja kehilangan pekerjaan, kehilangan banyak materi, dan sedang berjuang mencari pekerjaan baru untuk menopang cicilan. Di tengah masa-masa berat ini, muncul keinginan membangun bisnis sambil terus berikhtiar dan ber-husnudzon kepada Allah.

ImanifestApp dibangun untuk memotivasi diri sendiri—mendapatkan ketenangan lewat ayat Al-Qur'an, menata ulang mimpi (seperti "*menghasilkan $10.000/bulan untuk melunasi cicilan, membangun masjid, dan TPA*"), serta membuktikan bahwa teknologi AI bisa menjadi teman spiritual yang nyata di saat sedih. Karena aplikasi ini terbukti menenangkan hati pembuatnya, aplikasi ini kini dibagikan agar bisa membantu jutaan pengguna lain yang juga sedang berada di titik terendah mereka.

---

## Technical Solution

A spiritual productivity platform with 4 core features:

### Feature 1: Niyyah & Syukur Board (ImanSync)
- **Konsep:** Evolusi dari Vision Board. Pengguna memasukkan foto impian (Niyyah) atau masalah mereka. Sebelum bisa melihat progres hariannya, pengguna diwajibkan menulis 3 hal yang disyukuri hari itu (Gratitude Journal).
- **Proses:** AI memvalidasi niat tersebut dengan menyuguhkan ayat-ayat API Al-Qur'an yang relevan di halaman muka (Dipersonalisasi).

### Feature 2: Dua-to-Do & Manifestation Tracker
- **Konsep:** AI mengubah masalah atau impian pengguna dari "Niyyah Board" menjadi *to-do list* yang terarah secara fisik dan spiritual.
- **Progres & Waktu Mustajab:** *To-do list* ini meminta pengguna untuk berdoa/membaca ayat di "Waktu Mustajab" (misal: 1/3 malam terakhir). 
- **Manifestation Tracker:** Pengguna bisa melacak jika di bulan-bulan mendatang impian mereka seperti "$10.000/bulannya" sudah terwujud, dan sistem akan menyimpan ini sebagai riwayat perjalanan spiritual mereka.

### Feature 3: HeartPulse (Voice Spiritual Companion)
- **Konsep:** Fitur interaktif dua arah. Jika pengguna sedang banyak beban pikiran, mereka bebas **berbicara (curhat lewat suara)** ke dalam aplikasi.
- **Respons 2 Lapis AI:** 
  1. AI membalas dengan mengutip langsung sabda dari **API Hadis dan Al-Qur'an (quran.com)**.
  2. Selain ayat/hadis, AI memberikan **penjelasan yang logis dan solutif (masuk akal)** tentang bagaimana mengimplementasikan ayat tersebut dalam konteks permasalahan pengguna hari itu.

### Feature 4: SakinahStream (Guided Tafakkur Audio)
- **Konsep:** Integrasi dari Audio API Al-Qur'an namun diformat mirip audio hipnosis/relaksasi aplikasi sekuler.
- **Proses:** Memadukan lantunan murottal yang menenangkan dengan panduan *Tafakkur* (perenungan) untuk menenangkan pikiran yang sedang *overthinking*.

### Feature 5: Share the Light (Social Impact)
- **Konsep:** Saat AI memberikan jawaban ayat Al-Qur'an atau nasihat ajaib yang menenangkan hati pengguna, ada tombol **Bagikan (Share)**.
- **Proses:** Fitur ini membuat tangkapan layar e-card cantik (berisi ayat API dan solusi) agar pengguna bisa membagikannya ke teman yang juga sedang ada masalah, mengajak mereka untuk kembali bergantung pada Allah.

---

## Core User Journey (The "Spiritual Recovery" Flow)

Bagaimana semua fitur ini bersatu? Berikut adalah alur utama (MVP Flow) yang akan dilalui pengguna saat menggunakan ImanifestApp:

1. **Trigger (The Problem):** Pengguna sedang sedih/jatuh. (Contoh: *"Aku baru saja kehilangan pekerjaan, aku merasa hancur."*)
2. **Spiritual First Aid (HeartPulse):** Pengguna curhat ke aplikasi (lewat suara/teks). AI bertindak sebagai pendengar yang empati, langsung memberikan kutipan API Al-Qur'an dan menasihati pengguna untuk tetap ber-Husnudzon (berprasangka baik) bahwa Allah sedang menyiapkan jalan ganti yang lebih baik. Keyakinan pengguna pulih.
3. **Actionable Roadmap (Dua-to-Do):** Setelah tenang, AI memberikan *to-do list* praktis. (Contoh: *"1. Perbarui CV besok, 2. Salat Dhuha, 3. Baca doa minta rezeki [API Al-Qur'an/Hadis]"*).
4. **Manifesting (Niyyah Board):** Pengguna diminta menulis manifestasinya. (Contoh: *"Mendapatkan pekerjaan dengan gaji $10.000/bulan"*) beserta rasa syukur hari itu.
5. **Tracking & Realization:** Setiap hari pengguna menceklis *to-do list* (Fisik & Spiritual). Beberapa bulan kemudian, saat mereka berhasil mendapatkannya, mereka menekan tombol **"Realized"** di Tracker. Impian terwujud berkat perpaduan ikhtiar dan tawakkal!

---

## Target Users

**Primary:** Muslim young adults (18–35) who use productivity tools and want to integrate faith into their daily workflow. Indonesia, Malaysia, Middle East, UK.

**Secondary:** Non-Arab Muslims who need accessible tafsir and guidance in their language.

**User persona:** Aisha, 26, marketing professional in Kuala Lumpur. Sets goals using Notion and Todoist. Wants to make her daily intentions more meaningful but finds generic Islamic apps too passive — just reading Quran without a system for acting on it.

---

## MVP Scope

**Hackathon MVP (1-3 Days Scope):** Fokus pada "Vertical Slice" yang paling *wow* di mata juri, rilis dalam format Web App agar mudah didemokan.
- Expo Web-Only untuk demo (mengurangi *bug* kompilasi iOS/Android).
- Autentikasi kilat dengan Supabase Auth / Quran.com OAuth2.
- **Gamifikasi Sederhana:** Menggunakan *Quran User API (Streak)*. Fitur "Syukur & Niyyah Board" di mana "Faith Score" bertambah saat user selesai *check-off* to-do list harian.
- Imansync & Dua-to-Do: Menggunakan *prompt* AI statis yang langsung menembak API Al-Qur'an dan membuahkan *checklist* (Inti dari *Technical Requirements*).
- HeartPulse (Voice): Menggunakan API bawaan *browser* (Web Speech API) agar tidak perlu membuat *native audio recorder*, sehingga selesai dalam hitungan menit.
- SakinahStream: Cukup 1 tombol "Play/Pause" untuk memutar surah penenang langsung dari URL *Quran Audio API* (bukan *playlist* rumit).

**Out of scope (Post-Hackathon):**
- Kompilasi Native iOS/Android (Tunda setelah menang/dapat dana).
- Fitur sosial / komunitas.
- Push notifications
- Premium tier / paywall
- Custom recitation uploads
- Offline mode

---

## Business Model

**Hackathon MVP — all features free.**

Post-hackathon monetization options to explore:
- Premium tier: deeper AI analysis, unlimited history, custom dua collections
- B2B: white-label for mosques and Islamic organizations
- Sponsorship: halal brands, Islamic finance apps

---

## Tech Stack (LOCKED)

### Frontend — One codebase, three platforms

| Component | Technology | iOS | Android | Web |
|-----------|-----------|-----|---------|-----|
| Framework | Expo SDK 52 (React Native) | ✅ Native `.app` | ✅ Native `.apk` | ✅ Static HTML/CSS/JS |
| Routing | Expo Router 4 | ✅ | ✅ | ✅ |
| Styling | NativeWind v4 (Tailwind CSS) | ✅ | ✅ | ✅ |
| Voice | Expo Audio | ✅ Microphone | ✅ Microphone | ⚠️ Web Audio API |
| Image | Expo ImagePicker | ✅ Camera/Gallery | ✅ Camera/Gallery | ✅ File input |
| Auth Token | Expo SecureStore | ✅ Keychain | ✅ Keystore | ⚠️ localStorage fallback |
| Icons | Lucide React Native | ✅ | ✅ | ✅ |
| Fonts | Google Fonts (Expo) | ✅ | ✅ | ✅ |

> **Build commands:** `npx expo run:ios` · `npx expo run:android` · `npx expo export --platform web`

### Backend

| Component | Technology | Notes |
|-----------|-----------|-------|
| API Server | NestJS 10 + TypeScript strict | `apps/server` — port 3001 |
| Database | PostgreSQL 16 + Prisma 6 | `packages/database` |
| Cache | Redis via ioredis | Result caching + rate limiting |
| AI (Vision + Text) | Zhipu AI GLM-5 / GLM-5V | Via `zhipuai` SDK |
| Auth | OAuth2 — Login with Quran.com | Supabase Auth or Clerk |
| Quran Content | Quran Foundation Content API | Tafsir, translation, search |
| Quran User | Quran Foundation User API | Goals, streaks, reflections |
| Quran Audio | Quran Foundation Audio API | Recitation streaming |

### Infrastructure

| Component | Technology | Notes |
|-----------|-----------|-------|
| Monorepo | Turborepo | pnpm workspaces |
| Email (future) | Resend | Post-MVP |
| Hosting | VPS Contabo or Railway | Backend + DB + Redis |
| Web hosting | Any static host | CDN for web export |

---

## Bazi Color System & Design Aesthetic

Color decisions follow the founder's Bazi energy principles dipadukan dengan psikologi aplikasi spiritual modern.

**Founder Profile:** Lahir di Ujung Pandang, 15 Desember 1992. Elemen dominan Air (musim dingin). Untuk menyeimbangkan energi besar ini, Bazi merekomendasikan **Api (Merah, Pink, Ungu)** untuk kehangatan, dan **Kayu (Hijau)** untuk pertumbuhan.

**Strategi Warna (Modern Islamic x Bazi):**
Kita tidak perlu menggunakan warna Hijau/Kuning tradisional yang terlihat usang. Kita sudah membuktikan di awal bahwa UI bergaya *Holographic Pastel* dari warna Bazi kamu justru membuat aplikasi ini terlihat sangat premium dan menenangkan!

| Color | Name | Hex | Element | Usage |
|-------|------|-----|---------|-------|
| Primary | Starry Midnight / Deep Navy | #1A1829 | Water/Metal | Teks utama, elemen tegas agar tulisan mudah dibaca. |
| Bazi Accent 1 | Soft Lavender (Ungu) | #E2DDF8 | Fire (Soft) | Komponen gradasi background untuk aura magis dan tenang. |
| Bazi Accent 2 | Vivid Peach / Pink | #FFE4F2 | Fire | Highlights, elemen interaktif, tombol "Manifest". |
| Islamic Anchor | Sage Green | #166534 | Wood | Warna *success*, ikon centang, tombol selesai. Mewakili kedamaian Islam sekaligus menyerap excess elemen Air Bazi. |
| Surface | Frosted Glass | rgba(255,255,255,0.4) | Neutral | Kartu UI tembus pandang bergaya *Glassmorphism*. |

**Kesimpulan:** Penggunaan warna Pink/Ungu asalkan didesain dengan format *pastel gradient* membuat aplikasi Islam terasa eksklusif, damai, dan personal untuk anak muda—sekaligus mematuhi panduan Bazi personal pendirinya.

---

## Constraints

- Hackathon timeline: 48–72 hours for MVP
- Solo or small team (2 developers max)
- Zhipu AI API key required
- Quran Foundation API key required
- OAuth2 app registered on Quran.com

---

## Hackathon Requirements & Judging Criteria

### 1. Technical Requirements
Project MUST use at least one API from each category:
- ✅ **Content API:** We use *Quran APIs, Tafsir APIs, Translation APIs, and Audio APIs*.
- ✅ **User API:** We use *Streak Tracking, Post APIs (Reflection/HeartPulse), and Activity & Goals APIs (Dua-to-Do/Manifestation Tracker)*.

### 2. Judging Rubric (100 Points Total)
- **Impact on Quran Engagement (30 pts):** Our core loop directly connects a user's real-life problems/dreams to active Quranic reading and deep contextual reflection (Tafakkur).
- **Product Quality & UX (20 pts):** A premium, dreamy holographic glassmorphism design that provides a very calm, welcoming, and modern aesthetic.
- **Technical Execution (20 pts):** Clean monorepo (Turborepo), robust strict TypeScript backend (NestJS), and cross-platform frontend (Expo + NativeWind).
- **Innovation & Creativity (15 pts):** Pioneering the intersection of modern "vision board/manifestation" productivity with authentic Islamic Tawakkul and AI guidance.
- **Effective Use of APIs (15 pts):** Heavy and multifaceted reliance on Quran Foundation APIs for almost all core features (Audio, Goals, Streaks, Content, Tafsir).

### 3. Submission Checklist (Deadline: April 20, 2026)
- [ ] Project title & Team member names
- [ ] Short description & Detailed explanation of the idea
- [ ] Live demo or working app link
- [ ] GitHub repository
- [ ] 2-3 minute demo video
- [ ] API usage description

---

## Risks

| Risk | Mitigation |
|------|-----------|
| Quran Foundation API rate limits | Cache all responses in Redis (TTL 1 hour) |
| GLM-5 response quality for Arabic context | Fine-tune prompt with Islamic scholar framing |
| OAuth2 with Quran.com is complex to set up | Start with email auth as fallback for hackathon |
| Expo web export limitations | Test web parity early, not at the end |
| GLM-5V image analysis accuracy | Validate with test images before demo |
