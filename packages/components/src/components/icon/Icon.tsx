import * as HeroIcons from '@heroicons/react/24/solid'
import React from 'react'
import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { IconName } from '../iconPicker/icons'

type Props = {
  name: IconName
} & ComponentPropsWithoutRef<'svg'>

// adapted from https://github.com/tailwindlabs/heroicons/issues/278#issuecomment-942136861
export const Icon = ({ className = '', name, ...props }: Props) => {
  const HeroIcon = HeroIcons[name]

  return <HeroIcon className={twMerge(className)} aria-hidden {...props} />
}
