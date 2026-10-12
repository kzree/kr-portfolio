# Storyblok components

This folder contains the Storyblok-facing layer. `schema.ts` defines the content types, nestable blocks, and fields in code. The matching `.astro` files render each block and add Storyblok's visual-editor attributes. `types.ts` and `mappers.ts` convert CMS data into the plain props used by `src/components/`.

The technical block names use snake case, such as `featured_work`; `astro.config.mjs` registers each name with its Astro renderer. The `site_settings` story is global data: fetch it once and pass `toSiteSettings(story.content)` to `SiteLayout`.

The page routes fetch content from the EU Storyblok Content Delivery API through `api.ts`. Home resolves its featured project and writing references, the Work index lists all project stories, and project routes are generated from those stories with previous/next navigation ordered by `display_order`. Site settings are shared across routes. `src/data/mock-storyblok.ts` is retained as the original sample content, but the routes no longer use it.

Mock image paths resolve to imported files in `src/assets/mock` through `OptimizedImage.astro`, so Astro generates optimized images. Storyblok-hosted images from `a.storyblok.com` use the same component and are authorized for remote optimization in `astro.config.mjs`.

All 14 components from `schema.ts` were created through the Storyblok MCP in the EU `kr-portfolio` space (`295448473034471`) on October 4, 2026. Their fields and nesting rules were fetched back and verified against the local schema. The starter components (`feature`, `grid`, `page`, and `teaser`) were preserved.

The mock data has also been imported: Home, the Work index at `work/`, Site settings, six projects under `work/`, and three writing entries under `writing/`. All 12 content stories are drafts. Home's featured entries use story UUID references, and its CTA links to the Work index. The five source images are uploaded to the `Mock portfolio` asset folder. The existing starter Home draft was replaced with the portfolio Home content. Saved content and asset references were fetched back and verified. `mock-import.json` records the story and asset identifiers for this import; it contains no credentials.

Configuration and editing:

The public homepage is `/`. `/home` renders the same page as a preview alias, matching the Home story's slug so the Storyblok visual editor can open it without a custom preview-path override.

1. Add its delivery token to `.env` as `STORYBLOK_DELIVERY_API_TOKEN` (see `.env.example`). The Astro integration is registered for the mock preview too; the token enables API access and the visual-editor bridge.
2. The component schemas are already installed. Keep future schema changes synchronized with the local definitions.
3. Use the existing draft stories recorded in `mock-import.json`. Replace the sample copy, links, contact details, and images as final content becomes available.
4. `STORYBLOK_CONTENT_VERSION` defaults to `draft` for this preview. Set it to `published` for the live site once the stories are published. The token must grant access to the selected version.
5. The site is statically generated. Development requests fetch current content; run `npm run build` again to include Storyblok changes in the built site. A deployment webhook can automate rebuilds later.

The token is read on the server and must not use a `PUBLIC_` environment variable. API errors are sanitized so request URLs containing credentials are not exposed. Builds require network access to Storyblok and its image CDN.
