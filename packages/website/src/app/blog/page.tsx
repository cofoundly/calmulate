import { Columns } from 'components'
import React from 'react'

import { getPosts } from '@/blog/api/getPosts'
import { BlogPost } from '@/components/blogPost/BlogPost'
import { Section } from '@/components/section/Section'

export default async function Page() {
  const posts = await getPosts()

  return (
    <Section className="min-h-screen mt-[63px]" variant="inverted" title="Latest from the blog">
      <Columns>
        {posts.map(post => (
          <li key={post.slug}>
            <BlogPost {...post} />
          </li>
        ))}
      </Columns>
    </Section>
  )
}
