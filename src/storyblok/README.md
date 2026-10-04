# Storyblok components

This folder contains the Storyblok-facing layer. `schema.ts` defines the content types, nestable blocks, and fields in code. The matching `.astro` files render each block and add Storyblok's visual-editor attributes. `types.ts` and `mappers.ts` convert CMS data into the plain props used by `src/components/`.

The technical block names use snake case, such as `featured_work`; `astro.config.mjs` registers each name with its Astro renderer. The `site_settings` story is global data: fetch it once and pass `toSiteSettings(story.content)` to `SiteLayout`.

The current pages render Storyblok-shaped mock content from `src/data/mock-storyblok.ts` through these components. To connect a Storyblok space:

Mock image paths resolve to imported files in `src/assets/mock` through `OptimizedImage.astro`, so Astro generates optimized images. Storyblok-hosted images from `a.storyblok.com` use the same component and are authorized for remote optimization in `astro.config.mjs`.

1. Add its delivery token to `.env` as `STORYBLOK_DELIVERY_API_TOKEN` (see `.env.example`). The Astro integration is registered for the mock preview too; the token enables API access and the visual-editor bridge.
2. Sync `schema.ts` to the space using the Storyblok CLI after authenticating. Review the CLI's dry-run diff before pushing; a space ID is required.
3. Create the Home, Work index, Project, Writing entry, and Site settings stories. Use Storyblok references for featured projects and writing.
4. Fetch published or draft stories in the page routes. Resolve `featured_work.projects` and `featured_writing.entries` so their card data is available to the home renderers.
5. Replace the local mock imports in page routes with fetched stories. Keep passing project lists and previous/next links to the Work index and Project renderers.

No Storyblok space has been changed by these local files.
