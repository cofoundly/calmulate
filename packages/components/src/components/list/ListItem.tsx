import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { SmallText } from '../smallText/SmallText'

type Props = ComponentPropsWithoutRef<'li'>

export const ListItem = ({ className = '', children }: Props) => {
  return (
    <li className={twMerge('py-2', className)}>
      <SmallText className="flex justify-between">{children}</SmallText>
    </li>
  )
}
