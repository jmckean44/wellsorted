// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	site: 'https://rightorder.ca',
	output: 'static',
	//outDir: 'dist',
	prefetch: true,
	integrations: [
		sitemap(),
		icon(),
		react({
			experimentalReactChildren: true,
		}),
	],
	image: {
		responsiveStyles: true,
		layout: 'full-width',
	},
	adapter: node({
		mode: 'standalone',
	}),
});
