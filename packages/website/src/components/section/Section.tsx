import { Background, ParagraphText } from 'components'
import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Container } from '../container/Container'
import { HugeHighlightedText } from '../hugeHighlightedText/HugeHighlightedText'

type Props = Omit<ComponentPropsWithoutRef<'section'>, 'prefix'> & {
  variant?: 'default' | 'inverted'
  prefix?: ReactNode
  title: string
  highlighted?: string
  subtitle?: string
}

export const Section = ({
  className = '',
  variant = 'default',
  prefix,
  title,
  highlighted,
  subtitle,
  children,
  ...props
}: Props) => {
  return (
    <section
      className={twMerge('relative px-4 sm:px-8 py-24 lg:px-16 flex flex-col justify-center', className)}
      {...props}
    >
      <Background className="absolute inset-0" variant={variant} />

      <div className="relative flex flex-col gap-y-12 lg:gap-y-24">
        <Container className={twMerge('text-center items-center')}>
          {prefix}

          <HugeHighlightedText variant={variant} highlighted={highlighted}>
            {title}
          </HugeHighlightedText>

          {subtitle && <ParagraphText>{subtitle}</ParagraphText>}
        </Container>

        {children}
      </div>
    </section>
  )
}
