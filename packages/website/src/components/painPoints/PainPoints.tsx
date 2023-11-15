import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import constants from '@/constants.json'

import { Container } from '../container/Container'
import { FeatureText } from '../featureText/FeatureText'
import { Section } from '../section/Section'

export const PainPoints = () => {
  return (
    <Section title={constants.painPoints.title} highlighted={constants.painPoints.highlighted}>
      <Container className="gap-y-24">
        {constants.painPoints.sections.map((section, index) => {
          const isEven = index % 2 === 0

          return (
            <div
              key={section.title}
              className={twMerge(
                'flex justify-center gap-8 lg:gap-16 flex-wrap lg:flex-nowrap',
                isEven ? 'lg:flex-row-reverse' : '',
              )}
            >
              <Image src={section.image.src} alt={section.image.alt} priority width={200} height={200} />

              <FeatureText {...section} />
            </div>
          )
        })}
      </Container>
    </Section>
  )
}
