# Portfolio Handover

Current state of Neeraj P's portfolio as of November 2026, after PRs #1–#8. Where this disagrees with `CLAUDE.md`, this file is newer.

## Quick facts

| | |
|---|---|
| Repo | `neeraj3000-pm/Neeraj-Portfolio` |
| Live site | https://neeraj-portfolio-orcin.vercel.app/ |
| Hosting | Vercel, auto-deploys every push to `main` |
| Stack | Plain HTML/CSS/JS, no build step, no framework |
| Goal | Make Neeraj read as a strong PM hire to recruiters: credible, specific, proof over claims |

## How changes ship

1. Work on a branch (Claude sessions have used `claude/peaceful-bell-okvcq4`). If that branch's last PR is already merged, restart it from `origin/main` first.
2. Open a PR. Neeraj reviews and merges, or asks Claude to merge.
3. Vercel deploys `main` within a minute or two. Hard refresh (Ctrl/Cmd+Shift+R) to see changes, since images and fonts are cached.

Preview locally with `python3 -m http.server 8000`.

## Files

| Path | What it is |
|---|---|
| `index.html` | Main page |
| `resume.html` | Résumé page, an HTML mirror of the PDF, with a download button |
| `css/style.css` | Everything visual: tokens, fonts, layout, responsive rules |
| `js/script.js` | Theme toggle + toast, typewriter, mobile nav collapse, scroll progress, active nav link, scroll reveals, stat count-up |
| `assets/fonts/` | Self-hosted woff2 fonts (Fontsource, OFL-1.1, latin subset) |
| `assets/images/` | Profile photo (300/600/900 webp + jpg fallback), SyncUp banner, tool and school logos |
| `assets/icons/` | SVG tool logos (Jira, Figma, Miro, Notion, Claude) |
| `assets/resume/Neeraj_Resume.pdf` | The downloadable résumé (October 2026 version) |
| `.claude/skills/` | Claude Code skills: `animate`, `emil-design-eng` (tracked in `skills-lock.json`) |

## Page structure (`index.html`, top to bottom)

| Section | Heading |
|---|---|
| Hero | Name, typewriter "Product manager by day.", lede, photo, CTAs |
| About | Bio + 4 count-up stats (3,000+ assets/day, 180→30 min, 20%, 15%) |
| Experience | "Where I've shipped things": Planetcast, Desynova, Atlas Copco |
| Skills | "What I actually use": skill tags + tool tags with real logos |
| Achievements | "Things I have achieved.": 4 items |
| Side Projects | "Something I shipped, not just scoped.": SyncUp card |
| Certifications | "Keeping the fundamentals sharp.": Power BI, Six Sigma Green Belt |
| Education | "The foundation.": IIM Nagpur, VIT, with logos |
| Contact | "Let's talk": email + LinkedIn |

Nav: Experience · Skills · Projects · Resume · Contact, plus the theme toggle.

## Design system

- **Theme:** light is the default. Dark mode is a matte slate palette, not near-black. The toggle is an animated sun/bat (Batman) switch, and the saved choice is restored by a one-line inline script in each page's `<head>` so there's no flash.
- **Dark-mode toast:** "ACHIEVEMENT UNLOCKED / Welcome to the dark side." in Press Start 2P, shown only when switching *to* dark.
- **Colour:** black/white with a single red accent (`--red`). All colours are tokens on `:root` (dark) overridden by `[data-theme="light"]`.
- **Type:** Space Grotesk (headings, 600/700), IBM Plex Sans (body, 400/500/600), IBM Plex Mono (labels, stats, chips, 400/500), Press Start 2P (toast only).
- **Shape:** app-like rounded corners (12–28px on cards and buttons, full pills on nav and tags).
- **Motion:** scroll reveals (0.5s, 60ms stagger), count-up stats, 200ms hover transitions, press feedback (`scale(0.97)`) on buttons, hover motion limited to mouse devices. Everything respects `prefers-reduced-motion`.

## SyncUp (Side Projects)

- Live app: https://sync-up-nine.vercel.app/ · Build story: https://sync-up-nine.vercel.app/about (it links back to this portfolio).
- The banner is the app's own `/about` hero in dark mode, captured at 3x pixel density and saved at 1600px so it stays sharp on retina screens. To refresh it after the app changes, re-capture it the same way. Don't upscale a regular screenshot.
- The card copy pairs the personal origin story with PM-craft bullets from the résumé: PRD authorship, directing AI-paired engineering, product principles, extensible data model, data-retention policy.

## Rules and gotchas

**Copy**
- The résumé PDF is the source of truth for every claim and number. Don't invent metrics.
- `resume.html` must stay in sync with the PDF. It had drifted once (a stale 10% TAT figure and missing sections).
- No em-dashes in site prose. They read as AI-written; use commas, colons or periods.

**Assets**
- Brand colours and logos come from primary sources (e.g. the `simple-icons` npm package), never from memory or a summarised web page. One summarised fetch once returned a made-up hex code.
- Images are served as WebP and sized to their slot. The hero photo uses `srcset`, so add new sizes there rather than shipping one large file.
- New font weights: add the woff2 from the matching `@fontsource/*` npm package to `assets/fonts/` plus an `@font-face` rule. Don't re-add the Google Fonts stylesheet; it was the biggest speed cost.

**Layout and CSS**
- **Mobile nav is at its width limit.** Five links plus the toggle fit down to 320px only because the sub-640px sizes were tuned by measurement. Adding a sixth item means re-measuring at 320–430px.
- In the mobile media query, set `.container` padding with `padding-left`/`padding-right` only. The `padding` shorthand wipes page-specific top/bottom padding (this broke the résumé page once).
- Keep `.btn:active` after the `:hover` rules, or hover's lift overrides the press feedback during a click.

**Verifying changes**
- Before pushing, screenshot light and dark mode at desktop and phone widths (320/390px).
- Pixel-diffing against `main` has caught real regressions. Lighthouse is a good speed check.

## History

| PR | What changed |
|---|---|
| #1 | Light mode default, sun/bat toggle, mobile nav that collapses to a hamburger on scroll, mobile overflow fixes, Skills rework with real logos, favicon, em-dash cleanup, Achievements to 4 items, Certifications and Education sections, first speed pass |
| #2 | Added the `animate` and `emil-design-eng` Claude Code skills |
| #3 | Animation polish from the `emil-design-eng` review (press feedback, hover gating, stagger, toast timing) |
| #4 | Side Projects section featuring SyncUp, "Projects" nav link |
| #5 | Updated SyncUp banner, re-captured sharper for retina |
| #6 | October résumé PDF, SyncUp PM-craft bullets, `resume.html` re-synced with the PDF |
| #7 | Speed pass (self-hosted fonts, right-sized photo, deferred JS) and dead-code cleanup |
| #8 | LinkedIn label now matches the real URL |

## Performance (Lighthouse, after #7)

| Page | Performance | Accessibility | Best Practices | SEO | LCP |
|---|---|---|---|---|---|
| Home, mobile | 96 | 100 | 100 | 100 | 2.6s |
| Home, desktop | 100 | 100 | 100 | 100 | 0.5s |
| Résumé, mobile | 99 | 100 | 100 | 100 | 1.8s |

The site makes zero third-party requests and has zero layout shift.

## Still open

- **Hobbies / personal section** before Contact. Ideas so far: movies, F1, music, gaming, cats, travel, possibly in the photo + nickname format from Pratyush's site (madebypratyush.webflow.io). Content not finalised.
- **Pet website project**, the second side project. Nothing gathered yet.
- **Case-study cards** for work projects (analytics dashboard, GenAI subtitles, JioHotstar migration). They were drafted in an old content doc but never built. Proof of work ranks above commentary for recruiters.
- **Mobile-specific layout.** Neeraj asked whether mobile could be "slightly different". The nav is done, but what else he means was never scoped.
- **Custom domain**, not bought yet.
- **Interactive portfolio artifact** idea, deferred by Neeraj. Ask about it.
- **Browser caching headers** via `vercel.json`, skipped on purpose: images get replaced under the same filename, so long caching would serve stale files. Worth doing once filenames carry a version.
- **`CLAUDE.md` is out of date.** It still says dark mode is the default, Achievements is titled "Proof, Not Just Claims", and it doesn't mention SyncUp or the speed work. Update it or point it at this file.
