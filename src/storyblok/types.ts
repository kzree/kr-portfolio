import type { SbBlokData } from '@storyblok/astro';

export interface Asset {
  filename?: string;
  alt?: string;
  name?: string;
}

export interface Link {
  url?: string;
  cached_url?: string;
  linktype?: string;
  target?: string;
}

export type Block<T> = SbBlokData & T;
export type Relation<T> = string | { slug: string; full_slug?: string; content: T };

export interface SeoFields {
  seo_title?: string;
  seo_description?: string;
  social_image?: Asset;
}

export interface HomeFields extends SeoFields {
  body?: SbBlokData[];
}

export interface HeroFields {
  eyebrow?: string;
  headline: string;
  introduction?: string;
  portrait?: Asset;
  handwritten_note?: string;
  cta_label?: string;
  cta_link?: Link;
}

export interface FeaturedWorkFields {
  eyebrow?: string;
  heading: string;
  link_label?: string;
  projects?: Relation<ProjectFields>[];
}

export interface ServicesFields {
  eyebrow?: string;
  heading: string;
  introduction?: string;
  groups?: SbBlokData[];
}

export interface ServiceGroupFields {
  icon: 'words' | 'visuals' | 'digital' | 'experiences' | 'strategy';
  title: string;
  skills?: string;
}

export interface FeaturedWritingFields {
  heading: string;
  link_label?: string;
  collection_link?: Link;
  entries?: Relation<WritingEntryFields>[];
}

export interface AboutFields {
  eyebrow?: string;
  heading: string;
  biography?: unknown;
  portrait?: Asset;
  location?: string;
  education?: string;
  experience?: string;
  cv_file?: Asset;
  cv_label?: string;
}

export interface ContactFields {
  eyebrow?: string;
  heading: string;
  invitation?: string;
  email?: string;
  message_label?: string;
  linkedin?: Link;
}

export interface WorkIndexFields extends SeoFields {
  eyebrow?: string;
  heading: string;
  introduction?: string;
}

export interface ProjectFields extends SeoFields {
  title: string;
  year?: string;
  role?: string;
  client?: string;
  categories?: string[];
  summary?: string;
  card_image?: Asset;
  hero_image?: Asset;
  about?: unknown;
  goal?: unknown;
  responsibilities?: unknown;
  results?: SbBlokData[];
  gallery?: SbBlokData[];
  display_order?: string;
}

export interface ResultMetricFields {
  value: string;
  label: string;
  icon: 'people' | 'heart' | 'clicks' | 'target';
}

export interface GalleryItemFields {
  image?: Asset;
  video?: Asset;
  poster?: Asset;
  captions_file?: Asset;
  caption?: string;
  wide?: boolean;
}

export interface WritingEntryFields {
  title: string;
  type?: string;
  excerpt?: string;
  thumbnail?: Asset;
  external_url?: Link;
}

export interface SiteSettingsFields {
  brand?: string;
  work_label?: string;
  about_label?: string;
  contact_label?: string;
  cv_file?: Asset;
  cv_label?: string;
  email?: string;
  linkedin?: Link;
  instagram?: Link;
  footer_note?: string;
}
