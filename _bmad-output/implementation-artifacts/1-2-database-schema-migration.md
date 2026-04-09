# Story 1.2: Database Schema & Migration

**Story Key:** 1-2-database-schema-migration
**Epic:** Epic 1 — Foundation & Auth
**Priority:** Must Have
**Status:** in-progress

---

## Story

**As a** developer
**I want to** have all database tables created and migrated
**So that** feature development can write to the DB immediately

---

## Acceptance Criteria

- [ ] `schema.prisma` created with all 4 tables: `User`, `Manifestation`, `Task`, `Reflection`
- [ ] All fields match architecture doc Section 3
- [ ] `prisma migrate dev` runs without errors
- [ ] `packages/database/src/index.ts` exports `prisma` singleton
- [ ] Server `app.module.ts` imports `DatabaseModule`
- [ ] Indexes created: `Manifestation.userId`, `Task.manifestationId`, `Reflection.userId`

---

## Tasks/Subtasks

- [x] 1. Schema already created in Story 1.1
- [x] 2. Create `DatabaseModule` in `packages/database`
  - [x] 2a. `src/database.module.ts` — NestJS GlobalModule exporting PrismaService
  - [x] 2b. `src/prisma.service.ts` — Injectable PrismaService with onModuleInit/onModuleDestroy
- [x] 3. Create seed script in `packages/database/prisma/seed.ts`
- [x] 4. Register `DatabaseModule` in server `app.module.ts`
- [x] 5. Configure `prisma/seed` command in `packages/database/package.json`
- [x] 6. Generate Prisma client (`prisma generate` — v6.19.3)
- [ ] 7. Run migration (`prisma migrate dev --name init`) — requires PostgreSQL running
- [ ] 8. Run seed (`prisma db seed`) — requires migration first

---

## Dev Notes

### Architecture Reference
- **DB schema:** See `Brain/03-architecture.md` Section 3
- **Schema already exists:** `packages/database/prisma/schema.prisma` from Story 1.1
- **Indexes already defined:** `@@index([userId])` on Manifestation + Reflection, `@@index([manifestationId])` on Task

### Key Technical Decisions
1. PrismaService extends PrismaClient, wrapped in NestJS Injectable
2. DatabaseModule is global (so all feature modules can inject PrismaService)
3. Seed uses ts-node for TypeScript execution

---

## Dev Agent Record

### Implementation Plan
1. ✅ PrismaService — Injectable, extends PrismaClient, $connect/$disconnect lifecycle
2. ✅ DatabaseModule — @Global module, exports PrismaService
3. ✅ Barrel export — updated index.ts to export DatabaseModule + PrismaService
4. ✅ Seed script — demo user, sample manifestation + 5 tasks + 1 reflection
5. ✅ Server wiring — AppModule imports DatabaseModule from @imanifest/database
6. ✅ turbo.json fix — removed invalid `filter` key (not valid in Turborepo v2 task config)
7. ✅ Prisma Client generated — v6.19.3

### Debug Log
- turbo.json had invalid `filter` key inside task definitions → removed, filter is a CLI flag only
- Prisma 6 deprecates `package.json#prisma` seed config → still works, migration to prisma.config.ts deferred

### Completion Notes
- **All code AC met.** Migration (AC #3) + seed (AC verification) require running PostgreSQL — user action needed.
- **To run migration:** ensure PostgreSQL is running + `DATABASE_URL` in `.env`, then `cd packages/database && npx prisma migrate dev --name init`
- **To run seed:** after migration, `npx prisma db seed`

---

## File List

### packages/database
- `src/prisma.service.ts` — NestJS Injectable PrismaService
- `src/database.module.ts` — @Global DatabaseModule
- `src/index.ts` — updated barrel export (PrismaService, DatabaseModule)
- `prisma/seed.ts` — seed with demo user + manifestation + tasks + reflection
- `package.json` — added @nestjs/common, @types/node, ts-node, prisma seed config

### apps/server
- `src/app.module.ts` — imports DatabaseModule
- `package.json` — added @imanifest/database workspace dep

### Root
- `turbo.json` — fixed invalid `filter` keys

---

### Review Findings

- [x] [Review][Decision] Dual export pattern ambiguity [`packages/database/src/index.ts`] — RESOLVED: Keep both + JSDoc (Opsi 1). `prisma` untuk non-NestJS, `PrismaService` untuk DI.
- [x] [Review][Patch] Seed script creates duplicate tasks on re-run [`packages/database/prisma/seed.ts`] — FIXED: Added deleteMany cleanup before seed.
- [x] [Review][Patch] Missing `enableShutdownHooks()` in NestJS bootstrap [`apps/server/src/main.ts`] — FIXED: Added `app.enableShutdownHooks()`.
- [x] [Review][Defer] AC #3 "prisma migrate dev runs without errors" — not verifiable without running PostgreSQL. Deferred: requires live DB. [`_bmad-output/implementation-artifacts/1-2-database-schema-migration.md`] — deferred, requires live PostgreSQL

## Change Log

| Date | Change |
|------|--------|
| 2026-04-09 | Story created |

---

## Status

done
