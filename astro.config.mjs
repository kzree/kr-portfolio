// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { storyblok } from '@storyblok/astro';
import { loadEnv } from 'vite';

const storyblokToken = process.env.STORYBLOK_DELIVERY_API_TOKEN || loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), 'STORYBLOK_').STORYBLOK_DELIVERY_API_TOKEN;

// https://astro.build/config
export default defineConfig({
	image: {
		domains: ['a.storyblok.com'],
	},
	integrations: [
		storyblok({
			accessToken: storyblokToken ?? '',
			useCustomApi: !storyblokToken,
			bridge: !!storyblokToken,
			components: {
				home: 'storyblok/Home',
				hero: 'storyblok/Hero',
				featured_work: 'storyblok/FeaturedWork',
				services: 'storyblok/Services',
				service_group: 'storyblok/ServiceGroup',
				featured_writing: 'storyblok/FeaturedWriting',
				about: 'storyblok/About',
				contact: 'storyblok/Contact',
				work_index: 'storyblok/WorkIndex',
				project: 'storyblok/Project',
				result_metric: 'storyblok/ResultMetric',
				gallery_item: 'storyblok/GalleryItem',
				writing_entry: 'storyblok/WritingEntry',
				site_settings: 'storyblok/SiteSettings',
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
