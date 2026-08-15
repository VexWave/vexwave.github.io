<script lang="ts">
	import libraryShot from '$lib/assets/shots/library.png';
	import discoverShot from '$lib/assets/shots/discover.png';
	import effectsShot from '$lib/assets/shots/effects.png';
	import settingsShot from '$lib/assets/shots/settings.png';

	const slides = [
		{
			id: 'library',
			label: 'Library',
			src: libraryShot,
			alt: 'The VexWave library: fourteen tracks with cover art, a playlist sidebar, and Static Bloom playing in the transport bar.',
			items: ['Playlists', 'Artists', 'Search', 'Track editing']
		},
		{
			id: 'discover',
			label: 'Discover',
			src: discoverShot,
			alt: 'Discover: YouTube search results inside VexWave, with one of them downloading into the library.',
			items: ['YouTube', 'SoundCloud', 'One-click download']
		},
		{
			id: 'effects',
			label: 'Effects',
			src: effectsShot,
			alt: 'The effects panel open above the player bar, with speed, keep pitch, drive and reverb.',
			items: ['Speed', 'Drive', 'Reverb']
		},
		{
			id: 'settings',
			label: 'Settings',
			src: settingsShot,
			alt: 'Settings: the ten-band equalizer with its sliders, beside the Discord presence switch.',
			items: ['Shuffle', 'Repeat', 'Equalizer', 'Discord presence']
		}
	];

	// Constant, so the prerendered markup and the hydrated client agree.
	let index = $state(0);
	let tabs: HTMLButtonElement[] = $state([]);

	const last = slides.length - 1;

	function go(next: number) {
		index = (next + slides.length) % slides.length;
	}

	// Bound to each tab, not the tablist, which would need a tabindex of its own.
	function onkeydown(event: KeyboardEvent) {
		const moves: Record<string, number> = {
			ArrowRight: index === last ? 0 : index + 1,
			ArrowLeft: index === 0 ? last : index - 1,
			Home: 0,
			End: last
		};

		const next = moves[event.key];
		if (next === undefined) return;

		event.preventDefault();
		index = next;
		tabs[next]?.focus();
	}

	const pad = (n: number) => String(n).padStart(2, '0');
</script>

<div class="tour">
	<div class="tabs">
		<div
			class="strip"
			role="tablist"
			aria-label="VexWave features"
			style:--n={slides.length}
			style:--i={index}
		>
			<span class="glide" aria-hidden="true"></span>
			{#each slides as slide, i (slide.id)}
				<button
					bind:this={tabs[i]}
					type="button"
					role="tab"
					id="tab-{slide.id}"
					class="tab"
					class:on={i === index}
					aria-selected={i === index}
					aria-controls="panel-{slide.id}"
					tabindex={i === index ? 0 : -1}
					onclick={() => (index = i)}
					{onkeydown}
				>
					{slide.label}
				</button>
			{/each}
		</div>

		<div class="controls">
			<span class="count">{pad(index + 1)} <i>/</i> {pad(slides.length)}</span>
			<button type="button" class="step" aria-label="Previous feature" onclick={() => go(index - 1)}>
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7" /></svg>
			</button>
			<button type="button" class="step" aria-label="Next feature" onclick={() => go(index + 1)}>
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
			</button>
		</div>
	</div>

	<div class="frame">
		{#each slides as slide, i (slide.id)}
			<!-- `inert` rather than display:none, which would take the fade with it. -->
			<div
				class="panel"
				class:on={i === index}
				role="tabpanel"
				id="panel-{slide.id}"
				aria-labelledby="tab-{slide.id}"
				inert={i !== index}
			>
				<img
					src={slide.src}
					alt={slide.alt}
					loading={i === 0 ? 'eager' : 'lazy'}
					width="1800"
					height="1188"
				/>

				<ul class="items">
					{#each slide.items as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</div>

<style>
	.tour {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	/* ---- tab strip -------------------------------------------------------- */

	.tabs {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem 1.5rem;
	}

	/* Capped: stretched to the full 1180px the strip reads as a toolbar. */
	.strip {
		position: relative;
		flex: 0 1 34rem;
		display: grid;
		grid-template-columns: repeat(var(--n), minmax(0, 1fr));
		padding: 4px;
		border: 1px solid var(--line-bright);
		border-radius: 999px;
		background: var(--ink-raised);
	}

	/* Stepped in units of its own width, so nothing has to measure the DOM. */
	.glide {
		position: absolute;
		top: 4px;
		bottom: 4px;
		left: 4px;
		width: calc((100% - 8px) / var(--n));
		border-radius: 999px;
		background: var(--wave);
		box-shadow: 0 8px 20px -10px var(--wave);
		transform: translateX(calc(var(--i) * 100%));
		transition: transform 420ms cubic-bezier(0.22, 0.7, 0.2, 1);
	}

	.tab {
		position: relative;
		appearance: none;
		background: none;
		border: 0;
		border-radius: 999px;
		padding: 0.6rem 0.5rem;
		cursor: pointer;
		font-family: var(--mono);
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--paper-faint);
		transition: color 200ms ease;
	}

	.tab:hover {
		color: var(--paper-dim);
	}

	.tab.on {
		color: var(--paper);
	}

	.controls {
		display: flex;
		align-items: center;
		margin-left: auto;
		gap: 0.6rem;
	}

	.count {
		font-family: var(--mono);
		font-size: 0.75rem;
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.1em;
		color: var(--wave-bright);
		margin-right: 0.35rem;
	}

	.count i {
		font-style: normal;
		color: var(--paper-faint);
		padding: 0 0.1rem;
	}

	.step {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 999px;
		border: 1px solid var(--line-bright);
		background: var(--ink-raised);
		color: var(--paper-dim);
		cursor: pointer;
		transition:
			border-color 180ms ease,
			color 180ms ease,
			transform 180ms cubic-bezier(0.22, 0.7, 0.2, 1);
	}

	.step:hover {
		border-color: var(--wave-edge);
		color: var(--paper);
		transform: scale(1.06);
	}

	.step:active {
		transform: scale(0.96);
	}

	.step svg {
		width: 16px;
		height: 16px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	/* ---- panels ------------------------------------------------------------ */

	.frame {
		display: grid;
	}

	.panel {
		grid-area: 1 / 1;
		display: flex;
		flex-direction: column;
		gap: 1.3rem;
	}

	/* Shot and list carry the fade so they can arrive one after the other. */
	.panel img,
	.panel .items {
		opacity: 0;
		transform: translateY(14px);
		transition:
			opacity 200ms ease,
			transform 200ms ease;
	}

	.panel.on img,
	.panel.on .items {
		opacity: 1;
		transform: none;
		transition:
			opacity 420ms ease 80ms,
			transform 560ms cubic-bezier(0.22, 0.7, 0.2, 1) 80ms;
	}

	.panel.on .items {
		transition-delay: 160ms;
	}

	.panel img {
		width: 100%;
		height: auto;
		border: 1px solid var(--line);
		border-radius: 12px;
		background: var(--ink-sunken);
		box-shadow: 0 40px 120px -40px color-mix(in srgb, var(--wave) 65%, transparent);
	}

	.items {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.9rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.items li {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		font-family: var(--display);
		font-size: 1.02rem;
		letter-spacing: -0.01em;
	}

	.items li::before {
		content: '';
		flex: none;
		width: 5px;
		height: 5px;
		border-radius: 999px;
		background: var(--wave-edge);
	}

	/* ---- narrow ------------------------------------------------------------ */

	/* Below this the tabs and the controls stop sharing a line comfortably. */
	@media (max-width: 640px) {
		.strip {
			flex-basis: 100%;
		}
	}

	@media (max-width: 420px) {
		.tab {
			font-size: 0.64rem;
			letter-spacing: 0.06em;
		}
	}
</style>
