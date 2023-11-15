import { Columns } from 'components'
import React from 'react'

import constants from '@/constants.json'
import { SectionId } from '@/routes'

import { Section } from '../section/Section'
import { Testimonial } from './Testimonial'

export const Testimonials = () => {
  return (
    <Section
      id={SectionId.Testimonials}
      title={constants.testimonials.title}
      highlighted={constants.testimonials.highlighted}
    >
      <Columns>
        {constants.testimonials.sections.map(testimonial => (
          <li key={testimonial.name}>
            <Testimonial {...testimonial} />
          </li>
        ))}
      </Columns>
    </Section>
  )
}
