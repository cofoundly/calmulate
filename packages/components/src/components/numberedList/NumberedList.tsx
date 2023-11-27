import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { SmallText } from '../smallText/SmallText'

type Props = ComponentPropsWithoutRef<'ul'> & { items: ReactNode[] }

export const NumberedList = ({ className = '', items, ...props }: Props) => {
  return (
    <ul className={twMerge('flex flex-col gap-y-2', className)} {...props}>
      {items.map((item, index) => (
        <li key={index} className="flex gap-x-4">
          <SmallText>{index + 1}.</SmallText>

          <SmallText>{item}</SmallText>
        </li>
      ))}
    </ul>
  )
}
