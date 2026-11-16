<script lang="ts">
	import { onMount } from 'svelte';
	import WaveBars from '#lib/components/WaveBars.svelte';
	import logo from '#lib/assets/vex-logo.png';
	import preview from '#lib/assets/og.png';
	import libraryShot from '#lib/assets/shots/library.png';
	import discoverShot from '#lib/assets/shots/discover.png';
	import effectsShot from '#lib/assets/shots/effects.png';
	import settingsShot from '#lib/assets/shots/settings.png';
	import youtubeIcon from '#lib/assets/icons/youtube.svg';
	import soundcloudIcon from '#lib/assets/icons/soundcloud.svg';
	import dockerIcon from '#lib/assets/icons/docker.svg';
	import bunIcon from '#lib/assets/icons/bun.svg';
	import postgresIcon from '#lib/assets/icons/postgres.svg';
	import windowsIcon from '#lib/assets/icons/windows.svg';
	import githubIcon from '#lib/assets/icons/github.svg';

	const REPO = 'https://github.com/VexWave/vex-app';
	const BACKEND = 'https://github.com/VexWave/vex-backend';
	const DOWNLOAD = `${REPO}/releases/latest/download/VexWave-installer.exe`;

	const SITE = 'https://vexwave.github.io';
	// Joined, not concatenated: the imported URL is root-relative in the prerender but absolute once hydrated.
	const OG_IMAGE = new URL(preview, SITE).href;

	const TITLE = 'VexWave: a desktop music player for your own server';
	const DESCRIPTION =
		'Windows client for vex-backend, the self-hosted music server. Save tracks from YouTube and SoundCloud, add effects and tune a ten-band equalizer.';

	const chapters = [
		{
			title: 'YouTube and SoundCloud search on Discover',
			icons: [
				{ src: youtubeIcon, w: 28, h: 20 },
				{ src: soundcloudIcon, w: 28, h: 16 }
			],
			body: 'Search both, or paste a link. The track downloads straight into your library on the server.',
			src: discoverShot,
			alt: 'The Discover page searching YouTube, with one result downloading at 42 percent.'
		},
		{
			title: 'Speed, drive and reverb in VexWave',
			body: 'The effects panel opens above the player bar. Keep pitch holds the key while you slow a track down.',
			src: effectsShot,
			alt: 'The effects panel with sliders for speed, drive and reverb and a keep pitch switch.'
		},
		{
			title: 'Ten equalizer bands in VexWave settings',
			body: 'They sit beside shuffle, repeat and the switch for Discord Rich Presence.',
			src: settingsShot,
			alt: 'Settings with the ten-band equalizer sliders above the Discord presence switch.'
		}
	];

	const faq = [
		{
			q: 'Which systems does VexWave run on?',
			a: 'Windows. The installer is a free download from the latest GitHub release.'
		},
		{
			q: 'What does VexWave do on its first launch?',
			a: 'It downloads yt-dlp, ffmpeg and deno, then opens the login screen.'
		},
		{
			q: 'Which port does the server listen on?',
			a: '3700 by default. Change it with PORT in the server’s .env file.'
		},
		{
			q: 'How do I update the server?',
			a: 'Run docker compose pull, then docker compose up -d.'
		},
		{
			q: 'Can I build VexWave from source?',
			a: 'Yes, on Windows with Go 1.27, Bun 1.4 or newer and the Wails v3.1.0 CLI.'
		}
	];

	let features: HTMLElement;

	// Scroll progress through the pinned chapters, in steps (1.5 is halfway through the second), only while the moment is live.
	onMount(() => {
		let raf = 0;
		let live = false;
		const tick = () => {
			raf = 0;
			const r = features.getBoundingClientRect();
			const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
			features.style.setProperty('--pc', String(p * chapters.length));
		};
		const req = () => {
			if (!raf) raf = requestAnimationFrame(tick);
		};
		const sync = () => {
			if (live === features.classList.contains('is-live')) return;
			live = !live;
			if (live) {
				addEventListener('scroll', req, { passive: true });
				addEventListener('resize', req);
				req();
			} else {
				removeEventListener('scroll', req);
				removeEventListener('resize', req);
			}
		};
		const watch = new MutationObserver(sync);
		watch.observe(features, { attributes: true, attributeFilter: ['class'] });
		sync();
		return () => {
			watch.disconnect();
			removeEventListener('scroll', req);
			removeEventListener('resize', req);
			cancelAnimationFrame(raf);
		};
	});
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
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content="1800" />
	<meta property="og:image:height" content="1188" />
	<meta
		property="og:image:alt"
		content="The VexWave library, with the VexWave wordmark across the foot."
	/>

	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<header class="nav nav--centre">
	<div class="wrap nav__bar">
		<a class="skip-link" href="#top">Skip to content</a>
		<a class="nav__logo brand" href="#top">
			<img src={logo} alt="" width="28" height="26" />VexWave
		</a>
		<nav class="nav__links" aria-label="Main">
			<div class="nav__item"><a class="nav__link" href="#features">Features</a></div>
			<div class="nav__item"><a class="nav__link" href="#server">Server</a></div>
			<div class="nav__item"><a class="nav__link" href="#faq">Questions</a></div>
		</nav>
		<div class="nav__actions">
			<a class="nav__link" href={REPO} rel="noreferrer">GitHub</a>
			<a class="btn btn--primary" href={DOWNLOAD}>Download for Windows</a>
		</div>
		<button class="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
			<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
				<path d="M2 5h14M2 13h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
			</svg>
		</button>
	</div>
</header>

<main id="top">
	<section class="hero hero--collage" data-enter aria-labelledby="hero-h">
		<div class="wrap">
			<div class="hero-text grid hero__grid">
				<div class="hero__text span-5">
					<h1 id="hero-h">A desktop music player for your own server</h1>
					<p class="hero__lead">
						VexWave is the Windows client for vex-backend, the music server you run yourself. Your
						tracks, playlists and accounts stay on a machine you control.
					</p>
					<div class="btn-row">
						<a class="btn btn--primary" href={DOWNLOAD}
							>Download for Windows<svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true"
								><path class="m-arrow__stem" d="M1 6h8" /><path
									class="m-arrow__head"
									d="M4.5 2.5 8 6l-3.5 3.5"
								/></svg
							></a
						>
						<a class="btn btn--secondary" href="#server">Set up the server</a>
					</div>
				</div>

				<div
					class="hero__art span-6 start-7"
					role="img"
					aria-label="The VexWave library: a playlist sidebar beside fourteen tracks, with Static Bloom playing."
				>
					<img
						class="ly-piece ly-piece--main shot"
						src={libraryShot}
						alt=""
						width="1800"
						height="1188"
						fetchpriority="high"
					/>
					<div class="ly-piece ly-piece--note playing" aria-hidden="true">
						<span class="cover"></span>
						<span class="meta">
							<b>Static Bloom</b>
							<small>Now playing · 1:23 of 3:14</small>
						</span>
						<WaveBars count={22} height="2.25rem" />
					</div>
				</div>
			</div>
		</div>
	</section>

	<section
		class="section"
		id="features"
		style="--h: 2"
		data-moment="pinned-chapters"
		aria-labelledby="features-h"
		style:--n={chapters.length}
		bind:this={features}
	>
		<div class="wrap mo-pc__grid">
			<div class="mo-pc__text">
				<h2 id="features-h">The VexWave player, panel by panel</h2>
				<ol class="mo-pc__steps">
					{#each chapters as chapter, i (chapter.title)}
						<li class="mo-pc__step" style:--i={i}>
							<h3>
								{#if chapter.icons}
									<span class="marks" aria-hidden="true">
										{#each chapter.icons as icon (icon.src)}
											<img src={icon.src} alt="" width={icon.w} height={icon.h} />
										{/each}
									</span>
								{/if}
								{chapter.title}
							</h3>
							<p>{chapter.body}</p>
							<figure class="mo-pc__visual">
								<img src={chapter.src} alt={chapter.alt} width="1800" height="1188" loading="lazy" />
							</figure>
						</li>
					{/each}
				</ol>
			</div>
			<div class="mo-pc__visuals frame"></div>
		</div>
	</section>

	<section class="section ground-inverse" id="server" aria-labelledby="server-h">
		<div class="wrap">
			<div class="grid">
				<div class="span-5 server-copy">
					<h2 id="server-h">
						Runs on a server you host. <span class="muted">Your accounts live there too.</span>
					</h2>
					<ol class="setup">
						<li>
							<span class="tools" aria-hidden="true">
								<img src={dockerIcon} alt="" width="24" height="17" />
								<img src={bunIcon} alt="" width="24" height="21" />
								<img src={postgresIcon} alt="" width="23" height="24" />
							</span>
							Start vex-backend with Docker Compose, or with Bun and PostgreSQL 13 or newer.
						</li>
						<li>Create your account with the server’s admin CLI.</li>
						<li>Enter the server’s address in VexWave and sign in.</li>
					</ol>
					<p><a class="link" href={BACKEND} rel="noreferrer">Read the vex-backend setup</a></p>
				</div>

				<div class="frame frame--split frame--lit span-6 start-7 server-frame">
					<div class="stage">
						<div
							class="at-rise fit"
							style="--fit-max: 480px; --ay-sm: 16px"
							data-ui-loop
						>
							<div
								class="ui ui-panel ui-term"
								data-ui="terminal-run"
								role="img"
								aria-label="A terminal starting vex-backend with docker compose: the database and the app start, and the server listens on port 3700."
							>
								<div class="ui-term__head">
									<span class="ui-dots" aria-hidden="true"><i></i><i></i><i></i></span>
									<span class="ui-term__title">vex-backend</span>
									<span class="ui-meta">bash</span>
									<span class="ui-spacer"></span>
								</div>
								<div class="ui-term__screen" data-term-screen>
									<div class="ui-term__track" data-term-track>
										<div class="ui-term__ln ui-term__cmd">
											<span class="ui-term__cwd">~/<span class="ui-term__up">srv/</span>vex</span
											><span class="ui-term__sig">$</span><span
												class="ui-term__typed"
												data-term-cmd>docker compose up -d</span
											>
										</div>
										<div class="ui-term__ln ui-term__meter" data-term-out data-term-meter>
											<span class="ui-term__bar" style="--p:1"><i></i></span><span
												class="ui-term__count"
												data-term-count>2 of 2 containers</span
											>
										</div>
										<div class="ui-term__ln ui-term__log" data-term-out data-term-step>
											<svg class="ui-term__tick" viewBox="0 0 16 16" aria-hidden="true"
												><path d="m3.5 8.4 2.8 2.8 6.2-6.4" /></svg
											><span class="ui-term__path">Container db</span><span class="ui-term__n"
												>Started</span
											>
										</div>
										<div class="ui-term__ln ui-term__log" data-term-out data-term-step>
											<svg class="ui-term__tick" viewBox="0 0 16 16" aria-hidden="true"
												><path d="m3.5 8.4 2.8 2.8 6.2-6.4" /></svg
											><span class="ui-term__path">Container app</span><span class="ui-term__n"
												>Started</span
											>
										</div>
										<div class="ui-term__ln ui-term__gap" data-term-out aria-hidden="true"></div>
										<div class="ui-term__ln ui-term__sum" data-term-out>
											<span class="ui-term__key">Port</span><span class="ui-term__val">3700</span>
										</div>
										<div class="ui-term__ln ui-term__done" data-term-out data-term-done>
											<span class="ui-term__ok"
												><svg viewBox="0 0 16 16" aria-hidden="true"
													><path d="m4.5 8.3 2.4 2.4 4.6-5" /></svg
												></span
											><b>Running</b>
										</div>
										<div class="ui-term__ln ui-term__cmd" data-term-next>
											<span class="ui-term__cwd">~/<span class="ui-term__up">srv/</span>vex</span
											><span class="ui-term__sig">$</span><span class="ui-term__typed"></span><i
												class="ui-term__caret"
												aria-hidden="true"
											></i>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div
							class="login"
							role="img"
							aria-label="The VexWave login screen with a server address, username and password filled in."
						>
							<p class="login__title">Welcome to VexWave</p>
							<span class="login__label">Server address</span>
							<span class="login__field">http://music.home.lan:3700</span>
							<span class="login__label">Username</span>
							<span class="login__field">you</span>
							<span class="login__label">Password</span>
							<span class="login__field">••••••••••</span>
							<span class="login__button">Log in</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section" id="faq" aria-labelledby="faq-h">
		<div class="wrap">
			<div class="grid">
				<div class="span-5 faq-head">
					<h2 id="faq-h">Questions</h2>
					<p><a class="link" href="{REPO}/issues" rel="noreferrer">Open an issue on GitHub</a></p>
					<span class="stack" aria-hidden="true">
						<span class="ic-tile"><img class="ic" src={windowsIcon} alt="" width="40" height="40" /></span>
						<span class="ic-tile"><img class="ic ic-ink" src={githubIcon} alt="" width="40" height="39" /></span>
						<span class="ic-tile"><img class="ic ic-land" src={dockerIcon} alt="" width="40" height="29" /></span>
						<span class="ic-tile"><img class="ic" src={bunIcon} alt="" width="40" height="35" /></span>
					</span>
				</div>
				<div class="faq span-6 start-7">
					{#each faq as item (item.q)}
						<div class="faq__item">
							<h3>{item.q}</h3>
							<p>{item.a}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>
</main>

<footer class="footer closing footer--dark ground-inverse" id="contact" aria-labelledby="close-h">
	<div class="wrap">
		<div class="closing__cta close--type">
			<div class="section-head">
				<h2 id="close-h">Play your own library on Windows</h2>
				<p class="t-small muted">A free installer from GitHub releases.</p>
			</div>
			<a class="btn btn--primary btn--xl btn--wide" href={DOWNLOAD}
				>Download for Windows<svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true"
					><path class="m-arrow__stem" d="M1 6h8" /><path
						class="m-arrow__head"
						d="M4.5 2.5 8 6l-3.5 3.5"
					/></svg
				></a
			>
		</div>
		<div class="closing__links">
			<div class="grid">
				<div class="span-4 stack-4">
					<a class="footer__mark brand" href="#top"
						><img src={logo} alt="" width="40" height="36" />VexWave</a
					>
				</div>
				<div class="span-2 start-9 footer__col">
					<h3>Player</h3>
					<ul>
						<li><a href="#features">Features</a></li>
						<li><a href="#server">Server</a></li>
						<li><a href="#faq">Questions</a></li>
					</ul>
				</div>
				<div class="span-2 footer__col">
					<h3>Source</h3>
					<ul>
						<li><a href={REPO} rel="noreferrer">vex-app</a></li>
						<li><a href={BACKEND} rel="noreferrer">vex-backend</a></li>
						<li><a href="{REPO}/releases" rel="noreferrer">Releases</a></li>
					</ul>
				</div>
			</div>
			<div class="footer__legal">
				<span>© 2026 VexWave</span>
				<span>Product names and logos are trademarks of their owners.</span>
			</div>
		</div>
	</div>
</footer>

<style>
	/* The app's wordmark: its own face and weight, beside the real logo. */
	.brand {
		gap: var(--s-3);
		font-family: var(--font-display);
		font-weight: 600;
		letter-spacing: -0.01em;
	}

	.brand img {
		width: auto;
		height: 1.3em;
	}

	/* A phone cannot run the Windows installer: the bar keeps the logo and the menu, the sheet the button. */
	@media (max-width: 639px) {
		:global(.nav:not(.is-open) .nav__actions) {
			display: none;
		}

		:global(.nav:not(.is-open) .nav__actions + .nav__toggle) {
			margin-left: auto;
		}
	}

	/* hero: the library window, cut by the frame's right and bottom, past the track titles */
	.hero__art {
		background:
			radial-gradient(120% 80% at 85% 0%, color-mix(in oklab, var(--wave) 38%, transparent), transparent 60%),
			var(--ground-bg);
	}

	.hero__art > .shot {
		width: 160%;
		max-width: none;
		height: auto;
		border: 1px solid var(--line-strong);
		border-radius: var(--r-md);
		box-shadow: 0 40px 100px -40px color-mix(in oklab, var(--wave) 70%, transparent);
	}

	.playing {
		left: var(--s-6);
		bottom: var(--s-6);
		width: 300px;
		display: grid;
		grid-template-columns: 48px minmax(0, 1fr);
		gap: var(--s-3) var(--s-4);
		align-items: center;
		padding: var(--s-4);
		border: 1px solid var(--line-strong);
		border-radius: var(--r-md);
		background: var(--ground-surface);
		color: var(--ground-ink);
	}

	.cover {
		width: 48px;
		height: 48px;
		border-radius: var(--r-sm);
		background: linear-gradient(135deg, var(--wave-bright), var(--wave));
	}

	.meta {
		display: grid;
		line-height: 1.3;
	}

	.meta b {
		font-weight: 500;
	}

	.meta small {
		font-size: var(--t-label);
		color: var(--ground-muted);
	}

	.playing :global(.wave) {
		grid-column: 1 / -1;
	}

	/* features: the screenshots keep their own 3:2 frame instead of the moment's 4:3 crop */
	#features:not(:global(.is-live)) .mo-pc__visual {
		border: 1px solid var(--line);
	}

	.mo-pc__visual > img {
		aspect-ratio: 3 / 2;
	}

	#features :global(.mo-pc__visuals) {
		aspect-ratio: 3 / 2;
		border: 1px solid var(--line);
		border-radius: var(--r-md);
		overflow: hidden;
	}

	/* live: a screen of scroll per chapter (the moment sets one for them all), and each step's rule fills as it is read */
	#features:global(.is-live) {
		--mo-hold: var(--n) !important;
	}

	#features:global(.is-live) .mo-pc__step {
		position: relative;
	}

	#features:global(.is-live) :global(.mo-pc__step.is-on) {
		border-left-color: var(--line);
	}

	#features:global(.is-live) .mo-pc__step::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: -2px;
		width: 2px;
		background: var(--accent);
		transform-origin: top;
		transform: scaleY(clamp(0, var(--pc, 0) - var(--i), 1));
	}

	.marks {
		display: inline-flex;
		gap: var(--s-2);
		margin-right: var(--s-3);
		vertical-align: -0.15em;
	}

	.marks img {
		height: 1em;
		width: auto;
	}

	/* server */
	.server-copy {
		display: grid;
		align-content: start;
		gap: var(--s-6);
	}

	.setup {
		display: grid;
		gap: var(--s-5);
		counter-reset: step;
	}

	.setup li {
		position: relative;
		padding-left: var(--s-7);
		font-size: var(--t-lead);
		line-height: 1.5;
		counter-increment: step;
	}

	.setup li::before {
		content: counter(step);
		position: absolute;
		left: 0;
		top: 0.1em;
		display: grid;
		place-items: center;
		width: 28px;
		height: 28px;
		border: 1px solid var(--line-strong);
		border-radius: 999px;
		font: 500 var(--t-label) / 1 var(--font-mono);
		color: var(--accent);
	}

	.tools {
		display: flex;
		gap: var(--s-3);
		margin-bottom: var(--s-2);
	}

	.tools img {
		height: 24px;
		width: auto;
	}

	/* step one above step three, sized by its content so nothing crops; the login card only where the screen holds both */
	.server-frame {
		--ratio: 0px;
		aspect-ratio: auto;
		min-height: min(708px, calc(100svh - 192px));
	}

	.server-frame .stage {
		position: relative;
		inset: auto;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--s-6);
	}

	.server-frame .stage > * {
		position: static;
		flex: none;
	}

	.server-frame .at-rise {
		width: 100%;
	}

	.login {
		width: min(100%, 360px);
		display: grid;
		gap: var(--s-1);
		padding: var(--s-5);
		border: 1px solid var(--line-strong);
		border-radius: var(--r-md);
		background: var(--ground-surface);
		color: var(--ground-ink);
		font-size: var(--t-small);
		box-shadow: 0 30px 80px -30px color-mix(in oklab, var(--p-bg) 80%, transparent);
	}

	.login__title {
		margin-bottom: var(--s-2);
		font-family: var(--font-display);
		font-size: var(--t-card);
		text-align: center;
	}

	.login__label {
		font-weight: 500;
	}

	.login__field {
		margin-bottom: var(--s-3);
		padding: var(--s-1) var(--s-3);
		border: 1px solid var(--line-strong);
		border-radius: var(--r-sm);
		font-family: var(--font-mono);
		color: var(--ground-muted);
	}

	.login__button {
		padding: var(--s-2);
		border-radius: var(--r-sm);
		background: var(--p-ink);
		color: var(--p-bg);
		font-weight: 500;
		text-align: center;
	}

	@media (max-height: 839px), (max-width: 1023px) {
		.login {
			display: none;
		}
	}

	@media (max-width: 1023px) {
		.server-frame {
			min-height: 0;
			margin-top: var(--s-7);
		}
	}

	/* the close keeps its button's full height on a short screen (a zoomed desktop): the footer grows instead */
	.closing {
		height: auto;
		min-height: 100svh;
	}

	.close--type > :global(.btn--xl) {
		flex-shrink: 0;
	}

	/* 320px: the large button's label and padding would outgrow the column */
	@media (max-width: 359px) {
		.close--type > :global(.btn--xl) {
			padding-inline: var(--s-4);
			font-size: 18px;
		}
	}

	.faq-head {
		display: grid;
		align-content: start;
		gap: var(--s-6);
	}

	.stack {
		display: flex;
		gap: var(--s-3);
	}

	/* features at rest (tablet, phone): as tall as its steps, a screen at least, so no empty screen follows them */
	@media (min-width: 640px) and (max-width: 1023px) {
		.mo-pc__visual > img {
			max-height: 22svh;
		}
	}


	.footer__mark {
		gap: var(--s-4);
	}
</style>
