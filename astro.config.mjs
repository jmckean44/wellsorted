// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	site: 'https://wellsorted.ca',
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
});
