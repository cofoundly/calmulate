import { SmallText } from 'components'
import Image from 'next/image'
import React from 'react'

import { AnalyticsPrimaryButtonName } from '@/analytics/models'
import constants from '@/constants.json'

import { Container } from '../container/Container'
import { PrimaryActionButton } from '../primaryActionButton/PrimaryActionButton'
import { Section } from '../section/Section'

export const CallToAction = () => {
  return (
    <Section
      variant="inverted"
      title={constants.cta.title}
      highlighted={constants.cta.highlighted}
      subtitle={constants.cta.description}
    >
      <Container className="text-center items-center">
        <div className="flex flex-col items-center gap-y-4">
          <PrimaryActionButton size="lg" name={AnalyticsPrimaryButtonName.Cta}>
            {constants.cta.buttonText}
          </PrimaryActionButton>

          <SmallText>{constants.cta.footer}</SmallText>
        </div>

        <Image
          className="-mb-24"
          src={constants.cta.image.src}
          alt={constants.cta.image.alt}
          priority
          width={200}
          height={200}
        />
      </Container>
    </Section>
  )
}
