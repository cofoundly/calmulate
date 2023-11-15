export const BLOG_POST_PARAM = ':slug'

export enum SectionId {
  Features = 'features',
  Preview = 'preview',
  Pricing = 'pricing',
  Testimonials = 'testimonials',
  Faqs = 'faqs',
}

export const routes = {
  home: '/',
  features: `/#${SectionId.Features}`,
  preview: `/#${SectionId.Preview}`,
  pricing: `/#${SectionId.Pricing}`,
  testimonials: `/#${SectionId.Testimonials}`,
  faqs: `/#${SectionId.Faqs}`,
  blog: '/blog',
  blogPost: `/blog/${BLOG_POST_PARAM}`,
  privacy: '/privacy',
}
