# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Official wedding website for Diego & Dayana ([diegoydayana.com](https://diegoydayana.com)) — a Laravel 13 + Inertia.js v3 + React 19 monolith. It serves two audiences:

1. **Public invitation site** (no auth) — landing, "our story" timeline, per-guest RSVP flow via a personal code, and a details page (venues + gift registry).
2. **Admin dashboard** (`auth` + `verified`) — single-tenant CMS where the couple manages wedding settings, home page content, story timeline, venues, gift registry, and guest invitations (create, send, lock, export, per-invitation OG image).

There is exactly one `WeddingSetting` row (`WeddingSetting::current()` fetches/creates it) — this is not a multi-tenant app.

## Commands

### Local dev

```bash
composer dev          # Runs Laravel server + queue worker + Pail (logs) + Vite HMR concurrently
composer setup         # First-time install: composer install, .env, key:generate, migrate, pnpm install+build
```

### Backend (PHP)

```bash
composer lint          # Pint --parallel (autofix)
composer lint:check    # Pint --parallel --test (check only)
composer types:check   # phpstan analyse (Larastan, level 7)
composer test          # config:clear + lint:check + types:check + php artisan test
php artisan test --filter=TestName          # Run a single test
php artisan test tests/Feature/PublicRsvpTest.php   # Run a single test file
composer ci:check       # Full CI suite: pnpm lint:check + format:check + types:check + composer test
```

### Frontend (pnpm)

```bash
pnpm dev               # Vite dev server (HMR)
pnpm build              # Production build
pnpm build:ssr           # Build with SSR support
pnpm lint / pnpm lint:check      # ESLint (fix / check)
pnpm format / pnpm format:check  # Prettier over resources/ (fix / check)
pnpm types:check          # tsc --noEmit
```

Node >= 24, pnpm 11 required (`packageManager` pinned in package.json). PHP >= 8.3, SQLite extension enabled.

## Architecture

### Backend structure (`app/`)

- **Controllers** are split into two namespaces:
  - `App\Http\Controllers` (public, unauthenticated) — `InvitationController` serves every public page (`home`, `story`, `rsvp`/`rsvpShow`/`rsvpStore`, `ogImage`, `details`) and builds the shared wedding props, formatted date, and schema.org JSON-LD used across pages.
  - `App\Http\Controllers\Dashboard` (authenticated CMS) — one controller per resource: `DashboardController`, `WeddingSettingController`, `HomeContentController`, `TimelineItemController`, `InvitationController`, `VenueController`, `GiftRegistryEntryController`, `ImageOptimizationController`.
  - `App\Http\Controllers\Settings` — account settings (`ProfileController`, `SecurityController`), part of the Fortify-based auth starter kit.
- **Models** (`app/Models/`): `WeddingSetting` (singleton via `::current()`), `Invitation` (per-guest RSVP, auto-generates a unique lowercase random `code` on create via `generateCode()`), `TimelineItem`, `Venue`, `GiftRegistryEntry`, `User`.
- **Services** (`app/Services/`): `InvitationOgImageService` (generates/caches a per-invitation Open Graph JPEG under `storage/app/public/og/{code}.jpg`), `UploadedImageProcessor` (Intervention Image-based upload optimization, used by `ImageOptimizationController`).
- **Auth**: Laravel Fortify (login, password reset, email verification, 2FA) + Laravel Passkeys. `app/Actions/Fortify/` holds Fortify action overrides.
- **chisel.php / chisel-paths.php**: leftover scaffolding tooling from the `laravel/react-starter-kit` this project was bootstrapped from (`composer.json` name is still `laravel/react-starter-kit`). Not used in day-to-day development.

### Routing

- `routes/web.php` — public invitation routes (Spanish URLs: `/`, `historia`, `asistencia`, `asistencia/{invitation:code}`, `detalles`) plus the entire `dashboard/*` route group behind `auth`+`verified` middleware, one block per resource.
- `routes/settings.php` — account settings routes (profile, security, appearance), included from `web.php`.
- Route-model binding uses the `Invitation` model's `code` column (`{invitation:code}`), not its numeric id, for public guest links.
- **Wayfinder** (`@laravel/vite-plugin-wayfinder`) auto-generates typed TS route helpers into `resources/js/routes/` and `resources/js/actions/` from the PHP routes at build time. Import route helpers from `@/routes/...` (e.g. `home()` from `@/routes`) instead of hardcoding URL strings in React — regenerate by running the dev server or a build after changing `routes/*.php`.

### Frontend structure (`resources/js/`)

- **Entry** (`app.tsx`): Inertia app picks a layout by page-name prefix — `invitation/*` → `InvitationLayout`, `auth/*` → `AuthLayout`, `settings/*` → `[AppLayout, SettingsLayout]` (nested), everything else (dashboard) → `AppLayout`.
- **`pages/`** mirrors the Inertia component names returned by controllers (`Inertia::render('invitation/home', ...)` → `pages/invitation/home.tsx`). Subfolders: `invitation/`, `dashboard/`, `settings/`, `auth/`.
- **`components/invitation/`** — public-site specific components (RSVP form/section, scroll view, toasts, section headers). **`components/ui/`** — Radix-based design system primitives (shadcn-style, configured via `components.json`).
- **`lib/`** — `wedding.ts` (shared wedding formatting helpers), `timeline-icons.tsx` / `venue-icons.tsx` (icon lookup maps for CMS-configurable icon fields), `utils.ts` (cn/className helpers).
- **`hooks/`** — notably `use-rsvp-form.ts` (RSVP form state/submission), `use-countdown.ts` (homepage countdown), `use-flash-toast.ts` (Inertia flash message → toast bridge), `use-appearance.tsx` (light/dark theme).
- Path alias: `@/*` → `resources/js/*` (see `tsconfig.json`).
- React Compiler is enabled via `babel-plugin-react-compiler` in `vite.config.ts` — avoid manual `useMemo`/`useCallback` unless there's a proven need, since the compiler handles most memoization.

### Database

- SQLite (`database/database.sqlite`), WAL mode with a 5s busy timeout configured in `config/database.php` — production-appropriate for the small guest-list scale of this app, not swapped for Postgres/MySQL.
- Migrations of note: `wedding_settings` (singleton row, home content, OG background, notification emails, godparents contact), `timeline_items` (story milestones, supports image or video per item), `invitations` (guest RSVP records), `venues`, `gift_registry_entries`.

### Testing

- PHPUnit, feature-test-heavy (`tests/Feature/`), organized by area: `Auth/`, `Dashboard/`, plus root-level `PublicRsvpTest.php`, `InvitationOgImageTest.php`, `DashboardTest.php`. `tests/Unit/` is minimal.
- `composer test` always runs Pint + PHPStan before PHPUnit — a failing lint/type check blocks tests from even running via that script; use `php artisan test` directly to skip straight to tests.

## Conventions

- **Commits**: Conventional Commits (`feat:`, `fix:`, `chore:`, …), enforced by commitlint via Husky on commit.
- **Releases**: semantic-release runs on push to `main`, auto-generating version bumps, `CHANGELOG.md`, and GitHub Releases from commit types (a `chore:`-only push does not trigger a release).
- **Branching**: single-developer, feature-branch workflow — push to any branch runs CI (Pint, PHPStan, ESLint, Prettier, tsc, build, tests); merging to `main` is the deploy approval (triggers release + rsync deploy to cPanel production). See `docs/deploy.md` for deploy internals, maintenance mode, and SQLite backup/restore procedures.
- Controller docblocks are one-line intent descriptions (see `InvitationController`) — follow that style rather than verbose PHPDoc blocks.
