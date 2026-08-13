import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

/*
 * Pages serves a project site under /<repo>, so every generated URL needs that
 * prefix. The workflow passes it from the configure-pages action, which reports
 * an empty string once a custom domain is set — so this handles both without a
 * code change. Unset locally, and anything not rooted at / is ignored.
 */
const basePath = process.env.BASE_PATH ?? '';
const base = basePath.startsWith('/') ? (basePath as `/${string}`) : '';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			adapter: adapter(),

			paths: { base }
		})
	]
});
