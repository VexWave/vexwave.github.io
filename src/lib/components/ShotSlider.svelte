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
			blurb: 'Everything on the server in one list, with playlists, artist pages and search across the lot.',
			items: ['Playlists', 'Artists', 'Search', 'Track editing']
		},
		{
			id: 'discover',
			label: 'Discover',
			src: discoverShot,
			alt: 'Discover: YouTube search results inside VexWave, with one of them downloading into the library.',
			blurb: 'Add what you do not have yet. Search YouTube and SoundCloud or bring local files in; every new track uploads back to the server.',
			items: ['Local files', 'YouTube', 'SoundCloud', 'Discover']
		},
		{
			id: 'effects',
			label: 'Effects',
			src: effectsShot,
			alt: 'The effects panel open above the player bar, with speed, keep pitch, drive and reverb.',
			blurb:
				'Speed, drive and reverb from the player bar. Half speed to one and a half, with the pitch dropped like tape or held where it was.',
			items: ['Speed', 'Keep pitch', 'Drive', 'Reverb']
		},
		{
			id: 'settings',
			label: 'Settings',
			src: settingsShot,
			alt: 'Settings: the ten-band equalizer with its sliders, beside the Discord presence switch.',
			blurb: 'Ten bands of equalizer, shuffle and repeat, and a Discord status that names whatever is playing.',
			items: ['Shuffle', 'Repeat', 'Ten-band equalizer', 'Discord presence']
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
			<span class="rail" aria-hidden="true"></span>
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

				<div class="say">
					<p class="blurb">{slide.blurb}</p>
					<ul class="items">
						{#each slide.items as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.tour {
		display: flex;
		flex-direction: column;
		gap: 1.6rem;
	}

	/* ---- tab strip -------------------------------------------------------- */

	.tabs {
		display: flex;
		align-items: flex-end;
		flex-wrap: wrap;
		gap: 0.75rem 1.5rem;
	}

	/* Capped: stretched to the full 1180px the rail reads as a bar, not a playhead. */
	.strip {
		position: relative;
		flex: 0 1 30rem;
		display: flex;
		border-bottom: 1px solid var(--line-bright);
	}

	.tab {
		flex: 1 1 0;
		min-width: 0;
		appearance: none;
		background: none;
		border: 0;
		padding: 0 0.5rem 1.1rem;
		text-align: left;
		cursor: pointer;
		font-family: var(--mono);
		font-size: 0.75rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--paper-faint);
		transition: color 160ms ease;
	}

	.tab:first-child {
		padding-left: 0;
	}

	.tab:hover {
		color: var(--paper-dim);
	}

	.tab.on {
		color: var(--wave-bright);
	}

	/* Stepped in units of its own width, so nothing has to measure the DOM. */
	.rail {
		position: absolute;
		left: 0;
		bottom: -1px;
		height: 2px;
		width: calc(100% / var(--n));
		background: var(--wave-bright);
		transform: translateX(calc(var(--i) * 100%));
		transition: transform 340ms cubic-bezier(0.22, 0.7, 0.2, 1);
	}

	.controls {
		display: flex;
		align-items: center;
		align-self: flex-end;
		margin-left: auto;
		gap: 0.6rem;
		padding-bottom: 0.7rem;
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
		width: 34px;
		height: 34px;
		border-radius: 999px;
		border: 1px solid var(--line-bright);
		background: none;
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
		gap: 1.4rem;
		opacity: 0;
		transition: opacity 280ms ease;
	}

	.panel.on {
		opacity: 1;
	}

	.panel img {
		width: 100%;
		height: auto;
		border: 1px solid var(--line);
		border-radius: 10px;
		background: var(--ink-sunken);
		box-shadow: 0 40px 120px -40px color-mix(in srgb, var(--wave) 65%, transparent);
	}

	.say {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 16rem);
		gap: 1.5rem 2.5rem;
		align-items: start;
	}

	.blurb {
		max-width: 46ch;
		font-size: clamp(1.05rem, 1.5vw, 1.2rem);
		color: var(--paper-dim);
	}

	.items {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.items li {
		display: flex;
		align-items: center;
		min-height: 2.7rem;
		border-bottom: 1px solid var(--line);
		font-family: var(--display);
		font-size: 1.05rem;
		letter-spacing: -0.01em;
	}

	.items li:last-child {
		border-bottom: 0;
	}

	/* ---- narrow ------------------------------------------------------------ */

	@media (max-width: 720px) {
		.say {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	/* Below this the tabs and the controls stop sharing a line comfortably. */
	@media (max-width: 640px) {
		.strip {
			flex-basis: 100%;
		}
	}
</style>
