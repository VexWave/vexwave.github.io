<script lang="ts">
	/*
	 * A spectrum analyser rather than a marching sine: the app's equalizer runs
	 * ten bands from deep bass to the top of the treble, so the row is tilted
	 * the way a spectrum is: tall and slow at the low end on the left, shorter
	 * and quicker toward the right.
	 */
	let { count = 28, height = '4.5rem' }: { count?: number; height?: string } = $props();

	// Deterministic, so the server and the client agree on every bar. Math.random
	// would give hydration two different rows to reconcile.
	function noise(n: number) {
		const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
		return x - Math.floor(x);
	}

	const bars = $derived(
		Array.from({ length: count }, (_, i) => {
			const t = count > 1 ? i / (count - 1) : 0;
			const jitter = noise(i);

			return {
				i,
				// Energy falls away toward the treble, with enough variance that
				// no two neighbours move as a pair.
				peak: Math.min(1, (0.35 + 0.65 * (1 - t) ** 0.8) * (0.7 + 0.5 * jitter)),
				// Bass is heavy and slow to move; treble flickers.
				dur: 1.55 - 0.95 * t + 0.35 * noise(i + 91),
				delay: -(jitter * 2)
			};
		})
	);
</script>

<div class="wave" style:--h={height} aria-hidden="true">
	{#each bars as bar (bar.i)}
		<span
			style:animation-duration="{bar.dur}s"
			style:animation-delay="{bar.delay}s"
			style:--peak={bar.peak}
		></span>
	{/each}
</div>

<style>
	.wave {
		display: flex;
		align-items: flex-end;
		gap: 4px;
		height: var(--h);
	}

	.wave span {
		flex: 1 1 0;
		min-width: 2px;
		height: 100%;
		transform-origin: bottom;
		border-radius: 1px;
		background: linear-gradient(to top, var(--wave) 0%, var(--wave-edge) 60%, var(--wave-bright) 100%);
		opacity: 0.85;
		animation: equalize 1.2s ease-in-out infinite alternate;
	}

	/*
	 * `alternate` rather than a symmetric 0/50/100 cycle: the fall is the
	 * reverse of the rise, which is what stops the row settling into a beat.
	 */
	@keyframes equalize {
		from {
			transform: scaleY(calc(var(--peak) * 0.18));
		}
		to {
			transform: scaleY(var(--peak));
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.wave span {
			animation: none;
			transform: scaleY(var(--peak));
		}
	}
</style>
