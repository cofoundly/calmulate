import { MDXRemoteSerializeResult } from 'next-mdx-remote'

/* BLOG */
type BlogPostData = {
  image: string
  date: string
  title: string
  description: string
  authorImage: string
  authorName: string
  authorTitle: string
}

export type BlogPost = {
  slug: string
  data: BlogPostData
  source: MDXRemoteSerializeResult
}
