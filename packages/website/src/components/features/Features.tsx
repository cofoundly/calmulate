import { CheckBadgeIcon } from '@heroicons/react/24/outline'
import { ParagraphText, SmallText, TitleText } from 'components'
import Image, { ImageProps } from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import { AnalyticsPrimaryButtonName } from '@/analytics/models'

import { Container } from '../container/Container'
import { PrimaryActionButton } from '../primaryActionButton/PrimaryActionButton'
import { Section, SectionProps } from '../section/Section'

type Props = {
  sections?: Array<{
    image?: ImageProps
    heading?: string
    title: string
    description: string
    features?: string[]
    cta?: string
    footer?: string
  }>
} & SectionProps

export const Features = ({ variant, sections, ...sectionProps }: Props) => {
  return (
    <Section variant={variant} {...sectionProps}>
      <Container className="mt-12 lg:mt-24 gap-y-12 lg:gap-y-24">
        {sections?.map((section, index) => {
          const isEven = index % 2 === 0

          return (
            <div
              key={section.title}
              className={twMerge(
                'flex justify-center gap-8 lg:gap-16 flex-wrap lg:flex-nowrap',
                isEven ? 'flex-row-reverse' : '',
              )}
            >
              {section.image && (
                <div className="lg:flex-1 flex flex-col items-center justify-center">
                  <Image
                    className="rounded-lg shadow-lg bg-theme-background-subtle dark:bg-dark-theme-background-subtle"
                    {...section.image}
                  />
                </div>
              )}

              <div className="lg:flex-1 flex flex-col justify-center text-center items-center lg:items-start lg:text-left gap-y-6 max-w-xl">
                {section.heading && <SmallText>{section.heading}</SmallText>}

                <TitleText className={variant === 'default' ? 'text-theme-content-inverted' : ''}>
                  {section.title}
                </TitleText>

                <ParagraphText className={variant === 'default' ? 'text-theme-content-inverted' : ''}>
                  {section.description}
                </ParagraphText>

                {section.features?.length ? (
                  <ul className="flex flex-col items-start gap-y-2 text-left">
                    {section.features.map(feature => (
                      <li key={feature} className="flex items-center gap-x-2">
                        <div>
                          <CheckBadgeIcon
                            className={twMerge(
                              'h-5',
                              variant === 'inverted'
                                ? 'text-theme-brand dark:text-dark-theme-brand'
                                : 'text-theme-content-inverted dark:text-dark-theme-content',
                            )}
                          />
                        </div>

                        <ParagraphText className={variant === 'default' ? 'text-theme-content-inverted' : ''}>
                          {feature}
                        </ParagraphText>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.cta && (
                  <PrimaryActionButton
                    name={AnalyticsPrimaryButtonName.Features}
                    variant={variant === 'default' ? 'secondaryInverted' : 'primary'}
                  >
                    {section.cta}
                  </PrimaryActionButton>
                )}

                {section.footer && <SmallText>{section.footer}</SmallText>}
              </div>
            </div>
          )
        })}
      </Container>
    </Section>
  )
}
