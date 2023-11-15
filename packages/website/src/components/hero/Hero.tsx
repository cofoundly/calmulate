import { HeadingText, ParagraphText, SmallText } from 'components'
import Image from 'next/image'
import React from 'react'

import { AnalyticsPrimaryButtonName } from '@/analytics/models'
import constants from '@/constants.json'

import { Container } from '../container/Container'
import { PrimaryActionButton } from '../primaryActionButton/PrimaryActionButton'
import { Section } from '../section/Section'

export const Hero = () => {
  return (
    <Section
      className="pt-[95px]"
      variant="inverted"
      prefix={<Image src={constants.hero.image.src} alt={constants.hero.image.alt} priority width={200} height={200} />}
      title={constants.hero.title}
      highlighted={constants.hero.highlighted}
      subtitle={constants.hero.subtitle}
    >
      <Container className="flex-1 justify-center text-center">
        <div className="flex flex-col gap-y-2">
          <HeadingText>{constants.hero.heading}</HeadingText>

          <ParagraphText>{constants.hero.description}</ParagraphText>
        </div>

        <div className="flex flex-col items-center gap-y-4">
          <PrimaryActionButton size="lg" name={AnalyticsPrimaryButtonName.Hero}>
            {constants.hero.buttonText}
          </PrimaryActionButton>

          <SmallText>*{constants.hero.footer}</SmallText>
        </div>
      </Container>
    </Section>
  )
}
