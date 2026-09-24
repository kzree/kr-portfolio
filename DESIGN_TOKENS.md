# Portfolio design tokens

The reference-inspired tokens live in [`src/styles/global.css`](src/styles/global.css). Tailwind CSS 4 exposes the `@theme static` values as utility classes and CSS variables.

| Role | Tailwind examples |
| --- | --- |
| Surfaces | `bg-canvas`, `bg-surface`, `bg-surface-soft` |
| Text and lines | `text-ink`, `text-ink-soft`, `border-line` |
| Accent | `bg-accent`, `text-accent-strong` |
| Type | `font-display`, `text-eyebrow`, `text-body`, `text-card`, `text-section`, `text-hero` |
| Letter spacing | `tracking-eyebrow`, `tracking-heading`, `tracking-display` |
| Page rhythm | `px-gutter`, `py-section`, `gap-grid` |
| Shapes and depth | `rounded-card`, `rounded-pill`, `shadow-card` |

The type sizes and page gutters are fluid. `--layout-max`, `--header-height`, and `--card-overlay` are CSS-only tokens for the page frame and image cards.

```astro
<section class="mx-auto max-w-[var(--layout-max)] px-gutter py-section">
  <p class="text-eyebrow tracking-eyebrow uppercase text-ink-soft">Selected work</p>
  <h2 class="mt-4 font-display text-section font-bold tracking-heading">Recent projects</h2>
  <div class="mt-10 grid gap-grid md:grid-cols-2">...</div>
</section>
```

The palette and measurements are approximations from the supplied image. Tune them in one place as real imagery and content are added.
