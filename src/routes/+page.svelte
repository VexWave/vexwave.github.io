<script lang="ts">
	import { base } from '$app/paths';
	import WaveBars from '$lib/components/WaveBars.svelte';
	import TransportBar from '$lib/components/TransportBar.svelte';
	import logo from '$lib/assets/vex-logo.png';
	import libraryShot from '$lib/assets/shots/library.png';
	import discoverShot from '$lib/assets/shots/discover.png';
	import settingsShot from '$lib/assets/shots/settings.png';

	const REPO = 'https://github.com/VexWave/vex-app';
	const DOWNLOAD = `${REPO}/releases/latest`;

	// Simple Icons' GitHub mark (CC0), inlined rather than imported — the package
	// is thousands of icons for the one path used here.
	const GITHUB_MARK =
		'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12';

	const groups = [
		{ label: 'Library', items: ['Playlists', 'Artists', 'Search', 'Track editing'] },
		{ label: 'Import', items: ['Local files', 'YouTube', 'SoundCloud', 'Discover'] },
		{ label: 'Playback', items: ['Shuffle', 'Repeat', 'Ten-band equalizer', 'Discord presence'] }
	];
</script>

<svelte:head>
	<title>VexWave — a desktop music player for your own server</title>
	<meta
		name="description"
		content="VexWave is a desktop music player that signs in to your own server. Playlists, artists, shuffle, local and YouTube and SoundCloud import, and a ten-band equalizer."
	/>
</svelte:head>

<TransportBar href={DOWNLOAD} />

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

		<p class="lead">Streams every track from it. Uploads everything new back to it.</p>

		<div class="actions">
			<a class="btn-primary" href={DOWNLOAD} rel="noreferrer">Download for Windows</a>
			<a class="btn-quiet" href={REPO} rel="noreferrer">Read the source</a>
		</div>

		<WaveBars count={56} height="5rem" />
	</section>

	<section class="shot shot-lead">
		<img
			src={libraryShot}
			alt="The VexWave library: fourteen tracks with cover art, a playlist sidebar, and Static Bloom playing in the transport bar."
			width="1800"
			height="1188"
		/>
	</section>

	<section class="spec">
		<div class="col">
			<h2 class="col-label">Server</h2>
			<dl class="fields">
				<div><dt>Host</dt><dd>music.yourbox.lan</dd></div>
				<div><dt>Port</dt><dd>8790</dd></div>
				<div><dt>User</dt><dd>you</dd></div>
				<div><dt>Password</dt><dd>••••••••</dd></div>
			</dl>
		</div>

		{#each groups as group (group.label)}
			<div class="col">
				<h2 class="col-label">{group.label}</h2>
				<ul class="items">
					{#each group.items as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</section>

	<section class="shot">
		<img
			src={discoverShot}
			alt="Discover: YouTube search results inside VexWave, with one of them downloading into the library."
			loading="lazy"
			width="1800"
			height="1188"
		/>
		<p class="caption">Discover</p>
	</section>

	<section class="shot">
		<img
			src={settingsShot}
			alt="Settings: the ten-band equalizer with its sliders, beside the Discord presence switch."
			loading="lazy"
			width="1800"
			height="1188"
		/>
		<p class="caption">Settings</p>
	</section>

	<section class="close">
		<h2>Point it at your server</h2>
		<div class="actions">
			<a class="btn-primary" href={DOWNLOAD} rel="noreferrer">Download for Windows</a>
		</div>
	</section>
</main>

<footer class="foot">
	<span>VexWave</span>
	<a href={REPO} rel="noreferrer">github.com/VexWave/vex-app</a>
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

	.caption {
		font-family: var(--mono);
		font-size: 0.75rem;
		font-weight: 400;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--paper-faint);
	}

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

	.hero h1 {
		font-size: clamp(2.6rem, 6.2vw, 4.75rem);
		max-width: 17ch;
	}

	.lead {
		max-width: 44ch;
		font-size: clamp(1.05rem, 1.5vw, 1.2rem);
		color: var(--paper-dim);
	}

	.hero :global(.wave) {
		margin-top: 1.5rem;
		mask-image: linear-gradient(to right, #000 0%, #000 62%, transparent 100%);
	}

	/* ---- screenshots ------------------------------------------------------ */

	.shot {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
	}

	.shot img {
		width: 100%;
		height: auto;
		border: 1px solid var(--line);
		border-radius: 10px;
		background: var(--ink-sunken);
	}

	.shot-lead {
		margin-top: calc(-1 * clamp(2rem, 6vw, 5rem));
	}

	.shot-lead img {
		box-shadow: 0 40px 120px -40px color-mix(in srgb, var(--wave) 65%, transparent);
	}

	/* ---- spec block -------------------------------------------------------- */

	/*
	 * Four short columns rather than four stacked bands: the content is a list
	 * of names, and stacking them left acres of empty page between one-line
	 * sections.
	 */
	.spec {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: clamp(1.5rem, 3.5vw, 3rem);
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

	.items,
	.fields {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	/* A shared row height keeps every column's rules on the same lines. */
	.items li,
	.fields > div {
		display: flex;
		align-items: center;
		min-height: 3.6rem;
		border-bottom: 1px solid var(--line);
	}

	.items li {
		font-family: var(--display);
		font-size: clamp(1.05rem, 1.35vw, 1.2rem);
		letter-spacing: -0.01em;
	}

	.fields > div {
		justify-content: space-between;
		gap: 0.75rem;
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

	/* ---- close ------------------------------------------------------------- */

	.close {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		align-items: flex-start;
		padding-top: clamp(2rem, 5vw, 4rem);
		border-top: 1px solid var(--line);
	}

	.close h2 {
		font-size: clamp(2rem, 4.4vw, 3.2rem);
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

	.foot a {
		color: var(--paper-dim);
		text-decoration: none;
	}

	.foot a:hover {
		color: var(--wave-bright);
	}

	/* ---- narrow ------------------------------------------------------------ */

	@media (max-width: 900px) {
		.spec {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 2.5rem;
		}
	}

	@media (max-width: 520px) {
		.spec {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
