import { Card, Columns, HeadingText, SmallText } from 'components'
import React from 'react'

import { Section, SectionProps } from '../section/Section'

type Props = {
  faqs?: { question: string; answer: string }[]
} & SectionProps

export const Faqs = ({ faqs, ...sectionProps }: Props) => {
  return (
    <Section {...sectionProps}>
      <Columns className="mt-12 lg:mt-24">
        {faqs?.length
          ? faqs.map(faq => (
              <li key={faq.question}>
                <Card>
                  <HeadingText className="mb-4">{faq.question}</HeadingText>

                  <SmallText>{faq.answer}</SmallText>
                </Card>
              </li>
            ))
          : null}
      </Columns>
    </Section>
  )
}
