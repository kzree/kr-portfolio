import { useStoryblokApi, type ISbStoryData, type ISbStoryParams } from '@storyblok/astro';
import { toSiteSettings } from './mappers';
import type { Block, ProjectFields, SiteSettingsFields } from './types';

export type PortfolioStory<T> = ISbStoryData<Block<T>>;

const configuredVersion = import.meta.env.STORYBLOK_CONTENT_VERSION || 'draft';
if (configuredVersion !== 'draft' && configuredVersion !== 'published') {
  throw new Error('STORYBLOK_CONTENT_VERSION must be draft or published.');
}
const version = configuredVersion as 'draft' | 'published';

function requestError(resource: string, error: unknown): Error {
  const status = typeof error === 'object' && error !== null && 'status' in error ? error.status : undefined;
  // Do not expose SDK errors: they can include a request URL containing the token.
  return new Error(`Could not load ${resource} from Storyblok${status ? ` (HTTP ${status})` : ''}. Check the delivery token, content version, and connection.`);
}

export async function getStory<T>(slug: string, component: string, options: ISbStoryParams = {}): Promise<PortfolioStory<T>> {
  let story: PortfolioStory<T>;
  try {
    const { data } = await useStoryblokApi().get(`cdn/stories/${slug}`, {
      ...options,
      version,
      resolve_links: 'url',
    });
    story = data.story;
  } catch (error) {
    throw requestError(slug, error);
  }
  if (story.content.component !== component) {
    throw new Error(`Storyblok story ${slug} must use the ${component} content type.`);
  }
  return story;
}

export async function getProjects(): Promise<PortfolioStory<ProjectFields>[]> {
  let stories: PortfolioStory<ProjectFields>[];
  try {
    // getAll follows pagination, including when the portfolio grows beyond one page.
    stories = await useStoryblokApi().getAll('cdn/stories', {
      version,
      starts_with: 'work/',
      content_type: 'project',
      per_page: 100,
    });
  } catch (error) {
    throw requestError('projects', error);
  }
  return stories.filter((story) => !story.is_folder && story.content.component === 'project').sort((a, b) => {
    const order = (value?: string) => value?.trim() && Number.isFinite(Number(value)) ? Number(value) : Number.MAX_SAFE_INTEGER;
    return order(a.content.display_order) - order(b.content.display_order) || a.content.title.localeCompare(b.content.title);
  });
}

const fetchSiteSettings = async () => toSiteSettings((await getStory<SiteSettingsFields>('site-settings', 'site_settings')).content);
let buildSiteSettings: ReturnType<typeof fetchSiteSettings> | undefined;

export function getSiteSettings() {
  // Share the global story across build routes; fetch fresh data during development.
  return import.meta.env.PROD ? (buildSiteSettings ??= fetchSiteSettings()) : fetchSiteSettings();
}
