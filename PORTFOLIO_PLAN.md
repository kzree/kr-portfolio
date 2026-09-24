# Portfolio site plan

Build the updated reference design with Astro and Tailwind CSS, using Storyblok for editable content. The existing tokens in `src/styles/global.css` provide the visual foundation.

## Agreed decisions

- The site is English only.
- All home-page copy and images are editable in Storyblok.
- Writing cards link to external articles; the site does not need writing detail pages.
- The three page templates shown in the reference are Home, All work, and Project detail.

## Routes

| Route | Purpose | Content source |
| --- | --- | --- |
| `/` | Home with featured work, services, writing, about, and contact | `Home` story and referenced entries |
| `/work` | Filterable project index | `WorkIndex` story and all published `Project` stories |
| `/work/[slug]` | Individual project case study | One `Project` story |

The About and Contact navigation links point to sections on the home page. The work index and project routes are generated from published Storyblok content at build time.

## Storyblok content types and blocks

Each listed Storyblok block has an Astro rendering component. Content types are standalone stories; nestable blocks live inside another story.

| Storyblok component | Kind | Editable content |
| --- | --- | --- |
| `Home` | Content type | SEO title, description, social image, and ordered home sections |
| `Hero` | Nestable block | Eyebrow, headline, introduction, portrait, handwritten note, CTA label and link |
| `FeaturedWork` | Nestable block | Heading, link label, ordered references to featured projects |
| `Services` | Nestable block | Heading, introduction if needed, ordered service groups |
| `ServiceGroup` | Nestable block | Icon choice, title, ordered skill lines |
| `FeaturedWriting` | Nestable block | Heading, link label if needed, ordered references to writing entries |
| `About` | Nestable block | Heading, biography, portrait, location, education and experience details, CV file and label |
| `Contact` | Nestable block | Heading, invitation text, message CTA label, email, social links |
| `WorkIndex` | Content type | Eyebrow, heading, introduction, SEO title, description, social image |
| `Project` | Content type | Title, slug, year, role, client, categories, short summary, card image, hero image, about text, goal, responsibilities, results, gallery, SEO fields, and display order |
| `ResultMetric` | Nestable block | Value, label, icon choice; repeatable within a project |
| `GalleryItem` | Nestable block | Image or video, alt text, optional caption; repeatable within a project |
| `WritingEntry` | Content type | Type, title, excerpt, thumbnail, image alt text, external URL |
| `SiteSettings` | Content type | Logo text, navigation labels, CV link, email, social links, footer text |

Use a shared category option set for projects. The `/work` filters derive from those categories. The home page selects featured projects and writing entries by reference so their card content is maintained in one place. Keep image alt text and useful crop/focal-point information alongside editable assets.

## Astro components without their own Storyblok block

| Component | Responsibility |
| --- | --- |
| `SiteLayout` | Shared document structure and page frame |
| `Header` and `Footer` | Navigation and global details from `SiteSettings` |
| `SeoHead` | Page title, description, canonical URL, and social image metadata |
| `Container`, `SectionHeading`, `Button` | Reusable presentation using the Tailwind tokens |
| `ProjectCard` and `ProjectGrid` | Shared project previews on Home and All work |
| `CategoryFilter` | Client-side filtering on `/work`; categories come from project data |
| `WritingCard` | External writing preview and link |
| `ProjectMeta` | Year, role, client, and categories on a project page |
| `ProjectPagination` | Previous project, all work, and next project links based on display order |
| `MediaGrid` and `MetricDisplay` | Consistent rendering of project galleries and results |
| `ServiceIcon` | Maps the selected service icon key to an SVG icon |

These components receive Storyblok data as props, but editors do not manage their layout or behavior as separate blocks.

## Page composition

### Home

1. Header and hero with portrait and handwritten note.
2. Selected work row using referenced projects.
3. Five-column services section.
4. Featured writing cards linking to external URLs.
5. About section with portrait, details, and CV link.
6. Contact section and footer.

### All work

1. Header, page title, and introduction.
2. Category filter controls.
3. Responsive grid of all published projects, ordered by `display order`.
4. Footer.

### Project detail

1. Back to all work and previous/next navigation.
2. Project title, categories, year, role, and client.
3. Wide hero image.
4. About, goal, responsibilities, and optional result metrics.
5. Visual materials gallery.
6. Bottom project navigation and footer.

## Build sequence

1. Create the shared Astro layout, navigation, buttons, cards, and responsive grid using the existing Tailwind tokens.
2. Build the three page templates with representative local content and confirm mobile layouts.
3. Define Storyblok content types, nested blocks, categories, and site settings.
4. Connect Storyblok data, references, project routes, and visual preview.
5. Add real copy and media, then check filters, external links, navigation, accessibility, and production build.

The contact CTA can use a `mailto:` link initially, matching the email-led contact area in the reference.
