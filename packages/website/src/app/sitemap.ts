import { MetadataRoute } from 'next'

import { getPosts } from '@/blog/api/getPosts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()
  const postsSitemap: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${process.env.NEXT_PUBLIC_URL}/blog/${post.slug}`,
    lastModified: new Date(post.data.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: `${process.env.NEXT_PUBLIC_URL}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/blog `,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...postsSitemap,
  ]
}
