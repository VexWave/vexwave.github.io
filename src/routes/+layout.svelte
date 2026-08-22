<script lang="ts">
	import '../app.css';
	import logo from '$lib/assets/vex-logo.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={logo} />
	<!-- The --wave violet, restated because a meta tag cannot read a token. -->
	<meta name="theme-color" content="#7b2df0" />
</svelte:head>

{@render children()}
