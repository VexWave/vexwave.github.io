<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { asset } from '$app/paths';
	import logo from '#lib/assets/vex-logo.png';

	let { children } = $props();

	// After hydration, never before: the kit rewrites parts of the DOM Svelte would otherwise reconcile.
	onMount(async () => {
		const scripts = [
			asset('kit/system.js'),
			asset('kit/motion/motion.js'),
			asset('kit/layout/layout.js')
		];
		for (const src of scripts) await import(/* @vite-ignore */ src);
	});
</script>

<svelte:head>
	<link rel="icon" href={logo} />
	<meta name="theme-color" content="#0b0b0e" />
</svelte:head>

{@render children()}
