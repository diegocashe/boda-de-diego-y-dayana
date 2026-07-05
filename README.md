# 💍 Boda de Diego y Dayana

Sitio web oficial de la boda de Diego y Dayana — [diegoydayana.com](https://diegoydayana.com).

Aplicación construida con **Laravel 13** e **Inertia.js v3 + React 19**, con autenticación completa (login, 2FA, passkeys) y un panel de administración.

## Stack

| Capa | Tecnología |
| --- | --- |
| Backend | PHP 8.3, Laravel 13, Fortify (auth, 2FA), Laravel Passkeys |
| Frontend | React 19 (React Compiler), TypeScript, Inertia.js v3 |
| Estilos / UI | Tailwind CSS 4, Radix UI, lucide-react, sonner |
| Build | Vite 8, Wayfinder (rutas tipadas), pnpm |
| Base de datos | SQLite (local) — sesiones, caché y colas en `database` |

## Requisitos

- PHP >= 8.3 y Composer
- Node.js >= 24 y pnpm 11
- Extensión SQLite habilitada

## Instalación

```bash
git clone <repo-url> boda-de-diego-y-dayana
cd boda-de-diego-y-dayana

composer setup
```

El script `composer setup` instala dependencias de PHP, copia `.env.example` a `.env`, genera la `APP_KEY`, corre migraciones e instala y compila los assets de frontend.

Si prefieres hacerlo paso a paso:

```bash
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate
pnpm install
pnpm build
```

## Desarrollo

```bash
composer dev
```

Levanta en paralelo el servidor de Laravel, el worker de colas, los logs (Pail) y Vite con HMR.

## Scripts útiles

### Frontend (pnpm)

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Vite en modo desarrollo (HMR) |
| `pnpm build` | Compila los assets para producción |
| `pnpm build:ssr` | Compila con soporte SSR |
| `pnpm lint` / `pnpm lint:check` | ESLint (con/sin autofix) |
| `pnpm format` / `pnpm format:check` | Prettier sobre `resources/` |
| `pnpm types:check` | Verificación de tipos con TypeScript |

### Backend (composer)

| Comando | Descripción |
| --- | --- |
| `composer dev` | Entorno de desarrollo completo |
| `composer lint` / `composer lint:check` | Pint (estilo de código PHP) |
| `composer types:check` | Análisis estático con PHPStan (Larastan) |
| `composer test` | Pint + PHPStan + PHPUnit |
| `composer ci:check` | Todos los checks de CI (frontend + backend) |

## Calidad de código

- **Husky + commitlint**: los commits siguen [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, …).
- **semantic-release**: el versionado y el `CHANGELOG.md` se generan automáticamente en cada push a `main`.
- **CI/CD** (`.github/workflows/deploy.yml`): se trabaja en ramas por feature (CI corre en cada push); el merge a `main` publica el release y despliega a producción (cPanel). Despliegue, modo mantenimiento y backups: [docs/deploy.md](docs/deploy.md).

## Estructura relevante

```
app/                  # Backend: controladores, modelos, acciones de Fortify
routes/web.php        # Rutas web (Inertia)
routes/settings.php   # Rutas de configuración de cuenta
resources/js/pages/   # Páginas React (welcome, dashboard, ...)
resources/js/components/  # Componentes compartidos y UI (Radix)
resources/js/wayfinder/   # Rutas tipadas generadas por Wayfinder
database/             # Migraciones, factories y seeders
```

## Licencia

[MIT](LICENSE)
