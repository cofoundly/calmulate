import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'

import { BlogPost } from '@/types'

import { BLOG_POSTS_FOLDER } from './getPosts'

const validatePostData = (data: any): data is BlogPost['data'] => {
  if (typeof data.image !== 'string') {
    return false
  }

  if (typeof data.date !== 'string') {
    return false
  }

  if (typeof data.title !== 'string') {
    return false
  }

  if (typeof data.description !== 'string') {
    return false
  }

  if (typeof data.authorImage !== 'string') {
    return false
  }

  if (typeof data.authorName !== 'string') {
    return false
  }

  if (typeof data.authorTitle !== 'string') {
    return false
  }

  return true
}

export const getPost = async (slug: string) => {
  const fileContents = fs.readFileSync(path.join(process.cwd(), `${BLOG_POSTS_FOLDER}/${slug}.mdx`), 'utf8')
  const { data, content } = matter(fileContents)

  if (!validatePostData(data)) {
    throw new Error(`Invalid post data: ${JSON.stringify(data)}`)
  }

  const source = await serialize(content)

  const post: BlogPost = {
    slug,
    data,
    source,
  }

  return post
}
