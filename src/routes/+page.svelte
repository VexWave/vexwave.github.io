<script lang="ts">
	import { base } from '$app/paths';
	import { GITHUB_MARK } from '$lib';
	import WaveBars from '$lib/components/WaveBars.svelte';
	import TransportBar from '$lib/components/TransportBar.svelte';
	import ShotSlider from '$lib/components/ShotSlider.svelte';
	import logo from '$lib/assets/vex-logo.png';
	import preview from '$lib/assets/shots/library.png';

	const REPO = 'https://github.com/VexWave/vex-app';
	const BACKEND = 'https://github.com/VexWave/vex-backend';

	// Link previews need absolute URLs, and `base` prerenders to a relative path.
	const SITE = 'https://vexwave.github.io';

	const TITLE = 'VexWave, a desktop music player for your own server';
	const DESCRIPTION = 'VexWave is a desktop music player for a backend you host yourself.';
</script>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content={DESCRIPTION} />
	<link rel="canonical" href="{SITE}/" />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="VexWave" />
	<meta property="og:url" content="{SITE}/" />
	<meta property="og:title" content={TITLE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:image" content="{SITE}{preview}" />
	<meta property="og:image:width" content="1800" />
	<meta property="og:image:height" content="1188" />
	<meta
		property="og:image:alt"
		content="The VexWave library, with Static Bloom playing in the transport bar."
	/>

	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<TransportBar href={REPO} />

<header class="masthead">
	<a class="brand" href="{base}/">
		<img src={logo} alt="" width="28" height="26" />
		<span>VexWave</span>
	</a>
	<a class="masthead-link" href={REPO} rel="noreferrer">
		<!-- GitHub mark, Simple Icons (CC0) -->
		<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={GITHUB_MARK} /></svg>
		<span>Source</span>
	</a>
</header>

<main>
	<section class="hero">
		<h1>A desktop music player for your own server.</h1>

		<div class="actions">
			<a class="btn-primary" href={REPO} rel="noreferrer">View on GitHub</a>
			<a class="btn-quiet" href="#setup">What you need</a>
		</div>

		<p class="note">Needs a server. There is no hosted VexWave; you run one and point the app at it.</p>

		<WaveBars count={56} height="5rem" />
	</section>

	<section class="showcase">
		<ShotSlider />
	</section>

	<section class="setup" id="setup">
		<div class="setup-copy">
			<h2>You need a server</h2>
			<p>
				VexWave is the client half. The library, the files and the accounts all live on a server you
				run yourself, so there is no account to sign up for. Put vex-backend on a box you control,
				then enter its address in the app.
			</p>
			<div class="actions">
				<a class="btn-primary" href={BACKEND} rel="noreferrer">Server: vex-backend</a>
				<a class="btn-quiet" href={REPO} rel="noreferrer">App: vex-app</a>
			</div>
		</div>

		<div class="col">
			<h2 class="col-label">Connection</h2>
			<dl class="fields">
				<div><dt>Host</dt><dd>music.yourbox.lan</dd></div>
				<div><dt>Port</dt><dd>8790</dd></div>
				<div><dt>User</dt><dd>you</dd></div>
				<div><dt>Password</dt><dd>••••••••</dd></div>
			</dl>
		</div>
	</section>
</main>

<footer class="foot">
	<span>VexWave</span>
	<span class="repos">
		<a href={REPO} rel="noreferrer">vex-app</a>
		<a href={BACKEND} rel="noreferrer">vex-backend</a>
	</span>
</footer>

<style>
	/* ---- shell ---------------------------------------------------------- */

	.masthead,
	main,
	.foot {
		max-width: 1180px;
		margin: 0 auto;
		padding-inline: clamp(1rem, 4vw, 2.5rem);
	}

	.masthead {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-block: 1.6rem;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-family: var(--display);
		font-size: 1.15rem;
		text-decoration: none;
	}

	.masthead-link {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		font-family: var(--mono);
		font-size: 0.78rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--paper-dim);
		text-decoration: none;
		transition: color 160ms ease;
	}

	.masthead-link svg {
		width: 17px;
		height: 17px;
	}

	.masthead-link:hover {
		color: var(--wave-bright);
	}

	main {
		display: flex;
		flex-direction: column;
		gap: clamp(3.5rem, 8vw, 6.5rem);
		padding-bottom: clamp(5rem, 11vw, 9rem);
	}

	/* ---- shared bits ---------------------------------------------------- */

	.actions {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.85rem 1.25rem;
	}

	.btn-primary,
	.btn-quiet {
		font-family: var(--display);
		font-size: 1rem;
		text-decoration: none;
		border-radius: 999px;
		padding: 0.75rem 1.6rem;
		transition:
			background 180ms ease,
			border-color 180ms ease,
			transform 180ms cubic-bezier(0.22, 0.7, 0.2, 1);
	}

	.btn-primary {
		background: var(--wave);
		color: var(--paper);
		box-shadow: 0 0 0 1px color-mix(in srgb, var(--wave-edge) 55%, transparent);
	}

	.btn-primary:hover {
		background: var(--wave-edge);
		transform: translateY(-1px);
	}

	.btn-quiet {
		border: 1px solid var(--line-bright);
		color: var(--paper-dim);
	}

	.btn-quiet:hover {
		border-color: var(--wave-edge);
		color: var(--paper);
	}


	/* ---- hero ------------------------------------------------------------ */

	.hero {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding-top: clamp(2rem, 6vw, 4.5rem);
	}

	/* Carries the hero on its own, so it runs larger than any heading below. */
	.hero h1 {
		font-size: clamp(2.8rem, 7vw, 5.5rem);
		max-width: 17ch;
	}

	.hero .actions {
		margin-top: 0.6rem;
	}

	/* Sits with the buttons rather than waiting in the setup section below. */
	.note {
		max-width: 52ch;
		padding-left: 0.9rem;
		border-left: 2px solid var(--wave);
		font-family: var(--mono);
		font-size: 0.8rem;
		line-height: 1.7;
		color: var(--wave-bright);
	}

	.hero :global(.wave) {
		margin-top: 1.5rem;
		mask-image: linear-gradient(to right, #000 0%, #000 62%, transparent 100%);
	}

	/* ---- showcase ---------------------------------------------------------- */

	.showcase {
		margin-top: clamp(1.5rem, 4vw, 3rem);
	}

	/* ---- setup ------------------------------------------------------------- */

	/* Also the page's sign-off, hence the rule and the closing headline size. */
	.setup {
		display: grid;
		grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
		gap: clamp(2rem, 5vw, 4rem);
		align-items: start;
		padding-top: clamp(2rem, 5vw, 4rem);
		border-top: 1px solid var(--line);
	}

	.setup-copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.5rem;
	}

	.setup-copy h2 {
		font-size: clamp(2rem, 4.4vw, 3.2rem);
	}

	.setup-copy p {
		max-width: 50ch;
		font-size: clamp(1.02rem, 1.4vw, 1.12rem);
		color: var(--paper-dim);
	}

	.col-label {
		font-family: var(--mono);
		font-size: 0.75rem;
		font-weight: 400;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		line-height: 1.4;
		color: var(--wave-bright);
		padding-bottom: 1.1rem;
		border-bottom: 1px solid var(--line-bright);
	}

	.fields {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.fields > div {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		min-height: 3.6rem;
		border-bottom: 1px solid var(--line);
	}

	.fields dt {
		font-family: var(--mono);
		font-size: 0.68rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--paper-faint);
	}

	.fields dd {
		margin: 0;
		font-family: var(--mono);
		font-size: 0.8rem;
		font-variant-numeric: tabular-nums;
		color: var(--wave-bright);
		overflow-wrap: anywhere;
	}

	/* ---- foot -------------------------------------------------------------- */

	.foot {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.75rem 2rem;
		padding-block: 2rem;
		padding-bottom: calc(2rem + var(--transport));
		border-top: 1px solid var(--line);
		font-family: var(--mono);
		font-size: 0.78rem;
		color: var(--paper-faint);
	}

	.repos {
		display: flex;
		gap: 1.5rem;
	}

	.foot a {
		color: var(--paper-dim);
		text-decoration: none;
	}

	.foot a:hover {
		color: var(--wave-bright);
	}

	/* ---- narrow ------------------------------------------------------------ */

	@media (max-width: 900px) {
		.setup {
			grid-template-columns: minmax(0, 1fr);
			gap: 2.5rem;
		}
	}
</style>
