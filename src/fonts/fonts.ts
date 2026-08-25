/**
 * Central Telugu font loader.
 *
 * We use @remotion/google-fonts (Noto Sans Telugu), which ships the font
 * files inside the npm package itself -- no runtime network fetch is
 * needed at render time, so `npm run render` works on an offline/CI
 * machine. Every text component (CinematicText, DocumentaryText,
 * LowerThird, DataCard, Graph, MapAnimation) calls `loadFont()` from this
 * same underlying package; Remotion de-dupes repeated loads of the same
 * font automatically, so calling it in each file is safe and keeps each
 * component self-contained.
 *
 * If you'd rather use a specific licensed Telugu font file instead of
 * Noto Sans Telugu (e.g. a broadcast-licensed typeface), replace the
 * `loadTeluguFont()` export below with `@remotion/fonts`'s `loadFont()`
 * pointed at a local .woff2/.ttf under this folder, and re-export the
 * same `fontFamily` string so no other file needs to change.
 */
import { loadFont } from "@remotion/google-fonts/NotoSansTelugu";

export const loadTeluguFont = () => loadFont();

export const { fontFamily: teluguFontFamily } = loadFont();
