# Portfolio Project — Context for Claude Code (Updated)

Drop this file as `CLAUDE.md` in the root of the `portfolio` project folder before opening it in Claude Code. Claude Code reads `CLAUDE.md` automatically for project context.

This replaces an earlier handoff doc from a previous session — that one is now stale. This one reflects everything done since, working from a separate Claude chat (not Claude Code) where changes were drafted as code blocks/files and the user manually applied them via GitHub Desktop or the GitHub web editor.

---

## Who this is for

**Neeraj P** — Product Manager, 2+ years experience, currently at Planetcast Media Services (media tech / streaming, MAM platforms for clients including JioHotstar, Amazon Prime, Disney, National Geographic, Colors, Star). MBA from IIM Nagpur, B.Tech ECE from VIT Vellore. Personality: witty/sarcastic, into movies/shows, sports (F1), music, gaming, cats. Now has Claude Pro and wants to use Claude Code going forward instead of manually copy-pasting code blocks from chat.

**Primary goal:** the site needs to make Neeraj look like a strong Product Manager hire to recruiters — impressive, credible, not gimmicky.

## Repo & hosting

- **GitHub repo:** `https://github.com/neeraj3000-pm/Neeraj-Portfolio` (public)
- **Live site:** `https://neeraj-portfolio-orcin.vercel.app/`
- **Hosting:** Vercel, connected via GitHub integration — every push to `main` auto-deploys.
- **Stack:** Plain HTML/CSS/JS, no build step, no framework. Keep it that way unless Neeraj explicitly asks otherwise.
- **Files:** `index.html`, `resume.html`, `css/style.css`, `js/script.js`, `assets/images/profile.jpg`, `assets/resume/Neeraj_Resume.pdf`

## Git setup — known issue

- Neeraj has **GitHub Desktop** installed, which bundles its own git but does **not** expose `git` to the system PATH. Plain Command Prompt sessions get `'git' is not recognized`.
- If you hit this: check whether Claude Code's own environment can run git regardless (it may have its own bundled toolchain). If not, the cleanest fix is having Neeraj install **Git for Windows** from git-scm.com so `git` works from any terminal, including yours.
- The repo is already initialized locally (wherever Neeraj's local clone lives) and connected to the GitHub remote — confirm the local folder Claude Code is pointed at is actually a clone of the current repo (it's been deleted/recreated once before, so an old local folder could be stale — if in doubt, do a fresh `git clone https://github.com/neeraj3000-pm/Neeraj-Portfolio.git`).
- Always show Neeraj the diff and get confirmation before committing/pushing — he's learning this workflow, not just delegating it blindly.

## What's been done (verify these actually landed — see note at bottom)

Design system: black + red theme, matte slate dark mode (`--bg: #17181b`, `--surface: #1e2024`, etc. — not near-black), light mode also available via toggle, `Space Grotesk` / `IBM Plex Sans` / `IBM Plex Mono` fonts, app-like rounded corners throughout (12-28px radii on cards/buttons, full pill on nav/tags).

1. **Dark mode recolored** to matte slate, toast redesigned from GTA-style ("WASTED"/"MISSION PASSED") to "Achievement Unlocked" style in an 8-bit `Press Start 2P` font, silent on toggle-to-light.
2. **Scroll-triggered reveal animations** — section headers slide in from left, cards/items fade up staggered, two stats count up from 0 (`data-count`/`data-suffix` attributes + `IntersectionObserver` in `script.js`). Respects `prefers-reduced-motion`.
3. **Copy overhaul** — hero lede, About section (companies + institutions folded in, no separate "Background" section), Experience section rewritten to be AI-first-PM-positioned pulling from Neeraj's actual resume (mentions AI/ML + Android/iOS engineer collaboration, web+mobile shipping, the 2026 workflow migration achievement that was previously missing from the site). 4 stats now instead of 3 (added 15% TAT cut). Contact section copy broadened beyond just "workflow automation."
4. **Nav pill enlarged**, mobile edge padding increased (there was a bug: `.hero { padding: 100px 0 80px; }` used 3-value shorthand which zeroed out horizontal padding site-wide on the hero — fixed to `padding-top`/`padding-bottom` only).
5. **Achievements section renamed** from "Things I'm proud of" to "Proof, Not Just Claims."
6. **Hero restructured** into a two-column grid — text left, large profile photo right (4:5 crop, rounded corners, drop shadow), stacking with photo-on-top on mobile. The small photo thumbnail that used to sit in the About section was removed (moved up to hero, About is now full-width text).

## Outstanding / not yet done

From a longer prioritized list Neeraj gave, **Tier 3 items are still pending**:

- **Light mode as default** (currently dark is default via `data-theme="dark"` on `<html>`), plus improving the light mode palette, plus making the dark-mode toggle icon more visually prominent.
- **Mobile-specific layout differences** — Neeraj asked "can the mobile version be made slightly differently" — this was never scoped in detail, needs clarifying what he means (a genuinely different layout/content emphasis on mobile vs. just responsive scaling of the same layout).
- **Hobbies/About-me section** — brief personal-interests section near the end of the page, before Contact. Neeraj mentioned movies, games, cats, travel, curiosity as candidates in a content draft he shared, but hasn't finalized exact content or visual treatment. His friend's site (referenced below) uses a photo+nickname format for this that Neeraj liked conceptually.
- **Two new prototype/side-project entries** — a matching app and a pet website. No details gathered yet on what these actually are — need to ask Neeraj to describe them (or check if he has separate specs/mockups).
- **A "Selected Work" section** with 2-3 clickable case-study-style project cards (dashboard story, GenAI subtitles, JioHotstar migration) was drafted in a content doc Neeraj shared but **not yet implemented in code** — flagged as high-value based on video research Neeraj did (see below) but deliberately deferred to keep page length in check. Worth raising with Neeraj as a next step.
- **Custom domain** — not yet purchased/connected. Current URL is a Vercel subdomain.
- **Interactive artifact / prototype idea** — Neeraj has an idea for a standalone interactive project he wants to build as a portfolio artifact, explicitly deferred to "later." Ask him about it when other items are done.

## Useful context Neeraj has gathered himself

- He watched a video (a PM-portfolio-building tutorial) whose core takeaway was: **"proof of work" (something clickable/interactive) ranks far above "commentary"** (static text descriptions) in a recruiter's eyes. This is the reasoning behind wanting the "Selected Work" section and the interactive artifact idea above.
- He shared a friend's portfolio (`https://madebypratyush.webflow.io/`) as inspiration. Notable things from it worth drawing on if relevant: skills framed as realistic work scenarios rather than a flat tag list, dedicated case-study pages per project, a personality/about section built from photo+nickname pairs, a real contact form instead of just mailto links, client logos on project cards.
- He has his actual resume content (Planetcast, Desynova, Atlas Copco Group experience, IIM Nagpur MBA, VIT Vellore B.Tech, IDFC FAME 3.0 finalist, published ML research paper) — use it as ground truth for any further copy work rather than inventing new claims.

## ⚠️ Important — verify before assuming state

The last two changes described above (achievements heading rename + hero photo restructure) were prepared as full replacement files (`index.html` and `style.css`) in the previous chat session and handed to Neeraj to manually apply. **It is not confirmed whether he has actually committed and pushed them yet** — check the live repo/site against what's described here before building further on top of it. If they're missing, you may need to reapply them or ask Neeraj whether he wants you to.

## How to start

1. Confirm your local folder is an up-to-date clone of the GitHub repo, and that you can run `git` commands (see Git setup note above).
2. Diff what's actually live against the "What's been done" list above.
3. Pick up with the "Outstanding" list — Neeraj will likely want to prioritize which of those to tackle next.
4. Keep explaining your git actions in plain language as you go — Neeraj is deliberately using this project to learn the workflow, not just outsourcing it.
