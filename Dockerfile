# ─── Stage 1: Build ───────────────────────────────────────
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy workspace config first (for Docker layer caching)
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/server/package.json apps/server/
COPY packages/database/package.json packages/database/
COPY packages/shared/package.json packages/shared/

# Install ALL deps
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/server/ apps/server/
COPY packages/database/ packages/database/
COPY packages/shared/ packages/shared/
COPY tsconfig.json ./
COPY turbo.json ./

# Generate Prisma client
RUN cd packages/database && npx prisma generate

# Build the NestJS server
RUN cd apps/server && npx nest build

# ─── Stage 2: Production ──────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Copy entire workspace from builder (preserves pnpm symlinks)
COPY --from=builder /app ./

# Install tsx for runtime TypeScript support (needed for workspace packages)
RUN npm install -g tsx

# Non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001
USER nestjs

EXPOSE 3001

# Use tsx to handle TS imports from workspace packages
CMD ["npx", "tsx", "apps/server/src/main.ts"]