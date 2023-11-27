import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { ParagraphText, TitleText } from 'components'
import React, { Fragment } from 'react'

import { Container } from '../container/Container'
import { Section, SectionProps } from '../section/Section'

type Props = {
  steps?: {
    title: string
    description: string
  }[]
} & SectionProps

export const HowItWorks = ({ steps, ...sectionProps }: Props) => {
  return (
    <Section {...sectionProps}>
      <Container className="mt-12 lg:mt-24">
        <ul className="gap-6 flex items-center flex-wrap sm:flex-nowrap">
          {steps?.length
            ? steps.map((step, index) => (
                <Fragment key={step.title}>
                  <li className="flex-1 flex flex-col items-center gap-2 text-center relative pt-16">
                    <div className="opacity-30 absolute inset-0 text-9xl font-bold">{index + 1}</div>

                    <TitleText>{step.title}</TitleText>

                    <ParagraphText>{step.description}</ParagraphText>
                  </li>

                  {index !== steps.length - 1 ? (
                    <div>
                      <ArrowRightIcon className="w-10 h-10" />
                    </div>
                  ) : null}
                </Fragment>
              ))
            : null}
        </ul>
      </Container>
    </Section>
  )
}
