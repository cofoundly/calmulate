import { SmallText } from 'components'
import Image, { ImageProps } from 'next/image'
import React from 'react'

import { AnalyticsPrimaryButtonName } from '@/analytics/models'

import { PrimaryActionButton } from '../primaryActionButton/PrimaryActionButton'
import { Section, SectionProps } from '../section/Section'

type Props = {
  image?: ImageProps
  cta?: string
  footer?: string
} & SectionProps

export const Hero = ({ variant, image, cta, footer, ...sectionProps }: Props) => {
  return (
    <Section
      variant={variant}
      prefix={
        image && (
          <Image
            className="bg-theme-background-subtle dark:bg-dark-theme-background-subtle rounded-lg shadow-lg"
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
            <SmallText className={variant === 'default' ? 'text-theme-content-inverted' : ''}>{footer}</SmallText>
          )}
        </div>
      </div>
    </Section>
  )
}
