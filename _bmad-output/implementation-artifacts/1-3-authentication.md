# Story 1.3: Authentication

**Story Key:** 1-3-authentication
**Epic:** Epic 1 — Foundation & Auth
**Priority:** Must Have
**Status:** in-progress

---

## Story

**As a** visitor
**I want to** log in with my Quran.com account
**So that** my spiritual data syncs with my existing Quran.com profile

---

## Acceptance Criteria

- [ ] OAuth2 flow configured with Quran.com as provider (placeholder ready, requires credentials)
- [ ] On successful auth: `User` created/updated in DB, `quranAuthToken` stored
- [ ] JWT token returned to Expo app, stored in SecureStore
- [ ] `AuthGuard` on NestJS protects all routes except `/sakinah/*` and `/auth/*`
- [ ] Login screen in Expo app with "Login with Quran.com" button + email/password fallback
- [ ] Logout clears token from SecureStore and invalidates session

---

## Tasks/Subtasks

- [ ] 1. Server: Install auth dependencies (@nestjs/jwt, @nestjs/passport, passport-jwt, bcrypt)
- [ ] 2. Server: Create AuthModule, AuthService, AuthController
  - [ ] 2a. POST /auth/register — email/password registration
  - [ ] 2b. POST /auth/login — email/password login, returns JWT
  - [ ] 2c. POST /auth/quran-oauth — placeholder for Quran.com OAuth flow
  - [ ] 2d. POST /auth/logout — invalidate session
- [ ] 3. Server: Create JwtStrategy + AuthGuard
  - [ ] 3a. JwtStrategy validates JWT from Authorization header
  - [ ] 3b. AuthGuard applied globally, excludes /sakinah/* and /auth/*
- [ ] 4. Server: Register AuthModule in AppModule
- [ ] 5. Client: Create auth context + SecureStore token management
- [ ] 6. Client: Update auth.tsx with functional login/register form
- [ ] 7. Client: Update _layout.tsx with auth state routing
- [ ] 8. Update .env.example with auth config

---

## Dev Notes

### Architecture Reference
- ADR-07: Supabase Auth as primary OAuth2 handler
- Auth structure: auth.module.ts, auth.guard.ts, auth.service.ts (from 03-architecture.md)
- JWT_SECRET already in .env.example
- QURAN_CLIENT_ID, QURAN_CLIENT_SECRET in .env.example

### Key Technical Decisions
1. Email/password as working auth now, Quran.com OAuth as placeholder
2. JWT tokens with 7-day expiry
3. Password hashing via bcrypt
4. SecureStore for token on mobile, AsyncStorage fallback for web
5. AuthGuard excludes /sakinah/* (public audio) and /auth/* (login/register)

---

## Dev Agent Record

### Implementation Plan
_To be filled during implementation_

### Debug Log
_To be filled during implementation_

### Completion Notes
_To be filled when story is complete_

---

## File List
_No files yet — to be updated during implementation_

---

## Change Log

| Date | Change |
|------|--------|
| 2026-04-09 | Story created |

---

## Status

in-progress