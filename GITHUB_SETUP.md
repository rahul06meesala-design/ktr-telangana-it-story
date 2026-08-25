# Running this entirely on GitHub (including from mobile)

This project now includes `.github/workflows/render.yml`, which makes
GitHub itself do the rendering — you never need to run `npm install` or
`npm run render` on your own device. You only need to get files into the
repo; GitHub's servers do the rest.

## 1. Create the repository

On desktop or mobile browser (or the GitHub mobile app):

1. Go to github.com → tap **+** → **New repository**
2. Name it e.g. `ktr-telangana-it-story`
3. Set it to **Private** (recommended, since it contains an unfinished
   political documentary) or Public — your call
4. Create it **without** a README (this project already has one)

## 2. Upload the project files

**From a laptop (easiest, one-time):**
```bash
cd ktr-telangana-it-story
git init
git add .
git commit -m "Initial KTR documentary project"
git branch -M main
git remote add origin https://github.com/<your-username>/ktr-telangana-it-story.git
git push -u origin main
```

**From mobile / entirely in the browser (no laptop needed):**
1. Unzip the project on your phone (most file managers can unzip)
2. On the repo page, tap **Add file → Upload files**
3. Drag/select the files — GitHub's uploader supports whole folders on
   desktop browsers; on mobile you may need to upload files a few at a
   time, or use the **GitHub mobile app's** "Add file" flow per folder
4. Commit directly to `main`

Either way, once `.github/workflows/render.yml` is in the repo, the next
step happens automatically.

## 3. Let GitHub render it

As soon as you push/upload anything to `main`, GitHub Actions
automatically:
1. Installs Node.js and all dependencies
2. Renders the full MP4
3. Renders a thumbnail PNG
4. Uploads both as downloadable **artifacts**

To watch it happen or trigger it manually:
1. Go to the **Actions** tab of your repo
2. Click **Render KTR Documentary** in the left sidebar
3. Click **Run workflow** (or just wait if you just pushed — it starts
   automatically)
4. Click into the running/finished job to see progress and logs

This works from a phone browser exactly like desktop — the Actions tab
is fully usable on mobile.

## 4. Download the finished video

1. Open the completed workflow run (green checkmark) in the **Actions**
   tab
2. Scroll to the bottom — you'll see **Artifacts**: `KTR-Telangana-IT-Story`
   and `thumbnail`
3. Tap/click to download the zip, which contains your MP4

## 5. Adding real assets (photos, video, narration audio) later

Every time you add or replace a file under `public/assets/...` and push
it, the workflow re-runs and produces a fresh render automatically — you
don't need to touch any commands. This is the easiest path if you're
doing everything from a phone: use GitHub's mobile upload flow to drop
files into the right `public/assets/<category>/` folder (see
`ASSET_INSTRUCTIONS.md` for exact filenames), then check the Actions tab
a few minutes later for the new video.

## 6. If you also want an interactive editor (optional)

If at some point you want to preview/tweak the project interactively
rather than just re-rendering after each upload, open a **Codespace**
instead (Code → Codespaces → Create codespace on main) — this gives you
a full VS Code + terminal in the browser, usable from mobile too. See the
main `README.md` for the `npm run start` preview command once inside a
Codespace.

## Notes on the Actions render

- The workflow uses `ubuntu-latest` GitHub-hosted runners — free minutes
  apply (2,000/month on free private repos, unlimited on public repos).
  A 6-minute 1080p render typically finishes well within the 60-minute
  timeout set in the workflow.
- If a shot's asset file is still missing when the workflow runs, the
  render still completes — it just shows the labeled placeholder card for
  that shot (see `CinematicImage.tsx`), so a missing asset never breaks
  the automated render.
- If narration/music/SFX files don't exist yet, the render will fail on
  the missing audio path. Until you have those, edit
  `src/compositions/KTRDocumentary.tsx` and pass
  `enableNarration={false} enableMusic={false} enableSfx={false}` to
  `<AudioManager />`, commit, and push — silent picture-only renders will
  then succeed.
