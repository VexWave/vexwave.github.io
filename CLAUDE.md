# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A one-page marketing site for VexWave (the desktop app lives at `github.com/VexWave/vex-app`).

## Tooling

- **Bun**, not npm. `bun.lock` is the lockfile, CI runs `bun install --frozen-lockfile`. `README.md` is unmodified `sv create` boilerplate and its `npm install` instructions are wrong; ignore it.
- `bun run check` (svelte-check) is the **only** verification gate; there are no tests and no linter. CI runs it before building, so a type or a11y error there fails the deploy. Bun's own `bun check` defers to this script; with `--no-script` it skips `.svelte` files entirely, so it is not a substitute.
- Every script runs on Bun's runtime (`bun --bun`), so Node is not needed. SvelteKit 3 requires Node 22.17+ when run under Node.
- `typescript` stays: svelte-check requires it as a peer. Both it and SvelteKit 3 cap TypeScript at 6.
- `.npmrc` sets `engine-strict=true`.

## Static prerendering

`src/routes/+layout.ts` sets `prerender = true` and `vite.config.ts` uses `adapter-static`. GitHub Pages serves files only, so **there is no server at runtime**: no `+page.server.ts`, no `+server.ts` endpoints, no form actions, no server `load`. Everything must be resolvable at build time.

Prerendered HTML is hydrated on the client, so component render must be deterministic: no `Math.random()`, `Date.now()`, or `window` reads during render, or the client will reconcile against different markup. `src/lib/components/WaveBars.svelte` uses a seeded `noise()` function for exactly this reason; follow that pattern instead of reaching for randomness.

## Base path

`vite.config.ts` reads `BASE_PATH`, which `.github/workflows/deploy.yml` passes from `actions/configure-pages`. It is **unset locally**, and any value not starting with `/` is ignored, so a broken base path will not show up in `bun run dev`.

Consequences:

- Internal links go through `resolve` from `$app/paths`: `href={resolve('/about')}`, never `href="/about"`. SvelteKit 3 removed `base`.
- Reference assets by importing them (`import logo from '#lib/assets/vex-logo.png'`) so Vite rewrites the URL. Hand-written paths into `static/` bypass the base path and break on a prefixed deploy.

## `#lib`

SvelteKit 3 dropped `$lib`. The `#lib` alias is Node subpath imports, declared in `package.json` `imports`. Bare `'#lib'` maps to `src/lib/index.ts`; `'#lib/...'` paths need the file extension.
- `static/.nojekyll` must stay; without it Pages strips the `_app/` build directory.

## Svelte

Runes mode is **forced** in `vite.config.ts` for every file outside `node_modules`. Use `$props`, `$state`, `$derived`, `$effect`; `export let` and `$:` will not compile.

## Styling

- Single dark theme on purpose (`color-scheme: dark` in `src/app.css`, no light-mode branch), because the product screenshots are dark-on-dark. Do not add a light palette.
- The page is built on the taste-skill kit, vendored as plain files in `static/kit/` (system, cards, motion, layout, icons, the terminal fragment, the pinned-chapters moment). `src/app.html` links its CSS through `%sveltekit.assets%`; `src/routes/+layout.svelte` imports its scripts in `onMount`, after hydration, because they rewrite DOM that Svelte would otherwise reconcile. Don't edit kit files; use its classes (`.wrap`, `.grid`, `.span-*`, `.btn`, `.section`, `footer.closing`).
- The palette is the kit's `--p-*` tokens (plus `--ground-*` and the brand `--wave*` triad), set on `html:root` in `src/app.css` so they outrank the kit's own defaults. Fonts are `--font-display`/`--font-text`/`--font-mono`. Components read the ground tokens the kit derives (`--bg`, `--ink`, `--muted`, `--line`, `--accent`). Don't hardcode hex values.
- Every section is exactly one or two screens tall (`--h`; `--hm` on phones) with its h2 first. The header is the only fixed element. The exception is `#features` while the pinned moment is live (desktop): one screen of scroll per chapter (`--mo-hold: var(--n)`), so chapters + 1 screens, the pace the client asked for.
- Styles are component-scoped. Kit-generated markup needs `:global()` (e.g. `#features :global(.mo-pc__visuals)`).
- Fonts are self-hosted (`@fontsource/*` plus a vendored Outfit 600 woff2 for the wordmark). No CDN font links.

## Conventions

- Tabs for indentation, single quotes in TS/JS. No formatter is configured, so match surrounding style by hand.
- No em-dashes or en-dashes anywhere, in page copy or comments. Use a colon, a semicolon, or two sentences.
- Comment only what the code cannot say for itself, one line where possible. No block comments restating the markup or CSS below them.
