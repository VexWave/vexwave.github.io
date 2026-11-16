<script lang="ts">
	/*
	 * The page's persistent call to action, shaped like the app's player bar:
	 * artwork and title on the left, the round transport control in the middle.
	 * Here the control opens the source instead of playing. It fades in once the
	 * hero's own buttons have scrolled away, so the CTA is never doubled on screen.
	 */
	import logo from '#lib/assets/vex-logo.png';
	import { GITHUB_MARK } from '#lib';

	let { href }: { href: string } = $props();

	let past = $state(false);

	// Set from the real offset on mount too, not only on the next scroll: a
	// reload part-way down the page would otherwise start with the bar hidden.
	$effect(() => {
		past = window.scrollY > 520;
	});
</script>

<svelte:window onscroll={() => (past = window.scrollY > 520)} />

<div class="transport" class:past aria-hidden={!past}>
	<div class="inner">
		<img class="art" src={logo} alt="" />
		<div class="meta">
			<span class="title">VexWave</span>
			<span class="sub">Desktop client · bring your own server</span>
		</div>

		<a class="control" {href} rel="noreferrer" tabindex={past ? 0 : -1}>
			<!-- GitHub mark, Simple Icons (CC0) -->
			<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={GITHUB_MARK} /></svg>
			<span>View on GitHub</span>
		</a>
	</div>
</div>

<style>
	.transport {
		position: fixed;
		inset: auto 0 0 0;
		z-index: 20;
		height: var(--transport);
		background: color-mix(in srgb, var(--ink-sunken) 92%, transparent);
		backdrop-filter: blur(14px);
		border-top: 1px solid var(--line);
		transform: translateY(100%);
		transition: transform 420ms cubic-bezier(0.22, 0.7, 0.2, 1);
	}

	.transport.past {
		transform: translateY(0);
	}

	.inner {
		max-width: 1180px;
		height: 100%;
		margin: 0 auto;
		padding: 0 clamp(1rem, 4vw, 2.5rem);
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.art {
		width: 36px;
		height: 36px;
		object-fit: contain;
		flex: none;
	}

	.meta {
		display: flex;
		flex-direction: column;
		line-height: 1.25;
		min-width: 0;
	}

	.title {
		font-family: var(--display);
		font-size: 1rem;
	}

	.sub {
		font-size: 0.78rem;
		color: var(--paper-dim);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.control {
		margin-left: auto;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 1.15rem 0.6rem 0.95rem;
		border-radius: 999px;
		background: var(--paper);
		color: var(--ink);
		font-family: var(--display);
		font-size: 0.95rem;
		text-decoration: none;
		flex: none;
		transition:
			background 180ms ease,
			transform 180ms cubic-bezier(0.22, 0.7, 0.2, 1);
	}

	.control:hover {
		background: var(--wave-bright);
		transform: scale(1.03);
	}

	.control svg {
		width: 18px;
		height: 18px;
	}


	@media (max-width: 720px) {
		.sub {
			display: none;
		}
	}
</style>
