# Despliegue y operación en producción

Producción es un cPanel al que se despliega vía rsync desde GitHub Actions
(`.github/workflows/deploy.yml`). El PHP CLI del servidor es `ea-php83`.

## Flujo de trabajo (único developer, ramas por feature)

1. Nueva feature: `git switch -c feature/nombre` y push libre — en cada push
   corre solo el job de **CI** (Pint, PHPStan, ESLint, Prettier, tsc, build, tests).
2. Cuando la feature está lista: merge a `main` (con PR o merge local + push).
3. El push a `main` dispara el pipeline completo:
   - **CI** de nuevo sobre el merge.
   - **Release** — semantic-release publica tag, CHANGELOG y GitHub Release
     (solo si hay commits `feat:`/`fix:`/breaking; un `chore:` no genera release).
   - **Deploy** — job con `environment: production`: compila el tag publicado
     (`v<versión>`) y hace rsync + `migrate --force` + `optimize`.

**El merge a `main` es la aprobación del deploy**: nada llega a producción
desde una feature branch.

### Aprobación manual extra (opcional)

Si algún día quieres un doble check antes de cada deploy, en GitHub:
**Settings → Environments → `production` → Required reviewers** → agrégate.
Cada deploy quedará en *Waiting* hasta aprobarlo en la pestaña Actions
(**Review deployments**); los pendientes expiran a los 30 días. Quitar el
reviewer lo vuelve automático de nuevo, sin tocar el workflow.

> Los secrets (`SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`, `DEPLOY_PATH`,
> `DISCORD_WEBHOOK_URL`) pueden vivir a nivel de repo o moverse al environment
> `production` para que solo el job aprobado pueda usarlos (recomendado para los de SSH).

## Modo mantenimiento con acceso secreto

Mientras el sitio no esté listo, puede quedarse en mantenimiento permanente y
navegarlo solo nosotros. Por SSH en el servidor:

```bash
cd "$DEPLOY_PATH"   # la ruta de la app en el servidor

# Activar (los visitantes ven la página 503 de mantenimiento)
ea-php83 artisan down --secret="nos-vemos-en-el-altar" --render="errors::503"

# Desactivar
ea-php83 artisan up
```

Con el modo activo, entrar a `https://diegoydayana.com/nos-vemos-en-el-altar`
setea una cookie de bypass en el navegador: a partir de ahí Diego y Dayana navegan
el sitio completo con normalidad (la cookie dura mientras dure la sesión del
navegador; si expira, se vuelve a visitar la URL secreta). El resto de visitantes
sigue viendo la página de mantenimiento.

Notas:

- El flag vive en `storage/framework/down`. El deploy **excluye `storage/`**, así
  que el modo mantenimiento **sobrevive a los deploys**. Verificado: ni
  `artisan optimize` ni `artisan migrate --force` (los comandos del post-deploy)
  lo levantan; solo `artisan up` lo desactiva.
- La frase secreta funciona como URL, así que debe ser URL-safe (minúsculas y
  guiones). Si quieres otra, cámbiala en el comando `down` — no está en el código.

## Indexación (Google y otros buscadores)

Mientras el sitio no sea estable hay doble bloqueo:

1. `public/robots.txt` → `Disallow: /` (bloquea el rastreo).
2. Meta `<meta name="robots" content="noindex, nofollow">` en el blade raíz,
   controlada por `APP_INDEXABLE` (default `false`; ver `config/app.php`).

**Al lanzar:**

1. En el `.env` del servidor: `APP_INDEXABLE=true` y correr `ea-php83 artisan config:cache`
   (o esperar al siguiente deploy, que corre `optimize`).
2. Revertir `public/robots.txt` a:

   ```
   User-agent: *
   Disallow:
   ```

## SQLite: concurrencia y backups

La conexión sqlite ya usa `journal_mode = wal` y `busy_timeout = 5000`
(`config/database.php`), suficiente para ~100 invitados: WAL permite lecturas
concurrentes con escrituras y el busy timeout evita errores `database is locked`.

### Backup diario (cron de cPanel)

En cPanel → **Cron Jobs**, crear un job diario (p. ej. a las 3:00) con este comando
(ajusta `RUTA_APP` a la misma ruta del secret `DEPLOY_PATH`):

```bash
mkdir -p "$HOME/backups/boda" && sqlite3 "$HOME/RUTA_APP/database/database.sqlite" ".backup '$HOME/backups/boda/database-$(date +\%F).sqlite'" && find "$HOME/backups/boda" -name 'database-*.sqlite' -mtime +13 -delete
```

- `sqlite3 .backup` hace una copia consistente aunque haya escrituras en curso
  (con WAL un `cp` a secas puede copiar un estado corrupto).
- `date +\%F` añade la fecha (`database-2026-07-05.sqlite`); el `\%` es obligatorio
  porque cron interpreta `%` como salto de línea.
- `find ... -mtime +13 -delete` mantiene ~14 días de retención.
- `$HOME/backups/` está fuera del docroot (`public_html`), así que los backups no
  son accesibles por web.
- Si el servidor no tuviera el binario `sqlite3`, alternativa con el propio PHP:
  `ea-php83 -r "(new PDO('sqlite:'.getenv('HOME').'/RUTA_APP/database/database.sqlite'))->exec(\"VACUUM INTO '\".getenv('HOME').\"/backups/boda/database-\".date('Y-m-d').\".sqlite'\");"`

Restaurar: poner el sitio en mantenimiento, copiar el backup sobre
`database/database.sqlite`, borrar `database.sqlite-wal` y `database.sqlite-shm`
si existen, y levantar el sitio.
