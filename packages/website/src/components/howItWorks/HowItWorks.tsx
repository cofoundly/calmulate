import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { ParagraphText, TitleText } from 'components'
import React, { Fragment } from 'react'
import { twMerge } from 'tailwind-merge'

import { Container } from '../container/Container'
import { Section, SectionProps } from '../section/Section'

type Props = {
  steps?: {
    title: string
    description: string
  }[]
} & SectionProps

export const HowItWorks = ({ variant, steps, ...sectionProps }: Props) => {
  return (
    <Section variant={variant} {...sectionProps}>
      <Container className="mt-12 lg:mt-24">
        <ul className="gap-6 flex items-center flex-col lg:flex-row">
          {steps?.map((step, index) => (
            <Fragment key={step.title}>
              <li className="flex-1 flex flex-col items-center gap-2 text-center relative pt-16">
                <div
                  className={twMerge(
                    'opacity-30 absolute inset-0 text-9xl font-bold',
                    variant === 'default' ? 'text-theme-content-inverted' : '',
                  )}
                >
                  {index + 1}
                </div>

                <TitleText className={variant === 'default' ? 'text-theme-content-inverted' : ''}>
                  {step.title}
                </TitleText>

                <ParagraphText className={variant === 'default' ? 'text-theme-content-inverted' : ''}>
                  {step.description}
                </ParagraphText>
              </li>

              {index !== steps?.length - 1 ? (
                <div>
                  <ArrowRightIcon
                    className={twMerge(
                      'w-10 h-10 rotate-90 lg:rotate-0',
                      variant === 'default' ? 'text-theme-content-inverted' : '',
                    )}
                  />
                </div>
              ) : null}
            </Fragment>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
