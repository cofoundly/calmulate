import { Columns } from 'components'
import React from 'react'

import { Section, SectionProps } from '../section/Section'
import { Testimonial, TestimonialProps } from './Testimonial'

type Props = {
  testimonials?: TestimonialProps[]
} & SectionProps

export const Testimonials = ({ testimonials, ...sectionProps }: Props) => {
  return (
    <Section {...sectionProps}>
      <Columns className="mt-12 lg:mt-24">
        {testimonials?.length
          ? testimonials.map(testimonial => (
              <li key={testimonial.name}>
                <Testimonial {...testimonial} />
              </li>
            ))
          : null}
      </Columns>
    </Section>
  )
}
