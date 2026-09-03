# Deployment guide

Getting Copybook from your machine to a live Vercel URL, with GitHub Actions running the
pipeline. Roughly 20 minutes end to end.

## How it ships today

**Vercel's Git integration is the deployer.** It watches `main`, builds on Vercel, and
publishes to https://copybook-nine.vercel.app. No secrets, no configuration.

`.github/workflows/ci.yml` runs alongside it and holds two jobs:

| Job | What it does |
|-----|--------------|
| `verify` | Lint, typecheck, build, upload `dist/` — runs on every push and PR |
| `deploy` | **Inert by default.** Without the three Vercel secrets it writes "Deploy skipped" to the run summary and exits green |

The `deploy` job is wired but switched off on purpose: with the Git integration live, a
second deployer would ship every commit twice. Steps 3-7 below turn it on and hand the
deploy to Actions — worth doing if you want lint and typecheck to *gate* production rather
than just report on it. Skip them if the current setup is fine.

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

The workflow passes on this first push: `verify` runs for real and `deploy` reports itself
skipped. Nothing fails for want of a secret.

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

This is the step that arms the `deploy` job. Until all three exist it stays inert.

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

| Trigger | Secrets set | Result |
|---------|-------------|--------|
| PR into `main` | either | Verify only — `deploy` doesn't run on PRs |
| Push to `main` | no | Verify, then `deploy` logs "skipped" and passes |
| Push to `main` | yes | Verify, then a **production** deploy |

Deploys use `vercel pull` → `vercel build` → `vercel deploy --prebuilt`. Building on the
runner rather than on Vercel means the artifact you tested is the artifact that ships.

`concurrency` cancels superseded runs, so rapid pushes won't race each other. **A run
marked "cancelled" right after a second push is this working as intended, not a failure** —
the older commit's run is dropped because a newer one supersedes it.

---

## Troubleshooting

**`Error: No existing credentials found`** — `VERCEL_TOKEN` is missing, misnamed, or
expired. Check the secret name character for character.

**`Project not found`** — `VERCEL_ORG_ID` or `VERCEL_PROJECT_ID` doesn't match
`.vercel/project.json`. Re-run `vercel link` and re-copy both.

**Deploy job says "skipped"** — expected until all three secrets are set. The job passes
green; read the run summary for which one is missing. It also never runs on PRs, and
`needs: verify` skips it whenever the quality gate fails.

**A run shows "cancelled"** — `concurrency.cancel-in-progress` dropped it because you
pushed again while it was running. The newer run is the one that counts.

**Vercel deployment sits in "Building" for a long time** — queued on Vercel's side, not a
repo problem. A build here takes roughly 4-5 minutes end to end; the commit status on
GitHub stays yellow for that whole window. If it's still yellow well past that, open the
build log from the commit's status link and look for a hung install step.

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
