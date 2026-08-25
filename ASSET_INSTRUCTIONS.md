# Asset Instructions — KTR Telangana IT Story

## Read this first: how to source assets for shots showing K. T. Rama Rao

The production brief's own **ASSET PRIORITY** section ranks sources as:
1. User-provided images/videos
2. Licensed stock
3. Public-domain / Creative Commons assets with attribution where required
4. Official institutional assets where reuse is permitted
5. AI-generated visuals **for missing scenes**

...and separately states, under the KTR reference board:

> "For KTR shots, use real/licensed images or video supplied by the
> editor. Do not fabricate identifiable event footage, quotes or
> political statements."

**This project follows that instruction literally.** The `videoData.ts`
file marks 10 shots `realFootageRequired: true` (shots 2, 12, 13, 14, 36,
37, 39, 40, 57, 62 — everywhere K. T. Rama Rao appears on screen). For
those shots:

- Do **not** run the shot's `visualBrief` text through an AI image/video
  generator to synthesize his likeness — that would produce a fabricated
  (deepfake-style) depiction of a real, identifiable public figure, which
  the brief itself asks you to avoid and which this project does not
  automate.
- Instead, source an actual photograph or video clip of him from a
  licensed source (see the Reference Image Board below for candidates the
  brief already gathered) and place it at the listed `assetPath`. Verify
  the license/attribution terms on the source page before final publication
  — several of the brief's reference images are noted as editorial /
  copyrighted and are for shot-matching reference only.
- Until a real asset is in place, `CinematicImage` will render a labeled
  "Real/licensed photo or video required" placeholder instead of a blank
  or fabricated frame, so a missing KTR asset is always obvious in preview.

All other 53 shots (skylines, HITEC City, T-Hub/T-Works/WE Hub facilities,
generic founders/engineers/officials — nobody real or identifiable) are
open to AI-generated visuals per priority tier 5, using each shot's
`visualBrief` field in `videoData.ts` as the prompt, or real B-roll/stock
footage per tiers 1–4.

## Reference Image Board (from the brief)

| Reference | Best for shots | Source |
|---|---|---|
| KTR at T-Hub Foundation Day | 02, 36, 39, 57 | deccanrepublic.com |
| KTR at Hyderabad innovation event | 02, 14, 36, 39 | yourstory.com |
| KTR in formal investor/company meeting | 13 | thehansindia.com |
| Hyderabad HITEC City skyline at night (CC BY 4.0 — verify) | 01, 03, 11, 60, 63 | Wikimedia Commons |
| Cyber Towers / HITEC City (public domain — verify) | 03, 04, 05, 08, 41, 54 | Wikimedia Commons |
| Charminar at night (CC BY-SA 4.0 — verify) | 01, 03, 58 | Wikimedia Commons |
| T-Hub building | 19 + T-Hub establishing shots | t-hub.co |
| T-Works building | 28 + hardware section | ssmb.in |
| WE Hub launch/event | 31–33 | thenewsminute.com |

Always re-verify each Wikimedia file's current license/attribution
requirement on its file page before using it in the final export.

## Full 63-shot asset map


| Shot | Act | Title | Duration | Category | Asset path | Real footage required |
|---|---|---|---|---|---|---|
| 01 | 1 | OPENING: “KTR ANTE IT” | 6s | hyderabad | `public/assets/hyderabad/shot-01-opening-ktr-ante-it.jpg` | no (AI-gen or stock OK) |
| 02 | 1 | KTR PUBLIC IMAGE | 6s | ktr | `public/assets/ktr/shot-02-ktr-public-image.jpg` | **YES** |
| 03 | 1 | “BUT IT DIDN'T START WITH KTR” | 6s | hyderabad | `public/assets/hyderabad/shot-03-but-it-didnt-start-with-ktr.jpg` | no (AI-gen or stock OK) |
| 04 | 2 | HITEC CITY | 6s | hyderabad | `public/assets/hyderabad/shot-04-hitec-city.jpg` | no (AI-gen or stock OK) |
| 05 | 2 | GLOBAL COMPANIES | 6s | hyderabad | `public/assets/hyderabad/shot-05-global-companies.jpg` | no (AI-gen or stock OK) |
| 06 | 2 | SKILLED WORKFORCE | 6s | hyderabad | `public/assets/hyderabad/shot-06-skilled-workforce.jpg` | no (AI-gen or stock OK) |
| 07 | 2 | INFRASTRUCTURE | 6s | hyderabad | `public/assets/hyderabad/shot-07-infrastructure.jpg` | no (AI-gen or stock OK) |
| 08 | 2 | THE FACT CHECK | 6s | hyderabad | `public/assets/hyderabad/shot-08-the-fact-check.jpg` | no (AI-gen or stock OK) |
| 09 | 3 | TELANGANA FORMATION | 6s | hyderabad | `public/assets/hyderabad/shot-09-telangana-formation.jpg` | no (AI-gen or stock OK) |
| 10 | 3 | NEW STATE NEEDS INVESTMENT | 6s | government | `public/assets/government/shot-10-new-state-needs-investment.jpg` | no (AI-gen or stock OK) |
| 11 | 3 | HYDERABAD AS ENGINE | 6s | hyderabad | `public/assets/hyderabad/shot-11-hyderabad-as-engine.jpg` | no (AI-gen or stock OK) |
| 12 | 4 | KTR ENTERS THE STORY | 6s | ktr | `public/assets/ktr/shot-12-ktr-enters-the-story.jpg` | **YES** |
| 13 | 4 | INVESTOR MEETINGS | 6s | ktr | `public/assets/ktr/shot-13-investor-meetings.jpg` | **YES** |
| 14 | 4 | INTERNATIONAL PROMOTION | 6s | ktr | `public/assets/ktr/shot-14-international-promotion.jpg` | **YES** |
| 15 | 4 | “HYDERABAD HAS TALENT” | 6s | startups | `public/assets/startups/shot-15-hyderabad-has-talent.jpg` | no (AI-gen or stock OK) |
| 16 | 5 | NEXT MICROSOFT? | 6s | startups | `public/assets/startups/shot-16-next-microsoft.jpg` | no (AI-gen or stock OK) |
| 17 | 5 | JOB SEEKER → FOUNDER | 6s | startups | `public/assets/startups/shot-17-job-seeker-founder.jpg` | no (AI-gen or stock OK) |
| 18 | 5 | STARTUP ECOSYSTEM | 6s | startups | `public/assets/startups/shot-18-startup-ecosystem.jpg` | no (AI-gen or stock OK) |
| 19 | 6 | T-HUB REVEAL | 6s | thub | `public/assets/thub/shot-19-t-hub-reveal.jpg` | no (AI-gen or stock OK) |
| 20 | 6 | THE FOUNDER'S PROBLEM | 6s | startups | `public/assets/startups/shot-20-the-founders-problem.jpg` | no (AI-gen or stock OK) |
| 21 | 6 | FUNDING | 6s | startups | `public/assets/startups/shot-21-funding.jpg` | no (AI-gen or stock OK) |
| 22 | 6 | MENTORSHIP | 6s | startups | `public/assets/startups/shot-22-mentorship.jpg` | no (AI-gen or stock OK) |
| 23 | 6 | ECOSYSTEM CONNECTION | 6s | startups | `public/assets/startups/shot-23-ecosystem-connection.jpg` | no (AI-gen or stock OK) |
| 24 | 6 | T-HUB SCALE | 6s | startups | `public/assets/startups/shot-24-t-hub-scale.jpg` | no (AI-gen or stock OK) |
| 25 | 7 | SOFTWARE IS NOT EVERYTHING | 6s | hyderabad | `public/assets/hyderabad/shot-25-software-is-not-everything.jpg` | no (AI-gen or stock OK) |
| 26 | 7 | ROBOT PROTOTYPE | 6s | startups | `public/assets/startups/shot-26-robot-prototype.jpg` | no (AI-gen or stock OK) |
| 27 | 7 | HARDWARE COST | 6s | startups | `public/assets/startups/shot-27-hardware-cost.jpg` | no (AI-gen or stock OK) |
| 28 | 7 | T-WORKS | 6s | tworks | `public/assets/tworks/shot-28-t-works.jpg` | no (AI-gen or stock OK) |
| 29 | 7 | 3D PRINTING | 6s | hyderabad | `public/assets/hyderabad/shot-29-3d-printing.jpg` | no (AI-gen or stock OK) |
| 30 | 7 | PRODUCT TESTING | 6s | hyderabad | `public/assets/hyderabad/shot-30-product-testing.jpg` | no (AI-gen or stock OK) |
| 31 | 8 | WOMAN FOUNDER | 6s | startups | `public/assets/startups/shot-31-woman-founder.jpg` | no (AI-gen or stock OK) |
| 32 | 8 | WE HUB | 6s | wehub | `public/assets/wehub/shot-32-we-hub.jpg` | no (AI-gen or stock OK) |
| 33 | 8 | FUNDING + NETWORKING | 6s | wehub | `public/assets/wehub/shot-33-funding-networking.jpg` | no (AI-gen or stock OK) |
| 34 | 9 | POLICY | 6s | startups | `public/assets/startups/shot-34-policy.jpg` | no (AI-gen or stock OK) |
| 35 | 9 | RESEARCH + INDUSTRY | 6s | hyderabad | `public/assets/hyderabad/shot-35-research-industry.jpg` | no (AI-gen or stock OK) |
| 36 | 10 | KTR AT STARTUP EVENT | 6s | ktr | `public/assets/ktr/shot-36-ktr-at-startup-event.jpg` | **YES** |
| 37 | 10 | DIRECT INTERACTION | 6s | ktr | `public/assets/ktr/shot-37-direct-interaction.jpg` | **YES** |
| 38 | 10 | SOCIAL MEDIA / COMMUNICATION | 6s | startups | `public/assets/startups/shot-38-social-media-communication.jpg` | no (AI-gen or stock OK) |
| 39 | 10 | “KTR = IT” | 6s | ktr | `public/assets/ktr/shot-39-ktr-it.jpg` | **YES** |
| 40 | 11 | THE QUESTION | 6s | ktr | `public/assets/ktr/shot-40-the-question.jpg` | **YES** |
| 41 | 11 | EXISTING STRENGTH | 6s | hyderabad | `public/assets/hyderabad/shot-41-existing-strength.jpg` | no (AI-gen or stock OK) |
| 42 | 11 | NOT ONE PERSON | 6s | startups | `public/assets/startups/shot-42-not-one-person.jpg` | no (AI-gen or stock OK) |
| 43 | 11 | T-HUB IS NOT MAGIC | 6s | startups | `public/assets/startups/shot-43-t-hub-is-not-magic.jpg` | no (AI-gen or stock OK) |
| 44 | 11 | SUCCESS MEASUREMENT | 6s | startups | `public/assets/startups/shot-44-success-measurement.jpg` | no (AI-gen or stock OK) |
| 45 | 12 | 2023 ELECTION TRANSITION | 6s | government | `public/assets/government/shot-45-2023-election-transition.jpg` | no (AI-gen or stock OK) |
| 46 | 12 | KTR LEAVES MINISTRY | 6s | government | `public/assets/government/shot-46-ktr-leaves-ministry.jpg` | no (AI-gen or stock OK) |
| 47 | 12 | NEW IT LEADERSHIP | 6s | government | `public/assets/government/shot-47-new-it-leadership.jpg` | no (AI-gen or stock OK) |
| 48 | 13 | T-HUB CONTINUES | 6s | thub | `public/assets/thub/shot-48-t-hub-continues.jpg` | no (AI-gen or stock OK) |
| 49 | 13 | T-WORKS CONTINUES | 6s | hyderabad | `public/assets/hyderabad/shot-49-t-works-continues.jpg` | no (AI-gen or stock OK) |
| 50 | 13 | WE HUB CONTINUES | 6s | wehub | `public/assets/wehub/shot-50-we-hub-continues.jpg` | no (AI-gen or stock OK) |
| 51 | 14 | EMPTY POLITICAL STAGE | 6s | hyderabad | `public/assets/hyderabad/shot-51-empty-political-stage.jpg` | no (AI-gen or stock OK) |
| 52 | 14 | INSTITUTION REMAINS | 6s | startups | `public/assets/startups/shot-52-institution-remains.jpg` | no (AI-gen or stock OK) |
| 53 | 14 | NEW GENERATION | 6s | startups | `public/assets/startups/shot-53-new-generation.jpg` | no (AI-gen or stock OK) |
| 54 | 15 | NOT “KTR CREATED IT” | 6s | startups | `public/assets/startups/shot-54-not-ktr-created-it.jpg` | no (AI-gen or stock OK) |
| 55 | 15 | NOT “NOTHING HAPPENED” | 6s | thub | `public/assets/thub/shot-55-not-nothing-happened.jpg` | no (AI-gen or stock OK) |
| 56 | 15 | THE LAYERS | 6s | wehub | `public/assets/wehub/shot-56-the-layers.jpg` | no (AI-gen or stock OK) |
| 57 | 16 | PERSONAL LEADERSHIP | 6s | ktr | `public/assets/ktr/shot-57-personal-leadership.jpg` | **YES** |
| 58 | 16 | BRAND HYDERABAD | 6s | startups | `public/assets/startups/shot-58-brand-hyderabad.jpg` | no (AI-gen or stock OK) |
| 59 | 16 | THE MANY CONTRIBUTORS | 6s | startups | `public/assets/startups/shot-59-the-many-contributors.jpg` | no (AI-gen or stock OK) |
| 60 | 17 | FINAL HYDERABAD | 8s | hyderabad | `public/assets/hyderabad/shot-60-final-hyderabad.jpg` | no (AI-gen or stock OK) |
| 61 | 17 | NEXT GENERATION | 6s | startups | `public/assets/startups/shot-61-next-generation.jpg` | no (AI-gen or stock OK) |
| 62 | 17 | FINAL KTR IMAGE | 6s | ktr | `public/assets/ktr/shot-62-final-ktr-image.jpg` | **YES** |
| 63 | 17 | FINAL SKYLINE | 7s | hyderabad | `public/assets/hyderabad/shot-63-final-skyline.jpg` | no (AI-gen or stock OK) |

## Motion-graphics / typography constraints (from the brief)

**Use:** clean Telugu typography, English technical terms where natural,
chapter cards, year markers, location labels, subtle maps, timelines,
data cards, animated lines, split screens, archival indicators,
restrained graphs, investigative overlays.

**Avoid:** flashy HUD graphics, excessive red/blue political colors,
random transitions, giant glowing text, action-movie effects, excessive
lens flares, fake futuristic interfaces.

Every component in `src/components/` was built to these constraints —
`CinematicText`/`DocumentaryText`/`LowerThird`/`DataCard`/`Graph`/
`MapAnimation` deliberately use muted, low-saturation overlays rather than
broadcast-graphics stingers.

## Audio SFX cue files to source

- `public/assets/sfx/city-ambience-traffic.mp3`
- `public/assets/sfx/crowd-murmur-soft.mp3`
- `public/assets/sfx/keyboard-ambience.mp3`
- `public/assets/sfx/office-ambience.mp3`
- `public/assets/sfx/room-tone.mp3`
- `public/assets/sfx/workshop-machinery.mp3`