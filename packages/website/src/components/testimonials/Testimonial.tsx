import { Card, HeadingText, ParagraphText, SmallText } from 'components'
import Image from 'next/image'
import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

export type TestimonialProps = {
  name: string
  title: string
  company: string
  testimonial: string
  image: string
}

type Props = ComponentPropsWithoutRef<'div'> & TestimonialProps

export const Testimonial = ({ className = '', name, title, company, testimonial, image, ...props }: Props) => {
  return (
    <Card className={twMerge('', className)} {...props}>
      <ParagraphText>{testimonial}</ParagraphText>

      <div className="relative mt-6 flex items-center justify-between border-t border-theme-border pt-6 dark:border-dark-theme-border">
        <div>
          <HeadingText>{name}</HeadingText>

          <SmallText className="mt-1">
            {title} at {company}
          </SmallText>
        </div>

        <div className="overflow-hidden rounded-full bg-theme-background dark:bg-dark-theme-background">
          <Image className="h-14 w-14 object-cover" src={image} alt={name} width={56} height={56} />
        </div>
      </div>
    </Card>
  )
}
