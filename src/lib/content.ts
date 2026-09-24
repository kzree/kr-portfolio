export interface ImageAsset {
  src: string;
  alt: string;
}

export interface ProjectSummary {
  slug: string;
  title: string;
  categories: string[];
  cardImage?: ImageAsset;
}

export interface WritingSummary {
  title: string;
  type: string;
  excerpt?: string;
  url: string;
  image?: ImageAsset;
}

export interface ProjectLink {
  title: string;
  href: string;
}

export type MetricIcon = 'people' | 'heart' | 'clicks' | 'target';

export interface ResultMetricData {
  value: string;
  label: string;
  icon: MetricIcon;
}

export type MediaItem =
  | { type: 'image'; src: string; alt: string; caption?: string; wide?: boolean }
  | { type: 'video'; src: string; poster?: string; caption?: string; captionsSrc?: string; wide?: boolean };

export type ServiceIconName = 'words' | 'visuals' | 'digital' | 'experiences' | 'strategy';
