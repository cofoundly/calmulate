import React from 'react'

import { Faqs } from '@/components/faqs/Faqs'
import { Features } from '@/components/features/Features'
import { Hero } from '@/components/hero/Hero'
import { HowItWorks } from '@/components/howItWorks/HowItWorks'
import { Pricing } from '@/components/pricing/Pricing'
import { SectionVariant } from '@/components/section/Section'
import { Testimonials } from '@/components/testimonials/Testimonials'

import constants from '../constants.json'

export default async function Page() {
  return (
    <>
      {constants.sections.map((section, index) => {
        const isEven = index % 2 === 0
        const variant: SectionVariant = isEven ? 'inverted' : 'default'
        const defaultProps = {
          id: section.navTitle,
          variant,
        }

        if (section.type === 'hero') {
          return <Hero key={section.title} {...defaultProps} {...section} />
        }

        if (section.type === 'features') {
          return <Features key={section.title} {...defaultProps} {...section} />
        }

        if (section.type === 'testimonials') {
          return <Testimonials key={section.title} {...defaultProps} {...section} />
        }

        if (section.type === 'pricing') {
          return <Pricing key={section.title} {...defaultProps} {...section} />
        }

        if (section.type === 'faqs') {
          return <Faqs key={section.title} {...defaultProps} {...section} />
        }

        if (section.type === 'howItWorks') {
          return <HowItWorks key={section.title} {...defaultProps} {...section} />
        }

        return <div key={index}>Unknown section type: {section.type}</div>
      })}
    </>
  )
}
