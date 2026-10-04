import type { SbBlokData } from '@storyblok/astro';
import { toProjectSummary } from '../storyblok/mappers';
import type {
  AboutFields,
  Asset,
  Block,
  ContactFields,
  FeaturedWorkFields,
  FeaturedWritingFields,
  GalleryItemFields,
  HeroFields,
  HomeFields,
  ProjectFields,
  ResultMetricFields,
  ServiceGroupFields,
  ServicesFields,
  SiteSettingsFields,
  WorkIndexFields,
  WritingEntryFields,
} from '../storyblok/types';

// Preview-only content. Replace these objects with Storyblok API responses later.
let nextId = 0;
const block = <T>(component: string, fields: T): Block<T> => ({
  _uid: `mock-${++nextId}`,
  component,
  ...fields,
}) as Block<T>;

const asset = (filename: string, alt: string): Asset => ({ filename, alt });
const paragraph = (text: string) => ({ type: 'paragraph', content: [{ type: 'text', text }] });
const prose = (...lines: string[]) => ({ type: 'doc', content: lines.map(paragraph) });
const bullets = (...lines: string[]) => ({
  type: 'doc',
  content: [{ type: 'bullet_list', content: lines.map((text) => ({ type: 'list_item', content: [paragraph(text)] })) }],
});

const metric = (value: string, label: string, icon: ResultMetricFields['icon']) =>
  block<ResultMetricFields>('result_metric', { value, label, icon });

const galleryImage = (filename: string, alt: string, caption?: string, wide = false) =>
  block<GalleryItemFields>('gallery_item', { image: asset(filename, alt), caption, wide });

export interface MockProjectStory {
  slug: string;
  full_slug: string;
  content: Block<ProjectFields>;
}

const project = (slug: string, fields: ProjectFields): MockProjectStory => ({
  slug,
  full_slug: `work/${slug}`,
  content: block<ProjectFields>('project', fields),
});

export const mockProjectStories: MockProjectStory[] = [
  project('eelnadal-2026', {
    title: 'Eelnädal 2026',
    year: '2026',
    role: 'Marketing specialist',
    client: 'University welcome week',
    categories: ['Events', 'Social media', 'Campaigns', 'Content'],
    summary: 'A warm, high-energy welcome campaign across the stage, the city and students’ everyday channels.',
    card_image: asset('/mock/event.png', 'Crowd at a purple-lit student event'),
    hero_image: asset('/mock/event.png', 'Audience cheering beneath violet stage lights'),
    about: prose('The first week sets the tone for a new chapter. This sample case study brings the event experience and its supporting communication into one cohesive story.'),
    goal: prose('Help new students feel informed, welcome and excited before they arrive and while the event is happening.'),
    responsibilities: bullets('Campaign concept and content planning', 'Social media storytelling', 'Visual material coordination', 'On-site communication'),
    results: [metric('+30%', 'example engagement', 'people'), metric('66k', 'example social reach', 'heart'), metric('4.2k', 'example link clicks', 'clicks')],
    gallery: [
      galleryImage('/mock/festival-print.png', 'Purple and pink printed festival campaign materials', 'Campaign materials'),
      galleryImage('/mock/editorial.png', 'Editorial print and digital content on a desk', 'Digital and print content'),
      galleryImage('/mock/event.png', 'Students at a live event', 'The live experience', true),
    ],
    display_order: '1',
  }),
  project('tudengifestival', {
    title: 'Tudengifestival',
    year: '2025',
    role: 'Campaign and design',
    client: 'Student festival',
    categories: ['Design', 'Campaigns'],
    summary: 'A bold visual direction for a festival made to feel impossible to miss.',
    card_image: asset('/mock/festival-print.png', 'Magenta and violet festival poster and invitation cards'),
    hero_image: asset('/mock/festival-print.png', 'Printed festival campaign materials'),
    about: prose('This concept explores how a strong visual idea can carry across posters, invitations and social channels.'),
    goal: prose('Create a recognizable campaign that feels energetic, welcoming and easy to adapt.'),
    responsibilities: bullets('Visual concept', 'Campaign materials', 'Social media adaptations'),
    gallery: [galleryImage('/mock/festival-print.png', 'Printed festival posters and cards', 'Poster and invitation system')],
    display_order: '2',
  }),
  project('social-media-development', {
    title: 'Social media channel development',
    year: '2025',
    role: 'Content and social media',
    categories: ['Social media', 'Content'],
    summary: 'A clearer voice and more considered content rhythm for digital channels.',
    card_image: asset('/mock/editorial.png', 'Phone showing a clean social media grid beside an open magazine'),
    hero_image: asset('/mock/editorial.png', 'Editorial content and a social media grid'),
    about: prose('A sample content system built around useful stories, consistent visuals and an approachable tone.'),
    responsibilities: bullets('Content planning', 'Copywriting', 'Channel design'),
    gallery: [galleryImage('/mock/editorial.png', 'Editorial layout and social media content', 'Content direction')],
    display_order: '3',
  }),
  project('taltech-student-portal', {
    title: 'TalTech student portal',
    year: '2025',
    role: 'Copywriting and design',
    categories: ['Copywriting', 'Design', 'Content'],
    summary: 'Turning practical information into content that is simple to find and pleasant to read.',
    card_image: asset('/mock/editorial.png', 'Open editorial publication on a neutral tabletop'),
    hero_image: asset('/mock/editorial.png', 'Open publication with editorial layouts'),
    about: prose('A concept for organizing useful student information with clarity and personality.'),
    responsibilities: bullets('Information structure', 'Web copy', 'Editorial direction'),
    gallery: [galleryImage('/mock/editorial.png', 'Editorial publication and mobile layout', 'Content system')],
    display_order: '4',
  }),
  project('artemis', {
    title: 'ARTEMIS',
    year: '2025',
    role: 'Event communication',
    categories: ['Events', 'Communication'],
    summary: 'A live experience supported by clear communication before, during and after the event.',
    card_image: asset('/mock/event.png', 'Violet stage lighting over a live audience'),
    hero_image: asset('/mock/event.png', 'Crowd facing a bright event stage'),
    about: prose('This sample project pairs an atmospheric event with a practical communication plan.'),
    responsibilities: bullets('Event messaging', 'Audience communications', 'On-site content'),
    gallery: [galleryImage('/mock/event.png', 'Live event audience under purple lights', 'Event atmosphere')],
    display_order: '5',
  }),
  project('brand-identity', {
    title: 'Brand identity',
    year: '2024',
    role: 'Design',
    categories: ['Design', 'Campaigns'],
    summary: 'A quiet, tactile identity across everyday brand materials.',
    card_image: asset('/mock/tote.png', 'Canvas tote bag with a forest-green abstract graphic'),
    hero_image: asset('/mock/tote.png', 'Branded canvas tote bag in a warm studio'),
    about: prose('A flexible identity concept expressed through print, packaging and objects people use.'),
    responsibilities: bullets('Visual direction', 'Brand materials', 'Campaign adaptations'),
    gallery: [galleryImage('/mock/tote.png', 'Canvas tote bag and neutral brand stationery', 'Brand applications')],
    display_order: '6',
  }),
];

export const mockProjectSummaries = mockProjectStories.map(toProjectSummary);

const writing = (slug: string, fields: WritingEntryFields) => ({
  slug,
  full_slug: `writing/${slug}`,
  content: block<WritingEntryFields>('writing_entry', fields),
});

const mockWritingStories = [
  writing('more-than-a-headline', { title: 'More than a headline.', type: 'Sample article', excerpt: 'A short example of how a strong message becomes a useful story.', thumbnail: asset('/mock/editorial.png', 'Open editorial publication'), external_url: { url: 'https://example.com', linktype: 'url' } }),
  writing('ideas-that-connect', { title: 'Ideas that connect.', type: 'Sample article', excerpt: 'Finding the human angle in campaigns, channels and everyday content.', thumbnail: asset('/mock/festival-print.png', 'Colorful printed campaign materials'), external_url: { url: 'https://example.com', linktype: 'url' } }),
  writing('make-it-clear', { title: 'Make it clear.', type: 'Sample article', excerpt: 'Why simple language and thoughtful design work better together.', thumbnail: asset('/mock/tote.png', 'Minimal canvas tote bag'), external_url: { url: 'https://example.com', linktype: 'url' } }),
];

const service = (icon: ServiceGroupFields['icon'], title: string, skills: string) =>
  block<ServiceGroupFields>('service_group', { icon, title, skills });

export const mockHome = block<HomeFields>('home', {
  seo_title: 'Kristel — Marketing Specialist',
  seo_description: 'Ideas into content, campaigns and experiences.',
  body: [
    block<HeroFields>('hero', {
      eyebrow: 'Marketing specialist',
      headline: 'I turn ideas into content, campaigns & experiences.',
      introduction: 'Marketing, copywriting, design, social media and events — from the first idea to the final execution.',
      portrait: asset('/mock/portrait.png', 'Fictional creative professional in a black blazer'),
      cta_label: 'View my work',
      cta_link: { cached_url: 'work', linktype: 'story' },
    }),
    block<FeaturedWorkFields>('featured_work', {
      eyebrow: 'Selected work',
      heading: 'Projects I’m proud of.',
      link_label: 'View all work',
      projects: mockProjectStories.slice(0, 4),
    }),
    block<ServicesFields>('services', {
      eyebrow: 'What I do',
      heading: 'From strategy to execution.',
      introduction: 'I work across the whole marketing journey, joining a clear plan with creative detail.',
      groups: [
        service('words', 'Words', 'Copywriting\nContent creation\nStorytelling\nCampaign copy\nWeb content'),
        service('visuals', 'Visuals', 'Graphic design\nSocial media visuals\nPrint materials\nPresentations\nBrand design'),
        service('digital', 'Digital', 'Social media\nDigital campaigns\nEmail marketing\nWebsite content\nAnalytics'),
        service('experiences', 'Experiences', 'Event concept\nEvent marketing\nEvent communication\nCoordination\nOn-site communication'),
        service('strategy', 'Strategy', 'Marketing strategy\nCampaign planning\nContent strategy\nAudience research\nProject management'),
      ] as SbBlokData[],
    }),
    block<FeaturedWritingFields>('featured_writing', {
      heading: 'I like working with words.',
      entries: mockWritingStories,
    }),
    block<AboutFields>('about', {
      eyebrow: 'About me',
      heading: 'A marketing specialist with a soft spot for good ideas.',
      biography: prose('I enjoy working where strategy meets creativity. I like taking an idea and turning it into something people can actually see, read, experience and remember.', 'This is sample copy for the visual preview; the final story will come from Storyblok.'),
      portrait: asset('/mock/portrait.png', 'Fictional creative professional seated in a studio'),
      location: 'Based in Tallinn',
      education: 'Marketing and communication background',
      experience: 'Content, campaigns and event work',
    }),
    block<ContactFields>('contact', {
      eyebrow: 'Contact',
      heading: 'Have an idea? Let’s talk.',
      invitation: 'I’m always open to interesting projects, new opportunities and inspiring people.',
      email: 'hello@example.com',
      message_label: 'Send a message',
    }),
  ] as SbBlokData[],
});

export const mockWorkIndex = block<WorkIndexFields>('work_index', {
  eyebrow: 'Portfolio',
  heading: 'All work.',
  introduction: 'A collection of campaigns, content, design, events and other projects. Each one shows a different part of the work I enjoy.',
  seo_title: 'All work — Kristel',
  seo_description: 'Selected campaign, content, design and event projects.',
});

export const mockSiteSettings = block<SiteSettingsFields>('site_settings', {
  brand: 'KRISTEL',
  work_label: 'Work',
  about_label: 'About',
  contact_label: 'Contact',
  email: 'hello@example.com',
  footer_note: 'Preview content · © 2026',
});
