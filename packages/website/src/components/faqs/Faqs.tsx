import { Card, Columns, HeadingText, SmallText } from 'components'
import React from 'react'

import constants from '@/constants.json'
import { SectionId } from '@/routes'

import { Section } from '../section/Section'

export const Faqs = () => {
  return (
    <Section
      id={SectionId.Faqs}
      title={constants.faqs.title}
      highlighted={constants.faqs.highlighted}
      subtitle={constants.faqs.subtitle}
    >
      <Columns>
        {constants.faqs.sections.map(faq => (
          <li key={faq.question}>
            <Card>
              <HeadingText className="mb-4">{faq.question}</HeadingText>

              <SmallText>{faq.answer}</SmallText>
            </Card>
          </li>
        ))}
      </Columns>
    </Section>
  )
}
