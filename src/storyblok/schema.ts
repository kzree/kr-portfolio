import { defineBlock, defineField, defineSchema } from '@storyblok/schema';

const imageField = <TName extends string>(name: TName) => defineField(name, { type: 'asset', filetypes: ['images'] });
const seoFields = [
  defineField('seo_title', { type: 'text' }),
  defineField('seo_description', { type: 'textarea' }),
  imageField('social_image'),
];

const categories = ['Campaigns', 'Events', 'Social media', 'Design', 'Content', 'Copywriting', 'Communication'];
const categoryOptions = categories.map((name) => ({ name, value: name }));

export const serviceGroupBlock = defineBlock({
  name: 'service_group',
  display_name: 'Service group',
  fields: [
    defineField('icon', { type: 'option', required: true, options: ['words', 'visuals', 'digital', 'experiences', 'strategy'].map((value) => ({ name: value, value })) }),
    defineField('title', { type: 'text', required: true }),
    defineField('skills', { type: 'textarea', description: 'One skill per line' }),
  ],
});

export const resultMetricBlock = defineBlock({
  name: 'result_metric',
  display_name: 'Result metric',
  fields: [
    defineField('value', { type: 'text', required: true }),
    defineField('label', { type: 'text', required: true }),
    defineField('icon', { type: 'option', options: ['people', 'heart', 'clicks', 'target'].map((value) => ({ name: value, value })) }),
  ],
});

export const galleryItemBlock = defineBlock({
  name: 'gallery_item',
  display_name: 'Gallery item',
  fields: [
    imageField('image'),
    defineField('video', { type: 'asset' }),
    imageField('poster'),
    defineField('captions_file', { type: 'asset' }),
    defineField('caption', { type: 'text' }),
    defineField('wide', { type: 'boolean' }),
  ],
});

export const heroBlock = defineBlock({
  name: 'hero',
  display_name: 'Hero',
  fields: [
    defineField('eyebrow', { type: 'text' }),
    defineField('headline', { type: 'text', required: true }),
    defineField('introduction', { type: 'textarea' }),
    imageField('portrait'),
    defineField('handwritten_note', { type: 'textarea' }),
    defineField('cta_label', { type: 'text' }),
    defineField('cta_link', { type: 'multilink' }),
  ],
});

export const featuredWorkBlock = defineBlock({
  name: 'featured_work',
  display_name: 'Featured work',
  fields: [
    defineField('eyebrow', { type: 'text' }),
    defineField('heading', { type: 'text', required: true }),
    defineField('link_label', { type: 'text' }),
    defineField('projects', { type: 'options', source: 'internal_stories', filter_content_type: ['project'], is_reference_type: true }),
  ],
});

export const servicesBlock = defineBlock({
  name: 'services',
  display_name: 'Services',
  fields: [
    defineField('eyebrow', { type: 'text' }),
    defineField('heading', { type: 'text', required: true }),
    defineField('introduction', { type: 'textarea' }),
    defineField('groups', { type: 'bloks', allow: [serviceGroupBlock] }),
  ],
});

export const featuredWritingBlock = defineBlock({
  name: 'featured_writing',
  display_name: 'Featured writing',
  fields: [
    defineField('heading', { type: 'text', required: true }),
    defineField('link_label', { type: 'text' }),
    defineField('collection_link', { type: 'multilink' }),
    defineField('entries', { type: 'options', source: 'internal_stories', filter_content_type: ['writing_entry'], is_reference_type: true }),
  ],
});

export const aboutBlock = defineBlock({
  name: 'about',
  display_name: 'About',
  fields: [
    defineField('eyebrow', { type: 'text' }),
    defineField('heading', { type: 'text', required: true }),
    defineField('biography', { type: 'richtext' }),
    imageField('portrait'),
    defineField('location', { type: 'text' }),
    defineField('education', { type: 'textarea' }),
    defineField('experience', { type: 'textarea' }),
    defineField('cv_file', { type: 'asset' }),
    defineField('cv_label', { type: 'text' }),
  ],
});

export const contactBlock = defineBlock({
  name: 'contact',
  display_name: 'Contact',
  fields: [
    defineField('eyebrow', { type: 'text' }),
    defineField('heading', { type: 'text', required: true }),
    defineField('invitation', { type: 'textarea' }),
    defineField('email', { type: 'text' }),
    defineField('message_label', { type: 'text' }),
    defineField('linkedin', { type: 'multilink' }),
  ],
});

export const homeBlock = defineBlock({
  name: 'home',
  display_name: 'Home',
  is_root: true,
  is_nestable: false,
  fields: [
    ...seoFields,
    defineField('body', { type: 'bloks', allow: [heroBlock, featuredWorkBlock, servicesBlock, featuredWritingBlock, aboutBlock, contactBlock] }),
  ],
});

export const workIndexBlock = defineBlock({
  name: 'work_index',
  display_name: 'Work index',
  is_root: true,
  is_nestable: false,
  fields: [
    defineField('eyebrow', { type: 'text' }),
    defineField('heading', { type: 'text', required: true }),
    defineField('introduction', { type: 'textarea' }),
    ...seoFields,
  ],
});

export const projectBlock = defineBlock({
  name: 'project',
  display_name: 'Project',
  is_root: true,
  is_nestable: false,
  fields: [
    defineField('title', { type: 'text', required: true }),
    defineField('year', { type: 'text' }),
    defineField('role', { type: 'text' }),
    defineField('client', { type: 'text' }),
    defineField('categories', { type: 'options', options: categoryOptions }),
    defineField('summary', { type: 'textarea' }),
    imageField('card_image'),
    imageField('hero_image'),
    defineField('about', { type: 'richtext' }),
    defineField('goal', { type: 'richtext' }),
    defineField('responsibilities', { type: 'richtext' }),
    defineField('results', { type: 'bloks', allow: [resultMetricBlock] }),
    defineField('gallery', { type: 'bloks', allow: [galleryItemBlock] }),
    defineField('display_order', { type: 'number' }),
    ...seoFields,
  ],
});

export const writingEntryBlock = defineBlock({
  name: 'writing_entry',
  display_name: 'Writing entry',
  is_root: true,
  is_nestable: false,
  fields: [
    defineField('title', { type: 'text', required: true }),
    defineField('type', { type: 'text' }),
    defineField('excerpt', { type: 'textarea' }),
    imageField('thumbnail'),
    defineField('external_url', { type: 'multilink', required: true }),
  ],
});

export const siteSettingsBlock = defineBlock({
  name: 'site_settings',
  display_name: 'Site settings',
  is_root: true,
  is_nestable: false,
  fields: [
    defineField('brand', { type: 'text' }),
    defineField('work_label', { type: 'text' }),
    defineField('about_label', { type: 'text' }),
    defineField('contact_label', { type: 'text' }),
    defineField('cv_file', { type: 'asset' }),
    defineField('cv_label', { type: 'text' }),
    defineField('email', { type: 'text' }),
    defineField('linkedin', { type: 'multilink' }),
    defineField('instagram', { type: 'multilink' }),
    defineField('footer_note', { type: 'text' }),
  ],
});

export const schema = defineSchema({
  blocks: {
    homeBlock,
    workIndexBlock,
    projectBlock,
    writingEntryBlock,
    siteSettingsBlock,
    heroBlock,
    featuredWorkBlock,
    servicesBlock,
    serviceGroupBlock,
    featuredWritingBlock,
    aboutBlock,
    contactBlock,
    resultMetricBlock,
    galleryItemBlock,
  },
});
