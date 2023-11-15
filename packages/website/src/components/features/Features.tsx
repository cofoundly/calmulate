import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import constants from '@/constants.json'
import { SectionId } from '@/routes'

import { FeatureText } from '../featureText/FeatureText'
import { Section } from '../section/Section'

export const Features = () => {
  return (
    <Section
      id={SectionId.Features}
      variant="inverted"
      title={constants.features.title}
      highlighted={constants.features.highlighted}
      subtitle={constants.features.subtitle}
    >
      {constants.features.sections.map((section, index) => {
        const isOdd = index % 2 === 1

        return (
          <div key={section.title} className={twMerge('lg:grid-cols-12 lg:grid gap-8 lg:gap-16')}>
            <Image
              className={twMerge('lg:col-span-7 w-full shadow-xl rounded-xl', isOdd ? 'order-1' : '')}
              src={section.image?.src || ''}
              alt={section.image?.alt || ''}
              priority
              width={1440}
              height={1135}
            />

            <FeatureText className={twMerge('lg:col-span-5 mt-12 lg:mt-0', isOdd ? '' : '')} {...section} />
          </div>
        )
      })}
    </Section>
  )
}
