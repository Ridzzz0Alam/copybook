# Deployment guide

Getting Strata from your machine to a live Vercel URL, with GitHub Actions running the
pipeline. Roughly 20 minutes end to end.

The pipeline deploys through the **Vercel CLI**, not Vercel's Git integration. That means
GitHub Actions is the single gate: nothing reaches production unless lint, typecheck and
build all pass first. Step 7 turns off the built-in integration so you don't deploy twice.

---

## Step 1 — Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:5173. It should load **dark** by default; check the toggle in the
top right flips to light and back, and that all three sections load as you scroll.

Then confirm the production build works, since this is exactly what CI will run:

```bash
npm run lint
npx tsc -b
npm run build
npm run preview
```

All four should pass with no output errors. If `npm run build` fails but `dev` worked,
it's almost always an unused import — `tsc -b` is stricter than the dev server.

### Optional: clear the inherited advisories

`npm ci` reports 12 vulnerabilities (9 high) carried over in the lockfile. They're in dev
dependencies and won't affect the deployed site, but worth clearing before launch:

```bash
npm audit fix
npm run build          # re-verify nothing broke
```

Avoid `--force` unless you're ready to handle major version bumps.

---

## Step 2 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Strata design archive"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

`.gitignore` already excludes `node_modules`, `dist`, and `.vercel`. Confirm with
`git status` before committing that none of those are staged.

The workflow will fail on this first push — the Vercel secrets don't exist yet. Expected;
Step 6 fixes it.

---

## Step 3 — Link the Vercel project

```bash
npm install --global vercel
vercel login
vercel link
```

Answer the prompts: set up a new project, pick your scope, accept the directory, and take
the detected **Vite** framework preset. `vercel.json` already declares the build command,
output directory and SPA rewrites, so there's nothing to configure in the dashboard.

This writes `.vercel/project.json`. Open it — you need both IDs:

```bash
cat .vercel/project.json
# { "projectId": "prj_xxxxxxxx", "orgId": "team_xxxxxxxx" }
```

Keep the file out of git. It's already in `.gitignore`.

---

## Step 4 — Create an access token

Go to **vercel.com → Settings → Tokens → Create Token**. Give it a name like
`github-actions`, set the scope to the account or team owning the project, and pick an
expiry. Copy the value now — it's shown once.

---

## Step 5 — Do one manual deploy

Before wiring up CI, prove the deployment itself works:

```bash
vercel --prod
```

You should get a live URL. If this fails, fix it here — debugging locally is far faster
than through Actions logs.

---

## Step 6 — Add the repository secrets

In your GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**.

Add three:

| Name | Value |
|------|-------|
| `VERCEL_TOKEN` | The token from Step 4 |
| `VERCEL_ORG_ID` | `orgId` from `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | `projectId` from `.vercel/project.json` |

Names must match exactly — the workflow references them literally. A typo shows up as an
empty value and a confusing CLI error rather than a missing-secret message.

---

## Step 7 — Turn off Vercel's Git integration

This matters. If Vercel is connected to the repo *and* Actions deploys via CLI, every push
deploys twice — and the Vercel-side build bypasses your lint and typecheck gate entirely.

In the Vercel dashboard: **Project → Settings → Git → Disconnect**.

If you'd rather keep the connection, add a `.vercelignore` containing `*` so Vercel's own
builds no-op, or set the project's Ignored Build Step to `exit 0`.

---

## Step 8 — Trigger the pipeline

```bash
git commit --allow-empty -m "Trigger deploy"
git push
```

Watch **Actions** in GitHub. Two jobs run in sequence:

1. **Lint, typecheck & build** — the quality gate, uploading `dist/` as an artifact
2. **Deploy to Vercel** — `needs: verify`, so it's skipped entirely if the gate fails

The deployed URL is written to the job summary at the bottom of the run page.

---

## How the pipeline behaves

Both jobs live in `.github/workflows/ci.yml`. They're in one file deliberately: `needs:`
can only reference jobs in the *same* workflow, so splitting them across two files would
silently drop the gate and let broken code deploy.

| Trigger | Result |
|---------|--------|
| PR into `main` | Verify, then a **preview** deploy on a unique URL |
| Push to `main` | Verify, then a **production** deploy |
| Fork PR | Verify only — forks can't read secrets, so deploy is skipped by design |

Deploys use `vercel pull` → `vercel build` → `vercel deploy --prebuilt`. Building on the
runner rather than on Vercel means the artifact you tested is the artifact that ships.

`concurrency` cancels superseded runs, so rapid pushes won't race each other.

---

## Troubleshooting

**`Error: No existing credentials found`** — `VERCEL_TOKEN` is missing, misnamed, or
expired. Check the secret name character for character.

**`Project not found`** — `VERCEL_ORG_ID` or `VERCEL_PROJECT_ID` doesn't match
`.vercel/project.json`. Re-run `vercel link` and re-copy both.

**Deploy job skipped on a PR** — expected for forks. Also check the verify job actually
passed; `needs: verify` skips deploy on failure.

**Build passes locally, fails in CI** — usually a case-sensitivity issue. macOS and
Windows are case-insensitive; the Ubuntu runner is not. An import written as
`./components/Navigation` resolves locally and 404s in CI.

**404 on refresh at a sub-path** — the SPA rewrite in `vercel.json` handles this. If you
removed it, add it back.

**Fonts don't load** — the Google Fonts `@import` at the top of `src/index.css` needs
network access. If your environment blocks `fonts.googleapis.com`, self-host the four
families instead.

---

## Adding a custom domain

**Project → Settings → Domains → Add** in Vercel, then follow the DNS instructions
(usually an `A` record to `76.76.21.21`, or a `CNAME` to `cname.vercel-dns.com` for a
subdomain). HTTPS is provisioned automatically once DNS resolves. No workflow changes
needed — production deploys promote to the domain on their own.
