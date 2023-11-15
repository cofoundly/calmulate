import fs from 'fs'
import path from 'path'

import { getPost } from './getPost'

export const BLOG_POSTS_FOLDER = 'src/blog/posts'

export const getPosts = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), BLOG_POSTS_FOLDER))

  const promises = files.map(async filename => {
    const slug = filename.replace('.mdx', '')
    const post = await getPost(slug)

    return post
  })

  const allPostsData = await Promise.all(promises)

  return allPostsData
}
