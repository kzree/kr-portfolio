import type { ProjectSummary, WritingSummary } from '../lib/content';
import type { SiteSettings } from '../lib/site';
import type { Asset, Link, ProjectFields, Relation, SiteSettingsFields, WritingEntryFields } from './types';

export function assetUrl(asset?: Asset): string | undefined {
  return asset?.filename || undefined;
}

export function linkUrl(link?: Link): string | undefined {
  if (!link) return undefined;
  if (link.linktype === 'story' && link.cached_url) return `/${link.cached_url.replace(/^\/+/, '')}`;
  return link.url || link.cached_url || undefined;
}

export function isResolved<T>(relation: Relation<T>): relation is Exclude<Relation<T>, string> {
  return typeof relation !== 'string' && !!relation.content;
}

export function toProjectSummary(relation: Exclude<Relation<ProjectFields>, string>): ProjectSummary {
  const content = relation.content;
  const image = assetUrl(content.card_image);
  return {
    slug: relation.slug,
    title: content.title,
    categories: content.categories ?? [],
    cardImage: image ? { src: image, alt: content.card_image?.alt || content.title } : undefined,
  };
}

export function toWritingSummary(relation: Exclude<Relation<WritingEntryFields>, string>): WritingSummary | undefined {
  const content = relation.content;
  const url = linkUrl(content.external_url);
  if (!url) return undefined;
  const image = assetUrl(content.thumbnail);
  return {
    title: content.title,
    type: content.type || 'Writing',
    excerpt: content.excerpt,
    url,
    image: image ? { src: image, alt: content.thumbnail?.alt || content.title } : undefined,
  };
}

export function toSiteSettings(blok: SiteSettingsFields): SiteSettings {
  const socialLinks = [
    { label: 'LinkedIn', href: linkUrl(blok.linkedin) },
    { label: 'Instagram', href: linkUrl(blok.instagram) },
  ].filter((link): link is { label: string; href: string } => !!link.href);

  return {
    brand: blok.brand || 'KRISTEL',
    navigation: [
      { label: blok.work_label || 'Work', href: '/work' },
      { label: blok.about_label || 'About', href: '/#about' },
      { label: blok.contact_label || 'Contact', href: '/#contact' },
    ],
    cvUrl: assetUrl(blok.cv_file),
    cvLabel: blok.cv_label,
    email: blok.email,
    socialLinks,
    footerNote: blok.footer_note,
  };
}
