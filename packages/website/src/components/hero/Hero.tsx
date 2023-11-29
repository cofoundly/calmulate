import { SmallText } from 'components'
import Image, { ImageProps } from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import { AnalyticsPrimaryButtonName } from '@/analytics/models'

import { PrimaryActionButton } from '../primaryActionButton/PrimaryActionButton'
import { Section, SectionProps } from '../section/Section'

type Props = {
  image?: ImageProps
  cta?: string
  footer?: string
  screenshot?: ImageProps
} & SectionProps

export const Hero = ({ variant, image, cta, footer, screenshot, ...sectionProps }: Props) => {
  return (
    <Section
      variant={variant}
      prefix={
        image && (
          <Image
            className={twMerge(
              'bg-theme-background-subtle dark:bg-dark-theme-background-subtle rounded-full shadow-lg',
              image.className || '',
            )}
            priority
            {...image}
          />
        )
      }
      {...sectionProps}
    >
      <div className="mt-12 flex justify-center">
        <div className="flex flex-col items-center gap-y-4">
          {cta && (
            <PrimaryActionButton
              name={AnalyticsPrimaryButtonName.Hero}
              variant={variant === 'default' ? 'secondaryInverted' : 'primary'}
              size="xl"
            >
              {cta}
            </PrimaryActionButton>
          )}

          {footer && (
            <SmallText className={twMerge('text-center', variant === 'default' ? 'text-theme-content-inverted' : '')}>
              {footer}
            </SmallText>
          )}
        </div>
      </div>

      {screenshot && <Image className="mt-12 rounded-lg lg:rounded-xl shadow-lg" {...screenshot} />}
    </Section>
  )
}
