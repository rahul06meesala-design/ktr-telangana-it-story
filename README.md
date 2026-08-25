# KTR – Telangana IT Story (Remotion project)

> **Want GitHub to do the install/render for you (including from mobile)?**
> See `GITHUB_SETUP.md` — the repo includes a GitHub Actions workflow that
> renders the MP4 automatically on every push, no local commands needed.

Data-driven Remotion documentary built from `KTR_Telangana_IT_Story_CLAUDE_MASTER.md`.
63 shots, 17 acts, ~6 min 21 sec at the brief's approximate per-shot timings
(1920×1080, 30fps → 11,430 frames). The Telugu narration audio is the real
master timeline — see "Locking picture to the real narration" below.

## 1. Install

```bash
npm install
```

Requires Node.js 18+. `package.json` pins Remotion `4.0.190`; if that
exact version is no longer resolvable when you install, run
`npm install remotion@latest @remotion/cli@latest @remotion/google-fonts@latest @remotion/transitions@latest @remotion/media-utils@latest`
and re-run `npm install` — the APIs used here (`Composition`, `Sequence`,
`Audio`, `Img`, `spring`, `interpolate`, `@remotion/google-fonts`) have
been stable across recent 4.x releases.

## 2. Preview / edit in the Remotion Studio

```bash
npm run start
```

Opens the Remotion Studio at `http://localhost:3000`. Select the
**KTRDocumentary** composition. Every shot currently shows a labeled
"Missing asset" placeholder card until you drop real files into
`public/assets/...` (see below) — the project renders end-to-end with
placeholders, so you can check timing/motion/typography before assets
exist.

## 3. Render the final MP4

```bash
npm run render
```

Outputs to `out/KTR-Telangana-IT-Story.mp4`. For a faster/lower-quality
draft pass:

```bash
npm run render:fast
```

For a single reference frame (thumbnail):

```bash
npm run still
```

## 4. Project structure

```
src/
  Root.tsx                     – registers the KTRDocumentary composition
  index.ts                     – Remotion entry point
  compositions/
    KTRDocumentary.tsx          – renders all 63 shots from data/videoData.ts
  components/
    CinematicImage.tsx          – Ken-Burns-family motion for still images
    ParallaxImage.tsx           – 2-layer parallax (used for KTR portrait shots)
    CameraMove.tsx              – per-MotionType easing/scale/translate math
    CinematicText.tsx           – large ACT/chapter-card typography
    DocumentaryText.tsx         – small investigative-overlay captions
    LowerThird.tsx               – name/role identification card
    DataCard.tsx                 – factual stat overlay (with Counter)
    Counter.tsx                  – animated count-up numbers
    Graph.tsx                    – restrained bar-graph overlay
    MapAnimation.tsx             – abstract location-ping overlay
    ParticleAtmosphere.tsx       – subtle floating dust/haze
    FilmGrain.tsx                 – animated grain overlay
    SceneTransition.tsx           – restrained cross-dissolve in/out per shot
    AudioManager.tsx              – narration + ducked music + per-shot SFX
  data/
    videoData.ts                  – SINGLE SOURCE OF TRUTH: all 63 shots
  fonts/
    fonts.ts                      – central Telugu (Noto Sans Telugu) loader
public/
  assets/
    ktr/ hyderabad/ thub/ tworks/ wehub/ startups/ government/ maps/
    voice/ music/ sfx/
```

The project is fully data-driven: `src/data/videoData.ts` contains one
object per shot (number, act, title, duration, visual description, asset
path, camera-motion type, narration line where the brief specified one,
SFX cue, and — for the 5 shots the source narration attaches a concrete
number to — a `dataCard`). `KTRDocumentary.tsx` simply maps over that
array; there are no 63 hand-coded shot components.

## 5. Replacing placeholder assets

Every `assetPath` in `videoData.ts` points at
`public/assets/<category>/shot-NN-<slug>.jpg`. Drop a same-named file into
that path and it appears automatically — no code changes needed. See
`ASSET_INSTRUCTIONS.md` for the full per-shot list, licensing notes, and
**why KTR-identity shots must use a real photo/video, not an AI-generated
likeness**.

## 6. Locking picture to the real narration

Per the brief: *"The final Telugu narration audio is the master timeline.
Do not unnaturally speed up or compress the narration to fit the
approximate timings."*

1. Record/generate the Telugu VO and save it as
   `public/assets/voice/telugu-narration.wav`.
2. Get its exact duration (`ffprobe -i telugu-narration.wav` or check in
   the Studio's audio waveform).
3. Re-time each shot: open `src/data/videoData.ts` and adjust the
   `durationInSeconds` field per shot so the sum of all 63 shots equals
   the narration length (the file currently sums to 381s / 6:21 from the
   brief's approximate per-shot timestamps). `shotStartFrames` and
   `totalDurationInFrames` recompute automatically from these values —
   nothing else in the code needs to change.
4. Update `durationInFrames` on the `<Composition>` in `Root.tsx` — it
   already reads `totalDurationInFrames` from the data file, so step 3
   alone is sufficient.

## 7. Audio

- `public/assets/voice/telugu-narration.wav` — full-length VO, always at
  full volume.
- `public/assets/music/background.mp3` — looped bed, permanently ducked
  to `0.12` volume in `AudioManager.tsx` so narration stays intelligible
  (per the brief's "music must duck under narration").
- `public/assets/sfx/*.mp3` — quiet (`0.06` volume) per-shot ambience,
  auto-selected per shot category in `videoData.ts` (`sfxCue`). Replace
  these placeholder filenames with real SFX beds; category → suggested
  file is listed in `ASSET_INSTRUCTIONS.md`.

If you don't yet have the real narration/music/SFX files, pass
`enableNarration={false}` / `enableMusic={false}` / `enableSfx={false}`
props to `<AudioManager />` in `KTRDocumentary.tsx` so the render doesn't
fail looking for missing audio files.

## 8. Typography / Telugu font

`src/fonts/fonts.ts` loads **Noto Sans Telugu** via
`@remotion/google-fonts`, which bundles the font files inside the npm
package — no network access needed at render time. All Telugu on-screen
text (chapter cards, lower thirds, data-card labels, captions) uses this
font automatically. Swap in a different/licensed Telugu typeface by
editing that one file (see the comment inside it).

## 9. Motion language (per shot type)

`components/CameraMove.tsx` implements the brief's rule *"do not make
every shot move identically"*: wide skylines get a slow push-in, tall
landmarks get a vertical reveal, roads/traffic get a forward push, KTR
portrait/meeting shots get a subtle parallax push (via `ParallaxImage`),
group/montage shots get a slow crop-pan, and everything else gets a
restrained Ken Burns drift. `videoData.ts` assigns a `motionType` to
every one of the 63 shots based on its visual description.
