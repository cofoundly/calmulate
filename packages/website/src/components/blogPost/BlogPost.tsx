import { Card, HeadingText, SmallText } from 'components'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { BLOG_POST_PARAM, routes } from '@/routes'
import { BlogPost as BlogPostType } from '@/types'

type Props = BlogPostType

export const BlogPost = ({
  slug,
  data: { image, date, title, description, authorImage, authorName, authorTitle },
}: Props) => {
  return (
    <Link
      href={routes.blogPost.replace(BLOG_POST_PARAM, slug)}
      className="outline-theme-brand-subtle dark:outline-dark-theme-brand-subtle outline-2 outline-offset-8 transition-colors rounded-xl w-full"
    >
      <Card>
        <Image className="mb-6 rounded-xl" src={image} alt={title} width={672} height={336} />

        <div className="flex flex-col w-full gap-y-2">
          <SmallText>{date}</SmallText>

          <HeadingText>{title}</HeadingText>

          <SmallText className="line-clamp-3">{description}</SmallText>

          <div className="mt-4 flex items-center gap-x-4">
            <Image className="rounded-full" src={authorImage} alt={authorName} width={40} height={40} />

            <div className="flex flex-col">
              <SmallText>
                <b>{authorName}</b>
              </SmallText>

              <SmallText>{authorTitle}</SmallText>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
