# Project Brief: ImanifestApp – AI-Powered Spiritual Productivity Platform

**Version:** 2.0  
**Status:** Final — Ready for Development  
**Stack:** Turborepo + Expo (mobile-web) + NestJS + PostgreSQL + Zhipu GLM-5 + Quran.com API

---

## Problem Statement

Muslims who want to align their daily goals and intentions with their faith have no structured tool to do so. Existing productivity apps are entirely secular. Existing Islamic apps are devotional-only — they don't help users translate spiritual intentions into actionable steps.

The result: people make duas without follow-through, set goals without grounding them in Quranic guidance, and have no way to track the connection between their spiritual state and their daily actions.

## The Founder's Story (Project Inspiration)

Proyek ini lahir dari pengalaman pribadi sang pendiri yang baru saja kehilangan pekerjaan, kehilangan banyak materi, dan sedang berjuang mencari pekerjaan baru untuk menopang cicilan. Di tengah masa-masa berat ini, muncul keinginan membangun bisnis sambil terus berikhtiar dan ber-husnudzon kepada Allah.

ImanifestApp dibangun untuk memotivasi diri sendiri—mendapatkan ketenangan lewat ayat Al-Qur'an, menata ulang mimpi (seperti "*menghasilkan $10.000/bulan untuk melunasi cicilan, membangun masjid, dan TPA*"), serta membuktikan bahwa teknologi AI bisa menjadi teman spiritual yang nyata di saat sedih. Karena aplikasi ini terbukti menenangkan hati pembuatnya, aplikasi ini kini dibagikan agar bisa membantu jutaan pengguna lain yang juga sedang berada di titik terendah mereka.

---

## Core User Journey — The "Spiritual Recovery" Flow

Semua 4 fitur saling terhubung dalam satu alur linier yang membimbing pengguna dari titik terrendah menuju ketenangan dan tindakan nyata:

```
Dashboard → Qalb → Imanifest → Dua-to-Do → Tafakkur Hub
```

### Step 1 — Dashboard
Pengguna membuka app dan melihat 4 fitur utama: **Qalb**, **Imanifest**, **Dua-to-Do**, dan **Tafakkur**. Dashboard juga menampilkan waktu shalat aktif, streak harian, dan progres manifestasi.

### Step 2 — Qalb (Spiritual First Aid)
Pengguna bercerita tentang permasalahan hidupnya — bisa lewat **kirim suara** atau **mengetik teks**. AI berperan sebagai pendengar empatik dan membalas dengan:
1. **Kutipan dari Quran.com** — ayat relevan + tafsir + hadis yang sesuai konteks masalah
2. **Penjelasan logis & solutif** — bagaimana mengimplementasikan pesan spiritual tersebut dalam kehidupan nyata

Setelah mendapat respons AI, terdapat tombol **"Plan with Imanifest"** yang mengarahkan user agar tidak larut dalam masalah dan mulai membangun visi ke depan.

### Step 3 — Imanifest (Vision & Intention)
Pengguna diminta untuk menuliskan **apa yang ingin diwujudkan** — supaya tidak larut dalam keterpurukan, melainkan fokus pada apa yang ingin dicapai. Bisa lewat suara atau menulis. Selain itu, pengguna juga menuliskan **3 hal yang disyukuri hari ini** sebagai Gratitude Journal.

Setelah mengisi niat dan syukur, terdapat tombol **"Manifest & Start Dua-to-Do"** yang mengarahkan ke aksi nyata.

### Step 4 — Dua-to-Do (Actionable Roadmap)
AI mengubah niat dari Imanifest menjadi **to-do list terarah** yang menggabungkan tindakan fisik dan spiritual. Termasuk di dalamnya:
- Membaca/mendengarkan Al-Qur'an dari **Quran.com**
- Amalan waktu mustajab (Dhuha, Tahajjud, dll.)
- Aksi duniawi konkret (perbarui CV, kirim lamaran, dsb.)

Setelah menyelesaikan to-do, terdapat tombol **"Begin Tafakkur"** untuk menutup hari dengan kontemplasi.

### Step 5 — Tafakkur Hub (Contemplation & Reconnection)
Pengguna membaca dan mendengarkan Al-Qur'an untuk **menenangkan hati dan berkontemplasi diri**. Fitur ini membangun kesadaran bahwa **Allah selalu bersama mereka** di setiap langkah. Tersedia:
- Murottal dari reciter pilihan (Quran.com Audio API)
- Ayat untuk dibaca & direfleksikan (Read & Reflect)
- Daily Dhikr rotator
- Nature Sounds untuk fokus

---

## The 4 Core Features

### Feature 1: Qalb — Voice Spiritual Companion
**Route:** `/qalb` | **File:** `app/(tabs)/qalb.tsx` + `app/qalb-result.tsx`

- Pengguna curhat lewat **suara** (Web Speech API) atau **teks**
- AI membalas dengan respons 2 lapis:
  1. Kutipan ayat Al-Qur'an, tafsir, dan hadis dari **Quran Foundation Content API**
  2. Penjelasan logis dan solutif yang dipersonalisasi
- Tombol "Plan with Imanifest" → `/imanifest`
- Streak counter (berapa hari berturut-turut user refleksi)

### Feature 2: Imanifest — Vision & Intention Board
**Route:** `/imanifest` | **File:** `app/(tabs)/imanifest.tsx`

- User menulis/merekam suara **niat/keinginan** yang ingin diwujudkan
- User mengisi **3 hal yang disyukuri** hari ini (Gratitude Journal)
- Visual inspiration board (upload foto impian)
- AI memvalidasi niat dengan ayat Al-Qur'an yang relevan
- Tombol "Manifest & Start Dua-to-Do" → `/dua-todo`

### Feature 3: Dua-to-Do — Spiritual Action Roadmap
**Route:** `/dua-todo` | **File:** `app/(tabs)/dua-todo.tsx`

- AI menghasilkan to-do list dari niat di Imanifest
- Setiap to-do mencakup amalan spiritual + aksi duniawi
- Integrasi **Quran Foundation User API** untuk streak & goals
- Tombol membaca Al-Qur'an langsung dari **Quran.com**
- Tombol "Begin Tafakkur" → `/tafakkur`

### Feature 4: Tafakkur Hub — Guided Quran Contemplation
**Route:** `/tafakkur` | **File:** `app/(tabs)/tafakkur.tsx`

- Streaming murottal dari **Quran Foundation Audio API**
- Pilihan reciter (Mishary Rashid Alafasy, Abdur-Rahman as-Sudais, dll.)
- Read & Reflect — ayat Arab + terjemahan + panduan tafakkur
- Daily Dhikr rotator (Subhanallah, Alhamdulillah, Allahu Akbar)
- Nature Sounds (Hujan, Hutan, Laut) untuk fokus kontemplasi

---

## Feature Navigation Map

| From | CTA Button | To |
|------|-----------|-----|
| Dashboard | Tap "Qalb" card | `/qalb` |
| Dashboard | Tap "Imanifest" card | `/imanifest` |
| Dashboard | Tap "Dua-to-Do" card | `/dua-todo` |
| Dashboard | Tap "Tafakkur" card | `/tafakkur` |
| Qalb result | "Plan with Imanifest ✨" | `/imanifest` |
| Imanifest | "Manifest & Start Dua-to-Do →" | `/dua-todo` |
| Dua-to-Do | "Begin Tafakkur 🌿" | `/tafakkur` |

---

## Target Users

**Primary:** Muslim young adults (18–35) who use productivity tools and want to integrate faith into their daily workflow. Indonesia, Malaysia, Middle East, UK.

**Secondary:** Non-Arab Muslims who need accessible tafsir and guidance in their language.

**User Persona:** Aisha, 26, marketing professional in Kuala Lumpur. Sets goals using Notion and Todoist. Wants to make her daily intentions more meaningful but finds generic Islamic apps too passive — just reading Quran without a system for acting on it.

---

## MVP Scope

**Hackathon MVP (Deadline: April 20, 2026) — Web App Demo:**

- Expo Web-Only untuk demo (reduce iOS/Android build bugs)
- Auth: Supabase Auth / Quran.com OAuth2
- **Qalb:** Web Speech API (browser built-in, no native recorder needed)
- **Imanifest:** Static AI prompt → Quran Foundation Content API
- **Dua-to-Do:** AI-generated checklist dari niat Imanifest + Quran.com integration
- **Tafakkur:** 1 play/pause button → Quran Audio API streaming
- **Gamification:** Quran User API streak + "Faith Score" saat checklist selesai

**Out of Scope (Post-Hackathon):**
- Native iOS/Android compilation
- Social/community features
- Push notifications
- Premium tier / paywall
- Custom recitation uploads
- Offline mode

---

## Tech Stack (LOCKED)

### Frontend

| Component | Technology | Notes |
|-----------|-----------|-------|
| Framework | Expo SDK 55 (React Native) | Web-first for hackathon |
| Routing | Expo Router 4 | File-based, `(tabs)` group |
| Styling | Inline styles + Platform checks | Glassmorphism on web |
| Voice | Web Speech API | Browser built-in |
| Icons | Lucide React Native | LayoutGrid, Heart, Sparkles, etc. |
| Fonts | Newsreader, Noto Serif, Plus Jakarta Sans, Amiri | Google Fonts via CSS |

### Backend

| Component | Technology | Notes |
|-----------|-----------|-------|
| API Server | NestJS 10 + TypeScript strict | `apps/server` — port 3001 |
| Database | PostgreSQL 16 + Prisma 6 | `packages/database` |
| Cache | Redis via ioredis | TTL 1hr for Quran API responses |
| AI | Zhipu AI GLM-5 / GLM-5V | Qalb + Imanifest responses |
| Auth | OAuth2 — Login with Quran.com | Supabase Auth fallback |
| Quran Content | Quran Foundation Content API | Tafsir, translation, verse search |
| Quran User | Quran Foundation User API | Goals, streaks, reflections |
| Quran Audio | Quran Foundation Audio API | Recitation streaming (Tafakkur) |

---

## Design System

**Holographic Glassmorphism** — pastel gradients + frosted glass cards + subtle blur

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Lavender | #E2DDF8 | Top-left radial gradient blob |
| Background | Blush | #FFE4F2 | Bottom-right radial gradient blob |
| Primary text | Deep slate | #2f3338 | Headlines, body |
| Accent green | Sage Green | #206c3a | CTAs, progress, Islamic anchor |
| Dark green | Forest | #166534 | Shadows, borders |
| Accent purple | Lavender | #605d71 | Secondary CTAs, Qalb theme |
| Surface | Frosted Glass | rgba(255,255,255,0.45) | All cards |
| Arabic font | Amiri | — | Quran verses |
| Headline font | Newsreader | — | Italic display text |

---

## Hackathon Judging Criteria

| Criterion | Points | Our Strategy |
|-----------|--------|-------------|
| Impact on Quran Engagement | 30 | Core loop connects user's problems → Quranic reading + Tafakkur |
| Product Quality & UX | 20 | Premium holographic glassmorphism design |
| Technical Execution | 20 | Turborepo monorepo + NestJS strict TS + Expo |
| Innovation & Creativity | 15 | Vision board + Islamic Tawakkul + AI guidance — first of its kind |
| Effective Use of APIs | 15 | Content + User + Audio APIs across all 4 features |

**Submission Deadline:** April 20, 2026

---

## Risks

| Risk | Mitigation |
|------|-----------|
| Quran Foundation API rate limits | Cache all responses in Redis (TTL 1 hour) |
| GLM-5 response quality for Arabic context | Fine-tune prompt with Islamic scholar framing |
| OAuth2 with Quran.com complexity | Start with email auth as hackathon fallback |
| Web Speech API browser compatibility | Test on Chrome early; show text input fallback |
